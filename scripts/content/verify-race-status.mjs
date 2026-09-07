#!/usr/bin/env node
// Weekly two-source status check for the race finder.
//
// The rule this script exists to keep: a status is only written when two
// independent sources say the same thing. Anything else keeps the curated
// value and its old `checked` stamp, and goes on an escalation list. It never
// invents a status, and it never stamps a date it did not verify.
//
// Cost. Firecrawl's free tier is 1,000 credits a month and does not roll over,
// so this runs on a hard budget. A markdown scrape is 1 credit; JSON/LLM
// extraction is about 5, which is why nothing here asks for extraction. Status
// words are matched in code, which is free and deterministic.
//
// What it does not spend credits on:
//   - the 13 races carrying a runSignupId, which read the free RunSignup API
//     hourly at page render (src/lib/race-live.ts) and need no scrape here
//   - the 7 races whose second source is behind Cloudflare or a Queue-it
//     waiting room (verifyReadable false). Firecrawl cannot read those either,
//     so paying to try would burn credits for a guaranteed "unreachable".
//
// Usage:
//   node scripts/content/verify-race-status.mjs [--budget N] [--dry-run] [--json]

import fs from 'node:fs';
import path from 'node:path';

const FILE = path.join('src', 'content', 'races-en.json');
const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n, d) => {
  const i = args.indexOf(n);
  return i >= 0 && args[i + 1] ? args[i + 1] : d;
};
const BUDGET = Number(opt('--budget', '30'));
const DRY = flag('--dry-run');
const JSON_OUT = flag('--json');
const KEY = process.env.FIRECRAWL_API_KEY;

const log = (...a) => { if (!JSON_OUT) console.log(...a); };

// ---------------------------------------------------------------- reading

let spent = 0;

