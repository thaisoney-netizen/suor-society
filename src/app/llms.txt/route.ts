import fs from "node:fs";
import path from "node:path";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { dictionaries, AUTHOR_PATH, type Lang } from "@/i18n/dictionaries";

// /llms.txt — the plain-text map assistants read when they land on the site
// (ChatGPT, Claude, Perplexity, Google AI). Same idea as the sitemap: built by
// scanning src/app at build time, so a new post shows up here with no manual
// step. Titles and descriptions are lifted from each page's own metadata, so
// this file can never drift from what the pages actually say.

export const dynamic = "force-static";

const APP_DIR = path.join(process.cwd(), "src", "app");
const PT_PREFIX = "/pt-br";

function collectRoutes(dir: string, urlPath: string, routes: string[]) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  if (entries.some((e) => e.isFile() && /^page\.(tsx|ts|jsx|js|mdx)$/.test(e.name))) {
    routes.push(urlPath === "" ? "/" : urlPath);
  }
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    if (e.name === "api" || e.name.startsWith("_") || e.name.startsWith("(")) continue;
    collectRoutes(path.join(dir, e.name), `${urlPath}/${e.name}`, routes);
  }
}

// Pull one metadata value out of a page's metadata block. Posts declare a
// `const META = {…}` with inline strings; index pages read theirs off the
// shared dictionaries (`const t = dictionaries.en.about` then `title: t.metaTitle`),
// so both spellings are resolved here.
function readKey(block: string, src: string, key: string): string | null {
  const literal = block.match(new RegExp(`\\b${key}\\s*:\\s*("(?:[^"\\\\]|\\\\.)*")`));
  if (literal) {
    try {
      return JSON.parse(literal[1]) as string;
    } catch {
      return literal[1].slice(1, -1);
    }
  }

  const ref = block.match(new RegExp(`\\b${key}\\s*:\\s*t\\.(\\w+)`));
  const dict = src.match(/const t\s*=\s*dictionaries\.(\w+)\.(\w+)\s*;/);
  if (!ref || !dict) return null;
  const section = (dictionaries[dict[1] as Lang] as Record<string, unknown> | undefined)?.[dict[2]];
  const value = (section as Record<string, unknown> | undefined)?.[ref[1]];
  return typeof value === "string" ? value : null;
}

function metaFor(route: string): { title: string; description: string } | null {
  const file = ["page.tsx", "page.ts", "page.jsx", "page.js", "page.mdx"]
    .map((n) => path.join(APP_DIR, route === "/" ? "" : route, n))
    .find((p) => fs.existsSync(p));
  if (!file) return null;

  const src = fs.readFileSync(file, "utf8");
  const start = src.search(/const META\s*=\s*\{|pageMeta\(\{/);
  if (start === -1) return null;
  const block = src.slice(start, start + 1200);

  const title = readKey(block, src, "title");
  const description = readKey(block, src, "description");
  if (!title || !description) return null;
  // Meta titles carry the ", Suor Society" suffix; the map reads better without it.
  return { title: title.replace(/,\s*Suor Society$/, ""), description };
}

function section(heading: string, routes: string[]): string {
  const lines = routes
    .map((route) => {
      const meta = metaFor(route);
      if (!meta) return null;
      return `- [${meta.title}](${SITE_URL}${route}): ${meta.description}`;
    })
    .filter(Boolean);
  return lines.length ? `## ${heading}\n\n${lines.join("\n")}\n` : "";
}

export function GET() {
  const routes: string[] = [];
  collectRoutes(APP_DIR, "", routes);
  routes.sort();

  const en = routes.filter((r) => r !== "/" && !r.startsWith(PT_PREFIX));
  const pt = routes.filter((r) => r !== PT_PREFIX && r.startsWith(PT_PREFIX));
  const under = (list: string[], prefix: string) => list.filter((r) => r.startsWith(`${prefix}/`));
  // Anything that isn't a Culture or Dispatch post: the guides, crew, about
  // and author pages, plus each section's own index.
  const isPost = (r: string) => r.startsWith("/culture/") || r.startsWith("/dispatch/");

  const intro = [
    `# ${SITE_NAME}`,
    "",
    "> Hybrid running culture for people who run and lift but don't train for a living.",
    "",
    "Independent, written and edited by Thais Oney. Race picks, gear that earns its",
    "place, and training that fits the week you have rather than an athlete's week.",
    "",
    "Suor is Portuguese for sweat. The site publishes in English and Brazilian",
    "Portuguese; pt-BR versions live under /pt-br at the same slug.",
    "",
  ].join("\n");

  const sections = [
    section("Culture", under(en, "/culture")),
    section("Dispatch", under(en, "/dispatch")),
    section("Guides and pages", en.filter((r) => !isPost(r))),
    section("Português (Brasil)", pt),
    ["## Contact", "", "- Instagram: https://instagram.com/suorsociety", `- Author bio: ${SITE_URL}${AUTHOR_PATH}`, ""].join("\n"),
  ].filter(Boolean);

  const body = `${intro}\n${sections.join("\n")}`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
