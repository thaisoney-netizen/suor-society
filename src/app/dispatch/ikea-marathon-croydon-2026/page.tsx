import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ArticleCover from "@/components/ArticleCover";
import { PostToc } from "@/components/PostAside";
import AuthorCard from "@/components/AuthorCard";
import { pageMeta, ArticleJsonLd, FaqJsonLd } from "@/lib/seo";

// True translation of /pt-br/dispatch/maratona-ikea-croydon-2026 at a
// different slug, so `counterpart` wires the hreflang pair and REGIONAL_PAIRS
// (dictionaries.ts) maps the language switcher across.
const META = {
  path: "/dispatch/ikea-marathon-croydon-2026",
  title: "IKEA Marathon 2026: Croydon Date, Registration, Details",
  description:
    "The first official IKEA Marathon runs December 13, 2026 entirely inside IKEA Croydon in south London. 100 places, a 6pm start, a hard six-hour cutoff, and a self-assembly medal.",
  image: "/ikea-marathon-hero.avif",
};
export const metadata = pageMeta({
  ...META,
  paired: true,
  counterpart: "/pt-br/dispatch/maratona-ikea-croydon-2026",
});

const TOC = [
  { id: "the-details", label: "The Details" },
  { id: "if-you-lift", label: "If You Lift Too" },
  { id: "faq", label: "Frequently Asked" },
];

const DETAILS = [
  { k: "Date", v: "Sunday, December 13, 2026" },
  { k: "Where", v: "IKEA Croydon, south London" },
  { k: "Field", v: "100 places, 80 general entry" },
  { k: "Entry", v: "£80 affiliated, £82 unaffiliated, closes December 6" },
  { k: "Cutoff", v: "Hard six hours, store cleared by midnight" },
  { k: "Charity", v: "16% of proceeds to Shelter" },
  { k: "Aid station", v: "Meatballs, possibly lingonberry sandwiches" },
  { k: "Medal", v: "Arrives in pieces. You assemble it yourself. Instructions included." },
];

const FAQS = [
  {
    q: "When is the IKEA Marathon?",
    a: "Sunday, December 13, 2026 at IKEA Croydon in south London. It starts at 6pm and must finish by midnight.",
  },
  {
    q: "How do you enter the IKEA Marathon?",
    a: "Entry opened June 26, 2026 through SIEntries and Sussex Trail Events. £80 for affiliated runners, £82 unaffiliated. Entries close December 6 or when the 80 general spots sell out.",
  },
  {
    q: "How many laps is the IKEA Marathon?",
    a: "Roughly 17 laps through the showroom, checkout area, and warehouse floor.",
  },
  {
    q: "Can spectators watch the IKEA Marathon?",
    a: "No. The store remains a working environment during the race, so supporters aren't allowed inside.",
  },
  {
    q: "Is there a time limit?",
    a: "Yes, a hard six-hour cutoff. The store has to be cleared by midnight.",
  },
  {
    q: "What do finishers get?",
    a: "A self-assembly medal that arrives in pieces with instructions, in true IKEA fashion.",
  },
];

export default function IkeaMarathon() {
  return (
    <>
      <ArticleJsonLd {...META} datePublished="2026-07-10" />
      <FaqJsonLd faqs={FAQS} />
      <SiteNav />

      <main className="post">
        {/* ── ARTICLE MASTHEAD (title above the cover) ── */}
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">The Dispatch &nbsp;/&nbsp; Races</div>
            <h1 className="article-headline">
              The IKEA Marathon Is Real: 26.2 Miles Inside a Store, and It Might Be the
              Smartest <span>Dumb Race</span> of 2026
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

            {/* ── ARTICLE HERO (deck + meta) ── */}
            <section className="article-hero">
              <div className="page">
                <p className="article-deck">
                  The first official IKEA Marathon happens December 13, 2026, entirely inside
                  IKEA Croydon in south London. The field is capped at 100 runners, starting 6pm
                  with a hard six-hour cutoff. Sixteen percent of proceeds go to the housing
                  charity Shelter.
                </p>
                <div className="article-meta">
                  <span>By <a href="/author/thais-oney">Thais Oney</a></span>
                  <span>San Diego, CA</span>
                  <span>July 2026</span>
                </div>
              </div>
            </section>

            {/* ── BODY ── */}
            <section className="article-body">
              <div className="page">
                <p>
                  Sussex Trail Events has staged races in a multi-storey car park, on a pier, and
                  through a former prison. This is their weirdest one yet, and somehow the
                  logistics make sense. The course marking problem that eats race directors
                  alive? Solved. The arrows are already on the floor.
                </p>
                <p>
                  Runners loop through the showroom, past the tills, and along the warehouse
                  floor. Roughly 17 laps. Start time is 6pm because the store is a working
                  environment, which also means no spectators. You run a marathon under
                  fluorescent lights past the KALLAX section with nobody cheering. Brutal and
                  kind of perfect.
                </p>

                <h2 id="the-details">The details</h2>
                <ul>
                  {DETAILS.map((d) => (
                    <li key={d.k}>
                      <strong>{d.k}</strong> | {d.v}
                    </li>
                  ))}
                </ul>
                <p>
                  One pattern worth noticing: novelty venue racing is becoming its own category.
                  A supermarket six-hour event is already scheduled at a Tesco in Wales for June
                  2026. Race directors figured out that a weird venue does the marketing for
                  them. This post you&rsquo;re reading is proof.
                </p>

                <h2 id="if-you-lift">If you lift too</h2>
                <p>
                  A six-hour indoor loop race is actually a decent hybrid format. Flat, climate
                  controlled, zero weather variables, aid every 10 minutes or so. The catch is
                  the surface. Six hours on polished concrete is a different pounding than road,
                  and your calves will notice by lap eight. If you were building for something
                  like this, you&rsquo;d want more time on hard flat surfaces and less trail, plus
                  the single-leg work you&rsquo;re probably already doing on lifting days.
                </p>
                <p>
                  Want a race you can actually enter without flying to London? Our{" "}
                  <a href="/racepicks">open entry race picks</a> are all registration-open, no
                  lottery.
                </p>
              </div>
            </section>

            {/* ── FAQ ── */}
            <section id="faq" className="faq-section">
              <div className="page">
                <div className="faq-head">Frequently Asked</div>
                {FAQS.map((f, i) => (
                  <div key={i} className="faq-item">
                    <div className="faq-q">{f.q}</div>
                    <p className="faq-a">{f.a}</p>
                  </div>
                ))}
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
