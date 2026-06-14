import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { PostSubscribe } from "@/components/PostAside";

export const metadata = {
  title: "June 2026 Running Shoe Drops, Suor Society",
  description:
    "June 2026 running shoe releases: Saucony Endorphin Elite 3 and Triumph 24, Puma's plateless Deviate Nitro, Asics GT-1000 15, and why plateless super trainers are the trend of the summer.",
};

const FAQS = [
  {
    q: "What is a plateless super trainer?",
    a: "A running shoe with a tall stack of high-end racing foam but no carbon plate. You get most of the bounce of a super shoe with a more natural, less rigid ride, usually at a lower price.",
  },
  {
    q: "What running shoes drop in June 2026?",
    a: "The Saucony Endorphin Elite 3 and Triumph 24 (both June 1), Puma's plateless Deviate Pure Nitro (June 4, $150), and the Asics GT-1000 15. The Asics Novablast 6 follows in July.",
  },
  {
    q: "Is the Endorphin Elite 3 worth $290?",
    a: "If you race a few times a year and want every advantage on the start line, maybe. As a daily trainer, no. It's built for race pace, and the price reflects that.",
  },
];

export default function JuneShoeDrops() {
  return (
    <>
      <SiteNav />

      <main className="post">
        {/* ── ARTICLE MASTHEAD (title above the cover) ── */}
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">The Dispatch &nbsp;/&nbsp; Gear</div>
            <h1 className="article-headline">
              June Shoe Drops: Saucony Goes Big, Puma Pulls the <span>Plate</span>
            </h1>
          </div>
        </section>

        {/* ── COVER IMAGE ── */}
        <div className="article-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/june-shoe-drops-hero.png"
            alt="June 2026 running shoe releases including the Saucony Endorphin Elite 3"
          />
        </div>

        {/* ── BODY + STICKY RAIL ── */}
        <div className="post-shell">
          <div className="post-main">

        {/* ── ARTICLE HERO (deck + meta) ── */}
        <section className="article-hero">
          <div className="page">
            <p className="article-deck">
              June is the biggest shoe month of the summer, and this one delivered. Here&rsquo;s what&rsquo;s worth
              knowing, and the one trend underneath all of it.
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
              June is the biggest shoe month of the summer, and this one delivered. Saucony dropped the
              Endorphin Elite 3 ($290) and the Triumph 24 on June 1, Puma&rsquo;s plateless Deviate Pure Nitro
              landed June 4 at $150, and the Asics GT-1000 15 ($115) is out now. The Asics Novablast 6
              follows in July.
            </p>
            <p>Here&rsquo;s what&rsquo;s worth knowing, and the one trend underneath all of it.</p>

            <h2>The drops</h2>
            <p>
              <strong>Saucony Endorphin Elite 3.</strong> The headline. 7.2 ounces, roughly 40mm of
              Saucony&rsquo;s ultra-soft IncrediRUN foam, carbon plate, aggressive rocker. This line has been
              all over the place (version one was firm, version two was a marshmallow), and version three
              reportedly keeps the softness while adding stability under the heel. At $290 it&rsquo;s a race day
              tool, full stop. Buy it for the start line, not for Tuesday.
            </p>
            <p>
              <strong>Saucony Triumph 24.</strong> The dependable max-cushion daily, refreshed June 1.
              Less exciting, more useful.
            </p>
            <p>
              <strong>Puma Deviate Pure Nitro.</strong> The interesting one. Out June 4 at $150: a tall
              slab of Puma&rsquo;s evolved NITROFOAM with no plate inside, 7.8 ounces, aimed straight at the
              Adidas Evo SL and Asics Superblast 3. Most of a super trainer&rsquo;s bounce at an everyday
              trainer price. More on why that matters in a second.
            </p>
            <p>
              <strong>Asics GT-1000 15.</strong> Stability daily at $115, which in 2026 pricing almost
              reads like a typo.
            </p>
            <p>
              <strong>Still coming:</strong> Novablast 6 in July, and the rumor mill says an Alphafly 4
              could land this fall.
            </p>

            <h2>The actual story: plates are becoming optional</h2>
            <p>
              Foams have gotten so good that brands are starting to pull the carbon plate out and the shoe
              still feels fast. That&rsquo;s the whole plateless super trainer category: big bouncy stack, no
              stiff plate, friendlier price, and a ride that works for more strides.
            </p>
            <p>
              For hybrid athletes specifically, this is the category to watch. A plated shoe on legs that
              squatted yesterday is a lot of load through the calves and achilles. In our experience, a
              forgiving plateless trainer is the easier daily when you&rsquo;re stacking lifting and running in
              the same week. Save the plate for race day.
            </p>
            <p>
              Speaking of race day, if you need somewhere to point all this new foam, our{" "}
              <a href="/racepicks">open entry race picks</a> have options with no lottery and no qualifier.
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
