import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Page not found",
};

// Catches every unmatched URL, English and pt-br alike, so the copy carries
// both languages.
export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main>
        <section className="about-pg-hero">
          <div className="page">
            <p className="about-pg-eye">404</p>
            <h1 className="about-pg-headline">This route doesn&rsquo;t exist</h1>
          </div>
        </section>
        <section className="about-pg-body">
          <div className="page">
            <div className="about-pg-col">
              <p className="about-pg-p">
                Wrong turn, no big deal. Regroup at the start line. The page you&rsquo;re
                after may have moved or never existed.
              </p>
              <p className="about-pg-p" lang="pt-BR">
                Essa página não existe ou mudou de lugar. Volta pro começo que a gente te
                espera na largada.
              </p>
              <p className="about-pg-p">
                <a className="hero-cta" href="/">
                  Back to the start ↗
                </a>{" "}
                <a className="hero-cta" href="/pt-br" lang="pt-BR">
                  Voltar em português ↗
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
