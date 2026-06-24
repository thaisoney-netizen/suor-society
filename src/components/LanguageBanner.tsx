"use client";

import { useEffect, useState } from "react";
import { dictionaries } from "@/i18n/dictionaries";

// Shown on the English home to visitors whose browser prefers Portuguese:
// a small dismissible toast offering the pt-BR version. Dismissal is remembered
// so it does not nag on return visits.
//
// Positioning is scroll-aware: the hero's headline/tagline/CTA are pinned to the
// bottom of the first screen, so at the top of the page the toast sits LOW (below
// the bottom CTA). Once scrolling starts the fixed scroll tracker (60px) rises
// from the bottom, so the toast lifts above it. The two states never overlap
// their neighbours because the tracker only appears after the same scroll
// threshold that lifts the toast.
const DISMISS_KEY = "ss-lang-suggest-dismissed";
// Matches the scroll tracker's own visibility threshold in ScrollTracker.tsx.
const LIFT_AT = 24;

export default function LanguageBanner() {
  const [show, setShow] = useState(false);
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY)) return;
    } catch {
      // localStorage can throw in private mode; just fall through and show it.
    }
    const langs = navigator.languages?.length
      ? navigator.languages
      : [navigator.language];
    const prefersPt = langs.some((l) => l?.toLowerCase().startsWith("pt"));
    if (prefersPt) setShow(true);
  }, []);

  // Lift above the scroll tracker once the page is scrolled, so the toast clears
  // the bottom-anchored hero CTA at the top of the page and the tracker below it.
  useEffect(() => {
    if (!show) return;
    const onScroll = () => {
      const y =
        window.scrollY ??
        window.pageYOffset ??
        document.documentElement.scrollTop ??
        0;
      setLifted(y > LIFT_AT);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [show]);

  function dismiss() {
    setShow(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
  }

  if (!show) return null;

  const t = dictionaries.pt.suggest;

  return (
    <div
      className={`lang-suggest${lifted ? " lang-suggest--lifted" : ""}`}
      role="dialog"
      aria-label={t.text}
    >
      <span className="lang-suggest-text">{t.text}</span>
      <a className="lang-suggest-cta" href="/pt-br">
        {t.cta} →
      </a>
      <button
        type="button"
        className="lang-suggest-x"
        aria-label={t.dismiss}
        onClick={dismiss}
      >
        ✕
      </button>
    </div>
  );
}
