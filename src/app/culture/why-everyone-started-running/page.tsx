import type { ReactNode } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { PostToc } from "@/components/PostAside";
import AuthorCard from "@/components/AuthorCard";

export const metadata = {
  title: "Why Did Everyone Start Running? The Running Boom, Explained, Suor Society",
  description:
    "It's not in your head. Race numbers passed pre-pandemic levels, run club participation jumped 59% in a year, and London took 1.1 million marathon applications. The stats behind the running boom and what changed after 2024.",
  alternates: {
    canonical: "/culture/why-everyone-started-running",
  },
};

const TOC = [
  { id: "numbers", label: "By the numbers" },
  { id: "after-2024", label: "What changed after 2024" },
  { id: "run-clubs", label: "The run club effect" },
  { id: "who", label: "Who's running now" },
  { id: "new", label: "If you just started" },
  { id: "faq", label: "Frequently Asked" },
];

const THEN_NOW = [
  { then: "Race numbers still trailing 2019", now: "Past pre-pandemic, up 8.2% per race in 2024" },
  { then: "Run clubs a niche thing", now: "Run club participation up 59% in a single year" },
  { then: "Biggest marathon field around 50,000", now: "56,000+ finishers, the record broken twice in one year" },
  { then: "London ballot always oversubscribed", now: "1.1 million applications for the 2026 race" },
  { then: "Under-25s roughly 5% of major fields", now: "Over 10% now, double the share of five years ago" },
];

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "Why is everyone running all of a sudden?",
    a: "Because running turned social. After 2024, run clubs, group runs, and races became the way people see each other, not just a fitness habit. Strava logged a 59% jump in run club participation in one year, and social connection is now the top reason people say they work out.",
  },
  {
    q: "When did the running boom start?",
    a: "The pandemic gave running a bump in 2020, but that was mostly people running alone. The current boom took off in 2024, and it looks different. It's group-first, younger, and built around showing up with other people.",
  },
  {
    q: "Is running really more popular than before the pandemic?",
    a: "Yes. Race participation has passed 2019 levels for the first time since the pandemic, with races growing about 8.2% on average in 2024 and marathon finisher numbers up 26% year on year.",
  },
  {
    q: "Why are run clubs so popular right now?",
    a: "They solved two problems at once: a standing plan to move, and a place to meet people. In one survey, 66% of Gen Z said they made new friends through a fitness group and one in five met a date there. The run is the excuse. The people are the reason.",
  },
  {
    q: "Is it too late to start running in 2026?",
    a: (
      <>
        Not even close. At the 2025 Paris Marathon, 51% of the field was running a marathon for the
        first time. First-timers aren&rsquo;t behind the boom, they are the boom. If you want a low
        stakes way in, <a href="/culture/join-a-run-club-not-a-runner">join a run club</a> before
        you ever pin on a bib.
      </>
    ),
  },
];

