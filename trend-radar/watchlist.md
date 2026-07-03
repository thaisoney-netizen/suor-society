# Suor Society Trend Radar — Watchlist (SUOR-7)

This file drives the daily trend scan (SUOR-8). A scheduled cloud session reads
it every morning, runs the queries below via web search, and delivers 2–5 trend
candidates with post angles. Edit this file to change what gets scanned — the
next morning's run picks it up automatically.

## Why web search instead of social media scanning

Instagram and TikTok can't be scanned reliably: no open API, aggressive bot
blocking, and logged-out views show almost nothing. Instead of fighting that,
the radar watches where trends *surface in scannable form*, usually within a
day of going viral on social:

- **Running media** picks up viral moments, challenges, and race stories fast
  (LetsRun, Runner's World, Citius Mag, Canadian Running).
- **Gear sites** know about shoe drops before or on launch day (Believe in the
  Run, Road Trail Run, BarBend for Hyrox gear).
- **Race calendars and results** are fully public (majors, São Silvestre,
  HYROX event schedule).
- **Reddit threads** (r/running, r/AdvancedRunning, r/Hyrox, r/hybridathlete)
  rank in search results when a topic is hot — we get the signal without
  scraping Reddit itself.

Trade-off: we see trends ~a day after peak social velocity, but for a
saves-and-shares culture brand that's fine — Suor reacts with a *take*, not a
repost race.

## Watch topics

Each topic lists search queries (run with recency in mind — add the current
month/year to queries where it helps) and the standing Suor angle to evaluate
candidates against.

### 1. Race weekends & results
- Queries:
  - `marathon major results this weekend`
  - `running race viral moment this week`
  - `corrida de rua Brasil notícias` (pt-BR audience)
  - `San Diego running race weekend`
- Suor angle: the culture around the race — start-line rituals, crowd moments,
  what people wore, the sweat — not the elite splits.

### 2. Shoe drops & gear
- Queries:
  - `running shoe release announced this week`
  - `super shoe launch news`
  - `Hyrox shoe gear release`
- Suor angle: what a drop says about where running culture is going; honest
  "who is this actually for" takes outperform spec sheets.

### 3. Challenges & viral training moments
- Queries:
  - `running challenge viral this month`
  - `run club trend news`
  - `Strava trend report news`
- Suor angle: join, remix, or lovingly roast — Suor's voice is in on the joke,
  never above it.

### 4. HYROX & hybrid racing
- Queries:
  - `Hyrox news this week`
  - `Hyrox results world championship season`
  - `Hyrox Brasil evento notícias`
  - `hybrid athlete race trend`
- Suor angle: Hyrox is the sweatiest crossover of lifting and running — Suor
  already covers it (see the fall 2026 schedule and Hyrox Brasil dispatches).
  Watch for: new events (especially Brazil/San Diego), sold-out-in-minutes
  stories, elite crossover athletes, "is Hyrox the new marathon" discourse.

### 5. Strength & lift training for runners
- Queries:
  - `strength training for runners new study`
  - `lifting for runners trend`
  - `hybrid training running lifting program news`
  - `runners weight room viral`
- Suor angle: "runners who lift" is core Suor identity (levanta peso). Watch
  for: new research on strength work and running economy, viral gym-to-track
  content, pros posting lifting blocks, hybrid programs blowing up.

### 6. Sweat-adjacent wildcards
- Queries:
  - `summer heat training runners news`
  - `running culture trend news this week`
- Suor angle: Suor means sweat — heat waves, summer training discourse, and
  anything that makes sweating a badge of honor is on-brand by default.

## Post-or-skip filter (SUOR-10)

A candidate makes the digest only if ALL of these hold:
1. **Real Suor angle** — connects to sweat, effort culture, runners-who-lift,
   or the Brazil/San Diego communities. Not just "big running news."
2. **Still early** — the moment is building or peaking, not last week's news.
3. **Suor can add something** — a take, a remix, a local angle. If the only
   move is reposting, skip.

Skipping without guilt matters as much as posting. A digest that says "nothing
worth posting today" is a successful run.

## Digest output format

For each candidate (2–5 per day, fewer is fine):
- **Headline** — one line, what the moment is
- **Why now** — what happened and how fresh it is, with source links
- **Suor angle** — the specific take, tied to a watch-topic angle above
- **Format** — reel / carousel / story / site dispatch, and effort level

Plus one line each for near-misses that were considered and skipped, so the
filter stays visible and tunable.

## Maintenance

- Add/remove topics and queries by editing this file; no code changes needed.
- Recurring moments worth pre-planning (race weekends, shoe launch seasons,
  Hyrox calendar) should also get mapped to existing posts for re-cuts
  (SUOR-11) — note them in the digest when spotted.
