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
   For the post cover, reuse the existing `.article-cover` block — it is
   already height-capped on mobile (see the "MOBILE HEADER IMAGE SIZING"
   comment in `globals.css`), so covers stay a short landscape band on phones
   instead of a full-screen image. If you add any NEW full-bleed header image
   with its own class, cap it there too: on `max-width: 720–860px` set
   `aspect-ratio: auto; height: 60vw; min-height: 220px; max-height: 340px;`
   and place that override AFTER the element's base rule so the `aspect-ratio`
   override wins. Never ship a portrait-ratio (4/5, 3/4) image that goes
   full-width on mobile without capping its height. Run /responsive-check
   before pushing.
7. **Race data** lives in `src/content/races-*.json` — the guide pages and the
   gated PDFs render the same JSON. After editing it, run
   `node scripts/generate-race-guide-pdf.js` and commit the PDFs too.
   Every race carries a `checked` field: the ISO date its registration status
   was last confirmed against the official site. **Whenever you touch a race's
   `status`/`statusLabel`, or confirm it is still correct, set `checked` to
   today.** Never stamp a race you did not actually verify; the whole point is
   that the date means something.
8. **Dates.** Any "City · Month D, YYYY" listing you add is watched by the
   weekly content-freshness sweep (`scripts/content/check-stale-dates.mjs`);
   run it locally before publishing a dated list. It checks two things: dates
   already in the past, and races within 45 days whose `checked` stamp is more
   than 30 days old. Test it against a future date with
   `FRESHNESS_TODAY=2026-09-20 node scripts/content/check-stale-dates.mjs`.
   The sweep reports to a GitHub issue *and* a Notion board card, because an
   issue on its own goes unread.
9. **Never hand-write status prose that restates the race data.** The
   "which races are still open" FAQ answer on
   `/culture/open-entry-races-2026` is generated from the JSON
   (`caStatusAnswer()`), and the "as of" month comes from the single
   `VERIFIED` constant that the download gate also reads. A hand-written
   version of that answer silently contradicted the race rows for weeks. If
   you add similar summary copy, derive it the same way.
<!-- END:new-post-checklist -->

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

<!-- BEGIN:branch-hygiene -->
# Branch hygiene

The branch `claude/linkedin-marketing-jobs-6tWHJ` is LOAD-BEARING: the
LinkedIn jobs workflow checks it out and commits state back to it on a
schedule. Never delete it when pruning merged `claude/*` branches, and note
that editing `scripts/jobs/search.mjs` on main does nothing — the live copy
is on that branch.

The branch `claude/website-blocked-it-security-goiawh` is ARCHIVAL: commit
`638370a` on it holds the only copy in git of the `Branding/` design system
(`design.md`, `tokens.css`, the logo SVG/PNG set, the Brand Guidelines PDF
and HTML). `/Branding/` is gitignored on purpose, so those files live
untracked on Thais's machine and exist nowhere else in version control.
Deleting this branch destroys the only backup. Never prune it.

To read the files without merging anything:
`git archive 638370a Branding | tar -x -C /tmp/branding`

Note that `hybrid-running-business` (the skill) names `Branding/design.md`
as the source of truth for all color tokens, type scale, and the logo
system. Because the folder is gitignored, cloud sessions cannot see it —
which is how `src/app/globals.css` drifted from the spec. If you are
generating anything visual in a cloud session, extract it from `638370a`
first rather than guessing or restating hex codes.
<!-- END:branch-hygiene -->

<!-- BEGIN:suor-pm-protocol -->
# Task board protocol

Suor Society work (site + content) is tracked on a kanban board. If you are running locally on Thais's machine, read `~/.config/suor-pm/PROTOCOL.md` and follow it: claim your card (move it to In Progress) before starting, move it to Done with the commit hash after pushing, or to Review if it needs Thais's sign-off. New or discovered work gets a card. Never stop with a card left in In Progress.

If you cannot access that file (e.g. running in the cloud), skip board updates — a daily reconciler syncs the board from git history.
<!-- END:suor-pm-protocol -->

