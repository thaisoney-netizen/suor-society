"use client";

import { useEffect } from "react";

// The root layout renders <html lang="en"> for the whole app; nested layouts
// can't change it server-side. This syncs document.documentElement.lang on the
// client so screen readers announce pt-BR pages in Portuguese, and restores
// the previous value when navigating back to an English page.
export default function SetHtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = previous;
    };
  }, [lang]);
  return null;
}
