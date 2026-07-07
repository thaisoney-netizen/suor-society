import type { ReactNode } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { PostSubscribe } from "@/components/PostAside";
import AuthorCard from "@/components/AuthorCard";

export const metadata = {
  title: "Can You Join a Run Club If You're Not Really a Runner?, Suor Society",
  description:
    "Yes. Most run clubs are free, no-drop, and full of people who had the same worry. What all paces welcome actually means, what you need, and what's coming to San Diego.",
  alternates: {
    canonical: "/culture/join-a-run-club-not-a-runner",
  },
};

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "Do I need to be fast to join a run club?",
    a: "No. Most clubs are no-drop, meaning the group regroups so nobody gets left behind. Paces at a typical club range from 7-minute miles to run-walk intervals, at the same event.",
  },
  {
    q: "What if I need walk breaks?",
    a: "Walk breaks are standard at beginner-friendly clubs, and plenty of experienced runners use them on purpose. Run-walk is how a lot of people finish their first 5K, and even marathons.",
  },
  {
    q: "Do run clubs cost anything?",
    a: "Most are free. Some charge for special events or sell a shirt eventually, but showing up on a regular week costs nothing.",
  },
  {
    q: "What should I bring to a first group run?",
    a: "Sneakers you can move in, water if it's warm, and your phone. Nobody is checking your gear.",
  },
  {
    q: "How do I find a run club in San Diego?",
    a: (
      <>
        Instagram is where most SD clubs organize, search your neighborhood plus &ldquo;run
        club.&rdquo; The{" "}
        <a href="https://www.rrca.org/clubs/" target="_blank" rel="noopener noreferrer">
          RRCA club directory
        </a>{" "}
        lists registered clubs too. And SUOR SOCIETY is bringing crew runs to San Diego
        soon, The Dispatch gets it first.
      </>
    ),
  },
];

const SWAP = [
  { think: "To run the whole way", need: "To cover the distance however works" },
  { think: "A “real” pace", need: "Any pace, run-walk counts" },
  { think: "Running clothes that look right", need: "Whatever you'd wear to the gym" },
  { think: "Carbon plated shoes", need: "The sneakers you already own" },
  { think: "To know somebody there", need: "To say hi to one person" },
];

export default function JoinARunClub() {
  return (
    <>
      <SiteNav />

      <main className="post">
        {/* ── ARTICLE MASTHEAD (title above the cover) ── */}
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">The Culture Archive &nbsp;/&nbsp; July 2026</div>
            <h1 className="article-headline">
              Can You Join a Run Club If You&rsquo;re Not Really a <span>Runner</span>?
            </h1>
          </div>
        </section>

        {/* ── COVER IMAGE ── */}
        <div className="article-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/run-club-hero.jpg"
            alt="Group of runners mid-stride on a sunny street, motion-blurred legs and running shoes at a group run"
          />
        </div>

        {/* ── BODY + STICKY RAIL ── */}
        <div className="post-shell">
          <div className="post-main">

        {/* ── ARTICLE HERO (deck + meta) ── */}
        <section className="article-hero">
          <div className="page">
            <p className="article-deck">
              Yes. Most run clubs are free, no-drop, and full of people who had this exact worry
              before their first one. If you can cover 3 miles running, walking, or switching
              between the two, you can show up. Nobody there is checking your pace.
            </p>
            <div className="article-meta">
              <span>By <a href="/author/thais-oney">Thais Oney</a></span>
              <span>San Diego, CA</span>
              <span>Updated July 2026</span>
            </div>
          </div>
        </section>

        {/* ── BODY ── */}
        <section className="article-body">
          <div className="page">
            <p>
              If you&rsquo;ve been wondering whether you&rsquo;re allowed at a run club without
              calling yourself a runner, the short answer is yes, and you wouldn&rsquo;t even be
              in the minority. Here&rsquo;s what the door actually looks like from the inside.
            </p>

            <h2>Why run clubs got so big (it&rsquo;s not about getting faster)</h2>
            <p>
              Run clubs are having a moment, and the numbers back it up. Running clubs on Strava
              grew 3.5x in 2025, and Gen Z is 39 percent more likely than Gen X to{" "}
              <a
                href="https://press.strava.com/articles/strava-releases-12th-annual-year-in-sport-trend-report-2025"
                target="_blank"
                rel="noopener noreferrer"
              >
                use fitness to meet people
              </a>{" "}
              who share their interests. And in{" "}
              <a
                href="https://racery.com/blog/2015/06/23/to-run-farther-run-together/"
                target="_blank"
                rel="noopener noreferrer"
              >
                one survey of group runners
              </a>
              , people who usually run with others covered about 26 percent more distance per run
              than people who run alone. Roughly a mile more, just from having company.
            </p>
            <p>
              So the growth isn&rsquo;t about everyone suddenly getting serious about running.
              It&rsquo;s about having a standing Saturday morning plan with people who actually
              show up. If the thing holding you back is feeling like you&rsquo;re &ldquo;not
              really a runner,&rdquo; that&rsquo;s the part nobody there cares about.
            </p>

            <h2>What &ldquo;all paces welcome&rdquo; actually means</h2>
            <p>Every club says it. In practice, at a no-drop run it looks like this:</p>
            <ul>
              <li>
                The group naturally splits in the first half mile, and you end up next to people
                moving your speed
              </li>
              <li>
                No-drop means the front regroups at turns and lights, so you&rsquo;re never
                navigating alone and nobody is waiting on you with a stopwatch
              </li>
              <li>
                Walk breaks are normal. At any decent club, someone is walking part of it every
                single week
              </li>
              <li>
                The run ends, people hang out for a bit, you go home. That&rsquo;s the whole thing
              </li>
            </ul>
            <p>
              I ran my first half marathon in May and I still get nervous walking up to a group I
              don&rsquo;t know. Being new feels a lot like not belonging. It isn&rsquo;t the same
              thing.
            </p>

            <h2>What you think you need vs what you actually need</h2>
            <div className="swap-table">
              <div className="swap-row swap-head">
                <span>You think you need</span>
                <span>You actually need</span>
              </div>
              {SWAP.map((row, i) => (
                <div key={i} className="swap-row">
                  <span>{row.think}</span>
                  <span>{row.need}</span>
                </div>
              ))}
            </div>

            <h2>San Diego, this is where we&rsquo;re headed</h2>
            <p>
              SUOR SOCIETY is coming to San Diego. Crew runs are on the way, free, every pace
              including run-walk. When it&rsquo;s time, <a href="/dispatch">The Dispatch</a> gets
              it first
            </p>
            <p>
              And when a few group runs turn into wanting a start line of your own, our{" "}
              <a href="/culture/open-entry-races-2026">open entry race picks</a> list races you
              can register for today, no qualifier, no lottery.
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

        {/* ── AUTHOR ── */}
        <AuthorCard />

          </div>{/* /.post-main */}

          <aside className="post-aside post-aside--sub">
            <PostSubscribe />
          </aside>
        </div>{/* /.post-shell */}

      </main>

      <SiteFooter />
    </>
  );
}
