// Content freshness sweep. Three jobs:
//
//   1. RETIRE PAST RACES (--fix-past) — any race whose date has passed is
//      flipped to status "past" with a struck-through row and no register
//      link. This is pure date arithmetic against data we already hold, so it
//      needs no web lookup and no human: it is the one freshness fix that is
//      always safe to make automatically.
//   2. STALE DATES — any *other* listing date that has already passed, so
//      dispatch posts and prose never advertise a past event as upcoming.
//      Races already retired by job 1 are excluded; they are handled.
//   3. UNVERIFIED RACES — races whose `checked` stamp has gone stale.
//      Registration status (open, waitlist, sold out) drifts with no date
//      changing, and job 2 is blind to it. Reported in two tiers: `due` for
//      races inside the sell-out window, and a full staleness-ordered list so
//      the daily agent can keep grinding down the oldest stamps.
//
//   Run:  node scripts/content/check-stale-dates.mjs [--fix-past] [--json]
//   Exit: 0 when clean, 1 when anything needs attention (report on stdout).
//
// Consumed by two schedules that do different things:
//   - The daily agent (~/.claude/scheduled-tasks/content-freshness-check) runs
//     it with --fix-past --json, then re-verifies stale races against the web
//     and writes the results back. It commits and pushes without asking.
//   - .github/workflows/stale-dates.yml runs it read-only as a backstop and
//     files a GitHub issue plus a Notion card if the agent has fallen behind.
//
// Dependency-free on purpose so the workflow needs no npm install.

import fs from "node:fs";
import path from "node:path";

const FIX_PAST = process.argv.includes("--fix-past");
const AS_JSON = process.argv.includes("--json");

const ROOTS = ["src/app", "src/content", "src/i18n"];
const EXTS = new Set([".tsx", ".ts", ".json"]);

// The label a retired race carries, per data file. Written in the file's own
// language because the row renders straight onto that locale's page.
const RACE_FILES = [
  { path: "src/content/races-en.json", pastLabel: "Race is past" },
  { path: "src/content/races-br.json", pastLabel: "Prova já aconteceu" },
];

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


// Pulls the race date out of a `where` field ("Alameda, CA · July 10, 2027").
// Returns null for month-only entries ("Feb 2027") and annual anchors
// ("Abril (âncora anual)", "Etapas o ano todo") — those have no precise date
// to approach, so they are outside these checks by design. Uses the START day
// of a range for the sell-out window, since a multi-day weekend enters that
// window on its first day; retirement uses the END day (see below).
function raceDate(where, { end = false } = {}) {
  for (const m of where.matchAll(EN_DATE)) {
    const day = end ? Number(m[3] ?? m[2]) : Number(m[2]);
    return new Date(Number(m[4]), EN_MONTHS[m[1].slice(0, 3).toLowerCase()], day);
  }
  for (const m of where.matchAll(PT_DATE)) {
    const day = end ? Number(m[2] ?? m[1]) : Number(m[1]);
    return new Date(Number(m[4]), PT_MONTHS[m[3].toLowerCase()], day);
  }
  return null;
}

const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const TODAY_ISO = iso(today);

// ── Job 1: retire races whose date has passed ────────────────────────────────
//
// Safe to do unattended because it asks nothing of the world: the race date is
// already in our data and the calendar is not in dispute. Everything else in
// this file only reports, because everything else needs a source checked.
//
// A multi-day race weekend retires the day after its LAST day, so a Saturday
// 5K plus Sunday marathon stays live through Sunday.

const retired = [];

for (const { path: file, pastLabel } of RACE_FILES) {
  if (!fs.existsSync(file)) continue;
  const raw = fs.readFileSync(file, "utf8");
  const data = JSON.parse(raw);
  let changed = false;

  for (const races of Object.values(data)) {
    for (const race of races) {
      if (race.status === "past") continue;
      const date = raceDate(race.where, { end: true });
      if (!date || date >= today) continue;

      retired.push({
        file,
        name: race.name,
        where: race.where,
        was: race.statusLabel,
      });

      if (FIX_PAST) {
        race.status = "past";
        race.statusLabel = pastLabel;
        race.checked = TODAY_ISO;
        changed = true;
      }
    }
  }

  if (changed) {
    fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
  }
}

// A retired race still carries a past date in `where`, which is correct and
// must not re-trigger job 2. Job 2 skips the race files entirely: race data has
// its own dedicated jobs here, and the prose scan is for everything else.
const RACE_PATHS = new Set(RACE_FILES.map(f => f.path));

// ── Job 2: past dates in prose and listings outside the race data ────────────

const stale = [];

