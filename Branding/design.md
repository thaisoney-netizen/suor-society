# Suor Society — Design System

> For the runner who lifts. The lifter who runs. And everyone figuring it out.

A hybrid running culture page for the runner who lifts and the lifter who runs. This document is the rulebook — colors, type, voice, templates. Pre-launch, v1.0.

---

## 1. Essence

| | |
|---|---|
| **Vibe** | Raw · Crew · Performance |
| **Audience** | Hybrid runners — the lift-and-run middle |
| **Voice mix** | 70% culture · 30% personal |
| **Posture** | Editorial. Direct. Dry. Not country-club preppy, not full streetwear, not generic fitness. |

**Three words:**
- **Raw** — streets at 7am, iron under the lights, grain on the photo
- **Crew** — real moments in an aesthetic shoot. Crew first, hero shot never
- **Hybrid** — smart sessions, programmed not improvised, both disciplines without breaking

---

## 2. Logo system

### 2.1 The marks
| Mark | Use | Notes |
|---|---|---|
| **Drop icon** (drop with 3 stride lines cut as negative space) | Avatar, favicon, watermark, app icon | Reads as a drop in thumbnails, as a runner moving up close |
| **Wordmark — SUOR \| SOCIETY** | Full lockup, primary brand applications | SUOR display caps + thin pipe + SOCIETY in condensed caps, tightly tracked |

### 2.2 Rules
- **Primary surface is always white.** The dark version exists only for inverted contexts (IG avatar on dark photo, t-shirt back).
- **Minimum sizes:** 16px (favicon) · 32px (UI) · 56px (avatar) · 96px (standard) · 160px+ (hero).
- **Clearspace:** padding on all sides ≥ the cap height of the "S" in SUOR.
- **Don't:** rotate · stretch · color the drop · cage in containers · add shadows or glows · place on busy photo areas.

---

## 3. Color

The brand runs on **paper white** and **asphalt black**. Three accents appear in small doses — never as backgrounds, never as gradients.

### 3.1 Primary (≈ 96% of output)
| Token | Hex | Role |
|---|---|---|
| `--paper` | `#FFFFFF` | Default surface · ~70% of all output |
| `--ink` | `#0A0A0A` | Primary text & dark surfaces · ~26% |

### 3.2 Accents (≈ 4% of output combined)
| Token | Hex | Role |
|---|---|---|
| `--accent` (Sunrise) | `#E8750A` | Primary accent · use sparingly |
| `--highlight` | `#F0C800` | Event posters only |
| `--accent-deep` (Rust) | `#C24B2A` | Emphasis · stamp moments |
| `--tint` (Bone) | `#F4F2EE` | Subtle warm tint, data blocks |

### 3.3 Neutrals (working palette)
| Token | Hex | Role |
|---|---|---|
| `--ink-soft` | `#1C1C1C` | Soft body text on white |
| `--muted` | `#707070` | Secondary text, metadata |
| `--muted-2` | `#A8A8A8` | Tertiary, deemphasized |
| `--rule` | `rgba(10,10,10,0.12)` | Hairlines, dividers |
| `--rule-strong` | `rgba(10,10,10,0.32)` | Strong borders, chip outlines |

---

## 4. Typography

| Family | Use | CSS variable |
|---|---|---|
| **Bebas Neue** | Display headlines, hero text, wordmark | `--font-display` |
| **Barlow Condensed** | Sub-lines, labels, chips, captions (600/700) | `--font-condensed` |
| **Anton** | Editorial stamp moments only (one per layout, max) | falls under `--font-display` stack |
| **Inter** | Body, captions, longer reads (400/500/600/700) | `--font-body` |
| **JetBrains Mono** | Pace, splits, distance, timestamps, data (400/600) | `--font-mono` |

All five load from Google Fonts:
```
https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Anton&family=Barlow+Condensed:wght@300;400;600;700;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap
```

### 4.1 Casing rules
- **Display headlines:** ALL CAPS, generous tracking (4–8%).
- **Body:** sentence case. Title case only for proper nouns.
- **Numbers:** numerals always. "5 tips," not "five tips."

### 4.2 Type scale
| Role | Size | Tracking | Use |
|---|---|---|---|
| Display XXL | 96–128px | 4% | Hero, cover headlines |
| Display LG | 56–72px | 4% | Section titles |
| Display SM | 32–44px | 4% | Card titles |
| Condensed label | 11px | 22% | All-caps metadata, labels |
| Body LG | 18px | 0 | Lede, intro paragraphs |
| Body MD | 16px | 0 | Default body |
| Mono | 11–22px | 2% | Data, splits, timestamps |

