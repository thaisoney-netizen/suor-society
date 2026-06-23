import RacePicksView from "@/components/RacePicksView";
import { dictionaries } from "@/i18n/dictionaries";

const t = dictionaries.pt.racepicks;
export const metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: {
    canonical: "/pt-br/racepicks",
    languages: { en: "/racepicks", "pt-BR": "/pt-br/racepicks" },
  },
  openGraph: { locale: "pt_BR" },
};

export default function RacePicksPtBr() {
  return (
    <div lang="pt-BR">
      <RacePicksView lang="pt" />
    </div>
  );
}
