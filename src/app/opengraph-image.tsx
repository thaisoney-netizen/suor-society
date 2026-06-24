import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Branded social share card used for Open Graph and Twitter previews.
export const alt = "Suor Society — hybrid running culture page";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand palette (mirrors globals.css)
const ASPHALT = "#141414";
const PAPER = "#FFFFFF";
const BONE = "#EDE8DC";
const ACCENT = "#E8750A";

export default async function Image() {
  // The main SUOR | SOCIETY wordmark, pre-inverted to white so it reads on the
  // dark asphalt card (mirrors how the site nav flips the black artwork on dark
  // backgrounds). process.cwd() is the Next.js project directory.
  const wordmark = await readFile(
    join(process.cwd(), "public/logos/wordmark-horizontal-light.png"),
    "base64"
  );
  const wordmarkSrc = `data:image/png;base64,${wordmark}`;

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
        {/* Top: SUOR | SOCIETY wordmark (the main logo) */}
        <div style={{ display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={wordmarkSrc} width={620} height={130} alt="Suor Society" />
        </div>

        {/* Middle: tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 52,
              fontWeight: 500,
              color: BONE,
              maxWidth: 940,
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
