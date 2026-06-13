# Suor Society — Logo Files

Three logo formats, each in two color versions, in both vector (SVG) and raster (PNG).

## What's in here

| File | What it is | When to use |
|---|---|---|
| **01 — Icon** | The drop with three stride lines cut as negative space | Avatar, favicon, watermark, app icon, social profile pic |
| **02 — Wordmark** | `SUOR \| SOCIETY` text lockup, no icon | When the icon already appears elsewhere on the page, or for small headers |
| **03 — Lockup** | Icon + wordmark side by side | Primary brand application — business cards, slide covers, merch labels |

Each comes in two color versions:
- **`-black.svg` / `-black.png`** — black on white. **This is the default.** Use everywhere unless the surface is already dark.
- **`-white.svg` / `-white.png`** — white on black. Use only when placed on a dark photo, dark merch, or as a profile pic against an IG dark mode feed.

## Which format do I use?

- **SVG** (in the root of this folder) — Use this whenever possible. It scales infinitely with no quality loss, prints crisp at any size, and stays small in file size. Drop it into Figma, Canva, Webflow, Notion, your website, email signatures, etc.
- **PNG** (in `/png`) — Use only where SVG isn't supported (some older Instagram tools, some POS / merch print providers, some email clients). Rendered at 1024×1024 (icon) / 2400×640 (wordmark) / 3200×720 (lockup).

## Rules (don't break these)

- **Always keep clearspace** around the logo equal to the cap-height of the "S" in SUOR.
- **Never rotate, stretch, recolor, or add effects** (shadows, glows, gradients) to the logo.
- **Never place** on a busy / low-contrast area of a photo — use the white-on-black version with a darkened scrim instead.
- **Minimum size:** 16px for the icon (favicon), 100px wide for the wordmark or full lockup. Anything smaller and the strides in the drop start to blur.

## Fonts (for reference)

The wordmark uses two Google Fonts:
- **Bebas Neue** for "SUOR"
- **Barlow Condensed** (weight 600) for "SOCIETY"

Both are free and available at fonts.google.com. The SVG files reference them via `@import`, so they render correctly in any browser. The PNGs have the fonts already rasterized in — no font installation needed to use the PNGs.
