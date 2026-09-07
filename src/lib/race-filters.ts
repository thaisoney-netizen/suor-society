// Filtering for the race finder tool (/racepicks).
//
// The finder renders the SAME src/content/races-en.json the guide pages and the
// gated PDFs render. That is the whole point of building it here: the daily
// freshness agent already retires past races, moves statuses and re-stamps
// `checked` in that file, so the tool inherits a maintained dataset instead of
// carrying a second copy that goes stale in its own direction.
//
// Everything below parses the display strings the guide already stores rather
// than adding parallel machine-readable fields. A `state` or `startDate` column
// would be a second source of truth for something `where` already says, and the
// freshness agent edits `where`, not columns it has never heard of.
import type { Race } from "@/components/RaceRow";

export type RaceGroup = "ca" | "us";

/** A race plus the facets parsed out of its display strings. */
export type IndexedRace = Race & {
  group: RaceGroup;
  /** Two-letter state, or null when `where` names no state ("Washington D.C."). */
  state: string | null;
  /** Start of the race, or of its weekend when `where` gives a range. */
  start: Date;
  /** Last day the race is still running: the end of a weekend range, or the end
   *  of the month when `where` names no day. Used to decide "already run",
   *  because a Saturday-to-Sunday festival is not past on the Sunday. */
  end: Date;
  /** True when `where` gives only a month ("Feb 2027"), so the day is a guess. */
  monthOnly: boolean;
  /** Canonical distance buckets, deduped ("Rosé 5K (Saturday)" counts as 5K). */
  distances: DistanceKey[];
  /** Lowest dollar figure in `price`, or null when the row has no number. */
  priceFrom: number | null;
  /** True when the fields above were refreshed from the registration platform
   *  rather than read off the curated row. Drives the "Live" marker. */
  isLive?: boolean;
  /** Direct link to the checkout, when the platform gave us one. Kept separate
   *  from `url`, which stays Thais's editorial choice of official race site. */
  signupUrl?: string | null;
};

export const DISTANCES = ["5K", "10K", "half", "marathon", "other"] as const;
export type DistanceKey = (typeof DISTANCES)[number];

export const DISTANCE_LABELS: Record<DistanceKey, string> = {
  "5K": "5K",
  "10K": "10K",
  half: "Half marathon",
  marathon: "Full marathon",
  other: "Other distances",
};

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

/** `where` is always "<place> · <date>". Split on the middot, not a comma:
 *  several places carry their own comma ("Arlington, VA / Washington D.C."). */
function splitWhere(where: string): { place: string; date: string } {
  const i = where.indexOf("·");
  if (i === -1) return { place: where.trim(), date: "" };
  return { place: where.slice(0, i).trim(), date: where.slice(i + 1).trim() };
}

/** Last ", XX" in the place, uppercase. Returns null for "Washington D.C.",
 *  which names no state, and takes VA from "Arlington, VA / Washington D.C." */
function parseState(place: string): string | null {
  const m = place.match(/,\s*([A-Z]{2})\b/g);
  if (!m || m.length === 0) return null;
  return m[0].replace(/[,\s]/g, "");
}

/** Handles "Oct 4, 2026", "Oct 10-11, 2026" (takes the 10) and "Feb 2027"
 *  (day unknown, so the 1st, flagged monthOnly). Month names come both full
 *  and abbreviated in the data, so match on the first three letters. */
function parseDate(date: string): { start: Date; end: Date; monthOnly: boolean } {
  const year = Number(date.match(/(\d{4})\s*$/)?.[1]);
  const monthWord = date.match(/[A-Za-z]+/)?.[0]?.toLowerCase() ?? "";
  const month = MONTHS.findIndex(m => m.startsWith(monthWord.slice(0, 3)));
  // "Oct 10-11, 2026" gives 10 and 11. "Oct 4, 2026" gives 4 and nothing.
  const range = date.match(/\b(\d{1,2})(?:\s*-\s*(\d{1,2}))?\b(?![\d])/);
  const day = Number(range?.[1]);
  const lastDay = Number(range?.[2]);

  if (!Number.isFinite(year) || month === -1) {
    // Unparseable: sort it to the end rather than to 1970, where it would
    // masquerade as the next race up.
    const far = new Date(8640000000000000);
    return { start: far, end: far, monthOnly: true };
  }
  const monthOnly = !Number.isFinite(day);
  const start = new Date(year, month, monthOnly ? 1 : day);
  // No day means the whole month is still ahead of us until it ends.
  const end = monthOnly
    ? new Date(year, month + 1, 0)
    : new Date(year, month, Number.isFinite(lastDay) ? lastDay : day);
  return { start, end, monthOnly };
}

