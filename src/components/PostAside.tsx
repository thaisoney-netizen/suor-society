"use client";

import { useEffect, useState } from "react";
import DispatchForm from "@/components/DispatchForm";

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
export function PostSubscribe() {
  return (
    <div className="dispatch-aside-card">
      <div className="gate-label">The Weekly Dispatch</div>
      <div className="gate-title">
        Sign up
        <br />
        Free
      </div>
      <p className="gate-desc">
        Races worth signing up for and gear worth knowing about. One email a
        week, no daily blast
      </p>
      <DispatchForm />
      <ul className="gate-what">
        <li>Open-entry races worth your weekend</li>
        <li>Hybrid training and gear we actually use</li>
        <li>San Diego crew runs and meetups</li>
      </ul>
    </div>
  );
}
