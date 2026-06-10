"use client";

import { useState } from "react";

const CA_RACES = [
  {
    num: "01",
    name: "Beer City Half, Alameda",
    where: "Alameda, CA · July 11, 2026",
    body: "Flat, fast, USATF certified Bay Area waterfront course. Good summer tune-up option. Craft beer at the finish.",
    dists: "5K · 10K · Half Marathon",
    price: "Check site",
    status: "open" as const,
    statusLabel: "Open Registration",
    url: "https://www.runguides.com/california/runs/half-marathon/all",
  },
  {
    num: "02",
    name: "The San Francisco Marathon",
    where: "San Francisco, CA · July 25-26, 2026",
    body: "Golden Gate Park, across the bridge, through the city. Half marathon and shorter distances open. Full marathon sold out. Join the waitlist if that's your target.",
    dists: "5K · Half Marathon · Full Marathon",
    price: "From $165",
    status: "open" as const,
    statusLabel: "Open Registration",
    url: "https://www.thesfmarathon.com/",
  },
  {
    num: "03",
    name: "Napa to Sonoma Wine Country Half",
    where: "Napa, CA · July 25-26, 2026",
    body: "Point-to-point through active vineyards. Half marathon sold out. Rosé 5K still open. Use code N2SRG26 for $10 off.",
    dists: "Rosé 5K (July 25) · Half Marathon (July 26)",
    price: "From $208",
    status: "limit" as const,
    statusLabel: "5K Open · Half Sold Out",
    url: "https://www.runnapatosonoma.com/",
  },
  {
    num: "04",
    name: "Santa Rosa Marathon",
    where: "Sonoma County, CA · Aug 22-23, 2026",
    body: "Wine country roads, mostly flat, multi-distance weekend. Half marathon still open. Full sold out, so grab the half before that goes too.",
    dists: "5K · 10K · Half Marathon · Full Marathon",
    price: "From $114",
    status: "limit" as const,
    statusLabel: "Half Open · Full Sold Out",
    url: "https://santarosamarathon.com/",
  },
  {
    num: "05",
    name: "Californian Dreamin' Half Marathon",
    where: "Long Beach, CA · Aug 23, 2026",
    body: "Coastal SoCal course from Venice to Long Beach. Three distances starting under $60. Beach finish in August. Hard to beat this value for a certified coastal half.",
    dists: "5K · 10K · Half Marathon",
    price: "From $49.75",
    status: "open" as const,
    statusLabel: "Open Registration",
    url: "https://runsignup.com/Race/CA/LongBeach/CalifornianDreaminKKHalfMarathon",
  },
  {
    num: "06",
    name: "Beer City Half, Bishop Ranch",
    where: "San Ramon, CA · Sep 12, 2026",
    body: "East Bay edition. Multi-distance format with a 1-mile option. USATF certified. Good fall training block tune-up.",
    dists: "1 Mile · 5K · 10K · Half Marathon",
    price: "Check site",
    status: "open" as const,
    statusLabel: "Open Registration",
    url: "https://www.runguides.com/california/runs/half-marathon/all",
  },
  {
    num: "07",
    name: "2XU Long Beach Marathon",
    where: "Long Beach, CA · Oct 10-11, 2026",
    body: "One of SoCal's most consistent fall race weekends. City streets and coastline. October in Long Beach is as close to perfect race conditions as SoCal gets.",
    dists: "5K · Half Marathon · Full Marathon",
    price: "From $139",
    status: "open" as const,
    statusLabel: "Open Registration",
    url: "https://www.runlongbeach.com/",
  },
  {
    num: "08",
    name: "Two Cities Marathon",
    where: "Fresno/Clovis, CA · Nov 1, 2026",
    body: "Central Valley fall classic. Multi-distance, USATF certified, point-to-point. Smaller field, less hype, faster moves through registration.",
    dists: "5K · 10K · Half Marathon · Full Marathon",
    price: "Check site",
    status: "open" as const,
    statusLabel: "Open Registration",
    url: "https://www.run2cm.com/",
  },
  {
    num: "09",
    name: "Silverado Half Marathon & 10K",
    where: "Silverado, CA · Nov 7, 2026",
    body: "Orange County wine country, canyon roads, fall race day. Less crowded than the big city events. Certified, open entry.",
    dists: "10K · Half Marathon · Full Marathon",
    price: "Check site",
    status: "open" as const,
    statusLabel: "Open Registration",
    url: "https://www.runguides.com/california/runs/half-marathon/all",
  },
  {
    num: "10",
    name: "Santa Barbara Half Marathon & 5K",
    where: "Santa Barbara, CA · Nov 8, 2026",
    body: "Presented by HOKA. 13.1 along the coast plus a 5K and kids fun run. Sold out four weeks early in 2025. Expected to sell out earlier in 2026.",
    dists: "5K · Half Marathon",
    price: "Check site",
    status: "open" as const,
    statusLabel: "Open · Selling Fast",
    url: "https://santabarbarahalf.com/",
  },
  {
    num: "11",
    name: "Monterey Bay Half Marathon",
    where: "Monterey, CA · Nov 8, 2026",
    body: "Sold out in eight days. One of the most beautiful half courses in California. Charity and Race Benefactor spots are the path in.",
    dists: "Half Marathon",
    price: "Charity: $350+",
    status: "sold" as const,
    statusLabel: "General Sold Out · Charity Spots Open",
    url: "https://www.montereybayhalfmarathon.org/",
  },
  {
    num: "12",
    name: "Berkeley Half Marathon",
    where: "Berkeley, CA · Nov 15, 2026",
    body: "USATF certified East Bay course winding through Berkeley campus, downtown, and the marina. Mid-November race day with full fall conditions.",
    dists: "Half Marathon",
    price: "Check site",
    status: "open" as const,
    statusLabel: "Open Registration",
    url: "https://berkeleyhalfmarathon.com/",
  },
  {
    num: "13",
    name: "California International Marathon",
    where: "Sacramento, CA · Dec 6, 2026",
    body: "Net downhill, point-to-point, USATF and World Athletics certified. One of the fastest marathon courses in the US. All standard tiers sold out at record speed. Gold Entry Draw closed in May.",
    dists: "Full Marathon",
    price: "$230 (Gold)",
    status: "sold" as const,
    statusLabel: "Sold Out · Check Charity Options",
    url: "https://runsra.org/california-international-marathon/",
  },
  {
    num: "14",
    name: "San Diego Holiday Half Marathon & 5K",
    where: "San Diego, CA · Dec 19, 2026",
    body: "13.1 with a 711-foot net elevation drop along a rolling downhill bike path. A fast December half and a way to end the year with a PR attempt.",
    dists: "5K · Half Marathon",
    price: "Check site",
    status: "open" as const,
    statusLabel: "Open Registration",
    url: "https://www.sandiegoholidayhalf.com/",
  },
  {
    num: "15",
    name: "Carlsbad Marathon, Half & 5K",
    where: "Carlsbad, CA · Jan 17-18, 2027",
    body: "Coastal SoCal race down Carlsbad Boulevard with Pacific views for most of the course. Registration open early for the lowest pricing of the year.",
    dists: "5K · Half Marathon · Full Marathon",
    price: "Early bird pricing",
    status: "open" as const,
    statusLabel: "Open Registration",
    url: "https://inmotionevents.com/event/carlsbad-marathon/",
  },
  {
    num: "16",
    name: "Surf City Marathon & Half",
    where: "Huntington Beach, CA · Feb 2027",
    body: "Pacific Coast Highway through Huntington Beach on Super Bowl Sunday. Coastal, fast, surfboard finisher medal. Annual; 2027 dates expected to be announced.",
    dists: "5K · Half Marathon · Full Marathon",
    price: "Check site",
    status: "open" as const,
    statusLabel: "2027 Registration",
    url: "https://www.runsurfcity.com/",
  },
  {
    num: "17",
    name: "Los Angeles Marathon",
    where: "Los Angeles, CA · March 2027",
    body: "Stadium to the Sea, Dodger Stadium to Santa Monica. One of the most iconic point-to-point marathon courses in the country. Open entry, no qualifier.",
    dists: "Full Marathon",
    price: "Check site",
    status: "open" as const,
    statusLabel: "2027 Registration",
    url: "https://www.lamarathon.com/",
  },
  {
    num: "18",
    name: "Mountains 2 Beach Marathon & Half",
    where: "Ojai to Ventura, CA · April 2027",
    body: "Net downhill from Ojai to the Ventura coast. Known as one of the fastest BQ marathon courses in California. Annual; 2027 registration opens fall 2026.",
    dists: "Half Marathon · Full Marathon",
    price: "Check site",
    status: "open" as const,
    statusLabel: "2027 Registration",
    url: "https://www.mountains2beachmarathon.com/",
  },
  {
    num: "19",
    name: "Hoag OC Marathon Running Festival",
    where: "Costa Mesa, CA · May 2027",
    body: "Annual SoCal weekend with marathon, half, 5K, and combo challenges. Course finishes at OC Fair & Event Center. Open entry, multi-distance.",
    dists: "5K · Half Marathon · Full Marathon",
    price: "Check site",
    status: "open" as const,
    statusLabel: "2027 Registration",
    url: "https://ocmarathon.com/",
  },
  {
    num: "20",
    name: "Rock 'n' Roll San Diego",
    where: "San Diego, CA · May 2027",
    body: "Balboa Park start, finish in Little Italy, live music every mile. Annual SoCal classic. 2027 registration opens late 2026.",
    dists: "5K · Half Marathon · Full Marathon",
    price: "Check site",
    status: "open" as const,
    statusLabel: "2027 Registration",
    url: "https://www.runrocknroll.com/events/san-diego",
  },
];

