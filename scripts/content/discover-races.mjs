#!/usr/bin/env node
// Finds upcoming open-entry races the guide does not list yet.
//
// Costs nothing. RunSignup's race search is a free public endpoint, so this
// spends no Firecrawl credits at all and the whole Firecrawl budget stays with
// verify-race-status.mjs.
//
// The trade this makes: RunSignup only knows RunSignup races, so a new race
// selling on RaceRoster or Haku will not appear here. That is a real gap and
// it is the honest one to take, because the alternative is paid search every
// week for a list that changes slowly.
//
// It proposes, it does not publish. Every race on the guide carries hand
// written copy in Thais's voice, and a row auto-filled with a platform's
// marketing blurb would read as exactly what it is. Candidates land in
// src/content/race-candidates.json for a human to promote.
//
// Usage: node scripts/content/discover-races.mjs [--json] [--months N]

import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const JSON_OUT = args.includes('--json');
const MONTHS = Number(args[args.indexOf('--months') + 1] || 12);
const OUT = path.join('src', 'content', 'race-candidates.json');
const log = (...a) => { if (!JSON_OUT) console.log(...a); };

// The states the guide actually covers, plus the ones its national section
// already reaches into. Searching all 50 returns mostly small local races.
const STATES = ['CA','WA','OR','NV','AZ','CO','TX','IL','MN','MI','NY','PA','MD','VA','DC','CT','MA','GA','FL','TN','OK','LA','HI','IN','MO','NC'];

const today = new Date();
const end = new Date(today); end.setMonth(end.getMonth() + MONTHS);
const d = (x) => x.toISOString().slice(0, 10);

// Anything that is not a road running race of half marathon or longer.
const NOT_RUNNING = /\b(bike|cycl|ride|century|gravel|triathlon|duathlon|swim|paddle|walk only|golf|ruck|dog jog)\b/i;
const NOT_REAL    = /\b(virtual|challenge|any city|any place|anyplace|anywhere|test race)\b/i;
// Race mills list the same packaged event in dozens of cities every month.
// They meet every mechanical test (real date, real distance, open) and none of
// the editorial one, so they are named and excluded rather than ranked down.
const SERIES_MILL = /\b(medal madness|run for chocolates|national chocolate day|run for mental health|full armor of god|santa hustle|hot chocolate|virtual run|race series \(\d+\)|\(\d{2,}\))/i;
// The guide is a road racing guide. Trail, ultra, relay and training series
// are real races and simply not what it covers.
// One operator sells the same packaged race into a dozen metros a month and
// names them all "<Theme> 5K/10K/13.1 <CITY IN CAPS>". Matching that shape
// catches the whole operator, including next month's theme, which a list of
// individual names never would.
const MILL_SHAPE = /\d+ ?[Kk]\s*\/\s*\d+ ?[Kk]\s*\/\s*13\.1\s+[A-Z][A-Z\/ .]{2,}$/;
const NOT_ROAD = /\b(trail|ultra|50k|50 ?mile|100 ?mile|adventure|training series|relay only|tri\b|sprint tri|obstacle|ragnar|backyard)/i;

// A destination race lands in a city a reader would travel to. Without this
// the search returns several hundred small local halves every week, which is
// a list nobody reads.
const METROS = new Set(['los angeles','san diego','san francisco','oakland','san jose','sacramento','berkeley','long beach','santa barbara','pasadena','anaheim','irvine','seattle','tacoma','portland','eugene','las vegas','reno','phoenix','scottsdale','tucson','denver','boulder','colorado springs','austin','dallas','houston','san antonio','fort worth','chicago','naperville','minneapolis','saint paul','st. paul','detroit','ann arbor','new york','brooklyn','queens','buffalo','rochester','philadelphia','pittsburgh','baltimore','annapolis','richmond','virginia beach','arlington','alexandria','washington','hartford','new haven','boston','cambridge','worcester','springfield','atlanta','savannah','miami','orlando','tampa','jacksonville','naples','nashville','memphis','knoxville','tulsa','oklahoma city','new orleans','baton rouge','honolulu','indianapolis','fishers','carmel','st. louis','saint louis','kansas city','charlotte','raleigh','durham','asheville','wilmington']);

/** A race qualifies only if it has a real event at half marathon or longer on
 *  a real date. `distance` comes back as "13.1 Miles", "21.1K", sometimes null. */
