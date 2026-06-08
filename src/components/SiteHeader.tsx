"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchSite, type SearchItem } from "@/lib/content";

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

function ResultRow({ r }: { r: SearchItem }) {
  return (
    <a className="search-result" href={r.href}>
      <span className="search-result-cat">{r.category}</span>
      <span className="search-result-title">{r.title}</span>
      {r.description && <span className="search-result-desc">{r.description}</span>}
    </a>
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
        <div className="search-dropdown" onMouseDown={(e) => e.preventDefault()}>
          {results.length === 0 ? (
            <div className="search-empty">
              No matches. Press enter to search everything.
            </div>
          ) : (
            <>
              {results.map((r, i) => (
                <ResultRow key={i} r={r} />
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

function MobileSearch({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => (q.trim() ? searchSite(q).slice(0, 8) : []), [q]);

  useEffect(() => {
    inputRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function goToResults() {
    const term = q.trim();
    if (!term) return;
    onClose();
    router.push(`/search?q=${encodeURIComponent(term)}`);
  }

  return (
    <div className="mobile-search">
      <form
        className="mobile-search-bar"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          goToResults();
        }}
      >
        <SearchIcon />
        <input
          ref={inputRef}
          className="mobile-search-input"
          type="search"
          value={q}
          placeholder="Search races, the guide, the board…"
          aria-label="Search the site"
          autoComplete="off"
          onChange={(e) => setQ(e.target.value)}
        />
        <button
          type="button"
          className="mobile-search-close"
          onClick={onClose}
          aria-label="Close search"
        >
          ✕
        </button>
      </form>

      <div className="mobile-search-results">
        {q.trim() === "" ? (
          <div className="search-empty">Search across races, the guide, and the board.</div>
        ) : results.length === 0 ? (
          <div className="search-empty">No matches. Try a race name, city, or distance.</div>
        ) : (
          <>
            {results.map((r, i) => (
              <ResultRow key={i} r={r} />
            ))}
            <button type="button" className="search-all" onClick={goToResults}>
              See all results →
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function SiteHeader({ variant = "light" }: { variant?: Variant }) {
  const [mobileOpen, setMobileOpen] = useState(false);

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
        <button
          type="button"
          className="nav-search-mobile-btn"
          onClick={() => setMobileOpen(true)}
          aria-label="Search the site"
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  );

  const overlay = mobileOpen ? (
    <MobileSearch onClose={() => setMobileOpen(false)} />
  ) : null;

  if (variant === "hero") {
    return (
      <>
        <nav className="nav">{inner}</nav>
        {overlay}
      </>
    );
  }
  return (
    <>
      <header className="site-nav">{inner}</header>
      {overlay}
    </>
  );
}
