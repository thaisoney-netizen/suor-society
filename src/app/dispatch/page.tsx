import DispatchView from "@/components/DispatchView";
import { dictionaries } from "@/i18n/dictionaries";
import { pageMeta } from "@/lib/seo";

const t = dictionaries.en.dispatch;
export const metadata = pageMeta({
  path: "/dispatch",
  title: t.metaTitle,
  description: t.metaDescription,
  paired: true,
  ogType: "website",
});

export default function Dispatch() {
  return <DispatchView lang="en" />;
}
