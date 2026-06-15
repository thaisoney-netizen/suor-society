"use client";

import { useEffect, useState } from "react";

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
export default function SiteNav({ variant = "light" }: { variant?: "overlay" | "light" }) {
  const [open, setOpen] = useState(false);
  const lockup = variant === "overlay" ? "/logos/horizontal-stamp-light.svg" : "/logos/horizontal-stamp-dark.svg";

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
        <a href="/" className="wm" aria-label="Suor Society, home">
          <img src={lockup} alt="Suor Society" className="wm-lockup" />
        </a>
        <div className="nav-links">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
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
          <a href="/" className="wm" aria-label="Suor Society, home">
            <img src="/logos/horizontal-stamp-light.svg" alt="Suor Society" className="wm-lockup" />
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
        </div>
      </div>
    </nav>
  );
}
