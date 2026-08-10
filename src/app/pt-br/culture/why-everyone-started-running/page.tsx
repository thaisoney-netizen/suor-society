import type { ReactNode } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { PostToc } from "@/components/PostAside";
import AuthorCard from "@/components/AuthorCard";
import { pageMeta, ArticleJsonLd, FaqJsonLd } from "@/lib/seo";

const META = {
  path: "/pt-br/culture/why-everyone-started-running",
  title: "Por que todo mundo começou a correr? O boom da corrida, explicado, Suor Society",
  description:
    "Não é impressão sua. As provas passaram os níveis pré-pandemia, a participação em clubes de corrida saltou 59% em um ano e Londres recebeu 1,1 milhão de inscrições no sorteio. Os números por trás do boom da corrida e o que mudou depois de 2024.",
  image: "/running-boom-hero.webp",
};
export const metadata = pageMeta({ ...META, paired: true });

const TOC = [
  { id: "numbers", label: "Em números" },
  { id: "after-2024", label: "O que mudou depois de 2024" },
  { id: "run-clubs", label: "O efeito dos clubes de corrida" },
  { id: "who", label: "Quem está correndo agora" },
  { id: "new", label: "Se você acabou de começar" },
  { id: "faq", label: "Perguntas Frequentes" },
];

const THEN_NOW = [
  { then: "Provas ainda abaixo de 2019", now: "Acima do pré-pandemia, com provas crescendo 8,2% em média em 2024" },
  { then: "Clube de corrida era coisa de nicho", now: "Participação em clubes de corrida subiu 59% em um único ano" },
  { then: "Maior maratona do mundo com uns 50 mil", now: "Mais de 56 mil finishers, recorde quebrado duas vezes no mesmo ano" },
  { then: "Sorteio de Londres sempre disputado", now: "1,1 milhão de inscrições para a prova de 2026" },
  { then: "Menores de 25 eram uns 5% das grandes provas", now: "Mais de 10% agora, o dobro de cinco anos atrás" },
];

const FAQS: { q: string; a: ReactNode; plain?: string }[] = [
  {
    q: "Por que todo mundo está correndo de repente?",
    a: "Porque a corrida virou social. Depois de 2024, clubes de corrida, treinos em grupo e provas viraram o jeito de as pessoas se encontrarem, não só um hábito de treino. O Strava registrou um salto de 59% na participação em clubes de corrida em um ano, e conexão social é hoje o principal motivo que as pessoas dão pra treinar.",
  },
  {
    q: "Quando começou o boom da corrida?",
    a: "A pandemia deu um empurrão em 2020, mas era gente correndo sozinha. O boom atual decolou em 2024, e tem outra cara: é em grupo, mais jovem e construído em volta de aparecer junto com outras pessoas.",
  },
  {
    q: "A corrida está mesmo mais popular que antes da pandemia?",
    a: "Está. A participação em provas passou os níveis de 2019 pela primeira vez desde a pandemia, com provas crescendo cerca de 8,2% em média em 2024 e o número de finishers de maratona subindo 26% de um ano pro outro.",
  },
  {
    q: "Por que os clubes de corrida estão tão populares?",
    a: "Eles resolveram dois problemas de uma vez: um compromisso fixo pra se mexer e um lugar pra conhecer gente. Numa pesquisa, 66% da geração Z disse que fez amigos novos num grupo de treino e um em cada cinco conheceu um date lá. A corrida é a desculpa. As pessoas são o motivo.",
  },
  {
    q: "É tarde demais pra começar a correr em 2026?",
    plain:
      "Nem de longe. Na Maratona de Paris de 2025, 51% do pelotão estava correndo uma maratona pela primeira vez. Os estreantes não estão atrás do boom, eles são o boom. Se quiser um jeito de entrar sem pressão, entre num clube de corrida antes mesmo de pendurar um número no peito.",
    a: (
      <>
        Nem de longe. Na Maratona de Paris de 2025, 51% do pelotão estava correndo uma maratona
        pela primeira vez. Os estreantes não estão atrás do boom, eles são o boom. Se quiser um
        jeito de entrar sem pressão,{" "}
        <a href="/pt-br/culture/join-a-run-club-not-a-runner">entre num clube de corrida</a> antes
        mesmo de pendurar um número no peito.
      </>
    ),
  },
];

