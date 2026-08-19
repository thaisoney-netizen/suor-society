import PrivacyView from "@/components/PrivacyView";
import { dictionaries } from "@/i18n/dictionaries";
import { pageMeta } from "@/lib/seo";

const t = dictionaries.en.privacy;
export const metadata = pageMeta({
  path: "/privacy",
  title: t.metaTitle,
  description: t.metaDescription,
  paired: true,
  ogType: "website",
});

export default function Privacy() {
  return <PrivacyView lang="en" />;
}
