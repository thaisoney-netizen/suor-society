import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ArticleCover from "@/components/ArticleCover";
import { PostToc } from "@/components/PostAside";
import AuthorCard from "@/components/AuthorCard";
import { pageMeta, ArticleJsonLd, FaqJsonLd, EventJsonLd } from "@/lib/seo";

// Tradução real de /dispatch/ikea-marathon-croydon-2026 em slug diferente, por
// isso o `counterpart` liga o par hreflang e o REGIONAL_PAIRS (dictionaries.ts)
// mapeia o seletor de idioma.
const META = {
  path: "/pt-br/dispatch/maratona-ikea-croydon-2026",
  title: "Maratona IKEA 2026: Data, Percurso e Vagas Esgotadas",
  description:
    "A primeira Maratona IKEA oficial acontece em 13 de dezembro de 2026 dentro da IKEA de Croydon, em Londres, e as 80 vagas gerais já esgotaram. Data, percurso, voltas, corte e o que o finisher ganha.",
  image: "/ikea-marathon-hero.avif",
};
export const metadata = pageMeta({
  ...META,
  paired: true,
  counterpart: "/dispatch/ikea-marathon-croydon-2026",
});

// A página de inscrição é a fonte primária de todo fato da tabela; a imprensa
// confirma e carrega as falas do diretor de prova.
const FONTES = [
  "https://www.sientries.co.uk/event/the-ikea-marathon-2026",
  "https://sussextrailevents.com/",
  "https://www.washingtonpost.com/lifestyle/2026/07/14/runners-compete-marathon-inside-an-ikea-england/",
  "https://marathonhandbook.com/runners-will-race-a-marathon-inside-an-ikea-store-this-december/",
];
const FONTE_LABELS = [
  "SIEntries: página oficial de inscrição",
  "Sussex Trail Events: a organização",
  "Washington Post: cobertura da prova",
  "Marathon Handbook: entrevista com o diretor de prova",
];

const TOC = [
  { id: "inscricao", label: "Ainda dá para se inscrever?" },
  { id: "percurso", label: "Como é o percurso" },
  { id: "voltas", label: "Quantas voltas são?" },
  { id: "os-detalhes", label: "Os detalhes" },
  { id: "lojas", label: "Por que corrida em loja virou moda" },
  { id: "se-voce-treina", label: "Se você treina força" },
  { id: "faq", label: "Perguntas Frequentes" },
  { id: "fontes", label: "Fontes" },
];

const DETALHES = [
  { k: "Data", v: "Domingo, 13 de dezembro de 2026" },
  { k: "Largada", v: "18h, corte rígido de seis horas, loja liberada até meia-noite" },
  { k: "Onde", v: "IKEA Croydon, sul de Londres" },
  { k: "Vagas", v: "100 no total, 80 na venda geral" },
  { k: "Inscrição", v: "£80 (filiados), £82 (não filiados), esgotada" },
  { k: "Idade mínima", v: "18 anos ou mais" },
  { k: "Formato", v: "42,2 km em voltas dentro da loja, cerca de 17 voltas" },
  { k: "Hidratação", v: "Tema sueco, almôndegas previstas" },
  { k: "O finisher leva", v: "Medalha para montar e camiseta de finisher" },
  { k: "Caridade", v: "16% da renda para a Shelter" },
  { k: "Torcida", v: "Não entra, a loja segue em funcionamento" },
  { k: "Reembolso", v: "Não tem, e a vaga não é transferível" },
];

const LOJAS = [
  {
    prova: "Maratona IKEA",
    onde: "IKEA Croydon, sul de Londres, 13 de dezembro de 2026",
    formato: "42,2 km, cerca de 17 voltas, corte de seis horas",
    inscricao: "£80 a £82, esgotada",
  },
  {
    prova: "Phoenix Supermarketathon",
    onde: "Tesco de Bridgend, País de Gales, 28 de junho de 2026",
    formato: "Seis horas cronometradas, você escolhe a distância",
    inscricao: "£57,95 a £59,95, já aconteceu",
  },
];

