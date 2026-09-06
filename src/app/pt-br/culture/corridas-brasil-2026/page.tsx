import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ArticleCover from "@/components/ArticleCover";
import DownloadGate from "@/components/DownloadGate";
import { PostToc } from "@/components/PostAside";
import AuthorCard from "@/components/AuthorCard";
import { pageMeta, ArticleJsonLd, FaqJsonLd } from "@/lib/seo";
import races from "@/content/races-br.json";
import { RaceRow, type Race } from "@/components/RaceRow";

// Regional pair of the US "Open Entry Races 2026" post, NOT a translation:
// this page covers Brazilian races for the pt-BR audience. No hreflang between
// the two on purpose; they cross-link to each other instead.

const TOC = [
  { id: "grandes", label: "As grandes do ano" },
  { id: "pelo-brasil", label: "Pelo Brasil" },
  { id: "circuitos", label: "Circuitos" },
  { id: "faq", label: "Perguntas Frequentes" },
  { id: "download", label: "Baixar o guia" },
];

const META = {
  path: "/pt-br/culture/corridas-brasil-2026",
  title: "Corridas Brasil 2026: datas, distâncias e inscrição",
  description:
    "As corridas de rua que valem a inscrição no Brasil em 2026. São Silvestre, maratonas de SP e Rio, HYROX e mais. Datas, distâncias e links diretos.",
  image: "/sao-silvestre-hero.webp",
};
export const metadata = pageMeta(META);

// Race data lives in src/content/races-br.json — the PDF generator
// (scripts/generate-race-guide-pdf.js) renders the same file, so editing the
// JSON updates the page and the downloadable guide together.
const GRANDES = races.grandes as Race[];
const PELO_BRASIL = races.peloBrasil as Race[];
const CIRCUITOS = races.circuitos as Race[];

const FAQS = [
  {
    q: "O que é uma corrida de inscrição aberta?",
    a: "É uma prova em que você se inscreve sem precisar de tempo de qualificação ou sorteio. Paga a inscrição e está dentro. No Brasil, quase toda corrida de rua funciona assim, da São Silvestre às maratonas de capital.",
  },
  {
    q: "Preciso de tempo de qualificação para correr uma maratona no Brasil?",
    a: "Não. Diferente de Boston, Nova York ou Chicago, as maratonas brasileiras são abertas a qualquer corredor, independente de ritmo. Algumas têm tempo máximo de prova (em geral 5 a 6 horas para a maratona), que vale conferir no regulamento.",
  },
  {
    q: "Qual é a corrida mais tradicional do Brasil?",
    a: "A Corrida de São Silvestre, em São Paulo, na 101ª edição em 2026. Acontece todo dia 31 de dezembro, com 15K da Avenida Paulista à Rua da Consolação, reunindo elite mundial e milhares de amadores na virada do ano.",
  },
  {
    q: "Dá pra correr a São Silvestre sendo iniciante?",
    a: "Dá. São 15K em percurso urbano com largada por pelotões conforme o ritmo declarado. Não tem exigência de pace mínimo. É uma boa primeira prova longa, desde que você tenha feito o volume de treino para a distância.",
  },
  {
    q: "Qual a melhor maratona do Brasil para tentar um PR?",
    a: "As litorâneas planas, como Fortaleza e a Maratona do Rio no traçado clássico de 2026, favorecem tempo rápido. A do Rio tem poucas curvas e altimetria plana, uma das mais rápidas da América do Sul. O fator a controlar no litoral é calor e umidade.",
  },
  {
    q: "Quando abrem as inscrições?",
    a: "Em geral 3 a 4 meses antes da prova, por lote, com preço subindo até o dia. As grandes (São Silvestre, Maratona de SP, Maratona do Rio) esgotam, então o lote 1 é o melhor momento. Confirme sempre no site oficial.",
  },
];

