/**
 * Suor Society trend radar scan (SUOR-8).
 *
 * Social feeds (Instagram/TikTok) can't be scanned reliably, so this watches
 * where trends surface in scannable form instead: running media RSS, gear
 * sites, and Hyrox coverage. Posts each new candidate as a card on the Notion
 * board. (Reddit is deliberately absent — it 403s requests from GitHub
 * runners; hot threads still reach the radar via the web-search deep dives,
 * where they rank in results.)
 * See trend-radar/watchlist.md for the strategy and post angles.
 *
 * One card per candidate: the card title is the headline; topic, source, link
 * and run date go in the card body. Already-carded items are remembered in
 * scripts/trends/sent-trends.json so the overlapping 30h window doesn't create
 * duplicate cards day over day (the workflow commits the updated file back).
 *
 * Requires:
 *   NOTION_TOKEN        – internal integration token (GitHub Secret)
 *   NOTION_DATABASE_ID  – id of the board database, shared with the integration
 *
 * Run manually:  node scripts/trends/scan.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const WINDOW_HOURS = 30; // daily run + 30h window ≈ full coverage, few dupes
const UA = 'Mozilla/5.0 (compatible; SuorTrendRadar/1.0; +https://suorsociety.com)';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SENT_FILE = join(__dirname, 'sent-trends.json');
const SENT_CAP = 600; // bound the dedup file; keep the most recent keys
const NOTION_VERSION = '2022-06-28';

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

// ── Dedup store ────────────────────────────────────────────────────────────────
// The 30h window overlaps the daily cadence, so the same story surfaces on
// consecutive runs. Remember which candidates we've already carded (by
// normalized title) so we never post a duplicate card.

function candidateKey(item) {
  return item.title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function loadSent() {
  try {
    const data = JSON.parse(readFileSync(SENT_FILE, 'utf8'));
    return new Set(Array.isArray(data.keys) ? data.keys : []);
  } catch {
    return new Set();
  }
}

function saveSent(set) {
  // Keep the most recent keys (insertion order) so the file stays bounded.
  const keys = [...set].slice(-SENT_CAP);
  writeFileSync(SENT_FILE, JSON.stringify({ keys }, null, 2) + '\n');
}

// ── Notion ──────────────────────────────────────────────────────────────────────

async function notion(token, path, method, body) {
  const res = await fetch(`https://api.notion.com/v1/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) {
    throw new Error(`Notion ${method} ${path} → HTTP ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

// Board databases vary in schema, but every database has exactly one `title`
// property — discover its name so we set the card headline on any board.
async function titlePropName(token, databaseId) {
  const db = await notion(token, `databases/${databaseId}`, 'GET');
  const entry = Object.entries(db.properties).find(([, p]) => p.type === 'title');
  if (!entry) throw new Error('database has no title property');
  return entry[0];
}

function cardChildren(item, topicLabel, runLabel) {
  const paragraph = text => ({
    object: 'block',
    type: 'paragraph',
    paragraph: { rich_text: [{ type: 'text', text: { content: text } }] },
  });
  const bookmark = url => ({ object: 'block', type: 'bookmark', bookmark: { url } });
  const blocks = [
    paragraph(`${topicLabel} · ${item.source} · found ${runLabel}`),
  ];
  if (item.description) blocks.push(paragraph(item.description));
  if (item.link) blocks.push(bookmark(item.link));
  return blocks;
}

async function createCard(token, databaseId, titleProp, item, topicLabel, runLabel) {
  await notion(token, 'pages', 'POST', {
    parent: { database_id: databaseId },
    properties: {
      [titleProp]: { title: [{ type: 'text', text: { content: item.title.slice(0, 200) } }] },
    },
    children: cardChildren(item, topicLabel, runLabel),
  });
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!token || !databaseId) {
    console.error('NOTION_TOKEN and NOTION_DATABASE_ID environment variables must be set.');
    process.exit(1);
  }

  console.log(`[${new Date().toISOString()}] Starting trend radar scan`);
  const { byTopic, sourceStatus } = await collect();
  for (const s of sourceStatus) console.log(`  ${s}`);

  const runLabel = new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    dateStyle: 'medium',
  });

  const sent = loadSent();
  const titleProp = await titlePropName(token, databaseId);

  let created = 0;
  let skipped = 0;
  for (const topic of TOPICS) {
    for (const item of byTopic[topic.id].slice(0, 6)) {
      const key = candidateKey(item);
      if (sent.has(key)) { skipped++; continue; }
      await createCard(token, databaseId, titleProp, item, topic.label, runLabel);
      sent.add(key);
      created++;
      console.log(`  + card: ${item.title}  [${item.source}]`);
    }
  }

  saveSent(sent);
  console.log(`Done ✓ ${created} new card${created === 1 ? '' : 's'}, ${skipped} already on the board`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
