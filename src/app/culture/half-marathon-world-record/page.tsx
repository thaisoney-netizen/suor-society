import type { ReactNode } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ArticleCover from "@/components/ArticleCover";
import { PostToc } from "@/components/PostAside";
import AuthorCard from "@/components/AuthorCard";
import { pageMeta, ArticleJsonLd, FaqJsonLd } from "@/lib/seo";

const META = {
  path: "/culture/half-marathon-world-record",
  title: "Half Marathon World Record: Kejelcha Runs 56:51",
  description:
    "Yomif Kejelcha ran 56:51 at the Buenos Aires Half on August 23, 2026, taking 29 seconds off the record and becoming the first man under 57 minutes in a race that counts. The splits, the pace, and the asterisk on Kiplimo's 56:42.",
  image: "/half-marathon-record-hero.jpg",
};

// Photo credit for the cover. The cover is a library shot from London, not
// from the race this post covers, so the caption under it has to say so.
// FILL THIS IN before merging: the file's own EXIF caption is agency house
// style ("LONDON, ENGLAND - APRIL 26: Yomif Kejelcha of Team Ethiopia..."),
// so it needs a real credit string and a license to match. Empty renders no
// credit rather than a wrong one.
const PHOTO_CREDIT = "";
export const metadata = pageMeta({ ...META, paired: true });

const TOC = [
  { id: "what-happened", label: "What happened" },
  { id: "pace", label: "What 56:51 means" },
  { id: "sub-57", label: "The sub-57 asterisk" },
  { id: "progression", label: "How the record moved" },
  { id: "women", label: "The women's record" },
  { id: "crowd", label: "The other 31,500" },
  { id: "faq", label: "Frequently Asked" },
];

// Ratified marks only. Kiplimo's 56:42 from Barcelona is faster than all of
// these and is deliberately not in the table: it was never ratified, so it is
// not a link in the record chain. It gets its own section instead.
const PROGRESSION = [
  { time: "56:51", who: "Yomif Kejelcha, Buenos Aires, August 2026" },
  { time: "57:20", who: "Jacob Kiplimo, Lisbon, March 2026" },
  { time: "57:30", who: "Yomif Kejelcha, Valencia, October 2024" },
];

const FAQS: { q: string; a: ReactNode; plain?: string }[] = [
  {
    q: "What is the half marathon world record?",
    a: "56:51, run by Ethiopia's Yomif Kejelcha at the Media Maratón Ciudad de Buenos Aires on August 23, 2026. It took 29 seconds off the 57:20 Jacob Kiplimo ran in Lisbon in March, and it goes through the usual World Athletics ratification process before it is official.",
  },
  {
    q: "Has anyone run a half marathon faster than 56:51?",
    a: "Yes. Jacob Kiplimo ran 56:42 in Barcelona in February 2025, which is still the fastest half marathon anyone has run. World Athletics never ratified it, ruling that he had benefited from the slipstream of the lead car. So the fastest half ever run and the world record are two different times.",
  },
  {
    q: "What is the women's half marathon world record?",
    a: "1:02:52, set by Letesenbet Gidey in Valencia in October 2021. She is still the only woman to have gone under 63 minutes, and that record has now stood for nearly five years.",
  },
  {
    q: "What pace is a 56:51 half marathon?",
    a: "About 2:42 per kilometer, or 4:20 per mile. Put it on a track and it is roughly 65 seconds per lap, held for about 53 laps in a row without a break.",
  },
  {
    q: "What is a good half marathon time for a regular runner?",
    plain:
      "Most people finish somewhere between two hours and two and a half, and first-timers are usually past that. The elite record is a different sport, not a scoreboard you are on. If you want a start line of your own, our open entry race picks list races you can register for today.",
    a: (
      <>
        Most people finish somewhere between two hours and two and a half, and first-timers are
        usually past that. The elite record is a different sport, not a scoreboard you&rsquo;re on.
        If you want a start line of your own, our{" "}
        <a href="/culture/open-entry-races-2026">open entry race picks</a> list races you can
        register for today.
      </>
    ),
  },
];

