/**
 * Suor Society trend radar scan (SUOR-8).
 *
 * Social feeds (Instagram/TikTok) can't be scanned reliably, so this watches
 * where trends surface in scannable form instead: running media RSS, gear
 * sites, and Hyrox coverage. Emails a morning digest. (Reddit is deliberately
 * absent — it 403s requests from GitHub runners; hot threads still reach the
 * radar via the web-search deep dives, where they rank in results.)
 * See trend-radar/watchlist.md for the strategy and post angles.
 *
 * Requires:
 *   MAIL_USER  – PurelyMail SMTP username (GitHub Secret)
 *   MAIL_PASS  – PurelyMail SMTP password
 *
 * Run manually:  node scripts/trends/scan.mjs
 */

import nodemailer from 'nodemailer';

const TO_EMAIL = 'thaisoney@gmail.com';
const WINDOW_HOURS = 30; // daily run + 30h window ≈ full coverage, few dupes
const UA = 'Mozilla/5.0 (compatible; SuorTrendRadar/1.0; +https://suorsociety.com)';

// ── Topics (keyword groups matched against title + description) ──────────────

const TOPICS = [
  {
    id: 'hyrox',
    label: 'HYROX & hybrid racing',
    keywords: [/hyrox/i, /hybrid athlete/i, /\bdeka\b/i],
  },
  {
    id: 'strength',
    label: 'Strength & lifting for runners',
    keywords: [
      /strength train/i, /lifting/i, /weight room/i, /\bsquat/i,
      /deadlift/i, /gym for runners/i, /strength for runners/i,
    ],
  },
  {
    id: 'shoes',
    label: 'Shoe drops & gear',
    keywords: [
      /shoe (launch|release|drop)/i, /first (look|run|thoughts)/i,
      /super ?shoe/i, /(alphafly|vaporfly|adios pro|metaspeed|rocket x|cielo)/i,
    ],
  },
  {
    id: 'races',
    label: 'Race weekends & results',
    keywords: [
      /marathon/i, /half.marathon/i, /\b(10k|5k)\b/i, /championship/i,
      /world record/i, /race (weekend|report|results)/i, /são silvestre/i,
    ],
  },
  {
    id: 'culture',
    label: 'Challenges & running culture',
    keywords: [/challenge/i, /viral/i, /run club/i, /strava/i, /trend/i],
  },
];

// ── Sources ───────────────────────────────────────────────────────────────────
// All public, no logins, no social scraping. Each is best-effort: a failed
// source is reported in the email footer, never fatal.

const RSS_SOURCES = [
  { name: 'LetsRun', url: 'https://www.letsrun.com/feed/' },
  { name: "Runner's World", url: 'https://www.runnersworld.com/rss/all.xml' },
  { name: 'Canadian Running', url: 'https://runningmagazine.ca/feed/' },
  { name: 'iRunFar', url: 'https://www.irunfar.com/feed/' },
  { name: 'Believe in the Run', url: 'https://believeintherun.com/feed/' },
  { name: 'Road Trail Run', url: 'https://www.roadtrailrun.com/feeds/posts/default?alt=rss' },
  { name: 'Rox Lyfe (Hyrox)', url: 'https://roxlyfe.com/feed/' },
  { name: 'Marathon Handbook', url: 'https://marathonhandbook.com/feed/' },
];

// ── Fetch helpers ─────────────────────────────────────────────────────────────

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Accept: '*/*' },
    signal: AbortSignal.timeout(20000),
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function decodeEntities(s) {
  return s
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&apos;/g, "'")
    .replace(/&#8217;/g, '’').replace(/&#8220;/g, '“').replace(/&#8221;/g, '”')
    .replace(/&amp;/g, '&')
    .replace(/<[^>]+>/g, '')
    .trim();
}

function tag(block, name) {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'));
  return m ? decodeEntities(m[1]) : '';
}

function parseRss(xml) {
  const items = [];
  for (const m of xml.matchAll(/<item[\s>][\s\S]*?<\/item>/gi)) {
    const block = m[0];
    const title = tag(block, 'title');
    if (!title) continue;
    items.push({
      title,
      link: tag(block, 'link') || (block.match(/<link[^>]*href="([^"]+)"/i)?.[1] ?? ''),
      description: tag(block, 'description').slice(0, 400),
      pubDate: new Date(tag(block, 'pubDate') || tag(block, 'dc:date') || 0),
    });
  }
  return items;
}

// ── Collection ────────────────────────────────────────────────────────────────

function matchTopic(item) {
  const text = `${item.title} ${item.description}`;
  for (const topic of TOPICS) {
    if (topic.keywords.some(re => re.test(text))) return topic.id;
  }
  return null;
}

