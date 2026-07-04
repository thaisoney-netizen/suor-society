import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { dictionaries, localizeHref, type Lang } from "@/i18n/dictionaries";

// Author bio page, shared by the English and Portuguese routes.
export default function AuthorView({ lang }: { lang: Lang }) {
  const t = dictionaries[lang].author;
  return (
    <>
      <SiteNav lang={lang} />

      <main>
        {/* HERO */}
        <section className="about-pg-hero">
          <div className="page">
            <p className="about-pg-eye">{t.eyebrow}</p>
            <h1 className="about-pg-headline">{t.name}</h1>
            <p className="about-pg-deck">{t.role}</p>
          </div>
        </section>

        {/* PHOTO + BIO */}
        <section className="author-pg-body">
          <div className="page">
            <div className="author-pg-grid">
              <figure className="author-pg-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/founder-press.jpg" alt={t.photoAlt} />
              </figure>
              <div className="author-pg-bio">
                <p className="about-pg-label">{t.bioLabel}</p>
                {t.bio.map((p, i) => (
                  <p key={i} className="about-pg-p">{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ARTICLES */}
        <section className="author-pg-articles">
          <div className="page">
            <div className="faq-head">{t.articlesLabel}</div>
            {t.articles.map((a) => (
              <a key={a.href} className="author-pg-article" href={localizeHref(a.href, lang)}>
                <div className="archive-entry-meta">
                  <span>{a.tag}</span>
                  <span>{a.date}</span>
                </div>
                <h2 className="author-pg-article-title">{a.title}</h2>
              </a>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
