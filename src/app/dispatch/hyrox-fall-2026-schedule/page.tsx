import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { PostSubscribe } from "@/components/PostAside";

export const metadata = {
  title: "HYROX Fall 2026 US Schedule, Suor Society",
  description:
    "HYROX's fall 2026 North America calendar lists 10 races from Labor Day through December, including Anaheim Dec 4 to 6 and first-time stops in Salt Lake City, Tampa, Denver, and Nashville.",
  // No hreflang here: the pt-BR counterpart (/pt-br/dispatch/hyrox-brasil-2026)
  // is a regional Brazil post, not a translation of this page.
  alternates: {
    canonical: "/dispatch/hyrox-fall-2026-schedule",
  },
};

const SCHEDULE = [
  { city: "Washington, DC", date: "Sept 3 to 7", venue: "Walter E. Washington Convention Center (moved from its usual spring slot)" },
  { city: "Salt Lake City, UT", date: "Sept 18 to 20", venue: "Salt Palace Convention Center (new)" },
  { city: "Toronto, ON", date: "Oct 1 to 4", venue: "Enercare Centre" },
  { city: "Boston, MA", date: "Oct 8 to 11", venue: "Boston Convention and Exhibition Center" },
  { city: "Tampa, FL", date: "Oct 23 to 25", venue: "Tampa Convention Center (new)" },
  { city: "Denver, CO", date: "Nov 12 to 15", venue: "Colorado Convention Center (new)" },
  { city: "Dallas, TX", date: "Nov 18 to 22", venue: "Kay Bailey Hutchison Convention Center" },
  { city: "Anaheim, CA", date: "Dec 4 to 6", venue: "Anaheim Convention Center" },
  { city: "Nashville, TN", date: "Dec 10 to 13", venue: "Music City Center (new)" },
  { city: "Vancouver, BC", date: "Dec 18 to 20", venue: "Vancouver Convention Centre" },
];

const FAQS = [
  {
    q: "When is HYROX Anaheim 2026?",
    a: "December 4 to 6, 2026 at the Anaheim Convention Center. It's the closest HYROX to San Diego.",
  },
  {
    q: "Which HYROX cities are new for fall 2026?",
    a: "Salt Lake City (September), Tampa (October), Denver (November), and Nashville (December) are all hosting their first HYROX.",
  },
  {
    q: "Do you have to qualify for HYROX?",
    a: "No. Open, Doubles, and Relay divisions are open entry. Qualifying only matters for Elite racing and the World Championships.",
  },
  {
    q: "When do HYROX Anaheim tickets go on sale?",
    a: "No on-sale date has been announced yet. HYROX tickets typically drop three to five months before race day, which puts Anaheim somewhere around mid to late summer. Registration happens through the official event page on hyrox.com, and races sell out fast once they open.",
  },
];

export default function HyroxFall2026() {
  return (
    <>
      <SiteNav />

      <main className="post">
        {/* ── ARTICLE MASTHEAD (title above the cover) ── */}
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">The Dispatch &nbsp;/&nbsp; HYROX</div>
            <h1 className="article-headline">
              HYROX Fall 2026: Anaheim Is Back and the Calendar Just Got <span>Huge</span>
            </h1>
          </div>
        </section>

        {/* ── COVER IMAGE ── */}
        <div className="article-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hyrox-hero.jpg"
            alt="Athlete pressing a kettlebell overhead during a HYROX-style training session"
          />
        </div>

        {/* ── BODY + STICKY RAIL ── */}
        <div className="post-shell">
          <div className="post-main">

        {/* ── ARTICLE HERO (deck + meta) ── */}
        <section className="article-hero">
          <div className="page">
            <p className="article-deck">
              The fall 2026 North America schedule lists 10 races from Labor Day through December. Four
              cities get their first race ever, and Anaheim is the one to circle if you&rsquo;re near San Diego.
            </p>
            <div className="article-meta">
              <span>Suor Society</span>
              <span>San Diego, CA</span>
              <span>June 2026</span>
            </div>
          </div>
        </section>

        {/* ── BODY ── */}
        <section className="article-body">
          <div className="page">
            <p>
              HYROX&rsquo;s fall 2026 North America schedule lists 10 races running from Labor Day weekend
              through December. Four cities are getting their first race ever: Salt Lake City, Tampa,
              Denver, and Nashville. And for everyone reading this from San Diego, the one to circle is
              Anaheim, December 4 to 6 at the Anaheim Convention Center. Ninety minutes up the 5.
            </p>
            <p>
              For comparison, fall 2025 had seven races total. This year it&rsquo;s 10 confirmed, with Atlanta
              and Seattle rumored to push it to 12. The sled push has officially gone mainstream.
            </p>

            <h2>The full fall 2026 schedule</h2>
            <ul>
              {SCHEDULE.map((r) => (
                <li key={r.city}>
                  <strong>{r.city}</strong> | {r.date} | {r.venue}
                </li>
              ))}
            </ul>
            <p>
              One pattern worth noticing: the weekends are getting longer. DC, Toronto, Boston, Dallas,
              Anaheim, and Nashville all span four or five days now, which means bigger fields across Open,
              Pro, Doubles, and Relay. Translation: more spots, but they&rsquo;ll still sell fast.
            </p>

            <h2>If you lift too</h2>
            <p>
              This is the part where the calendar gets fun. Counting back from Anaheim on December 4, a
              solid 10 to 12 week HYROX block starts mid-September. That gives you the whole summer to build
              your running base and keep lifting heavy, then shift into race-specific work (sleds, wall
              balls, compromised running) after Labor Day. The timeline is almost suspiciously perfect.
            </p>
            <p>
              First HYROX? The Open division is exactly what it sounds like. No qualifying, any fitness
              level, and Doubles lets you split the work with a partner. It&rsquo;s the most beginner-friendly
              way into hybrid racing that exists right now.
            </p>
            <p>
              Building toward race day and want somewhere to test the engine before then? Our{" "}
              <a href="/racepicks">open entry race picks</a> have road races you can register for today,
              no lottery, no qualifier.
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="faq-section">
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

          </div>{/* /.post-main */}

          <aside className="post-aside post-aside--sub">
            <PostSubscribe />
          </aside>
        </div>{/* /.post-shell */}

      </main>

      <SiteFooter />
    </>
  );
}