async function collect() {
  const cutoff = Date.now() - WINDOW_HOURS * 3600 * 1000;
  const byTopic = Object.fromEntries(TOPICS.map(t => [t.id, []]));
  const sourceStatus = [];

  for (const src of RSS_SOURCES) {
    try {
      const items = parseRss(await fetchText(src.url));
      let kept = 0;
      for (const item of items) {
        if (item.pubDate.getTime() < cutoff) continue;
        const topicId = matchTopic(item);
        if (!topicId) continue;
        byTopic[topicId].push({ ...item, source: src.name });
        kept++;
      }
      sourceStatus.push(`${src.name}: ok (${items.length} items, ${kept} matched)`);
    } catch (err) {
      sourceStatus.push(`${src.name}: FAILED (${err.message})`);
    }
  }

  // Same story often runs on several outlets — keep the first per title.
  const seenTitles = new Set();
  for (const [id, list] of Object.entries(byTopic)) {
    list.sort((a, b) => b.pubDate - a.pubDate);
    byTopic[id] = list.filter(item => {
      const key = item.title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
      if (seenTitles.has(key)) return false;
      seenTitles.add(key);
      return true;
    });
  }
  return { byTopic, sourceStatus };
}

// ── Email ─────────────────────────────────────────────────────────────────────

function digestText(byTopic, sourceStatus, runLabel) {
  const lines = [`Suor Trend Radar — ${runLabel}`, ''];
  let total = 0;
  for (const topic of TOPICS) {
    const items = byTopic[topic.id];
    if (items.length === 0) continue;
    lines.push(`== ${topic.label} ==`);
    for (const item of items.slice(0, 6)) {
      lines.push(`• ${item.title}  [${item.source}]`);
      lines.push(`  ${item.link}`);
      total++;
    }
    lines.push('');
  }
  if (total === 0) {
    lines.push('Nothing on the radar today — skipping without guilt is part of the system.');
    lines.push('');
  }
  lines.push('─'.repeat(60));
  lines.push('Post-or-skip filter (apply before creating anything):');
  lines.push('real Suor angle · still early · Suor can add a take, not a repost.');
  lines.push('Watchlist & angles: trend-radar/watchlist.md');
  lines.push('');
  lines.push('Source status:');
  for (const s of sourceStatus) lines.push(`  ${s}`);
  return lines.join('\n');
}

function digestHtml(byTopic, sourceStatus, runLabel) {
  let total = 0;
  const sections = TOPICS.map(topic => {
    const items = byTopic[topic.id];
    if (items.length === 0) return '';
    const rows = items.slice(0, 6).map(item => {
      total++;
      return `<li style="margin-bottom:8px;">
        <a href="${item.link}" style="color:#b3261e;text-decoration:none;font-weight:600;">${item.title}</a>
        <small style="color:#888;"> — ${item.source}</small>
      </li>`;
    }).join('');
    return `<h3 style="margin:20px 0 8px;">${topic.label}</h3><ul style="padding-left:20px;margin:0;">${rows}</ul>`;
  }).join('');

  const empty = `<p style="color:#666;">Nothing on the radar today — skipping without guilt is part of the system.</p>`;

  return `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:640px;margin:auto;padding:24px;">
  <h2 style="margin-bottom:4px;">Suor Trend Radar</h2>
  <p style="color:#666;margin-top:0;">${runLabel}</p>
  ${total === 0 && sections === '' ? empty : sections}
  <p style="color:#888;font-size:13px;margin-top:24px;border-top:1px solid #eee;padding-top:12px;">
    <strong>Post-or-skip filter:</strong> real Suor angle · still early · Suor adds a take, not a repost.<br>
    Angles per topic: <code>trend-radar/watchlist.md</code>
  </p>
  <p style="color:#bbb;font-size:11px;">Source status:<br>${sourceStatus.join('<br>')}</p>
  </body></html>`;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const mailUser = process.env.MAIL_USER;
  const mailPass = process.env.MAIL_PASS;
  if (!mailUser || !mailPass) {
    console.error('MAIL_USER and MAIL_PASS environment variables must be set.');
    process.exit(1);
  }

  console.log(`[${new Date().toISOString()}] Starting trend radar scan`);
  const { byTopic, sourceStatus } = await collect();
  const total = Object.values(byTopic).reduce((n, list) => n + Math.min(list.length, 6), 0);
  for (const s of sourceStatus) console.log(`  ${s}`);
  console.log(`  Candidates: ${total}`);

  const runLabel = new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    dateStyle: 'medium',
  });

  const transporter = nodemailer.createTransport({
    host: 'smtp.purelymail.com',
    port: 465,
    secure: true,
    auth: { user: mailUser, pass: mailPass },
  });

  await transporter.sendMail({
    from: 'Suor Society <hello@suorsociety.com>',
    to: TO_EMAIL,
    subject: `Suor Trend Radar — ${total} candidate${total === 1 ? '' : 's'} · ${runLabel}`,
    text: digestText(byTopic, sourceStatus, runLabel),
    html: digestHtml(byTopic, sourceStatus, runLabel),
  });

  console.log('Email sent ✓');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
