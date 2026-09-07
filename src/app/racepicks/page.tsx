import ToolsView, { type LiveOverlay } from "@/components/ToolsView";
import { pageMeta } from "@/lib/seo";
import races from "@/content/races-en.json";
import type { Race } from "@/components/RaceRow";
import { fetchLiveRaces } from "@/lib/race-live";

// Race Picks is the finder now, not a listing of one article.
//
// It used to be a single feature card pointing at the 2026 guide, which meant
// two clicks to reach the races and a page that could only ever get staler.
// The finder reads the same src/content/races-en.json the guide renders, so
// there is still one list to maintain, and it refreshes registration status
// hourly for the races that can supply it. The guide article stays where it
// is and is still linked from the finder.
//
// Not `paired`. AGENTS.md rule 1 allows hreflang only for a true translation
// at the same slug, and /pt-br/racepicks is still the old listing because the
// pt-BR build is paused. Pairing a tool with an article would tell search
// engines the two are equivalent when they are not. When pt-BR restarts, that
// route gets the finder too and `paired: true` comes back.
const META = {
  path: "/racepicks",
  title: "Race Picks, Open Entry Race Finder, Suor Society",
  description:
    "Every open entry race we track, filtered by state, month, distance and price, with a direct registration link and a second source on each one. No qualifier, no lottery.",
  image: "/race-hero.jpg",
};
export const metadata = pageMeta({ ...META, ogType: "website" });

// Rebuild hourly. The page is otherwise static, so the live lookups below run
// once an hour on the server rather than on every visit, and a reader never
// waits on RunSignup.
export const revalidate = 3600;

export default async function RacePicks() {
  const ca = races.ca as Race[];
  const us = races.us as Race[];

  // Only races carrying a hand-confirmed id. Everything else keeps its curated
  // data and its `checked` stamp. Never matched by name: see race-live.ts.
  const ids = [...ca, ...us]
    .map(r => r.runSignupId)
    .filter((n): n is number => typeof n === "number");
  const live = await fetchLiveRaces(ids);

  // Dates cross the server/client boundary as ISO strings.
  const overlay: LiveOverlay = {};
  for (const [id, l] of Object.entries(live)) {
    overlay[Number(id)] = {
      date: l.date ? l.date.toISOString() : null,
      open: l.open,
      signupUrl: l.signupUrl,
      sellsHere: l.sellsHere,
    };
  }

  return <ToolsView ca={ca} us={us} live={overlay} />;
}
