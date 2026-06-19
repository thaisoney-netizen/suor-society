import { ImageResponse } from "next/og";

// Branded social share card used for Open Graph and Twitter previews.
export const alt = "Suor Society — hybrid running culture page";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand palette (mirrors globals.css)
const ASPHALT = "#141414";
const PAPER = "#FFFFFF";
const BONE = "#EDE8DC";
const ACCENT = "#E8750A";

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
        {/* Top: SS monogram mark */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg width="120" height="120" viewBox="0 0 110 110">
            <path
              d="M39.38 93.15Q30.18 93.15 25.46 87.92Q20.75 82.69 20.75 72.91L20.75 72.91L20.75 68.31L32.71 68.31L32.71 73.83Q32.71 81.65 39.27 81.65L39.27 81.65Q42.48 81.65 44.15 79.75Q45.82 77.86 45.82 73.60L45.82 73.60Q45.82 68.54 43.52 64.69Q41.22 60.83 35.01 55.43L35.01 55.43Q27.19 48.53 24.09 42.95Q20.98 37.38 20.98 30.36L20.98 30.36Q20.98 20.81 25.81 15.58Q30.64 10.35 39.84 10.35L39.84 10.35Q48.92 10.35 53.58 15.58Q58.24 20.81 58.24 30.59L58.24 30.59L58.24 33.92L46.28 33.92L46.28 29.78Q46.28 25.64 44.67 23.75Q43.06 21.85 39.95 21.85L39.95 21.85Q33.63 21.85 33.63 29.55L33.63 29.55Q33.63 33.92 35.99 37.72Q38.34 41.52 44.55 46.92L44.55 46.92Q52.49 53.82 55.48 59.45Q58.47 65.09 58.47 72.68L58.47 72.68Q58.47 82.57 53.58 87.86Q48.70 93.15 39.38 93.15L39.38 93.15ZM76.16 93.15Q66.96 93.15 62.24 87.92Q57.53 82.69 57.53 72.91L57.53 72.91L57.53 68.31L69.49 68.31L69.49 73.83Q69.49 81.65 76.05 81.65L76.05 81.65Q79.27 81.65 80.93 79.75Q82.60 77.86 82.60 73.60L82.60 73.60Q82.60 68.54 80.30 64.69Q78 60.83 71.79 55.43L71.79 55.43Q63.97 48.53 60.87 42.95Q57.76 37.38 57.76 30.36L57.76 30.36Q57.76 20.81 62.59 15.58Q67.42 10.35 76.62 10.35L76.62 10.35Q85.70 10.35 90.36 15.58Q95.02 20.81 95.02 30.59L95.02 30.59L95.02 33.92L83.06 33.92L83.06 29.78Q83.06 25.64 81.45 23.75Q79.84 21.85 76.73 21.85L76.73 21.85Q70.41 21.85 70.41 29.55L70.41 29.55Q70.41 33.92 72.77 37.72Q75.13 41.52 81.34 46.92L81.34 46.92Q89.27 53.82 92.26 59.45Q95.25 65.09 95.25 72.68L95.25 72.68Q95.25 82.57 90.36 87.86Q85.47 93.15 76.16 93.15L76.16 93.15Z"
              fill={BONE}
            />
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
