"use client";

import { useEffect, useRef, useState } from "react";
import {
  dictionaries,
  LOCALE_HREF,
  LOCALE_LABEL,
  LOCALES,
  localizeHref,
  type Lang,
} from "@/i18n/dictionaries";

// Race Picks links straight to the single guide while only one post exists
// per locale. When a second pick ships, switch this back to "/racepicks".
// The guide is a regional page (US races on /, Brazil races on /pt-br), not
// a translation, so its path differs per locale.
const RACE_PICKS_HREF: Record<Lang, string> = {
  en: "/culture/open-entry-races-2026",
  pt: "/culture/corridas-brasil-2026",
};

const navLinksFor = (lang: Lang) => [
  { href: RACE_PICKS_HREF[lang], label: "Race Picks" },
  { href: "/about", label: "The Culture" },
  { href: "/crew", label: "Crew" },
  { href: "/dispatch", label: "Dispatch" },
];

// variant "overlay" sits on top of the home hero (light text on footage);
// variant "light" is the static bar used on paper-background pages.
// Single horizontal wordmark; on dark backgrounds (overlay hero, mobile menu)
// the black artwork is flipped to white with a CSS filter.
const WORDMARK = "/logos/wordmark-horizontal.png";

export default function SiteNav({
  variant = "light",
  lang = "en",
}: {
  variant?: "overlay" | "light";
  lang?: Lang;
}) {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langWrapRef = useRef<HTMLDivElement>(null);
  const lockupClass = variant === "overlay" ? "wm-lockup wm-lockup--light" : "wm-lockup";

  const navCopy = dictionaries[lang].nav;
  const homeHref = LOCALE_HREF[lang];
  const navLinks = navLinksFor(lang);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close the language dropdown on outside click or Escape.
  useEffect(() => {
    if (!langOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!langWrapRef.current?.contains(e.target as Node)) setLangOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLangOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  return (
    <nav className={`nav nav--${variant}`}>
      <div className="page nav-row">
        <a href={homeHref} className="wm" aria-label="Suor Society, home">
          <img src={WORDMARK} alt="Suor Society" className={lockupClass} />
        </a>
        <div className="nav-links">
          {navLinks.map((link) => (
            <a key={link.label} href={localizeHref(link.href, lang)} className="nav-link">
              {link.label}
            </a>
          ))}
          <div className="nav-lang-wrap" ref={langWrapRef}>
            <button
              type="button"
              className="nav-link nav-lang"
              aria-label={navCopy.langLabel}
              aria-haspopup="true"
              aria-expanded={langOpen}
              onClick={() => setLangOpen((v) => !v)}
            >
              {LOCALE_LABEL[lang]}
              <span className="nav-lang-caret" aria-hidden="true">⌄</span>
            </button>
            {langOpen && (
              <div className="nav-lang-menu" role="menu">
                {LOCALES.map((l) => (
                  <a
                    key={l}
                    href={LOCALE_HREF[l]}
                    role="menuitem"
                    aria-current={l === lang ? "true" : undefined}
                    className={`nav-lang-opt${l === lang ? " is-current" : ""}`}
                  >
                    {LOCALE_LABEL[l]}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        <button
          type="button"
          className="nav-toggle"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen(true)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>
      </div>

      <div id="nav-menu" className={`nav-menu ${open ? "is-open" : ""}`}>
        <div className="page nav-row nav-menu-head">
          <a href={homeHref} className="wm" aria-label="Suor Society, home">
            <img src={WORDMARK} alt="Suor Society" className="wm-lockup wm-lockup--light" />
          </a>
          <button
            type="button"
            className="nav-close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
        <div className="page nav-menu-links">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={localizeHref(link.href, lang)}
              className="nav-menu-link"
              onClick={() => setOpen(false)}
            >
              <span className="nav-menu-num">{String(i + 1).padStart(2, "0")}</span>
              {link.label}
            </a>
          ))}
        </div>
        <div className="page nav-menu-foot">
          <a
            href="https://instagram.com/suorsociety"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-menu-ig"
          >
            Instagram ↗
          </a>
          <div className="nav-menu-langs" aria-label={navCopy.langLabel}>
            {LOCALES.map((l) => (
              <a
                key={l}
                href={LOCALE_HREF[l]}
                aria-current={l === lang ? "true" : undefined}
                className={`nav-menu-lang${l === lang ? " is-current" : ""}`}
                onClick={() => setOpen(false)}
              >
                {LOCALE_LABEL[l]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
