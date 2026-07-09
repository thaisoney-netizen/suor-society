import HomeView from "@/components/HomeView";
import { pageMeta, WebSiteJsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/pt-br",
  title: "Suor Society, hybrid running culture page",
  description:
    "Cultura de corrida híbrida para quem corre e treina força no meio de tudo. Race picks, equipamentos e a cena.",
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
