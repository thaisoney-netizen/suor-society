import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { dictionaries, type Lang } from "@/i18n/dictionaries";

// The Culture / About page, shared by the English and Portuguese routes.
export default function AboutView({ lang }: { lang: Lang }) {
  const t = dictionaries[lang].about;
  return (
    <>
      <SiteNav lang={lang} />

      <main>
        {/* HERO */}
        <section className="about-pg-hero">
          <div className="page">
            <p className="about-pg-eye">{t.eyebrow}</p>
            <h1 className="about-pg-headline">{t.headline}</h1>
          </div>
        </section>

        {/* FOUNDER MEDIA */}
        <section className="about-pg-media">
          <figure className="about-pg-shot">
            <img src="/founder-press.jpg" alt={t.mediaAlts.press} />
          </figure>
          <figure className="about-pg-shot">
            <img src="/founder-pull.jpg" alt={t.mediaAlts.pull} />
          </figure>
        </section>

        {/* BODY */}
        <section className="about-pg-body">
          <div className="page">
            <div className="about-pg-grid">
              <div className="about-pg-col">
                <p className="about-pg-label">{t.col1Label}</p>
                {t.col1.map((p, i) => (
                  <p key={i} className="about-pg-p">{p}</p>
                ))}
              </div>
              <div className="about-pg-col">
                <p className="about-pg-label">{t.col2Label}</p>
                {t.col2.map((p, i) => (
                  <p key={i} className="about-pg-p">{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
