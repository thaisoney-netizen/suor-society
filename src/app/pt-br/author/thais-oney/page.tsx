import AuthorView from "@/components/AuthorView";
import { dictionaries } from "@/i18n/dictionaries";
import { pageMeta, PersonJsonLd } from "@/lib/seo";

const t = dictionaries.pt.author;
export const metadata = pageMeta({
  path: "/pt-br/author/thais-oney",
  title: t.metaTitle,
  description: t.metaDescription,
  image: "/thais-oney.jpg",
  paired: true,
  ogType: "website",
});

export default function AuthorThaisOneyPtBr() {
  return (
    <>
      <PersonJsonLd lang="pt" description={t.metaDescription} />
      <AuthorView lang="pt" />
    </>
  );
}
