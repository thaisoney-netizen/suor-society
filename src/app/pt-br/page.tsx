import HomeView from "@/components/HomeView";
import { pageMeta, WebSiteJsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/pt-br",
  title: "Suor Society, cultura de corrida híbrida pra quem não vive de treinar",
  description:
    "Cultura de corrida híbrida pra quem corre e treina força mas não vive de treinar. Race picks, equipamentos que valem a pena e treino que cabe na sua semana.",
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