const FAQS = [
  {
    q: "Ainda dá para se inscrever na Maratona IKEA?",
    a: "Não. A página do SIEntries mostra a prova como lotada e fechada para novas inscrições. As inscrições abriram às 18h de sexta, 26 de junho de 2026, e as 80 vagas gerais acabaram em minutos. Não há reembolso nem transferência, então também não dá para comprar a vaga de outra pessoa.",
  },
  {
    q: "Quando é a Maratona IKEA?",
    a: "Domingo, 13 de dezembro de 2026, na IKEA de Croydon, no sul de Londres. A largada é às 18h e a loja precisa estar vazia até meia-noite.",
  },
  {
    q: "Quantas voltas tem o percurso?",
    a: "Cerca de 17 voltas dentro da loja. A página oficial só diz 42,2 km em formato de voltas e nunca dá o tamanho de cada uma. A cobertura que repete 1,5 km por volta não fecha a conta, porque 17 voltas dessas dão 25,5 km e não uma maratona. Volta de aproximadamente 2,5 km é o número que fecha.",
  },
  {
    q: "Tem limite de tempo?",
    a: "Sim, corte rígido de seis horas. A IKEA de Croydon funciona normalmente durante o dia e precisa ser liberada até meia-noite, então o corte é uma limitação do prédio e não da prova.",
  },
  {
    q: "Pode ter torcida?",
    a: "Não. A loja segue sendo um ambiente de trabalho durante a prova e acompanhantes não entram, por questão de segurança. Os corredores fazem os 42,2 km sem ninguém assistindo.",
  },
  {
    q: "O que o finisher ganha?",
    a: "Uma medalha exclusiva que chega desmontada, com manual de instruções, mais uma camiseta de finisher. O posto de hidratação tem tema sueco, com almôndegas previstas e sanduíche de lingonberry em estudo.",
  },
  {
    q: "Vai ter Maratona IKEA em 2027?",
    a: "Nada foi anunciado. A Sussex Trail Events publica as provas novas no próprio site e no SIEntries antes de qualquer outro lugar, então são essas as páginas para acompanhar. As vagas de 2026 esgotaram em minutos, que é o melhor argumento a favor de uma segunda edição.",
  },
];

