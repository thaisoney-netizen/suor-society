// Scans site content for calendar dates that have already passed, so race
// guides and dispatch posts never advertise a past event as upcoming.
//
//   Run:  node scripts/content/check-stale-dates.mjs
//   Exit: 0 when clean, 1 when stale dates were found (report on stdout).
//
// Runs monthly via .github/workflows/stale-dates.yml, which opens a GitHub
// issue with the report. Dependency-free on purpose so the workflow needs no
// npm install.

import fs from "node:fs";
import path from "node:path";

const ROOTS = ["src/app", "src/content", "src/i18n"];
const EXTS = new Set([".tsx", ".ts", ".json"]);

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

const today = new Date();
today.setHours(0, 0, 0, 0);
const findings = [];

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
        if (d < today) findings.push({ file, line: i + 1, text: m[0].trim() });
      }
      for (const m of line.matchAll(PT_DATE)) {
        const month = PT_MONTHS[m[3].toLowerCase()];
        const day = Number(m[2] ?? m[1]);
        const d = new Date(Number(m[4]), month, day);
        if (d < today) findings.push({ file, line: i + 1, text: m[0].trim() });
      }
    });
  }
}

if (findings.length === 0) {
  console.log("No stale dates found.");
  process.exit(0);
}

console.log(`Found ${findings.length} date(s) already in the past (today: ${today.toISOString().slice(0, 10)}):\n`);
for (const f of findings) {
  console.log(`- \`${f.file}:${f.line}\` — "${f.text}"`);
}
console.log(
  "\nFor each hit: remove the entry, reframe it as an annual anchor, or replace it with an upcoming edition. Race data lives in src/content/races-*.json; re-run `node scripts/generate-race-guide-pdf.js` after editing it."
);
process.exit(1);
