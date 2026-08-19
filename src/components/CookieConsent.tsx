"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { dictionaries, langFromPathname, localizeHref } from "@/i18n/dictionaries";

// Cookie consent bar. Pairs with the Google Consent Mode v2 defaults set in
// layout.tsx, which start every visitor at analytics_storage: "denied" — so GA4
// sends only cookieless pings until someone accepts here. That means the banner
// is a real gate, not decoration: no _ga cookie exists before the click.
//
// Accept and Reject are deliberately the same size and weight. Burying the
// reject option behind a second click is the pattern regulators single out.
export const CONSENT_KEY = "ss-cookie-consent";

// Set while the bar is on screen so globals.css can hide the language toast,
// which lives in the same bottom-left corner. One decision at a time.
const PENDING_ATTR = "consentPending";

// The scroll tracker (#ss-tracker, 60px) slides up from the bottom once the
// page is scrolled, so the bar rides above it. Same threshold ScrollTracker
// uses for its own visibility, matching LanguageBanner's lift.
const LIFT_AT = 24;

function readStored(): string | null {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    // Private mode can throw on read. Treat it as "no choice yet" and show the
    // bar; the choice just won't survive the session.
    return null;
  }
}

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [lifted, setLifted] = useState(false);
  // Mounted once in the root layout, so the locale comes from the URL the same
  // way ScrollTracker resolves it.
  const lang = langFromPathname(usePathname() ?? "/");
  const t = dictionaries[lang].consent;

  useEffect(() => {
    if (readStored()) return;
    setShow(true);
    document.documentElement.dataset[PENDING_ATTR] = "1";
    return () => {
      delete document.documentElement.dataset[PENDING_ATTR];
    };
  }, []);

  useEffect(() => {
    if (!show) return;
    const onScroll = () => {
      const y =
        window.scrollY ??
        window.pageYOffset ??
        document.documentElement.scrollTop ??
        0;
      setLifted(y > LIFT_AT);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [show]);

  function choose(decision: "accepted" | "rejected") {
    setShow(false);
    delete document.documentElement.dataset[PENDING_ATTR];
    try {
      localStorage.setItem(CONSENT_KEY, decision);
    } catch {
      // ignore, the bar still closes for this pageview
    }
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    w.gtag?.("consent", "update", {
      analytics_storage: decision === "accepted" ? "granted" : "denied",
    });
    // No page_view is replayed on accept. GA4 already logged this pageview as a
    // cookieless ping, so re-firing it would double count the visit.
  }

  if (!show) return null;

  return (
    <div
      className={`cookie-bar${lifted ? " cookie-bar--lifted" : ""}`}
      role="dialog"
      aria-label={t.ariaLabel}
    >
      <div className="cookie-bar-inner">
        <p className="cookie-bar-text">
          {t.text}{" "}
          <a className="cookie-bar-link" href={localizeHref("/privacy", lang)}>
            {t.policyLink}
          </a>
        </p>
        <div className="cookie-bar-actions">
          <button
            type="button"
            className="cookie-btn cookie-btn--ghost"
            onClick={() => choose("rejected")}
          >
            {t.reject}
          </button>
          <button
            type="button"
            className="cookie-btn cookie-btn--solid"
            onClick={() => choose("accepted")}
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
