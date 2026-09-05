// Generates the Suor Society race guide PDFs (English + pt-BR) from the same
// JSON data the site pages render, so the page and the downloadable guide can
// never drift apart.
//
//   Data:    src/content/races-en.json  →  public/2026-race-guide.pdf
//            src/content/races-br.json  →  public/guia-corridas-brasil-2026.pdf
//   Run:     node scripts/generate-race-guide-pdf.js
//
// Edit the JSON (or the copy blocks below), re-run, commit both PDFs.

const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const racesEn = require("../src/content/races-en.json");
const racesBr = require("../src/content/races-br.json");

const UPDATED_EN = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
const UPDATED_PT = new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

// The same local fonts used by the site are embedded as data URIs so PDF
// rendering needs no network access and looks the same everywhere.
const FONT_FACES = [
  ["Bebas Neue", 400, "bebas-neue-400.woff2"],
  ["Barlow Condensed", 600, "barlow-condensed-600.woff2"],
  ["Barlow Condensed", 700, "barlow-condensed-700.woff2"],
  ["Inter", 400, "inter-400.woff2"],
  ["Inter", 500, "inter-500.woff2"],
  ["Inter", 600, "inter-600.woff2"],
  ["Inter", 700, "inter-700.woff2"],
  ["JetBrains Mono", 400, "jetbrains-mono-400.woff2"],
  ["JetBrains Mono", 600, "jetbrains-mono-600.woff2"],
]
  .map(([family, weight, file]) => {
    const data = fs.readFileSync(path.join(__dirname, "..", "src", "app", "fonts", file)).toString("base64");
    return `@font-face { font-family: '${family}'; font-style: normal; font-weight: ${weight}; src: url(data:font/woff2;base64,${data}) format('woff2'); }`;
  })
  .join("\n");

// The wordmark is the same artwork the site nav renders, embedded as a data URI
// so the PDF render needs no network access and can never drift from the site.
const WORDMARK_SRC =
  "data:image/svg+xml;base64," +
  fs
    .readFileSync(path.join(__dirname, "..", "public", "logos", "wordmark-horizontal.svg"))
    .toString("base64");

// ─── SHARED RENDERING ─────────────────────────────────────────────────────────
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function statusDot(status) {
  if (status === "open") return "#0A0A0A";
  if (status === "limit") return "#E8750A";
  if (status === "past") return "#C8C8C8";
  return "#A8A8A8";
}

