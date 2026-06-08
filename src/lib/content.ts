// Single source of truth for race-guide content + the site-wide search index.

export type Race = {
  num: string;
  name: string;
  where: string;
  body: string;
  dists: string;
  price: string;
  status: "open" | "limit" | "sold";
  statusLabel: string;
  url: string;
};

export const CA_RACES: Race[] = [
  {
    num: "01",
    name: "The San Francisco Marathon",
    where: "San Francisco, CA · July 25-26, 2026",
    body: "Golden Gate Park, across the bridge, through the city. Half marathon and shorter distances open. Full marathon sold out. Join the waitlist if that's your target.",
    dists: "5K · Half Marathon · Full Marathon",
    price: "From $165",
    status: "open",
    statusLabel: "Open Registration",
    url: "https://www.thesfmarathon.com/",
  },
  {
    num: "02",
    name: "Santa Rosa Marathon",
    where: "Sonoma County, CA · Aug 22-23, 2026",
    body: "Wine country roads, mostly flat, multi-distance weekend. Half marathon still open. Full sold out, so grab the half before that goes too.",
    dists: "5K · 10K · Half Marathon · Full Marathon",
    price: "From $114",
    status: "open",
    statusLabel: "Open Registration",
    url: "https://santarosamarathon.com/",
  },
  {
    num: "03",
    name: "Californian Dreamin' Half Marathon",
    where: "Long Beach, CA · Aug 23, 2026",
    body: "Coastal SoCal course from Venice to Long Beach. Three distances starting under $60. Beach finish in August. Hard to beat this value for a certified coastal half.",
    dists: "5K ($49.75) · 10K ($52.93) · Half ($57.17)",
    price: "From $49.75",
    status: "open",
    statusLabel: "Open Registration",
    url: "https://runsignup.com/Race/CA/LongBeach/CalifornianDreaminKKHalfMarathon",
  },
  {
    num: "04",
    name: "Beer City Half, Alameda",
    where: "Alameda, CA · July 11, 2026",
    body: "Flat, fast, USATF certified Bay Area waterfront course. Good summer tune-up option. Craft beer at the finish.",
    dists: "5K · 10K · Half Marathon",
    price: "Check site",
    status: "open",
    statusLabel: "Open Registration",
    url: "https://www.runguides.com/california/runs/half-marathon/all",
  },
  {
    num: "05",
    name: "Beer City Half, Bishop Ranch",
    where: "San Ramon, CA · Sep 12, 2026",
    body: "East Bay edition. Multi-distance format with a 1-mile option. USATF certified. Good fall training block tune-up.",
    dists: "1 Mile · 5K · 10K · Half Marathon",
    price: "Check site",
    status: "open",
    statusLabel: "Open Registration",
    url: "https://www.runguides.com/california/runs/half-marathon/all",
  },
  {
    num: "06",
    name: "2XU Long Beach Marathon",
    where: "Long Beach, CA · Oct 10-11, 2026",
    body: "One of SoCal's most consistent fall race weekends. City streets and coastline. October weather in Long Beach is as close to perfect race conditions as SoCal gets.",
    dists: "5K · Half Marathon · Full Marathon",
    price: "From $139",
    status: "open",
    statusLabel: "Open Registration",
    url: "https://www.runlongbeach.com/",
  },
  {
    num: "07",
    name: "Napa to Sonoma Wine Country Half",
    where: "Napa, CA · July 25-26, 2026",
    body: "Point-to-point through active vineyards. Half marathon sold out. Rosé 5K still open. Use code N2SRG26 for $10 off.",
    dists: "Rosé 5K (July 25) · Half Marathon (July 26)",
    price: "From $208",
    status: "limit",
    statusLabel: "5K Open · Half Sold Out",
    url: "https://www.runnapatosonoma.com/",
  },
  {
    num: "08",
    name: "Silverado Half Marathon & 10K",
    where: "Silverado, CA · Nov 7, 2026",
    body: "Orange County wine country, canyon roads, fall race day. Less crowded than the big city events. Certified, open entry.",
    dists: "10K · Half Marathon · Full Marathon",
    price: "Check site",
    status: "open",
    statusLabel: "Open Registration",
    url: "https://www.runguides.com/california/runs/half-marathon/all",
  },
  {
    num: "09",
    name: "Monterey Bay Half Marathon",
    where: "Monterey, CA · Nov 8, 2026",
    body: "Sold out in eight days. One of the most beautiful half courses in California. Charity and Race Benefactor spots are the path in.",
    dists: "Half Marathon",
    price: "Charity: $350+",
    status: "sold",
    statusLabel: "General Sold Out · Charity Spots Open",
    url: "https://www.montereybayhalfmarathon.org/",
  },
  {
    num: "10",
    name: "California International Marathon",
    where: "Sacramento, CA · Dec 6, 2026",
    body: "Net downhill, point-to-point, USATF and World Athletics certified. One of the fastest marathon courses in the US. Standard registration sold out. Charity entries still available.",
    dists: "Full Marathon",
    price: "From $230",
    status: "limit",
    statusLabel: "Charity Entries Available",
    url: "https://runsra.org/california-international-marathon/",
  },
];

