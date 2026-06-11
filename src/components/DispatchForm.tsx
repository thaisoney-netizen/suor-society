"use client";

import { useState } from "react";

export default function DispatchForm() {
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
        <div className="gate-success-tag">You&rsquo;re in</div>
        <div className="gate-success-title">On<br />The<br />List.</div>
        <p className="gate-success-body">
          The dispatch lands in your inbox each week. Races worth signing up for,
          gear worth knowing about, and the people doing both around a real life.
        </p>
      </div>
    );
  }

  return (
    <form className="gate-form" onSubmit={handleSubmit} noValidate>
      <div className="gate-field">
        <label className="gate-field-label" htmlFor="dispatch-email">
          Email *
        </label>
        <input
          id="dispatch-email"
          className="gate-input"
          type="email"
          name="email"
          placeholder="you@somewhere.com"
          required
          autoComplete="email"
        />
      </div>

      <button type="submit" className="gate-btn" disabled={loading}>
        {loading ? "Sending…" : "Subscribe →"}
      </button>

      {error && (
        <p className="gate-error">
          Something went wrong. Email us at hello@suorsociety.com and we&rsquo;ll add you directly.
        </p>
      )}

      <p className="gate-fine">No spam. One email a week. Unsubscribe any time.</p>
    </form>
  );
}
