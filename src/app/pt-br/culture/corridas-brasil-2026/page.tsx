import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import DownloadGate from "@/components/DownloadGate";
import { PostToc } from "@/components/PostAside";

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

export const metadata = {
  title: "Corridas Brasil 2026, Suor Society",
  description:
    "As corridas de rua que valem a inscrição no Brasil em 2026. São Silvestre, maratonas de SP e Rio, HYROX e mais. Datas, distâncias e links diretos.",
  alternates: {
    canonical: "/pt-br/culture/corridas-brasil-2026",
  },
  openGraph: { locale: "pt_BR" },
};

type Race = {
  num: string;
  name: string;
  where: string;
  body: string;
  dists: string;
  status: "open" | "limit" | "sold";
  statusLabel: string;
  url: string;
};

const GRANDES: Race[] = [
  {
    num: "01",
    name: "Corrida de São Silvestre",
    where: "São Paulo, SP · 31 de dezembro de 2026",
    body: "A mais tradicional da América Latina, na 101ª edição. Largada na Avenida Paulista, chegada na Rua da Consolação, na virada do ano, com elite mundial e milhares de amadores no mesmo asfalto. Se você corre uma prova no Brasil na vida, é essa.",
    dists: "15K",
    status: "limit",
    statusLabel: "Inscrições em breve",
    url: "https://www.saosilvestre.com.br/",
  },
  {
    num: "02",
    name: "Maratona Internacional de São Paulo",
    where: "São Paulo, SP · Abril (âncora anual)",
    body: "A mais antiga e a maior do país. A edição de 2026 foi a 30ª, com largada e chegada no Parque do Ibirapuera e selo de qualidade da World Athletics. Percurso clássico pelas avenidas paulistanas. A maratona para quem quer a experiência grande, com estrutura de sobra.",
    dists: "42K · 21K · 10K · 7K",
    status: "limit",
    statusLabel: "Próxima edição (abril)",
    url: "https://www.yescom.com.br/",
  },
  {
    num: "03",
    name: "Maratona do Rio",
    where: "Rio de Janeiro, RJ · Junho (âncora anual)",
    body: "Para 2026 voltou ao traçado clássico, largada na Praia da Reserva, chegada no Aterro do Flamengo. Percurso plano, poucas curvas, um dos mais rápidos da América do Sul. Se a meta é PR de maratona com vista de mar, essa é a aposta.",
    dists: "42K · 21K · 10K · 5K",
    status: "limit",
    statusLabel: "Próxima edição (junho)",
    url: "https://www.maratonadorio.com.br/",
  },
  {
    num: "04",
    name: "Meia Maratona de São Paulo",
    where: "São Paulo, SP · Julho de 2026",
    body: "Percurso inédito anunciado para 2026. Meia de inverno paulistano, clima mais fresco, boa janela para quem está construindo para uma maratona no segundo semestre.",
    dists: "21K · 10K · 5K",
    status: "open",
    statusLabel: "Inscrições abertas",
    url: "https://www.meiamaratonasaopaulo.com.br/",
  },
  {
    num: "05",
    name: "Maratona Fila São Paulo",
    where: "São Paulo, SP · 23 de agosto de 2026",
    body: "Formato solo, dupla e quarteto, com largada e chegada na USP. A opção de revezamento muda o jogo: dá pra trazer uma crew de níveis diferentes e todo mundo corre a mesma prova. Agosto em SP costuma entregar clima ameno.",
    dists: "42K (solo, dupla ou quarteto)",
    status: "open",
    statusLabel: "Inscrições abertas",
    url: "https://www.fila.com.br/maratona",
  },
  {
    num: "06",
    name: "Maratona e Meia de Belo Horizonte",
    where: "Belo Horizonte, MG · 28 de junho de 2026",
    body: "Maratona de capital com cara própria. Terreno de BH pede preparo para ladeira, não é a mais plana, e é exatamente por isso que vale. Quem treina subida aqui chega forte em qualquer lugar.",
    dists: "42K · 21K · 10K · 5K",
    status: "open",
    statusLabel: "Inscrições abertas",
    url: "https://www.maratonaemeiadebh.com.br/",
  },
];

