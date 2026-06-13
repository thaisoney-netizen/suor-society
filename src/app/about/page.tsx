import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "About, Suor Society",
  description:
    "Built in San Diego by a marketer who runs and lifts. Hybrid running culture for people with a real life.",
};

export default function About() {
  return (
    <>
      <SiteNav />

      <main>
        {/* HERO */}
        <section className="about-pg-hero">
          <div className="page">
            <p className="about-pg-eye">Suor Society / The Culture</p>
            <h1 className="about-pg-headline">Suor is Portuguese for sweat</h1>
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
                  Not for aesthetics. For the feeling of being strong and capable in your body and what happens to your brain when you stay consistent about it. Long runs before work. Tuesday squats at the gym. Strava screenshots, fast or slow.
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
                  Ran my first half marathon this spring. Lifting around the mileage. Posting all of it.
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
                <span>Pacific Beach boardwalk, San Diego</span>
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

      </main>

      <SiteFooter />
    </>
  );
}
