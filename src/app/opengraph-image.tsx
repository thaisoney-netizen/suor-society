import { ImageResponse } from "next/og";

// Branded social share card used for Open Graph and Twitter previews.
export const alt = "Suor Society — hybrid running culture";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand palette (mirrors globals.css)
const ASPHALT = "#141414";
const PAPER = "#FFFFFF";
const BONE = "#ECE4D4";
const ACCENT = "#E8642A";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: ASPHALT,
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: the triangle-in-circle mark */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg width="120" height="120" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="78" fill={PAPER} />
            <polygon points="80,42 118,116 42,116" fill={ASPHALT} />
          </svg>
        </div>

        {/* Middle: wordmark + tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              fontWeight: 800,
              letterSpacing: "-2px",
              color: PAPER,
              lineHeight: 1,
            }}
          >
            SUOR SOCIETY
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 40,
              fontWeight: 500,
              color: BONE,
              maxWidth: 920,
              lineHeight: 1.25,
            }}
          >
            Hybrid running culture. Races worth entering, gear worth knowing.
          </div>
        </div>

        {/* Bottom: accent rule + url */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              width: 120,
              height: 6,
              background: ACCENT,
              marginBottom: 24,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: "1px",
              color: PAPER,
            }}
          >
            suorsociety.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