export default function CorridasBrasil2026() {
  return (
    <>
      <ArticleJsonLd {...META} datePublished="2026-07-02" dateModified="2026-08-03" />
      <FaqJsonLd faqs={FAQS} />
      {/* NAV */}
      <SiteNav lang="pt" />

      <main className="post">

        {/* ── ARTICLE MASTHEAD (title above the cover) ── */}
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">The Culture Archive &nbsp;/&nbsp; Junho 2026</div>
            <h1 className="article-headline">
              As corridas de rua que valem a inscrição no <span>Brasil</span> em 2026
            </h1>
          </div>
        </section>

        {/* ── COVER IMAGE ── */}
        <ArticleCover
          src="/sao-silvestre-hero.webp"
          alt="Pelotão de elite na largada da Corrida de São Silvestre, na Avenida Paulista"
        />

        {/* ── BODY + STICKY RAIL ── */}
        <div className="post-shell">
          <div className="post-main">

        {/* ── ARTICLE HERO (answer capsule + meta) ── */}
        <section className="article-hero">
          <div className="page">
            <p className="article-deck">
              As maiores corridas do Brasil em 2026 são a São Silvestre (15K, 31 de dezembro, 101ª
              edição), a Maratona Internacional de São Paulo (abril, no Ibirapuera) e a Maratona do Rio
              (junho). Quase toda corrida de rua aqui é de inscrição aberta, sem tempo de qualificação.
              O que muda é capacidade, lote e data. Esta página são as provas que valem a inscrição,
              com a nossa leitura de cada uma.
            </p>
            <div className="article-meta">
              <span>Por <a href="/pt-br/author/thais-oney">Thais Oney</a></span>
              <span>San Diego, CA</span>
              <span>Junho 2026</span>
            </div>
          </div>
        </section>

        {/* ── INTRO ── */}
        <section className="article-body">
          <div className="page">
            <p>
              O calendário brasileiro é gigante. São centenas de provas por ano, em todo estado, e
              listar todas não ajuda ninguém. Então isto não é um calendário completo. É uma seleção:
              as âncoras que se repetem todo ano e as provas que valem a viagem, com a leitura de quem
              corre e levanta peso em volta de tudo o resto.
            </p>
            <p>
              Uma observação antes de tudo. Datas, lotes e vagas mudam rápido no Brasil. As inscrições
              abrem por lote, com preço subindo até o dia da prova, e as grandes esgotam. Clique e
              confirme no site oficial antes de se inscrever.
            </p>
          </div>
        </section>

        {/* ── AS GRANDES DO ANO ── */}
        <section id="grandes" style={{ borderBottom: "1px solid var(--line)", paddingBottom: "56px" }}>
          <div className="page">
            <div className="article-section-head">
              <div className="article-section-label">As grandes do ano</div>
              <div className="article-section-sub">Âncoras anuais · As que você marca no calendário antes de qualquer coisa</div>
            </div>
            <div className="race-list">
              {GRANDES.map((r) => <RaceRow key={r.num} race={r} registerLabel="Inscreva-se →" />)}
            </div>
          </div>
        </section>

        {/* ── PELO BRASIL ── */}
        <section id="pelo-brasil" style={{ borderBottom: "1px solid var(--line)", paddingBottom: "56px" }}>
          <div className="page">
            <div className="article-section-head">
              <div className="article-section-label">Pelo Brasil</div>
              <div className="article-section-sub">Provas que valem a viagem · De norte a sul</div>
            </div>
            <div className="race-list">
              {PELO_BRASIL.map((r) => <RaceRow key={r.num} race={r} registerLabel="Inscreva-se →" />)}
            </div>
          </div>
        </section>

        {/* ── CIRCUITOS ── */}
        <section id="circuitos" style={{ borderBottom: "1px solid var(--line)", paddingBottom: "56px" }}>
          <div className="page">
            <div className="article-section-head">
              <div className="article-section-label">Circuitos que valem o ano todo</div>
              <div className="article-section-sub">Várias etapas, uma inscrição de cada vez</div>
            </div>
            <div className="race-list">
              {CIRCUITOS.map((r) => <RaceRow key={r.num} race={r} registerLabel="Inscreva-se →" />)}
            </div>
          </div>
        </section>

        {/* ── INTERNAL + REGIONAL CROSS-LINKS ── */}
        <section className="article-body">
          <div className="page">
            <p>
              Treinando pra uma prova híbrida também? O{" "}
              <a href="/pt-br/dispatch/hyrox-brasil-2026">HYROX no Brasil em 2026</a> tem data
              confirmada em São Paulo e a nossa leitura de como montar o bloco de treino. E quando
              estiver por San Diego, a crew corre junto.
            </p>
            <p>
              Nos EUA? Veja as{" "}
              <a href="/culture/open-entry-races-2026">
                corridas de inscrição aberta na Califórnia e pelos Estados Unidos
              </a>.
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

        {/* ── DOWNLOAD GATE ── */}
        <section id="download" className="download-gate">
          <div className="page">
            <div className="gate-label">Download grátis</div>
            <div className="gate-title">Baixe o<br />Guia Completo</div>
            <p className="gate-desc">
              Todas as corridas em um PDF formatado. Datas, distâncias e links de
              inscrição, pronto pra salvar, imprimir ou compartilhar.
            </p>
            <ul className="gate-what">
              <li>As grandes corridas do Brasil em 2026</li>
              <li>Maratonas, meias e provas de rua que valem a inscrição</li>
              <li>Todas as distâncias: 5K, 10K, 21K, 42K</li>
              <li>Status e links diretos atualizados em agosto de 2026</li>
            </ul>
            <DownloadGate lang="pt" />
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
