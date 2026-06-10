"use client";

import { useState } from "react";

// ── BOARD POSTS ──
// To publish a new post: add an object to this array. Up to 3 renders as a 3-column grid.
type BoardPost = {
  href: string;
  img: string;
  eyebrow: string;
  title: string;
  desc: string;
  meta: string;
};
const BOARD_POSTS: BoardPost[] = [
  {
    href: "/culture",
    img: "/race-hero.jpg",
    eyebrow: "The Culture Archive",
    title: "2026 Race Guide",
    desc: "Best open entry races in California and the US. All certified. No qualifier needed.",
    meta: "New · June 2026 ↗",
  },
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

  const cols = Math.min(BOARD_POSTS.length, 3);
  const gridStyle: React.CSSProperties = {
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    ...(cols === 1 && { maxWidth: "440px" }),
  };

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
              <a href="#about" className="nav-link">About</a>
              <a href="#culture" className="nav-link">The Culture</a>
            </div>
          </div>
        </nav>
        <video className="hero-video" src="/hero.mp4" autoPlay muted loop playsInline />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-text">
          <p className="hero-tagline">Run.<br />Lift.<br />Sweat.</p>
          <p className="hero-sub">a hybrid running culture page</p>
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

          <div className="link-grid" style={gridStyle}>
            {BOARD_POSTS.map((post, i) => (
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
            ))}
          </div>

          <div className="board-cta">
            <a href="/culture" className="board-more">See all posts ↗</a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="page">
          <p className="about-eye">About</p>
          <div className="about-narrative">
            <p className="about-pg-p">
              <strong>SUOR SOCIETY</strong> is a hybrid running culture page for people who run and lift around a real life.
            </p>
            <p className="about-pg-p">
              It started because I went looking for running and hybrid accounts to follow and everything felt built for people who train full time. The 1:10 half. Two sessions a day. I loved the content and still felt left out by it.
            </p>
            <p className="about-pg-p">
              So this is the page I wanted and couldn&rsquo;t find. We keep the greats in the feed. We just add the part that usually goes missing: that fast half took years, and the person ran it full time. Their normal isn&rsquo;t your normal, and it doesn&rsquo;t have to be for your Tuesday to count.
            </p>
            <p className="about-pg-p">
              I&rsquo;m Thais. Marketer by day, hybrid athlete the rest of the time. I lift at Performance 360, I&rsquo;m training for my first half, and I run Mission Bay, North Park, and PB around a full-time job like everyone else here.
            </p>
            <p className="about-pg-p about-closing">
              Two sports that complete each other, not compete. Consistency over perfection. The sweat, and the coffee after.
            </p>
          </div>
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
