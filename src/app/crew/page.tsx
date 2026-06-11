import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Crew — Suor Society",
  description:
    "Saturday crew runs in San Diego. Free, every pace, coffee after. The whole point.",
};

export default function Crew() {
  return (
    <>
      <SiteNav />

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

      </main>

      <SiteFooter />
    </>
  );
}
