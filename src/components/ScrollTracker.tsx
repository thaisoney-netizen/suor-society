"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollTracker() {
  const [distance, setDistance] = useState(0);
  const [useKm, setUseKm] = useState(true);
  const [flash, setFlash] = useState(false);
  const [progress, setProgress] = useState(0);
  const lastY = useRef(0);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    lastY.current =
      window.scrollY ??
      window.pageYOffset ??
      document.documentElement.scrollTop ??
      0;

    function onScroll() {
      const y =
        window.scrollY ??
        window.pageYOffset ??
        document.documentElement.scrollTop ??
        0;
      const delta = Math.abs(y - lastY.current);
      if (delta > 0) {
        lastY.current = y;
        setDistance((prev) => prev + delta);
        setFlash(true);
        if (flashTimer.current) clearTimeout(flashTimer.current);
        flashTimer.current = setTimeout(() => setFlash(false), 140);
        const docH =
          document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docH > 0 ? (y / docH) * 100 : 0);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const PX_PER_KM = 50000;
  const dist = useKm
    ? distance / PX_PER_KM
    : (distance / PX_PER_KM) * 0.621371;

  function fmt(v: number) {
    return v < 10 ? v.toFixed(3) : v < 100 ? v.toFixed(2) : v.toFixed(1);
  }

  return (
    <>
      <style>{`
        :root { --sunrise: #E8642A; }
        #ss-progress { position:fixed; top:0; left:0; height:2px; background:var(--sunrise); z-index:200; pointer-events:none; transition:width .08s linear; }
        #ss-tracker { position:fixed; bottom:0; left:0; right:0; height:60px; background:#141414; border-top:1px solid rgba(255,255,255,.1); display:flex; align-items:center; justify-content:space-between; padding:0 32px; z-index:100; }
        @media(max-width:720px){ #ss-tracker{padding:0 20px;height:54px;} }
        .ss-label-col { display:flex; flex-direction:column; gap:3px; }
        .ss-lbl { font-family:var(--font-barlow,'Barlow Condensed',sans-serif); font-weight:600; font-size:10px; letter-spacing:.18em; text-transform:uppercase; color:rgba(255,255,255,.45); }
        .ss-dist-wrap { display:flex; align-items:baseline; gap:8px; background:rgba(255,255,255,.06); border:1px solid rgba(232,100,42,.35); border-radius:6px; padding:8px 16px; }
        .ss-num { font-family:var(--font-jetbrains,'JetBrains Mono',ui-monospace,monospace); font-size:22px; font-weight:600; letter-spacing:.04em; color:#fff; min-width:72px; text-align:right; transition:color .12s; }
        .ss-num.ss-flash { color:var(--sunrise); }
        .ss-unit { font-family:var(--font-barlow,'Barlow Condensed',sans-serif); font-weight:700; font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:rgba(255,255,255,.45); }
        .ss-toggle { font-family:var(--font-barlow,'Barlow Condensed',sans-serif); font-weight:600; font-size:10px; letter-spacing:.14em; text-transform:uppercase; color:rgba(255,255,255,.35); background:none; border:1px solid rgba(255,255,255,.15); border-radius:4px; padding:4px 8px; cursor:pointer; margin-left:8px; transition:color .15s,border-color .15s; }
        .ss-toggle:hover { color:var(--sunrise); border-color:var(--sunrise); }
      `}</style>
      <div id="ss-progress" style={{ width: `${progress}%` }} />
      <div id="ss-tracker">
        <div className="ss-label-col">
          <span className="ss-lbl">You have scrolled</span>
          <span
            className="ss-lbl"
            style={{ color: "rgba(255,255,255,.22)", fontSize: 9, letterSpacing: ".12em" }}
          >
            Suor Society
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="ss-dist-wrap">
            <span className={`ss-num${flash ? " ss-flash" : ""}`}>
              {fmt(dist)}
            </span>
            <span className="ss-unit">{useKm ? "KM" : "MI"}</span>
          </div>
          <button className="ss-toggle" onClick={() => setUseKm((k) => !k)}>
            {useKm ? "MI" : "KM"}
          </button>
        </div>
      </div>
    </>
  );
}
