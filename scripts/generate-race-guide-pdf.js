// Generates the Suor Society 2026 Race Guide PDF.
// Run with: node scripts/generate-race-guide-pdf.js
// Outputs: public/2026-race-guide.pdf
//
// To update content: edit CA_RACES / US_RACES below to mirror src/app/culture/page.tsx.

const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

// ─── DATA — keep in sync with src/app/race-picks/page.tsx ───
const CA_RACES = [
  { num: "01", name: "Beer City Half, Alameda", where: "Alameda, CA · July 11, 2026", body: "Flat, fast, USATF certified Bay Area waterfront course. Good summer tune-up option. Craft beer at the finish.", dists: "5K · 10K · Half Marathon", price: "From $27.50", status: "open", statusLabel: "Open Registration", url: "https://www.alamedapint.com/" },
  { num: "02", name: "The San Francisco Marathon", where: "San Francisco, CA · July 25-26, 2026", body: "Golden Gate Park, across the bridge, through the city. Half marathon and shorter distances open. Full marathon sold out.", dists: "5K · Half Marathon · Full Marathon", price: "From $165", status: "open", statusLabel: "Open Registration", url: "https://www.thesfmarathon.com/" },
  { num: "03", name: "Napa to Sonoma Wine Country Half", where: "Napa, CA · July 25-26, 2026", body: "Point-to-point through active vineyards. Half marathon sold out. Rosé 5K still open. Code N2SRG26 for $10 off.", dists: "Rosé 5K · Half Marathon", price: "From $208", status: "limit", statusLabel: "5K Open · Half Sold Out", url: "https://www.runnapatosonoma.com/" },
  { num: "04", name: "Santa Rosa Marathon", where: "Sonoma County, CA · Aug 22-23, 2026", body: "Wine country roads, mostly flat, multi-distance weekend. Half marathon still open. Full sold out.", dists: "5K · 10K · Half · Full Marathon", price: "From $114", status: "limit", statusLabel: "Half Open · Full Sold Out", url: "https://santarosamarathon.com/" },
  { num: "05", name: "Californian Dreamin' Half Marathon", where: "Long Beach, CA · Aug 23, 2026", body: "Coastal SoCal course from Venice to Long Beach. Three distances starting under $60. Beach finish in August.", dists: "5K · 10K · Half Marathon", price: "From $49.75", status: "open", statusLabel: "Open Registration", url: "https://runsignup.com/Race/CA/LongBeach/CalifornianDreaminKKHalfMarathon" },
  { num: "06", name: "Beer City Half, Bishop Ranch", where: "San Ramon, CA · Sep 12, 2026", body: "East Bay edition. Multi-distance format with a 1-mile option. USATF certified. Good fall training tune-up.", dists: "1 Mile · 5K · 10K · Half", price: "Check site", status: "open", statusLabel: "Open Registration", url: "https://runsignup.com/Race/CA/SanRamon/BeerCityBishopRanch" },
  { num: "07", name: "2XU Long Beach Marathon", where: "Long Beach, CA · Oct 10-11, 2026", body: "One of SoCal's most consistent fall race weekends. City streets and coastline. October weather is as good as it gets.", dists: "5K · Half · Full Marathon", price: "From $139", status: "open", statusLabel: "Open Registration", url: "https://www.runlongbeach.com/" },
  { num: "08", name: "Two Cities Marathon", where: "Fresno/Clovis, CA · Nov 1, 2026", body: "Central Valley fall classic. Multi-distance, USATF certified, point-to-point. Smaller field, less hype.", dists: "5K · 10K · Half · Full Marathon", price: "Check site", status: "open", statusLabel: "Open Registration", url: "https://www.run2cm.com/" },
  { num: "09", name: "Saddleback Marathon, Half & 10K", where: "Silverado, CA · Nov 7, 2026", body: "Orange County trail race out of Black Star Canyon, running since 1988. Less crowded than the big city events.", dists: "10K · 25K · Half · Full Marathon", price: "Check site", status: "open", statusLabel: "Open Registration", url: "https://otrraces.com/" },
  { num: "10", name: "Santa Barbara Half Marathon & 5K", where: "Santa Barbara, CA · Nov 8, 2026", body: "Presented by HOKA. 13.1 along the coast plus a 5K and kids fun run. Sold out four weeks early in 2025.", dists: "5K · Half Marathon", price: "Check site", status: "open", statusLabel: "Open · Selling Fast", url: "https://santabarbarahalf.com/" },
  { num: "11", name: "Monterey Bay Half Marathon", where: "Monterey, CA · Nov 8, 2026", body: "Sold out in eight days. One of the most beautiful half courses in California. Charity spots are the path in.", dists: "Half Marathon", price: "Charity: $350+", status: "sold", statusLabel: "General Sold Out · Charity Spots", url: "https://www.montereybayhalfmarathon.org/" },
  { num: "12", name: "Berkeley Half Marathon", where: "Berkeley, CA · Nov 15, 2026", body: "USATF certified East Bay course winding through Berkeley campus, downtown, and the marina.", dists: "Half Marathon", price: "Check site", status: "open", statusLabel: "Open Registration", url: "https://berkeleyhalfmarathon.com/" },
  { num: "13", name: "California International Marathon", where: "Sacramento, CA · Dec 6, 2026", body: "Net downhill, point-to-point, USATF and World Athletics certified. One of the fastest marathon courses in the US.", dists: "Full Marathon", price: "$230 (Gold)", status: "sold", statusLabel: "Sold Out · Check Charity Options", url: "https://runsra.org/california-international-marathon/" },
  { num: "14", name: "San Diego Holiday Half & 5K", where: "San Diego, CA · Dec 19, 2026", body: "13.1 with a 711-foot net elevation drop along a rolling downhill bike path. End the year with a PR attempt.", dists: "5K · Half Marathon", price: "Check site", status: "open", statusLabel: "Open Registration", url: "https://www.sandiegoholidayhalf.com/" },
  { num: "15", name: "Carlsbad Marathon, Half & 5K", where: "Carlsbad, CA · Jan 17-18, 2027", body: "Coastal SoCal race down Carlsbad Boulevard with Pacific views for most of the course.", dists: "5K · Half · Full Marathon", price: "Early bird pricing", status: "open", statusLabel: "Open Registration", url: "https://inmotionevents.com/event/carlsbad-marathon/" },
  { num: "16", name: "Surf City Marathon & Half", where: "Huntington Beach, CA · Feb 2027", body: "Pacific Coast Highway through Huntington Beach on Super Bowl Sunday. Surfboard finisher medal.", dists: "5K · Half · Full Marathon", price: "Check site", status: "open", statusLabel: "2027 Registration", url: "https://www.runsurfcity.com/" },
  { num: "17", name: "Los Angeles Marathon", where: "Los Angeles, CA · March 2027", body: "Stadium to the Sea. Dodger Stadium to Santa Monica. One of the most iconic point-to-point courses in the country.", dists: "Full Marathon", price: "Check site", status: "open", statusLabel: "2027 Registration", url: "https://www.lamarathon.com/" },
  { num: "18", name: "Mountains 2 Beach Marathon & Half", where: "Ojai to Ventura, CA · April 2027", body: "Net downhill from Ojai to the Ventura coast. One of the fastest BQ courses in California.", dists: "Half · Full Marathon", price: "Check site", status: "open", statusLabel: "2027 Registration", url: "https://www.mountains2beachmarathon.com/" },
  { num: "19", name: "Hoag OC Marathon Running Festival", where: "Costa Mesa, CA · May 2027", body: "Annual SoCal weekend with marathon, half, 5K, and combo challenges. Open entry, multi-distance.", dists: "5K · Half · Full Marathon", price: "Check site", status: "open", statusLabel: "2027 Registration", url: "https://ocmarathon.com/" },
  { num: "20", name: "Rock 'n' Roll San Diego", where: "San Diego, CA · May 2027", body: "Balboa Park start, finish in Little Italy, live music every mile. Annual SoCal classic.", dists: "5K · Half · Full Marathon", price: "Check site", status: "open", statusLabel: "2027 Registration", url: "https://www.runrocknroll.com/events/san-diego" },
];

