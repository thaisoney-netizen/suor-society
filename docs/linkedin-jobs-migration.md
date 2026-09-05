# Moving the LinkedIn jobs alert to a personal repository

The LinkedIn marketing-jobs alert was removed from Suor Society because it is
personal automation, not site infrastructure. Put it in a separate **private**
repository: the workflow uses a LinkedIn session cookie, sends personal email,
and commits its own deduplication state.

## Recover the files

Git keeps the removed files in history. From a clone of this repository at the
commit immediately before their removal, export them into a new checkout:

```bash
mkdir -p ../linkedin-jobs-alert/.github/workflows ../linkedin-jobs-alert/scripts/jobs
git show HEAD^:.github/workflows/linkedin-jobs.yml > ../linkedin-jobs-alert/.github/workflows/linkedin-jobs.yml
git show HEAD^:scripts/jobs/search.mjs > ../linkedin-jobs-alert/scripts/jobs/search.mjs
git show HEAD^:scripts/jobs/sent-jobs.json > ../linkedin-jobs-alert/scripts/jobs/sent-jobs.json
```

Copy `package.json` and `package-lock.json` initially, then remove dependencies
unrelated to the job. Keep `playwright` and `nodemailer`. Update the workflow's
checkout step to use the new repository's default branch; do not retain the old
`claude/linkedin-marketing-jobs-6tWHJ` branch override.

## Configure the personal repository

Create these GitHub Actions secrets:

- `LINKEDIN_LI_AT`: LinkedIn `li_at` session cookie used by the browser job.
- `MAIL_USER`: SMTP account username.
- `MAIL_PASS`: SMTP account password.

Keep the repository private, enable Actions, and run the workflow manually once
before enabling its schedule. Confirm that it sends an email and commits only
`scripts/jobs/sent-jobs.json`. Never commit the cookie or mail credentials.

## Prompt for Claude

> Set up the personal LinkedIn jobs alert in this private repository. Read this
> repository's AGENTS.md first. Recover/import the workflow, search script, and
> sent-state JSON from the Suor Society migration instructions. Make the
> workflow check out the default branch, preserve the twice-daily schedule,
> install Chromium, run the search, and commit only updated sent-state. Verify
> that all credentials come from GitHub Actions secrets and are never logged or
> committed.
