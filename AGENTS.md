<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:new-post-checklist -->
# Adding a page or post (the automated way)

The SEO plumbing is centralized so a new page needs NO manual sitemap,
robots, hreflang, or OG work. Follow this and nothing needs correcting later:

1. **Ship locales together.** A true translation lives at the SAME slug under
   `/pt-br` (e.g. `/culture/foo` + `/pt-br/culture/foo`). Regional pages
   (different content per market) get different slugs AND an entry in
   `REGIONAL_PAIRS` in `src/i18n/dictionaries.ts` so the language switcher
   maps across.
2. **Metadata via the helper.** Define one `META` const and pass it to both
   `pageMeta()` and the JSON-LD component — copy the top of any existing post:
   `export const metadata = pageMeta({ ...META, paired: true })` (`paired`
   only when a true translation exists at the same slug; it emits hreflang).
3. **Structured data.** Render `<ArticleJsonLd {...META} datePublished="…" />`
   first inside the returned fragment; add `<FaqJsonLd faqs={FAQS} />` if the
   post has a FAQ section (JSX answers need a `plain` string twin).
4. **Sitemap/robots: nothing to do.** `src/app/sitemap.ts` scans the
   filesystem at build time and pairs same-slug translations automatically.
5. **Dictionaries.** Add the post to `home.boardPosts` (newest first, move the
   "New/Novo" meta tag) and `author.articles` for each locale it belongs to.
6. **Media.** Hero images go in `public/` as WebP ≤ 300 KB (use
   `cwebp -q 82 -resize 1600 0 in.jpg -o out.webp`). No PNG/JPEG over 500 KB.
   Export covers at **1600px wide or more** — that is the bar for the
   full-bleed treatment (`FULL_BLEED_MIN_WIDTH` in `src/lib/photos.ts`), and
   anything under it drops to the contained plate instead.

   **After adding or replacing any photo, run
   `node scripts/generate-photo-manifest.mjs`** and commit
   `src/lib/photo-sizes.ts` with it. Every photo renders through `next/image`,
   which needs the real pixel size to build a srcset and reserve its box;
   `photo()` throws at build time if a file is missing from the manifest, so a
   forgotten run fails the build rather than shipping a broken page.

   Never write a raw `<img>` for a photograph. Use
   `<Image {...photo(src)} alt=… sizes={…} />` with the slot constant from
   `src/lib/photos.ts` (`CARD_SIZES`, `COVER_SIZES`, `HALF_SIZES`…), adding a
   new constant if the slot is new. Raw `<img>` is fine only for the SVG/PNG
   wordmarks in `SiteNav`/`SiteFooter`.

   For a post cover, render `<ArticleCover src alt toc? objectPosition? />`.
   It picks the treatment from the file's own pixel count — full-bleed band,
   portrait plate, or contained plate beside a block of section links — so a
   photo is never drawn wider than it was shot. Don't hand-roll a cover: swap
   in a bigger export later and the page upgrades itself. On a page that shows
   the plate the header already lists the sections, so its sticky rail carries
   `<PostSubscribe />` instead of `<PostToc />`; that swap is driven by
   `fitsFullBleed(META.image)` and needs no editing when a photo changes.

   `.article-cover` is already height-capped on mobile (see the "MOBILE HEADER
   IMAGE SIZING" comment in `globals.css`), so covers stay a short landscape
   band on phones instead of a full-screen image. If you add any NEW full-bleed
   header image with its own class, cap it there too: on
   `max-width: 720–860px` set
   `aspect-ratio: auto; height: 60vw; min-height: 220px; max-height: 340px;`
   and place that override AFTER the element's base rule so the `aspect-ratio`
   override wins. Never ship a portrait-ratio (4/5, 3/4) image that goes
   full-width on mobile without capping its height. Run /responsive-check
   before pushing.
7. **Race data** lives in `src/content/races-*.json` — the guide pages and the
   gated PDFs render the same JSON, through the shared
   `src/components/RaceRow.tsx`. After editing it, run
   `node scripts/generate-race-guide-pdf.js` and commit the PDFs too.
   Every race carries a `checked` field: the ISO date its registration status
   was last confirmed. **Whenever you touch a race's `status`/`statusLabel`,
   or confirm it is still correct, set `checked` to today.** Never stamp a race
   you did not actually verify; the whole point is that the date means
   something. `status` is one of `open`, `limit`, `sold`, `past`.
8. **Dates.** Any "City · Month D, YYYY" listing you add is watched by the
   content-freshness sweep (`scripts/content/check-stale-dates.mjs`); run it
   locally before publishing a dated list. Test it against a future date with
   `FRESHNESS_TODAY=2026-09-20 node scripts/content/check-stale-dates.mjs`.
   See "Race guide freshness" below for who runs it and what it is allowed to
   change on its own.
9. **Never hand-write anything that restates the race data.** Three pieces of
   copy are generated and must stay generated: the "which races are still
   open" FAQ answer (`caStatusAnswer()`), the "as of" date (`VERIFIED`, which
   reads the OLDEST `checked` stamp so it cannot overclaim), and every race
   count in the headline, deck, intro, section labels, download gate and the
   homepage/author cards (`src/lib/race-counts.ts`). A hand-written status
   answer contradicted the race rows for weeks. Hand-typed counts advertised 40
   races while the page rendered 39. If you add similar summary copy, derive it
   the same way.
