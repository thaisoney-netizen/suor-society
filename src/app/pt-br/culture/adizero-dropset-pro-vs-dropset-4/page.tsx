import type { ReactNode } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { PostToc } from "@/components/PostAside";
import AuthorCard from "@/components/AuthorCard";
import { pageMeta, ArticleJsonLd, FaqJsonLd } from "@/lib/seo";

const META = {
  path: "/pt-br/culture/adizero-dropset-pro-vs-dropset-4",
  title: "Adizero Dropset Pro vs Dropset 4: qual comprar, Suor Society",
  description:
    "O Adizero Dropset Pro é um tênis de corrida que aguenta a academia. O Dropset 4 é um tênis de academia que aguenta um pouco de corrida. Ficha técnica, altura do solado, limite de carga, numeração e qual deles entra no seu rodízio.",
  image: "/adizero-dropset-hero.jpg",
};
export const metadata = pageMeta({ ...META, paired: true });

const TOC = [
  { id: "pro", label: "O que é o Dropset Pro" },
  { id: "four", label: "O que é o Dropset 4" },
  { id: "specs", label: "A ficha técnica" },
  { id: "upgrade", label: "O Pro é uma evolução" },
  { id: "lifting", label: "O Pro serve pra musculação" },
  { id: "running", label: "Dá pra correr no 4" },
  { id: "buy", label: "Qual comprar" },
  { id: "fit", label: "Numeração e caimento" },
  { id: "hyrox", label: "O Pro no HYROX" },
  { id: "elite", label: "E o de $275" },
  { id: "faq", label: "Perguntas frequentes" },
];

const SPECS = [
  { label: "Preço", pro: "$150", four: "$145" },
  { label: "Lançamento", pro: "Junho 2026", four: "2026" },
  { label: "Peso", pro: "203g fem, 242g masc", four: "309g, masc 43" },
  { label: "Drop", pro: "7mm", four: "Cerca de 5 a 6mm" },
  { label: "Solado no calcanhar", pro: "29mm", four: "19,9mm" },
  { label: "Solado no antepé", pro: "22mm", four: "14,6mm" },
  { label: "Entressola", pro: "Lightstrike Pro, Energy Rods", four: "Repetitor" },
  { label: "Sola", pro: "Lighttraxion, Continental", four: "Borracha" },
  { label: "Teto na barra", pro: "85 a 100kg", four: "Cerca de 225kg" },
  { label: "Teto na corrida", pro: "5k tranquilo, 8km no máximo", four: "1k dentro do treino" },
  { label: "Feito pra", pro: "HYROX, circuito com corrida", four: "Barra pesada, CrossFit" },
];

const FAQS: { q: string; a: ReactNode; plain?: string }[] = [
  {
    q: "O Adizero Dropset Pro serve pra musculação?",
    a: "Até uns 100kg na barra. Acima disso a Lightstrike Pro afunda e a base mais estreita deixa de parecer uma plataforma. Ele é um tênis de corrida que tolera musculação, não o contrário.",
  },
  {
    q: "Dá pra correr com o adidas Dropset 4?",
    a: "Até uns 1k dentro do treino. A entressola Repetitor é firme de propósito e tem pouco solado pra absorver impacto, então mais que isso você sente cada passada.",
  },
  {
    q: "O Adizero Dropset Pro substitui o Dropset 4?",
    a: "Não. Os dois são vendidos lado a lado quase pelo mesmo preço porque fazem trabalhos opostos. O Pro tem 9mm a mais de solado no calcanhar, o que ajuda na corrida e atrapalha na estabilidade com a barra.",
  },
  {
    q: "O Adizero Dropset Pro veste no tamanho certo?",
    a: "Sim, pra pé estreito ou médio. Pé largo deve subir meio número. O cabedal tem volume baixo, o que trava bem o pé mas briga com peito do pé alto.",
  },
  {
    q: "O Adizero Dropset Pro serve pra CrossFit?",
    a: "Nem tanto. A base estreita e a falta de proteção no meio do pé deixam ele fraco pra subida na corda e trabalho com objetos pesados. Dos dois, o Dropset 4 é o melhor tênis de CrossFit.",
  },
  {
    q: "Qual a diferença entre o Adizero Dropset Pro e o Dropset Elite?",
    a: "Preço e solado. O Elite custa $275, tem Energy Rim com fibra de carbono, camada dupla de Lightstrike Pro e 44mm no calcanhar com 32mm no antepé, drop de 12mm. O Pro custa $150, com 29mm no calcanhar e 22mm no antepé, drop de 7mm.",
  },
  {
    q: "Quanto custa o Adizero Dropset Pro?",
    a: "$150 no site da adidas, em quatro cores masculinas e três femininas.",
  },
];

