import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ArticleCover from "@/components/ArticleCover";
import { PostSubscribe } from "@/components/PostAside";
import AuthorCard from "@/components/AuthorCard";
import { pageMeta, ArticleJsonLd, FaqJsonLd } from "@/lib/seo";

const META = {
  path: "/pt-br/dispatch/june-2026-shoe-drops",
  title: "Lançamentos de tênis de junho de 2026, Suor Society",
  description:
    "Lançamentos de tênis de corrida em junho de 2026: Saucony Endorphin Elite 3 e Triumph 24, o Deviate Nitro sem placa da Puma, o Asics GT-1000 15 e por que os super trainers sem placa são a tendência do momento.",
  image: "/june-shoe-drops-hero.webp",
};
export const metadata = pageMeta({ ...META, paired: true });

const FAQS = [
  {
    q: "O que é um super trainer sem placa?",
    a: "Um tênis de corrida com uma entressola alta de espuma de competição de ponta, mas sem placa de carbono. Você tem quase todo o retorno de um super tênis com uma pisada mais natural e menos rígida, normalmente por um preço menor.",
  },
  {
    q: "Quais tênis de corrida lançam em junho de 2026?",
    a: "O Saucony Endorphin Elite 3 e o Triumph 24 (ambos em 1º de junho), o Deviate Pure Nitro sem placa da Puma (4 de junho, US$ 150) e o Asics GT-1000 15. O Asics Novablast 6 vem em julho.",
  },
  {
    q: "O Endorphin Elite 3 vale US$ 290?",
    a: "Se você compete algumas vezes por ano e quer toda vantagem na largada, talvez. Como tênis de treino do dia a dia, não. Ele foi feito pra ritmo de prova, e o preço reflete isso.",
  },
];

export default function JuneShoeDropsPtBr() {
  return (
    <>
      <ArticleJsonLd {...META} datePublished="2026-06-23" />
      <FaqJsonLd faqs={FAQS} />
      <SiteNav lang="pt" />

      <main className="post">
        {/* ── ARTICLE MASTHEAD (title above the cover) ── */}
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">The Dispatch &nbsp;/&nbsp; Equipamentos</div>
            <h1 className="article-headline">
              Lançamentos de tênis de junho: a Saucony aposta alto e a Puma tira a <span>placa</span>
            </h1>
          </div>
        </section>

        {/* ── COVER IMAGE ── */}
        <ArticleCover
          src="/june-shoe-drops-hero.webp"
          alt="Lançamentos de tênis de corrida de junho de 2026, incluindo o Saucony Endorphin Elite 3"
        />

        {/* ── BODY + STICKY RAIL ── */}
        <div className="post-shell">
          <div className="post-main">

        {/* ── ARTICLE HERO (deck + meta) ── */}
        <section className="article-hero">
          <div className="page">
            <p className="article-deck">
              Junho é o maior mês de tênis do meio do ano, e esse entregou. Aqui está o que vale a pena
              saber, e a única tendência por trás de tudo isso.
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
              Junho é o maior mês de tênis do meio do ano, e esse entregou. A Saucony lançou o Endorphin
              Elite 3 (US$ 290) e o Triumph 24 em 1º de junho, o Deviate Pure Nitro sem placa da Puma
              chegou em 4 de junho por US$ 150, e o Asics GT-1000 15 (US$ 115) já está nas lojas. O Asics
              Novablast 6 vem em julho.
            </p>
            <p>Aqui está o que vale a pena saber, e a única tendência por trás de tudo isso.</p>

            <h2>Os lançamentos</h2>
            <p>
              <strong>Saucony Endorphin Elite 3.</strong> O destaque. 204 gramas, cerca de 40 mm da
              espuma ultramacia IncrediRUN da Saucony, placa de carbono, rocker agressivo. Essa linha já
              foi pra todo lado (a primeira versão era firme, a segunda era um marshmallow), e a terceira,
              segundo dizem, mantém a maciez e ganha estabilidade no calcanhar. A US$ 290 é ferramenta de
              dia de prova, ponto final. Compre pra linha de largada, não pra terça.
            </p>
            <p>
              <strong>Saucony Triumph 24.</strong> O confiável de amortecimento máximo pro dia a dia,
              renovado em 1º de junho. Menos empolgante, mais útil.
            </p>
            <p>
              <strong>Puma Deviate Pure Nitro.</strong> O interessante. Sai em 4 de junho por US$ 150: uma
              lâmina alta da NITROFOAM evoluída da Puma, sem placa dentro, 221 gramas, mirando direto no
              Adidas Evo SL e no Asics Superblast 3. Quase todo o retorno de um super trainer por um preço
              de tênis de treino do dia a dia. Mais sobre por que isso importa em um segundo.
            </p>
            <p>
              <strong>Asics GT-1000 15.</strong> Estabilidade pro dia a dia por US$ 115, que na
              precificação de 2026 quase parece erro de digitação.
            </p>
            <p>
              <strong>Ainda vem por aí:</strong> o Novablast 6 em julho, e dizem por aí que um Alphafly 4
              pode chegar no fim do ano.
            </p>

            <h2>A real história: a placa está virando opcional</h2>
            <p>
              As espumas ficaram tão boas que as marcas começaram a tirar a placa de carbono e o tênis
              continua parecendo rápido. É essa toda a categoria de super trainer sem placa: entressola
              alta e cheia de retorno, sem placa rígida, preço mais amigável e uma pisada que funciona pra
              mais tipos de passada.
            </p>
            <p>
              Pra atleta híbrido, em especial, é a categoria pra ficar de olho. Um tênis com placa em pernas
              que agacharam ontem é muita carga em panturrilha e tendão de aquiles. Na nossa experiência, um
              trainer sem placa e mais perdoador é o mais fácil pro dia a dia quando você empilha musculação
              e corrida na mesma semana. Guarde a placa pro dia de prova.
            </p>
            <p>
              Falando em dia de prova, se você precisa de um lugar pra apontar toda essa espuma nova, nossas{" "}
              <a href="/pt-br/racepicks">escolhas de corridas de inscrição aberta</a> têm opções sem sorteio
              e sem índice.
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
