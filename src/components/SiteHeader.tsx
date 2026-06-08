"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchSite } from "@/lib/content";

type Variant = "hero" | "light";

function SearchIcon() {
  return (
    <svg
      className="nav-search-icon"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="20" y1="20" x2="16.5" y2="16.5" />
    </svg>
  );
}

function NavSearch({ variant }: { variant: Variant }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const results = useMemo(() => (q.trim() ? searchSite(q).slice(0, 6) : []), [q]);
  const open = focused && q.trim().length > 0;

  function goToResults() {
    const term = q.trim();
    if (!term) return;
    setFocused(false);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  }

  return (
    <form
      className={`nav-search nav-search--${variant}`}
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        goToResults();
      }}
    >
      <SearchIcon />
      <input
        className="nav-search-input"
        type="search"
        name="q"
        value={q}
        placeholder="Search"
        aria-label="Search the site"
        autoComplete="off"
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => {
          if (blurTimer.current) clearTimeout(blurTimer.current);
          setFocused(true);
        }}
        onBlur={() => {
          blurTimer.current = setTimeout(() => setFocused(false), 150);
        }}
      />
      {open && (
        // keep focus on the input when interacting with the panel
        <div className="search-dropdown" onMouseDown={(e) => e.preventDefault()}>
          {results.length === 0 ? (
            <div className="search-empty">
              No matches. Press enter to search everything.
            </div>
          ) : (
            <>
              {results.map((r, i) => (
                <a key={i} className="search-result" href={r.href}>
                  <span className="search-result-cat">{r.category}</span>
                  <span className="search-result-title">{r.title}</span>
                  {r.description && (
                    <span className="search-result-desc">{r.description}</span>
                  )}
                </a>
              ))}
              <button type="button" className="search-all" onClick={goToResults}>
                See all results →
              </button>
            </>
          )}
        </div>
      )}
    </form>
  );
}

export default function SiteHeader({ variant = "light" }: { variant?: Variant }) {
  const dark = variant === "light";
  const wmSuor = dark ? "wm-suor wm-suor--dark" : "wm-suor";
  const wmSociety = dark ? "wm-society wm-society--dark" : "wm-society";
  const navLink = dark ? "nav-link nav-link--dark" : "nav-link";

  const inner = (
    <div className="page nav-row">
      <a href="/" className="wm" aria-label="Suor Society, home">
        <span className={wmSuor}>SUOR</span>
        <span className={wmSociety}>SOCIETY</span>
      </a>
      <nav className="nav-links" aria-label="Primary">
        <a href="/merch" className={navLink}>Shop</a>
        <a href="/culture" className={navLink}>The Culture</a>
      </nav>
      <div className="nav-search-slot">
        <NavSearch variant={variant} />
        <a className="nav-search-mobile-btn" href="/search" aria-label="Search the site">
          <SearchIcon />
        </a>
      </div>
    </div>
  );

  if (variant === "hero") {
    return <nav className="nav">{inner}</nav>;
  }
  return <header className="site-nav">{inner}</header>;
}
