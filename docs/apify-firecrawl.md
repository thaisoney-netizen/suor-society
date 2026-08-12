# Apify and Firecrawl for Suor Society

Two scraping tools that do different jobs. This is which one to reach for,
what to build first, and roughly what it costs.

## The one-line difference

**Firecrawl** takes a URL and gives you back clean markdown or structured JSON.
You point it at a page you already know about. It renders the JavaScript, gets
past the basic bot checks, strips the nav and cookie banners, and can pull named
fields out with a schema.

**Apify** is a marketplace of about six thousand pre-built scrapers (they call
them Actors) plus the infrastructure to run them on a schedule. You are not
writing the scraper. Someone already wrote and maintains the hard one for
Instagram, TikTok, Reddit, LinkedIn, Google Maps, and you call it with an input
object.

The split that matters here:

| Target | Tool | Why |
|---|---|---|
| Race registration sites, running blogs, gear pages, competitor guides | Firecrawl | Open web, no login, you know the URL |
| Instagram, TikTok, Reddit, LinkedIn, Google Maps | Apify | Walled gardens that actively fight scrapers |

If you find yourself writing selectors for Instagram, you picked wrong. If you
find yourself paying per-result for a WordPress blog, you also picked wrong.

## What to build, in order

### 1. Race status verification (Firecrawl) — built, see `scripts/races/verify-status.mjs`

This is the highest-value one because it removes a chore the site already
generates every week.

`scripts/content/check-stale-dates.mjs` flags races inside 45 days whose
`checked` stamp has aged past 30 days. It tells you *which* races need eyes. It
cannot tell you the answer, so verifying has meant opening official sites by
hand across 54 races.

The verifier reads each due race's `url` with Firecrawl and extracts a small
schema: registration state, which distances are sold out, price, and the exact
sentence on the page that proves it.

Run it:

```
node scripts/races/verify-status.mjs            # due races only, dry run
node scripts/races/verify-status.mjs --all      # all 54
node scripts/races/verify-status.mjs --write    # stamp the confirmations
```

The safety model is deliberately one-sided, because AGENTS.md rule 7 says never
stamp a race you did not actually verify:

- **Confirmed** (page agrees with the JSON) can auto-stamp `checked`. A real
  read of the real page happened, so the date means something.
- **Changed** (page disagrees) is reported and never written. Registration
  status is published copy. A model misreading one sentence should not quietly
  rewrite the guide.
- **Unclear** (page did not say) gets flagged. Usually it means the `url` points
  at a homepage instead of a registration page, which is worth fixing anyway.

So `--write` only advances dates on races where nothing changed. Every actual
change still goes through you.

It exits 1 when something needs a human and prints a report on stdout, same
contract as `check-stale-dates.mjs`, so it drops into the Content Freshness
workflow and pipes into `notify-board.mjs` with no changes.

The core call, if you want to reuse the pattern:

```js
const res = await fetch("https://api.firecrawl.dev/v2/scrape", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.FIRECRAWL_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    url: race.url,
    formats: [{
      type: "json",
      prompt: "Report the CURRENT registration status using what the page says.",
      schema: {
        type: "object",
        properties: {
          registrationState: { type: "string", enum: ["open", "limited", "closed", "not_yet_open", "unknown"] },
          soldOutDistances: { type: "array", items: { type: "string" } },
          evidence: { type: "string" },
        },
        required: ["registrationState", "evidence"],
      },
    }],
    onlyMainContent: true,
    waitFor: 2500,   // RunSignup and Race Roster widgets paint late
  }),
});
const { data } = await res.json();
data.json.registrationState;  // "limited"
data.json.evidence;           // "Half Marathon SOLD OUT. 5K and 10K still open."
```

Two things in there earn their keep. `evidence` gives you the sentence to
confirm against without reopening the site, and asking for it keeps the model
anchored to page text instead of guessing from the race date. An `unknown` enum
value gives it somewhere honest to land instead of inventing a status.

### 2. Reddit and Instagram in the trend radar (Apify)