const US_RACES = [
  {
    num: "01",
    name: "Stars & Stripes Half Marathon",
    where: "Hoffman Estates, IL · Jun 27, 2026",
    body: "USATF certified, open entry. Solid summer race in the Chicago suburbs celebrating America's 250th. Special edition 250th anniversary shirts.",
    dists: "5K · 10K · Half Marathon",
    price: "Check site",
    status: "open" as const,
    statusLabel: "Open Registration",
    url: "https://allcommunityevents.com/starsandstripesrun",
  },
  {
    num: "02",
    name: "Northside Hospital Peachtree Road Race",
    where: "Atlanta, GA · July 4, 2026",
    body: "The largest 10K in the world. 60,000 runners. USATF certified. Running a 10K in Atlanta on the Fourth is a specific kind of experience.",
    dists: "10K",
    price: "$60 to $80",
    status: "open" as const,
    statusLabel: "Late Registration Open",
    url: "https://www.atlantatrackclub.org/",
  },
  {
    num: "03",
    name: "Tunnel Light Marathon",
    where: "Snoqualmie Pass, WA · Sep 17, 2026",
    body: "Net downhill point-to-point through the old Iron Horse rail tunnel and along the Snoqualmie Valley Trail. USATF certified. Cult favorite for PR attempts.",
    dists: "Half Marathon · Full Marathon",
    price: "Check site",
    status: "open" as const,
    statusLabel: "Open Registration",
    url: "https://www.tunnelmarathon.com/",
  },
  {
    num: "04",
    name: "Life Time Chicago Half Marathon & 5K",
    where: "Chicago, IL · Sep 27, 2026",
    body: "Big-city feel without the lottery. Welcoming crowds, energetic course support. USATF certified. Open registration, no qualifier.",
    dists: "5K · Half Marathon",
    price: "Check site",
    status: "open" as const,
    statusLabel: "Open Registration",
    url: "https://www.chicagohalf.com/",
  },
  {
    num: "05",
    name: "Twin Cities Marathon",
    where: "Minneapolis-St. Paul, MN · Oct 4, 2026",
    body: "Consistently called the Most Beautiful Urban Marathon. Lakes, parks, fall foliage, city streets. Open entry, no lottery, no qualifier. Register and go.",
    dists: "10K · Half Marathon · Full Marathon",
    price: "Check site",
    status: "open" as const,
    statusLabel: "Open Registration",
    url: "https://www.tcmevents.org/",
  },
  {
    num: "06",
    name: "Hartford Marathon & Half Marathon",
    where: "Hartford, CT · Oct 10, 2026",
    body: "Flat, fast, USATF certified. A popular Boston qualifier attempt course because the consistency is that good. Open registration, rarely sells out early.",
    dists: "Half Marathon · Full Marathon",
    price: "Check site",
    status: "open" as const,
    statusLabel: "Open Registration",
    url: "https://hartfordmarathon.com/",
  },
  {
    num: "07",
    name: "Steamtown Marathon",
    where: "Scranton, PA · Oct 11, 2026",
    body: "Point-to-point, significant net downhill, USATF certified. Runners who are serious about a PR target Steamtown specifically for the course profile. Small field. Open entry.",
    dists: "Full Marathon",
    price: "Check site",
    status: "open" as const,
    statusLabel: "Open Registration",
    url: "https://steamtownmarathon.com/",
  },
  {
    num: "08",
    name: "Baltimore Running Festival",
    where: "Baltimore, MD · Oct 17, 2026",
    body: "26th annual event with a scenic harbor course. USATF certified, open entry, multi-distance. Bring a crew at different fitness levels.",
    dists: "5K · Half Marathon · Full Marathon",
    price: "Check site",
    status: "open" as const,
    statusLabel: "Open Registration",
    url: "https://www.thebaltimoremarathon.com/",
  },
  {
    num: "09",
    name: "Rocket Mortgage Detroit Free Press",
    where: "Detroit, MI · Oct 18, 2026",
    body: "International Half crosses the Ambassador Bridge into Windsor and back through the tunnel. Marathon and Motor City Half are sold out. International Half still open through Sep 8.",
    dists: "5K · International Half · 1 Mile",
    price: "Check site",
    status: "limit" as const,
    statusLabel: "Intl Half Open · Marathon Sold Out",
    url: "https://www.freepmarathon.com/",
  },
  {
    num: "10",
    name: "Marine Corps Marathon",
    where: "Arlington, VA / Washington D.C. · Oct 25, 2026",
    body: "No prize money. No elite wave. Just runners. The course goes past the Lincoln Memorial and through D.C. landmarks. General registration sold out. Charity spots open through July 31.",
    dists: "10K · Full Marathon",
    price: "$240 (Military $225)",
    status: "limit" as const,
    statusLabel: "Charity Spots Open",
    url: "https://www.marinemarathon.com/event/marine-corps-marathon/",
  },
  {
    num: "11",
    name: "CNO Financial Indianapolis Monumental",
    where: "Indianapolis, IN · Nov 7, 2026",
    body: "Flat, fast, USATF certified. Open registration, no lottery, no qualifier. One of the most runner-friendly big-city race setups in the country.",
    dists: "5K · Half Marathon · Full Marathon",
    price: "Check site",
    status: "open" as const,
    statusLabel: "Open Registration",
    url: "https://monumentalmarathon.com/",
  },
  {
    num: "12",
    name: "Savannah Southern Half Marathon & 5K",
    where: "Savannah, GA · Nov 14, 2026",
    body: "13.1 through Savannah's historic squares, oak-lined streets, and a finish through Savannah Bananas' Grayson Stadium. Promo code available for $10 off.",
    dists: "5K · Half Marathon",
    price: "Check site",
    status: "open" as const,
    statusLabel: "Open Registration",
    url: "https://www.southernhalf.com/",
  },
  {
    num: "13",
    name: "Allianz Richmond Marathon",
    where: "Richmond, VA · Nov 14, 2026",
    body: "Called America's Friendliest Marathon. USATF sanctioned, certified, and a top Boston qualifier course. Capacity limited but registration currently open.",
    dists: "8K · Half Marathon · Full Marathon",
    price: "Check site",
    status: "open" as const,
    statusLabel: "Open Registration",
    url: "https://www.richmondmarathon.org/",
  },
  {
    num: "14",
    name: "Philadelphia Marathon Weekend",
    where: "Philadelphia, PA · Nov 20-22, 2026",
    body: "Full marathon sold out. Half marathon and 8K still open. Certified course through historic Philly. No qualifier for remaining distances.",
    dists: "8K · Half Marathon",
    price: "Check site",
    status: "limit" as const,
    statusLabel: "Half & 8K Open · Full Sold Out",
    url: "https://www.philadelphiamarathon.com/",
  },
  {
    num: "15",
    name: "BMW Dallas Marathon Festival",
    where: "Dallas, TX · Dec 11-13, 2026",
    body: "55th year. New dynamic pricing model so the earlier you register the less you pay. Multi-distance fall race weekend in downtown Dallas.",
    dists: "5K · 10K · Half Marathon · Full Marathon",
    price: "Dynamic pricing",
    status: "open" as const,
    statusLabel: "Open Registration",
    url: "https://dallasmarathon.com/",
  },
  {
    num: "16",
    name: "JAL Honolulu Marathon",
    where: "Honolulu, HI · Dec 13, 2026",
    body: "No qualifier, no cutoff time, ages 7 and up. The course runs from Ala Moana through Waikiki, around Diamond Head, and back. Bucket-list December marathon.",
    dists: "Merrie Mile · 10K · Full Marathon",
    price: "Check site",
    status: "open" as const,
    statusLabel: "Open Registration",
    url: "https://www.honolulumarathon.org/",
  },
  {
    num: "17",
    name: "Chevron Houston Marathon Weekend",
    where: "Houston, TX · Jan 15-17, 2027",
    body: "Aramco Houston Half on Sunday Jan 17. Flat, fast, USATF certified. Registration runs Nov 1, 2026 through early January.",
    dists: "5K · Half Marathon · Full Marathon",
    price: "Check site",
    status: "open" as const,
    statusLabel: "2027 Registration",
    url: "https://www.chevronhoustonmarathon.com/",
  },
  {
    num: "18",
    name: "Cherry Blossom Ten Mile",
    where: "Washington D.C. · April 2027",
    body: "Tidal Basin, cherry trees in peak bloom, ten flat miles. Annual lottery for general entry; charity bibs available. USATF certified.",
    dists: "5K · 10 Mile",
    price: "Check site",
    status: "limit" as const,
    statusLabel: "Lottery + Charity Entries",
    url: "https://www.cherryblossom.org/",
  },
  {
    num: "19",
    name: "Crescent City Classic 10K",
    where: "New Orleans, LA · April 2027",
    body: "One of the oldest 10Ks in the country. Course goes through downtown New Orleans, the French Quarter, and Esplanade Ave. USATF certified. 2027 registration open.",
    dists: "10K",
    price: "$55 to $80",
    status: "open" as const,
    statusLabel: "2027 Registration Open",
    url: "https://ccc10k.com/",
  },
  {
    num: "20",
    name: "NYCRUNS Brooklyn Spring Half",
    where: "Brooklyn, NY · April 25, 2027",
    body: "Prospect Park loop course. NYCRUNS runs a clean operation: easy bib pickup, USATF certified, no lottery. The Brooklyn half marathon without the Brooklyn half wait list.",
    dists: "5K · Half Marathon",
    price: "Check site",
    status: "open" as const,
    statusLabel: "2027 Registration",
    url: "https://brooklynexperience.com/",
  },
];

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
    a: "As of June 2026: San Francisco Marathon (half and shorter), Santa Rosa Marathon (half only), Californian Dreamin' in Long Beach, Beer City Half in Alameda (July) and San Ramon (September), 2XU Long Beach Marathon, Two Cities (Fresno/Clovis), Silverado, Santa Barbara Half (selling fast), Berkeley Half, San Diego Holiday Half, and Napa to Sonoma Rosé 5K. Monterey Bay and CIM are sold out — check charity options. 2027 races (Carlsbad, Surf City, LA, Mountains 2 Beach, OC, Rock 'n' Roll San Diego) are listed with annual registration windows.",
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

