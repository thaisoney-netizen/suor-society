"use client";

import { useEffect, useRef, useState } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

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
    href: "/culture/open-entry-races-2026",
    img: "/race-hero.jpg",
    eyebrow: "The Culture Archive",
    title: "2026 Race Guide",
    desc: "Best open entry races in California and the US. All certified. No qualifier needed.",
    meta: "New · June 2026 ↗",
  },
  {
    href: "/dispatch/hyrox-fall-2026-schedule",
    img: "/crew-suor.jpg",
    eyebrow: "The Dispatch",
    title: "HYROX Fall 2026 Schedule",
    desc: "10 races, four new cities, and Anaheim returns Dec 4 to 6. The full North America calendar.",
    meta: "HYROX · June 2026 ↗",
  },
  {
    href: "/dispatch/june-2026-shoe-drops",
    img: "/shoe-drops.jpeg",
    eyebrow: "The Dispatch",
    title: "June Shoe Drops",
    desc: "The Endorphin Elite 3, a plateless Puma at $150, and why plateless super trainers are the trend.",
    meta: "Gear · June 2026 ↗",
  },
  {
    href: "/dispatch/cape-town-marathon-major",
    img: "/city-run.webp",
    eyebrow: "The Dispatch",
    title: "Cape Town Joins the Majors",
    desc: "Africa's first Abbott World Marathon Major joins the series May 23, 2027. What it changes for the star chase.",
    meta: "Races · June 2026 ↗",
  },
];

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [signupError, setSignupError] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  // iOS blocks autoplay in Low Power Mode and leaves the poster frozen with a
  // play button. Retry play() on mount and on any tap until playback starts.
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    video.muted = true;
    const tryPlay = () => {
      video.play().catch(() => {});
    };
    const stopRetrying = () => {
      window.removeEventListener("touchend", tryPlay);
      window.removeEventListener("click", tryPlay);
    };
    video.addEventListener("playing", stopRetrying, { once: true });
    window.addEventListener("touchend", tryPlay, { passive: true });
    window.addEventListener("click", tryPlay);
    tryPlay();
    return () => {
      stopRetrying();
      video.removeEventListener("playing", stopRetrying);
    };
  }, []);

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

  const count = BOARD_POSTS.length;
  const cols = count === 4 ? 2 : Math.min(count, 3);
  // Set columns via a CSS var so the mobile media query in globals.css can still
  // override it to a single column (an inline grid-template-columns would not).
  const gridStyle = {
    "--cols": cols,
    ...(count === 1 && { maxWidth: "440px" }),
  } as React.CSSProperties;

  return (
    <>
      {/* HERO — full viewport, one message: headline + one CTA */}
      <header className="hero">
        <SiteNav variant="overlay" />
        <video
          ref={heroVideoRef}
          className="hero-video"
          src="/hero.mp4"
          poster="/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-text">
          <div className="page">
            <h1 className="hero-headline">
              For runners, for lifters, for hybrids, for the sweat
            </h1>
            <p className="hero-tag">
              Race picks, gear, and culture for people who lift and run.
            </p>
            <a href="/culture/open-entry-races-2026" className="hero-cta">See Races Left in 2026</a>
          </div>
        </div>
      </header>

      {/* LINKS */}
      <section className="links" id="culture">
        <div className="page">
          <div className="links-head">
            <h2 className="lh-title">The board</h2>
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
            <a href="/racepicks" className="board-more">See all posts ↗</a>
          </div>
        </div>
      </section>

      {/* DISPATCH SIGNUP */}
      <section className="signup-section" id="dispatch">
        <div className="page">
          <form className="signup" onSubmit={handleSignup}>
            <p className="signup-eye">The Dispatch</p>
            <label className="signup-label" htmlFor="email-hero">
              Get the weekly dispatch
            </label>
            <p className="signup-note">
              One email a week. Races worth entering, gear worth knowing, no noise.
            </p>
            <div className="signup-row">
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
            </div>
            {signupError && (
              <p className="signup-error">
                Something went wrong. Email us at hello@suorsociety.com and we&rsquo;ll add you directly.
              </p>
            )}
          </form>
        </div>
      </section>


      {/* FOOTER */}
      <SiteFooter />
    </>
  );
}
