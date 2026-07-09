import SetHtmlLang from "@/components/SetHtmlLang";

// Every page under /pt-br is Portuguese: the wrapper marks the content
// language for assistive tech and crawlers, and SetHtmlLang syncs the <html>
// lang attribute on the client. New pt-br pages need nothing page-side.
export default function PtBrLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="pt-BR">
      <SetHtmlLang lang="pt-BR" />
      {children}
    </div>
  );
}
