import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { PostSubscribe } from "@/components/PostAside";

// ⚑ pt-BR native review needed — conteúdo aguardando revisão de falante nativa
// Race #03 tem flag explícita para Thais confirmar se é a meia correta.

export const metadata = {
  title: "Provas de rua no Brasil 2026, Suor Society",
  description:
    "São Silvestre, Maratona do Rio, Maratona de SP, Maratona Fila e mais. Datas, distâncias e status real das principais corridas de rua no Brasil em 2026.",
  alternates: {
    canonical: "/pt-br/culture/corridas-brasil-2026",
  },
  openGraph: { locale: "pt_BR" },
};

type RaceStatus = "open" | "soon" | "annual";

const RACES: {
  num: string;
  name: string;
  where: string;
  body: string;
  dists: string;
  price: string;
  status: RaceStatus;
  statusLabel: string;
  url: string;
  regUrl?: string;
}[] = [
  {
    num: "01",
    name: "Corrida Internacional de São Silvestre",
    where: "São Paulo, SP · 31/12/2026 · 101ª edição",
    body: "A corrida de rua mais tradicional do Brasil, desde 1925. 15K pelo centro histórico de São Paulo no último dia do ano. Plataforma oficial de inscrição: Ticket Sports. As inscrições da 101ª edição abrem no 2º semestre de 2026.",
    dists: "15K",
    price: "Ver no site",
    status: "soon",
    statusLabel: "Inscrições em breve (2º semestre)",
    url: "https://www.saosilvestre.com.br",
  },
  {
    num: "02",
    name: "Maratona Internacional de São Paulo",
    where: "São Paulo, SP · Abril · 30ª edição · 12/04/2026",
    body: "Âncora anual de abril, organizada pela Yescom. Percurso urbano de SP com várias distâncias. O sábado tem a Corrida das Nações (5K). Edição 2026 já realizada. Inscrições de 2027 abrem em meados de 2026.",
    dists: "7K · 10K · 21K · 42K + Corrida das Nações 5K (sáb)",
    price: "Ver no site",
    status: "annual",
    statusLabel: "Âncora anual · inscrições 2027 em meados de 2026",
    url: "https://www.yescom.com.br/maratonasp",
  },
  {
    num: "03",
    // ⚑ Thais: confirma se era essa meia mesmo, ou outra prova.
    name: "Meia Maratona da Cidade de São Paulo",
    where: "São Paulo, SP · Abril · 26ª edição · ~26/04/2026",
    body: "Meia maratona urbana de abril em São Paulo, na 26ª edição. Edição 2026 já realizada. Âncora anual do primeiro semestre. [Thais: confirma se era essa meia mesmo, ou outra prova.]",
    dists: "21K",
    price: "Ver no site",
    status: "annual",
    statusLabel: "Âncora anual · 2026 realizada",
    url: "https://www.meiamaratonasaopaulo.com.br",
  },
  {
    num: "04",
    name: "Maratona do Rio",
    where: "Rio de Janeiro, RJ · Junho · 24ª edição · 4 a 7/06/2026",
    body: "Âncora anual de junho no feriado de Corpus Christi. Recreio até o Flamengo, percurso com selo Ouro da World Athletics. Edição 2026 já realizada. Inscrições de 2027 abrem em meados de 2026 — e agora por sorteio.",
    dists: "5K · 10K · 21K · 42K",
    price: "Ver no site",
    status: "annual",
    statusLabel: "Âncora anual · 2027 por sorteio",
    url: "https://maratonadorio.com.br",
  },
  {
    num: "05",
    name: "Maratona Fila",
    where: "São Paulo, SP · 23/08/2026 · 5ª edição · CEPEUSP/USP",
    body: "A única maratona brasileira com formato de revezamento: 42K solo, dupla (2 × 21K) ou quarteto (4 × 10,5K). Você corre em crew ou híbrido. Largada e chegada no CEPEUSP, dentro do campus da USP. Inscrições abertas agora via Ticket Sports.",
    dists: "42K solo · Dupla 2 × 21K · Quarteto 4 × 10,5K",
    price: "Ver no site",
    status: "open",
    statusLabel: "Inscrições abertas",
    url: "https://www.fila.com.br/maratona",
    regUrl: "https://www.ticketsports.com.br/e/maratona-fila-2026-74591",
  },
];

