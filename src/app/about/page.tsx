export const metadata = {
  title: "About — Suor Society",
  description:
    "Built in San Diego by a marketer who runs and lifts. A culture page for the hybrid athlete with a real life.",
};

export default function About() {
  return (
    <>
      <header className="site-nav">
        <div className="page nav-row">
          <a href="/" className="wm" aria-label="Suor Society, home">
            <span className="wm-suor wm-suor--dark">SUOR</span>
            <span className="wm-society wm-society--dark">SOCIETY</span>
          </a>
          <div className="nav-links">
            <a href="/about" className="nav-link nav-link--dark">About</a>
            <a href="/merch" className="nav-link nav-link--dark">Shop</a>
            <a href="/#culture" className="nav-link nav-link--dark">The Culture</a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="about-pg-hero">
          <div className="page">
            <p className="about-pg-eye">Suor Society / About</p>
            <h1 className="about-pg-headline">Suor is Portuguese for sweat.</h1>
            <p className="about-pg-deck">
              Brazilian roots. Six-day training weeks.<br />
              Built in San Diego.
            </p>
          </div>
        </section>

        {/* BODY */}
        <section className="about-pg-body">
          <div className="page">
            <div className="about-pg-grid">
              <div className="about-pg-col">
                <p className="about-pg-label">The founder</p>
                <p className="about-pg-p">
                  I&rsquo;m Thais. Marketer by day. Runner and lifter the rest of the time, six days a week, because nothing else clears my head like it does.
                </p>
                <p className="about-pg-p">
                  Not for aesthetics. For the feeling of being strong and capable in your body and what happens to your brain when you stay consistent about it. Mission Bay loops before work. Tuesday squats at Performance 360. Strava screenshots, fast or slow.
                </p>
                <p className="about-pg-p">
                  This started as something personal. Then I looked around for a page covering the lift-and-run world the way it deserved and couldn&rsquo;t find it. So I built one.
                </p>
              </div>
              <div className="about-pg-col">
                <p className="about-pg-label">What this is</p>
                <p className="about-pg-p">
                  Most hybrid content online is made by people whose whole life is training. Two-a-days, full sponsorships, 20-hour weeks. It&rsquo;s inspiring. It&rsquo;s also completely disconnected from the person with a real job, a commute, and forty minutes on a Tuesday.
                </p>
                <p className="about-pg-p">
                  Suor Society covers the lift-and-run world as a culture page. Shoe drops, athlete spotlights, race coverage, the San Diego scene. Plus the context that&rsquo;s almost always missing: the 1:10 half marathon took eight years. Your run counts the whole time you&rsquo;re chasing it.
                </p>
                <p className="about-pg-p">
                  Currently 12 weeks out from my first half marathon. Lifting around the mileage. Posting all of it.
                </p>
              </div>
            </div>
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
