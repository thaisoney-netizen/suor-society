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
  /** ISO date this race's registration status was last confirmed against the
   *  official site. Read by scripts/content/check-stale-dates.mjs. */
  checked?: string;
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
