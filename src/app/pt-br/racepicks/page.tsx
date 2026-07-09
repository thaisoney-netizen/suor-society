import RacePicksView from "@/components/RacePicksView";
import { dictionaries } from "@/i18n/dictionaries";
import { pageMeta } from "@/lib/seo";

const t = dictionaries.pt.racepicks;
export const metadata = pageMeta({
  path: "/pt-br/racepicks",
  title: t.metaTitle,
  description: t.metaDescription,
  image: "/sao-silvestre-hero.webp",
  paired: true,
  ogType: "website",
});

export default function RacePicksPtBr() {
  return <RacePicksView lang="pt" />;
}
