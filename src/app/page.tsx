"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="page nav-row">
          <a href="#" className="wm" aria-label="Suor Society — home">
            <span className="wm-suor">SUOR</span>
            <span className="wm-society">SOCIETY</span>
          </a>
          <a
            href="https://instagram.com/suorsociety"
            className="ig"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Instagram</span>
            <span className="arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="page">
          <div className="hero-strip">
            <span className="lt">Issue 001 / San Diego / 2026</span>
            <span className="rule" aria-hidden="true"></span>
            <span className="rt">A performance culture page</span>
          </div>

          <div className="hero-img-wrap">
            <Image
              className="hero-img"
              src="/hero.webp"
              alt="Urban runner in motion"
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center 40%" }}
            />
            <p className="hero-img-tagline">
              Run.<br />Lift.<br />Sweat.
            </p>
          </div>

          <form className="signup" onSubmit={handleSignup}>
            <label className="signup-label" htmlFor="email-hero">
              Get the dispatch
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
              {submitted ? "ON THE LIST." : (
                <>Join the list <span className="arrow" aria-hidden="true">→</span></>
              )}
            </button>
          </form>
        </div>
      </header>

      {/* ABOUT */}
      <section className="about">
        <div className="page">
          <div className="about-eye">What this is</div>
          <h2 className="about-line">
            Gear drops, crew runs, race days, coffee stops, and everything in between.
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
              <div className="lc-meta">San Diego · Free · No drop</div>
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

      {/* FOOTER */}
      <footer className="footer">
        <div className="page foot-row">
          <span className="foot-wm">SUOR SOCIETY.</span>
          <span className="foot-loc">San Diego</span>
        </div>
      </footer>
    </>
  );
}
