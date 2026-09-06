// Central place for site copy in each language.
//
// Scope note: the brand headline (the locked tagline "Run. Lift. Sweat.") stays in
// English on every locale on purpose — it reads as the brand line, not as copy
// to translate. Brand/section names (The Culture, The Dispatch, Race Picks,
// Crew) also stay in English. The hero tagline IS translated per locale.
//
// Regional pages: the race guide and the HYROX post are not translations —
// each locale has its own regional version with its own races (US on /,
// Brazil on /pt-br), so their hrefs differ per locale below.
//
// To add a new language: add a key to `dictionaries` and a matching `<lang>`
// route under src/app. To add a new page: extend the `Dictionary` type with
// that page's strings and fill both locales.

import { CA_RACE_COUNT, US_RACE_COUNT, TOTAL_RACE_COUNT } from "@/lib/race-counts";

export type Lang = "en" | "pt";

export const LOCALE_HREF: Record<Lang, string> = {
  en: "/",
  "pt": "/pt-br",
};

// BCP-47 tag used for <html lang> / hreflang per locale.
export const LOCALE_TAG: Record<Lang, string> = {
  en: "en",
  pt: "pt-BR",
};

// Endonyms shown in the language switcher (each in its own language).
export const LOCALE_LABEL: Record<Lang, string> = {
  en: "English",
  pt: "Português",
};

// Order languages appear in the switcher dropdown.
export const LOCALES: Lang[] = ["en", "pt"];

// Prefix an internal path with the locale segment so links stay within the
// current language. External links, anchors and the like pass through.
// "/" -> "/pt-br", "/crew" -> "/pt-br/crew" (en is the unprefixed default).
export function localizeHref(path: string, lang: Lang): string {
  if (lang === "en") return path;
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (path === "/") return LOCALE_HREF.pt;
  return `${LOCALE_HREF.pt}${path}`;
}

// Canonical (unprefixed) path of the author bio page; run through
// localizeHref to stay in the current language.
export const AUTHOR_PATH = "/author/thais-oney";

// Regional counterparts: same slot in each locale but different content
// (US races vs Brazil races). Keys are EN paths, values pt-BR paths. True
// translations share their slug and need no entry here.
export const REGIONAL_PAIRS: Record<string, string> = {
  "/culture/open-entry-races-2026": "/pt-br/culture/corridas-brasil-2026",
  "/dispatch/hyrox-fall-2026-schedule": "/pt-br/dispatch/hyrox-brasil-2026",
  // True translation, different slug per locale: switcher needs the mapping.
  "/dispatch/ikea-marathon-croydon-2026": "/pt-br/dispatch/maratona-ikea-croydon-2026",
};

export function langFromPathname(pathname: string): Lang {
  return pathname === LOCALE_HREF.pt || pathname.startsWith(`${LOCALE_HREF.pt}/`)
    ? "pt"
    : "en";
}

// Where the language switcher lands for `target` from the current pathname:
// the regional counterpart when one exists, otherwise the same slug in the
// other locale (ship translations together — see AGENTS.md — so this always
// resolves to a real page).
export function switchLocaleHref(pathname: string, target: Lang): string {
  const current = langFromPathname(pathname);
  if (current === target) return pathname;
  if (current === "en") {
    return REGIONAL_PAIRS[pathname] ?? localizeHref(pathname, "pt");
  }
  const regionalEn = Object.entries(REGIONAL_PAIRS).find(([, pt]) => pt === pathname)?.[0];
  if (regionalEn) return regionalEn;
  return pathname.slice(LOCALE_HREF.pt.length) || "/";
}

type BoardPost = {
  href: string;
  img: string;
  eyebrow: string;
  title: string;
  desc: string;
  meta: string;
};

type Dictionary = {
  nav: {
    // Accessible label for the language switcher control.
    langLabel: string;
  };
  // Bottom scroll-distance tracker (rendered on every page).
  tracker: {
    scrolledLabel: string;
  };
  home: {
    heroTag: string;
    heroCta: string;
    // Locale-specific target for the hero CTA (the race guide is a regional
    // page, not a translation, so the path differs per locale).
    heroCtaHref: string;
    boardTitle: string;
    boardPosts: BoardPost[];
    boardMore: string;
    signupEye: string;
    signupLabel: string;
    signupNote: string;
    signupPlaceholder: string;
    signupBtn: string;
    signupBtnDone: string;
    signupSuccess: string;
    signupError: string;
  };
  footer: {
    desc: string;
    exploreTitle: string;
    connectTitle: string;
    location: string;
    privacy: string;
  };
  // Cross-language suggestion banner (shown to pt-speaking visitors on /).
  suggest: {
    text: string;
    cta: string;
    dismiss: string;
  };
  privacy: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    headline: string;
    updated: string;
    sections: { id?: string; title: string; body: string[]; list?: string[] }[];
    // Rendered after the cookie/provider/choice blocks, before Contact.
    tailSections: { id?: string; title: string; body: string[]; list?: string[] }[];
    cookies: {
      title: string;
      body: string[];
      headers: { name: string; purpose: string; life: string };
      rows: { name: string; purpose: string; life: string }[];
    };
    providers: {
      title: string;
      body: string[];
      list: { name: string; role: string; href: string }[];
    };
    choices: {
      title: string;
      body: string[];
      // Opt-out sentence + the label for the Google add-on link that closes it.
      // There is no on-site consent control to point at, so this is the real
      // answer to "how do I turn analytics off".
      optOut: string;
      optOutLink: string;
    };
    contact: { title: string; body: string };
  };
  about: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    headline: string;
    deck: string;
    // Mono stamp row under the hero deck.
    stamps: string[];
    col2Label: string;
    col2: string[];
    // Numbered index of what the page covers.
    indexEye: string;
    index: { title: string; desc: string }[];
    // Closing band: three ways into the rest of the site. The race guide is a
    // regional page, so its href differs per locale (same as the nav).
    closeEye: string;
    closeTitle: string;
    closeCards: { href: string; title: string; desc: string }[];
  };
  author: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    name: string;
    role: string;
    photoAlt: string;
    bioLabel: string;
    bio: string[];
    articlesLabel: string;
    // Regional pages differ per locale (see scope note above), so each locale
    // lists its own articles. Hrefs are unprefixed; localizeHref adds /pt-br.
    articles: { href: string; tag: string; date: string; title: string }[];
    // Post byline ("By" / "Por") and the author card at the end of each post.
    byLabel: string;
    cardLabel: string;
    cardBlurb: string;
    cardCta: string;
  };
  crew: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    headline: string;
    deck1: string;
    deck2: string;
    nextRunEye: string;
    timeLabel: string;
    meetLabel: string;
    costLabel: string;
    costValue: string;
    scheduledNotePre: string;
    scheduledNotePost: string;
    unscheduledTitle: string;
    unscheduledNotePre: string;
    unscheduledNotePost: string;
    formatEye: string;
    lines: string[];
    splitImgAlt: string;
    scenesEye: string;
    scenesAlts: { road: string; trail: string; crew: string };
  };
  dispatchForm: {
    successTag: string;
    successTitleLines: string[];
    successBody: string;
    emailLabel: string;
    placeholder: string;
    sending: string;
    subscribe: string;
    error: string;
    fine: string;
  };
  dispatch: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    headline: string;
    deck1: string;
    deck2: string;
    sectionLabel: string;
    sectionSub: string;
    // Headings for the second listing on /dispatch: every board post that is
    // not in `posts` above, so the "see all posts" link off the home board
    // lands somewhere that really does hold the rest.
    archiveLabel: string;
    archiveSub: string;
    posts: { href: string; img: string; tag: string; date: string; title: string; desc: string }[];
    readLabel: string;
    asideLabel: string;
    asideTitleLines: string[];
    asideDesc: string;
    asideWhat: string[];
  };
  racepicks: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    headline: string;
    deck1: string;
    deck2: string;
    featureHref: string;
    featureImg: string;
    featureTag: string;
    featureDate: string;
    featureTitle: string;
    featureDesc: string;
    readLabel: string;
  };
  downloadGate: {
    successTag: string;
    successTitleLines: string[];
    successBody: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    sending: string;
    submit: string;
    error: string;
    fine: string;
    downloadBtn: string;
    // Each locale gates its own regional guide PDF.
    pdfHref: string;
    pdfName: string;
  };
};

