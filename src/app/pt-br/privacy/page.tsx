import PrivacyView from "@/components/PrivacyView";
import { dictionaries } from "@/i18n/dictionaries";
import { pageMeta } from "@/lib/seo";

const t = dictionaries.pt.privacy;
export const metadata = pageMeta({
  path: "/pt-br/privacy",
  title: t.metaTitle,
  description: t.metaDescription,
  paired: true,
  ogType: "website",
});

export default function PrivacyPtBr() {
  return <PrivacyView lang="pt" />;
}