for (const root of ROOTS) {
  if (!fs.existsSync(root)) continue;
  for (const file of walk(root)) {
    if (RACE_PATHS.has(file)) continue;
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

// ── Job 3: races whose status has not been re-verified ───────────────────────
//
// Two tiers. `due` is the urgent set: close enough to race day that entries are
// selling out, and not confirmed recently. `stalest` is every live race ordered
// oldest-stamp-first, because the guide's public "as of" date is the OLDEST
// stamp in the list (see VERIFIED in the guide page). That date only moves when
// the tail moves, so the daily agent always has the tail to work on.

const due = [];
const allLive = [];

for (const { path: file } of RACE_FILES) {
  if (!fs.existsSync(file)) continue;
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  for (const races of Object.values(data)) {
    for (const race of races) {
      if (race.status === "past") continue;

      const checkedAge = race.checked
        ? -daysFromToday(new Date(`${race.checked}T00:00:00`))
        : Infinity;

      const entry = {
        file,
        name: race.name,
        where: race.where,
        status: race.status,
        statusLabel: race.statusLabel,
        url: race.url,
        checked: race.checked ?? "never",
        checkedAge: Number.isFinite(checkedAge) ? checkedAge : null,
      };
      allLive.push(entry);

      const date = raceDate(race.where);
      if (!date) continue;
      const daysOut = daysFromToday(date);
      if (daysOut < 0 || daysOut > VERIFY_WINDOW_DAYS) continue;
      if (checkedAge <= VERIFY_MAX_AGE_DAYS) continue;

      due.push({ ...entry, daysOut });
    }
  }
}

due.sort((a, b) => a.daysOut - b.daysOut);
allLive.sort((a, b) => (b.checkedAge ?? 1e9) - (a.checkedAge ?? 1e9));

// ── Report ───────────────────────────────────────────────────────────────────

const findings = retired.length + stale.length + due.length;

if (AS_JSON) {
  console.log(JSON.stringify({
    today: TODAY_ISO,
    fixPastApplied: FIX_PAST,
    retired,
    staleDates: stale,
    due,
    stalest: allLive.slice(0, 12),
    oldestStamp: allLive.length ? allLive[0].checked : null,
  }, null, 2));
  process.exit(findings > 0 ? 1 : 0);
}

if (findings === 0) {
  console.log("Content freshness: clean. No past races, no stale dates, no races due for a status re-check.");
  process.exit(0);
}

console.log(`Content freshness report (today: ${TODAY_ISO})\n`);

if (retired.length > 0) {
  const verb = FIX_PAST ? "Retired" : "Needs retiring";
  console.log(`## ${verb}: ${retired.length} race(s) whose date has passed\n`);
  for (const r of retired) {
    console.log(`- **${r.name}** — was "${r.was}"`);
    console.log(`  ${r.where} · \`${r.file}\``);
  }
  console.log(
    FIX_PAST
      ? "\nEach is now struck through with no register link. Re-run the PDF generator and commit."
      : "\nRe-run with --fix-past to strike these through automatically."
  );
  console.log("");
}

if (stale.length > 0) {
  console.log(`## ${stale.length} date(s) already in the past, outside the race data\n`);
  for (const f of stale) {
    console.log(`- \`${f.file}:${f.line}\` — "${f.text}"`);
  }
  console.log(
    "\nFor each hit: remove the entry, reframe it as an annual anchor, or replace it with an upcoming edition."
  );
  console.log("");
}

if (due.length > 0) {
  console.log(`## ${due.length} upcoming race(s) due for a status re-check\n`);
  console.log(
    `Races within ${VERIFY_WINDOW_DAYS} days not verified in the last ${VERIFY_MAX_AGE_DAYS} days. ` +
    "Registration status drifts without any date changing, so these need eyes on the official site.\n"
  );
  for (const r of due) {
    const when = r.daysOut === 0 ? "today" : `in ${r.daysOut} day${r.daysOut === 1 ? "" : "s"}`;
    console.log(`- **${r.name}** (${when}) — currently "${r.statusLabel}" · last checked ${r.checked}`);
    console.log(`  ${r.where} · ${r.url}`);
  }
  console.log(
    "\nConfirm each against its official registration page AND one independent source, correct " +
    "`status`/`statusLabel` if it moved, and set `checked` to today's date either way."
  );
  console.log("");
}

if (allLive.length > 0) {
  console.log(`Oldest verification stamp in the guide: ${allLive[0].checked} (${allLive[0].name}).`);
  console.log("The guide's public \"as of\" date is this stamp, so re-verifying the tail is what moves it.\n");
}

console.log(
  "Race data lives in src/content/races-*.json; re-run `node scripts/generate-race-guide-pdf.js` after editing it."
);
process.exit(1);
