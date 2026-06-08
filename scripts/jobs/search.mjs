/**
 * LinkedIn marketing jobs alert script.
 *
 * Requires:
 *   LINKEDIN_LI_AT  – your LinkedIn "li_at" session cookie value (GitHub Secret)
 *   MAIL_USER       – PurelyMail SMTP username
 *   MAIL_PASS       – PurelyMail SMTP password
 *
 * Run manually:  node scripts/jobs/search.mjs
 */

import { chromium } from 'playwright';
import nodemailer from 'nodemailer';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SENT_JOBS_FILE = join(__dirname, 'sent-jobs.json');
const TO_EMAIL = 'thaisoney@gmail.com';
const TARGET_PER_CATEGORY = 5;

// Title words that disqualify a listing
const EXCLUDED_TITLE_WORDS = [
  'manager', 'director', 'volunteer', 'vp ', 'vice president',
  'head of', 'chief', 'svp', 'evp',
];

function isTitleExcluded(title) {
  const lower = title.toLowerCase();
  return EXCLUDED_TITLE_WORDS.some(w => lower.includes(w));
}

// ── Search URLs ───────────────────────────────────────────────────────────────

const KEYWORDS = encodeURIComponent(
  '("marketing coordinator" OR "marketing specialist" OR "events marketing" OR ' +
  '"experiential marketing" OR "digital marketing" OR "marketing communications" OR "AI marketing")'
);

// San Diego area – 50-mile radius from zip 91942 (La Mesa, CA)
const SD_BASE = `https://www.linkedin.com/jobs/search/?keywords=${KEYWORDS}&location=91942&distance=50&f_E=2%2C3&sortBy=DD`;

// US remote only
const REM_BASE = `https://www.linkedin.com/jobs/search/?keywords=${KEYWORDS}&location=United%20States&f_WT=2&f_E=2%2C3&sortBy=DD`;

const SD_24H   = SD_BASE  + '&f_TPR=r86400';
const SD_WEEK  = SD_BASE  + '&f_TPR=r604800';
const REM_24H  = REM_BASE + '&f_TPR=r86400';
const REM_WEEK = REM_BASE + '&f_TPR=r604800';

// ── Deduplication store ───────────────────────────────────────────────────────

function loadSentIds() {
  if (!existsSync(SENT_JOBS_FILE)) return new Set();
  try {
    return new Set(JSON.parse(readFileSync(SENT_JOBS_FILE, 'utf-8')).ids ?? []);
  } catch {
    return new Set();
  }
}

function saveSentIds(ids) {
  mkdirSync(dirname(SENT_JOBS_FILE), { recursive: true });
  writeFileSync(SENT_JOBS_FILE, JSON.stringify({ ids: [...ids] }, null, 2) + '\n');
}

function extractJobId(url) {
  const m = url.match(/(\d{10,})/);
  return m ? m[1] : url;
}

// ── Playwright scraping ───────────────────────────────────────────────────────

async function scrapeUrl(page, url) {
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(4000);

    const currentUrl = page.url();
    if (currentUrl.includes('/login') || currentUrl.includes('/checkpoint')) {
      console.warn('  ↳ Redirected to login — authentication required');
      return [];
    }

    return await page.evaluate(() => {
      const jobs = [];

      // ── Authenticated view ────────────────────────────────────────────────
      const authCards = document.querySelectorAll(
        '.jobs-search-results__list-item, .scaffold-layout__list-item'
      );
      for (const card of authCards) {
        const titleEl = card.querySelector('.job-card-list__title, .job-card-list__title--link');
        const companyEl = card.querySelector(
          '.job-card-container__company-name, .job-card-container__primary-description'
        );
        const locationEl = card.querySelector('.job-card-container__metadata-item');
        const linkEl = card.querySelector('a.job-card-list__title--link, a[data-control-name]');
        const timeEl = card.querySelector('time, .job-card-container__listed-time');
        if (!titleEl || !linkEl) continue;
        jobs.push({
          title: titleEl.textContent?.trim() ?? '',
          company: companyEl?.textContent?.trim() ?? '',
          location: locationEl?.textContent?.trim() ?? '',
          postedDate: timeEl?.getAttribute('datetime') || timeEl?.textContent?.trim() || '',
          url: linkEl.href ?? '',
        });
      }

      // ── Public / guest view ───────────────────────────────────────────────
      if (jobs.length === 0) {
        const pubCards = document.querySelectorAll('.base-card, .job-search-card');
        for (const card of pubCards) {
          const titleEl = card.querySelector('.base-search-card__title');
          const companyEl = card.querySelector('.base-search-card__subtitle');
          const locationEl = card.querySelector('.job-search-card__location');
          const linkEl = card.querySelector('a.base-card__full-link');
          const timeEl = card.querySelector('time');
          if (!titleEl) continue;
          jobs.push({
            title: titleEl.textContent?.trim() ?? '',
            company: companyEl?.textContent?.trim() ?? '',
            location: locationEl?.textContent?.trim() ?? '',
            postedDate: timeEl?.getAttribute('datetime') || timeEl?.textContent?.trim() || '',
            url: linkEl?.href ?? '',
          });
        }
      }

      return jobs;
    });
  } catch (err) {
    console.error(`  ↳ Error scraping ${url}: ${err.message}`);
    return [];
  }
}

