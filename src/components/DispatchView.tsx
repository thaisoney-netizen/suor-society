import Image from "next/image";
import SiteNav from "@/components/SiteNav";
import { photo, CARD_SIZES } from "@/lib/photos";
import SiteFooter from "@/components/SiteFooter";
import DispatchForm from "@/components/DispatchForm";
import { dictionaries, localizeHref, type Lang } from "@/i18n/dictionaries";

// Dispatch listing page, shared by the English and Portuguese routes.
//
// This is where the home board's "see all posts" link lands, so it has to hold
// every post, not just the newsletter ones. The second listing is derived from
// `home.boardPosts` (the canonical newest-first index) minus whatever is
// already in `dispatch.posts` above, so a post added to the board can never go
// missing here. Keep new Dispatch posts in `dispatch.posts` too, or they show
// up under the culture heading instead of the one above it.
export default function DispatchView({ lang }: { lang: Lang }) {
  const t = dictionaries[lang].dispatch;
  const dispatchHrefs = new Set(t.posts.map((post) => post.href));
  const archivePosts = dictionaries[lang].home.boardPosts.filter(
    (post) => !dispatchHrefs.has(post.href)
  );
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
                        <Image {...photo(post.img)} alt={post.title} sizes={CARD_SIZES} />
                      </div>
                      <div className="archive-entry-body">
                        <p className="archive-entry-desc">{post.desc}</p>
                        <span className="archive-entry-read">{t.readLabel}</span>
                      </div>
                    </a>
                  ))}
                </div>

                {/* THE REST OF THE BOARD — the posts the home grid cuts */}
                {archivePosts.length > 0 && (
                  <>
                    <div className="article-section-head">
                      <div className="article-section-label">{t.archiveLabel}</div>
                      <div className="article-section-sub">{t.archiveSub}</div>
                    </div>
                    <div className="archive-list dispatch-grid">
                      {archivePosts.map((post) => (
                        <a key={post.href} className="archive-entry" href={localizeHref(post.href, lang)}>
                          <div className="archive-entry-head">
                            <div className="archive-entry-meta">
                              <span>{post.eyebrow}</span>
                              {/* Board metas carry a trailing ↗ for the home card;
                                  here the "read" label already says it's a link. */}
                              <span>{post.meta.replace(/\s*↗\s*$/, "")}</span>
                            </div>
                            <h2 className="archive-entry-title">{post.title}</h2>
                          </div>
                          <div className="archive-entry-img">
                            <Image {...photo(post.img)} alt={post.title} sizes={CARD_SIZES} />
                          </div>
                          <div className="archive-entry-body">
                            <p className="archive-entry-desc">{post.desc}</p>
                            <span className="archive-entry-read">{t.readLabel}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </>
                )}
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
