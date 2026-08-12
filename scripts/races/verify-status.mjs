/**
 * Race registration status verifier (Firecrawl).
 *
 * The weekly freshness sweep (scripts/content/check-stale-dates.mjs) tells us
 * WHICH races are due for a re-check. It cannot tell us what the answer is —
 * that has meant opening 54 official race sites by hand. This reads those pages
 * with Firecrawl and turns the sweep's to-do list into a verdict list.
 *
 * AGENTS.md rule 7 says never stamp `checked` on a race you did not actually
 * verify, so the safety model here is deliberately lopsided:
 *
 *   CONFIRMED  – the page agrees with the JSON. Safe to auto-stamp `checked`,
 *                because a real read of the real page happened.
 *   CHANGED    – the page disagrees. Reported, never written. Registration
 *                status is published copy; a model misreading one sentence
 *                should not silently rewrite the guide. Human confirms.
 *   UNCLEAR    – the page did not say (many `url` fields point at a homepage,
 *                not a registration page). Reported as needing eyes.
 *
 * So `--write` only ever advances dates on races nothing changed about.
 *
 * Requires:
 *   FIRECRAWL_API_KEY – https://firecrawl.dev dashboard (GitHub Secret)
 *
 * Run:
 *   node scripts/races/verify-status.mjs            # due races, dry run
 *   node scripts/races/verify-status.mjs --all      # every race
 *   node scripts/races/verify-status.mjs --write    # stamp confirmations
 *
 * Exit: 0 when nothing needs a human, 1 when something does — same contract as
 * check-stale-dates.mjs, so it pipes into notify-board.mjs unchanged.
 */

import fs from "node:fs";

// Firecrawl v2. If a response comes back without `json`, check the current
// docs — v1 returned the same payload under `extract`, handled below.
const API = "https://api.firecrawl.dev/v2/scrape";
const RACE_FILES = ["src/content/races-en.json", "src/content/races-br.json"];

// Mirrors check-stale-dates.mjs so both scripts flag the same set of races.
const VERIFY_WINDOW_DAYS = 45;
const VERIFY_MAX_AGE_DAYS = 30;

const CONCURRENCY = 3; // polite, and well under Firecrawl's rate limits
const RETRIES = 2;

const args = new Set(process.argv.slice(2));
const CHECK_ALL = args.has("--all");
const WRITE = args.has("--write");

const today = new Date();
today.setHours(0, 0, 0, 0);
const todayISO = today.toISOString().slice(0, 10);
const dayMs = 24 * 60 * 60 * 1000;

// ── Which races are due ───────────────────────────────────────────────────────

const EN_DATE =
  /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\.?\s+(\d{1,2})(?:\s*(?:to|-|–|and)\s*(\d{1,2}))?,?\s+(\d{4})/g;
const PT_DATE =
  /\b(\d{1,2})(?:\s*(?:a|e)\s*(\d{1,2}))?\s+de\s+(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\s+de\s+(\d{4})/gi;
const EN_MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
const PT_MONTHS = {
  janeiro: 0, fevereiro: 1, "março": 2, abril: 3, maio: 4, junho: 5,
  julho: 6, agosto: 7, setembro: 8, outubro: 9, novembro: 10, dezembro: 11,
};

function raceDate(where) {
  for (const m of where.matchAll(EN_DATE)) {
    return new Date(Number(m[4]), EN_MONTHS[m[1].slice(0, 3).toLowerCase()], Number(m[2]));
  }
  for (const m of where.matchAll(PT_DATE)) {
    return new Date(Number(m[4]), PT_MONTHS[m[3].toLowerCase()], Number(m[1]));
  }
  return null;
}

function isDue(race) {
  if (CHECK_ALL) return true;
  const date = raceDate(race.where);
  if (!date) return false; // month-only and annual anchors have no date to approach
  const daysOut = Math.round((date - today) / dayMs);
  if (daysOut < 0 || daysOut > VERIFY_WINDOW_DAYS) return false;
  if (!race.checked) return true;
  const age = Math.round((today - new Date(`${race.checked}T00:00:00`)) / dayMs);
  return age > VERIFY_MAX_AGE_DAYS;
}

// ── Firecrawl ─────────────────────────────────────────────────────────────────

// `evidence` is not decoration: it is the sentence a human reads to confirm a
// CHANGED verdict without reopening the site, and asking for it keeps the
// extraction anchored to page text instead of the model's own guess.
const SCHEMA = {
  type: "object",
  properties: {
    registrationState: {
      type: "string",
      enum: ["open", "limited", "closed", "not_yet_open", "unknown"],
      description:
        "open = anyone can sign up now. limited = some distances sold out, or waitlist/lottery only. " +
        "closed = sold out or registration ended. not_yet_open = a future opening date is named. " +
        "unknown = the page does not say.",
    },
    soldOutDistances: { type: "array", items: { type: "string" } },
    openDistances: { type: "array", items: { type: "string" } },
    priceFrom: { type: ["string", "null"], description: "Lowest entry price with currency, e.g. $49.75 or R$180" },
    raceDate: { type: ["string", "null"], description: "Race date as printed on the page" },
    evidence: { type: "string", description: "The exact sentence or label on the page that establishes the state" },
  },
  required: ["registrationState", "evidence"],
};

const PROMPT =
  "This is the official site for a running race. Report the CURRENT registration status only, " +
  "using what the page actually says. Do not infer from the race date. If the page shows a " +
  "registration button, note whether it is active or disabled. If different distances have " +
  "different statuses, list them separately. If the page does not clearly state registration " +
  "status, return unknown rather than guessing.";

async function scrape(url, key) {
  const res = await fetch(API, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      url,
      formats: [{ type: "json", prompt: PROMPT, schema: SCHEMA }],
      onlyMainContent: true,
      // Race sites lean on JS widgets from RunSignup and Race Roster; the
      // status often paints after first render.
      waitFor: 2500,
    }),
    signal: AbortSignal.timeout(90000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const body = await res.json();
  const data = body.data ?? body;
  const extracted = data.json ?? data.extract;
  if (!extracted?.registrationState) throw new Error("no structured data in response");
  return extracted;
}

async function scrapeWithRetry(url, key) {
  let lastErr;
  for (let attempt = 0; attempt <= RETRIES; attempt++) {
    try {
      return await scrape(url, key);
    } catch (err) {
      lastErr = err;
      if (attempt < RETRIES) await new Promise(r => setTimeout(r, 2000 * 2 ** attempt));
    }
  }
  throw lastErr;
}

// ── Verdicts ──────────────────────────────────────────────────────────────────

// The guide uses three status values; the page can say five things.
const TO_STATUS = {
  open: "open",
  limited: "limit",
  closed: "sold",
  not_yet_open: "limit", // the guide files "opens Dec 1" style entries under limit
};

function verdictFor(race, found) {
  if (found.registrationState === "unknown") {
    return { kind: "UNCLEAR", note: "page does not state registration status" };
  }
  const mapped = TO_STATUS[found.registrationState];
  if (mapped === race.status) return { kind: "CONFIRMED", note: `still ${race.status}` };
  return { kind: "CHANGED", note: `${race.status} → ${mapped}` };
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function pooled(items, size, worker) {
  const out = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(size, items.length) }, async () => {
      while (i < items.length) out.push(await worker(items[i++]));
    })
  );
  return out;
}

