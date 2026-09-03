import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { dictionaries, localizeHref, type Lang } from "@/i18n/dictionaries";

// The Culture / About page, shared by the English and Portuguese routes.
export default function AboutView({ lang }: { lang: Lang }) {
  const t = dictionaries[lang].about;
  return (
    <>
      <SiteNav lang={lang} />

      <main>
        {/* HERO */}
        <section className="about-pg-hero about-hero">
          <div className="page">
            <p className="about-pg-eye">{t.eyebrow}</p>
            <div className="about-hero-row">
              <h1 className="about-pg-headline">{t.headline}</h1>
              <div className="about-hero-side">
                <p className="about-pg-deck">{t.deck}</p>
                <ul className="about-stamps">
                  {t.stamps.map((stamp) => (
                    <li key={stamp} className="about-stamp">{stamp}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* MEDIA — full-bleed two-up, Rio and San Diego */}
        <div className="about-pg-media">
          <figure className="about-pg-shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/founder-rio.webp" alt={t.mediaAlts.race} />
            <figcaption className="about-pg-cap">{t.mediaCaps.race}</figcaption>
          </figure>
          <figure className="about-pg-shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/crew-run.jpg" alt={t.mediaAlts.crew} />
            <figcaption className="about-pg-cap">{t.mediaCaps.crew}</figcaption>
          </figure>
        </div>

        {/* BODY — label rail beside a reading-width column */}
        <section className="about-pg-body">
          <div className="page about-pg-split">
            <p className="about-pg-label">{t.col2Label}</p>
            <div className="about-pg-col">
              {t.col2.map((p, i) => (
                <p key={i} className={i === 0 ? "about-pg-p about-pg-p--lead" : "about-pg-p"}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* INDEX — what the page covers */}
        <section className="about-index">
          <div className="page">
            <p className="about-pg-eye">{t.indexEye}</p>
            <ol className="about-index-list">
              {t.index.map((item, i) => (
                <li key={item.title} className="about-index-row">
                  <span className="about-index-num">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="about-index-title">{item.title}</h2>
                  <p className="about-index-desc">{item.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CLOSE — three ways into the rest of the site */}
        <section className="about-close">
          <div className="page">
            <p className="about-close-eye">{t.closeEye}</p>
            <h2 className="about-close-title">{t.closeTitle}</h2>
            <div className="about-close-grid">
              {t.closeCards.map((card, i) => (
                <a
                  key={card.href}
                  href={localizeHref(card.href, lang)}
                  className="about-close-card"
                >
                  <span className="about-close-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="about-close-card-title">{card.title}</h3>
                  <p className="about-close-desc">{card.desc}</p>
                  <span className="about-close-arrow" aria-hidden="true">→</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