const PELO_BRASIL: Race[] = [
  {
    num: "07",
    name: "Maratona de Fortaleza",
    where: "Fortaleza, CE · Abril (âncora anual)",
    body: "Prova litorânea no Nordeste. Percurso plano e rápido, do tipo que favorece PR. A contrapartida é o calor: hidratação e ritmo controlado não são opcionais aqui.",
    dists: "42K · 21K · 10K · 5K",
    status: "limit",
    statusLabel: "Próxima edição (abril)",
    url: "https://www.ticketsports.com.br/",
  },
  {
    num: "08",
    name: "Maratona de Brasília",
    where: "Brasília, DF · Abril (âncora anual)",
    body: "Asfalto largo, percurso aberto, a maratona da capital. Altitude de Brasília (cerca de 1.100m) é um detalhe que pega quem vem do nível do mar de surpresa. Planeje o ritmo pensando nisso.",
    dists: "42K · 21K · 10K · 5K · 3K",
    status: "limit",
    statusLabel: "Próxima edição (abril)",
    url: "https://brasilcorrida.com.br/",
  },
  {
    num: "09",
    name: "Maratona de João Pessoa",
    where: "João Pessoa, PB · Abril (âncora anual)",
    body: "Litoral paraibano, ponto mais a leste das Américas. Prova mais tranquila que as gigantes do Sudeste, ótima pra quem quer maratona sem o caos de campo de 30 mil pessoas.",
    dists: "42K · 21K · 10K · 5K",
    status: "limit",
    statusLabel: "Próxima edição (abril)",
    url: "https://www.maratonadejoaopessoa.com.br/",
  },
  {
    num: "10",
    name: "Maratona de Manaus",
    where: "Manaus, AM · Abril (âncora anual)",
    body: "Correr maratona no coração da Amazônia, com largada e chegada na Arena da Amazônia, é uma experiência específica. Umidade alta o ano todo, então não é prova de PR, é prova de história. Vale pela viagem tanto quanto pela corrida.",
    dists: "42K · 21K · 10K · 5K",
    status: "limit",
    statusLabel: "Próxima edição (abril)",
    url: "https://maratonademanaus.com.br/",
  },
  {
    num: "11",
    name: "Corrida da Independência",
    where: "São Paulo, SP · 7 de setembro de 2026",
    body: "Clássico de feriado em São Paulo, o Troféu Independência do Brasil, nas imediações do Parque da Independência, no Ipiranga. Data fixa, 7 de setembro, prova de rua para abrir o segundo semestre. Boa pra quebrar a rotina de treino com um número no peito.",
    dists: "3K · 5K · 10K",
    status: "open",
    statusLabel: "Inscrições abertas",
    url: "https://www.trofeuindependenciabrasil.com.br/",
  },
  {
    num: "12",
    name: "Desafio da Ponte, Rio-Niterói",
    where: "Rio de Janeiro / Niterói, RJ · 2 de agosto de 2026",
    body: "A única chance no ano de correr a Ponte Rio-Niterói fechada, com vista da Baía de Guanabara que você não tem de outro jeito. Em 2026 a prova virou 21K e passou a exigir índice (meia em até 2h30/2h35), então é a exceção da lista: não é mais pra estreante. 8 mil vagas que somem rápido.",
    dists: "21K",
    status: "limit",
    statusLabel: "Inscrições abertas · exige índice",
    url: "https://www.desafiodaponteoficial.com.br/",
  },
];

const CIRCUITOS: Race[] = [
  {
    num: "13",
    name: "Track & Field Run Series",
    where: "Nacional · Etapas o ano todo",
    body: "Um dos maiores circuitos de rua da América Latina. Etapas em shoppings, parques, pontes e orlas pelo país inteiro, com inscrição pelo app tfsports. Bom ponto de entrada pra quem está começando e quer distância curta com estrutura.",
    dists: "4K · 5K · 10K · 15K",
    status: "open",
    statusLabel: "Etapas o ano todo",
    url: "https://www.tfsports.com.br/",
  },
  {
    num: "14",
    name: "Circuito das Estações",
    where: "Nacional · Etapas o ano todo",
    body: "Quatro etapas por ano, uma por estação, em várias capitais (SP, Rio, BH, Curitiba, Salvador, Recife, Brasília). Percursos planos, formato amigável. Dá pra fazer as quatro e acompanhar a própria evolução ao longo do ano.",
    dists: "5K · 10K · 13K",
    status: "open",
    statusLabel: "Etapas o ano todo",
    url: "https://www.circuitodasestacoes.com.br/",
  },
];

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

function RaceRow({ race }: { race: Race }) {
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
        <a
          className="race-link"
          href={race.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Inscreva-se →
        </a>
      </div>
    </div>
  );
}

export default function CorridasBrasil2026() {
  return (
    <div lang="pt-BR">
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
        <div className="article-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/race-hero.jpg"
            alt="Milhares de corredores na linha de largada de uma grande corrida de rua"
          />
        </div>

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
              <span>Suor Society</span>
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
              {GRANDES.map((r) => <RaceRow key={r.num} race={r} />)}
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
              {PELO_BRASIL.map((r) => <RaceRow key={r.num} race={r} />)}
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
              {CIRCUITOS.map((r) => <RaceRow key={r.num} race={r} />)}
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
              estiver por San Diego, a <a href="/pt-br/crew">crew</a> corre junto.
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
              <li>Status e links diretos atualizados em junho de 2026</li>
            </ul>
            <DownloadGate lang="pt" />
          </div>
        </section>

          </div>{/* /.post-main */}

          <aside className="post-aside post-aside--toc">
            <PostToc items={TOC} title="Nesta página" />
          </aside>
        </div>{/* /.post-shell */}

      </main>

      <SiteFooter lang="pt" />
    </div>
  );
}
