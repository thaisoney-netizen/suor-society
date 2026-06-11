import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Culture — Suor Society",
  description:
    "The hybrid running culture page for people who run and lift around a real life. Race picks, crew runs, and the weekly dispatch.",
};

// ── HUB CARDS ──
// Each card links to one of the main sections of the site.
type HubCard = {
  href: string;
  img: string;
  eyebrow: string;
  title: string;
  desc: string;
  meta: string;
};
const HUB_CARDS: HubCard[] = [
  {
    href: "/race-picks",
    img: "/race-hero.jpg",
    eyebrow: "Race Picks",
    title: "2026 Race Guide",
    desc: "40 open-entry races across California and the US. All certified. No qualifier needed.",
    meta: "Read the guide ↗",
  },
  {
    href: "/crew",
    img: "/hero.jpg",
    eyebrow: "Crew",
    title: "Saturday Runs",
    desc: "Free, every pace, San Diego, every Saturday. The fastest person waits at every turn.",
    meta: "Run with us ↗",
  },
  {
    href: "/dispatch",
    img: "/hero.webp",
    eyebrow: "Dispatch",
    title: "The Weekly Email",
    desc: "Races worth signing up for, gear worth knowing about, and the people doing both around a real life.",
    meta: "Subscribe ↗",
  },
];

export default function Culture() {
  return (
    <>
      <SiteNav />

      <main>
        {/* HERO */}
        <section className="about-pg-hero">
          <div className="page">
            <p className="about-pg-eye">Suor Society / Culture</p>
            <h1 className="about-pg-headline">The culture.</h1>
            <p className="about-pg-deck">
              A hybrid running page for people<br />
              who run and lift around a real life.
            </p>
          </div>
        </section>

        {/* NARRATIVE */}
        <section className="about" id="about">
          <div className="page">
            <p className="about-eye">What this is</p>
            <div className="about-narrative">
              <p className="about-pg-p">
                <strong>SUOR SOCIETY</strong> covers the lift-and-run world for
                people training around a full-time job. Not two sessions a day.
                Not a 1:10 half. The Tuesday that still counts.
              </p>
              <p className="about-pg-p about-closing">
                Two sports that complete each other, not compete. Consistency
                over perfection. The sweat, and the coffee after.
              </p>
            </div>
          </div>
        </section>

        {/* HUB CARDS */}
        <section className="links">
          <div className="page">
            <div className="links-head">
              <span className="lh-num">Explore</span>
              <h2 className="lh-title">Start here</h2>
              <span className="lh-meta">Updated weekly</span>
            </div>

            <div className="link-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {HUB_CARDS.map((card) => (
                <a key={card.href} className="link-card" href={card.href}>
                  <div className="lc-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={card.img} alt={card.title} />
                  </div>
                  <div className="lc-content">
                    <span className="lc-eye">{card.eyebrow}</span>
                    <h3 className="lc-title">{card.title}</h3>
                    <p className="lc-desc">{card.desc}</p>
                    <div className="lc-meta">{card.meta}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </>
  );
}
