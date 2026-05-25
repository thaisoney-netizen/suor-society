export default function Merch() {
  return (
    <>
      <header className="site-nav">
        <div className="page nav-row">
          <a href="/" className="wm" aria-label="Suor Society — home">
            <span className="wm-suor wm-suor--dark">SUOR</span>
            <span className="wm-society wm-society--dark">SOCIETY</span>
          </a>
          <div className="nav-links">
            <a href="/merch" className="nav-link nav-link--dark">Shop</a>
            <a href="/#culture" className="nav-link nav-link--dark">The Culture</a>
          </div>
        </div>
      </header>

      <main className="merch-stage">
        <div className="page merch-inner">
          <p className="merch-eye">Suor Society / Merch</p>
          <h1 className="merch-title">Drop<br />Coming<br />Soon.</h1>
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
          <span className="foot-wm">SUOR SOCIETY.</span>
          <span className="foot-loc">San Diego</span>
        </div>
      </footer>
    </>
  );
}
