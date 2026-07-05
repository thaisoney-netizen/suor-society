<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

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

A scheduled reconciler also audits this weekly, but keep it correct at
publish time — don't rely on the reconciler.
<!-- END:author-page-upkeep -->

<!-- BEGIN:suor-pm-protocol -->
# Task board protocol

Suor Society work (site + content) is tracked on a kanban board. If you are running locally on Thais's machine, read `~/.config/suor-pm/PROTOCOL.md` and follow it: claim your card (move it to In Progress) before starting, move it to Done with the commit hash after pushing, or to Review if it needs Thais's sign-off. New or discovered work gets a card. Never stop with a card left in In Progress.

If you cannot access that file (e.g. running in the cloud), skip board updates — a daily reconciler syncs the board from git history.
<!-- END:suor-pm-protocol -->

