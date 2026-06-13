"use client";

import { useState } from "react";

export default function DownloadGate() {
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
        <div className="gate-success-tag">You&rsquo;re in</div>
        <div className="gate-success-title">Your<br />Guide<br />Is Ready</div>
        <p className="gate-success-body">
          40 open entry races. 20 in California, 20 across the US.
          All certified. From now through spring 2027.
        </p>
        <a
          className="gate-download-btn"
          href="/2026-race-guide.pdf"
          download="2026_Race_Guide_SuorSociety.pdf"
        >
          Download the PDF →
        </a>
      </div>
    );
  }

  return (
    <form className="gate-form" onSubmit={handleSubmit} noValidate>
      <div className="gate-field">
        <label className="gate-field-label" htmlFor="gate-name">First Name</label>
        <input
          id="gate-name"
          className="gate-input"
          type="text"
          name="name"
          placeholder="Your name"
          autoComplete="given-name"
        />
      </div>

      <div className="gate-field">
        <label className="gate-field-label" htmlFor="gate-email">
          Email *
        </label>
        <input
          id="gate-email"
          className="gate-input"
          type="email"
          name="email"
          placeholder="you@somewhere.com"
          required
          autoComplete="email"
        />
      </div>

      <button
        type="submit"
        className="gate-btn"
        disabled={loading}
      >
        {loading ? "Sending…" : "Get the Guide →"}
      </button>

      {error && (
        <p className="gate-error">
          Something went wrong. Email us at hello@suorsociety.com and we&rsquo;ll send it directly.
        </p>
      )}

      <p className="gate-fine">No spam. Just the guide. Unsubscribe any time.</p>
    </form>
  );
}
