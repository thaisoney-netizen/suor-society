"use client";

import { useEffect, useMemo, useState } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import type { Race } from "@/components/RaceRow";
import {
  indexAll, facets, applyFilters, hiddenByPrice, partitionByDate, applyLive, liveCount,
  verifiedDate, stalenessDays, monthLabel,
  DISTANCE_LABELS, EMPTY_FILTERS,
  type Filters, type DistanceKey, type IndexedRace, type LiveInfo,
} from "@/lib/race-filters";
import {
  plan, DAY_NAMES,
  type DayIndex, type Goal, type Split, type RaceDistance, type PlanInput,
} from "@/lib/week-planner";

type Tab = "races" | "planner";

/** Live platform data, keyed by RunSignup race id, fetched on the server. */
export type LiveOverlay = Record<number, LiveInfo>;

const DEFAULT_PLAN: PlanInput = {
  availableDays: [0, 1, 2, 3, 4, 5],
  runs: 3,
  lifts: 3,
  goal: "race",
  raceDistance: "Half marathon",
  split: "upper-lower",
  protectLongRunOn: 5,
};

/** URL state is read once on mount rather than during render.
 *
 *  Reading `window` while rendering would not match what the server produced
 *  and React would throw out the markup. Defaults render on both sides, then
 *  this fills in whatever the link carried. */
function readUrl(): { tab: Tab; filters: Filters; planInput: PlanInput } | null {
  if (typeof window === "undefined") return null;
  const q = new URLSearchParams(window.location.search);
  // `Number(null)` is 0, not NaN, so a missing parameter has to be caught before
  // the parse or every default silently becomes zero: a link with no `runs` or
  // `lifts` built an empty week, and a missing `protect` pinned the long run to
  // Monday instead of leaving it on Saturday.
  const num = (k: string, fallback: number) => {
    const raw = q.get(k);
    if (raw === null || raw.trim() === "") return fallback;
    const n = Number(raw);
    return Number.isFinite(n) && n >= 0 ? n : fallback;
  };
  const days = q.get("days");
  return {
    tab: q.get("tool") === "planner" ? "planner" : "races",
    filters: {
      state: q.get("state"),
      month: q.get("month"),
      distance: (q.get("dist") as DistanceKey) || null,
      band: q.get("price"),
      openOnly: q.get("open") === "1",
    },
    planInput: {
      availableDays: days
        ? (days.split(",").map(Number).filter(d => d >= 0 && d <= 6) as DayIndex[])
        : DEFAULT_PLAN.availableDays,
      runs: Math.min(7, num("runs", DEFAULT_PLAN.runs)),
      lifts: Math.min(7, num("lifts", DEFAULT_PLAN.lifts)),
      goal: (q.get("goal") as Goal) === "general" ? "general" : "race",
      raceDistance: (q.get("race") as RaceDistance) || DEFAULT_PLAN.raceDistance,
      split: (q.get("split") as Split) || DEFAULT_PLAN.split,
      protectLongRunOn:
        q.get("protect") === "none" ? null : (num("protect", 5) as DayIndex),
    },
  };
}

