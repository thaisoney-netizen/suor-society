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

        {/* MEDIA */}
        <div className="about-pg-media">
          <figure className="about-pg-shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/founder-rio.webp" alt={t.mediaAlts.race} />
          </figure>
        </div>

        {/* BODY */}
        <section className="about-pg-body">
          <div className="page">
            <div className="about-pg-col">
              <p className="about-pg-label">{t.col2Label}</p>
              {t.col2.map((p, i) => (
                <p key={i} className="about-pg-p">{p}</p>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
