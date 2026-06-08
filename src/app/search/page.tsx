"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import { searchSite } from "@/lib/content";

function ResultsArea() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");

  const term = q.trim();
  const results = term ? searchSite(q) : [];

  return (
    <>
      <form
        className="search-page-form"
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
        <input
          className="search-page-input"
          type="search"
          value={q}
          autoFocus
          placeholder="Search races, the guide, the board…"
          aria-label="Search the site"
          onChange={(e) => setQ(e.target.value)}
        />
      </form>

      <p className="search-page-count">
        {term
          ? `${results.length} result${results.length === 1 ? "" : "s"} for “${term}”`
          : "Type to search across races, the guide, and the board."}
      </p>

      {term && results.length === 0 && (
        <p className="search-page-empty">
          No matches. Try a race name, a city, or a distance like “half marathon”.
        </p>
      )}

      <div className="search-results-list">
        {results.map((r, i) => (
          <a key={i} className="search-result-row" href={r.href}>
            <span className="search-result-cat">{r.category}</span>
            <span className="search-result-main">
              <span className="search-result-title">{r.title}</span>
              {r.description && (
                <span className="search-result-desc">{r.description}</span>
              )}
            </span>
            <span className="search-result-arrow" aria-hidden="true">→</span>
          </a>
        ))}
      </div>
    </>
  );
}

function ResultsFallback() {
  return (
    <form className="search-page-form" role="search">
      <input
        className="search-page-input"
        type="search"
        placeholder="Search races, the guide, the board…"
        aria-label="Search the site"
        disabled
      />
    </form>
  );
}

export default function SearchPage() {
  return (
    <>
      <SiteHeader variant="light" />

      <main className="search-page">
        <div className="page">
          <div className="section-bar">
            <span className="section-bar-label">Search</span>
            <span className="section-bar-date">Everything on the site</span>
          </div>

          <Suspense fallback={<ResultsFallback />}>
            <ResultsArea />
          </Suspense>
        </div>
      </main>

      <footer className="footer">
        <div className="page foot-row">
          <span className="foot-wm">SUOR SOCIETY</span>
          <span className="foot-loc">San Diego</span>
        </div>
      </footer>
    </>
  );
}
