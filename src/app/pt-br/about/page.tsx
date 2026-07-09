import AboutView from "@/components/AboutView";
import { dictionaries } from "@/i18n/dictionaries";
import { pageMeta } from "@/lib/seo";

const t = dictionaries.pt.about;
export const metadata = pageMeta({
  path: "/pt-br/about",
  title: t.metaTitle,
  description: t.metaDescription,
  paired: true,
  ogType: "website",
});

export default function AboutPtBr() {
  return <AboutView lang="pt" />;
}