export default function MaratonaIkea() {
  return (
    <>
      <ArticleJsonLd
        {...META}
        datePublished="2026-07-10"
        dateModified="2026-09-06"
        citation={FONTES}
      />
      <FaqJsonLd faqs={FAQS} />
      {/* O schema Article diz o que é a página; o SportsEvent diz o que é a
          prova e, em `offers.availability`, que não dá mais para se inscrever. */}
      <EventJsonLd
        name="Maratona IKEA"
        description="Uma maratona de 42,2 km em voltas, corrida inteiramente dentro da loja IKEA de Croydon, no sul de Londres, com corte rígido de seis horas."
        path={META.path}
        image={META.image}
        startDate="2026-12-13T18:00:00+00:00"
        endDate="2026-12-14T00:00:00+00:00"
        venue="IKEA Croydon"
        locality="Croydon"
        region="London"
        country="GB"
        organizerName="Sussex Trail Events"
        organizerUrl="https://sussextrailevents.com/"
        offer={{
          price: "80",
          priceCurrency: "GBP",
          availability: "SoldOut",
          url: FONTES[0],
          validFrom: "2026-06-26T18:00:00+01:00",
        }}
      />
      <SiteNav lang="pt" />

      <main className="post">
        {/* ── ARTICLE MASTHEAD (title above the cover) ── */}
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">The Dispatch &nbsp;/&nbsp; Corridas</div>
            <h1 className="article-headline">
              Maratona IKEA: 42 km Dentro de uma Loja em Croydon, e Todas as Vagas Já{" "}
              <span>Esgotaram</span>
            </h1>
          </div>
        </section>

        {/* ── COVER IMAGE ── */}
        <ArticleCover
          src="/ikea-marathon-hero.avif"
          alt="Corredores passando pelos corredores do showroom de uma loja IKEA"
        />

        {/* ── BODY + STICKY RAIL ── */}
        <div className="post-shell">
          <div className="post-main">

            {/* ── ARTICLE HERO (cápsula de resposta + meta) ── */}
            <section className="article-hero">
              <div className="page">
                <p className="article-deck">
                  A Maratona IKEA acontece no domingo, 13 de dezembro de 2026, dentro da IKEA
                  de Croydon, no sul de Londres, e não dá mais para se inscrever. As 80 vagas da
                  venda geral esgotaram em minutos depois que as inscrições abriram, em 26 de
                  junho. São no máximo 100 corredores, largada às 18h com corte rígido de seis
                  horas, e 16 por cento da renda vai para a Shelter, uma organização de moradia.
                </p>
                <div className="article-meta">
                  <span>Por <a href="/pt-br/author/thais-oney">Thais Oney</a></span>
                  <span>San Diego, CA</span>
                  <span>
                    Publicado em <time dateTime="2026-07-10">10 de julho de 2026</time>
                  </span>
                  <span>
                    Atualizado em <time dateTime="2026-09-06">6 de setembro de 2026</time>
                  </span>
                </div>
              </div>
            </section>

            {/* ── BODY ── */}
            <section className="article-body">
              <div className="page">
                <p>
                  A Sussex Trail Events já organizou prova em estacionamento de vários andares,
                  em píer e dentro de uma antiga prisão. Essa é a mais estranha até agora, e a
                  logística é justamente o que faz ela funcionar. O problema que consome
                  diretor de prova é a sinalização do percurso, e aqui ele estava resolvido
                  antes de qualquer um chegar. Como o diretor de prova disse ao{" "}
                  <a href={FONTES[3]} rel="nofollow noopener" target="_blank">
                    Marathon Handbook
                  </a>
                  , a loja já tem as setas no chão.
                </p>

                <h2 id="inscricao">Ainda dá para se inscrever na Maratona IKEA?</h2>
                <p>
                  Não. A{" "}
                  <a href={FONTES[0]} rel="nofollow noopener" target="_blank">
                    página oficial no SIEntries
                  </a>{" "}
                  mostra a prova como lotada, sem novas inscrições. Elas abriram às 18h de
                  sexta, 26 de junho de 2026, e as 80 vagas gerais acabaram em minutos. As
                  outras 20 das 100 vagas nunca estiveram na venda geral. A inscrição custava
                  £80 para corredores filiados e £82 para não filiados, e como a prova não faz
                  reembolso nem transferência, a vaga também não muda de mão por fora.
                </p>
                <p>
                  Nenhuma lista de espera foi publicada. A Sussex Trail Events anuncia as provas
                  no próprio site e no SIEntries antes de qualquer outro lugar, então são essas
                  as duas páginas para acompanhar se você quiser uma chance na próxima.
                </p>

                <h2 id="percurso">Como é o percurso</h2>
                <p>
                  Os corredores sobem a esteira rolante, passam pelos corredores do showroom,
                  atravessam os caixas e saem no depósito, e aí repetem tudo de novo. A largada
                  às 18h existe porque a loja funciona o dia inteiro, e é o mesmo motivo pelo
                  qual não tem torcida. Os acompanhantes ficaram de fora por segurança, o que o
                  diretor de prova chamou de preço a pagar. Ou seja, você corre uma maratona sob
                  luz fluorescente, passando pela seção da KALLAX, sem ninguém para ver.
                </p>

                <h2 id="voltas">Quantas voltas são, e qual o tamanho de cada uma?</h2>
                <p>
                  A cobertura da prova fixou em cerca de 17 voltas de aproximadamente 1,5
                  quilômetro. Os dois números não podem estar certos ao mesmo tempo. Uma
                  maratona tem 42,2 km, e 17 voltas de 1,5 km dão 25,5 km, quase 17 km a menos.
                  Para 17 voltas fecharem uma maratona, cada uma precisa ter cerca de 2,48 km,
                  ou pouco mais de 1,5 milha. A explicação mais provável é que alguém converteu
                  uma volta medida em milhas para quilômetros de forma errada, e o número ruim
                  vem sendo copiado desde então.
                </p>
                <p>
                  A página oficial não cita número nenhum. Ela diz apenas que a prova tem 42,2
                  km em formato de voltas dentro da loja. Até a organização publicar o tamanho
                  da volta, cerca de 17 voltas de aproximadamente 2,5 km é a versão que
                  sobrevive à conta.
                </p>

                <h2 id="os-detalhes">Os detalhes</h2>
                <div className="post-table-wrap">
                  <table className="post-table post-table--stack">
                    <caption>
                      Maratona IKEA 2026, conforme a página oficial do SIEntries
                    </caption>
                    <tbody>
                      {DETALHES.map((d) => (
                        <tr key={d.k}>
                          <th scope="row">{d.k}</th>
                          <td>{d.v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h2 id="lojas">Por que corrida em loja virou moda</h2>
                <p>
                  Não é caso isolado. Um evento de seis horas cronometradas rolou num Tesco de
                  Bridgend, no País de Gales, em junho de 2026, com o nome Phoenix
                  Supermarketathon, e o formato é próximo o bastante para valer a comparação.
                  Os organizadores perceberam que um local estranho faz o marketing por eles, e
                  foi assim que uma prova de 80 vagas dentro de uma loja de móveis parou no{" "}
                  <a href={FONTES[2]} rel="nofollow noopener" target="_blank">
                    Washington Post
                  </a>
                  . Este post faz parte do mesmo efeito.
                </p>
                <div className="post-table-wrap">
                  <table className="post-table post-table--stack">
                    <caption>Provas em lojas de varejo em 2026</caption>
                    <thead>
                      <tr>
                        <th scope="col">Prova</th>
                        <th scope="col">Onde e quando</th>
                        <th scope="col">Formato</th>
                        <th scope="col">Inscrição</th>
                      </tr>
                    </thead>
                    <tbody>
                      {LOJAS.map((l) => (
                        <tr key={l.prova}>
                          <th scope="row">{l.prova}</th>
                          <td data-label="Onde e quando">{l.onde}</td>
                          <td data-label="Formato">{l.formato}</td>
                          <td data-label="Inscrição">{l.inscricao}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h2 id="se-voce-treina">Se você treina força</h2>
                <p>
                  Uma volta indoor de seis horas é um formato híbrido razoável no papel. É
                  plano, tem clima controlado, não tem tempo para planejar e a hidratação passa
                  na sua frente a cada dez minutos mais ou menos. O problema é o piso. Seis
                  horas em concreto polido carregam a perna de um jeito diferente do asfalto, e
                  a repetição é a parte que as pessoas subestimam, porque 17 voltas no mesmo
                  circuito significam a mesma perna fazendo a mesma curva 17 vezes.
                </p>
                <p>
                  Se você fosse montar um treino para algo assim, ia querer mais tempo em piso
                  duro e plano e menos trilha, além do trabalho unilateral que você
                  provavelmente já faz nos dias de força.
                </p>
                <p>
                  Quer uma prova em que dá para se inscrever de verdade? A{" "}
                  <a href="/pt-br/culture/corridas-brasil-2026">
                    seleção de corridas no Brasil em 2026
                  </a>{" "}
                  reúne provas com inscrição aberta. Se o que atrai é a parte indoor, o{" "}
                  <a href="/pt-br/dispatch/hyrox-brasil-2026">calendário do HYROX no Brasil</a>{" "}
                  cobre provas disputadas inteiramente sob um teto.
                </p>
              </div>
            </section>

            {/* ── FAQ ── */}
            <section id="faq" className="faq-section">
              <div className="page">
                <div className="faq-head">Perguntas Frequentes</div>
                {FAQS.map((f, i) => (
                  <div key={i} className="faq-item">
                    <h3 className="faq-q">{f.q}</h3>
                    <p className="faq-a">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── FONTES ── */}
            <section id="fontes" className="article-body">
              <div className="page">
                <h2>Fontes</h2>
                <ul className="dropset-sources">
                  {FONTES.map((href, i) => (
                    <li key={href}>
                      <a href={href} rel="nofollow noopener" target="_blank">
                        {FONTE_LABELS[i]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* ── AUTHOR ── */}
            <AuthorCard lang="pt" />

          </div>{/* /.post-main */}

          <aside className="post-aside post-aside--toc">
            {/* Long read: the rail carries the section links, not the
                signup card. Short posts get the card instead. */}
            <PostToc items={TOC} title="Nesta página" />
          </aside>
        </div>{/* /.post-shell */}

      </main>

      <SiteFooter lang="pt" />
    </>
  );
}
