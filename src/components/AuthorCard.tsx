import Image from "next/image";
import { AUTHOR_PATH, dictionaries, localizeHref, type Lang } from "@/i18n/dictionaries";
import { photo, AVATAR_SIZES } from "@/lib/photos";

// Compact author box shown at the end of every post, linking to the bio page.
export default function AuthorCard({ lang = "en" }: { lang?: Lang }) {
  const t = dictionaries[lang].author;
  const href = localizeHref(AUTHOR_PATH, lang);
  return (
    <section className="author-card-section">
      <div className="page">
        <div className="author-card">
          <a className="author-card-photo" href={href}>
            <Image {...photo("/thais-oney.jpg")} alt={t.photoAlt} sizes={AVATAR_SIZES} />
          </a>
          <div className="author-card-body">
            <div className="author-card-label">{t.cardLabel}</div>
            <a className="author-card-name" href={href}>{t.name}</a>
            <p className="author-card-bio">{t.cardBlurb}</p>
            <a className="author-card-link" href={href}>{t.cardCta}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
