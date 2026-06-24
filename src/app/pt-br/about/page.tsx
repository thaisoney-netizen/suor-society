import AboutView from "@/components/AboutView";
import { dictionaries } from "@/i18n/dictionaries";

const t = dictionaries.pt.about;
export const metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: {
    canonical: "/pt-br/about",
    languages: { en: "/about", "pt-BR": "/pt-br/about" },
  },
  openGraph: { locale: "pt_BR" },
};

export default function AboutPtBr() {
  return (
    <div lang="pt-BR">
      <AboutView lang="pt" />
    </div>
  );
}