export const dictionaries: Record<Lang, Dictionary> = {
  en: {
    nav: {
      langLabel: "Select language",
    },
    tracker: {
      scrolledLabel: "You have scrolled",
    },
    home: {
      heroTag: "Races, gear, and hybrid training for people who run and lift",
      heroCta: "See Races Left in 2026",
      heroCtaHref: "/culture/open-entry-races-2026",
      boardTitle: "The board",
      boardPosts: [
        {
          href: "/culture/adizero-dropset-pro-vs-dropset-4",
          img: "/adizero-dropset-hero.jpg",
          eyebrow: "The Culture Archive",
          title: "Adizero Dropset Pro vs Dropset 4",
          desc: "Running intervals or lifting first? Compare the Pro and Dropset 4 with sourced specs, fit notes, and recommendations for the week you actually train.",
          meta: "New · Gear · September 2026 ↗",
        },
        {
          href: "/culture/half-marathon-world-record",
          img: "/half-marathon-record-hero.jpg",
          eyebrow: "The Culture Archive",
          title: "The Half Marathon World Record Is Now 56:51",
          desc: "Kejelcha ran 56:51 in Buenos Aires, 29 seconds off the record and the first man under 57 minutes in a race that counts. The splits, the pace, and the asterisk on Kiplimo's 56:42.",
          meta: "Records · August 2026 ↗",
        },
        {
          href: "/culture/run-and-lift-same-week",
          img: "/run-and-lift-hero.webp",
          eyebrow: "The Culture Archive",
          title: "Run and Lift in the Same Week",
          desc: "One hard session a day, 48 hours between your hardest run and heaviest leg day. The hybrid week that holds up around a job, plus the two-a-day trap that breaks people.",
          meta: "Training · July 2026 ↗",
        },
        {
          href: "/dispatch/ikea-marathon-croydon-2026",
          img: "/ikea-marathon-hero.avif",
          eyebrow: "The Dispatch",
          title: "The IKEA Marathon Is Real",
          desc: "26.2 miles inside IKEA Croydon, Dec 13. 100 places, a 6pm start, a six-hour cutoff, and a self-assembly medal.",
          meta: "Races · July 2026 ↗",
        },
        {
          href: "/culture/why-everyone-started-running",
          img: "/running-boom-hero.webp",
          eyebrow: "The Culture Archive",
          title: "Why Everyone Started Running",
          desc: "Race numbers passed 2019, run clubs jumped 59%, London took 1.1M applications. The stats behind the boom and what changed after 2024.",
          meta: "July 2026 ↗",
        },
        {
          href: "/culture/join-a-run-club-not-a-runner",
          img: "/run-club-hero.jpg",
          eyebrow: "The Culture Archive",
          title: "Not Really a Runner?",
          desc: "You can still join a run club. What no-drop and all paces welcome actually mean at your first group run.",
          meta: "July 2026 ↗",
        },
        {
          href: "/culture/open-entry-races-2026",
          img: "/race-hero.jpg",
          eyebrow: "The Culture Archive",
          title: "Race Picks",
          desc: "Best open entry races in California and the US. All certified. No qualifier needed.",
          meta: "Races · June 2026 ↗",
        },
        {
          href: "/dispatch/hyrox-fall-2026-schedule",
          img: "/hyrox-hero.jpg",
          eyebrow: "The Dispatch",
          title: "HYROX Fall 2026 Schedule",
          desc: "10 races, four new cities, and Anaheim returns Dec 4 to 6. The full North America calendar.",
          meta: "HYROX · June 2026 ↗",
        },
        {
          href: "/dispatch/june-2026-shoe-drops",
          img: "/june-shoe-drops-hero.webp",
          eyebrow: "The Dispatch",
          title: "June Shoe Drops",
          desc: "The Endorphin Elite 3, a plateless Puma at $150, and why plateless super trainers are the trend.",
          meta: "Gear · June 2026 ↗",
        },
        {
          href: "/dispatch/cape-town-marathon-major",
          img: "/cape-town-hero.jpg",
          eyebrow: "The Dispatch",
          title: "Cape Town Joins the Majors",
          desc: "Africa's first Abbott World Marathon Major joins the series May 23, 2027. What it changes for the star chase.",
          meta: "Races · June 2026 ↗",
        },
      ],
      boardMore: "See all posts ↗",
      signupEye: "The Dispatch",
      signupLabel: "Get the weekly dispatch",
      signupNote: "One email a week. Races worth entering, gear worth knowing, no noise.",
      signupPlaceholder: "you@somewhere.com",
      signupBtn: "I'm in.",
      signupBtnDone: "ON THE LIST.",
      signupSuccess: "Thanks for subscribing!",
      signupError:
        "Something went wrong. Email us at hello@suorsociety.com and we’ll add you directly.",
    },
    footer: {
      desc: "Hybrid running culture from San Diego. Races, gear, and the people who lift and run around everything else.",
      exploreTitle: "Explore",
      connectTitle: "Connect",
      location: "San Diego, CA",
      privacy: "Privacy",
    },
    suggest: {
      text: "Want to read this in English?",
      cta: "Read in English",
      dismiss: "Dismiss",
    },
    privacy: {
      metaTitle: "Privacy, Suor Society",
      metaDescription:
        "What Suor Society collects, what it never does with your data, and how to switch the analytics off if you would rather not be counted.",
      eyebrow: "How your data gets handled",
      headline: "Privacy policy",
      updated: "Last updated August 19, 2026",
      sections: [
        {
          id: "short-version",
          title: "The short version",
          body: [
            "This is a small running site, so there is not much to tell. We collect as little as we can and we don’t sell any of it. Google Analytics runs here and sets a cookie when you arrive, which is how we know which posts get read, and you can switch it off in about ten seconds if you would rather not be counted.",
            "If you sign up for the Dispatch or download a race guide, we keep your email address so we can send you the thing you asked for. Everything below is just the detail.",
          ],
        },
        {
          id: "what-we-collect",
          title: "What we collect",
          body: ["Three things, depending on what you do here."],
          list: [
            "Analytics, from the moment you land. Google Analytics tells us which pages get read, roughly what part of the world you are in, what browser you are using, and how far down a post you scroll. It does not tell us who you are, and the Your choices section explains how to turn it off.",
            "Your email address, if you sign up for the Dispatch or fill in the form to download a race guide. The race guide form also asks for a first name, so the email doesn’t have to open with “Hi there”.",
            "Whatever you write to us, if you email hello@suorsociety.com. That lands in a normal inbox and gets treated like any other email.",
          ],
        },
        {
          id: "what-we-dont-do",
          title: "What we don’t do",
          body: [
            "We don’t sell, rent, or trade your email address to anyone. There are no advertising pixels on this site, no retargeting, and nothing that follows you to other websites.",
            "We also don’t try to work out who you are from analytics data, and we don’t build a profile on you.",
          ],
        },
      ],
      tailSections: [
        {
          id: "how-long",
          title: "How long we keep things",
          body: [
            "Analytics data expires on Google’s schedule, which is currently 14 months. Your email address stays on the list until you unsubscribe or ask us to delete it. Emails you send us sit in the inbox until you ask us to clear them out.",
          ],
        },
        {
          id: "kids-and-changes",
          title: "Kids, and changes to this page",
          body: [
            "The site isn’t aimed at children and we don’t knowingly collect anything from anyone under 13.",
            "If this policy changes, the date at the top changes with it, and anything significant gets a mention in the Dispatch rather than a quiet edit.",
          ],
        },
      ],
      cookies: {
        title: "Cookies",
        body: [
          "There is no accept or reject bar on this site. Google Analytics sets the two cookies below when you arrive, and they do nothing except count visits and tell a return visit apart from a first one. Nothing here is used for advertising.",
          "If you would rather not be counted, the Your choices section further down has the opt-out, and the site behaves exactly the same once you use it.",
          "The last row isn’t technically a cookie, it is browser local storage. It is listed anyway because the distinction doesn’t change anything for you.",
        ],
        headers: { name: "Name", purpose: "What it does", life: "How long it lasts" },
        rows: [
          {
            name: "_ga",
            purpose:
              "Google Analytics. Tells one visitor apart from another, so a return visit isn’t counted as a new person.",
            life: "2 years",
          },
          {
            name: "_ga_XG414LX946",
            purpose: "Google Analytics. Keeps track of a single visit.",
            life: "2 years",
          },
          {
            name: "ss-lang-suggest-dismissed",
            purpose: "Remembers that you closed the prompt offering the Portuguese version.",
            life: "Until you clear it",
          },
        ],
      },
      providers: {
        title: "Who else sees it",
        body: [
          "A few companies handle pieces of this site, and your data passes through them. Each one has its own privacy policy.",
        ],
        list: [
          {
            name: "Google",
            role: "runs the analytics, and holds a backup copy of the signup list in a spreadsheet.",
            href: "https://policies.google.com/privacy",
          },
          {
            name: "beehiiv",
            role: "stores the newsletter list and sends the Dispatch.",
            href: "https://www.beehiiv.com/privacy",
          },
          {
            name: "Vercel",
            role: "hosts the site and keeps the usual server logs.",
            href: "https://vercel.com/legal/privacy-policy",
          },
        ],
      },
      choices: {
        title: "Your choices",
        optOut:
          "You can opt out of the analytics entirely and you don’t have to take our word for it working. Google publishes a browser add-on that switches Google Analytics off on every site you visit, this one included, and it installs in about ten seconds:",
        optOutLink: "Google Analytics opt-out add-on",
        body: [
          "Blocking cookies for this site in your browser settings does the same job, and so does any tracker blocker or a private window. Whichever route you take, the site works normally afterwards. If you would rather we deleted analytics data tied to your visit, email us and we will ask Google to remove it.",
          "Every Dispatch email has an unsubscribe link at the bottom and it works straight away. If you would rather have your address deleted entirely, email us and we will do it.",
          "If you are in the EU, the UK, or Brazil, you have the right to ask what we hold about you, to get a copy, to have it corrected, and to have it deleted. Email us and we will sort it out. There is no form to fill in.",
        ],
      },
      contact: {
        title: "Contact",
        body: "Questions about any of this, or you want your data gone, write to",
      },
    },
    about: {
      metaTitle: "About, Suor Society",
      metaDescription:
        "Built in San Diego by a marketer who runs and lifts. Hybrid running culture for people who don’t train for a living.",
      eyebrow: "Suor Society / The Culture",
      headline: "Suor is Portuguese for sweat",
      deck: "For the runner who lifts, the lifter who runs, and everyone figuring it out",
      stamps: ["San Diego", "Since 2026", "Run. Lift. Sweat."],
      col2Label: "What this is",
      col2: [
        "Most hybrid content online is made by people whose whole life is training. Two-a-days, full sponsorships, 20-hour weeks. It’s inspiring. It’s also completely disconnected from anyone building this around an actual life, kids, a business, whatever the rest of your day looks like.",
        "Suor Society is your hybrid training culture page, for people who run and lift around everything else already going on. Shoe drops, athlete spotlights, race coverage. Plus the context that’s almost always missing: the 1:10 half marathon took eight years. Your run counts the whole time you’re chasing it.",
      ],
      indexEye: "What you’ll find here",
      index: [
        {
          title: "Gear and shoe drops",
          desc: "New releases, and which ones are worth the money",
        },
        {
          title: "Race coverage",
          desc: "Majors, local start lines, and the races still open",
        },
        {
          title: "Athlete spotlights",
          desc: "The elites, and the people training after work",
        },
        {
          title: "The missing context",
          desc: "How long the fast times actually took, and what they cost",
        },
        {
          title: "San Diego scene",
          desc: "Routes, crew runs, and where everyone gets coffee after",
        },
      ],
      closeEye: "Where to start",
      closeTitle: "Three ways in",
      closeCards: [
        {
          href: "/culture/open-entry-races-2026",
          title: "Race picks",
          desc: "Open-entry races still on the calendar, no qualifier needed",
        },
        {
          href: "/culture/join-a-run-club-not-a-runner",
          title: "Find a run club",
          desc: "How to pick one in San Diego, and what to expect your first time",
        },
        {
          href: "/dispatch",
          title: "The Dispatch",
          desc: "One email a week, races and gear, no noise",
        },
      ],
    },
    author: {
      metaTitle: "Thais Oney, Suor Society",
      metaDescription:
        "Thais Oney is the founder of Suor Society. Originally from Brazil and based in San Diego, she writes about hybrid running culture: races, gear, and training that fits around everything else.",
      eyebrow: "Suor Society / Author",
      name: "Thais Oney",
      role: "Founder & Editor",
      photoAlt: "Portrait of Thais Oney, founder of Suor Society",
      bioLabel: "Who writes this",
      bio: [
        "Thais Oney is the founder of Suor Society. Originally from Brazil and based in San Diego, she holds an MBA in Digital Marketing and Communications and has spent her career running multi-channel marketing campaigns across the hospitality, agency, and wellness industries.",
        "Outside of work she lifts, cross-trains, and runs, and has completed a half marathon. She started Suor Society to cover hybrid running culture for people who train around everything else in their life: the races, the gear, the athletes, and the context that usually gets left out.",
      ],
      articlesLabel: "Articles by Thais",
      articles: [
        {
          href: "/culture/adizero-dropset-pro-vs-dropset-4",
          tag: "The Culture Archive",
          date: "September 2026",
          title: "Adidas Adizero Dropset Pro vs Dropset 4: Which Should You Buy?",
        },
        {
          href: "/culture/half-marathon-world-record",
          tag: "The Culture Archive",
          date: "August 2026",
          title: "Half Marathon World Record: Kejelcha Runs 56:51 in Buenos Aires",
        },
        {
          href: "/culture/run-and-lift-same-week",
          tag: "The Culture Archive",
          date: "July 2026",
          title: "How to Run and Lift in the Same Week Without Breaking Down",
        },
        {
          href: "/dispatch/ikea-marathon-croydon-2026",
          tag: "The Dispatch",
          date: "July 2026",
          title: "The IKEA Marathon Is Real: 26.2 Miles Inside a Store",
        },
        {
          href: "/culture/why-everyone-started-running",
          tag: "The Culture Archive",
          date: "July 2026",
          title: "Why Did Everyone Start Running? The Running Boom, Explained",
        },
        {
          href: "/culture/join-a-run-club-not-a-runner",
          tag: "The Culture Archive",
          date: "July 2026",
          title: "Can You Join a Run Club If You're Not Really a Runner?",
        },
        {
          href: "/culture/open-entry-races-2026",
          tag: "The Culture Archive",
          date: "June 2026",
          title: `${TOTAL_RACE_COUNT} Open Entry Races in California and the US You Can Still Run in 2026`,
        },
        {
          href: "/dispatch/hyrox-fall-2026-schedule",
          tag: "HYROX",
          date: "June 2026",
          title: "HYROX Fall 2026: Anaheim Is Back and the Calendar Just Got Huge",
        },
        {
          href: "/dispatch/june-2026-shoe-drops",
          tag: "Gear",
          date: "June 2026",
          title: "June Shoe Drops: Saucony Goes Big, Puma Pulls the Plate",
        },
        {
          href: "/dispatch/cape-town-marathon-major",
          tag: "Races",
          date: "June 2026",
          title: "Cape Town Is Now a Marathon Major. Here's What Actually Changes",
        },
      ],
      byLabel: "By",
      cardLabel: "About the author",
      cardBlurb:
        "Thais Oney is the founder of Suor Society. Originally from Brazil and based in San Diego, she holds an MBA in Digital Marketing and Communications and writes about hybrid running culture for people who don’t train for a living.",
      cardCta: "Read full bio →",
    },
    crew: {
      metaTitle: "Crew, Suor Society",
      metaDescription: "Saturday crew runs in San Diego. Free, every pace, everyone stays after.",
      eyebrow: "Suor Society / Crew",
      headline: "Run with us",
      deck1: "Free. Every pace.",
      deck2: "San Diego.",
      nextRunEye: "Next run",
      timeLabel: "Time",
      meetLabel: "Meet",
      costLabel: "Cost",
      costValue: "Free. Always.",
      scheduledNotePre: "The callout posts on ",
      scheduledNotePost: ". Check it before you head out.",
      unscheduledTitle: "First run loading",
      unscheduledNotePre:
        "No date on the calendar yet. The first one drops soon, and every callout goes up on ",
      unscheduledNotePost: " first. Follow it and you’ll be first to know.",
      formatEye: "The format",
      lines: [
        "Weekend mornings",
        "Free, always",
        "All paces",
        "The fastest person waits at every turn",
        "The hang after",
      ],
      splitImgAlt: "Suor Society crew on a palm-lined San Diego street",
      scenesEye: "Out there",
      scenesAlts: {
        road: "Two runners on a morning road",
        trail: "Trail running in the San Diego hills",
        crew: "Suor Society runners mid-stride",
      },
    },
    dispatchForm: {
      successTag: "You’re in",
      successTitleLines: ["On", "The", "List"],
      successBody:
        "The dispatch lands in your inbox each week. Races worth signing up for, gear worth knowing about, and the people doing both around everything else.",
      emailLabel: "Email *",
      placeholder: "you@somewhere.com",
      sending: "Sending…",
      subscribe: "Subscribe →",
      error:
        "Something went wrong. Email us at hello@suorsociety.com and we’ll add you directly.",
      fine: "No spam. One email a week. Unsubscribe any time.",
    },
    dispatch: {
      metaTitle: "Dispatch, Suor Society",
      metaDescription: "One email a week. The lift-and-run world, edited down.",
      eyebrow: "Suor Society / Dispatch",
      headline: "Get the dispatch",
      deck1: "One email a week.",
      deck2: "The lift-and-run world, edited down.",
      sectionLabel: "Latest from the Dispatch",
      sectionSub: "Race news · HYROX · Gear",
      archiveLabel: "The Culture Archive",
      archiveSub: "Training · Gear · Races",
      posts: [
        {
          href: "/dispatch/ikea-marathon-croydon-2026",
          img: "/ikea-marathon-hero.avif",
          tag: "Races",
          date: "July 2026",
          title: "The IKEA Marathon Is Real: 26.2 Miles Inside a Store",
          desc: "The first official IKEA Marathon runs Dec 13 inside IKEA Croydon. 100 places, a 6pm start, a six-hour cutoff, and a medal you assemble yourself.",
        },
        {
          href: "/dispatch/hyrox-fall-2026-schedule",
          img: "/hyrox-hero.jpg",
          tag: "HYROX",
          date: "June 2026",
          title: "HYROX Fall 2026: Anaheim Is Back and the Calendar Just Got Huge",
          desc: "10 races, four new cities, and Anaheim returns Dec 4 to 6. The full North America schedule.",
        },
        {
          href: "/dispatch/june-2026-shoe-drops",
          img: "/june-shoe-drops-hero.webp",
          tag: "Gear",
          date: "June 2026",
          title: "June Shoe Drops: Saucony Goes Big, Puma Pulls the Plate",
          desc: "The Endorphin Elite 3, a plateless Puma at $150, and why plateless super trainers are the trend.",
        },
        {
          href: "/dispatch/cape-town-marathon-major",
          img: "/cape-town-hero.jpg",
          tag: "Races",
          date: "June 2026",
          title: "Cape Town Is Now a Marathon Major. Here's What Actually Changes",
          desc: "Africa's first Abbott World Marathon Major joins the series May 23, 2027. What it does to the star chase.",
        },
      ],
      readLabel: "Read →",
      asideLabel: "The Weekly Dispatch",
      asideTitleLines: ["Sign up", "Free"],
      asideDesc:
        "Races worth signing up for and gear worth knowing about. One email a week, no daily blast",
      asideWhat: [
        "Open-entry races worth your weekend",
        "Hybrid training and gear we actually use",
        "San Diego crew runs and meetups",
      ],
    },
    racepicks: {
      metaTitle: "Race Picks, Suor Society",
      metaDescription:
        "Race Picks. Open entry races, guides, and start lines worth your training block, all in one place.",
      eyebrow: "Suor Society / Race Picks",
      headline: "Race Picks",
      deck1: "Open entry races and start lines worth your training block.",
      deck2: "No qualifier, no lottery, no guesswork.",
      featureHref: "/culture/open-entry-races-2026",
      featureImg: "/race-hero.jpg",
      featureTag: "Race Guide",
      featureDate: "June 2026",
      featureTitle: `${TOTAL_RACE_COUNT} Open Entry Races in California and the US You Can Still Run in 2026`,
      featureDesc:
        `No qualifier, no lottery. ${CA_RACE_COUNT} California races, ${US_RACE_COUNT} across the US, all USATF certified, with dates, prices, and direct registration links.`,
      readLabel: "Read the guide →",
    },
    downloadGate: {
      successTag: "You’re in",
      successTitleLines: ["Your", "Guide", "Is Ready"],
      successBody:
        `${TOTAL_RACE_COUNT} open entry races. ${CA_RACE_COUNT} in California, ${US_RACE_COUNT} across the US. All certified. From now through spring 2027.`,
      nameLabel: "First Name",
      namePlaceholder: "Your name",
      emailLabel: "Email *",
      emailPlaceholder: "you@somewhere.com",
      sending: "Sending…",
      submit: "Get the Guide →",
      error:
        "Something went wrong. Email us at hello@suorsociety.com and we’ll send it directly.",
      fine: "No spam. Just the guide. Unsubscribe any time.",
      downloadBtn: "Download the PDF →",
      pdfHref: "/2026-race-guide.pdf",
      pdfName: "2026_Race_Guide_SuorSociety.pdf",
    },
  },

  pt: {
    nav: {
      langLabel: "Selecionar idioma",
    },
    tracker: {
      scrolledLabel: "Você já percorreu",
    },
    home: {
      heroTag: "Corridas, equipamentos e treino híbrido para quem corre e levanta peso",
      heroCta: "Veja as corridas que faltam em 2026",
      heroCtaHref: "/culture/corridas-brasil-2026",
      boardTitle: "O mural",
      boardPosts: [
        {
          href: "/culture/adizero-dropset-pro-vs-dropset-4",
          img: "/adizero-dropset-hero.jpg",
          eyebrow: "The Culture · Arquivo",
          title: "Adizero Dropset Pro vs Dropset 4",
          desc: "Intervalos de corrida ou musculação primeiro? Compare Pro e Dropset 4 com ficha técnica, fontes, ajuste e sugestões para a semana que você realmente treina.",
          meta: "Novo · Equipamento · Setembro 2026 ↗",
        },
        {
          href: "/culture/half-marathon-world-record",
          img: "/half-marathon-record-hero.jpg",
          eyebrow: "The Culture · Arquivo",
          title: "O recorde mundial da meia agora é 56:51",
          desc: "Kejelcha correu 56:51 em Buenos Aires, 29 segundos a menos que o recorde e o primeiro homem abaixo de 57 minutos numa prova que conta. As parciais, o ritmo e o asterisco do 56:42 do Kiplimo.",
          meta: "Recordes · Agosto 2026 ↗",
        },
        {
          href: "/culture/run-and-lift-same-week",
          img: "/run-and-lift-hero.webp",
          eyebrow: "The Culture · Arquivo",
          title: "Corrida e musculação na mesma semana",
          desc: "Um treino forte por dia, 48 horas entre a corrida mais puxada e o dia de perna mais pesado. A semana híbrida que se sustenta no meio de todo o resto, e a armadilha que quebra as pessoas.",
          meta: "Treino · Julho 2026 ↗",
        },
        {
          href: "/dispatch/maratona-ikea-croydon-2026",
          img: "/ikea-marathon-hero.avif",
          eyebrow: "The Dispatch",
          title: "A Maratona da IKEA É Real",
          desc: "42km dentro da IKEA de Croydon, 13 de dezembro. 100 vagas, largada às 18h, corte de seis horas e uma medalha que você monta.",
          meta: "Corridas · Julho 2026 ↗",
        },
        {
          href: "/culture/why-everyone-started-running",
          img: "/running-boom-hero.webp",
          eyebrow: "The Culture · Arquivo",
          title: "Por que todo mundo começou a correr",
          desc: "As provas passaram 2019, os clubes de corrida saltaram 59% e Londres recebeu 1,1 milhão de inscrições. Os números por trás do boom e o que mudou depois de 2024.",
          meta: "Julho 2026 ↗",
        },
        {
          href: "/culture/join-a-run-club-not-a-runner",
          img: "/run-club-hero.jpg",
          eyebrow: "The Culture · Arquivo",
          title: "Não se acha corredor?",
          desc: "Dá pra entrar num clube de corrida do mesmo jeito. O que no-drop e todos os paces são bem-vindos significam de verdade no seu primeiro treino em grupo.",
          meta: "Julho 2026 ↗",
        },
        {
          href: "/culture/corridas-brasil-2026",
          img: "/sao-silvestre-hero.webp",
          eyebrow: "The Culture · Arquivo",
          title: "Race Picks",
          desc: "As corridas de rua que valem a inscrição no Brasil em 2026. São Silvestre, maratonas de SP e Rio e mais.",
          meta: "Corridas · Junho 2026 ↗",
        },
        {
          href: "/dispatch/hyrox-brasil-2026",
          img: "/hyrox-hero.jpg",
          eyebrow: "The Dispatch",
          title: "HYROX no Brasil 2026",
          desc: "São Paulo confirmada pra 17 de outubro no Distrito Anhembi, mais Rio e Fortaleza na temporada 26/27.",
          meta: "HYROX · Junho 2026 ↗",
        },
        {
          href: "/dispatch/june-2026-shoe-drops",
          img: "/june-shoe-drops-hero.webp",
          eyebrow: "The Dispatch",
          title: "Lançamentos de tênis de junho",
          desc: "O Endorphin Elite 3, um Puma sem placa de carbono por US$ 150 e por que os super trainers sem placa viraram tendência.",
          meta: "Equipamentos · Junho 2026 ↗",
        },
        {
          href: "/dispatch/cape-town-marathon-major",
          img: "/cape-town-hero.jpg",
          eyebrow: "The Dispatch",
          title: "Cidade do Cabo entra para as Majors",
          desc: "A primeira Abbott World Marathon Major da África entra para a série em 23 de maio de 2027. O que muda na busca pelas seis estrelas.",
          meta: "Corridas · Junho 2026 ↗",
        },
      ],
      boardMore: "Ver todos os posts ↗",
      signupEye: "The Dispatch",
      signupLabel: "Receba o Dispatch toda semana",
      signupNote: "Um e-mail por semana. Corridas que valem a inscrição, equipamentos que valem a pena, sem enrolação.",
      signupPlaceholder: "seu@email.com",
      signupBtn: "Tô dentro.",
      signupBtnDone: "NA LISTA.",
      signupSuccess: "Obrigada por se inscrever!",
      signupError:
        "Algo deu errado. Escreve pra gente em hello@suorsociety.com que a gente te adiciona na mão.",
    },
    footer: {
      desc: "Cultura de corrida híbrida direto de San Diego. Corridas, equipamentos e gente que corre e levanta peso no meio de uma vida corrida.",
      exploreTitle: "Explorar",
      connectTitle: "Contato",
      location: "San Diego, CA",
      privacy: "Privacidade",
    },
    // Shown on the English home to visitors whose browser prefers Portuguese.
    suggest: {
      text: "Quer ler em português?",
      cta: "Ler em português",
      dismiss: "Fechar",
    },
    privacy: {
      metaTitle: "Privacidade, Suor Society",
      metaDescription:
        "O que a Suor Society coleta, o que nunca faz com os seus dados, e como desligar o analytics se você preferir não ser contado.",
      eyebrow: "Como seus dados são tratados",
      headline: "Política de privacidade",
      updated: "Última atualização em 19 de agosto de 2026",
      sections: [
        {
          id: "short-version",
          title: "A versão curta",
          body: [
            "Esse é um site pequeno de corrida, então não tem muito o que contar. A gente coleta o mínimo possível e não vende nada disso. O Google Analytics roda aqui e salva um cookie quando você chega, que é como a gente sabe quais posts são lidos, e dá pra desligar em uns dez segundos se você preferir não ser contado.",
            "Se você assina a Dispatch ou baixa um guia de corridas, a gente guarda seu email pra conseguir mandar aquilo que você pediu. O resto aqui embaixo é só o detalhe.",
          ],
        },
        {
          id: "what-we-collect",
          title: "O que a gente coleta",
          body: ["Três coisas, dependendo do que você faz por aqui."],
          list: [
            "Analytics, desde a hora que você chega. O Google Analytics mostra quais páginas são lidas, mais ou menos em que parte do mundo você está, qual navegador você usa e até onde você rola o post. Ele não diz quem você é, e a seção Suas escolhas explica como desligar.",
            "Seu email, se você assina a Dispatch ou preenche o formulário pra baixar um guia de corridas. O formulário do guia também pede um primeiro nome, pra que o email não comece com “Olá”.",
            "O que você escrever pra gente, se mandar mensagem pro hello@suorsociety.com. Isso cai numa caixa de entrada normal e é tratado como qualquer outro email.",
          ],
        },
        {
          id: "what-we-dont-do",
          title: "O que a gente não faz",
          body: [
            "A gente não vende, não aluga e não troca seu email com ninguém. Não tem pixel de publicidade nesse site, não tem retargeting, e não tem nada que te siga por outros sites.",
            "A gente também não tenta descobrir quem você é a partir dos dados de analytics, e não monta um perfil seu.",
          ],
        },
      ],
      tailSections: [
        {
          id: "how-long",
          title: "Por quanto tempo a gente guarda",
          body: [
            "Os dados de analytics expiram no prazo do Google, hoje 14 meses. Seu email fica na lista até você cancelar a inscrição ou pedir pra apagar. Emails que você manda ficam na caixa de entrada até você pedir pra limpar.",
          ],
        },
        {
          id: "kids-and-changes",
          title: "Crianças, e mudanças nessa página",
          body: [
            "O site não é feito pra crianças e a gente não coleta nada de ninguém com menos de 13 anos de forma consciente.",
            "Se essa política mudar, a data lá em cima muda junto, e qualquer coisa importante vira assunto na Dispatch em vez de uma edição silenciosa.",
          ],
        },
      ],
      cookies: {
        title: "Cookies",
        body: [
          "Não tem barra de aceitar ou recusar nesse site. O Google Analytics salva os dois cookies aqui embaixo quando você chega, e eles não fazem nada além de contar visitas e diferenciar quem volta de quem chegou agora. Nada disso é usado pra publicidade.",
          "Se você preferir não ser contado, a seção Suas escolhas mais pra baixo tem como desligar, e o site continua funcionando igual depois disso.",
          "A última linha não é um cookie de verdade, é armazenamento local do navegador. Está listada assim mesmo porque essa diferença não muda nada pra você.",
        ],
        headers: { name: "Nome", purpose: "O que faz", life: "Quanto tempo dura" },
        rows: [
          {
            name: "_ga",
            purpose:
              "Google Analytics. Diferencia um visitante do outro, pra que uma volta ao site não conte como uma pessoa nova.",
            life: "2 anos",
          },
          {
            name: "_ga_XG414LX946",
            purpose: "Google Analytics. Acompanha uma visita específica.",
            life: "2 anos",
          },
          {
            name: "ss-lang-suggest-dismissed",
            purpose: "Lembra que você fechou o aviso que oferece a versão em português.",
            life: "Até você apagar",
          },
        ],
      },
      providers: {
        title: "Quem mais vê isso",
        body: [
          "Algumas empresas cuidam de partes desse site, e seus dados passam por elas. Cada uma tem a própria política de privacidade.",
        ],
        list: [
          {
            name: "Google",
            role: "roda o analytics e guarda uma cópia de backup da lista de inscritos numa planilha.",
            href: "https://policies.google.com/privacy",
          },
          {
            name: "beehiiv",
            role: "armazena a lista da newsletter e envia a Dispatch.",
            href: "https://www.beehiiv.com/privacy",
          },
          {
            name: "Vercel",
            role: "hospeda o site e mantém os logs de servidor de sempre.",
            href: "https://vercel.com/legal/privacy-policy",
          },
        ],
      },
      choices: {
        title: "Suas escolhas",
        optOut:
          "Dá pra desligar o analytics por completo, e você não precisa acreditar na nossa palavra de que funcionou. O Google publica uma extensão de navegador que desativa o Google Analytics em todo site que você visita, incluindo esse, e ela instala em uns dez segundos:",
        optOutLink: "extensão de opt-out do Google Analytics",
        body: [
          "Bloquear os cookies desse site nas configurações do navegador faz o mesmo, e qualquer bloqueador de rastreadores ou uma janela anônima também. Seja qual for o caminho, o site funciona normal depois. Se você preferir que a gente apague os dados de analytics ligados à sua visita, escreve pra gente que a gente pede a remoção pro Google.",
          "Todo email da Dispatch tem link de cancelamento no rodapé e ele funciona na hora. Se você preferir apagar seu endereço de vez, escreve pra gente que a gente apaga.",
          "Se você está no Brasil, na União Europeia ou no Reino Unido, você tem direito de perguntar o que a gente guarda sobre você, receber uma cópia, corrigir e apagar. Escreve pra gente que a gente resolve. Não tem formulário pra preencher.",
        ],
      },
      contact: {
        title: "Contato",
        body: "Dúvida sobre qualquer coisa aqui, ou se você quer seus dados apagados, escreve pra",
      },
    },
    about: {
      metaTitle: "Sobre, Suor Society",
      metaDescription:
        "Feito em San Diego por uma profissional de marketing que corre e levanta peso. Cultura de corrida híbrida para quem tem uma vida de verdade.",
      eyebrow: "Suor Society / The Culture",
      // Brand line — stays in English on every locale, like the home hero
      // headline and tagline.
      headline: "Suor is Portuguese for sweat",
      deck: "Para o corredor que levanta peso, para quem levanta peso e corre, e para todo mundo que ainda está descobrindo",
      // "Run. Lift. Sweat." is the locked tagline and stays in English.
      stamps: ["San Diego", "Desde 2026", "Run. Lift. Sweat."],
      col2Label: "O que é isso aqui",
      col2: [
        "A maior parte do conteúdo híbrido na internet é feita por gente cuja vida inteira é treino. Dois treinos por dia, patrocínio cheio, 20 horas por semana. É inspirador. E também totalmente desconectado de quem constrói isso em cima de uma vida de verdade, filhos, um negócio, o que for que o resto do seu dia tiver.",
        "O Suor Society é a sua página de cultura de treino híbrido, para quem corre e levanta peso no meio de tudo mais que já está rolando. Lançamentos de tênis, perfis de atletas, cobertura de provas. Mais o contexto que quase sempre falta: aquela meia maratona de 1h10 levou oito anos. A sua corrida vale o tempo inteiro em que você corre atrás dela.",
      ],
      indexEye: "O que tem aqui",
      index: [
        {
          title: "Tênis e equipamentos",
          desc: "O que está saindo, e o que vale o dinheiro",
        },
        {
          title: "Cobertura de provas",
          desc: "As grandes, as locais, e as que ainda estão abertas",
        },
        {
          title: "Perfis de atletas",
          desc: "Os profissionais, e quem treina depois do trabalho",
        },
        {
          title: "O contexto que falta",
          desc: "Quanto tempo os tempos rápidos levaram, e o que custaram",
        },
        {
          title: "Cena de San Diego",
          desc: "Rotas, treinos em grupo, e onde todo mundo toma café depois",
        },
      ],
      closeEye: "Por onde começar",
      closeTitle: "Três caminhos",
      closeCards: [
        {
          href: "/culture/corridas-brasil-2026",
          title: "Corridas",
          desc: "Provas com inscrição aberta no Brasil, sem tempo mínimo",
        },
        {
          href: "/culture/join-a-run-club-not-a-runner",
          title: "Achar um clube",
          desc: "Como escolher um clube de corrida e o que esperar do primeiro treino",
        },
        {
          href: "/dispatch",
          title: "The Dispatch",
          desc: "Um e-mail por semana, provas e equipamentos, sem enrolação",
        },
      ],
    },
    author: {
      metaTitle: "Thais Oney, Suor Society",
      metaDescription:
        "Thais Oney é a fundadora do Suor Society. Brasileira, morando em San Diego, escreve sobre cultura de corrida híbrida: provas, equipamentos e treino que cabe no meio de todo o resto.",
      eyebrow: "Suor Society / Autora",
      name: "Thais Oney",
      role: "Fundadora e editora",
      photoAlt: "Retrato de Thais Oney, fundadora do Suor Society",
      bioLabel: "Quem escreve",
      bio: [
        "Thais Oney é a fundadora do Suor Society. Brasileira, morando em San Diego, tem MBA em Marketing Digital e Comunicação e construiu a carreira gerenciando campanhas de marketing multicanal nos setores de hotelaria, agências e bem-estar.",
        "Fora do trabalho, ela levanta peso, faz cross-training e corre, e já completou uma meia maratona. Criou o Suor Society para cobrir a cultura de corrida híbrida para quem treina no meio de tudo o mais que acontece na vida: as provas, os equipamentos, os atletas e o contexto que quase sempre fica de fora.",
      ],
      articlesLabel: "Textos da Thais",
      articles: [
        {
          href: "/culture/adizero-dropset-pro-vs-dropset-4",
          tag: "The Culture Archive",
          date: "Setembro 2026",
          title: "Adidas Adizero Dropset Pro vs Dropset 4: qual comprar?",
        },
        {
          href: "/culture/half-marathon-world-record",
          tag: "The Culture Archive",
          date: "Agosto 2026",
          title: "Recorde mundial da meia maratona: Kejelcha corre 56:51 em Buenos Aires",
        },
        {
          href: "/culture/run-and-lift-same-week",
          tag: "The Culture Archive",
          date: "Julho 2026",
          title: "Corrida e musculação na mesma semana sem se quebrar",
        },
        {
          href: "/dispatch/maratona-ikea-croydon-2026",
          tag: "The Dispatch",
          date: "Julho 2026",
          title: "A Maratona da IKEA É Real: 42km Dentro de Uma Loja",
        },
        {
          href: "/culture/why-everyone-started-running",
          tag: "The Culture Archive",
          date: "Julho 2026",
          title: "Por que todo mundo começou a correr? O boom da corrida, explicado",
        },
        {
          href: "/culture/join-a-run-club-not-a-runner",
          tag: "The Culture Archive",
          date: "Julho 2026",
          title: "Dá pra entrar num clube de corrida sem se achar corredor?",
        },
        {
          href: "/culture/corridas-brasil-2026",
          tag: "The Culture Archive",
          date: "Junho 2026",
          title: "As corridas de rua que valem a inscrição no Brasil em 2026",
        },
        {
          href: "/dispatch/hyrox-brasil-2026",
          tag: "HYROX",
          date: "Junho 2026",
          title: "HYROX no Brasil 2026: São Paulo volta maior em 17 de outubro",
        },
        {
          href: "/dispatch/june-2026-shoe-drops",
          tag: "Equipamentos",
          date: "Junho 2026",
          title: "Lançamentos de tênis de junho: Saucony aposta alto e a Puma tira a placa",
        },
        {
          href: "/dispatch/cape-town-marathon-major",
          tag: "Corridas",
          date: "Junho 2026",
          title: "Cidade do Cabo agora é uma Marathon Major. O que muda de verdade",
        },
      ],
      byLabel: "Por",
      cardLabel: "Sobre a autora",
      cardBlurb:
        "Thais Oney é a fundadora do Suor Society. Brasileira, morando em San Diego, tem MBA em Marketing Digital e Comunicação e escreve sobre cultura de corrida híbrida para quem não vive de treinar.",
      cardCta: "Bio completa →",
    },
    crew: {
      metaTitle: "Crew, Suor Society",
      metaDescription: "Treinos de sábado em San Diego. De graça, todos os ritmos, resenha depois.",
      eyebrow: "Suor Society / Crew",
      headline: "Corre com a gente",
      deck1: "De graça. Qualquer ritmo.",
      deck2: "San Diego.",
      nextRunEye: "Próximo treino",
      timeLabel: "Horário",
      meetLabel: "Ponto de encontro",
      costLabel: "Custo",
      costValue: "De graça. Sempre.",
      scheduledNotePre: "A convocação sai no ",
      scheduledNotePost: ". Confere antes de sair de casa.",
      unscheduledTitle: "Primeiro treino chegando",
      unscheduledNotePre:
        "Ainda não tem data no calendário. O primeiro sai logo, e toda convocação vai primeiro no ",
      unscheduledNotePost: ". Segue lá e você fica sabendo na hora.",
      formatEye: "O formato",
      lines: [
        "Manhãs de fim de semana",
        "De graça, sempre",
        "Todos os ritmos",
        "Quem é mais rápido espera em cada esquina",
        "A resenha depois",
      ],
      splitImgAlt: "Crew do Suor Society numa rua de San Diego com palmeiras",
      scenesEye: "Na rua",
      scenesAlts: {
        road: "Dois corredores numa estrada de manhã",
        trail: "Trail nos morros de San Diego",
        crew: "Corredores do Suor Society em movimento",
      },
    },
    dispatchForm: {
      successTag: "Você tá dentro",
      successTitleLines: ["Na", "Lista"],
      successBody:
        "O Dispatch chega na sua caixa de entrada toda semana. Corridas que valem a inscrição, equipamentos que valem a pena e a galera que faz os dois no meio de uma vida de verdade.",
      emailLabel: "E-mail *",
      placeholder: "seu@email.com",
      sending: "Enviando…",
      subscribe: "Assinar →",
      error:
        "Algo deu errado. Escreve pra gente em hello@suorsociety.com que a gente te adiciona na mão.",
      fine: "Sem spam. Um e-mail por semana. Cancele quando quiser.",
    },
    dispatch: {
      metaTitle: "Dispatch, Suor Society",
      metaDescription: "Um e-mail por semana. O mundo de quem corre e levanta peso, resumido.",
      eyebrow: "Suor Society / Dispatch",
      headline: "Receba o Dispatch",
      deck1: "Um e-mail por semana.",
      deck2: "O mundo de quem corre e levanta peso, resumido.",
      sectionLabel: "Últimas do Dispatch",
      sectionSub: "Notícias de provas · HYROX · Equipamentos",
      archiveLabel: "The Culture · Arquivo",
      archiveSub: "Treino · Equipamentos · Corridas",
      posts: [
        {
          href: "/dispatch/maratona-ikea-croydon-2026",
          img: "/ikea-marathon-hero.avif",
          tag: "Corridas",
          date: "Julho 2026",
          title: "A Maratona da IKEA É Real: 42km Dentro de Uma Loja",
          desc: "A primeira Maratona IKEA oficial acontece em 13 de dezembro dentro da IKEA de Croydon. 100 vagas, largada às 18h, corte de seis horas e uma medalha que você monta.",
        },
        {
          href: "/dispatch/hyrox-brasil-2026",
          img: "/hyrox-hero.jpg",
          tag: "HYROX",
          date: "Junho 2026",
          title: "HYROX no Brasil 2026: São Paulo volta maior em 17 de outubro",
          desc: "São Paulo em 17 de outubro no Distrito Anhembi, mais Rio e Fortaleza. Datas, cidades e como treinar pra prova.",
        },
        {
          href: "/dispatch/june-2026-shoe-drops",
          img: "/june-shoe-drops-hero.webp",
          tag: "Equipamentos",
          date: "Junho 2026",
          title: "Lançamentos de tênis de junho: Saucony aposta alto e a Puma tira a placa",
          desc: "O Endorphin Elite 3, um Puma sem placa de carbono por US$ 150 e por que os super trainers sem placa viraram tendência.",
        },
        {
          href: "/dispatch/cape-town-marathon-major",
          img: "/cape-town-hero.jpg",
          tag: "Corridas",
          date: "Junho 2026",
          title: "Cidade do Cabo agora é uma Marathon Major. O que muda de verdade",
          desc: "A primeira Abbott World Marathon Major da África entra para a série em 23 de maio de 2027. O que isso faz com a busca pelas seis estrelas.",
        },
      ],
      readLabel: "Ler →",
      asideLabel: "O Dispatch semanal",
      asideTitleLines: ["Assine", "De graça"],
      asideDesc:
        "Corridas que valem a inscrição e equipamentos que valem a pena. Um e-mail por semana, sem bombardeio diário.",
      asideWhat: [
        "Corridas de inscrição aberta que valem o fim de semana",
        "Treino híbrido e equipamentos que a gente usa de verdade",
        "Treinos e encontros da crew em San Diego",
      ],
    },
    racepicks: {
      metaTitle: "Race Picks, Suor Society",
      metaDescription:
        "Race Picks. As corridas de rua que valem a inscrição no Brasil em 2026, com datas, distâncias e links diretos, tudo num lugar só.",
      eyebrow: "Suor Society / Race Picks",
      headline: "Race Picks",
      deck1: "Corridas de inscrição aberta e provas que valem o seu ciclo de treino.",
      deck2: "Sem índice, sem sorteio, sem achismo.",
      featureHref: "/culture/corridas-brasil-2026",
      featureImg: "/sao-silvestre-hero.webp",
      featureTag: "Guia de Corridas",
      featureDate: "Junho 2026",
      featureTitle: "As corridas de rua que valem a inscrição no Brasil em 2026",
      featureDesc:
        "São Silvestre, maratonas de SP e Rio, circuitos e provas que valem a viagem. Datas, distâncias e links diretos de inscrição.",
      readLabel: "Ler o guia →",
    },
    downloadGate: {
      successTag: "Você tá dentro",
      successTitleLines: ["Seu", "Guia", "Está Pronto"],
      successBody:
        "As grandes corridas do Brasil em 2026 num PDF formatado. Maratonas, meias e provas de rua, com datas, distâncias e links diretos de inscrição.",
      nameLabel: "Nome",
      namePlaceholder: "Seu nome",
      emailLabel: "E-mail *",
      emailPlaceholder: "seu@email.com",
      sending: "Enviando…",
      submit: "Quero o guia →",
      error:
        "Algo deu errado. Escreve pra gente em hello@suorsociety.com que a gente envia direto.",
      fine: "Sem spam. Só o guia. Cancele quando quiser.",
      downloadBtn: "Baixar o PDF →",
      pdfHref: "/guia-corridas-brasil-2026.pdf",
      pdfName: "Guia_Corridas_Brasil_2026_SuorSociety.pdf",
    },
  },
};
