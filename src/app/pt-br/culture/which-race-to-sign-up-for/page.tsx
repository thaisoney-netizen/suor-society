import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ArticleCover from "@/components/ArticleCover";
import { PostToc, PostSubscribe } from "@/components/PostAside";
import AuthorCard from "@/components/AuthorCard";
import { pageMeta, ArticleJsonLd, FaqJsonLd } from "@/lib/seo";
import {
  pick,
  tableRows,
  checkedAsOf,
  openHalves,
  formatDate,
  weeksAway,
  city,
  statusText,
  distsText,
  priceText,
  type PickKey,
} from "@/lib/socal-race-picks";

// pt-BR twin of /culture/which-race-to-sign-up-for. Same races, same data,
// same rules: everything a reader could check against races-en.json is read
// from it through src/lib/socal-race-picks.ts. Kept a true translation (same
// SoCal races, not Brazilian ones) so hreflang pairing is honest; the
// Brazilian race calendar is its own regional page, /pt-br/culture/corridas-brasil-2026.
const META = {
  path: "/pt-br/culture/which-race-to-sign-up-for",
  // Title tag carries the searched words; the H1 keeps the question. See the
  // EN page for why.
  title: "Meias maratonas em San Diego 2026: novembro e dezembro",
  description:
    "Meias maratonas e provas mais curtas em San Diego e no sul da Califórnia ainda abertas para novembro e dezembro de 2026, com preços, semanas até a largada e onde o HYROX entra.",
  image: "/home-track-hero.webp",
};
export const metadata = pageMeta({ ...META, paired: true });

export const revalidate = 86400;

const PUBLISHED = "2026-09-28";
const PUBLISHED_LABEL = "28 de setembro de 2026";

const HYROX_URL = "https://hyrox.com/event/hyrox-anaheim-26-27/";
const HYROX_SD_URL = "https://hyrox.com/event/hyrox-san-diego-26-27/";
const HYROX_FORMAT_URL = "https://hyrox.com/the-fitness-race/";
const HYROX_LAST_DAY = new Date(2026, 11, 6);
const HYROX_SD_LAST_DAY = new Date(2027, 4, 16);
const HIGDON_URL =
  "https://www.halhigdon.com/training-programs/half-marathon-training/novice-1-half-marathon/";
const IG_URL = "https://www.instagram.com/suorsociety/";

const SHORT: Record<PickKey, string> = {
  runThrough: "a RunThrough Long Beach",
  silverStrand: "a Silver Strand",
  santaBarbara: "a Santa Barbara Half",
  thrive: "a Thrive San Diego",
  turkeyTrot: "a O'side Turkey Trot",
  holidayHalf: "a Holiday Half",
  carlsbad: "Carlsbad",
};

const TOC = [
  { id: "compare", label: "Quantas semanas faltam pra largada?" },
  { id: "distance", label: "Qual distância cabe no tempo que sobrou?" },
  { id: "drive", label: "Vale a pena dirigir pra correr uma prova?" },
  { id: "hyrox", label: "Ainda dá pra fazer um HYROX este ano?" },
  { id: "choose", label: "Qual prova cabe nas semanas que você tem?" },
  { id: "faq", label: "Perguntas frequentes" },
  { id: "sources", label: "Fontes" },
];

