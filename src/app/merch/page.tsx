import SiteHeader from "@/components/SiteHeader";

export default function Merch() {
  return (
    <>
      <SiteHeader variant="light" />

      <main className="merch-stage">
        <div className="page merch-inner">
          <p className="merch-eye">Suor Society / Merch</p>
          <h1 className="merch-title">Drop<br />Coming<br />Soon</h1>
          <p className="merch-sub">
            First drop in the build. Stay close.
          </p>
          <a href="/" className="merch-back">
            ← Back to home
          </a>
        </div>
      </main>

      <footer className="footer">
        <div className="page foot-row">
          <span className="foot-wm">SUOR SOCIETY</span>
          <span className="foot-loc">San Diego</span>
        </div>
      </footer>
    </>
  );
}
