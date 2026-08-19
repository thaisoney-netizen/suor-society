"use client";

import { useEffect, useState } from "react";
import { CONSENT_KEY } from "@/components/CookieConsent";
import { dictionaries, type Lang } from "@/i18n/dictionaries";

// Lets a visitor see and undo their cookie choice from the privacy page.
// Withdrawing consent has to be as easy as giving it, so this sits in the body
// of the policy rather than behind a mailto.
export default function ConsentReset({ lang }: { lang: Lang }) {
  const t = dictionaries[lang].privacy.choices;
  const [choice, setChoice] = useState<string | null>(null);

  // Read after mount. The server has no way to know the stored value, so
  // rendering it directly would mismatch on hydration.
  useEffect(() => {
    try {
      setChoice(localStorage.getItem(CONSENT_KEY));
    } catch {
      setChoice(null);
    }
  }, []);

  function reset() {
    try {
      localStorage.removeItem(CONSENT_KEY);
    } catch {
      // ignore
    }
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    w.gtag?.("consent", "update", { analytics_storage: "denied" });
    // Reload so the consent bar remounts and asks again.
    window.location.reload();
  }

  const status =
    choice === "accepted"
      ? t.statusAccepted
      : choice === "rejected"
        ? t.statusRejected
        : t.statusNone;

  return (
    <div className="consent-reset">
      <p className="consent-reset-status">{status}</p>
      <button type="button" className="consent-reset-btn" onClick={reset}>
        {t.resetBtn}
      </button>
    </div>
  );
}
