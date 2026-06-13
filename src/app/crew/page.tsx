import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Crew, Suor Society",
  description: "Saturday crew runs in San Diego. Free, every pace, coffee after.",
};

// ── NEXT RUN ──
// No run on the calendar yet. When one is set, swap SCHEDULED to true
// and fill in the date / time / meet lines below.
const NEXT_RUN = {
  scheduled: false,
  date: "",
  time: "",
  meet: "",
};

// One idea per line. Rendered as stacked fragments.
const LINES = [
  "Weekend mornings",
  "Free, always",
  "All paces",
  "The fastest person waits at every turn",
  "Coffee after",
];

export default function Crew() {
  return (
    <>
      <SiteNav />

      <main>
        {/* HERO */}
        <section className="about-pg-hero crew-hero">
          <div className="page">
            <p className="about-pg-eye">Suor Society / Crew</p>
            <h1 className="about-pg-headline">Run with us</h1>
            <p className="about-pg-deck">
              Free. Every pace.<br />
              San Diego.
            </p>
          </div>
        </section>

        {/* NEXT RUN — split: text one side, photo the other */}
        <section className="crew-split">
          <div className="crew-split-text">
            <div className="crew-split-inner">
              <p className="about-pg-crew-eye">Next run</p>
              {NEXT_RUN.scheduled ? (
                <>
                  <h2 className="about-pg-crew-title">{NEXT_RUN.date}</h2>
                  <div className="about-pg-crew-table">
                    <div className="about-pg-crew-row">
                      <span>Time</span>
                      <span>{NEXT_RUN.time}</span>
                    </div>
                    <div className="about-pg-crew-row">
                      <span>Meet</span>
                      <span>{NEXT_RUN.meet}</span>
                    </div>
                    <div className="about-pg-crew-row">
                      <span>Cost</span>
                      <span>Free. Always.</span>
                    </div>
                  </div>
                  <p className="about-pg-crew-note">
                    The callout posts on{" "}
                    <a
                      href="https://instagram.com/suorsociety"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @suorsociety
                    </a>
                    . Check it before you head out.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="about-pg-crew-title">First run loading</h2>
                  <p className="about-pg-crew-note">
                    No date on the calendar yet. The first one drops soon, and
                    every callout goes up on{" "}
                    <a
                      href="https://instagram.com/suorsociety"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @suorsociety
                    </a>{" "}
                    first. Follow it and you&rsquo;ll be first to know.
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="crew-split-media">
            <img src="/crew-suor.jpg" alt="Suor Society crew run" />
          </div>
        </section>

        {/* THE FORMAT */}
        <section className="crew-lines">
          <div className="page">
            <p className="about-pg-eye">The format</p>
            {LINES.map((line) => (
              <p key={line} className="crew-line">{line}</p>
            ))}
          </div>
        </section>

      </main>

      <SiteFooter />
    </>
  );
}
