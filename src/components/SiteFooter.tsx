// Race Picks links straight to the single article while only one post exists.
// When a second pick ships, switch this back to "/racepicks".
const FOOT_LINKS = [
  { href: "/culture/open-entry-races-2026", label: "Race Picks" },
  { href: "/crew", label: "Crew" },
  { href: "/dispatch", label: "Dispatch" },
  { href: "/about", label: "The Culture" },
];

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="page">
        <div className="foot-grid">
          <div className="foot-brand">
            <img src="/logos/wordmark-horizontal.png" alt="Suor Society" className="foot-wm" />
            <p className="foot-desc">
              Hybrid running culture from San Diego. Races, gear, and the people who lift and run around a real life.
            </p>
          </div>
          <div className="foot-col">
            <p className="foot-col-title">Explore</p>
            {FOOT_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="foot-link">
                {link.label}
              </a>
            ))}
          </div>
          <div className="foot-col">
            <p className="foot-col-title">Connect</p>
            <a
              href="https://instagram.com/suorsociety"
              className="foot-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a href="mailto:hello@suorsociety.com" className="foot-link">
              hello@suorsociety.com
            </a>
          </div>
        </div>
        <div className="foot-legal">
          <span>© {new Date().getFullYear()} Suor Society</span>
          <span>San Diego, CA</span>
        </div>
      </div>
    </footer>
  );
}
