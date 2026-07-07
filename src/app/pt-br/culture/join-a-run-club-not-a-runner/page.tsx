import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { PostSubscribe } from "@/components/PostAside";
import AuthorCard from "@/components/AuthorCard";

export const metadata = {
  title: "Dá pra entrar num clube de corrida sem se achar corredor?, Suor Society",
  description:
    "Dá. A maioria dos clubes de corrida é de graça, ninguém fica pra trás, e tá cheio de gente que teve a mesma dúvida. O que todos os paces são bem-vindos significa na prática.",
  alternates: {
    canonical: "/pt-br/culture/join-a-run-club-not-a-runner",
    languages: {
      en: "/culture/join-a-run-club-not-a-runner",
      "pt-BR": "/pt-br/culture/join-a-run-club-not-a-runner",
    },
  },
  openGraph: { locale: "pt_BR" },
};

const FAQS = [
  {
    q: "Preciso ser rápido pra entrar num clube de corrida?",
    a: "Não. Na maioria dos clubes ninguém fica pra trás: o grupo reagrupa pra ninguém se perder. Num clube típico tem de tudo no mesmo treino, de pace de 4 min/km a intervalos de corrida e caminhada.",
  },
  {
    q: "E se eu precisar caminhar no meio?",
    a: "Pausas pra caminhar são padrão em clubes pra iniciantes, e muito corredor experiente usa de propósito. Alternar corrida e caminhada é como muita gente termina os primeiros 5 km, e até maratonas.",
  },
  {
    q: "Clube de corrida custa alguma coisa?",
    a: "A maioria é de graça. Alguns cobram por eventos especiais ou vendem uma camiseta de vez em quando, mas aparecer numa semana normal não custa nada.",
  },
  {
    q: "O que levar no primeiro treino em grupo?",
    a: "Um tênis confortável, água se estiver calor e o celular. Ninguém vai conferir seu equipamento.",
  },
  {
    q: "Como acho um clube de corrida perto de mim?",
    a: "O Instagram é onde a maioria se organiza: procure o nome do seu bairro ou da sua cidade junto com clube de corrida ou run club. E se estiver vindo pra San Diego, os treinos de crew da SUOR SOCIETY estão chegando no calçadão de Pacific Beach. Sem data ainda, o Dispatch recebe primeiro.",
  },
];

const SWAP = [
  { think: "Correr o caminho inteiro", need: "Cobrir a distância do jeito que der" },
  { think: "Um pace “de verdade”", need: "Qualquer pace, alternar conta" },
  { think: "Roupa de corrida certa", need: "O que você usaria pra academia" },
  { think: "Tênis com placa de carbono", need: "O tênis que você já tem" },
  { think: "Conhecer alguém lá", need: "Dar oi pra uma pessoa" },
];

