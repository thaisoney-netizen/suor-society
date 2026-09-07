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
// Reading order. A plain fetch is tried first on every page, because it is
// free and it works: measured Sep 7 2026, it reads both sources for 9 of the
// 18 races that would otherwise be scraped, and agreed with the curated status
// on 5 of the 6 where both sides spoke. Firecrawl is the fallback for the
// pages a plain fetch cannot render, and only then does anything cost money.
//
// Usage:
//   node scripts/content/verify-race-status.mjs --free            (0 credits)
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
// --free never touches Firecrawl, so the daily job can run with no key and no
// spend at all.
const FREE_ONLY = flag('--free');
const DRY = flag('--dry-run');
const JSON_OUT = flag('--json');
const KEY = process.env.FIRECRAWL_API_KEY;

const log = (...a) => { if (!JSON_OUT) console.log(...a); };

// ---------------------------------------------------------------- reading

let spent = 0;
let freeReads = 0;

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/124.0 Safari/537.36';

/** A plain fetch. Costs nothing. Returns text or an error, never throws. */
async function plainFetch(url) {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), 25000);
  try {
    const r = await fetch(url, {
      redirect: 'follow',
      signal: c.signal,
      headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml' },
    });
    if (!r.ok) return { error: `http ${r.status}` };
    // Script bodies carry marketing copy and analytics payloads that trip the
    // status phrases, so they come out before the tags do.
    const text = (await r.text())
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .toLowerCase();
    freeReads++;
    return { text };
  } catch (e) {
    return { error: String(e.message || e) };
  } finally {
    clearTimeout(t);
  }
}

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

/** Read a page the cheapest way that actually works: plain fetch, and only if
 *  that yields no usable text does Firecrawl get paid to try. */
async function read(url) {
  const free = await plainFetch(url);
  if (free.text && classify(free.text)) return { ...free, via: 'free' };
  if (FREE_ONLY || !KEY) return free.text ? { ...free, via: 'free' } : { error: free.error ?? 'not stated' };
  const paid = await scrape(url);
  if (paid.text) return { ...paid, via: 'firecrawl' };
  // Fall back to whatever the free read did get, so a Firecrawl failure never
  // loses a page that was actually readable.
  return free.text ? { ...free, via: 'free' } : paid;
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

/** The reader-facing line. `statusLabel` is what actually renders, so a status
 *  written without its label leaves the row contradicting itself: Indianapolis
 *  Monumental moved to `limit` while still displaying "Open Registration".
 *
 *  Auto-written wording is deliberately plain and derived from the phrase that
 *  actually matched. A curated label is usually better ("Half & 8K Open, Full
 *  Sold Out" says more than "Limited Entries"), which is why the digest lists
 *  every label this writes so a person can improve it. */
function labelFor(status, text) {
  const has = (re) => Boolean(text && re.test(text));
  if (status === 'open') return 'Open Registration';
  if (status === 'sold') {
    if (has(/\bwait ?list\b/)) return 'Sold Out, Waitlist Open';
    return 'Sold Out';
  }
  if (status === 'limit') {
    if (has(/\blottery\b/)) return 'Lottery Entry';
    if (has(/\bcharity (entries|entry|spots)\b/)) return 'General Sold Out, Charity Entries Open';
    if (has(/\bwait ?list\b/)) return 'Sold Out, Waitlist Open';
    return 'Limited Entries, Check Site';
  }
  return null;
}

/** Free structured read for races that carry a hand-confirmed id.
 *
 *  Returns the registration STATE, not a status, because those are not the
 *  same thing and conflating them writes wrong data:
 *
 *    open      a registration period is live right now
 *    upcoming  periods exist but the earliest opens in the future. Beer City
 *              Alameda reads is_registration_open=F today for a July 2027 race
 *              whose entry opens 11/21/2026. Calling that "sold" would tell a
 *              reader the race is gone when it has not opened.
 *    closed    periods exist and every one of them has already closed
 *    null      no registration periods at all, so this platform is not a real
 *              point of sale for the race and cannot speak to its status.
 *              This is the handoff's rule that is_registration_open is never
 *              trusted on its own (Hartford: closed flag, zero periods, still
 *              selling elsewhere).
 */
async function runSignup(id) {
  try {
    const r = await fetch(`https://runsignup.com/rest/race/${id}?format=json&future_events_only=T`, {
      headers: { accept: 'application/json' },
    });
    if (!r.ok) return null;
    const race = (await r.json())?.race;
    if (!race) return null;

    const parse = (v) => {
      if (typeof v !== 'string') return null;
      const m = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2}))?/);
      if (!m) return null;
      const d = new Date(+m[3], +m[1] - 1, +m[2], +(m[4] ?? 0), +(m[5] ?? 0));
      return isNaN(+d) ? null : d;
    };

    const periods = (race.events || []).flatMap((e) => e.registration_periods || []);
    if (!periods.length) return null;

    const now = Date.now();
    let anyOpen = false;
    let earliestOpens = Infinity;
    for (const p of periods) {
      const o = parse(p.registration_opens);
      const c = parse(p.registration_closes);
      if (o && +o < earliestOpens) earliestOpens = +o;
      if ((!o || +o <= now) && (!c || +c >= now)) anyOpen = true;
    }
    if (anyOpen) return 'open';
    if (earliestOpens > now) return 'upcoming';
    return 'closed';
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

