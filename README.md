# Suor Society

Hybrid running culture site — [suorsociety.com](https://www.suorsociety.com).
Next.js App Router, English at `/` and Brazilian Portuguese at `/pt-br`.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (also validates sitemap/metadata)
```

## How the site is wired

| Piece | Where | Notes |
| --- | --- | --- |
| Copy & i18n | `src/i18n/dictionaries.ts` | All shared copy, both locales, plus locale helpers |
| SEO plumbing | `src/lib/seo.tsx` | `pageMeta()` for canonical/hreflang/OG, JSON-LD components |
| Sitemap / robots | `src/app/sitemap.ts`, `src/app/robots.ts` | Generated from the filesystem — new pages are picked up automatically |
| Race guide data | `src/content/races-*.json` | Single source for the guide pages **and** the gated PDFs |
| PDF generator | `scripts/generate-race-guide-pdf.js` | `node scripts/generate-race-guide-pdf.js` regenerates both PDFs |
| Signup APIs | `src/app/api/*`, `src/lib/subscribe.ts` | Notification email + optional Buttondown (set `BUTTONDOWN_API_KEY`) |
| Analytics | `src/lib/analytics.ts` | GA4 events: `sign_up`, `generate_lead`, `file_download` |

Adding a post? Follow the checklist in [AGENTS.md](AGENTS.md).

## Automations (GitHub Actions)

- **Trend radar** (`trend-radar.yml`) — daily content-source digest by email.
- **LinkedIn jobs** (`linkedin-jobs.yml`) — twice-daily job alert; state lives on
  the `claude/linkedin-marketing-jobs-6tWHJ` branch (do not delete it).
- **Stale dates** (`stale-dates.yml`) — monthly scan for race listings whose
  dates have passed; files a `content-freshness` issue with the findings.

## Environment variables

| Var | Used for |
| --- | --- |
| `MAIL_USER` / `MAIL_PASS` | SMTP (purelymail) for signup notifications + workflow digests |
| `BUTTONDOWN_API_KEY` | Optional: stores newsletter signups in Buttondown when set |
| `SIGNUP_SHEET_WEBHOOK` | Optional: Google Apps Script web-app URL; appends every signup to a Google Sheet as a backup. See `docs/signup-sheet-backup.md` |
| `SIGNUP_NOTIFY_TO` | Optional: where signup alerts are emailed (comma-separated). Defaults to `hello@suorsociety.com` |
