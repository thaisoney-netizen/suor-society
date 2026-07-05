import AuthorView from "@/components/AuthorView";
import { dictionaries } from "@/i18n/dictionaries";

const t = dictionaries.pt.author;
export const metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: {
    canonical: "/pt-br/author/thais-oney",
    languages: { en: "/author/thais-oney", "pt-BR": "/pt-br/author/thais-oney" },
  },
  openGraph: { locale: "pt_BR" },
};

export default function AuthorThaisOneyPtBr() {
  return (
    <div lang="pt-BR">
      <AuthorView lang="pt" />
    </div>
  );
}
