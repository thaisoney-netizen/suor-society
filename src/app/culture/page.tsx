"use client";

import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import {
  CA_RACES,
  US_RACES,
  FAQS,
  raceAnchor,
  faqAnchor,
  type Race,
} from "@/lib/content";

function RaceRow({ race, region }: { race: Race; region: "ca" | "us" }) {
  return (
    <div className="race-row" id={raceAnchor(region, race.num)}>
      <span className="race-num">{race.num}</span>
      <div className="race-info">
        <div className="race-name">{race.name}</div>
        <div className="race-where">{race.where}</div>
        <p className="race-body">{race.body}</p>
        <div className="race-dists">{race.dists}</div>
        <div className={`race-status ${race.status}`}>{race.statusLabel}</div>
      </div>
      <div className="race-action">
        <span className="race-price">{race.price}</span>
        <a
          className="race-link"
          href={race.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Register →
        </a>
      </div>
    </div>
  );
}

function DownloadGate() {
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
        <div className="gate-success-title">Your<br />Guide<br />Is Ready.</div>
        <p className="gate-success-body">
          20 open entry races. California and across the US.
          All certified. All running before December 31, 2026.
        </p>
        <a
          className="gate-download-btn"
          href="/2026-race-guide.docx"
          download="2026_Race_Guide_SuorSociety.docx"
        >
          Download the Guide →
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

export default function CultureArchive() {
  return (
    <>
      {/* NAV */}
      <SiteHeader variant="light" />

      <main>

        {/* ── COVER IMAGE ── */}
        <div className="article-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/race-hero.jpg"
            alt="Thousands of runners at the start line of the Rock 'n' Roll San Diego Marathon and Half Marathon"
          />
        </div>

        {/* ── ARTICLE HERO ── */}
        <section className="article-hero">
          <div className="page">
            <div className="article-eye">The Culture Archive &nbsp;/&nbsp; June 2026</div>
            <h1 className="article-headline">
              Best Open Entry Races in <span>California</span> and the US Before 2026 Ends
            </h1>
            <p className="article-deck">
              No qualifying time. No lottery. Just find your race and go.
              Every distance from 5K to marathon, all certified, all running before December 31.
            </p>
            <div className="article-meta">
              <span>Suor Society</span>
              <span>San Diego, CA</span>
              <span>June 2026</span>
            </div>
          </div>
        </section>

        {/* ── INTRO ── */}
        <section className="article-body">
          <div className="page">
            <p>
              It&rsquo;s race season. If you&rsquo;ve been waiting for the right moment to sign up for
              something, this is it. We pulled together the best open entry road races running between
              now and December 31, 2026, in California and across the US. All USATF certified. All
              open to everyone, no matter how fast or slow you run.
            </p>
            <p>
              The rule for everything on this list: no qualifying time, no lottery. You register,
              you train, you show up.
            </p>
            <p>
              A few notes. Prices go up as race day gets closer. A couple of these are close to
              capacity but still have charity or benefactor spots. Check every link before you register.
            </p>
          </div>
        </section>

        {/* ── CALIFORNIA RACES ── */}
        <section style={{ borderBottom: "1px solid var(--line)", paddingBottom: "56px" }}>
          <div className="page">
            <div className="article-section-head">
              <div className="article-section-label">Top 10 California Races</div>
              <div className="article-section-sub">Open Entry · June to December 2026</div>
            </div>
            <div className="race-list">
              {CA_RACES.map((r) => <RaceRow key={r.num} race={r} region="ca" />)}
            </div>
          </div>
        </section>

        {/* ── US RACES ── */}
        <section style={{ borderBottom: "1px solid var(--line)", paddingBottom: "56px" }}>
          <div className="page">
            <div className="article-section-head">
              <div className="article-section-label">Top 10 US Certified Races</div>
              <div className="article-section-sub">No Qualifier · All USATF Certified</div>
            </div>
            <div className="race-list">
              {US_RACES.map((r) => <RaceRow key={r.num} race={r} region="us" />)}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="faq-section">
          <div className="page">
            <div className="faq-head">Frequently Asked</div>
            {FAQS.map((f, i) => (
              <div key={i} className="faq-item" id={faqAnchor(i)}>
                <div className="faq-q">{f.q}</div>
                <p className="faq-a">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── DOWNLOAD GATE ── */}
        <section className="download-gate">
          <div className="page">
            <div className="gate-label">Free Download</div>
            <div className="gate-title">Get the<br />Full Guide</div>
            <p className="gate-desc">
              All 20 races in one formatted document. Dates, prices, distances, and
              direct registration links, ready to save or share.
            </p>
            <ul className="gate-what">
              <li>10 best California open entry races, June to Dec 2026</li>
              <li>10 top US USATF-certified races, no qualifier needed</li>
              <li>Every distance: 5K, 10K, Half Marathon, Full Marathon</li>
              <li>Current prices and direct registration links</li>
              <li>Availability and status updated June 2026</li>
            </ul>
            <DownloadGate />
          </div>
        </section>

        {/* ── FOLLOW ── */}
        <section className="follow-us">
          <div className="page">
            <p className="follow-label">Follow us</p>
            <a
              href="https://instagram.com/suorsociety"
              className="follow-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com/@suorsociety"
              className="follow-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
          </div>
        </section>

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