---

## 5. Voice & tone

### 5.1 The non-negotiables
- **No em dashes.** Use periods, commas, or parentheses.
- **No three sentences in a row at the same length.**
- **No wrap-up summary at the end.** End on the last point. Stop.
- **Real specifics beat generic.** "Bay loop at 7:14" beats "morning run."
- **Mostly no emoji.** Functional only (single 🏃 if it lands). Never as decoration.

### 5.2 We say / We don't say
**Do:** Hell yeah. Showed up. Counts. Out the door. Did the thing. Not perfect, just consistent.

**Don't:** You got this queen. Let's dive in. It hits different. Game changer. Robust. Holistic. Journey. Unlock. Elevate. Empower. Tapestry.

### 5.3 Caption examples
**Culture (70%):**
> Runners who lift don't get enough credit. You squatted heavy yesterday and ran 6 today. That's insane.

**Personal (30%):**
> First six miler in the build. Felt like garbage at mile two. Felt like a person at mile four. Showed up. Counts.

---

## 6. Photography

### 6.1 Direction
- **Group shots over hero shots.** Crew first.
- **Skew dark.** Asphalt and slate dominant in editing.
- **Two moods:** culture posts = high-contrast, urban, moody. Personal posts = warm, retro, natural light.
- **B&W is welcome** for spotlights and editorial covers.
- Optional subtle film grain (3–5%) on dark surfaces for editorial feel.

### 6.2 Never
- HDR. Tilt-shift. Orange-and-teal looks. Stock fitness models. Mid-air leaping silhouettes against the sun.

---

## 7. Layout & motion

### 7.1 Corners & shapes
- **Square corners by default** (`--radius-0`).
- Chips & small surfaces max 8px (`--radius-2`).
- Pills exist (event chips, category labels) but used sparingly.

### 7.2 Borders
- 1px hairlines at low alpha for most dividers.
- 2px solid borders for chips, buttons, stamp marks.

### 7.3 Shadows
- The brand is **mostly flat.** Shadows are rare.
- When needed: elevated overlays only (sticky bars, modal sheets).

### 7.4 Motion
- **Restrained.** No bouncy springs. No parallax. No "magic."
- Default ease: `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Durations: 120ms (fast) · 220ms (med) · 400ms (slow).
- Hover: opacity 0.85. **No scale-up on hover.**

### 7.5 Spacing
4px base scale: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`.

---

## 8. Instagram post templates

Nine formats. Rotate. Never run two of the same in a row.

| ID | Template | When to use |
|---|---|---|
| **A** | Pure photo | Let the image carry it. Watermark only. |
| **B** | Athlete spotlight | Editorial cover with serif italic name + kicker |
| **C** | Gear drop | Mono data overlay, product front and center |
| **D** | Event poster | Anton big type in highlight yellow + data grid |
| **E** | Warm personal photo | Personal-voice posts, no copy |
| **F** | Introducing / editorial | White card, display headline, launches |
| **G** | Numbers / recap | Strava-style splits, mono only |
| **H** | Two-up question | Stacked images, sentence-case body type |
| **I** | Hot take / quote | Solid asphalt, Bebas Neue, one word in sunrise |

---

## 9. Blog post templates

Three formats:

1. **Cover** — full-bleed photo, kicker + display headline + standfirst + credit
2. **Article** — three-column grid: metadata left, body center, pulled quote right. Body uses Inter 16px, pull quotes use Bebas Neue 32px
3. **Tile** — archive index, runs in pairs, kicker chip + Bebas Neue title + body excerpt + meta row

---

## 10. File map

| File | Purpose |
|---|---|
| `Suor Society Brand Guidelines.html` | Source brand book (editable) |
| `Suor Society Brand Guidelines (standalone).html` | Single self-contained file, works offline |
| `tokens.css` | All CSS tokens (colors, type, spacing, motion) |
| `assets/stride-drop.svg` | The drop icon mark (white-on-transparent) |
| `assets/logo-crew.svg` | Crew Pack secondary mark |
| `assets/placeholder-*.svg` | Image placeholders for prototypes |
| `design.md` | This document |

---

*Suor Society · Brand Book · v1.0 · 2026*