`scripts/trends/scan.mjs` says it out loud in its own header comment: social
feeds cannot be scanned reliably, and Reddit 403s from GitHub runners. That is
the exact gap Apify exists to fill.

The eight RSS feeds stay. They are free, fast, and working. This is an extra
source feeding the same Notion cards.

```js
// Reddit: where hybrid discourse actually happens before media picks it up
const res = await fetch(
  `https://api.apify.com/v2/acts/trudax~reddit-scraper-lite/run-sync-get-dataset-items?token=${process.env.APIFY_TOKEN}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      startUrls: [
        { url: "https://www.reddit.com/r/running/top/?t=week" },
        { url: "https://www.reddit.com/r/Hyrox/top/?t=week" },
        { url: "https://www.reddit.com/r/hybridathlete/top/?t=week" },
      ],
      maxItems: 40,
      sort: "top",
    }),
  }
);
const posts = await res.json();
// → [{ title, url, upvotes, numberOfComments, communityName, ... }]
```

Feed those through the existing `matchTopic()` and `candidateKey()` dedup and
they become board cards like everything else. Upvote count is a better
post-or-skip signal than anything RSS gives you, because it measures whether
runners care, not whether an editor filed a story.

`run-sync-get-dataset-items` runs the actor and hands back results in one call.
Good up to about five minutes. Anything longer, start a run and poll
`/v2/actor-runs/{id}`.

### 3. Reference account tracking (Apify)

The business skill lists eight reference accounts and says to track saves and
shares on culture content. Right now that is eyeballing.

```js
const res = await fetch(
  `https://api.apify.com/v2/acts/apify~instagram-scraper/run-sync-get-dataset-items?token=${process.env.APIFY_TOKEN}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      directUrls: [
        "https://www.instagram.com/runociety/",
        "https://www.instagram.com/runlifestyle_/",
        "https://www.instagram.com/hercuules/",
        "https://www.instagram.com/deadlast.run/",
        "https://www.instagram.com/_hybrid.club_/",
      ],
      resultsType: "posts",
      resultsLimit: 12,
      addParentData: true,
    }),
  }
);
// → [{ caption, likesCount, commentsCount, type, timestamp, ownerUsername, ... }]
```

Weekly, sorted by engagement rate rather than raw likes so a 172K account and a
30K account are comparable. What you get is which formats are landing this
month, not last year: carousel vs reel, hot take vs spotlight, long caption vs
nine words. That answers "adjust 70/30 if the data says to" with data.

Saves are not in the public payload. Likes and comments per follower is the
proxy, and it is good enough to rank formats against each other.

### 4. Shoe drop watching (Firecrawl)

Gear and shoe drops is content pillar one. RSS only fires when someone publishes
a review, which is days after the product page goes live. Scraping the new
arrivals pages directly gets you there first.

```js
const pages = [
  "https://believeintherun.com/shoe-reviews/",
  "https://www.runningwarehouse.com/catpage-NEWMRS.html",
  "https://www.hoka.com/en/us/new-arrivals/",
];
for (const url of pages) {
  const res = await fetch("https://api.firecrawl.dev/v2/scrape", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      url,
      formats: [{
        type: "json",
        prompt: "List every shoe on this page with its name, brand, and price.",
        schema: {
          type: "object",
          properties: {
            shoes: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  brand: { type: "string" },
                  price: { type: "string" },
                },
              },
            },
          },
        },
      }],
    }),
  });
  // diff against last run, anything new becomes a board card
}
```

Same dedup file pattern as `sent-trends.json`. A shoe that was not there
yesterday is the whole signal.

### 5. Local partnership prospects (Apify)

Gym collabs and coffee partnerships are in the phase 1 plan. Google Maps has the
list already.

```js
const res = await fetch(
  `https://api.apify.com/v2/acts/compass~crawler-google-places/run-sync-get-dataset-items?token=${token}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      searchStringsArray: ["coffee shop", "crossfit gym", "run club"],
      locationQuery: "Pacific Beach, San Diego, CA",
      maxCrawledPlacesPerSearch: 40,
    }),
  }
);
// → name, address, website, phone, rating, reviewsCount, openingHours
```

Filter to places within a mile of the boardwalk that open before 8am, because a
Saturday crew run ending at a shop that opens at nine is useless. That is a
prospect list you work through once, not a thing you run weekly.

### 6. Expanding the race guide (Firecrawl)

Going from 54 races to more states is currently a research week. `/map` lists
every URL on a site fast, `/crawl` walks a section and returns each page as
markdown, and `/search` runs a web search that returns full page content instead
of just links.

```js
// Every race listing URL on a calendar site, in one call
await fetch("https://api.firecrawl.dev/v2/map", {
  method: "POST",
  headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
  body: JSON.stringify({ url: "https://runsignup.com/Races/CA", search: "half marathon" }),
});
```

Then extract each candidate into the same shape the JSON already uses (`name`,
`where`, `dists`, `price`, `status`, `url`) and review before merging. It turns
writing the guide into editing the guide.

There is a GEO angle too. `/search` shows you what actually ranks for "open
entry races 2026" and what fields the pages above you list that you do not.

## What it costs

Check current pricing, both have moved before. The shape of it:

**Firecrawl** bills credits per page. A plain scrape is about one credit,
schema extraction costs more because there is a model behind it. Your load:

- 54 races, monthly full sweep, extraction: roughly 300 credits
- Weekly sweep of just the due races: usually two to six races, negligible
- Shoe pages, three pages daily: about 90 credits

Comfortably under 2,000 credits a month, which is the entry paid tier. The free
tier is enough to build against.

**Apify** gives a small monthly platform credit free, then most actors bill per
thousand results. Your load:

- Five IG accounts, 12 posts, weekly: about 240 results a month
- Three subreddits, 40 posts, weekly: about 480 results a month

That is small. The free credit may cover it outright and the starter tier
certainly does.

Both are cheaper than the hours. The race verification alone is the thing you
were doing by hand every week.

## What not to do with these

**Do not scrape Strava.** Their terms are strict and the brand values Strava.
The official API gives you your own data and your crew's activities with
permission, which is what the crew run recaps need anyway.

**Do not rebuild the RSS radar with Firecrawl.** Eight feeds, free, already
working. Adding a paid scraper on top of a working feed spends credits for
nothing. Add sources RSS cannot reach, keep the ones it can.

**Do not scrape people to DM them.** Pulling follower lists to cold-message
runners is off-brand for a community page and it is the fastest way to look like
every growth-hack account. Reference accounts for format research, yes. Building
a lead list of individuals, no.

**Know that IG and LinkedIn scraping is against their terms.** Public post data
for competitive research is common practice and low risk in practice, but do not
build anything you cannot afford to have break, and do not put it on the
critical path of a launch.

## One fix worth making anyway

`scripts/jobs/search.mjs` drives LinkedIn with Playwright using your personal
`li_at` session cookie stored as a GitHub secret. Two problems with that. The
cookie rotates, so the workflow breaks silently and you find out by noticing you
have not gotten an alert in a while. And the requests come from your own
account, which is the thing LinkedIn restricts when it notices automation.

An Apify LinkedIn jobs actor runs on their proxies with no cookie of yours
involved. Same result, your account is not the one exposed. Search the Apify
Store for a LinkedIn Jobs Scraper and check its recent run success rate before
committing, since actors for hard targets go stale and ownership changes.

Still against LinkedIn's terms either way. The difference is what is at risk.

## Setup

Both are a single secret.

```
FIRECRAWL_API_KEY   # firecrawl.dev dashboard
APIFY_TOKEN         # apify.com → Settings → Integrations
```

Add them under Settings, Secrets and variables, Actions in GitHub, same place
`NOTION_TOKEN` lives. Every script here follows the existing pattern: reads env,
exits 1 with a report when something needs attention, posts to the board through
`notify-board.mjs`.