function RaceRow({ race }: { race: typeof CA_RACES[0] }) {
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

function DownloadGate() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState(false);
  const [loading, setLoading]     = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    setLoading(true);

    const form  = e.currentTarget;
    const name  = (form.elements.namedItem("name")  as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    try {
      const res = await fetch("/api/race-guide", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name, email }),
      });
      if (!res.ok) throw new Error("server");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="gate-success">
        <div className="gate-success-tag">You&rsquo;re in</div>
        <div className="gate-success-title">Your<br />Guide<br />Is Ready.</div>
        <p className="gate-success-body">
          40 open entry races. 20 in California, 20 across the US.
          All certified. From now through spring 2027.
        </p>
        <a
          className="gate-download-btn"
          href="/2026-race-guide.pdf"
          download="2026_Race_Guide_SuorSociety.pdf"
        >
          Download the PDF →
        </a>
      </div>
    );
  }

  return (
    <form className="gate-form" onSubmit={handleSubmit} noValidate>
      <div className="gate-field">
        <label className="gate-field-label" htmlFor="gate-name">First Name</label>
        <input
          id="gate-name"
          className="gate-input"
          type="text"
          name="name"
          placeholder="Your name"
          autoComplete="given-name"
        />
      </div>

      <div className="gate-field">
        <label className="gate-field-label" htmlFor="gate-email">
          Email *
        </label>
        <input
          id="gate-email"
          className="gate-input"
          type="email"
          name="email"
          placeholder="you@somewhere.com"
          required
          autoComplete="email"
        />
      </div>

      <button
        type="submit"
        className="gate-btn"
        disabled={loading}
      >
        {loading ? "Sending…" : "Get the Guide →"}
      </button>

      {error && (
        <p className="gate-error">
          Something went wrong. Email us at hello@suorsociety.com and we&rsquo;ll send it directly.
        </p>
      )}

      <p className="gate-fine">No spam. Just the guide. Unsubscribe any time.</p>
    </form>
  );
}