async function main() {
  const key = process.env.FIRECRAWL_API_KEY;
  if (!key) {
    console.error("FIRECRAWL_API_KEY must be set. Get one at https://firecrawl.dev");
    process.exit(1);
  }

  const files = new Map();
  const due = [];
  for (const file of RACE_FILES) {
    if (!fs.existsSync(file)) continue;
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    files.set(file, data);
    for (const races of Object.values(data)) {
      for (const race of races) {
        if (race.url && isDue(race)) due.push({ file, race });
      }
    }
  }

  if (due.length === 0) {
    console.log("Race status: nothing due for verification.");
    process.exit(0);
  }

  console.error(`Verifying ${due.length} race${due.length === 1 ? "" : "s"} against official sites...`);

  const results = await pooled(due, CONCURRENCY, async ({ file, race }) => {
    try {
      const found = await scrapeWithRetry(race.url, key);
      console.error(`  ok   ${race.name}`);
      return { file, race, found, ...verdictFor(race, found) };
    } catch (err) {
      console.error(`  fail ${race.name}: ${err.message}`);
      return { file, race, kind: "ERROR", note: err.message };
    }
  });

  const by = kind => results.filter(r => r.kind === kind);
  const confirmed = by("CONFIRMED");
  const changed = by("CHANGED");
  const unclear = by("UNCLEAR");
  const errored = by("ERROR");

  // Confirmations are the only thing safe to write: the JSON is not edited,
  // only its `checked` stamp advances, and it advances because a real read
  // agreed with what is already published.
  if (WRITE && confirmed.length > 0) {
    for (const r of confirmed) r.race.checked = todayISO;
    for (const [file, data] of files) {
      fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
    }
  }

  console.log(`Race status verification (${todayISO})\n`);

  if (confirmed.length > 0) {
    console.log(`## ${confirmed.length} confirmed unchanged\n`);
    for (const r of confirmed) console.log(`- **${r.race.name}** — ${r.note}`);
    console.log(
      WRITE
        ? `\n\`checked\` advanced to ${todayISO} for these.\n`
        : "\nRe-run with --write to stamp these as checked today.\n"
    );
  }

  if (changed.length > 0) {
    console.log(`## ${changed.length} status change(s) to review\n`);
    console.log("Not written automatically. Confirm each against the site, then edit the JSON.\n");
    for (const r of changed) {
      console.log(`- **${r.race.name}** — ${r.note}`);
      console.log(`  currently "${r.race.statusLabel}"`);
      console.log(`  page says: "${(r.found.evidence ?? "").slice(0, 220)}"`);
      if (r.found.soldOutDistances?.length) console.log(`  sold out: ${r.found.soldOutDistances.join(", ")}`);
      if (r.found.openDistances?.length) console.log(`  open: ${r.found.openDistances.join(", ")}`);
      if (r.found.priceFrom) console.log(`  price from: ${r.found.priceFrom}`);
      console.log(`  ${r.race.url} · \`${r.file}\``);
    }
    console.log("");
  }

  if (unclear.length > 0) {
    console.log(`## ${unclear.length} race(s) the page did not answer\n`);
    console.log("Usually means `url` points at a homepage rather than a registration page.\n");
    for (const r of unclear) console.log(`- **${r.race.name}** — ${r.race.url}`);
    console.log("");
  }

  if (errored.length > 0) {
    console.log(`## ${errored.length} fetch failure(s)\n`);
    for (const r of errored) console.log(`- **${r.race.name}** — ${r.note} (${r.race.url})`);
    console.log("");
  }

  console.log("Race data lives in src/content/races-*.json; re-run `node scripts/generate-race-guide-pdf.js` after editing it.");

  const needsHuman = changed.length + unclear.length + errored.length;
  process.exit(needsHuman > 0 ? 1 : 0);
}

main().catch(err => {
  console.error("Fatal:", err);
  process.exit(1);
});
