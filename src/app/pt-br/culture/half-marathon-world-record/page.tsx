import type { ReactNode } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { PostToc } from "@/components/PostAside";
import AuthorCard from "@/components/AuthorCard";
import { pageMeta, ArticleJsonLd, FaqJsonLd } from "@/lib/seo";

const META = {
  path: "/pt-br/culture/half-marathon-world-record",
  title: "Recorde mundial da meia maratona: Kejelcha corre 56:51 em Buenos Aires, Suor Society",
  description:
    "Yomif Kejelcha correu 56:51 na meia de Buenos Aires em 23 de agosto de 2026, tirando 29 segundos do recorde e virando o primeiro homem abaixo de 57 minutos numa prova que conta. As parciais, o ritmo e o asterisco do 56:42 de Kiplimo.",
  image: "/kejelcha-london-hero.jpg",
};

// Crédito da foto de capa. A capa é uma imagem de arquivo de Londres, não da
// prova que este post cobre, então a legenda abaixo precisa dizer isso.
// PREENCHER antes de fazer merge: o EXIF do arquivo tem legenda em formato de
// agência ("LONDON, ENGLAND - APRIL 26: Yomif Kejelcha of Team Ethiopia..."),
// então precisa de crédito real e licença. Vazio não renderiza crédito nenhum,
// em vez de renderizar um errado.
const PHOTO_CREDIT = "";
export const metadata = pageMeta({ ...META, paired: true });

const TOC = [
  { id: "o-que-aconteceu", label: "O que aconteceu" },
  { id: "ritmo", label: "O que significa 56:51" },
  { id: "sub-57", label: "O asterisco do sub-57" },
  { id: "progressao", label: "Como o recorde andou" },
  { id: "feminino", label: "O recorde feminino" },
  { id: "multidao", label: "Os outros 31.500" },
  { id: "faq", label: "Perguntas Frequentes" },
];

// Só marcas homologadas. O 56:42 do Kiplimo em Barcelona é mais rápido que
// todas elas e está fora da tabela de propósito: nunca foi homologado, então
// não é um elo da cadeia do recorde. Tem a própria seção.
const PROGRESSION = [
  { time: "56:51", who: "Yomif Kejelcha, Buenos Aires, agosto 2026" },
  { time: "57:20", who: "Jacob Kiplimo, Lisboa, março 2026" },
  { time: "57:30", who: "Yomif Kejelcha, Valência, outubro 2024" },
];

const FAQS: { q: string; a: ReactNode; plain?: string }[] = [
  {
    q: "Qual é o recorde mundial da meia maratona?",
    a: "56:51, do etíope Yomif Kejelcha, na Media Maratón Ciudad de Buenos Aires em 23 de agosto de 2026. Tirou 29 segundos dos 57:20 que Jacob Kiplimo correu em Lisboa em março, e ainda passa pelo processo normal de homologação da World Athletics antes de ser oficial.",
  },
  {
    q: "Alguém já correu uma meia maratona mais rápida que 56:51?",
    a: "Já. Jacob Kiplimo correu 56:42 em Barcelona em fevereiro de 2025, que segue sendo a meia maratona mais rápida já corrida. A World Athletics nunca homologou a marca, entendendo que ele se beneficiou do vácuo do carro que abria a prova. Ou seja, a meia mais rápida da história e o recorde mundial são dois tempos diferentes.",
  },
  {
    q: "Qual é o recorde mundial feminino da meia maratona?",
    a: "1:02:52, de Letesenbet Gidey, em Valência, em outubro de 2021. Ela segue sendo a única mulher a baixar de 63 minutos, e esse recorde já está de pé há quase cinco anos.",
  },
  {
    q: "Que ritmo é uma meia maratona de 56:51?",
    a: "Cerca de 2:42 por quilômetro, ou 4:20 por milha. Numa pista, dá mais ou menos 65 segundos por volta, mantidos por umas 53 voltas seguidas, sem parar.",
  },
  {
    q: "Qual é um bom tempo de meia maratona pra quem corre normal?",
    plain:
      "A maioria termina entre duas horas e duas e meia, e quem está na primeira meia costuma passar disso. O recorde da elite é outro esporte, não um placar em que você está. Se quiser uma linha de largada sua, as nossas dicas de provas listam corridas no Brasil com inscrição aberta.",
    a: (
      <>
        A maioria termina entre duas horas e duas e meia, e quem está na primeira meia costuma
        passar disso. O recorde da elite é outro esporte, não um placar em que você está. Se quiser
        uma linha de largada sua, as nossas{" "}
        <a href="/pt-br/culture/corridas-brasil-2026">dicas de provas</a> listam corridas no Brasil
        com inscrição aberta.
      </>
    ),
  },
];

