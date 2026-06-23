// Central place for site copy in each language.
//
// Scope note (phase 1): only the home page is translated. The brand headline
// and hero tagline stay in English on every locale on purpose — they read as
// the brand line, not as copy to translate. Brand/section names (The Culture,
// The Dispatch, Race Picks, Crew) also stay in English.
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
    heroCta: string;
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
    col1Label: string;
    col1: string[];
    col2Label: string;
    col2: string[];
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
  };
};

export const dictionaries: Record<Lang, Dictionary> = {
  en: {
    nav: {
      langLabel: "Select language",
    },
    home: {
      heroCta: "See Races Left in 2026",
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
      col1Label: "The founder",
      col1: [
        "I’m Thais. Marketer by day. Runner and lifter the rest of the time, six days a week, because nothing else clears my head like it does.",
        "Not for aesthetics. For the feeling of being strong and capable in your body and what happens to your brain when you stay consistent about it. Long runs before work. Tuesday squats at the gym. Strava screenshots, fast or slow.",
        "This started as something personal. Then I looked around for a page covering the lift-and-run world the way it deserved and couldn’t find it. So I built one.",
      ],
      col2Label: "What this is",
      col2: [
        "Most hybrid content online is made by people whose whole life is training. Two-a-days, full sponsorships, 20-hour weeks. It’s inspiring. It’s also completely disconnected from the person with a real job, a commute, and forty minutes on a Tuesday.",
        "Suor Society covers the lift-and-run world as a culture page. Shoe drops, athlete spotlights, race coverage, the San Diego scene. Plus the context that’s almost always missing: the 1:10 half marathon took eight years. Your run counts the whole time you’re chasing it.",
        "Ran my first half marathon this spring. Lifting around the mileage. Posting all of it.",
      ],
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
    },
  },

  pt: {
    nav: {
      langLabel: "Selecionar idioma",
    },
    home: {
      heroCta: "Veja as corridas que faltam em 2026",
      boardTitle: "O mural",
      boardPosts: [
        {
          href: "/culture/open-entry-races-2026",
          img: "/race-hero.jpg",
          eyebrow: "The Culture · Arquivo",
          title: "Race Picks",
          desc: "As melhores corridas de inscrição aberta na Califórnia e nos EUA. Todas certificadas. Sem índice.",
          meta: "Novo · Junho 2026 ↗",
        },
        {
          href: "/dispatch/hyrox-fall-2026-schedule",
          img: "/hyrox-hero.jpg",
          eyebrow: "The Dispatch",
          title: "Calendário HYROX – 2º semestre de 2026",
          desc: "10 provas, quatro cidades novas e Anaheim de volta de 4 a 6 de dezembro. O calendário completo da América do Norte.",
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
      // "Suor" already means sweat in Portuguese, so the English line that
      // explains the name would fall flat here — adapt the spirit instead.
      headline: "Tudo começa no suor",
      col1Label: "A fundadora",
      col1: [
        "Sou a Thais. Marketing de dia. Corro e levanto peso no resto do tempo, seis dias por semana, porque nada esvazia a minha cabeça como isso.",
        "Não é pela estética. É pela sensação de ser forte e capaz no próprio corpo — e pelo que acontece com a sua cabeça quando você mantém a constância. Longão antes do trabalho. Agachamento na terça, na academia. Print do Strava, rápido ou devagar.",
        "Começou como uma coisa pessoal. Aí fui procurar uma página que cobrisse o mundo de quem corre e levanta peso do jeito que merece, e não achei. Então construí uma.",
      ],
      col2Label: "O que é isso aqui",
      col2: [
        "A maior parte do conteúdo híbrido na internet é feita por gente cuja vida inteira é treino. Dois treinos por dia, patrocínio cheio, 20 horas por semana. É inspirador. E também totalmente desconectado de quem tem um trabalho de verdade, trânsito todo dia e quarenta minutos numa terça.",
        "O Suor Society cobre o mundo de quem corre e levanta peso como página de cultura. Lançamentos de tênis, perfis de atletas, cobertura de provas, a cena de San Diego. Mais o contexto que quase sempre falta: aquela meia maratona de 1h10 levou oito anos. A sua corrida vale o tempo inteiro em que você corre atrás dela.",
        "Corri minha primeira meia maratona este ano. Puxando ferro no meio da quilometragem. Postando tudo.",
      ],
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
    },
  },
};
