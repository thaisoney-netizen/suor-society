import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Race Picks, Suor Society",
  description:
    "Race Picks. Open entry races, guides, and start lines worth your training block, all in one place.",
};

// ── RACE PICKS POSTS ──
// To publish a new race pick: add an object to the top of this array.
type Post = {
  href: string;
  img: string;
  tag: string;
  date: string;
  title: string;
  desc: string;
};
const POSTS: Post[] = [
  {
    href: "/culture/open-entry-races-2026",
    img: "/race-hero.jpg",
    tag: "Race Guide",
    date: "June 2026",
    title: "40 Open Entry Races in California and the US You Can Still Run in 2026",
    desc: "No qualifier, no lottery. 20 California races, 20 across the US, all USATF certified.",
  },
];

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

        {/* ARCHIVE */}
        <section className="archive">
          <div className="page">
            <div className="archive-list">
              {POSTS.map((post) => (
                <a key={post.href} className="archive-entry" href={post.href}>
                  <div className="archive-entry-head">
                    <div className="archive-entry-meta">
                      <span>{post.tag}</span>
                      <span>{post.date}</span>
                    </div>
                    <h2 className="archive-entry-title">{post.title}</h2>
                  </div>
                  <div className="archive-entry-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.img} alt={post.title} />
                  </div>
                  <div className="archive-entry-body">
                    <p className="archive-entry-desc">{post.desc}</p>
                    <span className="archive-entry-read">Read →</span>
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