export default function RecordeMundialMeiaMaratona() {
  return (
    <>
      <ArticleJsonLd {...META} datePublished="2026-08-23" />
      <FaqJsonLd faqs={FAQS} />
      <SiteNav lang="pt" />

      <main className="post">
        {/* ── ARTICLE MASTHEAD (title above the cover) ── */}
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">The Culture Archive &nbsp;/&nbsp; Agosto 2026</div>
            <h1 className="article-headline">
              O recorde mundial da meia maratona agora é <span>56:51</span>
            </h1>
          </div>
        </section>

        {/* ── COVER IMAGE ── */}
        {/* Imagem de arquivo de Londres, em abril, não de Buenos Aires. A
            legenda abaixo diz isso de propósito: sem ela a capa dá a entender
            que ele está vencendo a prova de que este post trata. */}
        <div className="article-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            style={{ objectPosition: "center 10%" }}
            src="/kejelcha-london-hero.jpg"
            alt="Yomif Kejelcha correndo pela The Mall rumo à chegada da Maratona de Londres, com o Palácio de Buckingham ao fundo"
          />
        </div>
        <p className="article-cover-caption">
          Kejelcha chegando em segundo na Maratona de Londres em abril, onde seus 1:59:41 foram a
          estreia mais rápida já corrida na maratona.{" "}
          {PHOTO_CREDIT && <span className="credit">Foto: {PHOTO_CREDIT}</span>}
        </p>

        {/* ── BODY + STICKY RAIL ── */}
        <div className="post-shell">
          <div className="post-main">

            {/* ── ARTICLE HERO (deck + meta) ── */}
            <section className="article-hero">
              <div className="page">
                <p className="article-deck">
                  Yomif Kejelcha passou os 10km em 27:19, largou o pelotão inteiro no quilômetro
                  sete e terminou a meia de Buenos Aires em 56:51. São 29 segundos a menos que o
                  recorde de Jacob Kiplimo e a primeira vez que um homem baixa de 57 minutos numa
                  prova que conta. O detalhe esquisito: ele acelerou depois que ficou sozinho.
                </p>
                <div className="article-meta">
                  <span>Por <a href="/pt-br/author/thais-oney">Thais Oney</a></span>
                  <span>San Diego, CA</span>
                  <span>Agosto 2026</span>
                </div>
              </div>
            </section>

            {/* ── INTRO ── */}
            <section className="article-body">
              <div className="page">
                <p>
                  Domingo de manhã em Buenos Aires, 31.500 pessoas na largada da Media Maratón
                  Ciudad de Buenos Aires. Um deles fez 21,1 km a 2:42 por quilômetro.
                </p>
                <p>
                  Kejelcha tem 29 anos, é etíope e já tinha sido dono desse recorde antes. Marcou
                  57:30 em Valência em outubro de 2024, perdeu pro Kiplimo neste ano e acabou de
                  tomar de volta por uma margem que faz a própria marca antiga dele parecer lenta.
                </p>
                <p>
                  E ele está no meio de um ano absurdo. Em abril correu 1:59:41 na estreia dele na
                  maratona, em Londres, em segundo atrás de Sabastian Sawe e na estreia mais rápida
                  que alguém já fez. Quatro meses depois é dono do recorde da meia também.
                </p>
              </div>
            </section>

            {/* ── O QUE ACONTECEU ── */}
            <section id="o-que-aconteceu" className="article-body">
              <div className="page">
                <h2>O que aconteceu em Buenos Aires</h2>
                <p>
                  Ele não ficou esperando. Passou os 5km em 13:34 com o grupo da frente ainda
                  colado, e no quilômetro sete foi embora, com mais de 14 quilômetros pela frente.
                  Ninguém foi junto.
                </p>
                <p>
                  A parcial dele nos 10km foi 27:19. Vale reparar que isso era 19 segundos{" "}
                  <em>mais lento</em> que a parcial do Kiplimo a caminho do 57:20 em Lisboa. Ou
                  seja, com um terço de prova, Kejelcha estava atrás do ritmo de recorde e correndo
                  sozinho.
                </p>
                <p>
                  Aí ele fez os últimos 11,1 quilômetros em mais ou menos 29:32, uns 2:40 por
                  quilômetro. Mais rápido que a primeira metade. Sozinho, na rua vazia, sem ninguém
                  pra perseguir e ninguém atrás. Essa é a parte difícil de processar.
                </p>
                <p>
                  Na prova feminina, a etíope Fotyen Tesfay venceu com 1:03:57, bem à frente de
                  Nevin Can, com 1:05:06.
                </p>
                <p>
                  Os 56:51 ainda precisam passar pelo{" "}
                  <a
                    href="https://worldathletics.org/competitions/world-athletics-label-road-races/news/world-half-marathon-record-buenos-aires-2026-yomif-kejelcha"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    processo de homologação
                  </a>{" "}
                  da World Athletics, que nesta prova não é formalidade nenhuma, como explica a
                  próxima seção.
                </p>
              </div>
            </section>

            {/* ── RITMO ── */}
            <section id="ritmo" className="article-body">
              <div className="page">
                <h2>O que 56:51 significa de verdade</h2>
                <p>
                  Tempo nesse nível fica meio abstrato, então vai em unidades que dizem alguma
                  coisa. 56:51 numa meia maratona é mais ou menos 2:42 por quilômetro, ou 4:20 por
                  milha, mantidos por 21,1 km.
                </p>
                <p>
                  Numa pista, são 65 segundos por volta. Cinquenta e três voltas assim, emendadas,
                  sem pausa. Muita gente bem treinada consegue uma volta de 65 segundos num dia bom
                  e termina completamente acabada. Ele fez isso cinquenta e três vezes e ainda
                  acelerou.
                </p>
              </div>
            </section>

            {/* ── SUB 57 ── */}
            <section id="sub-57" className="article-body">
              <div className="page">
                <h2>O asterisco do sub-57 que ninguém cita</h2>
                <p>
                  Quase toda manchete hoje está dizendo primeiro homem abaixo de 57 minutos. Isso
                  pede uma linha de contexto, porque não é bem a mesma coisa que mais rápido da
                  história.
                </p>
                <p>
                  Em fevereiro de 2025, em Barcelona, Jacob Kiplimo correu <strong>56:42</strong>.
                  Nove segundos mais rápido do que o Kejelcha acabou de fazer. A World Athletics não
                  homologou a marca depois de entender que Kiplimo tinha pegado o vácuo de um carro
                  que seguia à frente dele no percurso.
                </p>
                <p>
                  Então as duas coisas são verdade. A meia maratona mais rápida já corrida por
                  alguém é 56:42, e o recorde mundial da meia maratona é 56:51. Kejelcha é o
                  primeiro homem abaixo de 57 minutos em condições que valem pro recorde, o que é
                  uma distinção real e bem mais estreita que a versão da manchete.
                </p>
              </div>
            </section>

            {/* ── PROGRESSÃO ── */}
            <section id="progressao" className="article-body">
              <div className="page">
                <h2>Como o recorde andou</h2>
                <p>
                  Três marcas homologadas em menos de dois anos, e duas das três são do Kejelcha.
                </p>

                <div className="swap-table">
                  <div className="swap-row swap-head">
                    <span>Tempo</span>
                    <span>Quem, onde, quando</span>
                  </div>
                  {PROGRESSION.map((row, i) => (
                    <div key={i} className="swap-row">
                      <span>{row.time}</span>
                      <span>{row.who}</span>
                    </div>
                  ))}
                </div>

                <p>
                  O 56:42 do Kiplimo não está aí de propósito. É mais rápido que qualquer linha da
                  tabela e nunca entrou na cadeia do recorde.
                </p>
              </div>
            </section>

            {/* ── RECORDE FEMININO ── */}
            <section id="feminino" className="article-body">
              <div className="page">
                <h2>O recorde feminino segue sendo da Gidey</h2>
                <p>
                  Enquanto o recorde masculino trocou de mãos três vezes desde o fim de 2024, o
                  feminino não saiu do lugar. Letesenbet Gidey correu <strong>1:02:52</strong> em
                  Valência em outubro de 2021 e nenhuma mulher baixou de 63 minutos antes ou depois.
                  Vai fazer cinco anos, o que nesta era do esporte é muito tempo pra qualquer marca
                  ficar de pé.
                </p>
              </div>
            </section>

            {/* ── A MULTIDÃO ── */}
            <section id="multidao" className="article-body">
              <div className="page">
                <h2>Os outros 31.500</h2>
                <p>
                  O número que fica na minha cabeça não é 56:51. É 31.500. Foi essa gente toda que
                  correu a Media Maratón Ciudad de Buenos Aires no domingo. O recorde mundial do
                  Kejelcha e a primeira meia de 2h40 de alguém aconteceram nas mesmas ruas, na mesma
                  manhã, na mesma prova.
                </p>
                <p>
                  Corri minha primeira meia em maio. Longe disso tudo, e não vou tentar vender a
                  distância como inspiradora quando ela é só gigante mesmo. Um 56:51 exige genética,
                  altitude, uma década de trabalho e uma vida em que treinar <em>é</em> o emprego.
                  Dá pra admirar isso pelo que é sem transformar em régua pra medir a corrida de
                  terça à noite espremida depois do trabalho.
                </p>
                <p>
                  Acompanhe o recorde, é uma coisa absurda. Depois vá fazer os seus 40 minutos. As
                  duas coisas são corrida.
                </p>
                <p>
                  Se Buenos Aires plantou uma linha de largada na sua cabeça, as{" "}
                  <a href="/pt-br/culture/corridas-brasil-2026">dicas de provas no Brasil</a> têm
                  corridas com inscrição aberta agora, e{" "}
                  <a href="/pt-br/culture/join-a-run-club-not-a-runner">um clube de corrida no-drop</a>{" "}
                  é o caminho de menor pressão se um número de peito ainda parece muita coisa.
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
