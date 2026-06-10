"use client";

import { useState } from "react";

export default function Merch() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    setLoading(true);
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "merch-waitlist" }),
      });
      if (!res.ok) throw new Error("server");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className="site-nav">
        <div className="page nav-row">
          <a href="/" className="wm" aria-label="Suor Society, home">
            <span className="wm-suor wm-suor--dark">SUOR</span>
            <span className="wm-society wm-society--dark">SOCIETY</span>
          </a>
          <div className="nav-links">
            <a href="/culture" className="nav-link nav-link--dark">Culture</a>
            <a href="/culture" className="nav-link nav-link--dark">Race Picks</a>
            <a href="/crew" className="nav-link nav-link--dark">Crew</a>
            <a href="/#dispatch" className="nav-link nav-link--dark">Dispatch</a>
            <a href="/about" className="nav-link nav-link--dark">About</a>
          </div>
        </div>
      </header>

      <main className="merch-stage">
        <div className="page merch-inner">
          <p className="merch-eye">Suor Society / Shop</p>
          <h1 className="merch-title">First<br />Drop<br />Coming</h1>

          {submitted ? (
            <div className="gate-success" style={{ marginTop: "48px" }}>
              <p className="gate-success-tag">You&rsquo;re on it</p>
              <p className="gate-success-title">First to know<br />when it lands.</p>
              <p className="gate-success-body">
                We&rsquo;ll hit you when the drop goes live. Follow{" "}
                <a
                  href="https://instagram.com/suorsociety"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline" }}
                >
                  @suorsociety
                </a>{" "}
                while you wait.
              </p>
            </div>
          ) : (
            <>
              <p className="merch-sub" style={{ marginBottom: "40px" }}>
                First drop in the build. Get told when it lands.
              </p>
              <form className="gate-form" onSubmit={handleSubmit} style={{ marginTop: 0 }}>
                <div className="gate-field">
                  <label className="gate-field-label" htmlFor="merch-email">
                    Your email
                  </label>
                  <input
                    id="merch-email"
                    className="gate-input"
                    type="email"
                    name="email"
                    placeholder="you@somewhere.com"
                    required
                    autoComplete="email"
                  />
                </div>
                <button type="submit" className="gate-btn" disabled={loading}>
                  {loading ? "Hold on..." : "Put me on it"}
                </button>
                {error && (
                  <p className="gate-error">
                    Something went wrong. Email us at hello@suorsociety.com and we&rsquo;ll add you directly.
                  </p>
                )}
                <p className="gate-fine">No spam. Just the drop.</p>
              </form>
            </>
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="page foot-row">
          <span className="foot-wm">SUOR SOCIETY</span>
          <span className="foot-loc">San Diego</span>
        </div>
      </footer>
    </>
  );
}
