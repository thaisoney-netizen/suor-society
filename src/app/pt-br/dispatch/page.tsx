import DispatchView from "@/components/DispatchView";
import { dictionaries } from "@/i18n/dictionaries";

const t = dictionaries.pt.dispatch;
export const metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: {
    canonical: "/pt-br/dispatch",
    languages: { en: "/dispatch", "pt-BR": "/pt-br/dispatch" },
  },
  openGraph: { locale: "pt_BR" },
};

export default function DispatchPtBr() {
  return (
    <div lang="pt-BR">
      <DispatchView lang="pt" />
    </div>
  );
}
