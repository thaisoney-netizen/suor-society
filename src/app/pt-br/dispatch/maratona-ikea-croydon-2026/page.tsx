import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ArticleCover from "@/components/ArticleCover";
import { PostToc } from "@/components/PostAside";
import AuthorCard from "@/components/AuthorCard";
import { pageMeta, ArticleJsonLd, FaqJsonLd } from "@/lib/seo";

// Tradução real de /dispatch/ikea-marathon-croydon-2026 em slug diferente, por
// isso o `counterpart` liga o par hreflang e o REGIONAL_PAIRS (dictionaries.ts)
// mapeia o seletor de idioma.
const META = {
  path: "/pt-br/dispatch/maratona-ikea-croydon-2026",
  title: "Maratona IKEA 2026: Data, Inscrição e Detalhes em Croydon",
  description:
    "A primeira Maratona IKEA oficial acontece em 13 de dezembro de 2026, inteiramente dentro da IKEA de Croydon, em Londres. São 100 vagas, largada às 18h, corte rígido de seis horas e uma medalha que você monta.",
  image: "/ikea-marathon-hero.avif",
};
export const metadata = pageMeta({
  ...META,
  paired: true,
  counterpart: "/dispatch/ikea-marathon-croydon-2026",
});

const TOC = [
  { id: "os-detalhes", label: "Os Detalhes" },
  { id: "se-voce-treina", label: "Se Você Treina Força" },
  { id: "faq", label: "Perguntas Frequentes" },
];

const DETALHES = [
  { k: "Data", v: "Domingo, 13 de dezembro de 2026" },
  { k: "Onde", v: "IKEA Croydon, Londres" },
  { k: "Vagas", v: "100 no total, 80 na venda geral" },
  { k: "Inscrição", v: "£80 (filiados), £82 (não filiados), encerra em 6 de dezembro" },
  { k: "Corte", v: "Seis horas, loja liberada até meia-noite" },
  { k: "Caridade", v: "16% da renda para a Shelter" },
  { k: "Posto de hidratação", v: "Almôndegas, talvez sanduíche de lingonberry" },
  { k: "Medalha", v: "Chega desmontada. Você monta. Com manual de instruções." },
];

const FAQS = [
  {
    q: "Quando é a Maratona IKEA?",
    a: "Domingo, 13 de dezembro de 2026, na IKEA Croydon, em Londres. Largada às 18h, encerramento até meia-noite.",
  },
  {
    q: "Como se inscrever?",
    a: "Inscrições abriram em 26 de junho de 2026 pelo SIEntries e pela Sussex Trail Events. £80 para corredores filiados, £82 para não filiados. Encerram em 6 de dezembro ou quando as 80 vagas gerais esgotarem.",
  },
  {
    q: "Quantas voltas tem o percurso?",
    a: "Cerca de 17 voltas pelo showroom, caixas e depósito.",
  },
  {
    q: "Pode ter torcida?",
    a: "Não. A loja segue funcionando durante a prova, então acompanhantes não entram.",
  },
  {
    q: "Tem limite de tempo?",
    a: "Sim, corte rígido de seis horas. A loja precisa ser liberada até meia-noite.",
  },
  {
    q: "O que o finisher ganha?",
    a: "Uma medalha que chega desmontada, com manual de instruções, no melhor estilo IKEA.",
  },
];

export default function MaratonaIkea() {
  return (
    <>
      <ArticleJsonLd {...META} datePublished="2026-07-10" />
      <FaqJsonLd faqs={FAQS} />
      <SiteNav lang="pt" />

      <main className="post">
        {/* ── ARTICLE MASTHEAD (title above the cover) ── */}
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">The Dispatch &nbsp;/&nbsp; Corridas</div>
            <h1 className="article-headline">
              A Maratona da IKEA É Real: 42km Dentro de Uma Loja, e Pode Ser a Corrida Mais{" "}
              <span>Genial</span> de 2026
            </h1>
          </div>
        </section>

        {/* ── COVER IMAGE ── */}
        <ArticleCover
          src="/ikea-marathon-hero.avif"
          alt="Corredores atravessando os corredores do showroom de uma loja IKEA"
        />

        {/* ── BODY + STICKY RAIL ── */}
        <div className="post-shell">
          <div className="post-main">

            {/* ── ARTICLE HERO (deck + meta) ── */}
            <section className="article-hero">
              <div className="page">
                <p className="article-deck">
                  A primeira Maratona IKEA oficial acontece em 13 de dezembro de 2026,
                  inteiramente dentro da IKEA de Croydon, em Londres. São 100 vagas, largada às
                  18h com corte rígido de seis horas. Dezesseis por cento da renda vai para a
                  Shelter, ONG de moradia.
                </p>
                <div className="article-meta">
                  <span>Por <a href="/pt-br/author/thais-oney">Thais Oney</a></span>
                  <span>San Diego, CA</span>
                  <span>Julho 2026</span>
                </div>
              </div>
            </section>

            {/* ── BODY ── */}
            <section className="article-body">
              <div className="page">
                <p>
                  A Sussex Trail Events já organizou corridas em estacionamento de vários
                  andares, em píer e dentro de um antigo presídio. Essa é a mais estranha até
                  agora, e a logística faz um sentido absurdo. Aquele problema de marcar o
                  percurso que consome qualquer organizador? Resolvido. As setas já estão no
                  chão.
                </p>
                <p>
                  Os corredores dão voltas pelo showroom, passam pelos caixas e cruzam o
                  depósito. Cerca de 17 voltas. A largada é às 18h porque a loja segue operando,
                  o que também significa zero torcida. Você corre uma maratona sob luz
                  fluorescente, passando pela seção KALLAX, sem ninguém gritando seu nome. Brutal
                  e meio perfeito.
                </p>

                <h2 id="os-detalhes">Os detalhes</h2>
                <ul>
                  {DETALHES.map((d) => (
                    <li key={d.k}>
                      <strong>{d.k}</strong> | {d.v}
                    </li>
                  ))}
                </ul>
                <p>
                  Um padrão que vale notar: corrida em lugar improvável virou categoria própria.
                  Já existe um evento de seis horas marcado dentro de um supermercado Tesco no
                  País de Gales para junho de 2026. Os organizadores entenderam que um local
                  estranho faz o marketing sozinho.
                </p>

                <h2 id="se-voce-treina">Se você também treina força</h2>
                <p>
                  Uma prova indoor de voltas com corte de seis horas é um formato híbrido até
                  decente. Plano, clima controlado, zero variável de tempo, hidratação a cada 10
                  minutos. O problema é o piso. Seis horas em concreto polido castigam diferente
                  do asfalto, e a panturrilha reclama lá pela volta oito. Quem fosse se preparar
                  para algo assim precisaria de mais volume em piso duro e plano, mais o trabalho
                  unilateral que você provavelmente já faz nos dias de força.
                </p>
                <p>
                  Quer uma prova sem precisar voar para Londres? Confira nossas{" "}
                  <a href="/pt-br/racepicks">corridas no Brasil</a>.
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
