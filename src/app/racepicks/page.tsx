import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Race Picks, Suor Society",
  description:
    "Race Picks. Open entry races, guides, and start lines worth your training block, all in one place.",
};

// ── RACE PICKS ──
// One post lives here for now, so the page presents it as a single feature
// rather than an archive grid. When a second pick ships, switch this back to
// the POSTS array + .archive-list grid (see git history) and add the new card.
const FEATURE = {
  href: "/culture/open-entry-races-2026",
  img: "/race-hero.jpg",
  tag: "Race Guide",
  date: "June 2026",
  title: "40 Open Entry Races in California and the US You Can Still Run in 2026",
  desc: "No qualifier, no lottery. 20 California races, 20 across the US, all USATF certified, with dates, prices, and direct registration links.",
};

export default function RacePicks() {
  return (
    <>
      <SiteNav />

      <main>
        {/* HERO */}
        <section className="about-pg-hero">
          <div className="page">
            <p className="about-pg-eye">Suor Society / Race Picks</p>
            <h1 className="about-pg-headline">Race Picks</h1>
            <p className="about-pg-deck">
              Open entry races and start lines worth your training block.<br />
              No qualifier, no lottery, no guesswork.
            </p>
          </div>
        </section>

        {/* SINGLE FEATURE */}
        <section className="rp-feature-section">
          <div className="page">
            <a className="rp-feature" href={FEATURE.href}>
              <div className="rp-feature-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={FEATURE.img} alt={FEATURE.title} />
              </div>
              <div className="rp-feature-body">
                <div className="archive-entry-meta">
                  <span>{FEATURE.tag}</span>
                  <span>{FEATURE.date}</span>
                </div>
                <h2 className="rp-feature-title">{FEATURE.title}</h2>
                <p className="rp-feature-desc">{FEATURE.desc}</p>
                <span className="archive-entry-read">Read the guide →</span>
              </div>
            </a>
          </div>
        </section>

      </main>

      <SiteFooter />
    </>
  );
}
