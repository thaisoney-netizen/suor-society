export const metadata = {
  title: "Crew — Suor Society",
  description:
    "Saturday crew runs in San Diego. Free, every pace, coffee after. The whole point.",
};

export default function Crew() {
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

      <main>
        {/* HERO */}
        <section className="about-pg-hero">
          <div className="page">
            <p className="about-pg-eye">Suor Society / Crew</p>
            <h1 className="about-pg-headline">Run with us.</h1>
            <p className="about-pg-deck">
              Free. Every pace.<br />
              San Diego, every Saturday.
            </p>
          </div>
        </section>

        {/* CREW */}
        <section className="about-pg-crew">
          <div className="page">
            <p className="about-pg-crew-eye">Community</p>
            <h2 className="about-pg-crew-title">Saturday<br />Crew Runs</h2>
            <div className="about-pg-crew-table">
              <div className="about-pg-crew-row">
                <span>When</span>
                <span>Saturday mornings</span>
              </div>
              <div className="about-pg-crew-row">
                <span>Where</span>
                <span>Mission Bay loop, San Diego</span>
              </div>
              <div className="about-pg-crew-row">
                <span>Cost</span>
                <span>Free. Always.</span>
              </div>
              <div className="about-pg-crew-row">
                <span>Pace</span>
                <span>All of them</span>
              </div>
            </div>
            <p className="about-pg-crew-note">
              The fastest person waits at every turn. Coffee after. That&rsquo;s the whole point.
              <br /><br />
              Follow{" "}
              <a
                href="https://instagram.com/suorsociety"
                target="_blank"
                rel="noopener noreferrer"
              >
                @suorsociety
              </a>{" "}
              for the callout each week.
            </p>
          </div>
        </section>

        {/* FOLLOW */}
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