/** Buckets the "·"-separated distance list. A row lists what it offers, so one
 *  race can land in several buckets and the filter is an "offers this" test. */
function parseDistances(dists: string): DistanceKey[] {
  const out = new Set<DistanceKey>();
  for (const raw of dists.split("·")) {
    const d = raw.trim().toLowerCase();
    if (!d) continue;
    if (/\b5k\b/.test(d)) out.add("5K");
    else if (/\b10k\b/.test(d)) out.add("10K");
    else if (/half/.test(d)) out.add("half");
    else if (/marathon/.test(d)) out.add("marathon");
    else out.add("other");
  }
  return [...out];
}

/** Lowest dollar figure in the price string, or null when there is no number.
 *  Most rows say "Check site", "Dynamic pricing" or "Waitlist only", which is
 *  a real answer and not missing data: those races price at the door. The
 *  finder has to disclose how many it hides rather than pretend they scored 0. */
function parsePrice(price?: string): number | null {
  if (!price) return null;
  const nums = [...price.matchAll(/\$\s*([\d,]+(?:\.\d{1,2})?)/g)]
    .map(m => Number(m[1].replace(/,/g, "")))
    .filter(n => Number.isFinite(n));
  return nums.length ? Math.min(...nums) : null;
}

export function indexRace(race: Race, group: RaceGroup): IndexedRace {
  const { place, date } = splitWhere(race.where);
  const { start, end, monthOnly } = parseDate(date);
  return {
    ...race,
    group,
    state: parseState(place),
    start,
    end,
    monthOnly,
    distances: parseDistances(race.dists),
    priceFrom: parsePrice(race.price),
  };
}

export function indexAll(ca: Race[], us: Race[]): IndexedRace[] {
  return [
    ...ca.map(r => indexRace(r, "ca")),
    ...us.map(r => indexRace(r, "us")),
  ].sort((a, b) => a.start.getTime() - b.start.getTime());
}

/** Split the list at today.
 *
 *  The guide keeps a race that has been run, struck through, on purpose: a
 *  deleted row reads as though the race moved. A finder answers a different
 *  question, "what can I still enter", so a race that has already happened is
 *  noise in it, and its `status` cannot be trusted to say so. The freshness
 *  agent retires past races on its own schedule, which means the data can carry
 *  an `open` race whose date went by last month. Date arithmetic is the only
 *  thing that knows for sure, so the finder does it here rather than reading
 *  `status`, and reports the count instead of quietly shrinking the list. */
export function partitionByDate(races: IndexedRace[], today = new Date()) {
  const midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const upcoming = races.filter(r => r.end.getTime() >= midnight);
  const alreadyRun = races.filter(r => r.end.getTime() < midnight);
  return { upcoming, alreadyRun };
}

// ── Price bands ──────────────────────────────────────────────────────────────
// Bands are derived from the races that actually carry a number, so the finder
// can never offer a band that matches nothing. The version of this tool built
// outside the repo hardcoded three bands against twenty races, sixteen of which
// had no price, and its "$150+" option returned zero results every single time.

export type PriceBand = { id: string; label: string; min: number; max: number };

const BAND_SHAPES: Omit<PriceBand, "id">[] = [
  { label: "Under $75", min: 0, max: 74.99 },
  { label: "$75 to $149", min: 75, max: 149.99 },
  { label: "$150 and up", min: 150, max: Infinity },
];

/** Only the bands with at least one race in them. */
export function priceBands(races: IndexedRace[]): PriceBand[] {
  return BAND_SHAPES
    .map((b, i) => ({ ...b, id: `band-${i}` }))
    .filter(b => races.some(r => r.priceFrom !== null && r.priceFrom >= b.min && r.priceFrom <= b.max));
}

// ── Filtering ────────────────────────────────────────────────────────────────

export type Filters = {
  state: string | null;
  month: string | null;
  distance: DistanceKey | null;
  band: string | null;
  openOnly: boolean;
};

export const EMPTY_FILTERS: Filters = {
  state: null, month: null, distance: null, band: null, openOnly: false,
};

export const monthKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

