import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import DispatchForm from "@/components/DispatchForm";
import { dictionaries, localizeHref, type Lang } from "@/i18n/dictionaries";

// Dispatch listing page, shared by the English and Portuguese routes.
export default function DispatchView({ lang }: { lang: Lang }) {
  const t = dictionaries[lang].dispatch;
  return (
    <>
      <SiteNav lang={lang} />

      <main>
        {/* HERO */}
        <section className="about-pg-hero dispatch-hero">
          <div className="page">
            <p className="about-pg-eye">{t.eyebrow}</p>
            <h1 className="about-pg-headline">{t.headline}</h1>
            <p className="about-pg-deck">
              {t.deck1}<br />
              {t.deck2}
            </p>
          </div>
        </section>

        {/* POSTS (left) + SLIM SIGNUP (right) — both above the fold */}
        <section className="dispatch-main">
          <div className="page">
            <div className="dispatch-layout">
              {/* LEFT — latest posts */}
              <div className="dispatch-posts">
                <div className="article-section-head">
                  <div className="article-section-label">{t.sectionLabel}</div>
                  <div className="article-section-sub">{t.sectionSub}</div>
                </div>
                <div className="archive-list dispatch-grid">
                  {t.posts.map((post) => (
                    <a key={post.href} className="archive-entry" href={localizeHref(post.href, lang)}>
                      <div className="archive-entry-head">
                        <div className="archive-entry-meta">
                          <span>{post.tag}</span>
                          <span>{post.date}</span>
                        </div>
                        <h2 className="archive-entry-title">{post.title}</h2>
                      </div>
                      <div className="archive-entry-img">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={post.img} alt={post.title} />
                      </div>
                      <div className="archive-entry-body">
                        <p className="archive-entry-desc">{post.desc}</p>
                        <span className="archive-entry-read">{t.readLabel}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* RIGHT — slim email signup, sticky */}
              <aside className="dispatch-aside">
                <div className="dispatch-aside-card">
                  <div className="gate-label">{t.asideLabel}</div>
                  <div className="gate-title">
                    {t.asideTitleLines.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < t.asideTitleLines.length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                  <p className="gate-desc">{t.asideDesc}</p>
                  <DispatchForm lang={lang} />
                  <ul className="gate-what">
                    {t.asideWhat.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
