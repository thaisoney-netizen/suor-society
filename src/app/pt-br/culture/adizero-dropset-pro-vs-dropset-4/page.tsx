import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ArticleCover from "@/components/ArticleCover";
import { PostToc, PostSubscribe } from "@/components/PostAside";
import AuthorCard from "@/components/AuthorCard";
import { pageMeta, ArticleJsonLd, FaqJsonLd } from "@/lib/seo";

const META = {
  path: "/pt-br/culture/adizero-dropset-pro-vs-dropset-4",
  title: "Adidas Adizero Dropset Pro vs Dropset 4: qual comprar? | Suor Society",
  description:
    "Compare Adidas Adizero Dropset Pro e Dropset 4 para HYROX, musculação, corrida e ajuste, com ficha técnica, fontes e orientação para escolher.",
  image: "/adizero-dropset-hero.jpg",
};
export const metadata = pageMeta({ ...META, paired: true });

// Keep the source links added in Claude's September 5 merge.
const SOURCES = [
  "https://www.adidas-group.com/en/magazine/careers/hybrid-hotel-launching-the-adizero-dropset-pro-on-the-global-stage",
  "https://www.roadtrailrun.com/2026/07/adidas-adizero-dropset-pro-review.html",
  "https://thatfitfriend.com/adidas-adizero-dropset-pro-review/",
  "https://thatfitfriend.com/adidas-adizero-dropset-pro-vs-dropset-4/",
  "https://runrepeat.com/adidas-dropset-4",
  "https://thatfitfriend.com/adidas-dropset-4-review/",
  "https://www.adidas.com/us/adizero-dropset-elite-training-sneaker/LA6218.html",
  "https://www.adidas.com/us/adizero-dropset-pro-training-shoes/KH6710.html",
  "https://news.adidas.com/training/adidas-expands-hybrid-training-offer-with-the-adizero-dropset-pro--built-for-the-full-demands-of-the/s/c3ee111b-e9d9-4837-ae89-ce31484b6705",
  "https://news.adidas.com/training/adidas-unveils-the-dropset-4--its-most-versatile-functional-training-shoe-to-date/s/304ea25d-4d2b-4232-80e1-c435361a6624",
  "https://www.adidas.com/qa/en/adizero-dropset-pro-training-shoes/KK1551.html",
  "https://www.adidas.com/qa/en/dropset-4-training-shoes/JR4661.html",
];
const SOURCE_LABELS = [
  "Adidas: lançamento em Estocolmo",
  "Road Trail Run: teste de corrida",
  "That Fit Friend: avaliação do Pro",
  "That Fit Friend: comparativo",
  "RunRepeat: laboratório do Dropset 4",
  "That Fit Friend: avaliação do Dropset 4",
  "Adidas EUA: Dropset Elite",
  "Adidas EUA: Dropset Pro",
  "Adidas: construção do Pro",
  "Adidas: construção do Dropset 4",
  "Adidas: ficha do Pro (Catar)",
  "Adidas: ficha do Dropset 4 (Catar)",
];
const TOC = [
  {
    id: "pro",
    label: "O que é o Adizero Dropset Pro",
  },
  {
    id: "four",
    label: "O que é o Adidas Dropset 4",
  },
  {
    id: "specs",
    label: "Ficha técnica e fontes",
  },
  {
    id: "upgrade",
    label: "O Pro substitui o Dropset 4?",
  },
  {
    id: "lifting",
    label: "O Adizero Dropset Pro serve para musculação?",
  },
  {
    id: "running",
    label: "Dá para correr no Dropset 4? E até onde no Pro?",
  },
  {
    id: "buy",
    label: "Qual tênis combina com a sua semana?",
  },
  {
    id: "fit",
    label: "Numeração, pés largos e espaço no cabedal",
  },
  {
    id: "hyrox",
    label: "O Pro é uma boa opção para HYROX?",
  },
  {
    id: "elite",
    label: "O que muda no Dropset Elite",
  },
  {
    id: "sources",
    label: "Fontes",
  },
];
const SPECS = [
  {
    label: "Preço de referência nos EUA",
    pro: "US$150 · Adidas EUA",
    four: "US$145 · avaliação publicada",
  },
  {
    label: "Estreia",
    pro: "17 de junho de 2026 · Adidas",
    four: "8 de janeiro de 2026 · Adidas",
  },
  {
    label: "Peso",
    pro: "242 g / 8,54 oz · Adidas; tamanho de referência não informado",
    four: "10,9 oz / cerca de 309 g · That Fit Friend, masculino US 10",
  },
  {
    label: "Altura: calcanhar / antepé",
    pro: "29 / 22 mm · Adidas",
    four: "19,9 / 14,6 mm · laboratório RunRepeat",
  },
  {
    label: "Drop",
    pro: "7 mm · Adidas",
    four: "6 mm · Adidas; 5,3 mm medidos pelo RunRepeat",
  },
  {
    label: "Entressola",
    pro: "Lightstrike Pro + Energyrods",
    four: "Repetitor + Energyrods",
  },
  {
    label: "Sola",
    pro: "Lighttraxion + borracha Continental",
    four: "Borracha Continental · Adidas",
  },
];
const FAQS = [
  {
    q: "O Pro é um Dropset 5?",
    a: "Não. É um modelo híbrido separado, ao lado do Dropset 4. Escolha pelo treino, não pelo nome.",
  },
  {
    q: "225 lb são um limite oficial para musculação?",
    a: "Não. A carga citada no texto é uma observação de um avaliador, não uma classificação de carga da Adidas.",
  },
  {
    q: "Quem tem pé largo deve sempre subir a numeração?",
    a: "Não. Mais comprimento pode não resolver falta de largura ou espaço sobre o pé. Confira o ajuste e as condições de devolução da loja.",
  },
];