function RaceCard({ race }: { race: (typeof RACES)[0] }) {
  const href = race.regUrl ?? race.url;
  const linkLabel =
    race.status === "open"
      ? "Inscreva-se →"
      : race.status === "soon"
        ? "Acesse o site →"
        : "Ver edições →";
  return (
    <div className="race-row">
      <span className="race-num">{race.num}</span>
      <div className="race-info">
        <div className="race-name">{race.name}</div>
        <div className="race-where">{race.where}</div>
        <p className="race-body">{race.body}</p>
        <div className="race-dists">{race.dists}</div>
        <div className={`race-status ${race.status}`}>{race.statusLabel}</div>
      </div>
      <div className="race-action">
        <span className="race-price">{race.price}</span>
        <a
          className="race-link"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkLabel}
        </a>
      </div>
    </div>
  );
}

export default function CorridasBrasil2026() {
  return (
    <div lang="pt-BR">
      <SiteNav lang="pt" />

      <main className="post">

        {/* ── ARTICLE MASTHEAD ── */}
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">The Culture Archive &nbsp;/&nbsp; Junho 2026</div>
            <h1 className="article-headline">
              As principais provas de rua do <span>Brasil</span> em 2026
            </h1>
          </div>
        </section>

        {/* ── COVER IMAGE ── */}
        <div className="article-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/road-run.jpg"
            alt="Corredores em prova de rua urbana"
          />
        </div>

        {/* ── BODY + STICKY RAIL ── */}
        <div className="post-shell">
          <div className="post-main">

            {/* ── ARTICLE HERO ── */}
            <section className="article-hero">
              <div className="page">
                <p className="article-deck">
                  São Silvestre, Maratona do Rio, Maratona de SP, Maratona Fila.
                  Cinco provas que estruturam o calendário nacional — com datas,
                  distâncias e o status real de cada inscrição.
                </p>
                <div className="article-meta">
                  <span>Suor Society</span>
                  <span>San Diego, CA</span>
                  <span>Junho 2026</span>
                </div>
              </div>
            </section>

            {/* ── INTRO + GEO BANNER ── */}
            <section className="article-body">
              <div className="page">

                {/* geo banner: cross-link to US races guide */}
                <div className="geo-notice">
                  <strong>Guia do Brasil.</strong>{" "}
                  Para provas de inscrição aberta nos EUA e na Califórnia, veja o nosso{" "}
                  <a href="/pt-br/culture/open-entry-races-2026">
                    guia de corridas de inscrição aberta
                  </a>
                  .
                </div>

                <p>
                  O calendário de corridas de rua no Brasil tem uma lógica própria: datas
                  que se repetem todo ano, plataformas que abrem e fecham num piscar de
                  olhos, e provas que vendem em horas. Este guia cobre as cinco corridas
                  que estruturam o ano pra quem corre no país — com o status real de cada
                  uma em junho de 2026.
                </p>
                <p>
                  Regra usada aqui: toda prova que já aconteceu em 2026 é tratada como
                  âncora anual. Sem link pra checkout fechado. A janela de inscrição
                  apontada é pra 2027. Só a Maratona Fila e a São Silvestre carregam
                  energia de inscrição aberta agora.
                </p>

              </div>
            </section>

            {/* ── RACE CARDS ── */}
            <section style={{ borderBottom: "1px solid var(--line)", paddingBottom: "56px" }}>
              <div className="page">
                <div className="article-section-head">
                  <div className="article-section-label">5 provas · calendário 2026/2027</div>
                  <div className="article-section-sub">
                    São Paulo · Rio de Janeiro · inscrição aberta, em breve ou âncora anual
                  </div>
                </div>
                <div className="race-list">
                  {RACES.map((r) => (
                    <RaceCard key={r.num} race={r} />
                  ))}
                </div>
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
