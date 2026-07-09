import RacePicksView from "@/components/RacePicksView";
import { dictionaries } from "@/i18n/dictionaries";
import { pageMeta } from "@/lib/seo";

const t = dictionaries.en.racepicks;
export const metadata = pageMeta({
  path: "/racepicks",
  title: t.metaTitle,
  description: t.metaDescription,
  image: "/race-hero.jpg",
  paired: true,
  ogType: "website",
});

export default function RacePicks() {
  return <RacePicksView lang="en" />;
}