export default function CultureArchive() {
  return (
    <>
      {/* NAV */}
      <header className="site-nav">
        <div className="page nav-row">
          <a href="/" className="wm" aria-label="Suor Society, home">
            <span className="wm-suor wm-suor--dark">SUOR</span>
            <span className="wm-society wm-society--dark">SOCIETY</span>
          </a>
          <div className="nav-links">
            <a href="/#about"   className="nav-link nav-link--dark">About</a>
            <a href="/culture"  className="nav-link nav-link--dark">The Culture</a>
          </div>
        </div>
      </header>

      <main>

        {/* ── COVER IMAGE ── */}
        <div className="article-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/race-hero.jpg"
            alt="Thousands of runners at the start line of the Rock 'n' Roll San Diego Marathon and Half Marathon"
          />
        </div>

        {/* ── ARTICLE HERO ── */}
        <section className="article-hero">
          <div className="page">
            <div className="article-eye">The Culture Archive &nbsp;/&nbsp; June 2026</div>
            <h1 className="article-headline">
              40 Open Entry Races in <span>California</span> and the US You Can Still Run
            </h1>
            <p className="article-deck">
              No qualifying time. No lottery. 20 California races, 20 across the US.
              From now through spring 2027. Every distance 5K to marathon, all USATF certified.
            </p>
            <div className="article-meta">
              <span>Suor Society</span>
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
              status on every one. Click through and verify before you register — race capacity
              and pricing move fast.
            </p>
          </div>
        </section>

        {/* ── CALIFORNIA RACES ── */}
        <section style={{ borderBottom: "1px solid var(--line)", paddingBottom: "56px" }}>
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
        <section style={{ borderBottom: "1px solid var(--line)", paddingBottom: "56px" }}>
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

        {/* ── DOWNLOAD GATE ── */}
        <section className="download-gate">
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
              <li>Availability and status updated June 2026</li>
            </ul>
            <DownloadGate />
          </div>
        </section>

        {/* ── FOLLOW ── */}
        <section className="follow-us">
          <div className="page">
            <p className="follow-label">Follow us</p>
            <a
              href="https://instagram.com/suorsociety"
              className="follow-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </section>

      </main>

      <footer className="footer">
        <div className="page foot-row">
          <span className="foot-wm">SUOR SOCIETY</span>
          <span className="foot-loc">San Diego</span>
        </div>
      </footer>
    </>
  );
}
