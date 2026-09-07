// One race row, shared by the EN guide (/culture/open-entry-races-2026) and the
// pt-BR guide (/pt-br/culture/corridas-brasil-2026).
//
// Shared on purpose: the daily freshness agent edits both races-en.json and
// races-br.json in the same run, and when this component was duplicated per
// page a status change could render correctly on one locale and not the other.
// One component means one rendering of "past", "sold out" and the rest.

export type RaceStatus = "open" | "limit" | "sold" | "past";

export type Race = {
  num: string;
  name: string;
  where: string;
  body: string;
  dists: string;
  /** EN guide only; the pt-BR data carries no prices. */
  price?: string;
  status: RaceStatus;
  statusLabel: string;
  url: string;
  /** The second link: the page where entry actually happens, deliberately on a
   *  different host from `url` wherever one exists, so the weekly check reads
   *  two independent sources rather than the same site twice. Every one was
   *  read off the race's own site and fetched to confirm it resolves to the
   *  right race. Written by scripts/content/verify-race-status.mjs. */
  verifyUrl?: string;
  /** Which platform `verifyUrl` points at: runsignup, raceroster, haku,
   *  active, letsdothis, enmotive, ultrasignup, nycruns, runrocknroll, self. */
  verifySource?: string;
  /** False when the second source cannot be fetched by a script at all.
   *  Let's Do This answers every request with a Cloudflare challenge and
   *  Active bounces through a Queue-it waiting room; both are correct links
   *  for a person and unreadable to any scraper, Firecrawl included. The
   *  weekly check escalates these instead of pretending it read them. */
  verifyReadable?: boolean;
  /** False when `verifyUrl` is the same site as `url`, so it is not really a
   *  second source. Cherry Blossom is the one race with no second host. */
  verifyIndependent?: boolean;
  /** ISO date this race's registration status was last confirmed against the
   *  official site. Read by scripts/content/check-stale-dates.mjs. */
  checked?: string;
  /** RunSignup's numeric race id, present only on races that genuinely sell
   *  through RunSignup AND have been confirmed by hand to be the race itself.
   *  The /racepicks finder refreshes date, price and status live from it. Never
   *  fill this in from a name search: "Los Angeles Marathon" and "Marine Corps
   *  Marathon" both return Semper Fi charity teams rather than the races.
   *  Unused by the guide pages and the PDFs, which stay on the curated data. */
  runSignupId?: number;
};

/** A race whose date has passed keeps its row so the guide still reads as a
 *  season's worth of racing, but it is struck through and loses its register
 *  link. Sending someone to a registration page for a race that has already
 *  been run is the same broken promise as advertising a sold-out entry. */
export function RaceRow({ race, registerLabel }: { race: Race; registerLabel: string }) {
  const isPast = race.status === "past";

  return (
    <div className={`race-row${isPast ? " race-row--past" : ""}`}>
      <span className="race-num">{race.num}</span>
      <div className="race-info">
        <div className="race-name">{race.name}</div>
        <div className="race-where">{race.where}</div>
        <p className="race-body">{race.body}</p>
        <div className="race-dists">{race.dists}</div>
        <div className={`race-status ${race.status}`}>{race.statusLabel}</div>
      </div>
      <div className="race-action">
        {isPast ? null : (
          <>
            {race.price ? <span className="race-price">{race.price}</span> : null}
            <a
              className="race-link"
              href={race.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {registerLabel}
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default RaceRow;
