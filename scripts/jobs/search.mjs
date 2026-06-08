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
const TARGET_COUNT = 5;

// ── Search URL pairs (24-hour window first, week window as fallback) ──────────

const KEYWORDS = encodeURIComponent(
  '("marketing coordinator" OR "marketing specialist" OR "events marketing" OR ' +
  '"experiential marketing" OR "digital marketing" OR "marketing communications" OR "AI marketing")'
);
const SD_BASE = `https://www.linkedin.com/jobs/search/?keywords=${KEYWORDS}&location=San%20Diego%2C%20California%2C%20United%20States&f_E=2%2C3&sortBy=DD`;
const REM_BASE = `https://www.linkedin.com/jobs/search/?keywords=${KEYWORDS}&location=United%20States&f_WT=2&f_E=2%2C3&sortBy=DD`;

const URLS_24H = [
  SD_BASE + '&f_TPR=r86400',
  REM_BASE + '&f_TPR=r86400',
];
const URLS_WEEK = [
  SD_BASE + '&f_TPR=r604800',
  REM_BASE + '&f_TPR=r604800',
];

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
  // LinkedIn job URLs end with a numeric ID: .../view/title-at-co-4123456789
  const m = url.match(/(\d{10,})/);
  return m ? m[1] : url;
}

// ── Playwright scraping ───────────────────────────────────────────────────────

async function scrapeUrl(page, url) {
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(4000); // let JS render

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

async function collectJobs(page, urls, sentIds, existing) {
  const found = [];
  for (const url of urls) {
    console.log(`  GET ${url.slice(0, 80)}…`);
    const raw = await scrapeUrl(page, url);
    console.log(`  ↳ ${raw.length} listings returned`);
    for (const job of raw) {
      const id = extractJobId(job.url);
      if (!id) continue;
      if (sentIds.has(id)) continue;
      if (existing.has(id)) continue;
      found.push({ ...job, id });
      existing.add(id);
    }
    if (existing.size >= TARGET_COUNT) break;
  }
  return found;
}

// ── Email formatting ──────────────────────────────────────────────────────────

function jobsToText(jobs, runLabel) {
  const lines = [
    `LinkedIn Marketing Jobs — ${runLabel}`,
    `${jobs.length} new posting${jobs.length === 1 ? '' : 's'}`,
    '',
  ];
  jobs.forEach((job, i) => {
    lines.push(`${i + 1}. ${job.title}`);
    lines.push(`   Company:  ${job.company || '(unknown)'}`);
    lines.push(`   Location: ${job.location || '(unknown)'}`);
    lines.push(`   Posted:   ${job.postedDate || '(unknown)'}`);
    lines.push(`   Link:     ${job.url}`);
    lines.push('');
  });
  lines.push('─'.repeat(60));
  lines.push('Sources: San Diego (24h) + Remote US (24h); week window used when needed.');
  return lines.join('\n');
}

function jobsToHtml(jobs, runLabel) {
  const rows = jobs
    .map(
      (job, i) => `
      <tr>
        <td style="padding:6px 8px;vertical-align:top;color:#888;">${i + 1}</td>
        <td style="padding:6px 8px;">
          <strong><a href="${job.url}" style="color:#0a66c2;text-decoration:none;">${job.title}</a></strong><br>
          <span style="color:#444;">${job.company || ''}</span>
          ${job.location ? `&nbsp;·&nbsp;<span style="color:#666;">${job.location}</span>` : ''}
          ${job.postedDate ? `<br><small style="color:#999;">Posted: ${job.postedDate}</small>` : ''}
        </td>
      </tr>`
    )
    .join('');

  return `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:640px;margin:auto;padding:24px;">
  <h2 style="margin-bottom:4px;">LinkedIn Marketing Jobs</h2>
  <p style="color:#666;margin-top:0;">${runLabel} &nbsp;·&nbsp; ${jobs.length} new posting${jobs.length === 1 ? '' : 's'}</p>
  <table style="width:100%;border-collapse:collapse;">${rows}</table>
  <p style="color:#aaa;font-size:12px;margin-top:24px;">
    Sources: San Diego (24h) + Remote US (24h); week window used when needed.
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
  const newJobs = [];

  console.log(`[${new Date().toISOString()}] Starting LinkedIn job search`);
  console.log(`Authentication: ${liAt ? 'li_at cookie provided ✓' : 'no cookie — guest mode (may be blocked)'}`);

  const browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      locale: 'en-US',
    });

    if (liAt) {
      await context.addCookies([
        { name: 'li_at', value: liAt, domain: '.linkedin.com', path: '/', secure: true, httpOnly: true },
      ]);
    }

    const page = await context.newPage();

    // Step 1 — past 24 h
    console.log('\n── Past 24 h ──');
    const from24h = await collectJobs(page, URLS_24H, sentIds, seenThisRun);
    newJobs.push(...from24h);
    console.log(`  Subtotal: ${newJobs.length}`);

    // Step 2 — fill to 5 from past week if needed
    if (newJobs.length < TARGET_COUNT) {
      console.log(`\n── Past week (filling to ${TARGET_COUNT}) ──`);
      const fromWeek = await collectJobs(page, URLS_WEEK, sentIds, seenThisRun);
      newJobs.push(...fromWeek.slice(0, TARGET_COUNT - newJobs.length));
      console.log(`  Subtotal: ${newJobs.length}`);
    }

    await context.close();
  } finally {
    await browser.close();
  }

  if (newJobs.length === 0) {
    console.log('\nNo new jobs found — skipping email.');
    return;
  }

  const top = newJobs.slice(0, TARGET_COUNT);

  const runLabel = new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  console.log(`\nSending email (${top.length} jobs) to ${TO_EMAIL}…`);

  const transporter = nodemailer.createTransport({
    host: 'smtp.purelymail.com',
    port: 465,
    secure: true,
    auth: { user: mailUser, pass: mailPass },
  });

  await transporter.sendMail({
    from: 'Suor Society <hello@suorsociety.com>',
    to: TO_EMAIL,
    subject: `LinkedIn Marketing Jobs — ${top.length} new · ${runLabel}`,
    text: jobsToText(top, runLabel),
    html: jobsToHtml(top, runLabel),
  });

  console.log('Email sent ✓');

  // Persist sent IDs so duplicates are skipped next run
  for (const job of top) sentIds.add(job.id);
  saveSentIds(sentIds);

  console.log('Done.');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
