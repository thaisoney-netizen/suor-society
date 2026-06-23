import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { PostSubscribe } from "@/components/PostAside";

export const metadata = {
  title: "Calendário HYROX nos EUA – 2º semestre de 2026, Suor Society",
  description:
    "O calendário da HYROX para a América do Norte no segundo semestre de 2026 lista 10 provas, do Labor Day até dezembro, incluindo Anaheim de 4 a 6 de dezembro e estreias em Salt Lake City, Tampa, Denver e Nashville.",
  alternates: {
    canonical: "/pt-br/dispatch/hyrox-fall-2026-schedule",
    languages: {
      en: "/dispatch/hyrox-fall-2026-schedule",
      "pt-BR": "/pt-br/dispatch/hyrox-fall-2026-schedule",
    },
  },
  openGraph: { locale: "pt_BR" },
};

const SCHEDULE = [
  { city: "Washington, DC", date: "3 a 7 de set", venue: "Walter E. Washington Convention Center (realocada do período habitual no primeiro semestre)" },
  { city: "Salt Lake City, UT", date: "18 a 20 de set", venue: "Salt Palace Convention Center (nova)" },
  { city: "Toronto, ON", date: "1 a 4 de out", venue: "Enercare Centre" },
  { city: "Boston, MA", date: "8 a 11 de out", venue: "Boston Convention and Exhibition Center" },
  { city: "Tampa, FL", date: "23 a 25 de out", venue: "Tampa Convention Center (nova)" },
  { city: "Denver, CO", date: "12 a 15 de nov", venue: "Colorado Convention Center (nova)" },
  { city: "Dallas, TX", date: "18 a 22 de nov", venue: "Kay Bailey Hutchison Convention Center" },
  { city: "Anaheim, CA", date: "4 a 6 de dez", venue: "Anaheim Convention Center" },
  { city: "Nashville, TN", date: "10 a 13 de dez", venue: "Music City Center (nova)" },
  { city: "Vancouver, BC", date: "18 a 20 de dez", venue: "Vancouver Convention Centre" },
];

const FAQS = [
  {
    q: "Quando é a HYROX Anaheim 2026?",
    a: "De 4 a 6 de dezembro de 2026, no Anaheim Convention Center. É a HYROX mais perto de San Diego.",
  },
  {
    q: "Quais cidades da HYROX são novas no 2º semestre de 2026?",
    a: "Salt Lake City (setembro), Tampa (outubro), Denver (novembro) e Nashville (dezembro) recebem a sua primeira HYROX.",
  },
  {
    q: "Precisa se classificar pra HYROX?",
    a: "Não. As divisões Open, Doubles e Relay são de inscrição aberta. A classificação só importa pra elite e pro Campeonato Mundial.",
  },
  {
    q: "Quando os ingressos da HYROX Anaheim entram à venda?",
    a: "Ainda não foi anunciada uma data. Os ingressos da HYROX costumam sair de três a cinco meses antes do dia da prova, o que coloca Anaheim por volta do meio pro fim do ano. A inscrição é feita pela página oficial do evento no hyrox.com, e as provas esgotam rápido assim que abrem.",
  },
];

export default function HyroxFall2026PtBr() {
  return (
    <div lang="pt-BR">
      <SiteNav lang="pt" />

      <main className="post">
        {/* ── ARTICLE MASTHEAD (title above the cover) ── */}
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">The Dispatch &nbsp;/&nbsp; HYROX</div>
            <h1 className="article-headline">
              HYROX no 2º semestre de 2026: Anaheim está de volta e o calendário ficou <span>gigante</span>
            </h1>
          </div>
        </section>

        {/* ── COVER IMAGE ── */}
        <div className="article-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hyrox-hero.jpg"
            alt="Atleta erguendo um kettlebell acima da cabeça durante um treino no estilo HYROX"
          />
        </div>

        {/* ── BODY + STICKY RAIL ── */}
        <div className="post-shell">
          <div className="post-main">

        {/* ── ARTICLE HERO (deck + meta) ── */}
        <section className="article-hero">
          <div className="page">
            <p className="article-deck">
              O calendário da América do Norte para o segundo semestre de 2026 lista 10 provas, do Labor
              Day até dezembro. Quatro cidades ganham sua primeira prova, e Anaheim é a que você circula no
              calendário se está perto de San Diego.
            </p>
            <div className="article-meta">
              <span>Suor Society</span>
              <span>San Diego, CA</span>
              <span>Junho 2026</span>
            </div>
          </div>
        </section>

        {/* ── BODY ── */}
        <section className="article-body">
          <div className="page">
            <p>
              O calendário da HYROX para a América do Norte no segundo semestre de 2026 lista 10 provas, do
              fim de semana do Labor Day até dezembro. Quatro cidades vão receber sua primeira prova: Salt
              Lake City, Tampa, Denver e Nashville. E pra quem está lendo isso de San Diego, a que você
              circula no calendário é Anaheim, de 4 a 6 de dezembro, no Anaheim Convention Center. Noventa
              minutos pela I-5.
            </p>
            <p>
              Pra comparar, o segundo semestre de 2025 teve sete provas no total. Este ano são 10
              confirmadas, com Atlanta e Seattle nos rumores pra levar a 12. O sled push virou mainstream de
              vez.
            </p>

            <h2>O calendário completo do 2º semestre de 2026</h2>
            <ul>
              {SCHEDULE.map((r) => (
                <li key={r.city}>
                  <strong>{r.city}</strong> | {r.date} | {r.venue}
                </li>
              ))}
            </ul>
            <p>
              Um padrão que vale notar: os fins de semana estão ficando mais longos. DC, Toronto, Boston,
              Dallas, Anaheim e Nashville agora ocupam quatro ou cinco dias, o que significa lotes maiores no
              Open, Pro, Doubles e Relay. Tradução: mais vagas, mas elas ainda vão esgotar rápido.
            </p>

            <h2>Se você também levanta peso</h2>
            <p>
              Essa é a parte em que o calendário fica divertido. Contando de trás pra frente a partir de
              Anaheim, em 4 de dezembro, um bloco sólido de 10 a 12 semanas de HYROX começa em meados de
              setembro. Isso te dá os próximos meses pra construir base de corrida e seguir levantando
              pesado, e depois migrar pro trabalho específico de prova (sleds, wall balls, corrida em fadiga)
              depois do Labor Day. O cronograma é quase suspeitosamente perfeito.
            </p>
            <p>
              Primeira HYROX? A divisão Open é exatamente o que parece. Sem qualificação, qualquer nível de
              condicionamento, e a Doubles deixa você dividir o trabalho com um parceiro. É o jeito mais
              amigável pra iniciante de entrar no hybrid racing que existe hoje.
            </p>
            <p>
              Construindo rumo ao dia de prova e quer um lugar pra testar o motor antes? Nossas{" "}
              <a href="/pt-br/racepicks">escolhas de corridas de inscrição aberta</a> têm provas de rua em que
              você se inscreve hoje, sem sorteio, sem índice.
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
