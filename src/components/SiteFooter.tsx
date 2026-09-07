import { dictionaries, localizeHref, type Lang } from "@/i18n/dictionaries";

// EN Race Picks is the race finder. pt-BR still points at the Brazil guide
// because the pt-BR build is paused and there is no finder there yet; a
// half translated tool is worse than sending a reader to the guide.
const RACE_PICKS_HREF: Record<Lang, string> = {
  en: "/racepicks",
  pt: "/culture/corridas-brasil-2026",
};

const footLinksFor = (lang: Lang) => [
  { href: RACE_PICKS_HREF[lang], label: "Race Picks" },
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
            <img src="/logos/wordmark-horizontal.svg" alt="Suor Society" className="foot-wm" />
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
          <a href={localizeHref("/privacy", lang)} className="foot-legal-link">
            {t.privacy}
          </a>
          <span>{t.location}</span>
        </div>
      </div>
    </footer>
  );
}
