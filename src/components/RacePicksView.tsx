import Image from "next/image";
import SiteNav from "@/components/SiteNav";
import { photo, COVER_SIZES } from "@/lib/photos";
import SiteFooter from "@/components/SiteFooter";
import { dictionaries, localizeHref, type Lang } from "@/i18n/dictionaries";

// Race Picks listing page, shared by the English and Portuguese routes.
// One post lives here for now, so it presents as a single feature.
export default function RacePicksView({ lang }: { lang: Lang }) {
  const t = dictionaries[lang].racepicks;
  return (
    <>
      <SiteNav lang={lang} />

      <main>
        {/* HERO */}
        <section className="about-pg-hero">
          <div className="page">
            <p className="about-pg-eye">{t.eyebrow}</p>
            <h1 className="about-pg-headline">{t.headline}</h1>
            <p className="about-pg-deck">
              {t.deck1}<br />
              {t.deck2}
            </p>
          </div>
        </section>

        {/* SINGLE FEATURE */}
        <section className="rp-feature-section">
          <div className="page">
            <a className="rp-feature" href={localizeHref(t.featureHref, lang)}>
              <div className="rp-feature-media">
                <Image {...photo(t.featureImg)} alt={t.featureTitle} sizes={COVER_SIZES} priority />
              </div>
              <div className="rp-feature-body">
                <div className="archive-entry-meta">
                  <span>{t.featureTag}</span>
                  <span>{t.featureDate}</span>
                </div>
                <h2 className="rp-feature-title">{t.featureTitle}</h2>
                <p className="rp-feature-desc">{t.featureDesc}</p>
                <span className="archive-entry-read">{t.readLabel}</span>
              </div>
            </a>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
