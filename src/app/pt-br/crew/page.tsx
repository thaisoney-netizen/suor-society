import CrewView from "@/components/CrewView";
import { dictionaries } from "@/i18n/dictionaries";

const t = dictionaries.pt.crew;
export const metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: {
    canonical: "/pt-br/crew",
    languages: { en: "/crew", "pt-BR": "/pt-br/crew" },
  },
  openGraph: { locale: "pt_BR" },
};

export default function CrewPtBr() {
  return (
    <div lang="pt-BR">
      <CrewView lang="pt" />
    </div>
  );
}
