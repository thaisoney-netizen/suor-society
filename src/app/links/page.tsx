import LinksView from "@/components/LinksView";
import { pageMeta } from "@/lib/seo";

// Link-in-bio hub. noindex (it's a utility redirect surface, not content) and
// excluded from the sitemap in src/app/sitemap.ts.
export const metadata = {
  ...pageMeta({
    path: "/links",
    title: "Links, Suor Society",
    description:
      "Everything Suor Society in one place — the weekly Dispatch, latest stories, the free race guide, and the crew.",
    ogType: "website",
  }),
  robots: { index: false, follow: true },
};

export default function Links() {
  return <LinksView />;
}
