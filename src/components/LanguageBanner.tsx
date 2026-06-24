"use client";

import { useEffect, useState } from "react";
import { dictionaries } from "@/i18n/dictionaries";

// Shown on the English home to visitors whose browser prefers Portuguese:
// a small dismissible toast offering the pt-BR version. Sits above the fixed
// scroll tracker (60px) so the two never overlap. Dismissal is remembered so
// it does not nag on return visits.
const DISMISS_KEY = "ss-lang-suggest-dismissed";

export default function LanguageBanner() {
  const [show, setShow] = useState(false);

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
    <div className="lang-suggest" role="dialog" aria-label={t.text}>
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
