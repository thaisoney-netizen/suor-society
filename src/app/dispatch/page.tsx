import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import DispatchForm from "@/components/DispatchForm";

export const metadata = {
  title: "Dispatch, Suor Society",
  description: "One email a week. The lift-and-run world, edited down.",
};

// ── DISPATCH POSTS ──
// To publish a new post: add an object to the top of this array.
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
    tag: "Race Picks",
    date: "June 2026",
    title: "40 Open Entry Races in California and the US You Can Still Run in 2026",
    desc: "No qualifier, no lottery. 20 California races, 20 across the US, all USATF certified.",
  },
  {
    href: "/dispatch/hyrox-fall-2026-schedule",
    img: "/hyrox-hero.jpg",
    tag: "HYROX",
    date: "June 2026",
    title: "HYROX Fall 2026: Anaheim Is Back and the Calendar Just Got Huge",
    desc: "10 races, four new cities, and Anaheim returns Dec 4 to 6. The full North America schedule.",
  },
  {
    href: "/dispatch/june-2026-shoe-drops",
    img: "/june-shoe-drops-hero.png",
    tag: "Gear",
    date: "June 2026",
    title: "June Shoe Drops: Saucony Goes Big, Puma Pulls the Plate",
    desc: "The Endorphin Elite 3, a plateless Puma at $150, and why plateless super trainers are the trend.",
  },
  {
    href: "/dispatch/cape-town-marathon-major",
    img: "/cape-town-hero.jpg",
    tag: "Races",
    date: "June 2026",
    title: "Cape Town Is Now a Marathon Major. Here's What Actually Changes",
    desc: "Africa's first Abbott World Marathon Major joins the series May 23, 2027. What it does to the star chase.",
  },
];

export default function Dispatch() {
  return (
    <>
      <SiteNav />

      <main>
        {/* HERO */}
        <section className="about-pg-hero dispatch-hero">
          <div className="page">
            <p className="about-pg-eye">Suor Society / Dispatch</p>
            <h1 className="about-pg-headline">Get the dispatch</h1>
            <p className="about-pg-deck">
              One email a week.<br />
              The lift-and-run world, edited down.
            </p>
          </div>
        </section>

        {/* POSTS (left) + SLIM SIGNUP (right) — both above the fold */}
        <section className="dispatch-main">
          <div className="page">
            <div className="dispatch-layout">
              {/* LEFT — latest posts */}
              <div className="dispatch-posts">
                <div className="article-section-head">
                  <div className="article-section-label">Latest from the Dispatch</div>
                  <div className="article-section-sub">Race news · HYROX · Gear</div>
                </div>
                <div className="archive-list dispatch-grid">
                  {POSTS.map((post) => (
                    <a key={post.href} className="archive-entry" href={post.href}>
                      <div className="archive-entry-img">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={post.img} alt={post.title} />
                      </div>
                      <div className="archive-entry-body">
                        <div className="archive-entry-meta">
                          <span>{post.tag}</span>
                          <span>{post.date}</span>
                        </div>
                        <h2 className="archive-entry-title">{post.title}</h2>
                        <p className="archive-entry-desc">{post.desc}</p>
                        <span className="archive-entry-read">Read →</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* RIGHT — slim email signup, sticky */}
              <aside className="dispatch-aside">
                <div className="dispatch-aside-card">
                  <div className="gate-label">The Weekly Dispatch</div>
                  <div className="gate-title">Sign up<br />Free</div>
                  <p className="gate-desc">
                    Races worth signing up for and gear worth knowing about.
                    One email a week, no daily blast
                  </p>
                  <DispatchForm />
                  <ul className="gate-what">
                    <li>Open-entry races worth your weekend</li>
                    <li>Hybrid training and gear we actually use</li>
                    <li>San Diego crew runs and meetups</li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </>
  );
}
