import DispatchForm from "@/components/DispatchForm";
import { dictionaries } from "@/i18n/dictionaries";

// Link-in-bio hub — the single destination for the @suorsociety bio link.
// Deliberately chromeless (no nav/footer) and conversion-first: the Dispatch
// signup sits on top, then the latest stories, the free race guide, and the
// crew. English-only utility page (a bio link is one URL), so its short copy
// lives here rather than in the shared dictionaries. Kept out of the sitemap
// and marked noindex in the route's metadata.

const LINKS = [
  {
    href: "/culture/open-entry-races-2026",
    kicker: "Free guide",
    label: "40 open-entry races you can still run in 2026",
  },
  { href: "/dispatch", kicker: "Read", label: "The Dispatch — every issue" },
  { href: "/crew", kicker: "San Diego", label: "Run with the crew — free, every pace" },
  { href: "/about", kicker: "The culture", label: "What Suor Society is" },
];

export default function LinksView() {
  const posts = dictionaries.en.dispatch.posts.slice(0, 3);

  return (
    <main className="links-page">
      <div className="links-inner">
        <a href="/" className="links-brand" aria-label="Suor Society home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/wordmark-horizontal-light.png" alt="Suor Society" />
        </a>
        <p className="links-tagline">
          Run. Lift. Sweat. Hybrid running culture for people who train around a real life.
        </p>

        {/* PRIMARY — the Dispatch signup */}
        <section className="links-signup">
          <div className="gate-label">The Weekly Dispatch</div>
          <div className="gate-title">
            <span>One email</span>
            <br />
            <span>a week</span>
          </div>
          <p className="gate-desc">
            Races worth signing up for, gear worth knowing about, and the people doing both
            around a real life.
          </p>
          <DispatchForm lang="en" />
        </section>

        {/* LATEST STORIES */}
        <section className="links-section">
          <p className="links-section-label">Latest stories</p>
          <div className="links-stack">
            {posts.map((post) => (
              <a key={post.href} href={post.href} className="links-btn">
                <span className="links-btn-kicker">
                  {post.tag} · {post.date}
                </span>
                <span className="links-btn-label">{post.title}</span>
              </a>
            ))}
          </div>
        </section>

        {/* EVERYTHING ELSE */}
        <section className="links-section">
          <p className="links-section-label">More</p>
          <div className="links-stack">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} className="links-btn">
                <span className="links-btn-kicker">{link.kicker}</span>
                <span className="links-btn-label">{link.label}</span>
              </a>
            ))}
          </div>
        </section>

        {/* SOCIAL */}
        <div className="links-social">
          <a
            href="https://instagram.com/suorsociety"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a href="mailto:hello@suorsociety.com">Email</a>
        </div>
      </div>
    </main>
  );
}
