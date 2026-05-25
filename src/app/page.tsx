"use client";

import { useState } from "react";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setSubmitted(true);
  }

  return (
    <>
      {/* ABOVE FOLD — hero + signup as one unit */}
      <div className="above-fold">
      {/* HERO — full viewport with nav overlay */}
      <header className="hero">
        <nav className="nav">
          <div className="page nav-row">
            <a href="#" className="wm" aria-label="Suor Society — home">
              <span className="wm-suor">SUOR</span>
              <span className="wm-society">SOCIETY</span>
            </a>
            <div className="nav-links">
              <a href="/merch" className="nav-link">Shop</a>
              <a href="/culture" className="nav-link">The Culture</a>
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
          </form>
        </div>
      </div>
      </div>{/* /above-fold */}

      {/* ABOUT */}
      <section className="about">
        <div className="page">
          <div className="about-eye">What this is</div>
          <h2 className="about-line">
            Gear drops, crew runs, workouts, race days, coffee stops, and everything in between.
          </h2>
          <p className="about-who">
            For the runner who lifts. The lifter who runs. And everyone figuring it out.
          </p>
        </div>
      </section>

      {/* LINKS */}
      <section className="links">
        <div className="page">
          <div className="links-head">
            <span className="lh-num">04 / Links</span>
            <h2 className="lh-title">The board.</h2>
            <span className="lh-meta">04 entries · updated weekly</span>
          </div>

          <div className="link-grid">
            <a
              className="link-card"
              href="https://instagram.com/suorsociety"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="lc-top">
                <span className="lc-num">01</span>
                <span className="lc-arrow" aria-hidden="true">↗</span>
              </div>
              <div className="lc-body">
                <span className="lc-eye">Follow</span>
                <h3 className="lc-title">Instagram</h3>
                <p className="lc-desc">
                  The daily feed. Crew shots, hot takes, shoe drops, half marathon build.
                </p>
              </div>
              <div className="lc-meta">@suorsociety</div>
            </a>

            <span className="link-card coming" aria-disabled="true">
              <div className="lc-top">
                <span className="lc-num">02</span>
                <span className="lc-arrow" aria-hidden="true">·</span>
              </div>
              <div className="lc-body">
                <span className="lc-eye">Next crew run</span>
                <h3 className="lc-title">Coming soon.</h3>
                <p className="lc-desc">Details dropping. Stay close.</p>
              </div>
              <div className="lc-meta">Free · No drop</div>
            </span>

            <a className="link-card" href="#signup">
              <div className="lc-top">
                <span className="lc-num">03</span>
                <span className="lc-arrow" aria-hidden="true">→</span>
              </div>
              <div className="lc-body">
                <span className="lc-eye">The dispatch</span>
                <h3 className="lc-title">Email signup</h3>
                <p className="lc-desc">
                  One note a week. Crew recap, one thing worth reading, one thing worth running to.
                </p>
              </div>
              <div className="lc-meta">Weekly · Sundays · Inbox-only</div>
            </a>

            <span className="link-card coming" aria-disabled="true">
              <div className="lc-top">
                <span className="lc-num">04</span>
                <span className="lc-arrow" aria-hidden="true">·</span>
              </div>
              <div className="lc-body">
                <span className="lc-eye">Coming soon</span>
                <h3 className="lc-title">The culture archive.</h3>
                <p className="lc-desc">
                  Editorial spotlights, shoe drops, crew interviews. Building it now.
                </p>
              </div>
              <div className="lc-meta">In the build · Summer 2026</div>
            </span>
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
          <span className="foot-wm">SUOR SOCIETY.</span>
        </div>
      </footer>
    </>
  );
}
