import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import DownloadGate from "@/components/DownloadGate";
import { PostToc } from "@/components/PostAside";
import AuthorCard from "@/components/AuthorCard";
import { pageMeta, ArticleJsonLd, FaqJsonLd } from "@/lib/seo";
import races from "@/content/races-en.json";

const TOC = [
  { id: "california", label: "20 California Races" },
  { id: "us-races", label: "20 US Races" },
  { id: "faq", label: "Frequently Asked" },
  { id: "download", label: "Get the Guide" },
];

// No hreflang pair here: the pt-BR counterpart (/pt-br/culture/corridas-brasil-2026)
// is a regional Brazil guide, not a translation of this page.
const META = {
  path: "/culture/open-entry-races-2026",
  title: "Open Entry Races 2026, Suor Society",
  description:
    "Open entry races worth signing up for. No qualifier, no lottery. Dates, prices, and direct registration links.",
  image: "/race-hero.jpg",
};
export const metadata = pageMeta(META);

type Race = {
  num: string;
  name: string;
  where: string;
  body: string;
  dists: string;
  price: string;
  status: "open" | "limit" | "sold";
  statusLabel: string;
  url: string;
  /** ISO date this race's registration status was last confirmed against the
   *  official site. Read by scripts/content/check-stale-dates.mjs. */
  checked?: string;
};

// Race data lives in src/content/races-en.json — the PDF generator
// (scripts/generate-race-guide-pdf.js) renders the same file, so editing the
// JSON updates the page and the downloadable guide together.
const CA_RACES = races.ca as Race[];
const US_RACES = races.us as Race[];

// Bump both when the race list gets a full re-verification pass. VERIFIED is
// the only place the "as of" month is written; the FAQ and the download gate
// both read it, so they cannot drift apart.
const VERIFIED = "August 2026";
const GUIDE_SEASON = 2026;

// Every `where` value ends in the race year ("Nov 8, 2026", "Feb 2027").
const raceYear = (where: string) => Number(where.match(/(\d{4})\s*$/)?.[1] ?? GUIDE_SEASON);

function listSentence(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  // Several race names carry their own comma ("Beer City Half, Alameda"),
  // which makes a comma-separated list ambiguous. Switch to semicolons.
  const sep = items.some(i => i.includes(",")) ? ";" : ",";
  return `${items.slice(0, -1).join(`${sep} `)}${sep} and ${items[items.length - 1]}`;
}

// The "which races are still open" answer is generated from the race data
// rather than written by hand. The hand-written version silently contradicted
// the list for weeks after a sold-out sync in July 2026, because updating the
// JSON did not update the prose.
function caStatusAnswer(): string {
  const season = CA_RACES.filter(r => raceYear(r.where) <= GUIDE_SEASON);
  const next = CA_RACES.filter(r => raceYear(r.where) > GUIDE_SEASON);

  const label = (r: Race) => r.statusLabel.replace(/^Open · /, "");
  const parts: string[] = [];

  const open = season.filter(r => r.status === "open");
  if (open.length > 0) {
    parts.push(
      `Open right now: ${listSentence(
        open.map(r => (r.statusLabel === "Open Registration" ? r.name : `${r.name} (${label(r)})`))
      )}.`
    );
  }

  const limited = season.filter(r => r.status === "limit");
  if (limited.length > 0) {
    parts.push(
      `Partly open: ${listSentence(limited.map(r => `${r.name} (${r.statusLabel})`))}.`
    );
  }

  const sold = season.filter(r => r.status === "sold");
  if (sold.length > 0) {
    parts.push(
      `Sold out at standard entry: ${listSentence(sold.map(r => r.name))}. Check charity options on those.`
    );
  }

  // Deliberately neutral: this group mixes races whose 2026 edition has been
  // run and rolled forward with races that were always in the 2027 tail of the
  // guide. Nothing in the data separates the two, so claim only what is true
  // of both. Each race row spells out which it is.
  if (next.length > 0) {
    parts.push(
      `On next season's dates, each with its own registration window: ${listSentence(
        next.map(r => `${r.name} (${label(r)})`)
      )}.`
    );
  }

  return `As of ${VERIFIED}, here's where the California list stands. ${parts.join(" ")}`;
}

const FAQS = [
  {
    q: "What is an open entry race?",
    a: "An open entry race means you can register without meeting a time qualifier or winning a lottery. You pay the entry fee and you're in. Most road races work this way. The exceptions are Boston, New York, and Chicago. Those require either a qualifying time or lottery entry.",
  },
  {
    q: "Do I need to qualify to run a half marathon or marathon?",
    a: "For most races, no. Qualifying times are mainly required for the Boston Marathon and a few elite-invite events. Every race on this list is open to runners regardless of pace or experience.",
  },
  {
    q: "What does USATF-certified mean?",
    a: "USATF certification means the course distance has been officially measured and verified by USA Track & Field. This guarantees you ran the advertised distance. It matters for PRs and any future qualifying standard.",
  },
  {
    q: "Which California races are still open right now?",
    a: caStatusAnswer(),
  },
  {
    q: "Can a beginner run an open entry half marathon?",
    a: "Yes. None of the races on this list have a minimum pace requirement. Some have time cutoffs, usually 3.5 to 4 hours for a half marathon. Check each race's FAQ before registering if that's a concern.",
  },
  {
    q: "What's the best fall open entry marathon in the US?",
    a: "Twin Cities (October 4), Hartford (October 10), Steamtown (October 11), Baltimore (October 17), and Indianapolis Monumental (November 7) all have open entry and USATF certification. Steamtown, Hartford, and Indianapolis are the go-to options for runners targeting a PR.",
  },
];

