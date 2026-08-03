// Posts a content-freshness report to the Notion kanban board as a card, so
// the weekly sweep lands somewhere Thais actually looks instead of only filing
// a GitHub issue that can sit unread.
//
//   Run:  node scripts/content/notify-board.mjs [report.txt]
//   Env:  NOTION_TOKEN, NOTION_DATABASE_ID   (GitHub Secrets)
//         GITHUB_RUN_URL                     (optional, links back to the run)
//
// Dependency-free on purpose so the workflow needs no npm install. Exits 0 when
// the report is clean (nothing worth a card).
//
// Note: one card per run with findings. Cards accumulate if the work is not
// picked up, which is the intended nudge, not a bug.

import fs from "node:fs";

const NOTION_VERSION = "2022-06-28";
const MAX_BLOCK_CHARS = 1900; // Notion caps rich_text content at 2000

async function notion(token, path, method, body) {
  const res = await fetch(`https://api.notion.com/v1/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) {
    throw new Error(`Notion ${method} ${path} → HTTP ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

// Board databases vary in schema, but every database has exactly one `title`
// property — discover its name so the card headline lands on any board.
async function titlePropName(token, databaseId) {
  const db = await notion(token, `databases/${databaseId}`, "GET");
  const entry = Object.entries(db.properties).find(([, p]) => p.type === "title");
  if (!entry) throw new Error("database has no title property");
  return entry[0];
}

// "## 3 date(s) already in the past" → "3 stale dates"
// "## 9 upcoming race(s) due for a status re-check" → "9 races to re-check"
function summarize(report) {
  const parts = [];
  const staleM = report.match(/^## (\d+) date\(s\) already in the past/m);
  if (staleM) parts.push(`${staleM[1]} stale date${staleM[1] === "1" ? "" : "s"}`);
  const verifyM = report.match(/^## (\d+) upcoming race\(s\) due for a status re-check/m);
  if (verifyM) parts.push(`${verifyM[1]} race${verifyM[1] === "1" ? "" : "s"} to re-check`);
  return parts.length > 0 ? parts.join(", ") : "review needed";
}

function chunk(text, size) {
  const out = [];
  for (let i = 0; i < text.length; i += size) out.push(text.slice(i, i + size));
  return out;
}

// One paragraph per report line keeps the card readable; long lines are split
// so no single block exceeds Notion's limit.
function reportBlocks(report) {
  const paragraph = content => ({
    object: "block",
    type: "paragraph",
    paragraph: { rich_text: content ? [{ type: "text", text: { content } }] : [] },
  });
  const blocks = [];
  for (const line of report.split("\n")) {
    if (blocks.length >= 95) break; // Notion caps children per create call at 100
    if (line.trim() === "") { blocks.push(paragraph("")); continue; }
    for (const piece of chunk(line, MAX_BLOCK_CHARS)) blocks.push(paragraph(piece));
  }
  return blocks;
}

async function main() {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!token || !databaseId) {
    console.error("NOTION_TOKEN and NOTION_DATABASE_ID environment variables must be set.");
    process.exit(1);
  }

  const reportPath = process.argv[2] ?? "report.txt";
  const report = fs.readFileSync(reportPath, "utf8").trim();

  if (report === "" || report.startsWith("Content freshness: clean")) {
    console.log("Report is clean, no card posted.");
    return;
  }

  const runLabel = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    dateStyle: "medium",
  });
  const title = `Content freshness: ${summarize(report)} (${runLabel})`;

  const children = reportBlocks(report);
  if (process.env.GITHUB_RUN_URL) {
    children.push({
      object: "block",
      type: "bookmark",
      bookmark: { url: process.env.GITHUB_RUN_URL },
    });
  }

  const titleProp = await titlePropName(token, databaseId);
  await notion(token, "pages", "POST", {
    parent: { database_id: databaseId },
    properties: {
      [titleProp]: { title: [{ type: "text", text: { content: title.slice(0, 200) } }] },
    },
    children,
  });

  console.log(`Posted card: ${title}`);
}

main().catch(err => {
  console.error("Fatal:", err);
  process.exit(1);
});