export const US_RACES: Race[] = [
  {
    num: "01",
    name: "Stars & Stripes Half Marathon",
    where: "Hoffman Estates, IL · Jun 27, 2026",
    body: "USATF certified, open entry. Solid summer race in the Chicago suburbs celebrating America's 250th. Up to 25% off through June 10.",
    dists: "5K · 10K · Half Marathon",
    price: "Check site",
    status: "open",
    statusLabel: "Open Registration",
    url: "https://allcommunityevents.com/starsandstripesrun",
  },
  {
    num: "02",
    name: "Northside Hospital Peachtree Road Race",
    where: "Atlanta, GA · July 4, 2026",
    body: "The largest 10K in the world. 60,000 runners. USATF certified. Atlanta Track Club members get guaranteed entry. Running a 10K in Atlanta on the Fourth is a specific kind of experience.",
    dists: "10K",
    price: "$60 to $80",
    status: "open",
    statusLabel: "Late Registration Open",
    url: "https://www.atlantatrackclub.org/",
  },
  {
    num: "03",
    name: "Twin Cities Marathon",
    where: "Minneapolis-St. Paul, MN · Oct 4, 2026",
    body: "Consistently called the Most Beautiful Urban Marathon. Lakes, parks, fall foliage, city streets. Open entry, no lottery, no qualifier. Register and go.",
    dists: "10K · Half Marathon · Full Marathon",
    price: "Check site",
    status: "open",
    statusLabel: "Open Registration",
    url: "https://www.tcmevents.org/",
  },
  {
    num: "04",
    name: "Hartford Marathon & Half Marathon",
    where: "Hartford, CT · Oct 10, 2026",
    body: "Flat, fast, USATF certified. A popular Boston qualifier attempt course because the consistency is that good. Open registration, rarely sells out early.",
    dists: "Half Marathon · Full Marathon",
    price: "Check site",
    status: "open",
    statusLabel: "Open Registration",
    url: "https://hartfordmarathon.com/",
  },
  {
    num: "05",
    name: "Steamtown Marathon",
    where: "Scranton, PA · Oct 11, 2026",
    body: "Point-to-point, significant net downhill, USATF certified. Runners who are serious about a PR target Steamtown specifically for the course profile. Small field. Open entry.",
    dists: "Full Marathon",
    price: "Check site",
    status: "open",
    statusLabel: "Open Registration",
    url: "https://steamtownmarathon.com/",
  },
  {
    num: "06",
    name: "Baltimore Running Festival",
    where: "Baltimore, MD · Oct 17, 2026",
    body: "26th annual event with a scenic harbor course. USATF certified, open entry, multi-distance. Bring a crew at different fitness levels.",
    dists: "5K · Half Marathon · Full Marathon",
    price: "Check site",
    status: "open",
    statusLabel: "Open Registration",
    url: "https://www.thebaltimoremarathon.com/",
  },
  {
    num: "07",
    name: "Marine Corps Marathon",
    where: "Arlington, VA / Washington D.C. · Oct 25, 2026",
    body: "No prize money. No elite wave. Just runners. The course goes past the Lincoln Memorial and through D.C. landmarks. General registration sold out. Charity spots open through July 31.",
    dists: "10K · Full Marathon",
    price: "$240 (Military $225)",
    status: "limit",
    statusLabel: "Charity Spots Open",
    url: "https://www.marinemarathon.com/event/marine-corps-marathon/",
  },
  {
    num: "08",
    name: "CNO Financial Indianapolis Monumental",
    where: "Indianapolis, IN · Nov 7, 2026",
    body: "Flat, fast, USATF certified. Open registration, no lottery, no qualifier. One of the most runner-friendly big-city race setups in the country.",
    dists: "5K · Half Marathon · Full Marathon",
    price: "Check site",
    status: "open",
    statusLabel: "Open Registration",
    url: "https://monumentalmarathon.com/",
  },
  {
    num: "09",
    name: "Philadelphia Marathon Weekend",
    where: "Philadelphia, PA · Nov 2026",
    body: "Full marathon sold out. Half marathon and 8K still open. Certified course through historic Philly. No qualifier for remaining distances.",
    dists: "8K · Half Marathon",
    price: "Check site",
    status: "limit",
    statusLabel: "Half & 8K Open · Full Sold Out",
    url: "https://www.philadelphiamarathon.com/",
  },
  {
    num: "10",
    name: "Crescent City Classic 10K",
    where: "New Orleans, LA · April 2027 (annual)",
    body: "One of the oldest 10Ks in the country. Course goes through downtown New Orleans, the French Quarter, and Esplanade Ave. USATF certified. 2027 registration just opened June 3.",
    dists: "10K",
    price: "$55 to $80",
    status: "open",
    statusLabel: "2027 Registration Open",
    url: "https://ccc10k.com/",
  },
];

