import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { PostSubscribe } from "@/components/PostAside";
import AuthorCard from "@/components/AuthorCard";

export const metadata = {
  title: "Cidade do Cabo agora é uma Marathon Major, Suor Society",
  description:
    "A Cidade do Cabo foi confirmada como a oitava Abbott World Marathon Major em 10 de junho de 2026. A primeira Major da África entra para a série em 23 de maio de 2027. Veja o que muda.",
  alternates: {
    canonical: "/pt-br/dispatch/cape-town-marathon-major",
    languages: {
      en: "/dispatch/cape-town-marathon-major",
      "pt-BR": "/pt-br/dispatch/cape-town-marathon-major",
    },
  },
  openGraph: { locale: "pt_BR" },
};

const FAQS = [
  {
    q: "Quando a Cidade do Cabo vira uma Marathon Major?",
    a: "Oficialmente na próxima edição, em 23 de maio de 2027. O anúncio foi feito em 10 de junho de 2026, depois de a prova passar na segunda avaliação.",
  },
  {
    q: "A medalha das Seis Estrelas ainda existe?",
    a: "Sim. A Abbott confirmou que a medalha das Seis Estrelas continua mesmo depois de chegar a de Nove Estrelas. Cidade do Cabo e Sydney contam para as conquistas maiores.",
  },
  {
    q: "Quem terminou a Cidade do Cabo em 2026 ganhou estrela?",
    a: "Sim. Todo mundo que terminou em 2026 recebeu uma estrela provisória, que está sendo convertida agora que a prova foi confirmada como Major.",
  },
];

export default function CapeTownMajorPtBr() {
  return (
    <div lang="pt-BR">
      <SiteNav lang="pt" />

      <main className="post">
        {/* ── ARTICLE MASTHEAD (title above the cover) ── */}
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">The Dispatch &nbsp;/&nbsp; Corridas</div>
            <h1 className="article-headline">
              Cidade do Cabo agora é uma Marathon Major. O que muda de <span>verdade</span>
            </h1>
          </div>
        </section>

        {/* ── COVER IMAGE ── */}
        <div className="article-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cape-town-hero.jpg"
            alt="Vista aérea da Cidade do Cabo com a Table Mountain e o estádio, casa da oitava Abbott World Marathon Major"
          />
        </div>

        {/* ── BODY + STICKY RAIL ── */}
        <div className="post-shell">
          <div className="post-main">

        {/* ── ARTICLE HERO (deck + meta) ── */}
        <section className="article-hero">
          <div className="page">
            <p className="article-deck">
              A Sanlam Cape Town Marathon é oficialmente a oitava Abbott World Marathon Major e a
              primeira em solo africano. O anúncio saiu em 10 de junho de 2026.
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
              A Sanlam Cape Town Marathon é oficialmente a oitava Abbott World Marathon Major e a
              primeira em solo africano. O anúncio saiu em 10 de junho de 2026. A Cidade do Cabo entra
              para a série na sua próxima edição, em 23 de maio de 2027, ao lado de Tóquio, Boston,
              Londres, Sydney, Berlim, Chicago e Nova York.
            </p>
            <p>
              Notícia grande, e atrasada. O continente que produz a maior parte dos melhores fundistas
              do esporte finalmente tem uma Major pra chamar de sua.
            </p>

            <h2>Como aconteceu</h2>
            <p>
              A Cidade do Cabo passou na sua segunda avaliação na edição de 2026, em maio — é assim que
              funciona o processo de candidatura. Duas edições impecáveis cumprindo todos os critérios
              (percurso, expo, elite, operação, segurança) e você está dentro. Todo mundo que terminou a
              prova de 2026 ganhou uma estrela provisória, e essas estão sendo convertidas na de verdade.
            </p>

            <h2>O que isso muda na busca pelas estrelas</h2>
            <p>Conta rápida pra quem coleciona:</p>
            <p>
              A medalha das Seis Estrelas continua. A Abbott confirmou que ela segue sendo entregue pelas
              seis originais (Tóquio, Boston, Londres, Berlim, Chicago e Nova York), então ninguém perde
              o progresso.
            </p>
            <p>
              Sydney fez sete no ano passado. A Cidade do Cabo faz oito. E uma medalha de Nove Estrelas já
              está na mesa, porque Xangai é a próxima candidata. Se passar na segunda avaliação em 6 de
              dezembro de 2026, a série vai a nove.
            </p>
            <p>
              Ou seja, a lista de desejos ficou mais longa, mais cara e, sendo honesto, mais interessante.
              Seis costumava ser a linha de chegada. Agora é um ponto de passagem.
            </p>

            <h2>Nossa visão</h2>
            <p>
              Registre interesse cedo se a Cidade do Cabo já passou pela sua cabeça alguma vez. O status de
              Major faz uma coisa com qualquer prova, sempre: a procura vai às alturas. A edição de 2026 foi
              a última em que dava pra entrar de boa. Maio de 2027 não vai ser.
            </p>
            <p>
              E se uma maratona completa na Cidade do Cabo parece muito agora, tudo bem. Mais perto de casa,
              nossas <a href="/pt-br/culture/corridas-brasil-2026">escolhas de corridas que valem a inscrição</a> têm
              provas em que você se inscreve hoje, sem sorteio, sem índice.
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
    </div>
  );
}
