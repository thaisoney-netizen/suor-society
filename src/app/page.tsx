"use client";

import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";

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
        <SiteHeader variant="hero" />
        <video
          className="hero-video"
          src="/hero.mp4"
          poster="/hero.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-text">
          <p className="hero-tagline">The home of<br />hybrid running<br />athletes</p>
          <p className="hero-sub">a performance culture page</p>
        </div>
      </header>

      {/* SIGNUP */}
      <div id="signup" className="signup-section" style={{flexShrink: 0}}>
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

      {/* LINKS — the board, news-style index */}
      <section className="links">
        <div className="page">
          <div className="links-head">
            <div className="section-bar">
              <span className="section-bar-label">The Board</span>
              <span className="section-bar-date">Updated weekly · June 2026</span>
            </div>
            <h2 className="lh-title">Latest from the crew</h2>
          </div>

          <div className="link-grid">
            <a
              className="link-card"
              href="https://instagram.com/suorsociety"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="lc-top">
                <span className="lc-cat">Social</span>
                <span className="lc-top-r">
                  <span className="lc-date">Daily</span>
                  <span className="lc-arrow" aria-hidden="true">↗</span>
                </span>
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
                <span className="lc-cat">Events</span>
                <span className="lc-top-r">
                  <span className="lc-date">Soon</span>
                  <span className="lc-arrow" aria-hidden="true">·</span>
                </span>
              </div>
              <div className="lc-body">
                <span className="lc-eye">Next crew run</span>
                <h3 className="lc-title">Coming soon</h3>
                <p className="lc-desc">Details dropping. Stay close.</p>
              </div>
              <div className="lc-meta">Free · No drop</div>
            </span>

            <a className="link-card" href="#signup">
              <div className="lc-top">
                <span className="lc-cat">Dispatch</span>
                <span className="lc-top-r">
                  <span className="lc-date">Weekly</span>
                  <span className="lc-arrow" aria-hidden="true">→</span>
                </span>
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

            <a id="culture" className="link-card dark" href="/culture">
              <div className="lc-top">
                <span className="lc-cat">Guide</span>
                <span className="lc-top-r">
                  <span className="lc-date">June 2026</span>
                  <span className="lc-arrow" aria-hidden="true">↗</span>
                </span>
              </div>
              <div className="lc-body">
                <span className="lc-eye">The Culture Archive</span>
                <h3 className="lc-title">2026 Race Guide</h3>
                <p className="lc-desc">
                  Best open entry races in California and the US. All certified. No qualifier needed.
                </p>
              </div>
              <div className="lc-meta">New · June 2026</div>
            </a>
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
