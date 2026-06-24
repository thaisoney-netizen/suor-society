"use client";

import { useState } from "react";
import { dictionaries, type Lang } from "@/i18n/dictionaries";

export default function DispatchForm({ lang = "en" }: { lang?: Lang }) {
  const t = dictionaries[lang].dispatchForm;
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState(false);
  const [loading, setLoading]     = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    setLoading(true);

    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;

    try {
      const res = await fetch("/api/signup", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, source: "dispatch-page" }),
      });
      if (!res.ok) throw new Error("server");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="gate-success">
        <div className="gate-success-tag">{t.successTag}</div>
        <div className="gate-success-title">
          {t.successTitleLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < t.successTitleLines.length - 1 && <br />}
            </span>
          ))}
        </div>
        <p className="gate-success-body">{t.successBody}</p>
      </div>
    );
  }

  return (
    <form className="gate-form" onSubmit={handleSubmit} noValidate>
      <div className="gate-field">
        <label className="gate-field-label" htmlFor="dispatch-email">
          {t.emailLabel}
        </label>
        <input
          id="dispatch-email"
          className="gate-input"
          type="email"
          name="email"
          placeholder={t.placeholder}
          required
          autoComplete="email"
        />
      </div>

      <button type="submit" className="gate-btn" disabled={loading}>
        {loading ? t.sending : t.subscribe}
      </button>

      {error && <p className="gate-error">{t.error}</p>}

      <p className="gate-fine">{t.fine}</p>
    </form>
  );
}
