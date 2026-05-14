"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const PX_PER_KM = 10000;

export default function ScrollTracker() {
  const [totalScrollPx, setTotalScrollPx] = useState(0);
  const [unit, setUnit] = useState<"km" | "mi">("km");
  const [flash, setFlash] = useState(false);
  const [progress, setProgress] = useState(0);

  const lastScrollY = useRef(0);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;

    // Cumulative distance
    const delta = Math.abs(currentY - lastScrollY.current);
    lastScrollY.current = currentY;
    if (delta > 0) {
      setTotalScrollPx((prev) => prev + delta);
      setFlash(true);
      if (flashTimer.current) clearTimeout(flashTimer.current);
      flashTimer.current = setTimeout(() => setFlash(false), 350);
    }

    // Page progress
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(docHeight > 0 ? (currentY / docHeight) * 100 : 0);
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (flashTimer.current) clearTimeout(flashTimer.current);
    };
  }, [handleScroll]);

  const km = totalScrollPx / PX_PER_KM;
  const value = unit === "km" ? km : km * 0.621371;
  const displayValue = value < 10 ? value.toFixed(3) : value.toFixed(2);

  return (
    <>
      {/* Orange progress bar — top of viewport */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      {/* Bottom tracker bar */}
      <div className="scroll-tracker" role="status" aria-live="polite" aria-atomic="true">
        <span className="scroll-tracker-label">You have scrolled</span>

        <span className="scroll-tracker-distance">
          <span className={`scroll-tracker-value${flash ? " flash" : ""}`}>
            {displayValue}
          </span>
          <span className="scroll-tracker-unit-label">{unit}</span>
        </span>

        <button
          className="scroll-tracker-toggle"
          onClick={() => setUnit((u) => (u === "km" ? "mi" : "km"))}
          aria-label={`Switch to ${unit === "km" ? "miles" : "kilometers"}`}
        >
          {unit === "km" ? "→ MI" : "→ KM"}
        </button>
      </div>
    </>
  );
}