function list(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}`;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function readableDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function QualProvaFazer() {
  const rows = tableRows();
  const asOf = checkedAsOf(rows);
  const has = (k: PickKey) => rows.some(r => r.key === k && r.status !== "sold");
  const when = (k: PickKey) => formatDate(pick(k).start, "pt");
  const hyroxAhead = new Date() <= HYROX_LAST_DAY;
  const sdHyroxAhead = new Date() <= HYROX_SD_LAST_DAY;

  const saturdays = rows
    .filter(r => r.start.getDay() === 6 && r.status !== "sold")
    .map(r => SHORT[r.key]);

  const halves = openHalves(rows);
  const halvesAnswer = halves.length
    ? `Na última conferência da tabela${asOf ? ` (${readableDate(asOf)})` : ""}, as inscrições estavam abertas para ${list(
        halves.map(r => `${SHORT[r.key]} em ${formatDate(r.start, "pt")}`),
      )}. A tabela desta página se atualiza quando uma prova esgota ou acontece.`
    : "Nenhuma das meias do sul da Califórnia desta lista ainda tem inscrição aberta pra 2026. Carlsbad, em janeiro, é a próxima no mesmo litoral.";

  const FAQS = [
    {
      q: "Quais meias maratonas no sul da Califórnia ainda têm inscrição aberta em 2026?",
      a: halvesAnswer,
    },
    {
      q: "Quantas semanas de treino você precisa pra uma meia maratona?",
      a: "A maioria dos planos pra iniciantes leva umas 12 semanas e parte do princípio de que você já corre uns 5 km, três ou quatro vezes por semana. Se você continuou correndo desde uma prova no primeiro semestre, 5 ou 6 semanas podem bastar pra se acostumar de novo com a distância. Não sou treinadora, então use isso como ponto de partida, não como regra.",
    },
    {
      q: "HYROX é mais difícil que meia maratona?",
      a: "São difíceis de jeitos diferentes. O HYROX tem 8 km de corrida em pedaços de 1 km, com uma estação de exercício depois de cada um, então você volta a correr com a perna cansada de sled e afundo. A meia são 21,1 km de corrida contínua. Qual parece mais difícil costuma depender de onde está a sua lacuna: força ou distância.",
    },
    {
      q: "O HYROX Anaheim 2026 está esgotado?",
      a: "Sim, para atletas. Em 28 de setembro de 2026, todos os ingressos Open individuais e de Doubles na loja oficial do HYROX apareciam como indisponíveis, em todos os dias. A página do evento no hyrox.com tem uma lista de aviso caso liberem mais ingressos.",
    },
    {
      q: "Tem HYROX em San Diego?",
      a: "Tem. O HYROX San Diego acontece de 13 a 16 de maio de 2027 no San Diego Convention Center, o primeiro da cidade. Em 28 de setembro de 2026 os ingressos ainda não estavam à venda, e a página oficial diz que as vendas começam em breve.",
    },
  ];

  const SOURCES = [
    ...rows.map(r => ({ href: r.url, label: `${r.name}: site oficial` })),
    { href: HYROX_URL, label: "HYROX Anaheim: página do evento (esgotado)" },
    { href: HYROX_SD_URL, label: "HYROX San Diego: página do evento" },
    { href: HYROX_FORMAT_URL, label: "HYROX: formato, estações, Doubles e Relay" },
    { href: HIGDON_URL, label: "Hal Higdon: plano Novice 1 de meia maratona" },
  ];

  return (
    <>
      <ArticleJsonLd
        {...META}
        datePublished={PUBLISHED}
        citation={SOURCES.map(s => s.href)}
      />
      <FaqJsonLd faqs={FAQS} />
      <SiteNav />
      <main className="post dropset-post">
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">The Culture · Arquivo / Provas</div>
            <h1 className="article-headline">
              Qual prova do sul da Califórnia fazer{" "}
              <span>antes de 2026 acabar?</span>
            </h1>
            <p className="article-deck">
              {has("holidayHalf") && (
                <>
                  Se você já corre alguns dias por semana e quer fazer uma meia,
                  a San Diego Holiday Half em {when("holidayHalf")} é a que dá
                  mais tempo de preparo.{" "}
                </>
              )}
              {has("silverStrand") && has("thrive") ? (
                <>
                  Com menos tempo, a Silver Strand, em Coronado, no dia{" "}
                  {when("silverStrand")}, tem quatro distâncias, do 5K aos 21
                  km, e a Thrive San Diego vem logo depois, em {when("thrive")}.{" "}
                </>
              ) : has("thrive") ? (
                <>
                  Com menos tempo, a Thrive San Diego em {when("thrive")} tem 5K
                  e meia maratona.{" "}
                </>
              ) : null}
              {!has("holidayHalf") && (
                <>
                  A maioria das provas do sul da Califórnia deste ano já
                  aconteceu. Carlsbad, em janeiro, é a próxima no mesmo litoral.{" "}
                </>
              )}
              {sdHyroxAhead && (
                <>
                  Se você estava de olho no HYROX,{" "}
                  {hyroxAhead && "Anaheim (3 a 6 de dezembro) está esgotado, mas "}
                  San Diego recebe o primeiro HYROX da cidade de 13 a 16 de maio
                  de 2027.
                </>
              )}
            </p>
            <div className="article-meta">
              <span>
                Por <a href="/pt-br/author/thais-oney">Thais Oney</a>
              </span>
              <span>San Diego, CA</span>
              <span>
                Publicado em <time dateTime={PUBLISHED}>{PUBLISHED_LABEL}</time>
              </span>
            </div>
            <nav className="dropset-jumps" aria-label="Ir para uma seção">
              <a href="#compare">Comparar provas</a>
              <a href="#choose">Escolher pelas semanas</a>
              <a href="#hyrox">Corrida ou HYROX</a>
              <a href="#sources">Fontes</a>
            </nav>
          </div>
        </section>

        {/* ── COVER ── Stand-in until Thais sends her own photo for this post. */}
        <ArticleCover
          src="/home-track-hero.webp"
          alt="Duas pessoas agachadas na linha de largada de uma pista de atletismo vermelha, uma delas com boné de San Diego"
        />

        <div className="post-shell">
          <div className="post-main">
            <section className="article-body dropset-method">
              <div className="page">
                <h2>Como estou escolhendo</h2>
                <p>
                  Quero mais uma prova no calendário antes do ano acabar, e
                  ainda não escolhi qual. Corri minha primeira meia maratona em
                  maio, treino seis dias por semana entre corrida e musculação,
                  e uma parte de mim quer que essa seja meu primeiro HYROX em
                  vez de mais uma meia. Então estou fazendo a pesquisa em voz
                  alta, e você pode usar também.
                </p>
                <p>
                  Todas as provas aqui são no sul da Califórnia, com link pro
                  site oficial. Não sou treinadora, então as semanas são sobre
                  quanto calendário sobrou, não um plano de treino.
                </p>
              </div>
            </section>

            <section id="compare" className="article-body">
              <div className="page">
                <h2>Quantas semanas faltam pra largada?</h2>
                <p>
                  Esse número decide quase tudo. Aqui estão todas as provas que
                  estou considerando, da mais próxima pra mais distante.
                </p>
                <div
                  className="post-table-wrap"
                  role="region"
                  aria-label="Provas no sul da Califórnia até o fim de 2026"
                  tabIndex={0}
                >
                  <table className="post-table post-table--stack">
                    <caption>
                      Provas no sul da Califórnia até o fim de 2026.
                      {asOf && <> Status de inscrição conferido em {readableDate(asOf)}.</>}{" "}
                      Preços em dólar, com taxas quando a prova informa.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Prova</th>
                        <th scope="col">Largada</th>
                        <th scope="col">Distâncias</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map(r => (
                        <tr key={r.name}>
                          <th scope="row">
                            <a href={r.url} target="_blank" rel="noopener noreferrer">
                              {r.name}
                            </a>
                            <br />
                            <span className="race-pick-city">{city(r)}</span>
                          </th>
                          <td data-label="Largada">
                            {formatDate(r.start, "pt")}
                            <br />
                            <span className="race-pick-city">{weeksAway(r.weeks, "pt")}</span>
                          </td>
                          <td data-label="Distâncias">{distsText(r, "pt")}</td>
                          <td data-label="Preço">{priceText(r, "pt")}</td>
                          <td data-label="Status">{statusText(r, "pt")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p>
                  A maioria dessas provas sobe o preço em etapas conforme a data
                  chega, então a mesma inscrição custa mais em novembro do que
                  hoje. Se uma linha diz esgotada, ela está ali pra você não
                  perder uma manhã procurando um jeito de entrar.
                </p>
                <p>
                  Pra provas fora do sul da Califórnia ou o calendário do ano
                  que vem, a lista completa está no{" "}
                  <a href="/racepicks">Race Picks</a>{" "}(em inglês), com filtro
                  por mês, distância e preço.
                </p>
              </div>
            </section>

            <section id="distance" className="article-body">
              <div className="page">
                <h2>Qual distância cabe no tempo que sobrou?</h2>
                <p>
                  A maioria dos planos de meia maratona pra iniciantes dura umas
                  12 semanas e parte do princípio de que você já corre uns 5 km.
                  O{" "}
                  <a href={HIGDON_URL} target="_blank" rel="noopener noreferrer">
                    Novice 1 do Hal Higdon
                  </a>
                  , um dos mais usados, pede exatamente isso antes da primeira
                  semana: 3 milhas, uns 5 km, três ou quatro vezes por semana.
                </p>
                <p>
                  Então, se você está começando com duas corridas leves por
                  semana, a sua meia é a de dezembro. Se você continuou correndo
                  desde uma prova no primeiro semestre, 5 ou 6 semanas até uma
                  meia em novembro dá pra se acostumar de novo com a distância.
                  Pra construir do zero, é pouco tempo.
                </p>
                <p>
                  É aí que entram as provas mais curtas. Um 5K ou 10K cabe em
                  quase qualquer data da lista
                  {has("silverStrand") && (
                    <>
                      , e na Silver Strand dá pra escolher entre 5K, 12K, 10
                      milhas ou a meia inteira, tudo na mesma manhã
                    </>
                  )}
                  .
                </p>
              </div>
            </section>

            <section id="drive" className="article-body">
              <div className="page">
                <h2>Vale a pena dirigir pra correr uma prova?</h2>
                <p>
                  Ficar em San Diego significa dormir na própria cama e não
                  pegar a I-5 antes do sol nascer. Silver Strand, Thrive, a
                  Holiday Half e a Turkey Trot em Oceanside são todas por aqui.
                </p>
                <p>
                  Long Beach fica a umas duas horas subindo a I-5, o que
                  funciona bem pra uma manhã de sábado. Santa Barbara é a única viagem de verdade da lista,
                  perto de quatro horas, e vale se você já queria um fim de
                  semana fora.
                </p>
                {saturdays.length > 0 && (
                  <p>
                    {capitalize(list(saturdays))}{" "}
                    {saturdays.length === 1 ? "é uma prova de sábado" : "são provas de sábado"}
                    , então o domingo fica livre pra descansar.
                  </p>
                )}
              </div>
            </section>

            <section id="hyrox" className="article-body">
              <div className="page">
                <h2>Ainda dá pra fazer um HYROX este ano?</h2>
                <p>
                  Essa é a dúvida que mais me pega.{" "}
                  <a href={HYROX_FORMAT_URL} target="_blank" rel="noopener noreferrer">
                    Uma prova de HYROX
                  </a>{" "}
                  são oito corridas de 1 km com uma estação de exercício depois
                  de cada uma: SkiErg, sled push, sled pull, burpee broad jump,
                  remo, farmers carry, afundo com sandbag e wall ball. Todo mundo
                  faz as mesmas oito estações na mesma ordem, e é isso que
                  transforma o treino em prova.
                </p>
                <p>
                  Não no sul da Califórnia. O{" "}
                  <a href={HYROX_URL} target="_blank" rel="noopener noreferrer">
                    HYROX Anaheim
                  </a>{" "}
                  acontece de 3 a 6 de dezembro no Anaheim Convention Center, e
                  está esgotado. Em 28 de setembro de 2026, todos os ingressos
                  Open individuais e de Doubles na loja oficial do HYROX
                  apareciam como indisponíveis, em todos os dias. A página do
                  evento tem uma lista de aviso caso liberem mais ingressos.
                </p>
                <p>
                  A notícia boa está mais perto de casa. O{" "}
                  <a href={HYROX_SD_URL} target="_blank" rel="noopener noreferrer">
                    HYROX San Diego
                  </a>{" "}
                  acontece de 13 a 16 de maio de 2027 no San Diego Convention
                  Center, o primeiro HYROX da cidade. Em 28 de setembro de 2026
                  os ingressos ainda não estavam à venda, e a página do evento
                  diz que as vendas começam em breve. Se o plano era Anaheim,
                  coloque um lembrete pra esse.
                </p>
                <p>
                  Se você levanta mais peso do que corre, o HYROX joga a seu
                  favor, e a corrida vem em pedaços de 1 km. Se o que você quer
                  é a distância em si, a meia é o teste honesto. E se bate a
                  curiosidade junto com o nervoso, no Doubles você corre todos
                  os quilômetros junto com uma dupla e divide as estações como
                  quiser.
                </p>
                <p>
                  As outras datas nos EUA estão no{" "}
                  <a href="/dispatch/hyrox-fall-2026-schedule">
                    calendário do HYROX no segundo semestre
                  </a>{" "}
                  (em inglês), e se você está encaixando corrida no meio da
                  musculação, veja{" "}
                  <a href="/pt-br/culture/run-and-lift-same-week">
                    como correr e treinar força na mesma semana
                  </a>
                  .
                </p>
              </div>
            </section>

            <section id="choose" className="article-body">
              <div className="page">
                <h2>Qual prova cabe nas semanas que você tem?</h2>
                <p>
                  Escolha pela semana que você costuma ter, não pela que você
                  espera que novembro te dê.
                </p>

                {has("holidayHalf") && (
                  <>
                    <h3>Você já corre alguns dias por semana e quer uma meia</h3>
                    <p>
                      <strong>
                        Se inscreva na San Diego Holiday Half, em{" "}
                        {when("holidayHalf")}.
                      </strong>{" "}
                      É a última meia da lista, então é a que dá mais semanas, e
                      o percurso desce uns 217 metros da largada à chegada.
                    </p>
                  </>
                )}

                {(has("silverStrand") || has("thrive")) && (
                  <>
                    <h3>Você continuou correndo desde uma prova no primeiro semestre</h3>
                    <p>
                      <strong>
                        {has("silverStrand") && has("thrive")
                          ? `Silver Strand em ${when("silverStrand")} ou Thrive San Diego em ${when("thrive")}.`
                          : has("silverStrand")
                            ? `Silver Strand em ${when("silverStrand")}.`
                            : `Thrive San Diego em ${when("thrive")}.`}
                      </strong>{" "}
                      As duas são planas e na beira da água.
                      {has("silverStrand") &&
                        " A Silver Strand também tem 10 milhas e 12K, se a meia inteira parecer muito pra agora."}
                    </p>
                  </>
                )}

                {has("runThrough") && (
                  <>
                    <h3>Você quer uma prova ainda este mês</h3>
                    <p>
                      <strong>
                        RunThrough Long Beach em {when("runThrough")}, 5K ou 10K.
                      </strong>{" "}
                      É a prova mais próxima da lista com vaga, e nenhuma das
                      duas distâncias pede um ciclo longo.
                    </p>
                  </>
                )}

                {sdHyroxAhead && (
                  <>
                    <h3>Você levanta mais peso do que corre</h3>
                    <p>
                      <strong>HYROX San Diego, de 13 a 16 de maio de 2027.</strong>{" "}
                      Não é este ano, mas é aqui na cidade e você ganha vários
                      meses pra se preparar. Se for o seu primeiro, olhe o
                      Doubles, pra aprender as estações com alguém do lado.
                    </p>
                  </>
                )}

                {has("turkeyTrot") && (
                  <>
                    <h3>Você só quer uma prova pra fazer com os amigos</h3>
                    <p>
                      <strong>
                        A O&rsquo;side Turkey Trot, na manhã do Dia de Ação de
                        Graças.
                      </strong>{" "}
                      Um 5K antes do jantar, sem ciclo de treino, e o Double Dip
                      se alguém do grupo quiser a medalha extra.
                    </p>
                  </>
                )}

                {pick("carlsbad").status === "open" && (
                  <>
                    <h3>Nada antes de dezembro funciona pra você</h3>
                    <p>
                      <strong>Carlsbad em {when("carlsbad")}.</strong>{" "}Não é
                      este ano, mas é o mesmo litoral poucas semanas depois do
                      Ano Novo, e as inscrições já estão abertas.
                    </p>
                  </>
                )}

                <p>
                  Vou contar qual eu escolhi no{" "}
                  <a href={IG_URL} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                  .
                </p>
              </div>
            </section>

            <section id="faq" className="faq-section">
              <div className="page">
                <h2 className="faq-head">Perguntas frequentes</h2>
                {FAQS.map(f => (
                  <div key={f.q} className="faq-item">
                    <h3 className="faq-q">{f.q}</h3>
                    <p className="faq-a">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="sources" className="article-body">
              <div className="page">
                <h2>Fontes</h2>
                <p>
                  Datas, distâncias e preços vêm do site de cada prova ou da
                  página de inscrição. Os detalhes do HYROX vêm do hyrox.com e da loja oficial de ingressos.
                </p>
                <ul className="dropset-sources">
                  {SOURCES.map(s => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer">
                        {s.label}
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
                  Nenhuma prova pagou pra estar nesta lista, e não há links de
                  afiliado.
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
      <SiteFooter />
    </>
  );
}
