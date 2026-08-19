// Posts a content-freshness report to the Notion kanban board as a card, so
// the weekly sweep lands somewhere Thais actually looks instead of only filing
// a GitHub issue that can sit unread.
//
//   Run:  node scripts/content/notify-board.mjs [report.txt]
//         node scripts/content/notify-board.mjs --check   (preflight only)
//   Env:  NOTION_TOKEN, NOTION_DATABASE_ID   (GitHub Secrets)
//         GITHUB_RUN_URL                     (optional, links back to the run)
//
// --check proves the board connection works without posting anything. The
// workflow runs it on EVERY sweep, including clean ones, because both Notion
// secrets were wrong for the first three weeks this script existed and nothing
// ever said so: the only step that touched Notion ran last and only on runs
// that had findings. A credential you never exercise is a credential you do
// not have.
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
    // Notion echoes the database ID back inside the error body, and workflow
    // logs on a public repo are public. Keep the machine-readable code, drop
    // the prose; `diagnose` turns the status into something actionable.
    let code = "";
    try {
      code = (await res.json()).code ?? "";
    } catch {
      /* non-JSON error body: the status alone has to carry it */
    }
    const err = new Error(
      `Notion ${method} /${path.split("/")[0]} → HTTP ${res.status}${code ? ` (${code})` : ""}`
    );
    err.status = res.status;
    err.code = code;
    throw err;
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

// Each of these has actually happened to this repo, so the text names the fix
// rather than the symptom. Never quote the secret values back.
function diagnose(status, code) {
  // A Notion error always carries a `code`. Without one, the body was not a
  // Notion error at all, so something between the runner and api.notion.com
  // answered instead (egress proxy, WAF, outage). Calling that a credential
  // problem sends you off rotating perfectly good secrets.
  if (!code) {
    return (
      `No Notion error code came back, so this HTTP ${status} likely did not originate at Notion. ` +
      "Check network egress to api.notion.com before touching either secret."
    );
  }
  if (status === 401) {
    return (
      "NOTION_TOKEN is not a valid Notion secret. Refresh it at notion.so/my-integrations " +
      "(open the integration, Configuration tab, Internal Integration Secret) and update the " +
      "repo secret. It starts with `ntn_`. A database ID pasted into this field fails exactly " +
      "this way."
    );
  }
  if (status === 404) {
    return (
      "NOTION_DATABASE_ID does not name a database this integration can see. It must be the " +
      "board's 32-character ID, hex only, with no title words from the URL slug. Also confirm " +
      "the board is shared with the integration: open it in Notion, ... menu, Connections."
    );
  }
  if (status === 403) {
    return "The integration lacks a capability it needs on this board: read content and insert content.";
  }
  if (status === 429) {
    return "Rate limited by Notion. Transient, and the next sweep should clear it.";
  }
  return `Unexpected HTTP ${status} from the Notion API.`;
}

async function main() {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;
  const args = process.argv.slice(2);
  const checkOnly = args.includes("--check");
  const reportPath = args.find(a => !a.startsWith("--")) ?? "report.txt";

  if (!token || !databaseId) {
    console.error(
      `Missing ${!token ? "NOTION_TOKEN" : ""}${!token && !databaseId ? " and " : ""}` +
      `${!databaseId ? "NOTION_DATABASE_ID" : ""}. Both are repo secrets under ` +
      "Settings, Secrets and variables, Actions."
    );
    process.exit(1);
  }

  // Preflight. Reaching the database proves the token authenticates, the ID
  // resolves, and the integration is actually connected to the board.
  if (checkOnly) {
    const titleProp = await titlePropName(token, databaseId);
    console.log(`Notion board connection OK. Cards will title on the "${titleProp}" property.`);
    return;
  }

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
  console.error(err.message);
  if (err.status) console.error(diagnose(err.status, err.code));
  process.exit(1);
});
