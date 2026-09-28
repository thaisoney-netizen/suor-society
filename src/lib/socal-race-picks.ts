// The SoCal race-choice post (/culture/which-race-to-sign-up-for and its pt-BR
// twin) compares a handful of races that already live in races-en.json.
//
// Everything a reader could check against the race data is read from that
// JSON here, never typed into the page: dates, weeks away, prices, status and
// the "which halves are still open" FAQ answer. AGENTS.md rule 9 exists
// because hand-typed race facts drifted from the rows for weeks. When the
// freshness agent moves a status or retires a race, this post follows.
//
// The page revalidates daily, so "weeks away" counts down on its own and a
// race drops out of the table the day after it is run.

import races from "@/content/races-en.json";
import type { Race, RaceStatus } from "@/components/RaceRow";
import { indexRace } from "@/lib/race-filters";

/** Which rows the post compares, by exact `name` in races-en.json. Ordered
 *  nearest first only for readability; the table sorts by date anyway. */
export const PICKS = {
  runThrough: "RunThrough Long Beach Half, 10K & 5K",
  silverStrand: "Silver Strand Half Marathon, 10 Miler, 12K & 5K",
  santaBarbara: "Santa Barbara Half Marathon & 5K",
  thrive: "Kaiser Permanente Thrive San Diego Half Marathon & 5K",
  turkeyTrot: "O'side Turkey Trot",
  holidayHalf: "San Diego Holiday Half Marathon & 5K",
  carlsbad: "Carlsbad Marathon, Half & 5K",
} as const;
export type PickKey = keyof typeof PICKS;

/** The table stops at the end of the year: Carlsbad is the January fallback
 *  in the copy, not a row. */
const TABLE_KEYS: PickKey[] = [
  "runThrough",
  "silverStrand",
  "santaBarbara",
  "thrive",
  "turkeyTrot",
  "holidayHalf",
];

const DAY = 24 * 60 * 60 * 1000;

export type PickRow = Race & { key: PickKey; start: Date; weeks: number };

function find(key: PickKey): PickRow {
  const race = (races.ca as Race[]).find(r => r.name === PICKS[key]);
  // Fail the build, not the page: a renamed row must not silently vanish.
  if (!race) throw new Error(`socal-race-picks: no race named "${PICKS[key]}" in races-en.json`);
  const { start } = indexRace(race, "ca");
  const weeks = Math.max(0, Math.round((start.getTime() - Date.now()) / (7 * DAY)));
  return { ...race, key, start, weeks };
}

export function pick(key: PickKey): PickRow {
  return find(key);
}

/** Rows still ahead of us, soonest first. A race that has been run (by date or
 *  by the agent's `past` status) leaves the table rather than sitting in it
 *  struck through: this post is about what you can still sign up for. */
export function tableRows(today = new Date()): PickRow[] {
  const midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return TABLE_KEYS.map(find)
    .filter(r => r.status !== "past" && r.start >= midnight)
    .sort((a, b) => a.start.getTime() - b.start.getTime());
}

/** Oldest `checked` stamp among the rows shown, so the "as of" line can only
 *  ever understate how fresh the table is. Same rule as VERIFIED on the guide. */
export function checkedAsOf(rows: PickRow[]): string | null {
  const stamps = rows.map(r => r.checked).filter((c): c is string => Boolean(c)).sort();
  return stamps[0] ?? null;
}

const HALF = /half marathon/i;

/** Open rows that offer a half, for the FAQ answer. */
export function openHalves(rows: PickRow[]): PickRow[] {
  return rows.filter(r => (r.status === "open" || r.status === "limit") && HALF.test(r.dists));
}

export function formatDate(d: Date, lang: "en" | "pt"): string {
  return lang === "pt"
    ? d.toLocaleDateString("pt-BR", { day: "numeric", month: "long" })
    : d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}

export function weeksAway(weeks: number, lang: "en" | "pt"): string {
  if (lang === "pt") {
    if (weeks === 0) return "Esta semana";
    return weeks === 1 ? "Falta 1 semana" : `Faltam ${weeks} semanas`;
  }
  if (weeks === 0) return "This week";
  return weeks === 1 ? "1 week away" : `${weeks} weeks away`;
}

/** City only: "Coronado, CA · Nov 8, 2026" gives "Coronado". */
export function city(race: Race): string {
  return race.where.split("·")[0].split(",")[0].trim();
}

const PT_STATUS: Record<RaceStatus, string> = {
  open: "Inscrições abertas",
  limit: "Poucas vagas",
  sold: "Esgotada",
  past: "Prova já aconteceu",
};

/** pt-BR has no statusLabel of its own for EN races, so it maps the enum.
 *  The EN label carries detail ("Sold out, 2027 waitlist open") that the
 *  enum drops; the pt-BR row keeps the part a reader acts on. */
export function statusText(race: Race, lang: "en" | "pt"): string {
  return lang === "pt" ? PT_STATUS[race.status] : race.statusLabel;
}

const PT_DISTS: [RegExp, string][] = [
  [/Half Marathon Relay/g, "Revezamento da meia"],
  [/Half Marathon/g, "Meia maratona"],
  [/Full Marathon/g, "Maratona"],
  [/10 Mile/g, "10 milhas"],
];

export function distsText(race: Race, lang: "en" | "pt"): string {
  if (lang === "en") return race.dists;
  return PT_DISTS.reduce((s, [re, to]) => s.replace(re, to), race.dists);
}

export function priceText(race: Race, lang: "en" | "pt"): string {
  const p = race.price ?? "";
  if (lang === "en") return p;
  if (/^check site$/i.test(p)) return "Ver no site";
  return p.replace(/^From\s+/i, "A partir de ").replace(/\$/g, "US$");
}