async function collectCategory(page, url24h, urlWeek, label, sentIds, seenThisRun) {
  const found = [];

  for (const [url, window] of [[url24h, '24h'], [urlWeek, 'week']]) {
    if (found.length >= TARGET_PER_CATEGORY) break;
    console.log(`\n── ${label} · past ${window} ──`);
    console.log(`  GET ${url.slice(0, 80)}…`);
    const raw = await scrapeUrl(page, url);
    console.log(`  ↳ ${raw.length} raw listings`);

    for (const job of raw) {
      if (found.length >= TARGET_PER_CATEGORY) break;
      const id = extractJobId(job.url);
      if (!id || sentIds.has(id) || seenThisRun.has(id)) continue;
      if (isTitleExcluded(job.title)) {
        console.log(`  ✗ excluded: "${job.title}"`);
        continue;
      }
      found.push({ ...job, id });
      seenThisRun.add(id);
    }
    console.log(`  Accepted so far: ${found.length}`);
  }

  return found;
}

// ── Email formatting ──────────────────────────────────────────────────────────

function sectionText(jobs, heading) {
  if (jobs.length === 0) return `${heading}\n  (none found)\n`;
  const lines = [`${heading}`];
  jobs.forEach((job, i) => {
    lines.push(`${i + 1}. ${job.title}`);
    lines.push(`   Company:  ${job.company || '(unknown)'}`);
    lines.push(`   Location: ${job.location || '(unknown)'}`);
    lines.push(`   Posted:   ${job.postedDate || '(unknown)'}`);
    lines.push(`   Link:     ${job.url}`);
    lines.push('');
  });
  return lines.join('\n');
}

function jobsToText(sdJobs, remoteJobs, runLabel) {
  const total = sdJobs.length + remoteJobs.length;
  return [
    `LinkedIn Marketing Jobs — ${runLabel}`,
    `${total} new posting${total === 1 ? '' : 's'}`,
    '',
    sectionText(sdJobs, '📍 San Diego Area (within 50 mi of 91942)'),
    sectionText(remoteJobs, '🌐 Remote US'),
    '─'.repeat(60),
    'Excludes manager / director / volunteer titles.',
  ].join('\n');
}

function jobRows(jobs) {
  return jobs.map((job, i) => `
    <tr>
      <td style="padding:6px 8px;vertical-align:top;color:#888;">${i + 1}</td>
      <td style="padding:6px 8px;">
        <strong><a href="${job.url}" style="color:#0a66c2;text-decoration:none;">${job.title}</a></strong><br>
        <span style="color:#444;">${job.company || ''}</span>
        ${job.location ? `&nbsp;·&nbsp;<span style="color:#666;">${job.location}</span>` : ''}
        ${job.postedDate ? `<br><small style="color:#999;">Posted: ${job.postedDate}</small>` : ''}
      </td>
    </tr>`).join('');
}

