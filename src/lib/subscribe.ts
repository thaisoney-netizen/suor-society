import nodemailer from "nodemailer";

// Server-side signup handling shared by /api/signup and /api/race-guide.
//
// Three independent layers, in order:
//   1. beehiiv (or nothing, if BEEHIIV_API_KEY / BEEHIIV_PUBLICATION_ID are
//      unset) — stores the subscriber durably in the newsletter tool.
//      Activating it is a Vercel env-var change, no code edit: create a
//      beehiiv publication and set both vars. The endpoint is scoped per
//      publication, so the ID is as required as the key.
//   2. Google Sheet backup (or nothing, if SIGNUP_SHEET_WEBHOOK is unset) —
//      appends every signup as a row via a Google Apps Script web-app URL, so
//      there's a plain spreadsheet of everyone even without Buttondown. No
//      Google credentials live here; the deployed Apps Script owns the sheet.
//   3. Notification email — keeps the human in the loop either way. Goes to
//      hello@suorsociety.com by default; set SIGNUP_NOTIFY_TO (comma-separated
//      for multiple inboxes, e.g. a personal Gmail) to change or add
//      recipients with no code edit.
//
// A signup only counts as successful if at least one layer succeeded, so the
// form shows its error path (with the mailto fallback) instead of silently
// losing an address.

// Who receives signup notifications. Defaults to hello@suorsociety.com; override
// with SIGNUP_NOTIFY_TO="a@x.com, b@y.com" in the environment (Vercel) so alerts
// reach a monitored inbox without a deploy.
const NOTIFY_TO =
  process.env.SIGNUP_NOTIFY_TO
    ?.split(",")
    .map((addr) => addr.trim())
    .filter(Boolean)
    .join(", ") || "hello@suorsociety.com";

const transporter = nodemailer.createTransport({
  host: "smtp.purelymail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// "beehiiv" is a spelling trap — double e, double i, no trailing e — and a
// mistyped env var name fails exactly like an unset one, silently and with no
// error to trace. Accept the two near-misses that have actually been typed into
// the dashboard so a stray character can't disable the whole layer again.
function beehiivEnv(suffix: string): string | undefined {
  for (const prefix of ["BEEHIIV", "BEEHIIVE", "BEHIIV"]) {
    const value = process.env[`${prefix}_${suffix}`];
    if (!value) continue;
    if (prefix !== "BEEHIIV") {
      console.warn(
        `Read ${prefix}_${suffix}; rename it to BEEHIIV_${suffix} when convenient.`,
      );
    }
    return value;
  }
  return undefined;
}

async function addToBeehiiv(email: string, source: string): Promise<boolean> {
  const key = beehiivEnv("API_KEY");
  const publicationId = beehiivEnv("PUBLICATION_ID");
  if (!key || !publicationId) return false;

  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        // Re-submitting the form after unsubscribing is a request to come back.
        reactivate_existing: true,
        // Welcome email stays off until there's one written in beehiiv worth
        // sending; the default template is not ours.
        send_welcome_email: false,
        utm_source: source,
        referring_site: "suorsociety.com",
      }),
    },
  );

  // beehiiv answers 2xx for a new subscriber and for one already on the list,
  // so either way the address is stored.
  if (res.ok) return true;

  console.error(
    "beehiiv subscribe failed:",
    res.status,
    await res.text().catch(() => ""),
  );
  return false;
}

async function appendToSheet(email: string, source: string): Promise<boolean> {
  const url = process.env.SIGNUP_SHEET_WEBHOOK;
  if (!url) return false;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source, date: new Date().toISOString() }),
  });
  if (res.ok) return true;
  console.error("Sheet backup failed:", res.status, await res.text().catch(() => ""));
  return false;
}

export async function recordSignup({
  email,
  subject,
  body,
  source,
}: {
  email: string;
  subject: string;
  body: string;
  source: string;
}): Promise<boolean> {
  let stored = false;
  try {
    stored = await addToBeehiiv(email, source);
  } catch (err) {
    console.error("beehiiv error:", err);
  }

  try {
    // OR-in so the sheet counts as durable storage even when beehiiv is off.
    stored = (await appendToSheet(email, source)) || stored;
  } catch (err) {
    console.error("Sheet backup error:", err);
  }

  let notified = false;
  try {
    await transporter.sendMail({
      from: "Suor Society <hello@suorsociety.com>",
      to: NOTIFY_TO,
      subject,
      text: body,
    });
    notified = true;
  } catch (err) {
    console.error("Signup notification email failed:", err);
    console.log("Signup details:\n" + body);
  }

  return stored || notified;
}
