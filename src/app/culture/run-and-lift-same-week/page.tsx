import type { ReactNode } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { PostToc } from "@/components/PostAside";
import AuthorCard from "@/components/AuthorCard";
import { pageMeta, ArticleJsonLd, FaqJsonLd, HowToJsonLd } from "@/lib/seo";

const META = {
  path: "/culture/run-and-lift-same-week",
  title: "How to Run and Lift in the Same Week Without Breaking Down, Suor Society",
  description:
    "Run and lift in the same week by keeping one hard session a day and putting 48 hours between your hardest run and heaviest leg day. A hybrid week that holds up around a job.",
  image: "/founder-press.jpg",
};
export const metadata = pageMeta({ ...META, paired: true });

const TOC = [
  { id: "trap", label: "The two-a-day trap" },
  { id: "one-hard", label: "One hard thing a day" },
  { id: "week", label: "A week that holds up" },
  { id: "signs", label: "Signs you're overdoing it" },
  { id: "compare", label: "Stacked vs alternating" },
  { id: "faq", label: "Frequently Asked" },
];

const WEEK = [
  {
    day: "Monday",
    body: "Heavy lift. The big strength day of the week, lower or full body.",
    plain: "Monday: heavy lift, the big strength day of the week, lower or full body.",
  },
  {
    day: "Tuesday",
    body: "Quality run. Intervals, a tempo, something that costs you. The one hard run.",
    plain: "Tuesday: quality run such as intervals or a tempo, the one hard run of the week.",
  },
  {
    day: "Wednesday",
    body: "Easy run. Conversational the whole way. If you can't talk, you're going too fast.",
    plain: "Wednesday: easy conversational run, slow enough to hold a conversation.",
  },
  {
    day: "Thursday",
    body: "Lift plus a short easy run. Upper-focused strength, then 20 to 30 easy minutes if you want them.",
    plain: "Thursday: an upper-body focused lift plus an optional 20 to 30 minute easy run.",
  },
  {
    day: "Friday",
    body: "Off. Fully off. This is the day people skip and the one holding the week together.",
    plain: "Friday: a full rest day, completely off.",
  },
  {
    day: "Saturday",
    body: "Long run. The distance day. Keep the effort easy and let it run long.",
    plain: "Saturday: the long run, kept at an easy effort.",
  },
  {
    day: "Sunday",
    body: "Easy lift or off. Light full body, or nothing. Read the week you just had and pick.",
    plain: "Sunday: a light full-body lift or another rest day, depending on how the week felt.",
  },
];

const FAQS: { q: string; a: ReactNode; plain?: string }[] = [
  {
    q: "Should I run on lifting days?",
    a: "Most weeks, yes. The rule is that one of the two is easy. A hard lift means an easy run or no run, and a hard run means an easy lift or no lift. Doing both on the same day was never the problem. Doing both hard is.",
  },
  {
    q: "Should I run before or after lifting?",
    a: "Depends what matters most that day, because whatever you do first gets your best. If the run is the priority, run first. If strength is, lift first. For building lower-body strength specifically, lifting before the run tends to come out ahead.",
  },
  {
    q: "How many rest days does a hybrid week need?",
    a: "At least one full day off, and for most people with a job, one more that's easy or off. The week above keeps Friday completely off and lets Sunday be light or nothing. Recovery is when the training actually sticks, so those days are doing real work.",
  },
  {
    q: "Will lifting make me slower?",
    a: "No. Done with real easy days, lifting makes you more durable and can help your running economy, so you hold pace with less effort. The interference people worry about is small for most of us, and it mostly shows up in the exact setup this whole piece warns against: everything hard, every day, nothing easy.",
  },
];

