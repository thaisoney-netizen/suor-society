"use client";

import { useEffect, useState } from "react";
import DispatchForm from "@/components/DispatchForm";
import { dictionaries, type Lang } from "@/i18n/dictionaries";

type TocItem = { id: string; label: string };

/**
 * Sticky table of contents for long reads.
 * Highlights the section currently in view via IntersectionObserver.
 */
export function PostToc({
  items,
  title = "On this page",
}: {
  items: TocItem[];
  title?: string;
}) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [items]);

  return (
    <nav className="post-toc" aria-label="Table of contents">
      <div className="post-toc-label">{title}</div>
      <ul className="post-toc-list">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className={`post-toc-link ${active === i.id ? "is-active" : ""}`}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Sticky email subscribe card for short posts that don't warrant a ToC.
 * Reuses the dispatch sidebar styling so it matches /dispatch.
 */
export function PostSubscribe({ lang = "en" }: { lang?: Lang }) {
  const t = dictionaries[lang].dispatch;
  return (
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
  );
}