const US_RACES = [
  { num: "01", name: "Stars & Stripes Half Marathon", where: "Hoffman Estates, IL · Jun 27, 2026", body: "USATF certified, open entry. Summer race in the Chicago suburbs celebrating America's 250th.", dists: "5K · 10K · Half Marathon", price: "Check site", status: "open", statusLabel: "Open Registration", url: "https://allcommunityevents.com/starsandstripesrun" },
  { num: "02", name: "Peachtree Road Race", where: "Atlanta, GA · July 4, 2026", body: "The largest 10K in the world. 60,000 runners. USATF certified. A 10K in Atlanta on the Fourth is a specific kind of experience.", dists: "10K", price: "$60 to $80", status: "open", statusLabel: "Late Registration Open", url: "https://www.atlantatrackclub.org/" },
  { num: "03", name: "Tunnel Light Marathon", where: "Snoqualmie Pass, WA · Sep 17, 2026", body: "Net downhill point-to-point through the old Iron Horse rail tunnel. Cult favorite for PR attempts.", dists: "Half · Full Marathon", price: "Check site", status: "open", statusLabel: "Open Registration", url: "https://www.tunnelmarathon.com/" },
  { num: "04", name: "Life Time Chicago Half Marathon & 5K", where: "Chicago, IL · Sep 27, 2026", body: "Big-city feel without the lottery. Welcoming crowds, energetic course support. USATF certified.", dists: "5K · Half Marathon", price: "Check site", status: "open", statusLabel: "Open Registration", url: "https://www.chicagohalf.com/" },
  { num: "05", name: "Twin Cities Marathon", where: "Minneapolis-St. Paul, MN · Oct 4, 2026", body: "Consistently called the Most Beautiful Urban Marathon. Lakes, parks, fall foliage. Open entry, no qualifier.", dists: "10K · Half · Full Marathon", price: "Check site", status: "open", statusLabel: "Open Registration", url: "https://www.tcmevents.org/" },
  { num: "06", name: "Hartford Marathon & Half", where: "Hartford, CT · Oct 10, 2026", body: "Flat, fast, USATF certified. A popular Boston qualifier course. Rarely sells out early.", dists: "Half · Full Marathon", price: "Check site", status: "open", statusLabel: "Open Registration", url: "https://hartfordmarathon.com/" },
  { num: "07", name: "Steamtown Marathon", where: "Scranton, PA · Oct 11, 2026", body: "Point-to-point, significant net downhill, USATF certified. Serious runners target this course for PRs.", dists: "Full Marathon", price: "Check site", status: "open", statusLabel: "Open Registration", url: "https://steamtownmarathon.com/" },
  { num: "08", name: "Baltimore Running Festival", where: "Baltimore, MD · Oct 17, 2026", body: "26th annual event with a scenic harbor course. USATF certified, open entry, multi-distance.", dists: "5K · Half · Full Marathon", price: "Check site", status: "open", statusLabel: "Open Registration", url: "https://www.thebaltimoremarathon.com/" },
  { num: "09", name: "Rocket Mortgage Detroit Free Press", where: "Detroit, MI · Oct 18, 2026", body: "International Half crosses the Ambassador Bridge into Windsor. Marathon and Motor City Half are sold out.", dists: "5K · International Half · 1 Mile", price: "Check site", status: "limit", statusLabel: "Intl Half Open · Marathon Sold Out", url: "https://www.freepmarathon.com/" },
  { num: "10", name: "Marine Corps Marathon", where: "Arlington / D.C. · Oct 25, 2026", body: "No prize money, no elite wave. Goes past the Lincoln Memorial and through D.C. landmarks. Charity through Jul 31.", dists: "10K · Full Marathon", price: "$240 (Military $225)", status: "limit", statusLabel: "Charity Spots Open", url: "https://www.marinemarathon.com/event/marine-corps-marathon/" },
  { num: "11", name: "CNO Indianapolis Monumental", where: "Indianapolis, IN · Nov 7, 2026", body: "Flat, fast, USATF certified. Open registration, no lottery, no qualifier. One of the most runner-friendly setups.", dists: "5K · Half · Full Marathon", price: "Check site", status: "open", statusLabel: "Open Registration", url: "https://monumentalmarathon.com/" },
  { num: "12", name: "Savannah Southern Half & 5K", where: "Savannah, GA · Nov 14, 2026", body: "Through historic squares and oak-lined streets. Finish through Savannah Bananas' Grayson Stadium.", dists: "5K · Half Marathon", price: "Check site", status: "open", statusLabel: "Open Registration", url: "https://www.southernhalf.com/" },
  { num: "13", name: "Allianz Richmond Marathon", where: "Richmond, VA · Nov 14, 2026", body: "America's Friendliest Marathon. USATF sanctioned and certified. A top Boston qualifier course.", dists: "8K · Half · Full Marathon", price: "Check site", status: "open", statusLabel: "Open Registration", url: "https://www.richmondmarathon.org/" },
  { num: "14", name: "Philadelphia Marathon Weekend", where: "Philadelphia, PA · Nov 20-22, 2026", body: "Full marathon sold out. Half marathon and 8K still open. Certified course through historic Philly.", dists: "8K · Half Marathon", price: "Check site", status: "limit", statusLabel: "Half & 8K Open · Full Sold Out", url: "https://www.philadelphiamarathon.com/" },
  { num: "15", name: "BMW Dallas Marathon Festival", where: "Dallas, TX · Dec 11-13, 2026", body: "55th year. Dynamic pricing. Register earlier, pay less. Multi-distance downtown Dallas weekend.", dists: "5K · 10K · Half · Full Marathon", price: "Dynamic pricing", status: "open", statusLabel: "Open Registration", url: "https://dallasmarathon.com/" },
  { num: "16", name: "JAL Honolulu Marathon", where: "Honolulu, HI · Dec 13, 2026", body: "No qualifier, no cutoff, ages 7+. Ala Moana through Waikiki, around Diamond Head. Bucket-list December marathon.", dists: "Merrie Mile · 10K · Full Marathon", price: "Check site", status: "open", statusLabel: "Open Registration", url: "https://www.honolulumarathon.org/" },
  { num: "17", name: "Chevron Houston Marathon Weekend", where: "Houston, TX · Jan 15-17, 2027", body: "Aramco Houston Half on Sunday Jan 17. Flat, fast, USATF certified. Registration Nov 1, 2026 to early January.", dists: "5K · Half · Full Marathon", price: "Check site", status: "open", statusLabel: "2027 Registration", url: "https://www.chevronhoustonmarathon.com/" },
  { num: "18", name: "Cherry Blossom Ten Mile", where: "Washington D.C. · April 2027", body: "Tidal Basin, cherry trees in peak bloom, ten flat miles. Lottery plus charity bibs. USATF certified.", dists: "5K · 10 Mile", price: "Check site", status: "limit", statusLabel: "Lottery + Charity Entries", url: "https://www.cherryblossom.org/" },
  { num: "19", name: "Crescent City Classic 10K", where: "New Orleans, LA · April 2027", body: "One of the oldest 10Ks in the country. Downtown New Orleans, the French Quarter, Esplanade Ave.", dists: "10K", price: "$55 to $80", status: "open", statusLabel: "2027 Registration Open", url: "https://ccc10k.com/" },
  { num: "20", name: "NYCRUNS Brooklyn Spring Half", where: "Brooklyn, NY · April 25, 2027", body: "Prospect Park loop course. Clean operation: easy bib pickup, USATF certified, no lottery.", dists: "5K · Half Marathon", price: "Check site", status: "open", statusLabel: "2027 Registration", url: "https://brooklynexperience.com/" },
];