export const FAQS = [
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
    a: "As of June 2026: San Francisco Marathon (half and shorter), Santa Rosa Marathon (half and shorter), Californian Dreamin' in Long Beach, Beer City Half in Alameda (July) and San Ramon (September), 2XU Long Beach Marathon, Napa to Sonoma Rosé 5K, and Silverado (November). Monterey Bay and CIM have limited charity spots.",
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

// Anchor id helpers — kept here so the culture page and the search index agree.
export function raceAnchor(region: "ca" | "us", num: string) {
  return `r-${region}-${num}`;
}
export function faqAnchor(i: number) {
  return `faq-${i}`;
}

// ---------- SITE-WIDE SEARCH INDEX ----------
export type SearchItem = {
  title: string;
  category: string;
  description?: string;
  href: string;
  keywords?: string[];
};

const PAGES: SearchItem[] = [
  { title: "The Culture — 2026 Race Guide", category: "Page", description: "Best open entry races in California and the US.", href: "/culture", keywords: ["culture", "archive", "guide", "races", "marathon", "half"] },
  { title: "Shop", category: "Page", description: "Suor Society merch. First drop in the build.", href: "/merch", keywords: ["merch", "store", "gear", "apparel", "drop"] },
  { title: "Home", category: "Page", description: "The home of hybrid running athletes.", href: "/", keywords: ["home", "hybrid", "running"] },
];

const BOARD: SearchItem[] = [
  { title: "Instagram", category: "Social", description: "The daily feed — crew shots, shoe drops, half marathon build.", href: "https://instagram.com/suorsociety", keywords: ["instagram", "social", "follow", "feed"] },
  { title: "The weekly dispatch", category: "Dispatch", description: "One email a week. Crew recap and one thing worth running to.", href: "/#signup", keywords: ["email", "newsletter", "signup", "subscribe", "dispatch"] },
  { title: "Next crew run", category: "Events", description: "Details dropping soon. Stay close.", href: "/#culture", keywords: ["crew", "run", "event", "group"] },
];

function raceItem(r: Race, region: "ca" | "us"): SearchItem {
  return {
    title: r.name,
    category: "Race",
    description: r.where,
    href: `/culture#${raceAnchor(region, r.num)}`,
    keywords: [r.dists, r.statusLabel, r.price, region === "ca" ? "california" : "united states usa"],
  };
}

const FAQ_ITEMS: SearchItem[] = FAQS.map((f, i) => ({
  title: f.q,
  category: "FAQ",
  description: f.a.length > 90 ? f.a.slice(0, 90).trimEnd() + "…" : f.a,
  href: `/culture#${faqAnchor(i)}`,
  keywords: ["faq", "question", "help"],
}));

export const SEARCH_INDEX: SearchItem[] = [
  ...PAGES,
  ...BOARD,
  ...CA_RACES.map((r) => raceItem(r, "ca")),
  ...US_RACES.map((r) => raceItem(r, "us")),
  ...FAQ_ITEMS,
];

export function searchSite(query: string): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return SEARCH_INDEX.filter((item) => {
    const hay = [item.title, item.description, item.category, ...(item.keywords ?? [])]
      .join(" ")
      .toLowerCase();
    return terms.every((t) => hay.includes(t));
  });
}