/** One markdown scrape. 1 credit. Returns null on any failure, never throws. */
async function scrape(url) {
  if (spent >= BUDGET) return { skipped: 'budget' };
  spent++;
  try {
    const r = await fetch('https://api.firecrawl.dev/v2/scrape', {
      method: 'POST',
      headers: { authorization: `Bearer ${KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        url,
        formats: ['markdown'],
        onlyMainContent: true,
        timeout: 30000,
      }),
    });
    if (!r.ok) return { error: `http ${r.status}` };
    const j = await r.json();
    const md = j?.data?.markdown;
    return typeof md === 'string' && md.length ? { text: md.toLowerCase() } : { error: 'empty' };
  } catch (e) {
    return { error: String(e.message || e) };
  }
}

// ------------------------------------------------------------ classifying

// Ordered most specific first: "sold out" must beat a "register" that is still
// sitting in the page nav of a sold out race.
const SIGNALS = [
  { status: 'sold',  re: /\b(all distances sold out|sold out|registration (is )?(now )?closed|entries are closed|race is full)\b/ },
  { status: 'limit', re: /\b(wait ?list|waitlist open|charity (entries|entry|spots)|lottery|limited (entries|spots))\b/ },
  { status: 'open',  re: /\b(register now|registration (is )?(now )?open|sign up now|enter now|registration opens)\b/ },
];

/** What a page says, or null when it does not clearly say anything. Never a
 *  guess: a page with no matching phrase reports "not stated". */
function classify(text) {
  if (!text) return null;
  const hits = SIGNALS.filter((s) => s.re.test(text)).map((s) => s.status);
  if (!hits.length) return null;
  // A page carrying both "sold out" and "register" is telling us some
  // distances are gone and some are not, which is exactly `limit`.
  if (hits.includes('sold') && hits.includes('open')) return 'limit';
  return hits[0];
}

/** Free structured read for races that carry a hand-confirmed id. Mirrors the
 *  three rules in src/lib/race-live.ts: id only, no price, and a status is
 *  only trusted when a real checkout exists. */
async function runSignup(id) {
  try {
    const r = await fetch(`https://runsignup.com/rest/race/${id}?format=json&future_events_only=T`, {
      headers: { accept: 'application/json' },
    });
    if (!r.ok) return null;
    const race = (await r.json())?.race;
    if (!race) return null;
    const periods = (race.events || []).some((e) => (e.registration_periods || []).length > 0);
    if (!periods) return null; // no real checkout here, so it cannot speak to status
    return race.is_registration_open === 'T' ? 'open' : 'sold';
  } catch {
    return null;
  }
}

// ------------------------------------------------------------------- main

const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const all = Object.values(data).flat();
const today = new Date();
const iso = today.toISOString().slice(0, 10);

/** Race day, parsed off the end of the `where` string. */
function raceDate(r) {
  const m = String(r.where).match(/([A-Z][a-z]+)\s+(\d{1,2})?[-–]?\d*,?\s*(\d{4})/);
  if (!m) return null;
  const d = new Date(`${m[1]} ${m[2] || 15}, ${m[3]}`);
  return isNaN(+d) ? null : d;
}

// Who is worth spending on: upcoming, with a second source that can actually
// be read and is genuinely a second source. Soonest race first, then the
// oldest stamp, so a capped budget cycles the whole list instead of
// re-checking the same few every week.
const due = all
  .filter((r) => r.status !== 'past')
  .filter((r) => r.verifyReadable && r.verifyIndependent)
  .filter((r) => !r.runSignupId) // covered free by race-live.ts at render
  .map((r) => ({ r, date: raceDate(r) }))
  .filter((x) => !x.date || x.date >= today)
  .sort((a, b) => (a.r.checked || '').localeCompare(b.r.checked || '') ||
                  (a.date?.getTime() ?? 0) - (b.date?.getTime() ?? 0));

const changed = [];
const escalate = [];
const agreed = [];

if (!KEY) {
  log('FIRECRAWL_API_KEY not set. Nothing to do.');
} else {
  for (const { r } of due) {
    if (spent + 2 > BUDGET) { log(`budget reached (${spent}/${BUDGET}), stopping`); break; }

    const a = await scrape(r.url);
    const b = r.runSignupId ? { text: null } : await scrape(r.verifyUrl);
    const sa = classify(a.text);
    const sb = r.runSignupId ? await runSignup(r.runSignupId) : classify(b.text);

    if (a.error || b.error || a.skipped || b.skipped) {
      escalate.push({ name: r.name, why: `unreachable: ${a.error || b.error || 'budget'}`, url: r.url, verifyUrl: r.verifyUrl });
      continue;
    }
    if (!sa || !sb) {
      escalate.push({ name: r.name, why: `not stated (official=${sa ?? 'none'}, second=${sb ?? 'none'})`, url: r.url, verifyUrl: r.verifyUrl });
      continue;
    }
    if (sa !== sb) {
      escalate.push({ name: r.name, why: `sources disagree (official=${sa}, second=${sb})`, url: r.url, verifyUrl: r.verifyUrl });
      continue;
    }
    // Two sources, same answer. This is the only path that writes.
    agreed.push({ name: r.name, status: sa });
    if (r.status !== sa) changed.push({ name: r.name, from: r.status, to: sa });
    if (!DRY) { r.status = sa; r.checked = iso; }
  }
  if (!DRY && agreed.length) fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n');
}

const report = { checked: agreed.length, changed, escalate, creditsSpent: spent, budget: BUDGET, dryRun: DRY };
if (JSON_OUT) { console.log(JSON.stringify(report, null, 2)); }
else {
  log(`\nverified ${agreed.length} races, ${changed.length} status changes, ${escalate.length} escalations`);
  changed.forEach((c) => log(`  CHANGED ${c.name}: ${c.from} -> ${c.to}`));
  escalate.forEach((e) => log(`  ESCALATE ${e.name}: ${e.why}`));
  log(`credits spent: ${spent}/${BUDGET}`);
}
// Exit 0 always. Findings are data, not failure, and the workflow reads the
// JSON rather than the exit code.