// ─── HTML ─────────────────────────────────────────────────────────────────────
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function statusDot(status) {
  if (status === "open") return "#0A0A0A";
  if (status === "limit") return "#E8750A";
  return "#A8A8A8";
}

function raceRow(r) {
  return `
    <div class="race">
      <div class="race-num">${escapeHtml(r.num)}</div>
      <div class="race-body">
        <div class="race-name">${escapeHtml(r.name)}</div>
        <div class="race-where">${escapeHtml(r.where)}</div>
        <p class="race-desc">${escapeHtml(r.body)}</p>
        <div class="race-dists">${escapeHtml(r.dists)}</div>
        <div class="race-status"><span class="dot" style="background:${statusDot(r.status)}"></span>${escapeHtml(r.statusLabel)}</div>
      </div>
      <div class="race-meta">
        <div class="race-price">${escapeHtml(r.price)}</div>
        <div class="race-link">${escapeHtml(r.url.replace(/^https?:\/\//, "").replace(/\/$/, ""))}</div>
      </div>
    </div>`;
}

function html() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Suor Society 2026 Race Guide</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>
  :root {
    --paper: #FFFFFF;
    --ink: #0A0A0A;
    --ink-soft: #1C1C1C;
    --muted: #707070;
    --muted-2: #A8A8A8;
    --rule: rgba(10,10,10,0.12);
    --accent: #E8750A;
    --tint: #F4F2EE;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    background: var(--paper);
    color: var(--ink);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 10.5pt;
    line-height: 1.5;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  @page { size: Letter; margin: 0.5in 0.55in; }

  /* ── COVER ── */
  .cover {
    page-break-after: always;
    min-height: 9.5in;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.2in 0;
  }
  .cover-top { display: flex; justify-content: space-between; align-items: center; }
  .wm { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.04em; font-size: 14pt; }
  .wm .pipe { display: inline-block; margin: 0 6px; color: var(--muted-2); }
  .cover-meta { font-family: 'JetBrains Mono', monospace; font-size: 8.5pt; color: var(--muted); letter-spacing: 0.05em; text-transform: uppercase; }
  .cover-mid { flex: 1; display: flex; flex-direction: column; justify-content: center; }
  .cover-eye { font-family: 'JetBrains Mono', monospace; font-size: 9pt; color: var(--accent); letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 0.4in; }
  .cover-title { font-family: 'Bebas Neue', sans-serif; font-size: 72pt; line-height: 0.92; letter-spacing: 0; text-transform: uppercase; }
  .cover-title em { font-style: normal; color: var(--accent); }
  .cover-deck { margin-top: 0.4in; font-size: 13pt; line-height: 1.45; color: var(--ink-soft); max-width: 5.5in; font-weight: 400; }
  .cover-bottom { display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px solid var(--ink); padding-top: 14pt; }
  .cover-credits { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 11pt; letter-spacing: 0.05em; text-transform: uppercase; }
  .cover-credits span { margin-right: 14pt; }
  .cover-count { font-family: 'Bebas Neue', sans-serif; font-size: 24pt; }

  /* ── INTRO + SECTION HEADS ── */
  .intro { padding: 0.2in 0 0.4in; border-bottom: 1px solid var(--ink); page-break-after: always; min-height: 9.4in; display: flex; flex-direction: column; }
  .intro h2 { font-family: 'Bebas Neue', sans-serif; font-size: 36pt; line-height: 0.95; margin-bottom: 0.3in; }
  .intro p { font-size: 11.5pt; line-height: 1.55; margin-bottom: 14pt; color: var(--ink-soft); max-width: 6in; }
  .intro p strong { color: var(--ink); font-weight: 600; }
  .intro .rules { margin-top: auto; padding-top: 0.3in; }
  .intro .rule-item { display: flex; gap: 14pt; padding: 10pt 0; border-top: 1px solid var(--rule); }
  .intro .rule-item:last-child { border-bottom: 1px solid var(--rule); }
  .intro .rule-num { font-family: 'JetBrains Mono', monospace; font-size: 9pt; color: var(--muted); min-width: 22pt; }
  .intro .rule-text { font-size: 10.5pt; color: var(--ink-soft); }

  .section-head {
    page-break-before: always;
    padding-top: 0.1in;
    margin-bottom: 0.25in;
  }
  .section-num { font-family: 'JetBrains Mono', monospace; font-size: 9pt; color: var(--accent); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 8pt; }
  .section-title { font-family: 'Bebas Neue', sans-serif; font-size: 42pt; line-height: 0.95; }
  .section-sub { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 11pt; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); margin-top: 6pt; padding-top: 10pt; border-top: 1px solid var(--ink); }

  /* ── RACE CARDS ── */
  .race-list { display: flex; flex-direction: column; }
  .race {
    display: grid;
    grid-template-columns: 28pt 1fr 1.2in;
    gap: 14pt;
    padding: 14pt 0;
    border-top: 1px solid var(--rule);
    page-break-inside: avoid;
  }
  .race:last-child { border-bottom: 1px solid var(--rule); }
  .race-num { font-family: 'JetBrains Mono', monospace; font-size: 11pt; color: var(--accent); font-weight: 600; padding-top: 2pt; }
  .race-name { font-family: 'Bebas Neue', sans-serif; font-size: 18pt; line-height: 1.02; letter-spacing: 0.005em; }
  .race-where { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 10pt; letter-spacing: 0.05em; text-transform: uppercase; color: var(--muted); margin-top: 3pt; }
  .race-desc { font-size: 9.5pt; line-height: 1.5; color: var(--ink-soft); margin-top: 6pt; max-width: 4.5in; }
  .race-dists { font-family: 'JetBrains Mono', monospace; font-size: 8.5pt; color: var(--ink); margin-top: 6pt; }
  .race-status { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 9pt; letter-spacing: 0.05em; text-transform: uppercase; color: var(--ink); margin-top: 5pt; display: flex; align-items: center; gap: 6pt; }
  .race-status .dot { width: 7pt; height: 7pt; border-radius: 50%; display: inline-block; }
  .race-meta { text-align: right; padding-top: 2pt; }
  .race-price { font-family: 'JetBrains Mono', monospace; font-size: 10pt; font-weight: 600; color: var(--ink); margin-bottom: 4pt; }
  .race-link { font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; color: var(--muted); word-break: break-all; line-height: 1.4; }

  /* ── FOOTER ── */
  .footer-band {
    page-break-before: always;
    margin-top: 0.4in;
    padding: 0.2in 0;
    border-top: 1px solid var(--ink);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .footer-line { font-family: 'Bebas Neue', sans-serif; font-size: 32pt; line-height: 1; }
  .footer-meta { font-family: 'JetBrains Mono', monospace; font-size: 8.5pt; color: var(--muted); letter-spacing: 0.05em; text-transform: uppercase; text-align: right; line-height: 1.7; }
  .footer-meta a { color: var(--ink); text-decoration: none; }
</style>
</head>
<body>

<!-- COVER -->
<section class="cover">
  <div class="cover-top">
    <div class="wm">SUOR<span class="pipe">|</span>SOCIETY</div>
    <div class="cover-meta">The Culture Archive · June 2026</div>
  </div>
  <div class="cover-mid">
    <div class="cover-eye">2026 Race Guide</div>
    <h1 class="cover-title">40 Open<br/>Entry Races.<br/><em>No Qualifier.</em></h1>
    <p class="cover-deck">
      20 in California. 20 across the US. All USATF certified. From summer 2026 through spring 2027. The complete guide for the runner who lifts and the lifter who runs.
    </p>
  </div>
  <div class="cover-bottom">
    <div class="cover-credits">
      <span>SUOR SOCIETY</span><span>SAN DIEGO, CA</span><span>SUORSOCIETY.COM</span>
    </div>
    <div class="cover-count">40 / 40</div>
  </div>
</section>

<!-- INTRO -->
<section class="intro">
  <h2>The rules<br/>of this list.</h2>
  <p>It's race season. If you've been waiting for the right moment to sign up for something, this is it. 40 open entry road races: 20 in California, 20 across the US. All USATF certified. All open to everyone, no matter how fast or slow you run.</p>
  <p>The rule for everything in this guide: <strong>no qualifying time, no lottery.</strong> You register, you train, you show up. Races run from now through spring 2027, so there's a window for whatever you're building toward.</p>
  <p>Prices go up as race day gets closer. A handful of these are sold out of standard entries but still have charity or benefactor spots. We've flagged the status on every one. Click through and verify before you register. Race capacity and pricing move fast.</p>
  <div class="rules">
    <div class="rule-item"><div class="rule-num">01</div><div class="rule-text"><strong>Open entry.</strong> No qualifying time required. Pay the fee and you're in.</div></div>
    <div class="rule-item"><div class="rule-num">02</div><div class="rule-text"><strong>USATF certified.</strong> Course distance is officially measured. PRs count.</div></div>
    <div class="rule-item"><div class="rule-num">03</div><div class="rule-text"><strong>Status flagged.</strong> Open · Limited · Sold Out, accurate as of June 2026.</div></div>
    <div class="rule-item"><div class="rule-num">04</div><div class="rule-text"><strong>Verify before you register.</strong> Capacity and pricing can shift between updates.</div></div>
  </div>
</section>

<!-- CA SECTION -->
<section>
  <div class="section-head">
    <div class="section-num">01 / California</div>
    <h2 class="section-title">20 California<br/>Races.</h2>
    <div class="section-sub">Open Entry · Summer 2026 to Spring 2027</div>
  </div>
  <div class="race-list">
    ${CA_RACES.map(raceRow).join("\n")}
  </div>
</section>

<!-- US SECTION -->
<section>
  <div class="section-head">
    <div class="section-num">02 / United States</div>
    <h2 class="section-title">20 US Certified<br/>Races.</h2>
    <div class="section-sub">No Qualifier · All USATF Certified</div>
  </div>
  <div class="race-list">
    ${US_RACES.map(raceRow).join("\n")}
  </div>
</section>

<!-- FOOTER -->
<section class="footer-band">
  <div class="footer-line">Run. Lift.<br/>Sweat.</div>
  <div class="footer-meta">
    SUOR SOCIETY<br/>
    <a href="https://suorsociety.com">SUORSOCIETY.COM</a><br/>
    <a href="https://instagram.com/suorsociety">@SUORSOCIETY</a><br/>
    UPDATED JUNE 2026
  </div>
</section>

</body>
</html>`;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
(async () => {
  const outDir = path.join(__dirname, "..", "public");
  const outFile = path.join(outDir, "2026-race-guide.pdf");
  fs.mkdirSync(outDir, { recursive: true });

  console.log("Launching headless Chromium…");
  // CHROMIUM_PATH overrides the browser binary when Playwright's own
  // download isn't available.
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || undefined,
  });
  const page = await browser.newPage();

  console.log("Loading HTML…");
  await page.setContent(html(), { waitUntil: "networkidle" });
  // Give Google Fonts a beat to settle.
  await page.waitForTimeout(800);

  console.log("Rendering PDF…");
  await page.pdf({
    path: outFile,
    format: "Letter",
    printBackground: true,
    margin: { top: "0.5in", right: "0.55in", bottom: "0.5in", left: "0.55in" },
  });

  await browser.close();
  const stat = fs.statSync(outFile);
  console.log(`Wrote ${outFile} (${(stat.size / 1024).toFixed(0)} KB)`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
