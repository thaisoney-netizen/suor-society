import AboutView from "@/components/AboutView";
import { dictionaries } from "@/i18n/dictionaries";
import { pageMeta } from "@/lib/seo";

const t = dictionaries.en.about;
export const metadata = pageMeta({
  path: "/about",
  title: t.metaTitle,
  description: t.metaDescription,
  paired: true,
  ogType: "website",
});

export default function About() {
  return <AboutView lang="en" />;
}