export default function PorQueTodoMundoComecouACorrer() {
  return (
    <>
      <ArticleJsonLd {...META} datePublished="2026-07-07" />
      <FaqJsonLd faqs={FAQS} />
      <SiteNav lang="pt" />

      <main className="post">
        {/* ── ARTICLE MASTHEAD (title above the cover) ── */}
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">The Culture Archive &nbsp;/&nbsp; Julho 2026</div>
            <h1 className="article-headline">
              Por que todo mundo começou a <span>correr</span>?
            </h1>
          </div>
        </section>

        {/* ── COVER IMAGE ── */}
        {/* Heads sit right at the top of this frame, so the shared `center 30%`
            crop cuts the rightmost runner's face. Anchor to the top instead. */}
        <div className="article-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            style={{ objectPosition: "center top" }}
            src="/running-boom-hero.webp"
            alt="Quatro corredores lado a lado numa cobertura acima da cidade num dia claro"
          />
        </div>

        {/* ── BODY + STICKY RAIL ── */}
        <div className="post-shell">
          <div className="post-main">

            {/* ── ARTICLE HERO (deck + meta) ── */}
            <section className="article-hero">
              <div className="page">
                <p className="article-deck">
                  Se parece que todo mundo que você conhece começou a correr este ano, não é
                  impressão sua. A participação em provas passou os níveis pré-pandemia, a
                  participação em clubes de corrida saltou 59% em um único ano e a Maratona de
                  Londres de 2026 recebeu um recorde de 1,1 milhão de inscrições no sorteio. Depois
                  de 2024, correr deixou quietinho de ser um hábito solitário de treino e virou o
                  programa que as pessoas fazem pra se ver.
                </p>
                <div className="article-meta">
                  <span>Por <a href="/pt-br/author/thais-oney">Thais Oney</a></span>
                  <span>San Diego, CA</span>
                  <span>Julho 2026</span>
                </div>
              </div>
            </section>

            {/* ── INTRO ── */}
            <section className="article-body">
              <div className="page">
                <p>
                  Alguma coisa mudou, e os dados finalmente alcançaram o grupo do WhatsApp. O boom
                  da corrida é real, dá pra medir, e não é só mais gente trotando por aí. Mudou quem
                  corre, por que corre e pra que serve uma corrida. Aqui está o que aconteceu, e o
                  que isso significa se quem acabou de amarrar o tênis foi você.
                </p>
              </div>
            </section>

            {/* ── NUMBERS ── */}
            <section id="numbers" className="article-body">
              <div className="page">
                <h2>O boom, em números</h2>
                <p>
                  Comece pela participação. Segundo o relatório RaceTrends 2024 do RunSignup, a
                  prova média cresceu cerca de 8,2% no ano, e a participação geral em provas
                  finalmente{" "}
                  <a
                    href="https://www.runningusa.org/running-usa-news/running-usa-launches-the-2024-top-races-report-celebrating-a-historic-year-for-running/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    passou o nível pré-pandemia de 2019
                  </a>{" "}
                  pela primeira vez desde a COVID. O número de finishers de maratona subiu 26% de um
                  ano pro outro.
                </p>
                <p>
                  Aí os recordes começaram a cair. O título de maior maratona do mundo foi quebrado
                  duas vezes no mesmo ano, primeiro em Berlim, depois na TCS New York City Marathon,
                  com mais de 56 mil finishers. A Maratona de Paris de 2025 bateu o próprio recorde
                  de participação com 56.950 corredores, e 51% deles estavam correndo uma maratona
                  pela primeira vez na vida.
                </p>
                <p>
                  O sinal mais claro de quanta gente quer entrar: a Maratona de Londres de 2026
                  recebeu 1,1 milhão de inscrições no sorteio. Pra dar escala, isso é mais ou menos
                  o número de pessoas que terminam uma maratona no mundo inteiro em um ano, todas
                  atrás da mesma largada.
                </p>

                <div className="swap-table">
                  <div className="swap-row swap-head">
                    <span>Alguns anos atrás</span>
                    <span>Agora (2024 a 2026)</span>
                  </div>
                  {THEN_NOW.map((row, i) => (
                    <div key={i} className="swap-row">
                      <span>{row.then}</span>
                      <span>{row.now}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── WHAT CHANGED AFTER 2024 ── */}
            <section id="after-2024" className="article-body">
              <div className="page">
                <h2>O que mudou de verdade depois de 2024</h2>
                <p>
                  A corrida teve um momento em 2020 também, mas aquele era diferente. Era gente
                  presa em casa procurando algo pra fazer sozinha. Este boom é o oposto. Ele é
                  construído em volta de outras pessoas.
                </p>
                <p>
                  O relatório Year in Sport do Strava, com dados de mais de 135 milhões de pessoas
                  em mais de 190 países, registrou participação em clubes de corrida 59% maior em
                  2024, e corridas registradas em grupos de 10 ou mais subindo 18%. As pessoas não
                  só começaram a correr. Começaram a correr juntas, e é essa parte que transformou
                  uma tendência fitness numa mudança de cultura.
                </p>
              </div>
            </section>

            {/* ── RUN CLUBS ── */}
            <section id="run-clubs" className="article-body">
              <div className="page">
                <h2>O clube de corrida virou o programa, não o treino</h2>
                <p>
                  &ldquo;Clube de corrida em vez de balada&rdquo; começou como piada e virou dado
                  concreto.{" "}
                  <a
                    href="https://press.strava.com/articles/strava-releases-annual-year-in-sport-trend"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    O relatório do Strava
                  </a>{" "}
                  mostrou que conexão social é hoje um dos principais motivos pra se mexer. Na
                  geração Z, 66% disseram que fizeram amigos novos num grupo de treino, 55% disseram
                  que interação social era o principal motivo pra entrar, e um em cada cinco
                  conheceu um date numa atividade em grupo.
                </p>
                <p>
                  Então a corrida não é bem o ponto. O compromisso fixo é. Um sábado que você não
                  precisa organizar, com gente que aparece de verdade, terminando com todo mundo na
                  resenha depois. Era isso que estava faltando, e a corrida por acaso foi o que
                  resolveu.
                </p>
              </div>
            </section>

            {/* ── WHO'S RUNNING ── */}
            <section id="who" className="article-body">
              <div className="page">
                <h2>Quem está aparecendo agora</h2>
                <p>
                  Gente mais jovem, e mais nova no esporte. Menores de 25 anos já são mais de 10%
                  dos pelotões das grandes maratonas, o dobro de cinco anos atrás, e a geração Z é
                  quem está puxando as inscrições de prova de rua pra cima. Boa parte de quem está
                  em qualquer largada este ano nunca tinha corrido uma. Metade do pelotão de Paris,
                  lembra, estava estreando.
                </p>
                <p>
                  E não é só no asfalto. Trail e ultra cresceram ainda mais rápido. Ultramaratonas
                  entre 80 e 160 km tiveram um salto de 77% na participação em 2024, e as largadas
                  em provas do UTMB Index no começo de 2025 rodaram{" "}
                  <a href="https://runrepeat.com/the-state-of-us-marathons-2025" target="_blank" rel="noopener noreferrer">
                    2,4 vezes acima
                  </a>{" "}
                  do mesmo período de 2022, com 42% desses corredores fazendo trail pela primeira
                  vez. As bordas do esporte cresceram tão rápido quanto o meio.
                </p>
              </div>
            </section>

            {/* ── IF YOU JUST STARTED ── */}
            <section id="new" className="article-body">
              <div className="page">
                <h2>Se quem acabou de começar é você</h2>
                <p>
                  Então você é a história, não um atrasado nela. O boom inteiro é feito de gente na
                  primeira temporada, e isso me inclui no lado das distâncias longas. Corri minha
                  primeira meia maratona em maio, com anos de musculação nas costas mas nova em ir
                  longe de verdade. Ser novo em algo não é a mesma coisa que estar atrás.
                </p>
                <p>
                  A armadilha é achar que você precisa de um tempo rápido ou de uma agenda de atleta
                  antes de qualquer coisa contar. Não precisa. Talvez um dia você corra uma meia
                  rápida, o AINDA existe, e a corrida de 40 minutos que você encaixa no meio de um
                  trabalho em tempo integral conta o tempo inteiro em que você corre atrás disso. As
                  duas coisas são verdade ao mesmo tempo.
                </p>
                <p>
                  O jeito mais fácil de entrar é com outras pessoas. Ache um{" "}
                  <a href="/pt-br/culture/join-a-run-club-not-a-runner">clube de corrida onde ninguém
                  fica pra trás</a> e todo ritmo é bem-vindo, e quando quiser uma largada sua, o nosso{" "}
                  <a href="/pt-br/culture/corridas-brasil-2026">guia de corridas no Brasil</a> lista
                  provas pra se inscrever hoje, sem índice, sem sorteio. <a href="/pt-br/dispatch">O
                  Dispatch</a> recebe primeiro a data do primeiro treino da crew SUOR SOCIETY em San
                  Diego.
                </p>
              </div>
            </section>

            {/* ── FAQ ── */}
            <section id="faq" className="faq-section">
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

          <aside className="post-aside post-aside--toc">
            <PostToc items={TOC} title="Nesta página" />
          </aside>
        </div>{/* /.post-shell */}

      </main>

      <SiteFooter lang="pt" />
    </>
  );
}
