import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// The sitemap is generated from the filesystem at build time: every route
// segment under src/app that contains a page.tsx is included automatically,
// so new posts never need a manual sitemap entry. True translations (same
// slug on / and /pt-br) get hreflang alternates automatically as well.

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

// Last content change of the route folder, from git history (falls back to
// the build date if git isn't available in the build environment).
function lastModified(routePath: string): Date {
  const dir = path.join(APP_DIR, routePath === "/" ? "" : routePath);
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${dir}"`, {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (iso) return new Date(iso);
  } catch {
    // fall through
  }
  return new Date();
}

function priorityFor(route: string): number {
  if (route === "/" || route === PT_PREFIX) return 1;
  // Posts live two levels deep (/culture/x, /dispatch/x and their pt-br twins).
  const depth = route.replace(PT_PREFIX, "").split("/").filter(Boolean).length;
  return depth >= 2 ? 0.8 : 0.6;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: string[] = [];
  collectRoutes(APP_DIR, "", routes);
  const set = new Set(routes);

  return routes.sort().map((route) => {
    const isPt = route === PT_PREFIX || route.startsWith(`${PT_PREFIX}/`);
    const twin = isPt
      ? route.slice(PT_PREFIX.length) || "/"
      : route === "/"
        ? PT_PREFIX
        : `${PT_PREFIX}${route}`;
    const paired = set.has(twin);
    const en = isPt ? twin : route;
    const pt = isPt ? route : twin;
    return {
      url: `${SITE_URL}${route === "/" ? "" : route}`,
      lastModified: lastModified(route),
      changeFrequency: route === "/" || route === PT_PREFIX ? "weekly" : "monthly",
      priority: priorityFor(route),
      ...(paired && {
        alternates: {
          languages: {
            en: `${SITE_URL}${en === "/" ? "" : en}`,
            "pt-BR": `${SITE_URL}${pt}`,
          },
        },
      }),
    };
  });
}
