# The content calendar — Notion

> ✅ **Built live (Jul 2026).** The calendar now lives in the **Content
> Calendar** database embedded in the **SUOR SOCIETY HQ** page, populated with
> weeks 1 & 2 (Jul 20 – Aug 2). Schema extended with **Pillar / Template /
> Source**, **Platform** made multi-select (+ LinkedIn), and two views added:
> **Calendar** (by Publish Date) and **By Status** (board). That live board is
> the source of truth now — edit it there.
>
> The CSVs below are kept only as a **backup / re-seed** if you ever need to
> rebuild the database from scratch. You don't need to import them.

---

## Backup: rebuild from CSV (only if the live board is lost)

Two CSVs Notion turns into databases in one click. Weeks 1 & 2 are already
filled in.

## Import (2 minutes, works on laptop or phone browser)

1. In Notion, open the page where you want the calendar to live.
2. `/` → **Import** → **CSV**, or drag `content-calendar.csv` onto the page.
   (On the phone app: **+ → Import**.) Notion creates a new database.
3. Repeat for `weekly-scorecard.csv`.

## After import — set column types (1 min, makes it feel native)

Notion imports every column as plain text. Change these so the board works:

| Column | Change to | Options |
| --- | --- | --- |
| **Status** | Status or Select | Idea · Designing · Scheduled · Posted |
| **Pillar** | Select | The Take · Real-Life Hybrid · Race Intel · Gear Verdict · Suor World · Dispatch Teaser |
| **Format** | Select | (auto-fills from the values) |
| **Platforms** | Multi-select | IG · TikTok · LinkedIn (Notion splits the comma-separated values) |
| **Date** | Date | — |
| **Template** | Select | T1–T6 |

Then add a **Calendar view** (grouped on Date) and a **Board view** (grouped
on Status) — same data, two ways to see the week.

## How it maps to the plan

- **Content calendar** = `calendar-weeks-1-2.md`, one row per post. Each row
  carries the hook/copy, which template, which platforms, the source content,
  and the CTA — so a row IS the batch-day brief.
- **Weekly scorecard** = the tracking table from `weekly-system.md`. Fill one
  row every Friday. This is the portfolio/case-study layer.
- The trend-radar Notion board stays separate — that feeds *The Take*
  candidates in. This calendar is where a candidate becomes a scheduled post.

## Keeping it going past week 2

Duplicate the last week's rows, shift the dates, and refill Pillar/Format/copy
from the weekly grid in `weekly-system.md`. The database is the living
version now; these CSVs are just the seed.
