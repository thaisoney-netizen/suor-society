import DispatchView from "@/components/DispatchView";
import { dictionaries } from "@/i18n/dictionaries";
import { pageMeta } from "@/lib/seo";

const t = dictionaries.pt.dispatch;
export const metadata = pageMeta({
  path: "/pt-br/dispatch",
  title: t.metaTitle,
  description: t.metaDescription,
  paired: true,
  ogType: "website",
});

export default function DispatchPtBr() {
  return <DispatchView lang="pt" />;
}
