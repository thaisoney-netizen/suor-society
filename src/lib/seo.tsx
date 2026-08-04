import type { Metadata } from "next";
import { AUTHOR_PATH, LOCALE_TAG, type Lang } from "@/i18n/dictionaries";

// Single source of truth for SEO plumbing. Every page builds its metadata
// through pageMeta() and drops the matching JSON-LD component into its JSX —
// canonical URLs, hreflang pairs, Open Graph and structured data then stay
// consistent site-wide without per-page corrections.

// Apex, no www. Vercel serves the apex with a 200 and 307s www -> apex, so a
// www canonical would point every page at a URL that redirects away (Google
// files those under "Page with redirect" and drops them from the index).
// This constant feeds canonicals, OG urls, hreflang, JSON-LD, sitemap and
// robots, so it must match the host that actually answers 200.
export const SITE_URL = "https://suorsociety.com";
export const SITE_NAME = "Suor Society";

const PT_PREFIX = "/pt-br";

// Given a page's own full path, the same page's path in the other locale
// (true translations share the slug; only the /pt-br prefix differs).
function counterpartPath(path: string): string {
  if (path === PT_PREFIX || path.startsWith(`${PT_PREFIX}/`)) {
    const stripped = path.slice(PT_PREFIX.length);
    return stripped === "" ? "/" : stripped;
  }
  return path === "/" ? PT_PREFIX : `${PT_PREFIX}${path}`;
}

function langOfPath(path: string): Lang {
  return path === PT_PREFIX || path.startsWith(`${PT_PREFIX}/`) ? "pt" : "en";
}

export type PageMetaOptions = {
  /** The page's own full path, prefix included: "/crew", "/pt-br/crew", "/pt-br". */
  path: string;
  title: string;
  description: string;
  /** Hero image for link previews (path under /public). Falls back to the site OG image. */
  image?: string;
  /**
   * true when the other locale has a real translation at the same slug —
   * adds the en / pt-BR hreflang pair. Leave false for regional pages
   * (US vs Brazil content) and posts that exist in one language only.
   */
  paired?: boolean;
  /**
   * Explicit counterpart path when the translation lives at a different slug
   * (not just the /pt-br prefix). Set alongside `paired` for true translations
   * whose EN and pt-BR slugs differ, so hreflang points at the real page.
   */
  counterpart?: string;
  ogType?: "website" | "article";
};

export function pageMeta({
  path,
  title,
  description,
  image,
  paired = false,
  counterpart,
  ogType = "article",
}: PageMetaOptions): Metadata {
  const lang = langOfPath(path);
  const other = counterpart ?? counterpartPath(path);
  const en = lang === "en" ? path : other;
  const pt = lang === "pt" ? path : other;
  return {
    title,
    description,
    alternates: {
      canonical: path,
      ...(paired && { languages: { en, "pt-BR": pt } }),
    },
    openGraph: {
      type: ogType,
      siteName: SITE_NAME,
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      title,
      description,
      locale: lang === "pt" ? "pt_BR" : "en_US",
      ...(image && { images: [{ url: image }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [image] }),
    },
  };
}

// ---------------------------------------------------------------------------
// JSON-LD structured data. Render these inside the page JSX (anywhere in the
// tree). Article on every post, FAQ on posts with an FAQ section, Person on
// the author bio pages.
// ---------------------------------------------------------------------------

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Escape < to keep any user-visible copy from closing the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

const ORG = {
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logos/wordmark-horizontal.png`,
};

function personFor(lang: Lang) {
  return {
    "@type": "Person",
    name: "Thais Oney",
    url: `${SITE_URL}${lang === "pt" ? PT_PREFIX : ""}${AUTHOR_PATH}`,
    jobTitle: lang === "pt" ? "Fundadora e editora" : "Founder & Editor",
  };
}

export function ArticleJsonLd({
  path,
  title,
  description,
  image,
  datePublished,
  dateModified,
}: {
  path: string;
  title: string;
  description: string;
  /** Hero image path under /public. */
  image: string;
  /** ISO date, e.g. "2026-07-06". */
  datePublished: string;
  dateModified?: string;
}) {
  const lang = langOfPath(path);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        // Meta titles carry the ", Suor Society" suffix; the headline shouldn't.
        headline: title.replace(/, Suor Society$/, ""),
        description,
        image: `${SITE_URL}${image}`,
        datePublished,
        dateModified: dateModified ?? datePublished,
        inLanguage: LOCALE_TAG[lang],
        mainEntityOfPage: `${SITE_URL}${path}`,
        author: personFor(lang),
        publisher: ORG,
      }}
    />
  );
}

// Takes a page's FAQ array as-is. String answers are used directly; JSX
// answers need a `plain` text twin for the structured data (entries with
// neither are skipped).
export function FaqJsonLd({
  faqs,
}: {
  faqs: { q: string; a: React.ReactNode; plain?: string }[];
}) {
  const entries = faqs
    .map(({ q, a, plain }) => ({ q, text: typeof a === "string" ? a : plain }))
    .filter((e): e is { q: string; text: string } => Boolean(e.text));
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: entries.map(({ q, text }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text },
        })),
      }}
    />
  );
}

// HowTo for step-by-step sections (e.g. a sample training week). Steps are
// numbered in document order; pass a plain-text `text` for each so the answer
// is usable even where the visible copy carries links or markup.
export function HowToJsonLd({
  name,
  description,
  steps,
  image,
  path,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  /** Optional hero image path under /public. */
  image?: string;
  path: string;
}) {
  const lang = langOfPath(path);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "HowTo",
        name,
        description,
        inLanguage: LOCALE_TAG[lang],
        ...(image && { image: `${SITE_URL}${image}` }),
        step: steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.text,
        })),
      }}
    />
  );
}

export function PersonJsonLd({ lang, description }: { lang: Lang; description: string }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        ...personFor(lang),
        description,
        image: `${SITE_URL}/thais-oney.jpg`,
        worksFor: ORG,
        sameAs: ["https://instagram.com/suorsociety"],
      }}
    />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        publisher: ORG,
      }}
    />
  );
}
