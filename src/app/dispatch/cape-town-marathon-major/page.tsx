import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Cape Town Is Now a Marathon Major, Suor Society",
  description:
    "Cape Town was confirmed as the eighth Abbott World Marathon Major on June 10, 2026. Africa's first Major joins the series on May 23, 2027. Here's what changes.",
};

const FAQS = [
  {
    q: "When does Cape Town become a Marathon Major?",
    a: "Officially at its next running on May 23, 2027. The announcement was made June 10, 2026 after the race passed its second evaluation.",
  },
  {
    q: "Does the Six Star medal still exist?",
    a: "Yes. Abbott confirmed the Six Star medal stays even after the Nine Star medal arrives. Cape Town and Sydney count toward the larger milestones.",
  },
  {
    q: "Did 2026 Cape Town finishers get a star?",
    a: "Yes. All 2026 finishers received a provisional star that's being upgraded now that the race is confirmed as a Major.",
  },
];

export default function CapeTownMajor() {
  return (
    <>
      <SiteNav />

      <main>
        {/* ── COVER IMAGE ── */}
        <div className="article-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/race-hero.jpg"
            alt="Runners at the Sanlam Cape Town Marathon, the eighth Abbott World Marathon Major"
          />
        </div>

        {/* ── ARTICLE HERO ── */}
        <section className="article-hero">
          <div className="page">
            <div className="article-eye">The Dispatch &nbsp;/&nbsp; Races</div>
            <h1 className="article-headline">
              Cape Town Is Now a Marathon Major. Here&rsquo;s What Actually <span>Changes</span>
            </h1>
            <p className="article-deck">
              The Sanlam Cape Town Marathon is officially the eighth Abbott World Marathon Major and the
              first one on African soil. The announcement landed June 10, 2026.
            </p>
            <div className="article-meta">
              <span>Suor Society</span>
              <span>San Diego, CA</span>
              <span>June 2026</span>
            </div>
          </div>
        </section>

        {/* ── BODY ── */}
        <section className="article-body">
          <div className="page">
            <p>
              The Sanlam Cape Town Marathon is officially the eighth Abbott World Marathon Major and the
              first one on African soil. The announcement landed June 10, 2026. Cape Town joins the series
              at its next running on May 23, 2027, alongside Tokyo, Boston, London, Sydney, Berlin,
              Chicago, and New York.
            </p>
            <p>
              Big news, and overdue. The continent that produces most of the sport&rsquo;s greatest distance
              runners finally has a Major to call home.
            </p>

            <h2>How it happened</h2>
            <p>
              Cape Town passed its second evaluation at the 2026 race in May, which is how the candidacy
              process works. Two clean runnings against the full criteria (course, expo, elite field,
              operations, safety) and you&rsquo;re in. Everyone who finished the 2026 race got a provisional
              star, and those are being upgraded to the real thing.
            </p>

            <h2>What this does to the star chase</h2>
            <p>Quick math for anyone collecting:</p>
            <p>
              The Six Star medal stays. Abbott confirmed it keeps being awarded for the original six
              (Tokyo, Boston, London, Berlin, Chicago, New York), so nobody&rsquo;s progress gets erased.
            </p>
            <p>
              Sydney made it seven last year. Cape Town makes it eight. And a Nine Star medal is already on
              the table, because Shanghai is the next candidate. If it passes its second evaluation on
              December 6, 2026, the series goes to nine.
            </p>
            <p>
              So the bucket list just got longer, more expensive, and honestly more interesting. Six used
              to be the finish line. Now it&rsquo;s a checkpoint.
            </p>

            <h2>Our take</h2>
            <p>
              Register interest early if Cape Town has ever crossed your mind. Major status does one thing
              to a race every single time: demand goes through the roof. The 2026 edition was the last one
              you could enter casually. May 2027 will not be.
            </p>
            <p>
              And if a full in Cape Town sounds like a lot right now, that&rsquo;s fine. Closer to home, our{" "}
              <a href="/racepicks">open entry race picks</a> have races you can register for today, no
              lottery, no qualifier.
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="faq-section">
          <div className="page">
            <div className="faq-head">Frequently Asked</div>
            {FAQS.map((f, i) => (
              <div key={i} className="faq-item">
                <div className="faq-q">{f.q}</div>
                <p className="faq-a">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <SiteFooter />
    </>
  );
}
