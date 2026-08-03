// Content freshness sweep. Two independent checks:
//
//   1. STALE DATES — any listing date that has already passed, so race guides
//      and dispatch posts never advertise a past event as upcoming.
//   2. UNVERIFIED UPCOMING RACES — races inside the verification window whose
//      `checked` stamp has gone stale. Registration status (open, waitlist,
//      sold out) drifts with no date changing, and check 1 is blind to it.
//      Sell-outs cluster in the weeks before race day, which is the window
//      this covers.
//
//   Run:  node scripts/content/check-stale-dates.mjs
//   Exit: 0 when clean, 1 when either check reports something (report on stdout).
//
// Runs weekly via .github/workflows/stale-dates.yml, which opens a GitHub issue
// and posts a card to the Notion board. Dependency-free on purpose so the
// workflow needs no npm install.

import fs from "node:fs";
import path from "node:path";

const ROOTS = ["src/app", "src/content", "src/i18n"];
const EXTS = new Set([".tsx", ".ts", ".json"]);
const RACE_FILES = ["src/content/races-en.json", "src/content/races-br.json"];

// A race this close to its date is in sell-out season and its status is worth
// re-confirming against the official site.
const VERIFY_WINDOW_DAYS = 45;
// ...but only if we have not confirmed it in this long. Re-verifying bumps
// `checked` in the JSON, which quiets the race until the stamp ages out again.
const VERIFY_MAX_AGE_DAYS = 30;

// "July 11, 2026", "Nov 21-22, 2026", "Dec 4 to 6, 2026" (year required)
const EN_DATE =
  /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\.?\s+(\d{1,2})(?:\s*(?:to|-|–|and)\s*(\d{1,2}))?,?\s+(\d{4})/g;
// "28 de junho de 2026", "17 e 18 de outubro de 2026"
const PT_DATE =
  /\b(\d{1,2})(?:\s*(?:a|e)\s*(\d{1,2}))?\s+de\s+(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\s+de\s+(\d{4})/gi;

const EN_MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
const PT_MONTHS = {
  janeiro: 0, fevereiro: 1, "março": 2, abril: 3, maio: 4, junho: 5,
  julho: 6, agosto: 7, setembro: 8, outubro: 9, novembro: 10, dezembro: 11,
};

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (EXTS.has(path.extname(e.name))) yield p;
  }
}

// Only listing-style lines count: race/event fields and "City · Date" rows.
// Narrative prose legitimately references past dates ("announced June 10,
// 2026") and must not trigger the sweep.
function isListingLine(line, file) {
  if (file.endsWith(".json")) return true;
  return /^\s*"?(where|date|meta)"?:\s/.test(line) || line.includes("·");
}

// FRESHNESS_TODAY pins "today" (YYYY-MM-DD) so the sweep can be tested against
// a future date without waiting for the calendar. Unset in normal runs.
const today = process.env.FRESHNESS_TODAY
  ? new Date(`${process.env.FRESHNESS_TODAY}T00:00:00`)
  : new Date();
today.setHours(0, 0, 0, 0);
const dayMs = 24 * 60 * 60 * 1000;
const daysFromToday = d => Math.round((d - today) / dayMs);

// ── Check 1: dates already in the past ───────────────────────────────────────

const stale = [];

for (const root of ROOTS) {
  if (!fs.existsSync(root)) continue;
  for (const file of walk(root)) {
    const lines = fs.readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      if (!isListingLine(line, file)) return;
      for (const m of line.matchAll(EN_DATE)) {
        const month = EN_MONTHS[m[1].slice(0, 3).toLowerCase()];
        const day = Number(m[3] ?? m[2]); // ranges stale only after the END day
        const d = new Date(Number(m[4]), month, day);
        if (d < today) stale.push({ file, line: i + 1, text: m[0].trim() });
      }
      for (const m of line.matchAll(PT_DATE)) {
        const month = PT_MONTHS[m[3].toLowerCase()];
        const day = Number(m[2] ?? m[1]);
        const d = new Date(Number(m[4]), month, day);
        if (d < today) stale.push({ file, line: i + 1, text: m[0].trim() });
      }
    });
  }
}

// ── Check 2: upcoming races whose status has not been re-verified ────────────

// Pulls the race date out of a `where` field ("Alameda, CA · July 10, 2027").
// Returns null for month-only entries ("Feb 2027") and annual anchors
// ("Abril (âncora anual)", "Etapas o ano todo") — those have no precise date
// to approach, so they are outside this check by design. Uses the START day of
// a range, since a multi-day weekend enters sell-out season on its first day.
function raceDate(where) {
  for (const m of where.matchAll(EN_DATE)) {
    return new Date(Number(m[4]), EN_MONTHS[m[1].slice(0, 3).toLowerCase()], Number(m[2]));
  }
  for (const m of where.matchAll(PT_DATE)) {
    return new Date(Number(m[4]), PT_MONTHS[m[3].toLowerCase()], Number(m[1]));
  }
  return null;
}

const unverified = [];

for (const file of RACE_FILES) {
  if (!fs.existsSync(file)) continue;
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  for (const races of Object.values(data)) {
    for (const race of races) {
      const date = raceDate(race.where);
      if (!date) continue;
      const daysOut = daysFromToday(date);
      if (daysOut < 0 || daysOut > VERIFY_WINDOW_DAYS) continue;

      const checkedAge = race.checked
        ? -daysFromToday(new Date(`${race.checked}T00:00:00`))
        : Infinity;
      if (checkedAge <= VERIFY_MAX_AGE_DAYS) continue;

      unverified.push({
        file,
        name: race.name,
        where: race.where,
        statusLabel: race.statusLabel,
        daysOut,
        checked: race.checked ?? "never",
      });
    }
  }
}

unverified.sort((a, b) => a.daysOut - b.daysOut);

// ── Report ───────────────────────────────────────────────────────────────────

if (stale.length === 0 && unverified.length === 0) {
  console.log("Content freshness: clean. No stale dates, no races due for a status re-check.");
  process.exit(0);
}

console.log(`Content freshness report (today: ${today.toISOString().slice(0, 10)})\n`);

if (stale.length > 0) {
  console.log(`## ${stale.length} date(s) already in the past\n`);
  for (const f of stale) {
    console.log(`- \`${f.file}:${f.line}\` — "${f.text}"`);
  }
  console.log(
    "\nFor each hit: remove the entry, reframe it as an annual anchor, or replace it with an upcoming edition."
  );
  console.log("");
}

if (unverified.length > 0) {
  console.log(`## ${unverified.length} upcoming race(s) due for a status re-check\n`);
  console.log(
    `Races within ${VERIFY_WINDOW_DAYS} days not verified in the last ${VERIFY_MAX_AGE_DAYS} days. ` +
    "Registration status drifts without any date changing, so these need eyes on the official site.\n"
  );
  for (const r of unverified) {
    const when = r.daysOut === 0 ? "today" : `in ${r.daysOut} day${r.daysOut === 1 ? "" : "s"}`;
    console.log(`- **${r.name}** (${when}) — currently "${r.statusLabel}" · last checked ${r.checked}`);
    console.log(`  ${r.where} · \`${r.file}\``);
  }
  console.log(
    "\nConfirm each against its official registration page, correct `status`/`statusLabel` if it moved, " +
    "and set `checked` to today's date either way."
  );
  console.log("");
}

console.log(
  "Race data lives in src/content/races-*.json; re-run `node scripts/generate-race-guide-pdf.js` after editing it."
);
process.exit(1);
