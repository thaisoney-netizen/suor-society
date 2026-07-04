// Central place for site copy in each language.
//
// Scope note: the brand headline ("For runners / for lifters / …") stays in
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
    signupError: string;
  };
  footer: {
    desc: string;
    exploreTitle: string;
    connectTitle: string;
    location: string;
  };
  // Cross-language suggestion banner (shown to pt-speaking visitors on /).
  suggest: {
    text: string;
    cta: string;
    dismiss: string;
  };
  about: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    headline: string;
    mediaAlts: { press: string; pull: string };
    col2Label: string;
    col2: string[];
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
    home: {
      heroTag: "Race picks, gear, and culture for people who lift and run.",
      heroCta: "See Races Left in 2026",
      heroCtaHref: "/culture/open-entry-races-2026",
      boardTitle: "The board",
      boardPosts: [
        {
          href: "/culture/open-entry-races-2026",
          img: "/race-hero.jpg",
          eyebrow: "The Culture Archive",
          title: "Race Picks",
          desc: "Best open entry races in California and the US. All certified. No qualifier needed.",
          meta: "New · June 2026 ↗",
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
          img: "/june-shoe-drops-hero.png",
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
      signupError:
        "Something went wrong. Email us at hello@suorsociety.com and we’ll add you directly.",
    },
    footer: {
      desc: "Hybrid running culture from San Diego. Races, gear, and the people who lift and run around everything else.",
      exploreTitle: "Explore",
      connectTitle: "Connect",
      location: "San Diego, CA",
    },
    suggest: {
      text: "Want to read this in English?",
      cta: "Read in English",
      dismiss: "Dismiss",
    },
    about: {
      metaTitle: "About, Suor Society",
      metaDescription:
        "Built in San Diego by a marketer who runs and lifts. Hybrid running culture for people with a real life.",
      eyebrow: "Suor Society / The Culture",
      headline: "Suor is Portuguese for sweat",
      mediaAlts: {
        press: "Thais pressing a kettlebell overhead",
        pull: "Thais working through pull-ups on the rack",
      },
      col2Label: "What this is",
      col2: [
        "Most hybrid content online is made by people whose whole life is training. Two-a-days, full sponsorships, 20-hour weeks. It’s inspiring. It’s also completely disconnected from anyone building this around an actual life, kids, a business, whatever the rest of your day looks like.",
        "Suor Society is a hybrid culture page for people who run and lift around everything else already going on. Shoe drops, athlete spotlights, race coverage. Plus the context that’s almost always missing: the 1:10 half marathon took eight years. Your run counts the whole time you’re chasing it.",
      ],
    },
    author: {
      metaTitle: "Thais Oney, Suor Society",
      metaDescription:
        "Thais Oney is the founder of Suor Society. Originally from Brazil and based in San Diego, she writes about hybrid running culture: races, gear, and training around a real life.",
      eyebrow: "Suor Society / Author",
      name: "Thais Oney",
      role: "Founder & Editor",
      photoAlt: "Thais Oney pressing a kettlebell overhead",
      bioLabel: "Who writes this",
      bio: [
        "Thais Oney is the founder of Suor Society. Originally from Brazil and based in San Diego, she holds an MBA in Digital Marketing and Communications and has spent her career running multi-channel marketing campaigns across the hospitality, agency, and wellness industries.",
        "Outside of work she lifts, cross-trains, and runs, and has completed a half marathon. She started Suor Society to cover hybrid running culture for people who train around everything else in their life: the races, the gear, the athletes, and the context that usually gets left out.",
      ],
      articlesLabel: "Articles by Thais",
      articles: [
        {
          href: "/culture/open-entry-races-2026",
          tag: "The Culture Archive",
          date: "June 2026",
          title: "40 Open Entry Races in California and the US You Can Still Run in 2026",
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
        "Thais Oney is the founder of Suor Society. Originally from Brazil and based in San Diego, she holds an MBA in Digital Marketing and Communications and writes about hybrid running culture for people who train around a real life.",
      cardCta: "Read full bio →",
    },
    crew: {
      metaTitle: "Crew, Suor Society",
      metaDescription: "Saturday crew runs in San Diego. Free, every pace, coffee after.",
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
        "Coffee after",
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
        "The dispatch lands in your inbox each week. Races worth signing up for, gear worth knowing about, and the people doing both around a real life.",
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
      posts: [
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
          img: "/june-shoe-drops-hero.png",
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
      featureTitle: "40 Open Entry Races in California and the US You Can Still Run in 2026",
      featureDesc:
        "No qualifier, no lottery. 20 California races, 20 across the US, all USATF certified, with dates, prices, and direct registration links.",
      readLabel: "Read the guide →",
    },
    downloadGate: {
      successTag: "You’re in",
      successTitleLines: ["Your", "Guide", "Is Ready"],
      successBody:
        "40 open entry races. 20 in California, 20 across the US. All certified. From now through spring 2027.",
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
    home: {
      heroTag: "Corridas, equipamentos e cultura para quem levanta peso e corre.",
      heroCta: "Veja as corridas que faltam em 2026",
      heroCtaHref: "/culture/corridas-brasil-2026",
      boardTitle: "O mural",
      boardPosts: [
        {
          href: "/culture/corridas-brasil-2026",
          img: "/sao-silvestre-hero.webp",
          eyebrow: "The Culture · Arquivo",
          title: "Race Picks",
          desc: "As corridas de rua que valem a inscrição no Brasil em 2026. São Silvestre, maratonas de SP e Rio e mais.",
          meta: "Novo · Junho 2026 ↗",
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
          img: "/june-shoe-drops-hero.png",
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
      signupError:
        "Algo deu errado. Escreve pra gente em hello@suorsociety.com que a gente te adiciona na mão.",
    },
    footer: {
      desc: "Cultura de corrida híbrida direto de San Diego. Corridas, equipamentos e gente que corre e levanta peso no meio de uma vida corrida.",
      exploreTitle: "Explorar",
      connectTitle: "Contato",
      location: "San Diego, CA",
    },
    // Shown on the English home to visitors whose browser prefers Portuguese.
    suggest: {
      text: "Quer ler em português?",
      cta: "Ler em português",
      dismiss: "Fechar",
    },
    about: {
      metaTitle: "Sobre, Suor Society",
      metaDescription:
        "Feito em San Diego por uma profissional de marketing que corre e levanta peso. Cultura de corrida híbrida para quem tem uma vida de verdade.",
      eyebrow: "Suor Society / The Culture",
      // Brand line — stays in English on every locale, like the home hero
      // headline and tagline.
      headline: "Suor is Portuguese for sweat",
      mediaAlts: {
        press: "Thais empurrando um kettlebell acima da cabeça",
        pull: "Thais fazendo barras na grade",
      },
      col2Label: "O que é isso aqui",
      col2: [
        "A maior parte do conteúdo híbrido na internet é feita por gente cuja vida inteira é treino. Dois treinos por dia, patrocínio cheio, 20 horas por semana. É inspirador. E também totalmente desconectado de quem constrói isso em cima de uma vida de verdade, filhos, um negócio, o que for que o resto do seu dia tiver.",
        "O Suor Society é uma página de cultura híbrida para quem corre e levanta peso no meio de tudo mais que já está rolando. Lançamentos de tênis, perfis de atletas, cobertura de provas. Mais o contexto que quase sempre falta: aquela meia maratona de 1h10 levou oito anos. A sua corrida vale o tempo inteiro em que você corre atrás dela.",
      ],
    },
    author: {
      metaTitle: "Thais Oney, Suor Society",
      metaDescription:
        "Thais Oney é a fundadora do Suor Society. Brasileira, morando em San Diego, escreve sobre cultura de corrida híbrida: provas, equipamentos e treino no meio da vida real.",
      eyebrow: "Suor Society / Autora",
      name: "Thais Oney",
      role: "Fundadora e editora",
      photoAlt: "Thais Oney empurrando um kettlebell acima da cabeça",
      bioLabel: "Quem escreve",
      bio: [
        "Thais Oney é a fundadora do Suor Society. Brasileira, morando em San Diego, tem MBA em Marketing Digital e Comunicação e construiu a carreira gerenciando campanhas de marketing multicanal nos setores de hotelaria, agências e bem-estar.",
        "Fora do trabalho, ela levanta peso, faz cross-training e corre, e já completou uma meia maratona. Criou o Suor Society para cobrir a cultura de corrida híbrida para quem treina no meio de tudo o mais que acontece na vida: as provas, os equipamentos, os atletas e o contexto que quase sempre fica de fora.",
      ],
      articlesLabel: "Textos da Thais",
      articles: [
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
        "Thais Oney é a fundadora do Suor Society. Brasileira, morando em San Diego, tem MBA em Marketing Digital e Comunicação e escreve sobre cultura de corrida híbrida para quem treina no meio da vida real.",
      cardCta: "Bio completa →",
    },
    crew: {
      metaTitle: "Crew, Suor Society",
      metaDescription: "Treinos de sábado em San Diego. De graça, todos os ritmos, café depois.",
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
        "Café depois",
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
      posts: [
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
          img: "/june-shoe-drops-hero.png",
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