<!-- END:new-post-checklist -->

<!-- BEGIN:race-guide-freshness -->
# Race guide freshness

The race guides are checked **every morning** by a scheduled agent
(`~/.claude/scheduled-tasks/content-freshness-check/SKILL.md`, daily). It is
built to finish the job without Thais: it verifies, edits, commits and pushes
on its own. Read this before touching race data or the sweep, because the two
of you share the same files.

**What the agent changes unattended.** Retiring races whose date has passed
(pure date arithmetic, no lookup needed), moving `status`/`statusLabel` between
open / limit / sold, correcting a registration URL, a price, or body copy that
states something now false, and stamping `checked`. It commits and pushes.

**The two-source rule.** No status change lands on a single source. It needs
the official race site *plus* one independent source, and it prefers the actual
point of sale: a race homepage says "register now" for weeks after the
checkout page has flipped a distance to Sold Out. If two sources disagree, or
only one is reachable, the race keeps its current status, keeps its old
`checked` stamp, and goes in the escalation email. Follow the same rule by hand.

**What it escalates instead of deciding.** Contradicting sources, a dead or
redirected official site with no confirmable replacement, a race that looks
cancelled or moved, an entry that does not describe a real race, and adding or
removing a race (guide size and which races belong are Thais's editorial call).
It emails hello@suorsociety.com with the subject `Urgent update: race needs
permission` and keeps working on everything else. An escalation is always a
real decision, never a status it could have confirmed itself.

**Why past races stay on the list.** A retired race keeps its row, struck
through, with no register link (`.race-row--past`, and the same treatment in
the PDF). Deleting it would make the guide look like the race moved; striking
it says plainly that it was run. The register link goes because sending someone
to a signup page for a race already run is the same broken promise as
advertising a sold-out entry.

**Backstop.** `.github/workflows/stale-dates.yml` runs the sweep read-only on a
schedule and files a GitHub issue plus a Notion card. That exists to catch the
agent having silently stopped, not to do the work. If the issue is open with
findings the agent should already have fixed, the agent is the thing to debug.
<!-- END:race-guide-freshness -->

<!-- BEGIN:author-page-upkeep -->
# Author page upkeep

Every post is bylined "By/Por Thais Oney" linking to the author bio page
(`/author/thais-oney`, `/pt-br/author/thais-oney`). When you add a new post:

1. Give it the linked byline in the `article-meta` row and an `<AuthorCard />`
   (`<AuthorCard lang="pt" />` on pt-br pages) at the end of `post-main` —
   copy the pattern from any existing post.
2. Add the post to `author.articles` in `src/i18n/dictionaries.ts` for the
   locale(s) it belongs to, newest work at the top. Regional pages (US vs
   Brazil versions) go only in their own locale's list.

The weekly content-freshness sweep also audits this, but keep it correct at
publish time — don't rely on the sweep.
<!-- END:author-page-upkeep -->

<!-- BEGIN:photo-handling -->
# Photos: never filter them

Thais's photos ship as shot. No contrast or saturation changes, no colour
grade or split-tone, no sharpening, no grain, no vignette. Cropping, resizing
and re-encoding are fine. Anything that changes how the photograph looks is
not.

`scripts/grade_photos.py` did exactly what this rule forbids and has been
deleted. Don't reintroduce it or anything like it.

Three images it produced are still live on the crew page and still carry its
grade: `crew-run.jpg`, `road-run.jpg` and `trail-run.jpg`. They need re-cutting
from the untouched originals, which live on Thais's machine and not in this
repo, so ask for them rather than trying to reverse the grade in software.

If a photo is too small for the slot it has to fill, change the slot, not the
photo. `.article-cover--portrait` in `globals.css` exists for that reason: a
portrait shot gets a contained plate at its own ratio instead of being
stretched or cropped into a full-bleed 16:9 window.
<!-- END:photo-handling -->

<!-- BEGIN:branch-hygiene -->
# Branch hygiene

The branch `claude/linkedin-marketing-jobs-6tWHJ` is LOAD-BEARING: the
LinkedIn jobs workflow checks it out and commits state back to it on a
schedule. Never delete it when pruning merged `claude/*` branches, and note
that editing `scripts/jobs/search.mjs` on main does nothing — the live copy
is on that branch.
<!-- END:branch-hygiene -->

<!-- BEGIN:suor-pm-protocol -->
# Task board protocol

Suor Society work (site + content) is tracked on a kanban board. If you are running locally on Thais's machine, read `~/.config/suor-pm/PROTOCOL.md` and follow it: claim your card (move it to In Progress) before starting, move it to Done with the commit hash after pushing, or to Review if it needs Thais's sign-off. New or discovered work gets a card. Never stop with a card left in In Progress.

If you cannot access that file (e.g. running in the cloud), skip board updates — a daily reconciler syncs the board from git history.
<!-- END:suor-pm-protocol -->