export const monthLabel = (key: string) => {
  const [y, m] = key.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

/** Facet options present in the data, so every option returns at least one race
 *  before other filters narrow it. */
export function facets(races: IndexedRace[]) {
  const states = [...new Set(races.map(r => r.state).filter((s): s is string => Boolean(s)))].sort();
  const months = [...new Set(races.map(r => monthKey(r.start)))].sort();
  const distances = DISTANCES.filter(d => races.some(r => r.distances.includes(d)));
  return { states, months, distances, bands: priceBands(races) };
}

export function applyFilters(races: IndexedRace[], f: Filters, bands: PriceBand[]): IndexedRace[] {
  const band = f.band ? bands.find(b => b.id === f.band) ?? null : null;
  return races.filter(r => {
    if (f.state && r.state !== f.state) return false;
    if (f.month && monthKey(r.start) !== f.month) return false;
    if (f.distance && !r.distances.includes(f.distance)) return false;
    // "Registration open now" means open, not "open or partly open". A row at
    // `limit` is a waitlist, a single distance, or a window that has not opened,
    // and every one of those breaks the promise this toggle makes.
    if (f.openOnly && r.status !== "open") return false;
    if (band) {
      if (r.priceFrom === null) return false;
      if (r.priceFrom < band.min || r.priceFrom > band.max) return false;
    }
    return true;
  });
}

/** How many races a price filter is hiding purely for having no listed price.
 *  Shown next to the result count: a filter that silently drops most of the
 *  list reads as "there are only two races" when it means "we only know two
 *  prices". Returns 0 when no band is selected. */
export function hiddenByPrice(races: IndexedRace[], f: Filters, bands: PriceBand[]): number {
  if (!f.band) return 0;
  const withoutBand = applyFilters(races, { ...f, band: null }, bands);
  return withoutBand.filter(r => r.priceFrom === null).length;
}

// ── Freshness ────────────────────────────────────────────────────────────────

/** The OLDEST `checked` stamp in the list, formatted, or null when any race is
 *  unstamped. Same rule as VERIFIED on the guide page, and for the same reason:
 *  the only honest reading of "checked on X" is that every race has been
 *  confirmed since X, so one race verified today must not paper over the rest.
 *  AGENTS.md rule 9: copy that restates the data is generated from it. */
export function verifiedDate(races: IndexedRace[]): string | null {
  const stamps = races.map(r => r.checked).filter((c): c is string => Boolean(c)).sort();
  if (stamps.length === 0 || stamps.length < races.length) return null;
  return new Date(`${stamps[0]}T00:00:00`).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
}

/** Days between the oldest stamp and `today`. The finder uses this to decide
 *  whether to say "checked recently" or to warn, rather than trusting a date
 *  the reader has to do arithmetic on. Null when any race is unstamped. */
export function stalenessDays(races: IndexedRace[], today = new Date()): number | null {
  const stamps = races.map(r => r.checked).filter((c): c is string => Boolean(c)).sort();
  if (stamps.length === 0 || stamps.length < races.length) return null;
  const oldest = new Date(`${stamps[0]}T00:00:00`).getTime();
  return Math.floor((today.getTime() - oldest) / 86_400_000);
}

// ── Live overlay ─────────────────────────────────────────────────────────────

/** What the server fetched from the registration platform, serialised. */
export type LiveInfo = {
  date: string | null;
  open: boolean;
  signupUrl: string | null;
  sellsHere: boolean;
};

/** Overlays live platform data onto the curated rows.
 *
 *  Applied BEFORE filtering and sorting so a corrected date reorders the list
 *  rather than sitting in a badge under the wrong month.
 *
 *  Status is only overridden when the platform actually sells the race
 *  (`sellsHere`). A race that merely lists its events there reports "closed"
 *  with no checkout attached, and believing that would retire a race that is
 *  still taking entries on its own site.
 *
 *  The curated `url` is left alone. It is Thais's pick of official race site
 *  and it usually carries the course and logistics; the checkout link rides
 *  alongside it as `signupUrl`.
 *
 *  Price is deliberately NOT overlaid. See the note in race-live.ts: the API
 *  cannot distinguish a public entry fee from an employer-restricted one. */
export function applyLive(races: IndexedRace[], live: Record<number, LiveInfo>): IndexedRace[] {
  return races
    .map(r => {
      const l = r.runSignupId ? live[r.runSignupId] : undefined;
      if (!l) return r;

      const d = l.date ? new Date(l.date) : null;

      return {
        ...r,
        start: d ?? r.start,
        end: d ?? r.end,
        monthOnly: d ? false : r.monthOnly,
        status: l.sellsHere ? (l.open ? "open" : "sold") : r.status,
        statusLabel: l.sellsHere
          ? (l.open ? "Registration open" : "Registration closed")
          : r.statusLabel,
        signupUrl: l.signupUrl,
        isLive: true,
      } as IndexedRace;
    })
    .sort((a, b) => a.start.getTime() - b.start.getTime());
}

/** How many rows on screen are refreshing themselves. */
export const liveCount = (races: IndexedRace[]) => races.filter(r => r.isLive).length;
