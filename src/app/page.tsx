"use client";

import { useState } from "react";

// ── BOARD POSTS ──
// To publish a new post: replace one of the `null` slots below with an object.
// Order = display order. Keep this list at 3 entries.
type BoardPost = {
  href: string;
  img: string;
  eyebrow: string;
  title: string;
  desc: string;
  meta: string;
};
const BOARD_POSTS: (BoardPost | null)[] = [
  {
    href: "/culture",
    img: "/race-hero.jpg",
    eyebrow: "The Culture Archive",
    title: "2026 Race Guide",
    desc: "Best open entry races in California and the US. All certified. No qualifier needed.",
    meta: "New · June 2026 ↗",
  },
  null, // placeholder slot
  null, // placeholder slot
];

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [signupError, setSignupError] = useState(false);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSignupError(false);
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("server");
      setSubmitted(true);
    } catch {
      setSignupError(true);
    }
  }

  return (
    <>
      {/* ABOVE FOLD — hero + signup as one unit */}
      <div className="above-fold">
      {/* HERO — full viewport with nav overlay */}
      <header className="hero">
        <nav className="nav">
          <div className="page nav-row">
            <a href="https://suorsociety.com" className="wm" aria-label="Suor Society, home">
              <span className="wm-suor">SUOR</span>
              <span className="wm-society">SOCIETY</span>
            </a>
            <div className="nav-links">
              <a href="/merch" className="nav-link">Shop</a>
              <a href="#culture" className="nav-link">The Culture</a>
            </div>
          </div>
        </nav>
        <video className="hero-video" src="/hero.mp4" autoPlay muted loop playsInline />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-text">
          <p className="hero-tagline">Run.<br />Lift.<br />Sweat.</p>
          <p className="hero-sub">a performance culture page</p>
        </div>
      </header>

      {/* SIGNUP */}
      <div className="signup-section" style={{flexShrink: 0}}>
        <div className="page">
          <form className="signup" onSubmit={handleSignup}>
            <label className="signup-label" htmlFor="email-hero">
              Get the weekly dispatch
            </label>
            <input
              id="email-hero"
              className="signup-input"
              type="email"
              name="email"
              placeholder="you@somewhere.com"
              required
              autoComplete="email"
            />
            <button type="submit" className="signup-btn">
              {submitted ? "ON THE LIST." : "I'm in."}
            </button>
            {signupError && (
              <p className="signup-error">
                Something went wrong. Email us at hello@suorsociety.com and we&rsquo;ll add you directly.
              </p>
            )}
          </form>
        </div>
      </div>
      </div>{/* /above-fold */}

      {/* LINKS */}
      <section className="links" id="culture">
        <div className="page">
          <div className="links-head">
            <span className="lh-num">04 / Links</span>
            <h2 className="lh-title">The board</h2>
            <span className="lh-meta">Updated weekly</span>
          </div>

          <div className="link-grid">
            {BOARD_POSTS.map((post, i) =>
              post ? (
                <a key={i} className="link-card" href={post.href}>
                  <div className="lc-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.img} alt={post.title} />
                  </div>
                  <div className="lc-content">
                    <span className="lc-eye">{post.eyebrow}</span>
                    <h3 className="lc-title">{post.title}</h3>
                    <p className="lc-desc">{post.desc}</p>
                    <div className="lc-meta">{post.meta}</div>
                  </div>
                </a>
              ) : (
                <span key={i} className="link-card coming" aria-disabled="true">
                  <div className="lc-img lc-img--dark">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/hero.jpg" alt="" aria-hidden="true" />
                  </div>
                  <div className="lc-content">
                    <span className="lc-eye">Next Post</span>
                    <h3 className="lc-title">Coming Soon</h3>
                    <p className="lc-desc">Placeholder. Next drop loading.</p>
                    <div className="lc-meta">In the build</div>
                  </div>
                </span>
              )
            )}
          </div>

          <div className="board-cta">
            <a href="/culture" className="board-more">See all posts ↗</a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about">
        <div className="page">
          <div className="about-eye">What this is</div>
          <h2 className="about-line">
            Gear drops, crew runs, workouts, race days, coffee stops, and everything in between
          </h2>
          <p className="about-who">
            For the runner who lifts. The lifter who runs. And everyone figuring it out.
          </p>
        </div>
      </section>

      {/* FOLLOW US */}
      <section className="follow-us">
        <div className="page">
          <p className="follow-label">Follow us</p>
          <a
            href="https://instagram.com/suorsociety"
            className="follow-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://youtube.com/@suorsociety"
            className="follow-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="page foot-row">
          <span className="foot-wm">SUOR SOCIETY</span>
        </div>
      </footer>
    </>
  );
}