export default function WhyEveryoneStartedRunning() {
  return (
    <>
      <SiteNav />

      <main className="post">
        {/* ── ARTICLE MASTHEAD (title above the cover) ── */}
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">The Culture Archive &nbsp;/&nbsp; July 2026</div>
            <h1 className="article-headline">
              Why Did Everyone Start <span>Running</span>?
            </h1>
          </div>
        </section>

        {/* ── COVER IMAGE ── */}
        <div className="article-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/crew-run.jpg"
            alt="A large group of runners spread across a palm-lined street at a morning group run"
          />
        </div>

        {/* ── BODY + STICKY RAIL ── */}
        <div className="post-shell">
          <div className="post-main">

            {/* ── ARTICLE HERO (deck + meta) ── */}
            <section className="article-hero">
              <div className="page">
                <p className="article-deck">
                  If it feels like everyone you know started running this year, you&rsquo;re not
                  making it up. Race participation passed pre-pandemic levels, run club
                  participation jumped 59% in a single year, and the 2026 London Marathon pulled a
                  record 1.1 million ballot applications. After 2024, running quietly stopped being
                  a solo fitness habit and turned into the thing people do to see each other.
                </p>
                <div className="article-meta">
                  <span>By <a href="/author/thais-oney">Thais Oney</a></span>
                  <span>San Diego, CA</span>
                  <span>Updated July 2026</span>
                </div>
              </div>
            </section>

            {/* ── INTRO ── */}
            <section className="article-body">
              <div className="page">
                <p>
                  Something shifted, and the data finally caught up to the group chat. The running
                  boom is real, it&rsquo;s measurable, and it isn&rsquo;t just more people jogging.
                  It changed who runs, why they run, and what a run is even for. Here&rsquo;s what
                  happened, and what it means if you&rsquo;re the one who just laced up.
                </p>
              </div>
            </section>

            {/* ── NUMBERS ── */}
            <section id="numbers" className="article-body">
              <div className="page">
                <h2>The boom, by the numbers</h2>
                <p>
                  Start with participation. According to RunSignup&rsquo;s 2024 RaceTrends report,
                  the average race grew about 8.2% over the year, and overall race participation
                  finally{" "}
                  <a
                    href="https://www.runningusa.org/running-usa-news/running-usa-launches-the-2024-top-races-report-celebrating-a-historic-year-for-running/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    passed its pre-pandemic 2019 level
                  </a>{" "}
                  for the first time since COVID. Marathon finisher numbers were up 26% year on
                  year.
                </p>
                <p>
                  Then the records started falling. The title for the world&rsquo;s largest
                  marathon got broken twice in one year, first in Berlin, then at the TCS New York
                  City Marathon with over 56,000 finishers. The 2025 Paris Marathon set its own
                  participation record at 56,950 runners, and 51% of them were running a marathon
                  for the very first time.
                </p>
                <p>
                  The clearest sign of how many people want in: the 2026 London Marathon received
                  1.1 million ballot applications. For scale, that&rsquo;s roughly the number of
                  people who finish a marathon worldwide in an entire year, all chasing one start
                  line.
                </p>

                <div className="swap-table">
                  <div className="swap-row swap-head">
                    <span>A few years ago</span>
                    <span>Now (2024 to 2026)</span>
                  </div>
                  {THEN_NOW.map((row, i) => (
                    <div key={i} className="swap-row">
                      <span>{row.then}</span>
                      <span>{row.now}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── WHAT CHANGED AFTER 2024 ── */}
            <section id="after-2024" className="article-body">
              <div className="page">
                <h2>What actually changed after 2024</h2>
                <p>
                  Running had a moment in 2020 too, but that one was different. It was people stuck
                  at home, looking for something to do alone. This boom is the opposite. It&rsquo;s
                  built around other people.
                </p>
                <p>
                  Strava&rsquo;s Year in Sport report, drawn from more than 135 million people
                  across 190-plus countries, found run club participation up 59% in 2024, and runs
                  logged in groups of 10 or more up 18%. People didn&rsquo;t just start running.
                  They started running together, and that&rsquo;s the part that turned a fitness
                  trend into a culture shift.
                </p>
              </div>
            </section>

            {/* ── RUN CLUBS ── */}
            <section id="run-clubs" className="article-body">
              <div className="page">
                <h2>Run clubs became the plan, not the training</h2>
                <p>
                  &ldquo;Run clubs over nightclubs&rdquo; started as a joke and became the actual
                  data.{" "}
                  <a
                    href="https://press.strava.com/articles/strava-releases-annual-year-in-sport-trend"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Strava&rsquo;s report
                  </a>{" "}
                  found social connection is now a lead reason people move at all. Among Gen Z, 66%
                  said they made new friends through a fitness group, 55% said social interaction
                  was their main reason for joining, and one in five said they met a date through a
                  group activity.
                </p>
                <p>
                  So the run isn&rsquo;t really the point. The standing plan is. A Saturday you
                  don&rsquo;t have to organize, with people who actually show up, ending with
                  everyone hanging around afterward. That&rsquo;s what people were missing, and
                  running happened to be the thing that solved it.
                </p>
              </div>
            </section>

            {/* ── WHO'S RUNNING ── */}
            <section id="who" className="article-body">
              <div className="page">
                <h2>Who&rsquo;s showing up now</h2>
                <p>
                  Younger, and newer. Under-25s now make up over 10% of major marathon fields,
                  double their share from five years ago, and Gen Z has been the group driving road
                  race sign-ups back up. A big chunk of the people at any start line this year had
                  never run one before. Half the Paris field, remember, was doing it for the first
                  time.
                </p>
                <p>
                  It&rsquo;s not only the roads, either. Trail and ultra grew even faster.
                  Ultra-distance races between 50 and 100 miles saw a 77% jump in participation in
                  2024, and UTMB Index race starts in early 2025 ran{" "}
                  <a href="https://runrepeat.com/the-state-of-us-marathons-2025" target="_blank" rel="noopener noreferrer">
                    2.4 times higher
                  </a>{" "}
                  than the same stretch of 2022, with 42% of those runners racing a trail for the
                  first time. The edges of the sport grew as fast as the middle.
                </p>
              </div>
            </section>

            {/* ── IF YOU JUST STARTED ── */}
            <section id="new" className="article-body">
              <div className="page">
                <h2>If you&rsquo;re the one who just started</h2>
                <p>
                  Then you&rsquo;re the story, not a latecomer to it. The whole boom is built on
                  people in their first season, and that includes me on the long-distance side. I
                  ran my first half marathon in May, deep into lifting for years but new to
                  actually going long. Being new to something isn&rsquo;t the same as being behind.
                </p>
                <p>
                  The trap is thinking you need a fast time or an athlete&rsquo;s schedule before
                  any of it counts. You don&rsquo;t. Maybe you run a fast half someday, the YET is
                  real, and the 40-minute run you squeeze in around a full-time job counts the whole
                  time you&rsquo;re chasing it. Both things are true at once.
                </p>
                <p>
                  The easiest way in is other people. Find a{" "}
                  <a href="/culture/join-a-run-club-not-a-runner">no-drop run club</a> where every
                  pace is welcome, and when you want a start line of your own, our{" "}
                  <a href="/culture/open-entry-races-2026">open entry race picks</a> list races you
                  can register for today, no qualifier, no lottery. <a href="/dispatch">The
                  Dispatch</a> has the date of the first SUOR SOCIETY crew run in San Diego.
                </p>
              </div>
            </section>

            {/* ── FAQ ── */}
            <section id="faq" className="faq-section">
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

          <aside className="post-aside post-aside--toc">
            <PostToc items={TOC} />
          </aside>
        </div>{/* /.post-shell */}

      </main>

      <SiteFooter />
    </>
  );
}
