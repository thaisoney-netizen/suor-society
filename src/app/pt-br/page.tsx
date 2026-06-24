import type { Metadata } from "next";
import HomeView from "@/components/HomeView";

export const metadata: Metadata = {
  title: "Suor Society, hybrid running culture page",
  description:
    "Cultura de corrida híbrida para quem corre e treina força no meio de tudo. Race picks, equipamentos e a cena.",
  alternates: {
    canonical: "/pt-br",
    languages: {
      en: "/",
      "pt-BR": "/pt-br",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Suor Society",
    url: "https://www.suorsociety.com/pt-br",
    title: "Suor Society, hybrid running culture page",
    description:
      "Cultura de corrida híbrida para quem corre e treina força no meio de tudo. Race picks, equipamentos e a cena.",
    locale: "pt_BR",
  },
};

export default function HomePtBr() {
  return (
    <div lang="pt-BR">
      <HomeView lang="pt" />
    </div>
  );
}
