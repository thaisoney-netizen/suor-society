// Live registration data for the races that can supply it.
//
// Why only some of them. The guide's 39 races sell through about ten different
// registration platforms (RunSignup, RaceRoster, Haku, Athlinks, and several
// race-owned checkouts). Only RunSignup publishes a free read API, and a name
// search across the rest is actively dangerous: searching "Twin Cities
// Marathon" returns a different half marathon in Bloomington, and "Honolulu
// Marathon" returns a charity fundraising team. Both would have put a wrong
// date on a real race.
//
// So nothing here is matched by name. A race opts in by storing the numeric
// `runSignupId` that was confirmed by hand, and the lookup is by that id only.
// A race with no id keeps its curated data and its `checked` stamp, and the UI
// says which of the two you are looking at.
//
// Every failure path returns null. A slow or broken API degrades the page to
// the curated list rather than breaking the build.

export type LiveRace = {
  /** Race day, from the platform rather than the curated string. */
  date: Date | null;
  /** Whether registration is open right now. Only meaningful when
   *  `sellsHere` is true. */
  open: boolean;
  /** The platform's own page, which is the actual point of sale. */
  signupUrl: string | null;
  /** Whether this race actually sells through this platform.
   *
   *  Some races list their events here for the calendar but take entries on
   *  their own site, and those come back with `is_registration_open: "F"` and
   *  no registration periods at all. Hartford is one: closed flag, zero
   *  periods, and a race that is still selling entries elsewhere. Reading that
   *  flag as "closed" would tell a reader a race is gone when it is not.
   *
   *  Registration periods are the evidence of a real checkout, so the status
   *  is only allowed to override the curated one when they exist. Without
   *  them the caller keeps the hand-verified status, which is the same rule
   *  AGENTS.md sets for a single ambiguous source. */
  sellsHere: boolean;
};

const API = "https://runsignup.com/rest/race";
const TIMEOUT_MS = 6000;

/** "3/27/2027 08:00" and "03/27/2027" both appear in the payload. */
function parseApiDate(raw: unknown): Date | null {
  if (typeof raw !== "string") return null;
  const m = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (!m) return null;
  const [, mm, dd, yyyy] = m;
  return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
}

/** Virtual entries are a different product at a different price, and the API
 *  labels them properly with `event_type`, so they are excluded by type rather
 *  than by guessing from the name. */
function isRealEvent(e: ApiEvent): boolean {
  return e?.event_type !== "virtual_race";
}

// ── Why there is no live price here ──────────────────────────────────────────
//
// There was one, and it was wrong. The Crescent City Classic sells a "10K
// General Registration" at $60 and an "LCMC Health Registration" at $54, and
// the second is only open to one hospital system's staff. Taking the cheapest
// active fee advertised $54 to everybody.
//
// The API gives no way to tell the two apart. Both are `event_type:
// running_race`, both carry `distance: 10K`, and neither is flagged as
// restricted; the only difference is a sponsor's brand name in a free-text
// field. Charity and virtual entries can be excluded reliably, employer and
// member rates cannot.
//
// So price stays on the curated row, where a person checked what the public
// actually pays, and only the date and the registration status refresh live.
// A hand-checked price with a visible date beats a live number nobody can buy.

type ApiEvent = { name?: string; event_type?: string; registration_periods?: unknown[] };

export async function fetchLiveRace(runSignupId: number): Promise<LiveRace | null> {
  try {
    const url = `${API}/${runSignupId}?format=json&future_events_only=T&most_recent_events_only=T`;
    const res = await fetch(url, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { accept: "application/json" },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const race = json?.race;
    if (!race) return null;

    const events: ApiEvent[] = race.events ?? [];
    const sellsHere = events.filter(isRealEvent).some(e => (e?.registration_periods ?? []).length > 0);

    return {
      date: parseApiDate(race.next_date),
      open: race.is_registration_open === "T",
      signupUrl: typeof race.url === "string" ? race.url : null,
      sellsHere,
    };
  } catch {
    // Timeout, network error, malformed payload. The caller falls back to the
    // curated row, which is why none of this is allowed to throw.
    return null;
  }
}

/** Looks up every supplied id at once and returns a map keyed by id.
 *  Ids that fail are simply absent from the map. */
export async function fetchLiveRaces(ids: number[]): Promise<Record<number, LiveRace>> {
  const unique = [...new Set(ids)];
  const results = await Promise.all(
    unique.map(async id => [id, await fetchLiveRace(id)] as const)
  );
  const out: Record<number, LiveRace> = {};
  for (const [id, live] of results) if (live) out[id] = live;
  return out;
}
