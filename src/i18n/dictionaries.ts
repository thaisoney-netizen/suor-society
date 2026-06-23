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
    // Manual language switch shown in the nav. `label` is the language the
    // link switches TO.
    switchLabel: string;
    switchAria: string;
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
};

export const dictionaries: Record<Lang, Dictionary> = {
  en: {
    nav: {
      switchLabel: "PT",
      switchAria: "Ler em português",
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
  },

  pt: {
    nav: {
      switchLabel: "EN",
      switchAria: "Read in English",
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
  },
};
