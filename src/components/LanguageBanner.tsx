"use client";

import { useEffect, useState } from "react";
import { dictionaries, LOCALE_HREF } from "@/i18n/dictionaries";

// "Vindo do Brasil?" strip shown at the very top of English pages to visitors
// whose browser prefers Portuguese, offering the pt-BR version — same pattern
// as the HYROX Brazil site. Mounted once in the root layout; hides itself on
// /pt-br pages. The CTA deep-links to the pt-BR twin of the current page
// (the pt-br route tree mirrors the English one). Dismissal is remembered so
// it does not nag on return visits.
const DISMISS_KEY = "ss-lang-suggest-dismissed";

export default function LanguageBanner() {
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === LOCALE_HREF.pt || path.startsWith(`${LOCALE_HREF.pt}/`)) return;
    try {
      if (localStorage.getItem(DISMISS_KEY)) return;
    } catch {
      // localStorage can throw in private mode; just fall through and show it.
    }
    const langs = navigator.languages?.length
      ? navigator.languages
      : [navigator.language];
    const prefersPt = langs.some((l) => l?.toLowerCase().startsWith("pt"));
    if (prefersPt) setTarget(path === "/" ? LOCALE_HREF.pt : `${LOCALE_HREF.pt}${path}`);
  }, []);

  function dismiss() {
    setTarget(null);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
  }

  if (!target) return null;

  const t = dictionaries.pt.suggest;

  return (
    <div className="lang-strip" role="region" aria-label={t.text}>
      <span className="lang-strip-text">{t.text}</span>
      <a className="lang-strip-cta" href={target}>
        {t.cta} →
      </a>
      <button
        type="button"
        className="lang-strip-x"
        aria-label={t.dismiss}
        onClick={dismiss}
      >
        ✕
      </button>
    </div>
  );
}
