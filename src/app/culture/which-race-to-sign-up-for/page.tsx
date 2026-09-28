import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ArticleCover from "@/components/ArticleCover";
import { PostToc, PostSubscribe } from "@/components/PostAside";
import AuthorCard from "@/components/AuthorCard";
import { pageMeta, ArticleJsonLd, FaqJsonLd } from "@/lib/seo";
import {
  pick,
  tableRows,
  checkedAsOf,
  openHalves,
  formatDate,
  weeksAway,
  city,
  type PickKey,
} from "@/lib/socal-race-picks";

// Built on the Dropset comparison's layout (question headline, answer deck,
// jump links, method box, comparison table, "choose by your week" scenarios,
// FAQ, sources), so it reuses the .dropset-* classes rather than copying them.
//
// The slug carries no year on purpose. Next fall the title and the races
// change and the URL keeps whatever ranking it has earned.
//
// The title tag and the H1 differ on purpose. Nobody searches "which race
// should I sign up for" (autocomplete returns video games); they search
// "san diego half marathon 2026", "half marathon san diego november" and
// "races in san diego november 2026". The title tag carries those words,
// the H1 keeps Thais's question.
const META = {
  path: "/culture/which-race-to-sign-up-for",
  title: "San Diego Half Marathons 2026: November and December Races",
  description:
    "Half marathons and shorter races in San Diego and SoCal still open for November and December 2026, with prices, weeks to race day, and where HYROX fits in.",
  image: "/home-track-hero.webp",
};
export const metadata = pageMeta({ ...META, paired: true });

// Weeks away count down and run races leave the table, so rebuild daily.
export const revalidate = 86400;

const PUBLISHED = "2026-09-28";
const PUBLISHED_LABEL = "September 28, 2026";

// HYROX is not in races-en.json (it is not a running race), so its facts are
// dated in the sentence itself, the same way the IKEA post dates "sold out".
// Anaheim athlete tickets: every Open singles and Doubles ticket unavailable
// on every day in the vivenu shop, checked Sep 28 2026.
const HYROX_URL = "https://hyrox.com/event/hyrox-anaheim-26-27/";
const HYROX_SD_URL = "https://hyrox.com/event/hyrox-san-diego-26-27/";
const HYROX_FORMAT_URL = "https://hyrox.com/the-fitness-race/";
const HYROX_LAST_DAY = new Date(2026, 11, 6);
const HYROX_SD_LAST_DAY = new Date(2027, 4, 16);
const HIGDON_URL =
  "https://www.halhigdon.com/training-programs/half-marathon-training/novice-1-half-marathon/";
const IG_URL = "https://www.instagram.com/suorsociety/";

const SHORT: Record<PickKey, string> = {
  runThrough: "RunThrough Long Beach",
  silverStrand: "Silver Strand",
  santaBarbara: "Santa Barbara",
  thrive: "Thrive San Diego",
  turkeyTrot: "the O'side Turkey Trot",
  holidayHalf: "the Holiday Half",
  carlsbad: "Carlsbad",
};

const TOC = [
  { id: "compare", label: "How many weeks until race day?" },
  { id: "distance", label: "What distance fits the time you have left?" },
  { id: "drive", label: "Is it worth driving for a race?" },
  { id: "hyrox", label: "Can you still race HYROX this year?" },
  { id: "choose", label: "Which race fits the weeks you actually have?" },
  { id: "faq", label: "Frequently asked questions" },
  { id: "sources", label: "Sources" },
];

