"use client";

import { useState } from "react";
import { dictionaries, type Lang } from "@/i18n/dictionaries";
import { track } from "@/lib/analytics";

export default function DownloadGate({ lang = "en" }: { lang?: Lang }) {
  const t = dictionaries[lang].downloadGate;
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState(false);
  const [loading, setLoading]     = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    setLoading(true);

    const form  = e.currentTarget;
    const name  = (form.elements.namedItem("name")  as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    try {
      const res = await fetch("/api/race-guide", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name, email }),
      });
      if (!res.ok) throw new Error("server");
      track("generate_lead", { source: "race-guide", lang });
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
        <a
          className="gate-download-btn"
          href={t.pdfHref}
          download={t.pdfName}
          onClick={() => track("file_download", { file: t.pdfName, lang })}
        >
          {t.downloadBtn}
        </a>
      </div>
    );
  }

  return (
    <form className="gate-form" onSubmit={handleSubmit} noValidate>
      <div className="gate-field">
        <label className="gate-field-label" htmlFor="gate-name">{t.nameLabel}</label>
        <input
          id="gate-name"
          className="gate-input"
          type="text"
          name="name"
          placeholder={t.namePlaceholder}
          autoComplete="given-name"
        />
      </div>

      <div className="gate-field">
        <label className="gate-field-label" htmlFor="gate-email">
          {t.emailLabel}
        </label>
        <input
          id="gate-email"
          className="gate-input"
          type="email"
          name="email"
          placeholder={t.emailPlaceholder}
          required
          autoComplete="email"
        />
      </div>

      <button
        type="submit"
        className="gate-btn"
        disabled={loading}
      >
        {loading ? t.sending : t.submit}
      </button>

      {error && <p className="gate-error">{t.error}</p>}

      <p className="gate-fine">{t.fine}</p>
    </form>
  );
}
