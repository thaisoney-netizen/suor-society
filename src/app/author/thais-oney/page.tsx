import AuthorView from "@/components/AuthorView";
import { dictionaries } from "@/i18n/dictionaries";
import { pageMeta, PersonJsonLd } from "@/lib/seo";

const t = dictionaries.en.author;
export const metadata = pageMeta({
  path: "/author/thais-oney",
  title: t.metaTitle,
  description: t.metaDescription,
  image: "/thais-oney.jpg",
  paired: true,
  ogType: "website",
});

export default function AuthorThaisOney() {
  return (
    <>
      <PersonJsonLd lang="en" description={t.metaDescription} />
      <AuthorView lang="en" />
    </>
  );
}
