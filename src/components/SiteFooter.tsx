import { dictionaries, localizeHref, type Lang } from "@/i18n/dictionaries";

// Race Picks links straight to the single guide while only one post exists
// per locale. When a second pick ships, switch this back to "/racepicks".
// The guide is a regional page (US races on /, Brazil races on /pt-br), not
// a translation, so its path differs per locale.
const RACE_PICKS_HREF: Record<Lang, string> = {
  en: "/culture/open-entry-races-2026",
  pt: "/culture/corridas-brasil-2026",
};

const footLinksFor = (lang: Lang) => [
  { href: RACE_PICKS_HREF[lang], label: "Race Picks" },
  { href: "/crew", label: "Crew" },
  { href: "/dispatch", label: "Dispatch" },
  { href: "/about", label: "The Culture" },
];

export default function SiteFooter({ lang = "en" }: { lang?: Lang }) {
  const t = dictionaries[lang].footer;
  const footLinks = footLinksFor(lang);
  return (
    <footer className="footer">
      <div className="page">
        <div className="foot-grid">
          <div className="foot-brand">
            <img src="/logos/wordmark-horizontal.png" alt="Suor Society" className="foot-wm" />
            <p className="foot-desc">
              {t.desc}
            </p>
          </div>
          <div className="foot-col">
            <p className="foot-col-title">{t.exploreTitle}</p>
            {footLinks.map((link) => (
              <a key={link.label} href={localizeHref(link.href, lang)} className="foot-link">
                {link.label}
              </a>
            ))}
          </div>
          <div className="foot-col">
            <p className="foot-col-title">{t.connectTitle}</p>
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
          <span>{t.location}</span>
        </div>
      </div>
    </footer>
  );
}
