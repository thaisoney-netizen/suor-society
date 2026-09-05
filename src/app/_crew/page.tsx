import CrewView from "@/components/CrewView";
import { dictionaries } from "@/i18n/dictionaries";
import { pageMeta } from "@/lib/seo";

const t = dictionaries.en.crew;
export const metadata = pageMeta({
  path: "/crew",
  title: t.metaTitle,
  description: t.metaDescription,
  image: "/crew-suor.webp",
  paired: true,
  ogType: "website",
});

export default function Crew() {
  return <CrewView lang="en" />;
}
