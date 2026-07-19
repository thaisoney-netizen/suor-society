import nodemailer from "nodemailer";

// Server-side signup handling shared by /api/signup and /api/race-guide.
//
// Three independent layers, in order:
//   1. Buttondown (or nothing, if BUTTONDOWN_API_KEY is unset) — stores the
//      subscriber durably in the newsletter tool. Activating it is a Vercel
//      env-var change, no code edit: create a Buttondown account and set
//      BUTTONDOWN_API_KEY.
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

async function addToButtondown(email: string, source: string): Promise<boolean> {
  const key = process.env.BUTTONDOWN_API_KEY;
  if (!key) return false;
  const res = await fetch("https://api.buttondown.com/v1/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Token ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_address: email, tags: [source] }),
  });
  // 201 = created; 400 with "already subscribed" also means the address is
  // safely on the list.
  if (res.status === 201) return true;
  if (res.status === 400) {
    const body = await res.text();
    if (body.includes("already")) return true;
  }
  console.error("Buttondown subscribe failed:", res.status, await res.text().catch(() => ""));
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
    stored = await addToButtondown(email, source);
  } catch (err) {
    console.error("Buttondown error:", err);
  }

  try {
    // OR-in so the sheet counts as durable storage even when Buttondown is off.
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
