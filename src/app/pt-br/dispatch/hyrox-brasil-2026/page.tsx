import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ArticleCover from "@/components/ArticleCover";
import { PostSubscribe } from "@/components/PostAside";
import AuthorCard from "@/components/AuthorCard";
import { pageMeta, ArticleJsonLd, FaqJsonLd } from "@/lib/seo";

// Regional pair of the US "HYROX Fall 2026 Schedule" post, NOT a translation:
// this one covers HYROX in Brazil for the pt-BR audience. No hreflang between
// the two on purpose; they cross-link to each other instead.
const META = {
  path: "/pt-br/dispatch/hyrox-brasil-2026",
  title: "HYROX Brasil 2026: datas, cidades e inscrição",
  description:
    "HYROX no Brasil em 2026: São Paulo em 17 de outubro no Distrito Anhembi, mais Rio e Fortaleza. Datas, cidades e como treinar pra prova.",
  image: "/hyrox-hero.jpg",
};
export const metadata = pageMeta(META);

const AGENDA = [
  { city: "São Paulo, SP", date: "17 de outubro de 2026", venue: "Distrito Anhembi (terceira edição, confirmada)" },
  { city: "Rio de Janeiro, RJ", date: "Temporada 26/27, data a confirmar", venue: "Riocentro nas edições anteriores (deve voltar)" },
  { city: "Fortaleza, CE", date: "Temporada 26/27, data a confirmar", venue: "Centro de Eventos do Ceará (correu em fevereiro de 2026)" },
];

const FAQS = [
  {
    q: "O que é o HYROX?",
    a: "É uma prova que combina 8 km de corrida com 8 estações de força no mesmo evento. A corrida é dividida em trechos de 1 km, cada um seguido de uma estação (SkiErg, trenó, burpees, remo, farmers carry, sandbag lunges, wall balls). O formato é idêntico no mundo todo, o que permite comparar tempos entre cidades.",
  },
  {
    q: "Quando é o HYROX São Paulo 2026?",
    a: "Em 17 de outubro de 2026, no Distrito Anhembi, em São Paulo. É a terceira edição da prova na cidade.",
  },
  {
    q: "Tem HYROX em outras cidades do Brasil?",
    a: "Rio de Janeiro e Fortaleza já receberam edições e devem voltar na temporada 26/27, com datas a confirmar. São Paulo é a praça mais consolidada. Acompanhe brazil.hyrox.com para novas cidades e datas.",
  },
  {
    q: "Precisa qualificar pra fazer HYROX?",
    a: "Não. As divisões Open, Duplas e Revezamento são de inscrição aberta, qualquer nível. Qualificação só vale pra divisão Elite e para o Mundial.",
  },
  {
    q: "Quando abrem os ingressos do HYROX São Paulo?",
    a: "Ainda não há data de venda anunciada. Os ingressos da HYROX costumam abrir de 3 a 5 meses antes da prova, o que coloca SP em algum momento do meio do ano. A inscrição é pela página oficial em brazil.hyrox.com, e as praças grandes esgotam rápido.",
  },
];

export default function HyroxBrasil2026() {
  return (
    <>
      <ArticleJsonLd {...META} datePublished="2026-07-02" />
      <FaqJsonLd faqs={FAQS} />
      <SiteNav lang="pt" />

      <main className="post">
        {/* ── ARTICLE MASTHEAD (title above the cover) ── */}
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">The Dispatch &nbsp;/&nbsp; HYROX</div>
            <h1 className="article-headline">
              HYROX no Brasil 2026: São Paulo volta maior em <span>17 de outubro</span>
            </h1>
          </div>
        </section>

        {/* ── COVER IMAGE ── */}
        <ArticleCover
          src="/hyrox-hero.jpg"
          alt="Atleta levantando kettlebell acima da cabeça em treino no estilo HYROX"
        />

        {/* ── BODY + STICKY RAIL ── */}
        <div className="post-shell">
          <div className="post-main">

        {/* ── ARTICLE HERO (answer capsule + meta) ── */}
        <section className="article-hero">
          <div className="page">
            <p className="article-deck">
              A próxima prova confirmada de HYROX no Brasil é São Paulo, em 17 de outubro de 2026, no
              Distrito Anhembi, na terceira edição da cidade. Rio de Janeiro e Fortaleza já correram e
              devem voltar na temporada 26/27, com datas a confirmar. Toda prova segue o mesmo formato:
              8 km de corrida em trechos de 1 km, intercalados com 8 estações de força.
            </p>
            <div className="article-meta">
              <span>Por <a href="/pt-br/author/thais-oney">Thais Oney</a></span>
              <span>San Diego, CA</span>
              <span>Junho 2026</span>
            </div>
          </div>
        </section>

        {/* ── BODY ── */}
        <section className="article-body">
          <div className="page">
            <p>
              Em duas temporadas o HYROX no Brasil saiu de uma cidade para três. São Paulo estreou em
              2025, Rio e Fortaleza entraram em seguida, e agora SP já está na terceira edição. A
              torcida brasileira virou marca registrada do circuito: a passagem pela ROXZONE em São
              Paulo é das mais barulhentas do mundo.
            </p>
            <p>
              Para 2026, só uma data está cravada até agora, e é a que importa se você está no Brasil:
              São Paulo, 17 de outubro, no Distrito Anhembi. Trate como sua prova A do ano. As outras
              cidades ainda dependem do calendário 26/27, que a HYROX libera mais perto.
            </p>

            <h2>A agenda do HYROX Brasil</h2>
            <ul>
              {AGENDA.map((r) => (
                <li key={r.city}>
                  <strong>{r.city}</strong> | {r.date} | {r.venue}
                </li>
              ))}
            </ul>
            <p>
              Um detalhe que vale notar: São Paulo é a única praça consolidada do país, já na terceira
              edição. Rio e Fortaleza ainda são jovens no circuito. Se a sua meta é garantir vaga em
              2026 sem depender de anúncio, SP é a aposta segura. As vendas das grandes praças esgotam
              rápido quando abrem.
            </p>

            <h2>Se você também levanta peso</h2>
            <p>
              Aqui é onde o calendário fica interessante pra quem é híbrido. Contando de trás pra
              frente a partir de 17 de outubro, um bloco de HYROX de 10 a 12 semanas começa no fim de
              julho ou início de agosto. Encaixa quase bem demais.
            </p>
            <p>
              O timing ajuda. Julho e agosto são inverno em boa parte do Brasil, clima mais seco e
              fresco, ideal pra construir base de corrida sem fritar no calor. Você usa o começo do ano
              pra segurar a força pesada e montar quilometragem, e depois vira a chave pro trabalho
              específico de prova (trenó, wall balls, corrida em fadiga) a partir de agosto.
            </p>
            <p>
              Primeiro HYROX? A divisão Open é exatamente o que parece: sem qualificação, qualquer
              nível de condicionamento. E Duplas deixa você dividir o trabalho com um parceiro. É o
              jeito mais amigável que existe hoje de entrar no mundo do hybrid racing.
            </p>
            <p>
              Quer testar o motor antes da prova? As{" "}
              <a href="/pt-br/culture/corridas-brasil-2026">corridas de rua que valem a inscrição</a>{" "}
              têm provas pra você se inscrever hoje, do 5K à maratona.
            </p>
            <p>
              Nos EUA? Veja o{" "}
              <a href="/dispatch/hyrox-fall-2026-schedule">
                calendário de HYROX do outono nos Estados Unidos
              </a>.
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
