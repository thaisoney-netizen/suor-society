<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:brand-name-casing -->
# Brand name casing

The brand is written "Suor Society" — title case, never all caps. Do NOT write
"SUOR SOCIETY" in posts, headings, metadata, alt text, or any user-facing copy
(all-caps styling, when wanted, is a CSS concern, not the source text). This
applies everywhere the name appears.
<!-- END:brand-name-casing -->

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

<!-- BEGIN:run-club-hold -->
# Suor Society run club / crew runs — do NOT mention

The Suor Society run club / crew runs (Saturday crew runs in San Diego, "the
first Suor Society crew run", "Suor Society is coming to San Diego", etc.) are
on hold with no launch date. Do NOT add any mention, teaser, or call-to-action
about the club, crew runs, or a San Diego launch to posts — including new posts,
FAQs, closing paragraphs, and The Dispatch teasers. Leave existing `/dispatch`
content alone unless asked. This hold stays until Thais explicitly lifts it; if
a request seems to want a club mention, confirm first.
<!-- END:run-club-hold -->

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

