"use client";

import { useEffect, useRef, useState } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import LanguageBanner from "@/components/LanguageBanner";
import { dictionaries, localizeHref, type Lang } from "@/i18n/dictionaries";
import { track } from "@/lib/analytics";

// The home page, shared by the English route (/) and the Portuguese route
// (/pt-br) so the layout never drifts between locales. All copy comes from the
// dictionary; the brand headline is intentionally English on every locale.
export default function HomeView({ lang }: { lang: Lang }) {
  const t = dictionaries[lang].home;
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
        body: JSON.stringify({ email, source: "home" }),
      });
      if (!res.ok) throw new Error("server");
      track("sign_up", { method: "newsletter", source: "home", lang });
      setSubmitted(true);
    } catch {
      setSignupError(true);
    }
  }

  const count = t.boardPosts.length;
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
        <SiteNav variant="overlay" lang={lang} />
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
            {/* Brand headline stays in English on every locale; the tagline
                and CTA are localized (the CTA points at each locale's own
                regional race guide). */}
            <h1 className="hero-headline">
              For runners<br />for lifters<br />for hybrids<br />for the sweat
            </h1>
            <p className="hero-tag">
              {t.heroTag}
            </p>
            <a href={localizeHref(t.heroCtaHref, lang)} className="hero-cta">{t.heroCta}</a>
          </div>
        </div>
      </header>

      {/* LINKS */}
      <section className="links" id="culture">
        <div className="page">
          <div className="links-head">
            <h2 className="lh-title">{t.boardTitle}</h2>
          </div>

          <div className="link-grid" style={gridStyle}>
            {t.boardPosts.map((post, i) => (
              <a key={i} className="link-card" href={localizeHref(post.href, lang)}>
                <div className="lc-head">
                  <span className="lc-eye">{post.eyebrow}</span>
                  <h3 className="lc-title">{post.title}</h3>
                </div>
                <div className="lc-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.img}
                    alt={post.title}
                    style={post.imgPos ? { objectPosition: post.imgPos } : undefined}
                  />
                </div>
                <div className="lc-content">
                  <p className="lc-desc">{post.desc}</p>
                  <div className="lc-meta">{post.meta}</div>
                </div>
              </a>
            ))}
          </div>

          <div className="board-cta">
            <a href={localizeHref("/dispatch", lang)} className="board-more">{t.boardMore}</a>
          </div>
        </div>
      </section>

      {/* DISPATCH SIGNUP */}
      <section className="signup-section" id="dispatch">
        <div className="page">
          <form className="signup" onSubmit={handleSignup}>
            <p className="signup-eye">{t.signupEye}</p>
            <label className="signup-label" htmlFor="email-hero">
              {t.signupLabel}
            </label>
            <p className="signup-note">
              {t.signupNote}
            </p>
            <div className="signup-row">
              <input
                id="email-hero"
                className="signup-input"
                type="email"
                name="email"
                placeholder={t.signupPlaceholder}
                required
                autoComplete="email"
              />
              <button type="submit" className="signup-btn">
                {submitted ? t.signupBtnDone : t.signupBtn}
              </button>
            </div>
            {signupError && (
              <p className="signup-error">
                {t.signupError}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <SiteFooter lang={lang} />

      {/* Suggest pt-BR to Portuguese-speaking visitors (English home only). */}
      {lang === "en" && <LanguageBanner />}
    </>
  );
}
