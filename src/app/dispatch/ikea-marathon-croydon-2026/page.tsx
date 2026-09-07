import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ArticleCover from "@/components/ArticleCover";
import { PostToc } from "@/components/PostAside";
import AuthorCard from "@/components/AuthorCard";
import { pageMeta, ArticleJsonLd, FaqJsonLd, EventJsonLd } from "@/lib/seo";

// True translation of /pt-br/dispatch/maratona-ikea-croydon-2026 at a
// different slug, so `counterpart` wires the hreflang pair and REGIONAL_PAIRS
// (dictionaries.ts) maps the language switcher across.
const META = {
  path: "/dispatch/ikea-marathon-croydon-2026",
  title: "IKEA Marathon 2026: Croydon Date, Course, Sold Out Entry",
  description:
    "The first official IKEA Marathon runs December 13, 2026 inside IKEA Croydon in south London, and all 80 general places are gone. Date, course, lap length, cutoff and what finishers get.",
  image: "/ikea-marathon-hero.avif",
};
export const metadata = pageMeta({
  ...META,
  paired: true,
  counterpart: "/pt-br/dispatch/maratona-ikea-croydon-2026",
});

// The entry listing is the primary source for every fact in the details
// table; the press links back it up and carry the organiser's own quotes.
const SOURCES = [
  "https://www.sientries.co.uk/event/the-ikea-marathon-2026",
  "https://sussextrailevents.com/",
  "https://www.washingtonpost.com/lifestyle/2026/07/14/runners-compete-marathon-inside-an-ikea-england/",
  "https://marathonhandbook.com/runners-will-race-a-marathon-inside-an-ikea-store-this-december/",
];
const SOURCE_LABELS = [
  "SIEntries: official entry listing",
  "Sussex Trail Events: the organiser",
  "Washington Post: coverage of the race",
  "Marathon Handbook: interview with the race director",
];

const TOC = [
  { id: "entry", label: "Can you still enter?" },
  { id: "course", label: "What the course looks like" },
  { id: "laps", label: "How many laps is it?" },
  { id: "details", label: "The details" },
  { id: "novelty", label: "Why shop races keep appearing" },
  { id: "if-you-lift", label: "If you lift too" },
  { id: "faq", label: "Frequently Asked" },
  { id: "sources", label: "Sources" },
];

const DETAILS = [
  { k: "Date", v: "Sunday, December 13, 2026" },
  { k: "Start", v: "6pm, hard six-hour cutoff, store cleared by midnight" },
  { k: "Where", v: "IKEA Croydon, south London" },
  { k: "Field", v: "100 places, 80 of them on general sale" },
  { k: "Entry", v: "£80 affiliated, £82 unaffiliated, now sold out" },
  { k: "Minimum age", v: "18 and over" },
  { k: "Format", v: "26.2 miles, multi-lap inside the store, about 17 laps" },
  { k: "Aid station", v: "Swedish themed, meatballs planned" },
  { k: "Finishers get", v: "A self-assembly medal and a finisher t-shirt" },
  { k: "Charity", v: "16% of proceeds to Shelter" },
  { k: "Spectators", v: "Not allowed, the store is a working environment" },
  { k: "Refunds", v: "None, and no transfers" },
];

const NOVELTY = [
  {
    race: "The IKEA Marathon",
    where: "IKEA Croydon, south London, December 13, 2026",
    format: "26.2 miles, about 17 laps, six-hour cutoff",
    entry: "£80 to £82, sold out",
  },
  {
    race: "Phoenix Supermarketathon",
    where: "Tesco Bridgend, south Wales, June 28, 2026",
    format: "Six hours timed, you pick the distance",
    entry: "£57.95 to £59.95, already run",
  },
];

const FAQS = [
  {
    q: "Can you still enter the IKEA Marathon?",
    a: "No. The SIEntries listing shows the race as full and closed to new entries. Registration opened at 6pm on Friday, June 26, 2026 and the 80 general places went within minutes. There are no refunds and no transfers, so places cannot change hands either.",
  },
  {
    q: "When is the IKEA Marathon?",
    a: "Sunday, December 13, 2026 at IKEA Croydon in south London. It starts at 6pm and the store has to be cleared by midnight.",
  },
  {
    q: "How many laps is the IKEA Marathon?",
    a: "About 17 laps of the store. The official listing only says 26.2 miles in a multi-lap format and never gives a lap length. Coverage repeating 1.5 kilometres per lap does not add up, because 17 of those is 25.5 km rather than a marathon. A lap of roughly 1.5 miles is the figure that works.",
  },
  {
    q: "Is there a time limit?",
    a: "Yes, a hard six-hour cutoff. IKEA Croydon trades as normal during the day and has to be empty by midnight, so the cutoff is a building constraint rather than a race one.",
  },
  {
    q: "Can spectators watch the IKEA Marathon?",
    a: "No. The store stays a working environment during the race and supporters are not allowed inside for security reasons. Runners cover the full 26.2 miles with nobody watching.",
  },
  {
    q: "What do finishers get?",
    a: "A bespoke self-assembly medal that arrives in pieces with instructions, plus a finisher t-shirt. The aid station is Swedish themed, with meatballs planned and lingonberry sandwiches under discussion.",
  },
  {
    q: "Will there be an IKEA Marathon in 2027?",
    a: "Nothing has been announced. Sussex Trail Events lists new races on its own site and through SIEntries before anywhere else, so those are the pages to watch. The 2026 field sold out in minutes, which is the strongest argument that a second edition happens.",
  },
];

