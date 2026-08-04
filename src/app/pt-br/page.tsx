import HomeView from "@/components/HomeView";
import { pageMeta, WebSiteJsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/pt-br",
  title: "Suor Society, cultura de corrida híbrida pra quem trabalha",
  description:
    "Cultura de corrida híbrida pra quem corre e treina força mesmo trabalhando o dia inteiro. Race picks, equipamentos que valem a pena e treino que cabe numa semana real.",
  paired: true,
  ogType: "website",
});

export default function HomePtBr() {
  return (
    <>
      <WebSiteJsonLd />
      <HomeView lang="pt" />
    </>
  );
}