// Mirrors the web guide's treatment of a race whose date has passed: struck
// name and date, no registration link. A downloaded PDF outlives the page it
// came from, so a retired race that still shows a live-looking signup URL is
// worse here than on the site.
function raceRow(r) {
  const isPast = r.status === "past";
  return `
    <div class="race${isPast ? " race--past" : ""}">
      <div class="race-num">${escapeHtml(r.num)}</div>
      <div class="race-body">
        <div class="race-name">${escapeHtml(r.name)}</div>
        <div class="race-where">${escapeHtml(r.where)}</div>
        <p class="race-desc">${escapeHtml(r.body)}</p>
        <div class="race-dists">${escapeHtml(r.dists)}</div>
        <div class="race-status"><span class="dot" style="background:${statusDot(r.status)}"></span>${escapeHtml(r.statusLabel)}</div>
      </div>
      <div class="race-meta">
        ${isPast ? "" : `
        ${r.price ? `<div class="race-price">${escapeHtml(r.price)}</div>` : ""}
        <div class="race-link">${escapeHtml(r.url.replace(/^https?:\/\//, "").replace(/\/$/, ""))}</div>`}
      </div>
    </div>`;
}

function section(num, title, sub, races) {
  return `
<section>
  <div class="section-head">
    <div class="section-num">${num}</div>
    <h2 class="section-title">${title}</h2>
    <div class="section-sub">${sub}</div>
  </div>
  <div class="race-list">
    ${races.map(raceRow).join("\n")}
  </div>
</section>`;
}

const STYLE = `
  :root {
    --paper: #FFFFFF;
    --ink: #0A0A0A;
    --ink-soft: #1C1C1C;
    --muted: #707070;
    --rule: rgba(10,10,10,0.12);
    --accent: #E8750A;
    --tint: #F4F2EE;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    background: var(--paper);
    color: var(--ink);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 10.5pt;
    line-height: 1.5;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  @page { size: Letter; margin: 0.5in 0.55in; }

  /* ── COVER ── */
  .cover {
    page-break-after: always;
    min-height: 9.5in;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.2in 0;
  }
  .cover-top { display: flex; justify-content: space-between; align-items: center; }
  .wm { display: block; height: 15pt; width: auto; }
  .cover-meta { font-family: 'JetBrains Mono', monospace; font-size: 8.5pt; color: var(--muted); letter-spacing: 0.05em; text-transform: uppercase; }
  .cover-mid { flex: 1; display: flex; flex-direction: column; justify-content: center; }
  .cover-eye { font-family: 'JetBrains Mono', monospace; font-size: 9pt; color: var(--accent); letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 0.4in; }
  .cover-title { font-family: 'Bebas Neue', sans-serif; font-size: 72pt; line-height: 0.92; letter-spacing: 0; text-transform: uppercase; }
  .cover-title em { font-style: normal; color: var(--accent); }
  .cover-deck { margin-top: 0.4in; font-size: 13pt; line-height: 1.45; color: var(--ink-soft); max-width: 5.5in; font-weight: 400; }
  .cover-bottom { display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px solid var(--ink); padding-top: 14pt; }
  .cover-credits { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 11pt; letter-spacing: 0.05em; text-transform: uppercase; }
  .cover-credits span { margin-right: 14pt; }
  .cover-count { font-family: 'Bebas Neue', sans-serif; font-size: 24pt; }

  /* ── INTRO + SECTION HEADS ── */
  .intro { padding: 0.2in 0 0.4in; border-bottom: 1px solid var(--ink); page-break-after: always; min-height: 9.4in; display: flex; flex-direction: column; }
  .intro h2 { font-family: 'Bebas Neue', sans-serif; font-size: 36pt; line-height: 0.95; margin-bottom: 0.3in; }
  .intro p { font-size: 11.5pt; line-height: 1.55; margin-bottom: 14pt; color: var(--ink-soft); max-width: 6in; }
  .intro p strong { color: var(--ink); font-weight: 600; }
  .intro .rules { margin-top: auto; padding-top: 0.3in; }
  .intro .rule-item { display: flex; gap: 14pt; padding: 10pt 0; border-top: 1px solid var(--rule); }
  .intro .rule-item:last-child { border-bottom: 1px solid var(--rule); }
  .intro .rule-num { font-family: 'JetBrains Mono', monospace; font-size: 9pt; color: var(--muted); min-width: 22pt; }
  .intro .rule-text { font-size: 10.5pt; color: var(--ink-soft); }

  .section-head {
    page-break-before: always;
    padding-top: 0.1in;
    margin-bottom: 0.25in;
  }
  .section-num { font-family: 'JetBrains Mono', monospace; font-size: 9pt; color: var(--accent); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 8pt; }
  .section-title { font-family: 'Bebas Neue', sans-serif; font-size: 42pt; line-height: 0.95; }
  .section-sub { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 11pt; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); margin-top: 6pt; padding-top: 10pt; border-top: 1px solid var(--ink); }

  /* ── RACE CARDS ── */
  .race-list { display: flex; flex-direction: column; }
  .race {
    display: grid;
    grid-template-columns: 28pt 1fr 1.2in;
    gap: 14pt;
    padding: 14pt 0;
    border-top: 1px solid var(--rule);
    page-break-inside: avoid;
  }
  .race:last-child { border-bottom: 1px solid var(--rule); }
  /* Race already run: struck name and date, dimmed, no link (see raceRow). */
  .race--past { opacity: 0.6; }
  .race--past .race-name, .race--past .race-where { text-decoration: line-through; }
  .race-num { font-family: 'JetBrains Mono', monospace; font-size: 11pt; color: var(--accent); font-weight: 600; padding-top: 2pt; }
  .race-name { font-family: 'Bebas Neue', sans-serif; font-size: 18pt; line-height: 1.02; letter-spacing: 0.005em; }
  .race-where { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 10pt; letter-spacing: 0.05em; text-transform: uppercase; color: var(--muted); margin-top: 3pt; }
  .race-desc { font-size: 9.5pt; line-height: 1.5; color: var(--ink-soft); margin-top: 6pt; max-width: 4.5in; }
  .race-dists { font-family: 'JetBrains Mono', monospace; font-size: 8.5pt; color: var(--ink); margin-top: 6pt; }
  .race-status { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 9pt; letter-spacing: 0.05em; text-transform: uppercase; color: var(--ink); margin-top: 5pt; display: flex; align-items: center; gap: 6pt; }
  .race-status .dot { width: 7pt; height: 7pt; border-radius: 50%; display: inline-block; }
  .race-meta { text-align: right; padding-top: 2pt; }
  .race-price { font-family: 'JetBrains Mono', monospace; font-size: 10pt; font-weight: 600; color: var(--ink); margin-bottom: 4pt; }
  .race-link { font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; color: var(--muted); word-break: break-all; line-height: 1.4; }

  /* ── FOOTER ── */
  .footer-band {
    page-break-before: always;
    margin-top: 0.4in;
    padding: 0.2in 0;
    border-top: 1px solid var(--ink);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .footer-line { font-family: 'Bebas Neue', sans-serif; font-size: 32pt; line-height: 1; }
  .footer-meta { font-family: 'JetBrains Mono', monospace; font-size: 8.5pt; color: var(--muted); letter-spacing: 0.05em; text-transform: uppercase; text-align: right; line-height: 1.7; }
  .footer-meta a { color: var(--ink); text-decoration: none; }
`;

function shell(lang, title, body) {
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<title>${escapeHtml(title)}</title>
<style>${FONT_FACES}</style>
<style>${STYLE}</style>
</head>
<body>
${body}
</body>
</html>`;
}

// ─── ENGLISH GUIDE ────────────────────────────────────────────────────────────
function htmlEn() {
  const total = racesEn.ca.length + racesEn.us.length;
  return shell("en", "Suor Society 2026 Race Guide", `
<!-- COVER -->
<section class="cover">
  <div class="cover-top">
    <img class="wm" src="${WORDMARK_SRC}" alt="Suor Society">
    <div class="cover-meta">The Culture Archive · ${UPDATED_EN}</div>
  </div>
  <div class="cover-mid">
    <div class="cover-eye">2026 Race Guide</div>
    <h1 class="cover-title">${total} Open<br/>Entry Races,<br/><em>No Qualifier</em></h1>
    <p class="cover-deck">
      ${racesEn.ca.length} in California, ${racesEn.us.length} across the US, all USATF certified. From summer 2026 through spring 2027, a window for whatever you're building toward. For the runner who lifts and the lifter who runs.
    </p>
  </div>
  <div class="cover-bottom">
    <div class="cover-credits">
      <span>Suor Society</span><span>SAN DIEGO, CA</span><span>SUORSOCIETY.COM</span>
    </div>
    <div class="cover-count">${total} / ${total}</div>
  </div>
</section>

<!-- INTRO -->
<section class="intro">
  <h2>The rules<br/>of this list</h2>
  <p>It's race season. If you've been waiting for the right moment to sign up for something, this is it. ${total} open entry road races: ${racesEn.ca.length} in California, ${racesEn.us.length} across the US. All USATF certified. All open to everyone, no matter how fast or slow you run.</p>
  <p>The rule for everything in this guide: <strong>no qualifying time, no lottery.</strong> You register, you train, you show up. Races run from now through spring 2027, so there's a window for whatever you're building toward.</p>
  <p>Prices go up as race day gets closer. A handful of these are sold out at standard entry, and the way in varies: some hold a waitlist, some run charity spots, some have neither. Each entry says which. Click through and verify before you register. Race capacity and pricing move fast.</p>
  <div class="rules">
    <div class="rule-item"><div class="rule-num">01</div><div class="rule-text"><strong>Open entry:</strong> no qualifying time required. Pay the fee and you're in.</div></div>
    <div class="rule-item"><div class="rule-num">02</div><div class="rule-text"><strong>USATF certified:</strong> course distance is officially measured. PRs count.</div></div>
    <div class="rule-item"><div class="rule-num">03</div><div class="rule-text"><strong>Status flagged:</strong> Open, Limited, or Sold Out, accurate as of ${UPDATED_EN}.</div></div>
    <div class="rule-item"><div class="rule-num">04</div><div class="rule-text"><strong>Verify before you register:</strong> capacity and pricing can shift between updates.</div></div>
  </div>
</section>

${section("01 / California", `${racesEn.ca.length} California<br/>Races`, "Open Entry · Summer 2026 to Spring 2027", racesEn.ca)}

${section("02 / United States", `${racesEn.us.length} US Certified<br/>Races`, "No Qualifier · All USATF Certified", racesEn.us)}

<!-- FOOTER -->
<section class="footer-band">
  <div class="footer-line">Run. Lift.<br/>Sweat.</div>
  <div class="footer-meta">
    Suor Society<br/>
    <a href="https://suorsociety.com">SUORSOCIETY.COM</a><br/>
    <a href="https://instagram.com/suorsociety">@SUORSOCIETY</a><br/>
    UPDATED ${UPDATED_EN.toUpperCase()}
  </div>
</section>`);
}

// ─── PT-BR GUIDE ──────────────────────────────────────────────────────────────
function htmlBr() {
  const total = racesBr.grandes.length + racesBr.peloBrasil.length + racesBr.circuitos.length;
  return shell("pt-BR", "Suor Society — Guia de Corridas Brasil 2026", `
<!-- COVER -->
<section class="cover">
  <div class="cover-top">
    <img class="wm" src="${WORDMARK_SRC}" alt="Suor Society">
    <div class="cover-meta">The Culture Archive · ${UPDATED_PT}</div>
  </div>
  <div class="cover-mid">
    <div class="cover-eye">Guia de Corridas Brasil 2026</div>
    <h1 class="cover-title">Corridas que<br/>Valem a<br/><em>Inscrição</em></h1>
    <p class="cover-deck">
      São Silvestre, maratonas de SP e Rio, provas que valem a viagem e circuitos o ano todo. Datas, distâncias e links diretos de inscrição, pra quem corre e levanta peso no meio de tudo.
    </p>
  </div>
  <div class="cover-bottom">
    <div class="cover-credits">
      <span>Suor Society</span><span>SAN DIEGO, CA</span><span>SUORSOCIETY.COM</span>
    </div>
    <div class="cover-count">${total} provas</div>
  </div>
</section>

<!-- INTRO -->
<section class="intro">
  <h2>As regras<br/>desta lista</h2>
  <p>O calendário brasileiro é gigante. São centenas de provas por ano, em todo estado, e listar todas não ajuda ninguém. Então isto não é um calendário completo. É uma seleção: as âncoras que se repetem todo ano e as provas que valem a viagem, com a leitura de quem corre e levanta peso em volta de tudo o resto.</p>
  <p>A regra de quase tudo aqui: <strong>inscrição aberta, sem índice, sem sorteio.</strong> Você se inscreve, treina e aparece. A exceção está sinalizada na própria prova.</p>
  <p>Datas, lotes e vagas mudam rápido no Brasil. As inscrições abrem por lote, com preço subindo até o dia da prova, e as grandes esgotam. Clique e confirme no site oficial antes de se inscrever.</p>
  <div class="rules">
    <div class="rule-item"><div class="rule-num">01</div><div class="rule-text"><strong>Inscrição aberta:</strong> sem tempo de qualificação. Pagou, está dentro.</div></div>
    <div class="rule-item"><div class="rule-num">02</div><div class="rule-text"><strong>Âncoras anuais:</strong> provas sem data confirmada aparecem com o mês de sempre.</div></div>
    <div class="rule-item"><div class="rule-num">03</div><div class="rule-text"><strong>Status sinalizado:</strong> Abertas, Em breve ou Esgotadas, conferido em ${UPDATED_PT}.</div></div>
    <div class="rule-item"><div class="rule-num">04</div><div class="rule-text"><strong>Confirme antes de se inscrever:</strong> lote e capacidade mudam entre atualizações.</div></div>
  </div>
</section>

${section("01 / As grandes do ano", "As Grandes<br/>do Ano", "Âncoras anuais · As que você marca no calendário primeiro", racesBr.grandes)}

${section("02 / Pelo Brasil", "Provas que<br/>Valem a Viagem", "De norte a sul", racesBr.peloBrasil)}

${section("03 / Circuitos", "Circuitos o<br/>Ano Todo", "Várias etapas, uma inscrição de cada vez", racesBr.circuitos)}

<!-- FOOTER -->
<section class="footer-band">
  <div class="footer-line">Run. Lift.<br/>Sweat.</div>
  <div class="footer-meta">
    Suor Society<br/>
    <a href="https://suorsociety.com/pt-br">SUORSOCIETY.COM/PT-BR</a><br/>
    <a href="https://instagram.com/suorsociety">@SUORSOCIETY</a><br/>
    ATUALIZADO EM ${UPDATED_PT.toUpperCase()}
  </div>
</section>`);
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function render(browser, html, outFile) {
  // ignoreHTTPSErrors keeps Google Fonts loading behind TLS-intercepting
  // proxies (managed cloud environments); it changes nothing elsewhere.
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: outFile,
    format: "Letter",
    printBackground: true,
    margin: { top: "0.5in", right: "0.55in", bottom: "0.5in", left: "0.55in" },
  });
  await context.close();
  const stat = fs.statSync(outFile);
  console.log(`Wrote ${outFile} (${(stat.size / 1024).toFixed(0)} KB)`);
}

(async () => {
  const outDir = path.join(__dirname, "..", "public");
  fs.mkdirSync(outDir, { recursive: true });

  console.log("Launching headless Chromium…");
  // Route through the outbound proxy when the environment defines one
  // (Chromium doesn't read HTTPS_PROXY on its own).
  const proxyServer = process.env.HTTPS_PROXY || process.env.https_proxy;
  const launchOpts = proxyServer ? { proxy: { server: proxyServer } } : {};
  let browser;
  try {
    browser = await chromium.launch(launchOpts);
  } catch (err) {
    // Managed environments ship a system Chromium instead of the
    // playwright-managed download; fall back to it.
    const fallback = process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium";
    if (!fs.existsSync(fallback)) throw err;
    console.log(`Default launch failed, using ${fallback}`);
    browser = await chromium.launch({ ...launchOpts, executablePath: fallback });
  }
  await render(browser, htmlEn(), path.join(outDir, "2026-race-guide.pdf"));
  await render(browser, htmlBr(), path.join(outDir, "guia-corridas-brasil-2026.pdf"));
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