export default function AdizeroDropsetProVsDropset4PtBr() {
  return (
    <>
      <ArticleJsonLd {...META} datePublished="2026-09-04" />
      <FaqJsonLd faqs={FAQS} />
      <SiteNav />

      <main className="post">
        {/* ── ARTICLE MASTHEAD (title above the cover) ── */}
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">The Culture &middot; Arquivo &nbsp;/&nbsp; Setembro 2026</div>
            <h1 className="article-headline">
              Adizero Dropset Pro vs Dropset 4 <span>qual deles comprar</span>
            </h1>
          </div>
        </section>

        {/* ── COVER IMAGE ── */}
        <div className="article-cover article-cover--portrait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/adizero-dropset-cover.webp"
            width={1040}
            height={1402}
            alt="Close nos tênis adidas Dropset pretos e meias brancas de um atleta, mãos apoiadas no joelho tatuado, na plataforma de uma academia escura"
          />
        </div>
        <p className="article-cover-caption">
          Foto de Gabriel Ribeiro (
          <a href="https://www.instagram.com/rbvision7/" target="_blank" rel="noopener noreferrer">
            @rbvision7
          </a>
          ). Atleta Caio Cabral (
          <a href="https://www.instagram.com/caiocabral/" target="_blank" rel="noopener noreferrer">
            @caiocabral
          </a>
          ). Usada com autorização.
        </p>

        {/* ── BODY + STICKY RAIL ── */}
        <div className="post-shell">
          <div className="post-main">

            {/* ── ARTICLE HERO (deck + meta) ── */}
            <section className="article-hero">
              <div className="page">
                <p className="article-deck">
                  O Adizero Dropset Pro é um tênis de corrida que aguenta a academia. O Dropset 4 é
                  um tênis de academia que aguenta um pouco de corrida. Compre o Pro, $150, se a
                  maior parte da sua semana é corrida e a barra fica abaixo dos 100kg. Compre o 4,
                  $145, se você levanta pesado e suas corridas dentro do treino são de 1k pra baixo.
                </p>
                <div className="article-meta">
                  <span>Por <a href="/pt-br/author/thais-oney">Thais Oney</a></span>
                  <span>San Diego, CA</span>
                  <span>Setembro 2026</span>
                </div>
              </div>
            </section>

            {/* ── INTRO ── */}
            <section className="article-body">
              <div className="page">
                <p>
                  A adidas colocou espuma de prova num tênis de academia. O Pro não é um Dropset 5, e
                  escolher pela data de lançamento em vez do trabalho que o tênis faz é como as
                  pessoas acabam com o tênis errado no pé por um ano.
                </p>
              </div>
            </section>

            {/* ── O PRO ── */}
            <section id="pro" className="article-body">
              <div className="page">
                <h2>O que é o Adizero Dropset Pro</h2>
                <p>
                  Um tênis de treino híbrido construído em cima de espuma de maratona. $150, drop de
                  7mm, 29mm de solado no calcanhar e 22mm na frente.
                </p>
                <p>
                  A adidas lançou ele em 17 de junho de 2026, no Mundial de HYROX em Estocolmo, o que
                  já diz tudo sobre pra quem ele foi feito. Botaram o tênis na prova antes de botar
                  na loja.
                </p>
                <p>
                  A parte interessante é a espuma. É Lightstrike Pro, a mesma dos tênis de maratona
                  da marca, com Energy Rods atravessando a entressola pra empurrar a transição da
                  passada. Tecnologia de dia de prova aparecendo num tênis em que você vai fazer
                  burpee. Borracha Continental embaixo, mesh no cabedal e uma palmilha de 2,6mm que é
                  praticamente nada.
                </p>
                <p>
                  Onde ele é bom: tiro, grama sintética, empurrar trenó, corda naval, qualquer coisa
                  em que você corre rápido entre uma estação e outra. Os testes colocam o teto
                  confortável de corrida em torno de 5k, e uns 8km contínuos antes de deixar de ser
                  divertido. Acima de 10k, tênis errado.
                </p>
                <p>
                  Onde ele para: a barra. A maioria dos testes achou o limite entre 85 e 100kg antes
                  da espuma e da base mais estreita deixarem de dar aquela sensação de chão firme.
                  Isso não é defeito, é decisão de projeto. Não dá pra ter espuma de maratona e
                  plataforma de agachamento no mesmo tênis.
                </p>
              </div>
            </section>

            {/* ── O 4 ── */}
            <section id="four" className="article-body">
              <div className="page">
                <h2>O que é o adidas Dropset 4</h2>
                <p>
                  Um tênis feito primeiro pra levantar peso, $145, e ele nunca fingiu ser um tênis de
                  corrida.
                </p>
                <p>
                  Espuma Repetitor no comprimento todo, firme e densa, e continua assim. As medições
                  de laboratório dão 19,9mm no calcanhar e 14,6mm no antepé, ou seja, uns 5 a 6mm de
                  drop e uma pisada bem mais baixa que a do Pro. Pesa 309g num 43 masculino, pesado
                  perto do Pro, mas esse peso está trabalhando.
                </p>
                <p>
                  Calcanhar alargado, base larga e um limite de carga que os testes colocam perto dos
                  225kg. Agachamento pesado, levantamento terra pesado, nenhum balanço. O 4 também
                  ficou mais leve e mais ágil que os Dropsets anteriores, então se move melhor dentro
                  de um circuito do que os antigos.
                </p>
                <p>
                  O problema é o de sempre. Firme demais pra corrida de verdade. Serve pra um 400.
                  Serve pra um 1k no meio do treino. Não serve pra sair numa terça e fazer 8km.
                </p>
              </div>
            </section>

            {/* ── FICHA ── */}
            <section id="specs" className="article-body">
              <div className="page">
                <h2>A ficha técnica</h2>
                <div className="swap-table">
                  <div className="swap-row swap-head">
                    <span>Adizero Dropset Pro</span>
                    <span>Dropset 4</span>
                  </div>
                  {SPECS.map((s) => (
                    <div className="swap-row" key={s.label}>
                      <span><strong>{s.label}</strong> {s.pro}</span>
                      <span><strong>{s.label}</strong> {s.four}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── EVOLUÇÃO ── */}
            <section id="upgrade" className="article-body">
              <div className="page">
                <h2>O Pro é uma evolução do Dropset 4</h2>
                <p>
                  Não. O Pro não é o Dropset 5. É outro tênis usando o nome da família, e os dois
                  estão na prateleira quase pelo mesmo preço de propósito.
                </p>
                <p>
                  A altura do solado conta a história mais rápido. O Pro fica nove milímetros mais
                  alto no calcanhar que o 4. Mais espuma entre você e o chão é ótimo pra correr e
                  ruim pra sentir estabilidade embaixo de uma barra pesada. A adidas não melhorou o
                  Dropset. Ela construiu a outra metade dele.
                </p>
                <p>
                  Ou seja, a pergunta nunca foi qual é melhor. É qual metade do híbrido a sua semana
                  realmente é. Se você ainda está descobrindo isso, o texto sobre{" "}
                  <a href="/pt-br/culture/run-and-lift-same-week">
                    corrida e musculação na mesma semana
                  </a>{" "}
                  é o lugar pra começar.
                </p>
              </div>
            </section>

            {/* ── MUSCULAÇÃO ── */}
            <section id="lifting" className="article-body">
              <div className="page">
                <h2>O Adizero Dropset Pro serve pra musculação</h2>
                <p>Pra carga moderada, serve. Pra carga pesada, não.</p>
                <p>
                  Halter leve a moderado e barra em série abaixo de 85 a 100kg funciona bem. Acima
                  disso a Lightstrike Pro afunda e a base mais estreita deixa de parecer uma
                  plataforma. Os testes também apontaram que a falta de proteção no meio do pé e a
                  base estreita deixam ele fraco pra CrossFit mais bruto, então subida na corda e
                  objeto pesado não são o habitat dele.
                </p>
                <p>
                  Se a sua parte de força é volume acessório entre corridas, o Pro dá conta. Se a
                  força é o ponto do treino, não dá.
                </p>
              </div>
            </section>

            {/* ── CORRIDA ── */}
            <section id="running" className="article-body">
              <div className="page">
                <h2>Dá pra correr com o adidas Dropset 4</h2>
                <p>
                  Só distância curta. A entressola Repetitor é firme de propósito e tem pouquíssimo
                  solado pra absorver impacto.
                </p>
                <p>
                  Um 400 dentro do treino, tranquilo. Um 1k, tranquilo. Mais que isso e você sente
                  cada passada, que é exatamente a troca que deixa ele bom embaixo da barra.
                </p>
              </div>
            </section>

            {/* ── QUAL COMPRAR ── */}
            <section id="buy" className="article-body">
              <div className="page">
                <h2>Qual dos dois comprar</h2>
                <p>
                  <strong>Compre o Adizero Dropset Pro se</strong> a maior parte da sua semana de
                  treino é corrida, sua parte de força é halter e barra moderada, você faz HYROX ou
                  circuito com corrida de verdade entre as estações, ou quer um tênis só pra uma
                  corrida mais um treino de academia e não vai chegar perto de um dia de agachamento
                  pesado.
                </p>
                <p>
                  <strong>Compre o Dropset 4 se</strong> você levanta mais de 100kg com frequência,
                  suas corridas dentro do treino são de 1k pra baixo, você faz treino estilo CrossFit
                  com corda e objetos, ou já sentiu um tênis torcer embaixo de você numa série
                  pesada e odiou.
                </p>
                <p>
                  Sinceramente, se você treina cinco ou seis dias e separa entre dias de corrida de
                  verdade e dias de força de verdade, dois tênis é a resposta certa e sempre foi. O
                  sonho do tênis único que faz tudo continua sendo um meio-termo. Só que é um
                  meio-termo bem melhor do que era dois anos atrás.
                </p>
              </div>
            </section>

            {/* ── NUMERAÇÃO ── */}
            <section id="fit" className="article-body">
              <div className="page">
                <h2>Os dois vestem no tamanho certo</h2>
                <p>
                  Os dois vestem no tamanho certo pra pé estreito e médio. Pé largo deve subir meio
                  número em qualquer um dos dois.
                </p>
                <p>
                  O Pro tem cabedal de volume baixo, o que trava o pé lindamente e vira problema se
                  você tem peito do pé alto. Os testes também apontaram uma curvatura de ponta
                  agressiva e o meio do pé estreito, então não é tênis pra continuar no pé no café
                  depois do treino.
                </p>
                <p>
                  A adidas estreitou bastante a biqueira do Dropset 4 em relação aos Dropsets
                  anteriores. Ainda sobra espaço pros dedos abrirem num levantamento pesado, e a
                  travada no calcanhar é boa de verdade, mas pé muito largo deve passar. Alguns
                  compradores subiram meio número só pelo conforto na ponta.
                </p>
                <p>
                  Nenhum dos dois é tênis pra pé largo. Se esse é o seu caso, essa comparação talvez
                  não seja a sua comparação.
                </p>
              </div>
            </section>

            {/* ── HYROX ── */}
            <section id="hyrox" className="article-body">
              <div className="page">
                <h2>O Adizero Dropset Pro é bom pra HYROX</h2>
                <p>
                  É uma das opções mais fortes de 2026 pra HYROX, e a adidas fez ele exatamente pra
                  isso.
                </p>
                <p>
                  As garras de Continental no antepé agarram na grama sintética e no tapete de
                  borracha no empurrão de trenó sem escorregar, e o calcanhar plano dá ancoragem na
                  puxada de trenó e no wall ball. Você sai do tapete suado pro piso duro sem trocar
                  de tênis. A Lightstrike Pro faz o melhor trabalho dela nas estações de corrida, que
                  é onde a maior parte do tempo se ganha ou se perde.
                </p>
                <p>A troca é a troca. Dia de força pesada não é pra ele.</p>
              </div>
            </section>

            {/* ── ELITE ── */}
            <section id="elite" className="article-body">
              <div className="page">
                <h2>E o de $275</h2>
                <p>
                  Tem um terceiro tênis nessa conversa. O Adizero Dropset Elite chegou antes, março
                  no mundo e maio nos Estados Unidos, a $275. Energy Rim com fibra de carbono, camada
                  dupla de Lightstrike Pro, 44mm no calcanhar e 32mm no antepé pra um drop de 12mm,
                  210 gramas. Um tênis de prova pra quem realmente compete híbrido em alto nível.
                </p>
                <p>
                  O Elite é a vitrine. O Pro é a mesma ideia por $150 pro resto de nós, o que faz
                  dele o tênis mais interessante e o que a maioria das pessoas deveria estar olhando.
                </p>
              </div>
            </section>

            {/* ── FAQ ── */}
            <section id="faq" className="faq-section">
              <div className="page">
                <div className="faq-head">Perguntas frequentes</div>
                {FAQS.map((f, i) => (
                  <div key={i} className="faq-item">
                    <div className="faq-q">{f.q}</div>
                    <p className="faq-a">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── AUTHOR ── */}
            <AuthorCard />

            {/* ── DISCLAIMER ── */}
            <section className="post-disclaimer-section">
              <div className="page">
                <p className="post-disclaimer">
                  As especificações vêm da adidas, de medições de laboratório publicadas e de testes
                  independentes. Nenhum produto foi enviado como cortesia, nada aqui é publicidade
                  paga e não há links de afiliado.
                </p>
              </div>
            </section>

          </div>{/* /.post-main */}

          <aside className="post-aside post-aside--toc">
            <PostToc items={TOC} />
          </aside>
        </div>{/* /.post-shell */}

      </main>

      <SiteFooter />
    </>
  );
}
