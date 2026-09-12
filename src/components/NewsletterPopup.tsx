"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { dictionaries, langFromPathname } from "@/i18n/dictionaries";
import { track } from "@/lib/analytics";

// Trigger: whichever lands first, half the page scrolled or 40s on the page.
// Time alone fires at people who left mentally; scroll alone misses anyone who
// reads the hero and stops. Google treats an interstitial as intrusive when it
// covers content on load, so the delay is also what keeps this out of that
// bucket. Exit intent is deliberately absent: it needs a cursor leaving the
// viewport, which does not exist on a phone.
const SCROLL_TRIGGER = 0.5;
const TIME_TRIGGER_MS = 40_000;

// Dismissals lapse after a month; a signup is permanent. Stored under one key
// so a returning reader is never asked twice in the same window.
const STORE_KEY = "suor.newsletter-popup.v1";
const DISMISS_DAYS = 30;

// The dispatch page is the newsletter signup page, so the popup would be
// asking for an address the reader is already looking at a form for.
const SUPPRESSED = ["/dispatch", "/pt-br/dispatch"];

function readGate(): "subscribed" | number | null {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw) return null;
    if (raw === "subscribed") return "subscribed";
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  } catch {
    // Private browsing and blocked site data both throw on access. A reader we
    // cannot remember sees the popup again, which beats never showing it.
    return null;
  }
}

function writeGate(value: string) {
  try {
    window.localStorage.setItem(STORE_KEY, value);
  } catch {
    /* nothing to do: the popup stays dismissed for this page view only */
  }
}

export default function NewsletterPopup() {
  const pathname = usePathname() ?? "/";
  const lang = langFromPathname(pathname);
  const t = dictionaries[lang].newsletterPopup;

  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);

  const suppressed = SUPPRESSED.includes(pathname.replace(/\/$/, ""));

  // Arm the triggers. Both listeners are removed the moment either one wins,
  // so nothing keeps running behind an open or dismissed popup.
  useEffect(() => {
    if (suppressed) return;

    const gate = readGate();
    if (gate === "subscribed") return;
    if (typeof gate === "number" && Date.now() - gate < DISMISS_DAYS * 864e5) return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const fire = () => {
      if (firedRef.current) return;
      firedRef.current = true;
      window.removeEventListener("scroll", onScroll);
      if (timer) clearTimeout(timer);
      setOpen(true);
      track("popup_view", { source: "newsletter-popup" });
    };

    function onScroll() {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH <= 0) return;
      if (window.scrollY / docH >= SCROLL_TRIGGER) fire();
    }

    timer = setTimeout(fire, TIME_TRIGGER_MS);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timer) clearTimeout(timer);
    };
  }, [suppressed]);

  // Move focus to the card so a screen reader announces it. Focusing the card
  // rather than the input is deliberate: focusing the field would throw up the
  // keyboard and shove the page around on a phone.
  useEffect(() => {
    if (open) cardRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function dismiss() {
    writeGate(String(Date.now()));
    track("popup_dismiss", { source: "newsletter-popup" });
    setClosing(true);
    window.setTimeout(() => setOpen(false), 220);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    setLoading(true);

    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "popup" }),
      });
      if (!res.ok) throw new Error("server");
      track("sign_up", { method: "newsletter", source: "popup" });
      writeGate("subscribed");
      setSubmitted(true);
      // Let the confirmation be read before it goes.
      window.setTimeout(() => {
        setClosing(true);
        window.setTimeout(() => setOpen(false), 220);
      }, 3200);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className={`np${closing ? " is-closing" : ""}`}
      role="dialog"
      aria-modal="false"
      aria-labelledby="np-title"
      ref={cardRef}
      tabIndex={-1}
    >
      <button type="button" className="np-close" onClick={dismiss} aria-label={t.close}>
        <span aria-hidden="true">×</span>
      </button>

      {submitted ? (
        <div className="np-done">
          <p className="np-done-tag" id="np-title">{t.successTitle}</p>
          <p className="np-done-body">{t.successBody}</p>
        </div>
      ) : (
        <>
          <div className="np-copy">
            <p className="np-title" id="np-title">{t.title}</p>
            <p className="np-body">{t.body}</p>
          </div>

          <form className="np-form" onSubmit={handleSubmit} noValidate>
            <label className="np-sr" htmlFor="np-email">{t.emailLabel}</label>
            <input
              id="np-email"
              className="np-input"
              type="email"
              name="email"
              placeholder={t.placeholder}
              required
              autoComplete="email"
            />
            <button type="submit" className="np-btn" disabled={loading}>
              {loading ? t.sending : t.subscribe}
            </button>
          </form>

          {error ? <p className="np-error">{t.error}</p> : <p className="np-fine">{t.fine}</p>}
        </>
      )}
    </div>
  );
}