export default function RunAndLiftSameWeek() {
  return (
    <>
      <ArticleJsonLd {...META} datePublished="2026-07-21" />
      <HowToJsonLd
        path={META.path}
        name="A hybrid running and lifting week that holds up"
        description="A weekly template for running and lifting around a full-time job, built so the hard days never collide: three runs, two lifts, one full rest day."
        image={META.image}
        steps={WEEK.map((d) => ({ name: d.day, text: d.plain }))}
      />
      <FaqJsonLd faqs={FAQS} />
      <SiteNav />

      <main className="post">
        {/* ── ARTICLE MASTHEAD (title above the cover) ── */}
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">The Culture Archive &nbsp;/&nbsp; July 2026</div>
            <h1 className="article-headline">
              How to run and lift in the same week <span>without breaking down</span>
            </h1>
          </div>
        </section>

        {/* ── COVER IMAGE ── */}
        <div className="article-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/founder-press.jpg"
            alt="A hybrid athlete pressing a weight overhead in a gym"
          />
        </div>

        {/* ── BODY + STICKY RAIL ── */}
        <div className="post-shell">
          <div className="post-main">

            {/* ── ARTICLE HERO (deck + meta) ── */}
            <section className="article-hero">
              <div className="page">
                <p className="article-deck">
                  You can run and lift in the same week by keeping one hard session a day and
                  separating your hardest run from your heaviest leg day by at least 48 hours. Most
                  people with a job do well on three runs and two or three lifts. The mistake that
                  breaks people isn&rsquo;t volume, it&rsquo;s running every morning and lifting
                  every night with everything at medium-hard intensity.
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
                  Two sports, one body, five or six days a week, around a job that does not care
                  about your training. It works. It just needs a shape. Here&rsquo;s the week I run,
                  why it holds, and the mistake that quietly takes people out.
                </p>
              </div>
            </section>

            {/* ── THE TWO-A-DAY TRAP ── */}
            <section id="trap" className="article-body">
              <div className="page">
                <h2>The two-a-day trap</h2>
                <p>
                  Here&rsquo;s how it usually goes. Run most mornings, lift most nights, nothing on
                  paper tying the two together, just a good engine and the assumption that more is
                  more.
                </p>
                <p>
                  It feels incredible for about three weeks. Then it all shows up at once. Not one
                  big injury, just a body that stopped bouncing back. Legs flat every session, sleep
                  gone weird, a knee that starts talking on the stairs. The problem was never too
                  much work. It was too much hard work. Every run and every lift landing in the same
                  medium-hard middle, the zone where nothing is easy enough to recover from and
                  nothing is hard enough to make you better.
                </p>
                <p>
                  That middle is the trap. Two-a-days can work. They only work when one of the two is
                  genuinely easy.
                </p>
              </div>
            </section>

            {/* ── ONE HARD THING A DAY ── */}
            <section id="one-hard" className="article-body">
              <div className="page">
                <h2>The one-hard-thing-a-day rule</h2>
                <p>
                  You don&rsquo;t get fitter during the session. You get fitter after it, while you
                  recover from it. Which is why the whole week runs on one idea: one hard thing a
                  day, and only one.
                </p>
                <p>
                  Hard run day, the lift goes light or disappears. Heavy lift day, the run is easy or
                  it&rsquo;s off. When a hard run and a heavy leg day both want to be hard, they
                  don&rsquo;t sit next to each other, you put a good day between them. A{" "}
                  <a
                    href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5752732/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    systematic review of concurrent training
                  </a>{" "}
                  found the interference between lifting and endurance runs highest when you cram
                  both hard efforts into the same session, and eases when you give them room. Spacing
                  isn&rsquo;t fussy. It&rsquo;s the thing that lets both adaptations actually happen.
                </p>
                <p>
                  Practically, that&rsquo;s about 48 hours between your hardest run and your heaviest
                  leg day. Everything else on the calendar is easy, and easy means easy, not medium.
                </p>
              </div>
            </section>

            {/* ── A WEEK THAT HOLDS UP ── */}
            <section id="week" className="article-body">
              <div className="page">
                <h2>A week that holds up</h2>
                <p>
                  Here&rsquo;s a week that holds up for someone training around a full-time job.
                  Three runs, two lifts, built so the hard days never collide.
                </p>
                <ol className="week-plan">
                  {WEEK.map((d) => (
                    <li key={d.day}>
                      <strong>{d.day}</strong> {d.body}
                    </li>
                  ))}
                </ol>
                <p>
                  One caveat. If Monday&rsquo;s lift hammers your legs, keep Tuesday&rsquo;s quality
                  run short, or swap Tuesday and Wednesday so the easy run follows the heavy legs.
                  The rule that matters more than the exact days: your hardest run and your heaviest
                  leg day don&rsquo;t go back to back.
                </p>
              </div>
            </section>

            {/* ── SIGNS YOU'RE OVERDOING IT ── */}
            <section id="signs" className="article-body">
              <div className="page">
                <h2>Signs you&rsquo;re doing too much</h2>
                <p>
                  Even a good plan can tip over when life stacks up on top of it. The body sends the
                  same few signals every time. Watch for these.
                </p>
                <ul>
                  <li>Sleep gets worse even though you&rsquo;re more tired than usual</li>
                  <li>Easy runs quietly creep faster and your heart rate won&rsquo;t settle</li>
                  <li>A nagging spot that won&rsquo;t fully leave, the knee, the achilles, a hip</li>
                  <li>Three flat weeks in a row where nothing feels good and nothing improves</li>
                  <li>You&rsquo;re dreading sessions you used to look forward to</li>
                </ul>
                <p>
                  One of them, back off for a few days. Two or more, take the down week now, before
                  it takes it for you.
                </p>
              </div>
            </section>

            {/* ── STACKED VS ALTERNATING ── */}
            <section id="compare" className="article-body">
              <div className="page">
                <h2>Stacked same-day vs alternating days</h2>
                <p>
                  There&rsquo;s more than one way to arrange this. Two setups work for most people,
                  and the right one depends on your schedule more than your fitness.
                </p>
                <div className="swap-table">
                  <div className="swap-row swap-head">
                    <span>Stacked same-day</span>
                    <span>Alternating days</span>
                  </div>
                  <div className="swap-row">
                    <span><strong>Best for</strong> guarding whole rest days</span>
                    <span><strong>Best for</strong> an even, daily rhythm</span>
                  </div>
                  <div className="swap-row">
                    <span><strong>Risk</strong> both hard efforts drift to medium</span>
                    <span><strong>Risk</strong> easy days quietly turn hard</span>
                  </div>
                  <div className="swap-row">
                    <span><strong>Who it fits</strong> shift work, parents, packed weeks</span>
                    <span><strong>Who it fits</strong> steady, repeatable schedules</span>
                  </div>
                </div>
                <p>
                  Building toward a start line? Our{" "}
                  <a href="/culture/open-entry-races-2026">2026 race guide</a> has open-entry races
                  you can sign up for today. And if race week is the part that stresses you, the
                  piece on lifting through race week without losing your legs publishes August 4.
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

            {/* ── DISCLAIMER ── */}
            <section className="post-disclaimer-section">
              <div className="page">
                <p className="post-disclaimer">
                  This is general information, not medical or coaching advice. If you&rsquo;re
                  managing an injury or just starting out, check with a doctor or a coach first.
                </p>
              </div>
            </section>

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