function jobsToHtml(sdJobs, remoteJobs, runLabel) {
  const total = sdJobs.length + remoteJobs.length;
  const sdSection = sdJobs.length > 0
    ? `<table style="width:100%;border-collapse:collapse;">${jobRows(sdJobs)}</table>`
    : '<p style="color:#999;font-style:italic;">None found.</p>';
  const remSection = remoteJobs.length > 0
    ? `<table style="width:100%;border-collapse:collapse;">${jobRows(remoteJobs)}</table>`
    : '<p style="color:#999;font-style:italic;">None found.</p>';

  return `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:640px;margin:auto;padding:24px;">
  <h2 style="margin-bottom:4px;">LinkedIn Marketing Jobs</h2>
  <p style="color:#666;margin-top:0;">${runLabel} &nbsp;·&nbsp; ${total} new posting${total === 1 ? '' : 's'}</p>

  <h3 style="margin-top:24px;margin-bottom:8px;">📍 San Diego Area <small style="font-weight:normal;color:#888;">(within 50 mi of 91942)</small></h3>
  ${sdSection}

  <h3 style="margin-top:24px;margin-bottom:8px;">🌐 Remote US</h3>
  ${remSection}

  <p style="color:#aaa;font-size:12px;margin-top:24px;">
    Excludes manager / director / volunteer titles. 24h window, week as fallback.
  </p>
  </body></html>`;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const liAt = process.env.LINKEDIN_LI_AT;
  const mailUser = process.env.MAIL_USER;
  const mailPass = process.env.MAIL_PASS;

  if (!mailUser || !mailPass) {
    console.error('MAIL_USER and MAIL_PASS environment variables must be set.');
    process.exit(1);
  }

  const sentIds = loadSentIds();
  const seenThisRun = new Set();

  console.log(`[${new Date().toISOString()}] Starting LinkedIn job search`);
  console.log(`Authentication: ${liAt ? 'li_at cookie provided ✓' : 'no cookie — guest mode (may be blocked)'}`);

  const browser = await chromium.launch({ headless: true });
  let sdJobs = [];
  let remoteJobs = [];

  try {
    const context = await browser.newContext({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      locale: 'en-US',
    });

    if (liAt) {
      const cookies = [
        { name: 'li_at',      value: liAt,                                    domain: '.linkedin.com', path: '/', secure: true, httpOnly: true },
      ];
      if (process.env.LINKEDIN_JSESSIONID) {
        cookies.push({ name: 'JSESSIONID', value: process.env.LINKEDIN_JSESSIONID, domain: '.linkedin.com', path: '/', secure: true, httpOnly: false });
      }
      if (process.env.LINKEDIN_BCOOKIE) {
        cookies.push({ name: 'bcookie',    value: process.env.LINKEDIN_BCOOKIE,    domain: '.linkedin.com', path: '/', secure: true, httpOnly: false });
      }
      await context.addCookies(cookies);
    }

    const page = await context.newPage();

    // Warm up the session before hitting search URLs
    console.log('\nWarming up session…');
    try {
      await page.goto('https://www.linkedin.com/feed/', { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForTimeout(2000);
    } catch {
      // non-fatal — proceed anyway
    }

    sdJobs     = await collectCategory(page, SD_24H,  SD_WEEK,  'San Diego',  sentIds, seenThisRun);
    remoteJobs = await collectCategory(page, REM_24H, REM_WEEK, 'Remote US',  sentIds, seenThisRun);

    await context.close();
  } finally {
    await browser.close();
  }

  const total = sdJobs.length + remoteJobs.length;

  if (total === 0) {
    console.log('\nNo new jobs found — skipping email.');
    return;
  }

  const runLabel = new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  console.log(`\nSending email (SD: ${sdJobs.length}, Remote: ${remoteJobs.length}) to ${TO_EMAIL}…`);

  const transporter = nodemailer.createTransport({
    host: 'smtp.purelymail.com',
    port: 465,
    secure: true,
    auth: { user: mailUser, pass: mailPass },
  });

  await transporter.sendMail({
    from: 'Suor Society <hello@suorsociety.com>',
    to: TO_EMAIL,
    subject: `LinkedIn Jobs — ${total} new · ${runLabel}`,
    text: jobsToText(sdJobs, remoteJobs, runLabel),
    html: jobsToHtml(sdJobs, remoteJobs, runLabel),
  });

  console.log('Email sent ✓');

  for (const job of [...sdJobs, ...remoteJobs]) sentIds.add(job.id);
  saveSentIds(sentIds);

  console.log('Done.');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