// Who is worth checking: upcoming, with a second source that can actually be
// read and is genuinely a second source. Soonest race first, then the oldest
// stamp, so a capped budget cycles the whole list instead of re-checking the
// same few every week.
//
// RunSignup races are included rather than skipped. They refresh live at page
// render, but that only updates what a reader SEES; it never touches the
// `checked` stamp, so leaving them out pinned seven of the freshest races on
// the page to the oldest date on it and made the freshness banner read nine
// weeks stale. Their second source is the free RunSignup API, so checking them
// costs nothing.
const due = all
  .filter((r) => r.status !== 'past')
  .filter((r) => r.verifyReadable && r.verifyIndependent)
  .map((r) => ({ r, date: raceDate(r) }))
  .filter((x) => !x.date || x.date >= today)
  .sort((a, b) => (a.r.checked || '').localeCompare(b.r.checked || '') ||
                  (a.date?.getTime() ?? 0) - (b.date?.getTime() ?? 0));

const changed = [];
const escalate = [];
const agreed = [];

if (!KEY && !FREE_ONLY) {
  log('FIRECRAWL_API_KEY not set and --free not passed. Nothing to do.');
} else {
  for (const { r } of due) {
    if (!FREE_ONLY && KEY && spent + 2 > BUDGET) {
      log(`budget reached (${spent}/${BUDGET}), stopping`);
      break;
    }

    // A RunSignup race with a real checkout is settled by the API on its own.
    //
    // It is structured first-party data, not a phrase matched out of marketing
    // copy, and src/lib/race-live.ts already lets it override the curated
    // status for what a reader sees. Trusting it to display a status but not
    // to stamp one would be incoherent, and it is also strictly better than
    // the alternative: scraping the same race's homepage yields a race-level
    // guess from per-distance copy, which made Space Coast, Richmond and
    // Mountains 2 Beach all "disagree" with an API that was simply right.
    //
    // The handoff's rule that `is_registration_open` is never trusted alone
    // still holds, and lives inside runSignup(): it returns null unless the
    // race has real registration periods, which is the evidence of a genuine
    // checkout. A null still falls through to the two-source path below.
    if (r.runSignupId) {
      const state = await runSignup(r.runSignupId);
      if (state) {
        // The API is race-level and cannot see a per-distance sellout, so it
        // is never allowed to overwrite a curated `limit`. Richmond and Space
        // Coast both read "open" here while their marathon is gone and only
        // the half and 8k remain; "Half & 8K Open, Full Sold Out" is the more
        // accurate line and it stays. The API confirms the race still sells,
        // which is enough to move the stamp without touching the status.
        let next = r.status;
        let conflict = null;
        if (state === 'open') {
          if (r.status === 'sold') conflict = 'API sells now but curated says sold out';
          else next = r.status === 'limit' ? 'limit' : 'open';
        } else if (state === 'closed') {
          next = 'sold';
        } else if (state === 'upcoming') {
          // Not yet open. The curated label carries the opening date, which is
          // more use to a reader than any status this could invent.
          next = r.status;
        }
        if (conflict) {
          escalate.push({ name: r.name, why: conflict, url: r.url, verifyUrl: r.verifyUrl });
          continue;
        }
        const label = next === r.status ? null : labelFor(next, '');
        agreed.push({ name: r.name, status: next });
        if (r.status !== next) changed.push({ name: r.name, from: r.status, to: next, label });
        if (!DRY) {
          if (label) r.statusLabel = label;
          r.status = next;
          r.checked = iso;
        }
        continue;
      }
    }

    const a = await read(r.url);
    const b = await read(r.verifyUrl);
    const sa = classify(a.text);
    const sb = classify(b.text);

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
    const label = labelFor(sa, `${a.text ?? ''} ${b.text ?? ''}`);
    agreed.push({ name: r.name, status: sa });
    if (r.status !== sa) {
      changed.push({ name: r.name, from: r.status, to: sa, label });
    }
    if (!DRY) {
      // Only rewrite the label when the status actually moved. A curated label
      // on an unchanged status is better than anything generated here.
      if (r.status !== sa && label) r.statusLabel = label;
      r.status = sa;
      r.checked = iso;
    }
  }
  if (!DRY && agreed.length) fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n');
}

const report = { checked: agreed.length, changed, escalate, creditsSpent: spent, freeReads, budget: BUDGET, dryRun: DRY, freeOnly: FREE_ONLY };
if (JSON_OUT) { console.log(JSON.stringify(report, null, 2)); }
else {
  log(`\nverified ${agreed.length} races, ${changed.length} status changes, ${escalate.length} escalations`);
  changed.forEach((c) => log(`  CHANGED ${c.name}: ${c.from} -> ${c.to}${c.label ? `  label: "${c.label}"` : ''}`));
  escalate.forEach((e) => log(`  ESCALATE ${e.name}: ${e.why}`));
  log(`free reads: ${freeReads}   credits spent: ${spent}/${FREE_ONLY ? 0 : BUDGET}`);
}
// Exit 0 always. Findings are data, not failure, and the workflow reads the
// JSON rather than the exit code.