export default function HalfMarathonWorldRecord() {
  return (
    <>
      <ArticleJsonLd {...META} datePublished="2026-08-23" />
      <FaqJsonLd faqs={FAQS} />
      <SiteNav />

      <main className="post">
        {/* ── ARTICLE MASTHEAD (title above the cover) ── */}
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">The Culture Archive &nbsp;/&nbsp; August 2026</div>
            <h1 className="article-headline">
              The Half Marathon World Record Is Now <span>56:51</span>
            </h1>
          </div>
        </section>

        {/* ── COVER IMAGE ── */}
        {/* Library shot from London in April, not from Buenos Aires. The
            caption below says so on purpose: without it the cover reads as
            him winning the race this post is about. */}
        <ArticleCover
          src="/half-marathon-record-hero.jpg"
          alt="Yomif Kejelcha running down The Mall to the London Marathon finish, Buckingham Palace behind him"
          caption={
            <>
              Kejelcha finishing second at the London Marathon in April, where his 1:59:41 was the
              fastest marathon debut ever run.{" "}
              {PHOTO_CREDIT && <span className="credit">Photo: {PHOTO_CREDIT}</span>}
            </>
          }
        />

        {/* ── BODY + STICKY RAIL ── */}
        <div className="post-shell">
          <div className="post-main">

            {/* ── ARTICLE HERO (deck + meta) ── */}
            <section className="article-hero">
              <div className="page">
                <p className="article-deck">
                  Yomif Kejelcha went through 10km in 27:19, dropped the entire field at kilometer
                  seven, and finished the Buenos Aires half in 56:51. That&rsquo;s 29 seconds off
                  Jacob Kiplimo&rsquo;s record and the first time a man has gone under 57 minutes in
                  a race that counts. The strange part: he got faster once he was alone.
                </p>
                <div className="article-meta">
                  <span>By <a href="/author/thais-oney">Thais Oney</a></span>
                  <span>San Diego, CA</span>
                  <span>August 2026</span>
                </div>
              </div>
            </section>

            {/* ── INTRO ── */}
            <section className="article-body">
              <div className="page">
                <p>
                  Sunday morning in Buenos Aires, 31,500 people on the start line of the Media
                  Maratón Ciudad de Buenos Aires. One of them covered 13.1 miles at 4:20 per mile.
                </p>
                <p>
                  Kejelcha is 29, Ethiopian, and he&rsquo;d already held this record once. He set it
                  in Valencia in October 2024 at 57:30, lost it to Kiplimo this spring, and just
                  took it back by a margin that makes his own old mark look slow.
                </p>
                <p>
                  He&rsquo;s also in the middle of an absurd year. Back in April he ran 1:59:41 on
                  his marathon debut in London, second behind Sabastian Sawe and the quickest debut
                  anyone has ever run. Four months later he owns the half marathon record too.
                </p>
              </div>
            </section>

            {/* ── WHAT HAPPENED ── */}
            <section id="what-happened" className="article-body">
              <div className="page">
                <h2>What happened in Buenos Aires</h2>
                <p>
                  He didn&rsquo;t wait around. Through 5km in 13:34 with the lead group still
                  attached, then at kilometer seven he went, with more than 14 kilometers left to
                  run. Nobody went with him.
                </p>
                <p>
                  His 10km split was 27:19. Worth noting that this was actually 19 seconds{" "}
                  <em>slower</em> than Kiplimo&rsquo;s 10km split on the way to his 57:20 in Lisbon.
                  So through a third of the race, Kejelcha was behind record pace and running by
                  himself.
                </p>
                <p>
                  Then he ran the last 11.1 kilometers in about 29:32, roughly 2:40 per kilometer.
                  Faster than his first half. Alone, on empty road, with nobody to chase and nobody
                  chasing him. That&rsquo;s the bit that&rsquo;s hard to get your head around.
                </p>
                <p>
                  In the women&rsquo;s race, Ethiopia&rsquo;s Fotyen Tesfay won in 1:03:57, well
                  clear of Nevin Can in 1:05:06.
                </p>
                <p>
                  The 56:51 still has to clear the standard World Athletics{" "}
                  <a
                    href="https://worldathletics.org/competitions/world-athletics-label-road-races/news/world-half-marathon-record-buenos-aires-2026-yomif-kejelcha"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ratification process
                  </a>
                  , which is not a formality in this event, as the next section explains.
                </p>
              </div>
            </section>

            {/* ── PACE ── */}
            <section id="pace" className="article-body">
              <div className="page">
                <h2>What 56:51 actually means</h2>
                <p>
                  Times at this level go a bit abstract, so here it is in units that mean something.
                  56:51 for a half marathon is about 2:42 per kilometer, or 4:20 per mile, held for
                  13.1 miles.
                </p>
                <p>
                  On a track that&rsquo;s 65 seconds a lap. Fifty-three laps of it, back to back, no
                  break. A lot of very fit people can hit one 65-second lap on a good day and are
                  fully cooked at the end of it. He did that fifty-three times and sped up.
                </p>
              </div>
            </section>

            {/* ── SUB 57 ── */}
            <section id="sub-57" className="article-body">
              <div className="page">
                <h2>The sub-57 asterisk nobody mentions</h2>
                <p>
                  Most headlines today are saying first man under 57 minutes. That needs one line of
                  context, because it isn&rsquo;t quite the same as fastest ever.
                </p>
                <p>
                  In February 2025 in Barcelona, Jacob Kiplimo ran <strong>56:42</strong>. Nine
                  seconds quicker than what Kejelcha just did. World Athletics declined to ratify it
                  after ruling that Kiplimo had picked up the slipstream of a car driving ahead of
                  him on the course.
                </p>
                <p>
                  So both things are true. The fastest half marathon anyone has ever run is 56:42,
                  and the half marathon world record is 56:51. Kejelcha is the first man under 57
                  minutes in conditions that qualify for the record, which is a real distinction and
                  a narrower claim than the headline version.
                </p>
              </div>
            </section>

            {/* ── PROGRESSION ── */}
            <section id="progression" className="article-body">
              <div className="page">
                <h2>How the record moved</h2>
                <p>
                  Three ratified marks in under two years, and two of the three are Kejelcha&rsquo;s.
                </p>

                <div className="swap-table">
                  <div className="swap-row swap-head">
                    <span>Time</span>
                    <span>Who, where, when</span>
                  </div>
                  {PROGRESSION.map((row, i) => (
                    <div key={i} className="swap-row">
                      <span>{row.time}</span>
                      <span>{row.who}</span>
                    </div>
                  ))}
                </div>

                <p>
                  Kiplimo&rsquo;s 56:42 isn&rsquo;t in there on purpose. It&rsquo;s faster than
                  every line in the table and it never entered the record chain.
                </p>
              </div>
            </section>

            {/* ── WOMEN'S RECORD ── */}
            <section id="women" className="article-body">
              <div className="page">
                <h2>The women&rsquo;s record is still Gidey&rsquo;s</h2>
                <p>
                  While the men&rsquo;s record has changed hands three times since late 2024, the
                  women&rsquo;s hasn&rsquo;t moved at all. Letesenbet Gidey ran{" "}
                  <strong>1:02:52</strong> in Valencia in October 2021 and no woman has been under 63
                  minutes before or since. Coming up on five years, which in this era of the sport is
                  a long time for anything to stand.
                </p>
              </div>
            </section>

            {/* ── THE CROWD ── */}
            <section id="crowd" className="article-body">
              <div className="page">
                <h2>The other 31,500</h2>
                <p>
                  The number I keep coming back to isn&rsquo;t 56:51. It&rsquo;s 31,500. That many
                  people ran the Media Maratón Ciudad de Buenos Aires on Sunday. Kejelcha&rsquo;s
                  world record and somebody&rsquo;s first ever 2:40 half happened on the same
                  streets, on the same morning, at the same race.
                </p>
                <p>
                  I ran my first half in May. Nowhere close to any of this, and I&rsquo;m not going
                  to dress the gap up as inspiring when it&rsquo;s just enormous. A 56:51 takes
                  genetics, altitude, a decade of work and a life where training <em>is</em> the job.
                  That&rsquo;s worth admiring on its own terms without turning it into a measuring
                  stick for a Tuesday evening run squeezed in after work.
                </p>
                <p>
                  Watch the record, it&rsquo;s a hell of a thing. Then go do your 40 minutes.
                  Both of those are running.
                </p>
                <p>
                  If Buenos Aires put a start line in your head, the{" "}
                  <a href="/culture/open-entry-races-2026">open entry race picks</a> are races you
                  can sign up for right now with no qualifier and no lottery, and{" "}
                  <a href="/culture/join-a-run-club-not-a-runner">a no-drop run club</a> is the
                  lower-stakes way in if a bib feels like a lot.
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
            {/* Long read: the rail carries the section links, not the
                signup card. Short posts get the card instead. */}
            <PostToc items={TOC} />
          </aside>
        </div>{/* /.post-shell */}

      </main>

      <SiteFooter />
    </>
  );
}