function RaceRow({ race }: { race: Race }) {
  return (
    <div className="race-row">
      <span className="race-num">{race.num}</span>
      <div className="race-info">
        <div className="race-name">{race.name}</div>
        <div className="race-where">{race.where}</div>
        <p className="race-body">{race.body}</p>
        <div className="race-dists">{race.dists}</div>
        <div className={`race-status ${race.status}`}>{race.statusLabel}</div>
      </div>
      <div className="race-action">
        <span className="race-price">{race.price}</span>
        <a
          className="race-link"
          href={race.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Register →
        </a>
      </div>
    </div>
  );
}

export default function OpenEntryRaces2026() {
  return (
    <>
      <ArticleJsonLd {...META} datePublished="2026-06-14" dateModified="2026-08-03" />
      <FaqJsonLd faqs={FAQS} />
      {/* NAV */}
      <SiteNav />

      <main className="post">

        {/* ── ARTICLE MASTHEAD (title above the cover) ── */}
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">The Culture Archive &nbsp;/&nbsp; June 2026</div>
            <h1 className="article-headline">
              40 Open Entry Races in <span>California</span> and the US You Can Still Run in 2026
            </h1>
          </div>
        </section>

        {/* ── COVER IMAGE ── */}
        <div className="article-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/race-hero.jpg"
            alt="Thousands of runners at the start line of the Rock 'n' Roll San Diego Marathon and Half Marathon"
          />
        </div>

        {/* ── BODY + STICKY RAIL ── */}
        <div className="post-shell">
          <div className="post-main">

        {/* ── ARTICLE HERO (deck + meta) ── */}
        <section className="article-hero">
          <div className="page">
            <p className="article-deck">
              No qualifying time. No lottery. 20 California races, 20 across the US.
              From now through spring 2027. Every distance 5K to marathon, all USATF certified.
            </p>
            <div className="article-meta">
              <span>By <a href="/author/thais-oney">Thais Oney</a></span>
              <span>San Diego, CA</span>
              <span>June 2026</span>
            </div>
          </div>
        </section>

        {/* ── INTRO ── */}
        <section className="article-body">
          <div className="page">
            <p>
              It&rsquo;s race season. If you&rsquo;ve been waiting for the right moment to sign up for
              something, this is it. 40 open entry road races: 20 in California, 20 across the US.
              All USATF certified. All open to everyone, no matter how fast or slow you run.
            </p>
            <p>
              The rule for everything on this list: no qualifying time, no lottery. You register,
              you train, you show up. Races run from now through spring 2027, so there&rsquo;s a
              window for whatever you&rsquo;re building toward.
            </p>
            <p>
              A few notes. Prices go up as race day gets closer. A handful of these are sold out
              of standard entries but have charity or benefactor spots. We&rsquo;ve flagged the
              status on every one. Click through and verify before you register. Race capacity
              and pricing move fast.
            </p>
          </div>
        </section>

        {/* ── CALIFORNIA RACES ── */}
        <section id="california" style={{ borderBottom: "1px solid var(--line)", paddingBottom: "56px" }}>
          <div className="page">
            <div className="article-section-head">
              <div className="article-section-label">20 California Races</div>
              <div className="article-section-sub">Open Entry · Summer 2026 to Spring 2027</div>
            </div>
            <div className="race-list">
              {CA_RACES.map((r) => <RaceRow key={r.num} race={r} />)}
            </div>
          </div>
        </section>

        {/* ── US RACES ── */}
        <section id="us-races" style={{ borderBottom: "1px solid var(--line)", paddingBottom: "56px" }}>
          <div className="page">
            <div className="article-section-head">
              <div className="article-section-label">20 US Certified Races</div>
              <div className="article-section-sub">No Qualifier · All USATF Certified</div>
            </div>
            <div className="race-list">
              {US_RACES.map((r) => <RaceRow key={r.num} race={r} />)}
            </div>
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

        {/* ── DOWNLOAD GATE ── */}
        <section id="download" className="download-gate">
          <div className="page">
            <div className="gate-label">Free Download</div>
            <div className="gate-title">Get the<br />Full Guide</div>
            <p className="gate-desc">
              All 40 races in one formatted PDF. Dates, prices, distances, and
              direct registration links, ready to save, print, or share.
            </p>
            <ul className="gate-what">
              <li>20 California open entry races, summer 2026 to spring 2027</li>
              <li>20 top US USATF-certified races, no qualifier needed</li>
              <li>Every distance: 5K, 10K, Half Marathon, Full Marathon</li>
              <li>Current prices and direct registration links</li>
              <li>Availability and status updated {VERIFIED}</li>
            </ul>
            <DownloadGate />
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
