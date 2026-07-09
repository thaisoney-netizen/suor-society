import HomeView from "@/components/HomeView";
import { WebSiteJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <WebSiteJsonLd />
      <HomeView lang="en" />
    </>
  );
}
