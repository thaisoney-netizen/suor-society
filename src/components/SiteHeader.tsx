"use client";

type Variant = "hero" | "light";

function SearchField({ variant }: { variant: Variant }) {
  return (
    <form
      className={`nav-search nav-search--${variant}`}
      role="search"
      onSubmit={(e) => e.preventDefault()}
    >
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
      <input
        className="nav-search-input"
        type="search"
        name="q"
        placeholder="Search"
        aria-label="Search the site"
      />
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
      <SearchField variant={variant} />
    </div>
  );

  if (variant === "hero") {
    return <nav className="nav">{inner}</nav>;
  }
  return <header className="site-nav">{inner}</header>;
}
