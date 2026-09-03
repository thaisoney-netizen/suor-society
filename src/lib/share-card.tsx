import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Branded social share card used for Open Graph and Twitter previews.
// The tagline is the only localized piece; each locale's opengraph-image
// route passes its own copy (kept in sync with the home hero tagline in
// src/i18n/dictionaries.ts).
export const shareCardSize = { width: 1200, height: 630 };

// Brand palette (mirrors globals.css)
const ASPHALT = "#141414";
const PAPER = "#FFFFFF";
const BONE = "#EDE8DC";
const ACCENT = "#E8750A";

export async function buildShareCard(tagline: string) {
  // The main SUOR SOCIETY wordmark, pre-inverted to white so it reads on the
  // dark asphalt card (mirrors how the site nav flips the black artwork on dark
  // backgrounds). process.cwd() is the Next.js project directory. Satori sizes
  // the img from the width/height below rather than the file's own ratio, so
  // those two numbers must stay on the artwork's 4.16:1 aspect or it distorts.
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
        {/* Top: SUOR SOCIETY wordmark (the main logo) */}
        <div style={{ display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={wordmarkSrc} width={547} height={131} alt="Suor Society" />
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
            {tagline}
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
    { ...shareCardSize }
  );
}
