"use client";

// Thin wrapper over GA4's gtag. Safe to call anywhere client-side: it no-ops
// when the tag hasn't loaded (ad blockers, GA down).
//
// Conversion events used on the site:
//   sign_up        — newsletter signups (home + dispatch page + post rail)
//   generate_lead  — race guide gate submits
//   file_download  — race guide PDF button clicks
export function track(event: string, params?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", event, params);
}