function qualifyingEvent(race) {
  for (const e of race.events || []) {
    const raw = String(e.distance ?? '');
    const m = raw.match(/([\d.]+)\s*(mile|mi|k|km)?/i);
    if (!m) continue;
    const n = parseFloat(m[1]);
    if (!isFinite(n)) continue;
    const unit = (m[2] || '').toLowerCase();
    const miles = unit.startsWith('k') ? n * 0.621371 : n;
    // 13 to 30 miles: half marathon up to marathon, excluding ultras and the
    // "2026 Miles" style yearly challenges that are not races at all.
    const isStandard = Math.abs(miles - 13.1) < 0.4 || Math.abs(miles - 26.2) < 0.6;
    if (isStandard && e.start_time && !NOT_RUNNING.test(e.name || '') && !NOT_ROAD.test(e.name || '')) {
      return { name: e.name, distanceMiles: Math.round(miles * 10) / 10, date: e.start_time.split(' ')[0] };
    }
  }
  return null;
}

const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');

async function search(state, page) {
  const q = new URLSearchParams({
    format: 'json', results_per_page: '50', page: String(page),
    start_date: d(today), end_date: d(end),
    state, min_distance: '13', distance_units: 'M',
    events: 'T', sort: 'date ASC',
  });
  try {
    const r = await fetch(`https://runsignup.com/rest/races?${q}`, { headers: { accept: 'application/json' } });
    if (!r.ok) return [];
    return (await r.json())?.races ?? [];
  } catch { return []; }
}

// ---- what we already list, so a known race never shows up as "new" --------
const data = JSON.parse(fs.readFileSync(path.join('src','content','races-en.json'), 'utf8'));
const listed = Object.values(data).flat();
const knownIds = new Set(listed.map((r) => r.runSignupId).filter(Boolean));
const knownNames = new Set(listed.map((r) => norm(r.name)));
// Guards against "Berkeley Half Marathon" vs "The Berkeley Half" reading as new.
const knownWords = listed.map((r) => norm(r.name).slice(0, 12)).filter((w) => w.length >= 8);

const found = new Map();
for (const state of STATES) {
  for (let page = 1; page <= 2; page++) {
    const rows = await search(state, page);
    if (!rows.length) break;
    for (const w of rows) {
      const race = w.race;
      if (!race || knownIds.has(race.race_id)) continue;
      if (NOT_REAL.test(race.name) || NOT_RUNNING.test(race.name)) continue;
      const city = race.address?.city || '';
      if (NOT_REAL.test(city)) continue;
      const n = norm(race.name);
      if (knownNames.has(n) || knownWords.some((k) => n.includes(k))) continue;
      if (race.is_registration_open !== 'T') continue;
      if (race.is_draft_race === 'T' || race.is_private_race === 'T') continue;
      if (SERIES_MILL.test(race.name) || NOT_ROAD.test(race.name) || MILL_SHAPE.test(race.name)) continue;
      if (!METROS.has(String(city).trim().toLowerCase())) continue;
      // Two signals that separate an established destination race from a
      // pop-up: it has its own website, and it has run at least once before.
      // Every race already on the guide clears both.
      if (!race.external_race_url) continue;
      if (!race.last_date) continue;
      const ev = qualifyingEvent(race);
      if (!ev) continue;
      found.set(race.race_id, {
        runSignupId: race.race_id,
        name: race.name,
        where: `${city}, ${race.address?.state} · ${ev.date}`,
        date: ev.date,
        longest: ev.name,
        distanceMiles: ev.distanceMiles,
        url: race.external_race_url,
        verifyUrl: `https://runsignup.com/Race/Register/?raceId=${race.race_id}`,
        verifySource: 'runsignup',
        foundOn: d(today),
      });
    }
  }
}

const candidates = [...found.values()].sort((a, b) => new Date(a.date) - new Date(b.date));

// Keep anything a previous run already surfaced, so a race does not vanish
// from the list just because its registration briefly closed.
let previous = [];
try { previous = JSON.parse(fs.readFileSync(OUT, 'utf8')).candidates ?? []; } catch {}
const prevIds = new Set(previous.map((c) => c.runSignupId));
const brandNew = candidates.filter((c) => !prevIds.has(c.runSignupId));

fs.writeFileSync(OUT, JSON.stringify({ generated: d(today), count: candidates.length, candidates }, null, 2) + '\n');

if (JSON_OUT) console.log(JSON.stringify({ total: candidates.length, brandNew: brandNew.length, candidates: brandNew }, null, 2));
else {
  log(`${candidates.length} candidates, ${brandNew.length} new since last run\n`);
  brandNew.slice(0, 25).forEach((c) => log(`  ${c.date}  ${c.name}  [${c.where}]  ${c.distanceMiles}mi`));
  log(`\nwrote ${OUT}`);
}
