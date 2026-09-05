import CrewView from "@/components/CrewView";
import { dictionaries } from "@/i18n/dictionaries";
import { pageMeta } from "@/lib/seo";

const t = dictionaries.pt.crew;
export const metadata = pageMeta({
  path: "/pt-br/crew",
  title: t.metaTitle,
  description: t.metaDescription,
  image: "/crew-suor.webp",
  paired: true,
  ogType: "website",
});

export default function CrewPtBr() {
  return <CrewView lang="pt" />;
}