export default function ToolsView({
  ca, us, live = {},
}: { ca: Race[]; us: Race[]; live?: LiveOverlay }) {
  const [tab, setTab] = useState<Tab>("races");
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [planInput, setPlanInput] = useState<PlanInput>(DEFAULT_PLAN);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const fromUrl = readUrl();
    if (fromUrl) {
      setTab(fromUrl.tab);
      setFilters(fromUrl.filters);
      setPlanInput(fromUrl.planInput);
    }
    setHydrated(true);
  }, []);

  // Everything below the date split is computed from the shared race JSON, so
  // the finder inherits whatever the daily freshness agent last wrote.
  const all = useMemo(() => applyLive(indexAll(ca, us), live), [ca, us, live]);
  const { upcoming, alreadyRun } = useMemo(() => partitionByDate(all), [all]);
  const liveRows = useMemo(() => liveCount(upcoming), [upcoming]);
  const fx = useMemo(() => facets(upcoming), [upcoming]);
  const results = useMemo(() => applyFilters(upcoming, filters, fx.bands), [upcoming, filters, fx.bands]);
  const priceHidden = useMemo(() => hiddenByPrice(upcoming, filters, fx.bands), [upcoming, filters, fx.bands]);

  const verified = useMemo(() => verifiedDate(upcoming), [upcoming]);
  const staleDays = useMemo(() => stalenessDays(upcoming), [upcoming]);

  const week = useMemo(() => plan(planInput), [planInput]);

  // Keep the address bar in step so a filtered view or a built week can be sent
  // to someone. `replaceState` rather than push: every keystroke on a filter
  // would otherwise become a back-button stop.
  useEffect(() => {
    if (!hydrated) return;
    const q = new URLSearchParams();
    q.set("tool", tab);
    if (tab === "races") {
      if (filters.state) q.set("state", filters.state);
      if (filters.month) q.set("month", filters.month);
      if (filters.distance) q.set("dist", filters.distance);
      if (filters.band) q.set("price", filters.band);
      if (filters.openOnly) q.set("open", "1");
    } else {
      q.set("days", planInput.availableDays.join(","));
      q.set("runs", String(planInput.runs));
      q.set("lifts", String(planInput.lifts));
      q.set("goal", planInput.goal);
      if (planInput.goal === "race") q.set("race", planInput.raceDistance);
      q.set("split", planInput.split);
      q.set("protect", planInput.protectLongRunOn === null ? "none" : String(planInput.protectLongRunOn));
    }
    window.history.replaceState(null, "", `?${q.toString()}`);
  }, [hydrated, tab, filters, planInput]);

  const filtersActive =
    Boolean(filters.state || filters.month || filters.distance || filters.band) || filters.openOnly;

  return (
    <>
      <SiteNav />

      <main>
        <section className="about-pg-hero">
          <div className="page">
            <p className="about-pg-eye">Suor Society / Race Picks</p>
            {/* Not .about-pg-headline: that one is `white-space: nowrap` on
                desktop, which suits the two word headings it was written for
                and would push this one off the side of the page. */}
            <h1 className="tool-headline">Find a race, then build the week around it</h1>
            {/* Not .about-pg-deck either. That is uppercase at .22em tracking,
                which is a stamp, and this is three sentences you have to read. */}
            <p className="tool-deck">
              Two things here. Races you can still get into without a qualifier or a lottery,
              and a planner that spreads your week out so the hard days aren't landing on top
              of each other. Both run off the same race list as the guide, so I'm only keeping
              one list current instead of two.
            </p>
          </div>
        </section>

        <div className="page">
          {/* One tablist, and exactly one panel visible at a time. The version
              of this built outside the repo marked both panels up as tabpanels
              and then never hid either, so the tabs changed the URL and nothing
              else, and a screen reader was offered both at once. */}
          <div className="tool-tabs" role="tablist" aria-label="Tools">
            {([
              ["races", "Race finder"],
              ["planner", "Week planner"],
            ] as const).map(([id, label]) => (
              <button
                key={id}
                role="tab"
                id={`tab-${id}`}
                aria-selected={tab === id}
                aria-controls={`panel-${id}`}
                tabIndex={tab === id ? 0 : -1}
                className={`tool-tab${tab === id ? " is-on" : ""}`}
                onClick={() => setTab(id)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* ── Race finder ── */}
          <section
            role="tabpanel"
            id="panel-races"
            aria-labelledby="tab-races"
            hidden={tab !== "races"}
            className="tool-panel"
          >
            <p className="tool-freshness">
              {verified === null ? (
                <>Some of these don't have a check date on them, so treat the whole list as unverified and open the race site before you pay for anything.</>
              ) : staleDays !== null && staleDays > 45 ? (
                <>
                  <strong>Heads up, the oldest thing here was last checked {verified}, about {Math.round(staleDays / 7)} weeks ago.</strong>{" "}
                  Registration moves faster than that, so take every status below as a starting
                  point and check the race site before you pay.
                </>
              ) : (
                <>
                  <strong>Everything here was checked on or after {verified}.</strong>{" "}
                  Entries still go fast though, so open the race site before you pay.
                </>
              )}
              {liveRows > 0 && (
                <> The {liveRows} marked <em className="tool-live-word">live</em> check their own date and registration status against the signup page every hour, so those are current whatever this date says. Prices stay hand checked, because the feed can't tell a public entry fee from a staff discount.</>
              )}
              {alreadyRun.length > 0 && (
                <> {alreadyRun.length} {alreadyRun.length === 1 ? "race has" : "races have"} already been run, so {alreadyRun.length === 1 ? "it is" : "they are"} not showing.</>
              )}
            </p>

            <div className="tool-filters">
              <Select
                label="State"
                value={filters.state ?? ""}
                onChange={v => setFilters(f => ({ ...f, state: v || null }))}
                options={[["", "Anywhere"], ...fx.states.map(s => [s, s] as [string, string])]}
              />
              <Select
                label="Month"
                value={filters.month ?? ""}
                onChange={v => setFilters(f => ({ ...f, month: v || null }))}
                options={[["", "Any month"], ...fx.months.map(m => [m, monthLabel(m)] as [string, string])]}
              />
              <Select
                label="Distance"
                value={filters.distance ?? ""}
                onChange={v => setFilters(f => ({ ...f, distance: (v as DistanceKey) || null }))}
                options={[["", "Any distance"], ...fx.distances.map(d => [d, DISTANCE_LABELS[d]] as [string, string])]}
              />
              {/* Bands come from the races that actually carry a price, so the
                  menu can never offer one that matches nothing. */}
              <Select
                label="Price"
                value={filters.band ?? ""}
                onChange={v => setFilters(f => ({ ...f, band: v || null }))}
                options={[["", "Any price"], ...fx.bands.map(b => [b.id, b.label] as [string, string])]}
              />
              <label className="tool-check">
                <input
                  type="checkbox"
                  checked={filters.openOnly}
                  onChange={e => setFilters(f => ({ ...f, openOnly: e.target.checked }))}
                />
                <span>Open registration only</span>
              </label>
              {filtersActive && (
                <button className="tool-reset" onClick={() => setFilters(EMPTY_FILTERS)}>
                  Clear filters
                </button>
              )}
            </div>

            <div className="tool-count">
              <span>
                {results.length} {results.length === 1 ? "race" : "races"}
              </span>
              {/* A price filter that silently drops most of the list reads as
                  "there are only two races" when it means "we only know two
                  prices". Say which. */}
              {priceHidden > 0 && (
                <span className="tool-count-note">
                  {priceHidden} more {priceHidden === 1 ? "race does not" : "races do not"} list a price, so
                  {priceHidden === 1 ? " it drops" : " they drop"} out while a price filter is on
                </span>
              )}
            </div>

            {results.length === 0 ? (
              <div className="tool-empty">
                <p className="tool-empty-head">Nothing matches that</p>
                <p>Try a wider price band or a different month. Or clear it all and start over.</p>
                <button className="tool-reset" onClick={() => setFilters(EMPTY_FILTERS)}>
                  Clear filters
                </button>
              </div>
            ) : (
              <ol className="tool-races">
                {results.map(r => <RaceCard key={`${r.group}-${r.num}-${r.name}`} race={r} />)}
              </ol>
            )}
          </section>

          {/* ── Week planner ── */}
          <section
            role="tabpanel"
            id="panel-planner"
            aria-labelledby="tab-planner"
            hidden={tab !== "planner"}
            className="tool-panel"
          >
            <div className="tool-filters">
              <fieldset className="tool-days">
                <legend>Days you can train</legend>
                {DAY_NAMES.map((name, i) => {
                  const on = planInput.availableDays.includes(i as DayIndex);
                  return (
                    <label key={name} className={`tool-day${on ? " is-on" : ""}`}>
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() =>
                          setPlanInput(p => ({
                            ...p,
                            availableDays: on
                              ? p.availableDays.filter(d => d !== i)
                              : [...p.availableDays, i as DayIndex].sort((a, b) => a - b),
                          }))
                        }
                      />
                      <span>{name.slice(0, 3)}</span>
                    </label>
                  );
                })}
              </fieldset>

              <Stepper
                label="Runs a week"
                value={planInput.runs}
                onChange={v => setPlanInput(p => ({ ...p, runs: v }))}
              />
              <Stepper
                label="Lifts a week"
                value={planInput.lifts}
                onChange={v => setPlanInput(p => ({ ...p, lifts: v }))}
              />
              <Select
                label="Goal"
                value={planInput.goal}
                onChange={v => setPlanInput(p => ({ ...p, goal: v as Goal }))}
                options={[["race", "Training for a race"], ["general", "General fitness"]]}
              />
              {planInput.goal === "race" && (
                <Select
                  label="Race distance"
                  value={planInput.raceDistance}
                  onChange={v => setPlanInput(p => ({ ...p, raceDistance: v as RaceDistance }))}
                  options={[["5K", "5K"], ["10K", "10K"], ["Half marathon", "Half marathon"], ["Full marathon", "Full marathon"]]}
                />
              )}
              <Select
                label="Lifting split"
                value={planInput.split}
                onChange={v => setPlanInput(p => ({ ...p, split: v as Split }))}
                options={[["upper-lower", "Upper and lower"], ["full-body", "Full body"], ["push-pull", "Push and pull"]]}
              />
              <Select
                label="Protect the long run"
                value={planInput.protectLongRunOn === null ? "none" : String(planInput.protectLongRunOn)}
                onChange={v => setPlanInput(p => ({ ...p, protectLongRunOn: v === "none" ? null : (Number(v) as DayIndex) }))}
                options={[["none", "No preference"], ...DAY_NAMES.map((n, i) => [String(i), n] as [string, string])]}
              />
              <button className="tool-reset" onClick={() => setPlanInput(DEFAULT_PLAN)}>
                Reset
              </button>
            </div>

            <div className="tool-week-head">
              <h2 className="tool-h2">Your repeatable week</h2>
              <p className="tool-week-meta">
                {week.sessionCount} {week.sessionCount === 1 ? "session" : "sessions"}
                {/* The promise is printed only when the generated week was
                    measured and actually honors it. */}
                {week.honorsSeparation && week.minKeyGapHours !== null && (
                  <>
                    {" "}
                    <span className="tool-ok">
                      Key sessions at least {week.minKeyGapHours} hours apart
                    </span>
                  </>
                )}
                {!week.honorsSeparation && week.minKeyGapHours !== null && (
                  <>
                    {" "}
                    <span className="tool-warn">
                      Two key sessions only {week.minKeyGapHours} hours apart
                    </span>
                  </>
                )}
              </p>
            </div>

            <ol className="tool-week">
              {week.days.map(d => (
                <li key={d.name} className={`tool-dayrow${d.sessions.length === 0 ? " is-rest" : ""}`}>
                  <span className="tool-dayname">{d.name}</span>
                  <div className="tool-daybody">
                    {d.sessions.length === 0 ? (
                      <p className="tool-session-rest">
                        {d.available ? "Rest" : "Not a training day"}
                      </p>
                    ) : (
                      d.sessions.map(s => (
                        <div key={s.kind} className="tool-session">
                          <span className={`tool-session-name${s.key ? " is-key" : ""}`}>
                            {s.name}
                            {s.key && <em className="tool-key-flag">Key session</em>}
                          </span>
                          <span className="tool-session-note">{s.note}</span>
                        </div>
                      ))
                    )}
                  </div>
                </li>
              ))}
            </ol>

            {week.notes.length > 0 && (
              <div className="tool-honest">
                <h3 className="tool-h3">What this week couldn't do</h3>
                <ul>
                  {week.notes.map(n => <li key={n}>{n}</li>)}
                </ul>
              </div>
            )}

            <p className="tool-disclaimer">
              General information, not medical or coaching advice. If you're coming back from an
              injury or starting from scratch, talk to a coach or a physio who can actually look
              at you.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

/** Native select on purpose. The custom combobox in the version built outside
 *  the repo carried its own keyboard and focus handling for no gain over the
 *  control every platform already ships. */
function Select({
  label, value, onChange, options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <label className="tool-field">
      <span className="tool-field-label">{label}</span>
      <select value={value} onChange={e => onChange(e.target.value)}>
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </label>
  );
}

function Stepper({
  label, value, onChange,
}: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="tool-field">
      <span className="tool-field-label">{label}</span>
      <input
        type="number"
        min={0}
        max={7}
        value={value}
        onChange={e => {
          const n = Number(e.target.value);
          onChange(Number.isFinite(n) ? Math.max(0, Math.min(7, n)) : 0);
        }}
      />
    </label>
  );
}

function RaceCard({ race }: { race: IndexedRace }) {
  // Where a reader actually enters. The live RunSignup URL is preferred when
  // present because it is read fresh each hour; otherwise the hand-checked
  // second link. Falls back to nothing, and the row then offers only the race
  // site, which is the honest outcome for a race with no confirmed entry page.
  const entryUrl = race.signupUrl ?? race.verifyUrl ?? null;

  // The badge carries the date, so the location line carries only the place.
  // Printing the curated "City, ST · Oct 4, 2026" here as well would let a
  // live-corrected date sit next to the old one and contradict it.
  const place = race.where.split("\u00B7")[0].trim();

  return (
    <li className="tool-race">
      <div className="tool-race-when">
        <span className="tool-race-date">
          {race.monthOnly
            ? race.start.toLocaleDateString("en-US", { month: "short", year: "numeric" })
            : race.start.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </span>
        <span className="tool-race-year">{race.monthOnly ? "" : race.start.getFullYear()}</span>
      </div>

      <div className="tool-race-body">
        <h3 className="tool-race-name">{race.name}</h3>
        <p className="tool-race-where">{place}</p>
        <p className="tool-race-blurb">{race.body}</p>
        <p className="tool-race-dists">{race.dists}</p>
        <p className={`race-status ${race.status}`}>{race.statusLabel}</p>
      </div>

      <div className="tool-race-side">
        <span className="tool-race-price">{race.price ?? "Check site"}</span>

        {/* Two links per race, and the primary one is where you actually pay.
            `signupUrl` comes from the live RunSignup read and wins when it is
            there because it is the freshest. `verifyUrl` is the hand-checked
            second link, which is what gives the other 26 races a direct entry
            point instead of a homepage to go hunting on. */}
        {entryUrl ? (
          <>
            <a className="tool-race-link" href={entryUrl} target="_blank" rel="noreferrer">
              Sign up
            </a>
            <a className="tool-race-alt" href={race.url} target="_blank" rel="noreferrer">
              Race site
            </a>
          </>
        ) : (
          <a className="tool-race-link" href={race.url} target="_blank" rel="noreferrer">
            Race site
          </a>
        )}

        {/* Live and hand-checked are different promises, so they get different
            words. A live row is as current as the registration page it reads;
            a checked row is only as current as the last time somebody looked. */}
        {race.isLive ? (
          <span className="tool-race-live">Live</span>
        ) : (
          race.checked && (
            <span className="tool-race-checked">
              Checked{" "}
              {new Date(`${race.checked}T00:00:00`).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          )
        )}
      </div>
    </li>
  );
}
