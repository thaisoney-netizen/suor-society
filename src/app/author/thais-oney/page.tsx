import AuthorView from "@/components/AuthorView";
import { dictionaries } from "@/i18n/dictionaries";

const t = dictionaries.en.author;
export const metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: {
    canonical: "/author/thais-oney",
    languages: { en: "/author/thais-oney", "pt-BR": "/pt-br/author/thais-oney" },
  },
};

export default function AuthorThaisOney() {
  return <AuthorView lang="en" />;
}