export default function IkeaMarathon() {
  return (
    <>
      <ArticleJsonLd
        {...META}
        datePublished="2026-07-10"
        dateModified="2026-09-06"
        citation={SOURCES}
      />
      <FaqJsonLd faqs={FAQS} />
      {/* Article schema says what this page is; SportsEvent says what the race
          is and, in `offers.availability`, that you can no longer enter it. */}
      <EventJsonLd
        name="The IKEA Marathon"
        description="A 26.2 mile multi-lap marathon run entirely inside the IKEA Croydon store in south London, with a hard six-hour cutoff."
        path={META.path}
        image={META.image}
        startDate="2026-12-13T18:00:00+00:00"
        endDate="2026-12-14T00:00:00+00:00"
        venue="IKEA Croydon"
        locality="Croydon"
        region="London"
        country="GB"
        organizerName="Sussex Trail Events"
        organizerUrl="https://sussextrailevents.com/"
        offer={{
          price: "80",
          priceCurrency: "GBP",
          availability: "SoldOut",
          url: SOURCES[0],
          validFrom: "2026-06-26T18:00:00+01:00",
        }}
      />
      <SiteNav />

      <main className="post">
        {/* ── ARTICLE MASTHEAD (title above the cover) ── */}
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">The Dispatch &nbsp;/&nbsp; Races</div>
            <h1 className="article-headline">
              The IKEA Marathon: 26.2 Miles Inside a Croydon Store, and Every Place Is{" "}
              <span>Already Gone</span>
            </h1>
          </div>
        </section>

        {/* ── COVER IMAGE ── */}
        <ArticleCover
          src="/ikea-marathon-hero.avif"
          alt="Runners racing through the aisles of an IKEA store showroom"
        />

        {/* ── BODY + STICKY RAIL ── */}
        <div className="post-shell">
          <div className="post-main">

            {/* ── ARTICLE HERO (answer capsule + meta) ── */}
            <section className="article-hero">
              <div className="page">
                <p className="article-deck">
                  The IKEA Marathon runs on Sunday, December 13, 2026 inside IKEA Croydon in
                  south London, and you cannot enter it. All 80 general places sold out within
                  minutes of registration opening on June 26. The field is capped at 100
                  runners, the start is 6pm with a hard six-hour cutoff, and 16 percent of
                  proceeds go to the housing charity Shelter.
                </p>
                <div className="article-meta">
                  <span>By <a href="/author/thais-oney">Thais Oney</a></span>
                  <span>San Diego, CA</span>
                  <span>
                    Published <time dateTime="2026-07-10">July 10, 2026</time>
                  </span>
                  <span>
                    Updated <time dateTime="2026-09-06">September 6, 2026</time>
                  </span>
                </div>
              </div>
            </section>

            {/* ── BODY ── */}
            <section className="article-body">
              <div className="page">
                <p>
                  Sussex Trail Events has staged races in a multi-storey car park, on a pier,
                  and through a former prison. This is the strangest one yet, and the logistics
                  are the reason it works. The problem that eats race directors alive is course
                  marking, and here it was solved before anyone turned up. As the race director
                  put it to{" "}
                  <a href={SOURCES[3]} rel="nofollow noopener" target="_blank">
                    Marathon Handbook
                  </a>
                  , the store already has the arrows on the floor.
                </p>

                <h2 id="entry">Can you still enter the IKEA Marathon?</h2>
                <p>
                  No. The{" "}
                  <a href={SOURCES[0]} rel="nofollow noopener" target="_blank">
                    official SIEntries listing
                  </a>{" "}
                  now shows the race as full, with no new entries possible. Registration opened
                  at 6pm on Friday, June 26, 2026 and the 80 general places went in minutes.
                  The remaining 20 of the 100-place field were never on general sale. Entry was
                  £80 for affiliated runners and £82 for unaffiliated, and because the race
                  allows no refunds and no transfers, a place cannot change hands privately
                  either.
                </p>
                <p>
                  No waiting list has been published. Sussex Trail Events announces its races on
                  its own site and through SIEntries before anywhere else, so those are the two
                  pages to watch if you want a shot at whatever comes next.
                </p>

                <h2 id="course">What the course actually looks like</h2>
                <p>
                  Runners go up the travelator, along the showroom aisles, through the tills and
                  out onto the warehouse floor, then do it again. The 6pm start exists because
                  the store trades all day, and that same fact is why there are no spectators.
                  Supporters were cut for security reasons, which the race director described as
                  the trade-off. So you run a marathon under fluorescent light past the KALLAX
                  shelving with nobody there to see it.
                </p>

                <h2 id="laps">How many laps is it, and how long is each one?</h2>
                <p>
                  Coverage of this race has settled on about 17 laps of roughly 1.5 kilometres.
                  Those two numbers cannot both be right. A marathon is 42.2 km, and 17 laps of
                  1.5 km comes to 25.5 km, which leaves you nearly 17 km short. For 17 laps to
                  make a marathon, each one has to be about 2.48 km, or a shade over 1.5 miles.
                  The likeliest explanation is that a lap measured in miles was converted once,
                  wrongly, and the bad figure has been copied ever since.
                </p>
                <p>
                  The official listing does not commit to a number at all. It says only that the
                  race is 26.2 miles in a multi-lap format inside the store. Until the organiser
                  publishes a lap length, about 17 laps of roughly 1.5 miles is the version that
                  survives the arithmetic.
                </p>

                <h2 id="details">The details</h2>
                <div className="post-table-wrap">
                  <table className="post-table post-table--stack">
                    <caption>
                      The IKEA Marathon 2026, from the official SIEntries listing
                    </caption>
                    <tbody>
                      {DETAILS.map((d) => (
                        <tr key={d.k}>
                          <th scope="row">{d.k}</th>
                          <td>{d.v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h2 id="novelty">Why shop races keep appearing</h2>
                <p>
                  This is not a one-off. A six-hour timed event ran at a Tesco in Bridgend,
                  south Wales in June 2026 under the name Phoenix Supermarketathon, and the
                  format is close enough that the two are worth putting side by side. Race
                  directors have worked out that an odd venue does the marketing for them, which
                  is how an 80-place race in a furniture shop ended up in the{" "}
                  <a href={SOURCES[2]} rel="nofollow noopener" target="_blank">
                    Washington Post
                  </a>
                  . This post is part of the same effect.
                </p>
                <div className="post-table-wrap">
                  <table className="post-table post-table--stack">
                    <caption>Retail venue races in 2026</caption>
                    <thead>
                      <tr>
                        <th scope="col">Race</th>
                        <th scope="col">Where and when</th>
                        <th scope="col">Format</th>
                        <th scope="col">Entry</th>
                      </tr>
                    </thead>
                    <tbody>
                      {NOVELTY.map((n) => (
                        <tr key={n.race}>
                          <th scope="row">{n.race}</th>
                          <td data-label="Where and when">{n.where}</td>
                          <td data-label="Format">{n.format}</td>
                          <td data-label="Entry">{n.entry}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h2 id="if-you-lift">If you lift too</h2>
                <p>
                  A six-hour indoor loop is a reasonable hybrid format on paper. It is flat and
                  climate controlled, there is no weather to plan around, and aid comes past you
                  every ten minutes or so. The catch is the surface. Six hours on polished
                  concrete loads the legs differently than road does, and the repetition is the
                  part people underestimate, because 17 laps of the same circuit means the same
                  leg takes the same corner 17 times.
                </p>
                <p>
                  If you were building for something like this, you would want more time on hard
                  flat ground and less on trail, plus the single-leg work you are probably
                  already doing on lifting days.
                </p>
                <p>
                  Want a race you can actually enter? The{" "}
                  <a href="/racepicks">race picks with entries still open</a> are all
                  registration open with no lottery, and{" "}
                  <a href="/culture/open-entry-races-2026">how to choose an open entry race</a>{" "}
                  goes deeper on picking one. If it is the indoor part that appeals, the{" "}
                  <a href="/dispatch/hyrox-fall-2026-schedule">HYROX fall 2026 schedule</a>{" "}
                  covers races run entirely under a roof as well.
                </p>
              </div>
            </section>

            {/* ── FAQ ── */}
            <section id="faq" className="faq-section">
              <div className="page">
                <div className="faq-head">Frequently Asked</div>
                {FAQS.map((f, i) => (
                  <div key={i} className="faq-item">
                    <h3 className="faq-q">{f.q}</h3>
                    <p className="faq-a">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── SOURCES ── */}
            <section id="sources" className="article-body">
              <div className="page">
                <h2>Sources</h2>
                <ul className="dropset-sources">
                  {SOURCES.map((href, i) => (
                    <li key={href}>
                      <a href={href} rel="nofollow noopener" target="_blank">
                        {SOURCE_LABELS[i]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* ── AUTHOR ── */}
            <AuthorCard />

          </div>{/* /.post-main */}

          <aside className="post-aside post-aside--toc">
            {/* Long read: the rail carries the section links, not the
                signup card. Short posts get the card instead. */}
            <PostToc items={TOC} />
          </aside>
        </div>{/* /.post-shell */}

      </main>

      <SiteFooter />
    </>
  );
}