export default function EntrarNumClubeDeCorrida() {
  return (
    <>
      <SiteNav lang="pt" />

      <main className="post">
        {/* ── ARTICLE MASTHEAD (title above the cover) ── */}
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">The Culture Archive &nbsp;/&nbsp; Julho 2026</div>
            <h1 className="article-headline">
              Dá pra entrar num clube de corrida sem se achar <span>corredor</span>?
            </h1>
          </div>
        </section>

        {/* ── COVER IMAGE ── */}
        <div className="article-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/run-club-hero.jpg"
            alt="Grupo de corredores em movimento numa rua ensolarada, pernas e tênis desfocados num treino em grupo"
          />
        </div>

        {/* ── BODY + STICKY RAIL ── */}
        <div className="post-shell">
          <div className="post-main">

        {/* ── ARTICLE HERO (deck + meta) ── */}
        <section className="article-hero">
          <div className="page">
            <p className="article-deck">
              Dá. A maioria dos clubes de corrida é de graça, ninguém fica pra trás, e tá cheio
              de gente que teve exatamente essa dúvida antes do primeiro treino. Se você
              consegue cobrir 5 km correndo, caminhando ou alternando os dois, você pode
              aparecer. Ninguém ali tá conferindo o seu pace.
            </p>
            <div className="article-meta">
              <span>Por <a href="/pt-br/author/thais-oney">Thais Oney</a></span>
              <span>San Diego, CA</span>
              <span>Atualizado em julho de 2026</span>
            </div>
          </div>
        </section>

        {/* ── BODY ── */}
        <section className="article-body">
          <div className="page">
            <p>
              Se você anda se perguntando se pode aparecer num clube de corrida sem se
              considerar corredor, a resposta curta é sim, e você nem seria minoria. Aqui vai
              como isso funciona na prática, visto de dentro.
            </p>

            <h2>Por que os clubes de corrida cresceram tanto (não é pra ficar mais rápido)</h2>
            <p>
              Clube de corrida virou febre, e os números explicam. Os clubes de corrida no
              Strava cresceram 3,5x em 2025, e a geração Z tem 39% mais chance que a geração X
              de{" "}
              <a
                href="https://press.strava.com/articles/strava-releases-12th-annual-year-in-sport-trend-report-2025"
                target="_blank"
                rel="noopener noreferrer"
              >
                usar o treino pra conhecer gente
              </a>{" "}
              com os mesmos interesses. E numa{" "}
              <a
                href="https://racery.com/blog/2015/06/23/to-run-farther-run-together/"
                target="_blank"
                rel="noopener noreferrer"
              >
                pesquisa com corredores de grupo
              </a>
              , quem costuma correr acompanhado cobre cerca de 26% mais distância por corrida do
              que quem corre sozinho. Mais ou menos um quilômetro e meio a mais, só por ter
              companhia.
            </p>
            <p>
              Então o crescimento não é porque todo mundo resolveu levar a corrida a sério. É
              por ter um compromisso de sábado de manhã com gente que aparece de verdade. Se o
              que te segura é não se achar corredor, essa é a parte que ninguém ali liga.
            </p>

            <h2>O que &ldquo;todos os paces são bem-vindos&rdquo; significa na prática</h2>
            <p>Todo clube fala isso. Na prática, num treino onde ninguém fica pra trás, é assim:</p>
            <ul>
              <li>
                O grupo se divide naturalmente nos primeiros 800 metros, e você acaba do lado de
                quem corre no seu ritmo
              </li>
              <li>
                No-drop quer dizer que a frente reagrupa nas curvas e nos sinais. Você nunca se
                perde e ninguém te espera de cronômetro na mão
              </li>
              <li>
                Pausa pra caminhar é normal. Em qualquer clube decente, tem alguém caminhando
                parte do percurso toda semana
              </li>
              <li>
                O treino acaba, o pessoal fica um pouco, você vai embora. É só isso
              </li>
            </ul>
            <p>
              Corri minha primeira meia maratona em maio e ainda fico nervosa chegando num grupo
              que não conheço. Ser nova no grupo parece muito com não pertencer. Não é a mesma
              coisa.
            </p>

            <h2>O que você acha que precisa vs o que precisa de verdade</h2>
            <div className="swap-table">
              <div className="swap-row swap-head">
                <span>Você acha que precisa</span>
                <span>Precisa de verdade</span>
              </div>
              {SWAP.map((row, i) => (
                <div key={i} className="swap-row">
                  <span>{row.think}</span>
                  <span>{row.need}</span>
                </div>
              ))}
            </div>

            <h2>E se você estiver vindo pra San Diego</h2>
            <p>
              Os treinos de crew da SUOR SOCIETY estão chegando: sábado de manhã no calçadão de
              Pacific Beach, 5 a 8 km, de graça, todos os paces, incluindo corrida com
              caminhada. Se a viagem ou a mudança te trouxer pra cá, apareça no primeiro.{" "}
              <a href="/pt-br/dispatch">O Dispatch</a> recebe a data primeiro.
            </p>
            <p>
              E quando os treinos em grupo virarem vontade de ter uma prova sua, o nosso{" "}
              <a href="/pt-br/culture/corridas-brasil-2026">guia de corridas no Brasil</a> lista
              provas pra se inscrever hoje, sem sorteio, sem índice.
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="faq-section">
          <div className="page">
            <div className="faq-head">Perguntas Frequentes</div>
            {FAQS.map((f, i) => (
              <div key={i} className="faq-item">
                <div className="faq-q">{f.q}</div>
                <p className="faq-a">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── AUTHOR ── */}
        <AuthorCard lang="pt" />

          </div>{/* /.post-main */}

          <aside className="post-aside post-aside--sub">
            <PostSubscribe lang="pt" />
          </aside>
        </div>{/* /.post-shell */}

      </main>

      <SiteFooter lang="pt" />
    </>
  );
}