function list(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function readableDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function WhichRaceToSignUpFor() {
  const rows = tableRows();
  const asOf = checkedAsOf(rows);
  const has = (k: PickKey) => rows.some(r => r.key === k && r.status !== "sold");
  const when = (k: PickKey) => formatDate(pick(k).start, "en");
  const hyroxAhead = new Date() <= HYROX_LAST_DAY;
  const sdHyroxAhead = new Date() <= HYROX_SD_LAST_DAY;

  const saturdays = rows
    .filter(r => r.start.getDay() === 6 && r.status !== "sold")
    .map(r => SHORT[r.key]);

  const halves = openHalves(rows);
  const halvesAnswer = halves.length
    ? `When the table was last checked${asOf ? ` (${readableDate(asOf)})` : ""}, registration was open for ${list(
        halves.map(r => `${SHORT[r.key]} on ${formatDate(r.start, "en")}`),
      )}. The table on this page updates as races sell out or pass.`
    : "None of the Southern California halves on this list are still open for 2026. Carlsbad in January is the next one on the same coast.";

  const FAQS = [
    {
      q: "Which half marathons in Southern California are still open for 2026?",
      a: halvesAnswer,
    },
    {
      q: "How many weeks do you need to train for a half marathon?",
      a: "Most beginner plans take about 12 weeks and assume you can already run about 3 miles, three or four times a week. If you've kept running since a spring race, 5 or 6 weeks can be enough to get comfortable with the distance again. I'm not a coach, so treat that as a starting point and not a rule.",
    },
    {
      q: "Is HYROX harder than a half marathon?",
      a: "They're hard in different ways. HYROX is 8 km of running in 1 km pieces with a workout station after each one, so you keep running on legs that just pushed a sled or did lunges. A half is 21.1 km of steady running. Which one feels harder usually depends on whether your gap is strength or distance.",
    },
    {
      q: "Is HYROX Anaheim 2026 sold out?",
      a: "Yes, for athletes. As of September 28, 2026, every Open singles and Doubles ticket in the HYROX ticket shop was marked unavailable, on every day. The event page on hyrox.com has a notification list in case more are released.",
    },
    {
      q: "Is there a HYROX in San Diego?",
      a: "Yes. HYROX San Diego is May 13 to 16, 2027 at the San Diego Convention Center, the first one the city has hosted. Tickets weren't on sale yet as of September 28, 2026, and the official event page says sales start soon.",
    },
  ];

  const SOURCES = [
    ...rows.map(r => ({ href: r.url, label: `${r.name}: official site` })),
    { href: HYROX_URL, label: "HYROX Anaheim: event page (sold out)" },
    { href: HYROX_SD_URL, label: "HYROX San Diego: event page" },
    { href: HYROX_FORMAT_URL, label: "HYROX: race format, stations, Doubles and Relay" },
    { href: HIGDON_URL, label: "Hal Higdon: Novice 1 half marathon plan" },
  ];

  return (
    <>
      <ArticleJsonLd
        {...META}
        datePublished={PUBLISHED}
        citation={SOURCES.map(s => s.href)}
      />
      <FaqJsonLd faqs={FAQS} />
      <SiteNav />
      <main className="post dropset-post">
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">The Culture Archive / Races</div>
            <h1 className="article-headline">
              Which SoCal race should you sign up for{" "}
              <span>before 2026 ends?</span>
            </h1>
            {/* The answer capsule. Each sentence drops out once its race has
                been run or sold out, so the deck never recommends a closed door. */}
            <p className="article-deck">
              {has("holidayHalf") && (
                <>
                  If you already run a few days a week and want a half, the San
                  Diego Holiday Half on {when("holidayHalf")} gives you the most
                  time to get ready.{" "}
                </>
              )}
              {has("silverStrand") && has("thrive") ? (
                <>
                  With less time, Silver Strand in Coronado on{" "}
                  {when("silverStrand")} has four distances from a 5K up to
                  13.1, and Thrive San Diego follows on {when("thrive")}.{" "}
                </>
              ) : has("thrive") ? (
                <>
                  With less time, Thrive San Diego on {when("thrive")} has a 5K
                  and a half.{" "}
                </>
              ) : null}
              {!has("holidayHalf") && (
                <>
                  Most of this year&rsquo;s SoCal races have been run. Carlsbad
                  in January is the next one on the same coast.{" "}
                </>
              )}
              {sdHyroxAhead && (
                <>
                  If you were hoping for HYROX,{" "}
                  {hyroxAhead && "Anaheim (December 3 to 6) is sold out, but "}
                  San Diego gets its first one May 13 to 16, 2027.
                </>
              )}
            </p>
            <div className="article-meta">
              <span>
                By <a href="/author/thais-oney">Thais Oney</a>
              </span>
              <span>San Diego, CA</span>
              <span>
                Published <time dateTime={PUBLISHED}>{PUBLISHED_LABEL}</time>
              </span>
            </div>
            <nav className="dropset-jumps" aria-label="Jump to a section">
              <a href="#compare">Compare races</a>
              <a href="#choose">Choose by your weeks</a>
              <a href="#hyrox">Run or HYROX</a>
              <a href="#sources">Sources</a>
            </nav>
          </div>
        </section>

        {/* ── COVER ── Stand-in until Thais sends her own photo for this post. */}
        <ArticleCover
          src="/home-track-hero.webp"
          alt="Two runners crouched at the start line of a red running track, one wearing a San Diego cap"
        />

        <div className="post-shell">
          <div className="post-main">
            <section className="article-body dropset-method">
              <div className="page">
                <h2>How I&rsquo;m choosing</h2>
                <p>
                  I want one more race on my calendar before the year is over,
                  and I haven&rsquo;t picked it yet. I ran my first half
                  marathon in May and I train six days a week between running
                  and lifting, so the plan was to make this one my first HYROX.
                  Anaheim sold out fast. I&rsquo;m going to try for a spot at
                  HYROX San Diego in May 2027 instead, which leaves a running
                  race to close out this year. This is me doing the homework out
                  loud, and you&rsquo;re welcome to use it.
                </p>
                <p>
                  Every race here is in Southern California and links to its
                  official page. I&rsquo;m not a coach, so the week counts are
                  about how much calendar you have left, not a training plan.
                </p>
              </div>
            </section>

            <section id="compare" className="article-body">
              <div className="page">
                <h2>How many weeks until race day?</h2>
                <p>
                  That number decides most of this. Here&rsquo;s every race
                  I&rsquo;m weighing, soonest first.
                </p>
                <div
                  className="post-table-wrap"
                  role="region"
                  aria-label="Southern California races before the end of 2026"
                  tabIndex={0}
                >
                  <table className="post-table post-table--stack">
                    <caption>
                      Southern California races before the end of 2026. Prices
                      include fees where the race lists them.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Race</th>
                        <th scope="col">Race day</th>
                        <th scope="col">Distances</th>
                        <th scope="col">Price</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map(r => (
                        <tr key={r.name}>
                          <th scope="row">
                            <a href={r.url} target="_blank" rel="noopener noreferrer">
                              {r.name}
                            </a>
                            <br />
                            <span className="race-pick-city">{city(r)}</span>
                          </th>
                          <td data-label="Race day">
                            {formatDate(r.start, "en")}
                            <br />
                            <span className="race-pick-city">{weeksAway(r.weeks, "en")}</span>
                          </td>
                          <td data-label="Distances">{r.dists}</td>
                          <td data-label="Price">{r.price}</td>
                          <td data-label="Status">{r.statusLabel}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Generated from the oldest `checked` stamp among the rows, so
                    it moves on its own whenever the races are re-verified. */}
                {asOf && (
                  <p className="race-pick-verified">
                    Last verified: <time dateTime={asOf}>{readableDate(asOf)}</time>
                  </p>
                )}
                <p>
                  Most of these raise the price in steps as race day gets
                  closer, so the same bib costs more in November than it does
                  today. If a row says sold out, it&rsquo;s there so you
                  don&rsquo;t spend a morning looking for a way in.
                </p>
                <p>
                  For races outside SoCal or next year&rsquo;s calendar, the
                  full list lives in <a href="/racepicks">Race Picks</a>, where
                  you can filter by month, distance and price.
                </p>
              </div>
            </section>

            <section id="distance" className="article-body">
              <div className="page">
                <h2>What distance fits the time you have left?</h2>
                <p>
                  Most beginner half marathon plans run about 12 weeks and
                  assume you can already run around 3 miles.{" "}
                  <a href={HIGDON_URL} target="_blank" rel="noopener noreferrer">
                    Hal Higdon&rsquo;s Novice 1
                  </a>{" "}
                  is the one a lot of people start with, and it asks for exactly
                  that: 3 miles, three or four times a week, before week one.
                </p>

                {/* ── PHOTO ── Thais's own track shot, in the running section. */}
                <ArticleCover
                  src="/track-run-two.webp"
                  alt="Two women running side by side on a red track next to a football field under an overcast sky"
                  priority={false}
                  inline
                />
                <p>
                  So if you&rsquo;re starting from a couple of easy runs a week,
                  December is your half. If you&rsquo;ve kept running since a
                  spring race, 5 or 6 weeks to a November half is enough to get
                  used to the distance again. It&rsquo;s not much time to build
                  one from scratch, though.
                </p>
                <p>
                  That&rsquo;s where the shorter races come in. A 5K or 10K fits
                  almost any date on this list
                  {has("silverStrand") && (
                    <>
                      , and Silver Strand lets you pick a 5K, a 12K, 10 miles or
                      the full half on the same morning
                    </>
                  )}
                  .
                </p>
              </div>
            </section>

            <section id="drive" className="article-body">
              <div className="page">
                <h2>Is it worth driving for a race?</h2>
                <p>
                  Staying in San Diego County means sleeping in your own bed and
                  skipping the 5 before sunrise. Silver Strand, Thrive, the
                  Holiday Half and the Turkey Trot in Oceanside all keep you
                  local.
                </p>
                <p>
                  Long Beach is about two hours up the 5, which is fine for a
                  Saturday morning. Santa Barbara is
                  the only real trip here, closer to four hours, and worth it if
                  you wanted a weekend away anyway.
                </p>
                {saturdays.length > 0 && (
                  <p>
                    {list(saturdays).replace(/^the /, "The ")}{" "}
                    {saturdays.length === 1 ? "is a Saturday race" : "are all Saturday races"}
                    , so Sunday stays free to recover.
                  </p>
                )}
              </div>
            </section>

            <section id="hyrox" className="article-body">
              <div className="page">
                <h2>Can you still race HYROX this year?</h2>
                <p>
                  This was my first choice.{" "}
                  <a href={HYROX_FORMAT_URL} target="_blank" rel="noopener noreferrer">
                    A HYROX race
                  </a>{" "}
                  is eight 1 km runs with a workout station after each one:
                  SkiErg, sled push, sled pull, burpee broad jumps, rowing,
                  farmers carry, sandbag lunges and wall balls. Everyone does
                  the same eight in the same order, which is what makes it a
                  race and not just a hard workout.
                </p>

                {/* ── PHOTO ── Thais's own shot, right after the paragraph that
                    names the sled push. Portrait, so ArticleCover caps it by height. */}
                <ArticleCover
                  src="/hyrox-sled-push.webp"
                  alt="Two women laughing while sitting on a loaded push sled on a turf lane in a gym with red and black walls"
                  priority={false}
                  inline
                  caption="The sled push is the second of the eight HYROX stations."
                />
                <p>
                  Not in SoCal.{" "}
                  <a href={HYROX_URL} target="_blank" rel="noopener noreferrer">
                    HYROX Anaheim
                  </a>{" "}
                  runs December 3 to 6 at the Anaheim Convention Center, and
                  it&rsquo;s sold out. As of September 28, 2026, every Open
                  singles and Doubles ticket in the HYROX ticket shop was marked
                  unavailable, on every day. The event page has a notification
                  list if you want to hear about any tickets that come back.
                </p>
                <p>
                  The better news is closer to home.{" "}
                  <a href={HYROX_SD_URL} target="_blank" rel="noopener noreferrer">
                    HYROX San Diego
                  </a>{" "}
                  is May 13 to 16, 2027 at the San Diego Convention Center, the
                  first HYROX the city has hosted. Tickets weren&rsquo;t on sale
                  yet as of September 28, 2026, and the event page says sales
                  start soon. That&rsquo;s where I&rsquo;m aiming my first one, so
                  if Anaheim was your plan too, set a reminder.
                </p>
                <p>
                  If you lift more than you run, HYROX plays to what you already
                  have, and the running comes in 1 km pieces. If what you want
                  is the distance itself, the half is the honest test. And if
                  you&rsquo;re curious but nervous, Doubles has you run every
                  kilometer together with a partner and split the stations
                  however you like.
                </p>
                <p>
                  The other US dates are in the{" "}
                  <a href="/dispatch/hyrox-fall-2026-schedule">
                    HYROX fall 2026 schedule
                  </a>
                  , and if you&rsquo;re fitting runs around lifting, here&rsquo;s{" "}
                  <a href="/culture/run-and-lift-same-week">
                    how to run and lift in the same week
                  </a>
                  .
                </p>
              </div>
            </section>

            <section id="choose" className="article-body">
              <div className="page">
                <h2>Which race fits the weeks you actually have?</h2>
                <p>
                  Pick from the week you usually have, not the one you&rsquo;re
                  hoping November gives you.
                </p>

                {has("holidayHalf") && (
                  <>
                    <h3>You already run a few days a week and want a half</h3>
                    <p>
                      <strong>
                        Sign up for the San Diego Holiday Half on{" "}
                        {when("holidayHalf")}.
                      </strong>{" "}
                      It&rsquo;s the latest half on this list, so it gives you
                      the most weeks, and the course drops 711 feet from start
                      to finish.
                    </p>
                  </>
                )}

                {(has("silverStrand") || has("thrive")) && (
                  <>
                    <h3>You&rsquo;ve kept running since a spring race</h3>
                    <p>
                      <strong>
                        {has("silverStrand") && has("thrive")
                          ? `Silver Strand on ${when("silverStrand")} or Thrive San Diego on ${when("thrive")}.`
                          : has("silverStrand")
                            ? `Silver Strand on ${when("silverStrand")}.`
                            : `Thrive San Diego on ${when("thrive")}.`}
                      </strong>{" "}
                      Both are flat and right by the water.
                      {has("silverStrand") &&
                        " Silver Strand also has a 10 miler and a 12K, if the full 13.1 feels like a stretch this soon."}
                    </p>
                  </>
                )}

                {has("runThrough") && (
                  <>
                    <h3>You want a race on the calendar this month</h3>
                    <p>
                      <strong>
                        RunThrough Long Beach on {when("runThrough")}, 5K or
                        10K.
                      </strong>{" "}
                      It&rsquo;s the soonest race here with room, and neither
                      distance needs a long build.
                    </p>
                  </>
                )}

                {sdHyroxAhead && (
                  <>
                    <h3>You lift more than you run</h3>
                    <p>
                      <strong>HYROX San Diego, May 13 to 16, 2027.</strong>{" "}
                      It&rsquo;s not this year, but it&rsquo;s in town and you
                      get months to get ready. Look at Doubles if it&rsquo;s
                      your first one, so you learn the stations with someone
                      next to you.
                    </p>
                  </>
                )}

                {has("turkeyTrot") && (
                  <>
                    <h3>You just want a race with your friends</h3>
                    <p>
                      <strong>
                        The O&rsquo;side Turkey Trot on Thanksgiving morning.
                      </strong>{" "}
                      A 5K before dinner, no build needed, and the Double Dip if
                      someone in the group wants the extra medal.
                    </p>
                  </>
                )}

                {pick("carlsbad").status === "open" && (
                  <>
                    <h3>Nothing before December works for you</h3>
                    <p>
                      <strong>Carlsbad on {when("carlsbad")}.</strong>{" "}
                      It&rsquo;s not this year, but it&rsquo;s the same coast a
                      few weeks after New Year&rsquo;s, and registration is
                      already open.
                    </p>
                  </>
                )}

                <p>
                  I&rsquo;ll post which one I pick on{" "}
                  <a href={IG_URL} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                  .
                </p>
              </div>
            </section>

            <section id="faq" className="faq-section">
              <div className="page">
                <h2 className="faq-head">Frequently asked questions</h2>
                {FAQS.map(f => (
                  <div key={f.q} className="faq-item">
                    <h3 className="faq-q">{f.q}</h3>
                    <p className="faq-a">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="sources" className="article-body">
              <div className="page">
                <h2>Sources</h2>
                <p>
                  Race dates, distances and prices come from each race&rsquo;s
                  own site or its registration page. The HYROX details come from
                  hyrox.com and its ticket shop.
                </p>
                <ul className="dropset-sources">
                  {SOURCES.map(s => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            <AuthorCard />
            <section className="post-disclaimer-section">
              <div className="page">
                <p className="post-disclaimer">
                  No race paid to be on this list, and there are no affiliate
                  links.
                </p>
              </div>
            </section>
            <PostSubscribe />
          </div>
          <aside className="post-aside post-aside--toc">
            <PostToc items={TOC} />
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
