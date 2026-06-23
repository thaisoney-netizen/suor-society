"use client";

import { useEffect, useState } from "react";
import { dictionaries, LOCALE_HREF, type Lang } from "@/i18n/dictionaries";

// Race Picks links straight to the single article while only one post exists.
// When a second pick ships, switch this back to "/racepicks".
const NAV_LINKS = [
  { href: "/culture/open-entry-races-2026", label: "Race Picks" },
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
  const lockupClass = variant === "overlay" ? "wm-lockup wm-lockup--light" : "wm-lockup";

  // Manual language switch: link to the other locale's home.
  const otherLang: Lang = lang === "en" ? "pt" : "en";
  const switchHref = LOCALE_HREF[otherLang];
  const switchCopy = dictionaries[lang].nav;
  const homeHref = LOCALE_HREF[lang];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav className={`nav nav--${variant}`}>
      <div className="page nav-row">
        <a href={homeHref} className="wm" aria-label="Suor Society, home">
          <img src={WORDMARK} alt="Suor Society" className={lockupClass} />
        </a>
        <div className="nav-links">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <a
            href={switchHref}
            className="nav-link nav-lang"
            aria-label={switchCopy.switchAria}
          >
            {switchCopy.switchLabel}
          </a>
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
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
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
          <a
            href={switchHref}
            className="nav-menu-ig nav-menu-lang"
            aria-label={switchCopy.switchAria}
            onClick={() => setOpen(false)}
          >
            {switchCopy.switchAria} ↗
          </a>
        </div>
      </div>
    </nav>
  );
}