export default function AdizeroDropsetProVsDropset4() {
  return (
    <>
      <ArticleJsonLd
        {...META}
        datePublished="2026-09-04"
        dateModified="2026-09-05"
        citation={SOURCES}
      />
      <FaqJsonLd faqs={FAQS} />
      <SiteNav lang="pt" />
      <main className="post dropset-post">
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">
              The Culture · Arquivo / Equipamento
            </div>
            <h1 className="article-headline">
              Adidas Adizero Dropset Pro vs Dropset 4: <span>qual comprar?</span>
            </h1>
            <p className="article-deck">
              Escolha o Adizero Dropset Pro para treinos que combinam intervalos
              de corrida e exercícios funcionais. Prefira o Dropset 4 quando
              musculação e estabilidade na academia vêm primeiro, com corridas
              curtas no meio. O Pro é outro modelo híbrido, não o substituto do
              4.
            </p>
            <div className="article-meta">
              <span>
                Por <a href="/pt-br/author/thais-oney">Thais Oney</a>
              </span>
              <span>San Diego, CA</span>
              <span>
                Publicado em{" "}
                <time dateTime="2026-09-04">4 de setembro de 2026</time>
              </span>
              <span>
                Atualizado em{" "}
                <time dateTime="2026-09-05">5 de setembro de 2026</time>
              </span>
            </div>
            <nav className="dropset-jumps" aria-label="Ir para uma seção">
              <a href="#specs">Ficha técnica</a>
              <a href="#buy">Qual comprar</a>
              <a href="#fit">Numeração</a>
              <a href="#sources">Fontes</a>
            </nav>
          </div>
        </section>
        <ArticleCover
          src="/adizero-dropset-cover.webp"
          alt="Adidas Adizero Dropset Pro à esquerda e Dropset 4 à direita, lado a lado em fundo preto"
        />
        <div className="post-shell">
          <div className="post-main">
            <section className="article-body dropset-method">
              <div className="page">
                <h2>Como este comparativo foi feito</h2>
                <p>
                  Este comparativo reúne especificações da Adidas e testes
                  independentes publicados. As observações de desempenho são dos
                  avaliadores identificados; as sugestões por rotina são nossa
                  interpretação dessa pesquisa. Este texto não é um teste
                  próprio do Suor Society com os dois tênis.
                </p>
              </div>
            </section>
            <section id="pro" className="article-body">
              <div className="page">
                <h2>O que é o Adizero Dropset Pro</h2>
                <p>
                  A Adidas colocou espuma de competição num tênis de academia. O
                  Pro combina Lightstrike Pro, Energyrods, Lighttraxion e
                  borracha Continental. Foi pensado para treinos híbridos, sem
                  ser automaticamente a escolha certa para todo dia de corrida.{" "}
                  <a
                    href={SOURCES[8]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    A Adidas explica a construção aqui
                  </a>
                  .
                </p>
                <p>
                  O{" "}
                  <a
                    href={SOURCES[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    lançamento em Estocolmo
                  </a>{" "}
                  colocou o modelo na conversa sobre HYROX em junho de 2026.
                  Isso mostra o público pretendido; não prova como ele vai ficar
                  no seu pé. Os testes de corrida e musculação dizem mais do que
                  o cenário do lançamento.
                </p>
              </div>
            </section>
            <section id="four" className="article-body">
              <div className="page">
                <h2>O que é o Adidas Dropset 4</h2>
                <p>
                  O Dropset 4 prioriza o treino funcional de força. A{" "}
                  <a
                    href={SOURCES[9]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Adidas lista espuma Repetitor e Energyrods
                  </a>{" "}
                  para combinar musculação, saltos e corridas curtas. Os dois
                  modelos têm Energyrods: o nome da tecnologia, sozinho, não
                  explica a diferença.
                </p>
                <p>
                  A proposta é uma plataforma voltada à academia. A{" "}
                  <a
                    href={SOURCES[5]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    avaliação do Dropset 4 por Jake Boly
                  </a>{" "}
                  inclui um levantamento terra de 500 lb, cerca de 227 kg. É a
                  experiência de um avaliador, não uma carga certificada pela
                  fabricante nem uma promessa de estabilidade para qualquer
                  pessoa.
                </p>
              </div>
            </section>
            <section id="specs" className="article-body">
              <div className="page">
                <h2>Ficha técnica e fontes</h2>
                <div
                  className="dropset-table-wrap"
                  role="region"
                  aria-label="Ficha técnica"
                  tabIndex={0}
                >
                  <table className="dropset-table">
                    <caption>
                      Referências publicadas: especificações e medições
                      identificadas
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Item</th>
                        <th scope="col">Adizero Dropset Pro</th>
                        <th scope="col">Dropset 4</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SPECS.map((s) => (
                        <tr key={s.label}>
                          <th scope="row">{s.label}</th>
                          <td>{s.pro}</td>
                          <td>{s.four}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p>
                  Stack é a altura sob o pé; drop é a diferença de altura entre
                  calcanhar e antepé. Os pesos e as alturas vêm de tamanhos ou
                  métodos diferentes: são referências com fonte, não uma medição
                  comparativa controlada. Os preços americanos não representam o
                  varejo brasileiro.
                </p>
                <p>
                  Fontes da tabela:{" "}
                  <a
                    href={SOURCES[7]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Adidas EUA: Dropset Pro
                  </a>
                  ,{" "}
                  <a
                    href={SOURCES[3]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    That Fit Friend: comparativo
                  </a>
                  ,{" "}
                  <a
                    href={SOURCES[10]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Adidas: ficha do Pro (Catar)
                  </a>
                  ,{" "}
                  <a
                    href={SOURCES[11]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Adidas: ficha do Dropset 4 (Catar)
                  </a>
                  ,{" "}
                  <a
                    href={SOURCES[4]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    RunRepeat: laboratório do Dropset 4
                  </a>
                  ,{" "}
                  <a
                    href={SOURCES[8]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Adidas: construção do Pro
                  </a>
                  ,{" "}
                  <a
                    href={SOURCES[9]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Adidas: construção do Dropset 4
                  </a>
                  .
                </p>
              </div>
            </section>
            <section id="upgrade" className="article-body">
              <div className="page">
                <h2>O Pro substitui o Dropset 4?</h2>
                <p>
                  Não. Pense neles como respostas a treinos diferentes. A
                  distinção útil é entre trabalho híbrido com foco na corrida e
                  academia com foco na força. Um nome mais novo não faz do Pro a
                  melhor compra para a sua rotina.
                </p>
                <p>
                  Também não escolha só pela altura do solado. Os números do Pro
                  na tabela são da fabricante; os do Dropset 4 são medições de
                  laboratório. Não vieram de um teste com o mesmo método.
                  Subtraí-los não demonstra uma vantagem exata de desempenho.
                </p>
              </div>
            </section>
            <section id="lifting" className="article-body">
              <div className="page">
                <h2>O Adizero Dropset Pro serve para musculação?</h2>

                {/* ── FOTO ── Fica logo embaixo da pergunta que ela responde. */}
                <ArticleCover
                  src="/adizero-dropset-pro-caio.webp"
                  alt="Caio Cabral se posicionando embaixo da barra numa academia escura, usando o Adizero Dropset"
                  priority={false}
                  inline
                  caption={
                    <>
                      Caio Cabral entre séries, de Adizero Dropset.{" "}
                      <span className="credit">Foto: Gabriel Ribeiro</span>
                    </>
                  }
                />
                <p>
                  Ele merece consideração num treino que alterna corrida e
                  estações de força. Para sessões dedicadas à musculação pesada,
                  nossa recomendação inicial é o Dropset 4.
                </p>
                <p>
                  No{" "}
                  <a
                    href={SOURCES[3]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    comparativo de Jake Boly
                  </a>
                  , a faixa de barra preferida para o Pro fica em torno de
                  185 a 225 lb, cerca de 84 a 102 kg, antes de ele sentir menos
                  firmeza. É uma observação pessoal, não um limite universal.
                  Exercício, técnica, peso corporal e ajuste mudam a
                  experiência.
                </p>
                <p>
                  A pergunta mais útil é: a força é o objetivo principal da
                  sessão ou uma parte do circuito? Um único número na barra não
                  responde isso por você.
                </p>
              </div>
            </section>
            <section id="running" className="article-body">
              <div className="page">
                <h2>Dá para correr no Dropset 4? E até onde no Pro?</h2>
                <p>
                  O Dropset 4 foi pensado para acomodar corridas curtas dentro
                  do treino de academia. A Adidas cita esforços de até 800 m no
                  lançamento. É um exemplo de uso, não uma regra dizendo que o
                  tênis deixa de funcionar no metro seguinte.
                </p>
                <p>
                  A{" "}
                  <a
                    href={SOURCES[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    avaliação do Pro no That Fit Friend
                  </a>{" "}
                  traz a perspectiva de academia e corrida. Já{" "}
                  <a
                    href={SOURCES[1]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sam Winebaum, do Road Trail Run
                  </a>
                  , avaliou o Pro especificamente como tênis de corrida:
                  encontrou capacidade real para correr, com uma traseira
                  bastante estabilizada. Esse teste não avaliou desempenho no
                  HYROX.
                </p>
                <p>
                  Esses contextos diferentes explicam por que não estabelecemos
                  um máximo fixo de 5 km ou oito quilômetros para o Pro. Para um
                  dia separado de longão, compare com o tênis de corrida que já
                  funciona para você. Comprar um híbrido não precisa significar
                  aposentar esse par.
                </p>
              </div>
            </section>
            <section id="buy" className="article-body">
              <div className="page">
                <h2>Qual tênis combina com a sua semana?</h2>
                <p>
                  Estas sugestões são uma interpretação editorial das fontes,
                  não resultados de um teste próprio. Olhe para uma semana
                  normal da sua agenda, não para a semana que você espera
                  conseguir treinar um dia.
                </p>
                <h3>Três sessões de força + finalizações curtas</h3>
                <p>
                  <strong>Comece pelo Dropset 4.</strong> A estabilidade na
                  academia é a prioridade; correr ocupa uma parte pequena da
                  sessão.
                </p>
                <h3>Dois treinos estilo HYROX com corridas e estações</h3>
                <p>
                  <strong>Considere o Pro.</strong> O treino alterna
                  repetidamente corrida e exercícios funcionais.
                </p>
                <h3>Longões em dias separados + musculação pesada</h3>
                <p>
                  <strong>
                    Mantenha um tênis de corrida e um de academia.
                  </strong>{" "}
                  Você escolhe para cada tarefa sem pedir que um único par cubra
                  os dois extremos.
                </p>
                <h3>Aulas ocasionais e academia geral</h3>
                <p>
                  <strong>Avalie primeiro o tênis que já tem.</strong> Um par
                  especializado deve resolver um problema concreto, não apenas
                  acrescentar outro nome à mochila.
                </p>
                <p>
                  Para organizar essa escolha, veja como{" "}
                  <a href="/pt-br/culture/run-and-lift-same-week">
                    correr e fazer musculação na mesma semana
                  </a>
                  .
                </p>
              </div>
            </section>
            <section id="fit" className="article-body">
              <div className="page">
                <h2>Numeração, pés largos e espaço no cabedal</h2>
                <p>
                  A{" "}
                  <a
                    href={SOURCES[7]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Adidas dos EUA recomenda o tamanho habitual para o Pro
                  </a>
                  . É um ponto de partida, não uma garantia. O Road Trail Run
                  descreve um cabedal confortável, mas baixo sobre o pé; o That
                  Fit Friend destaca um ajuste mais justo. Pés diferentes podem
                  gerar relatos diferentes.
                </p>
                <p>
                  O{" "}
                  <a
                    href={SOURCES[4]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    laboratório do RunRepeat
                  </a>{" "}
                  encontrou uma biqueira mais estreita no Dropset 4 do que no
                  antecessor. Largura, comprimento e espaço sobre o pé são
                  questões diferentes. Subir meio número aumenta o comprimento,
                  mas pode não resolver pressão no mediopé ou no peito do pé.
                </p>
                <p>
                  Experimente com a meia que usa para treinar. Observe espaço
                  nos dedos, movimento do calcanhar e pressão sobre o pé em pé e
                  em movimento. Confira as condições de devolução antes de usar
                  na rua. Não converta a numeração americana de um avaliador
                  para a brasileira sem consultar a tabela da marca.
                </p>
              </div>
            </section>
            <section id="hyrox" className="article-body">
              <div className="page">
                <h2>O Pro é uma boa opção para HYROX?</h2>
                <p>
                  O Pro merece entrar na lista porque sua proposta combina
                  corrida e estações funcionais. Nossa preferência sobre o
                  Dropset 4 nesse uso vem da finalidade do produto e do
                  comparativo publicado, não de um teste que o coloque acima de
                  todos os tênis de HYROX.
                </p>
                <p>
                  Relatos de aderência precisam de contexto: superfície,
                  desgaste e condições importam. Não prometeríamos que uma sola
                  nunca vai escorregar. Antes de competir, use o tênis escolhido
                  em sessões parecidas com os movimentos e transições esperados.
                </p>
              </div>
            </section>
            <section id="elite" className="article-body">
              <div className="page">
                <h2>O que muda no Dropset Elite</h2>
                <p>
                  O{" "}
                  <a
                    href={SOURCES[6]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Dropset Elite custa US$275
                  </a>
                  , contra{" "}
                  <a
                    href={SOURCES[7]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    US$150 do Pro
                  </a>{" "}
                  nas páginas americanas da Adidas consultadas em 5 de setembro
                  de 2026. A marca posiciona o Elite para competição híbrida de
                  elite e o Pro para um uso mais amplo entre treino e preparação
                  para provas.
                </p>
                <p>
                  Preço maior não é recomendação de compra. Se você está
                  escolhendo seu primeiro tênis híbrido, resolva a necessidade
                  do treino e o ajuste antes de pagar por um modelo mais
                  especializado. Estoque, descontos e preços locais mudam; esses
                  valores não são preços de varejo no Brasil.
                </p>
              </div>
            </section>

            <section id="faq" className="faq-section">
              <div className="page">
                <h2 className="faq-head">Perguntas frequentes</h2>
                {FAQS.map((f) => (
                  <div key={f.q} className="faq-item">
                    <h3 className="faq-q">{f.q}</h3>
                    <p className="faq-a">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>
            <section id="sources" className="article-body">
              <div className="page">
                <h2>Fontes e leitura adicional</h2>
                <p>
                  As páginas da Adidas documentam a proposta e as
                  especificações; os avaliadores independentes relatam seus
                  próprios testes. Os resultados não são intercambiáveis.
                </p>
                <ul className="dropset-sources">
                  {SOURCES.map((href, i) => (
                    <li key={href}>
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {SOURCE_LABELS[i]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            <AuthorCard lang="pt" />
            <section className="post-disclaimer-section">
              <div className="page">
                <p className="post-disclaimer">
                  Nenhum produto foi recebido de presente, este texto não é
                  publicidade paga e não contém links de afiliados.
                </p>
              </div>
            </section>
            <PostSubscribe lang="pt" />
          </div>
          <aside className="post-aside post-aside--toc">
            <PostToc items={TOC} title="Neste texto" />
          </aside>
        </div>
      </main>
      <SiteFooter lang="pt" />
    </>
  );
}
