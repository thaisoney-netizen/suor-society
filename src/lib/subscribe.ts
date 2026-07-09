import nodemailer from "nodemailer";

// Server-side signup handling shared by /api/signup and /api/race-guide.
//
// Two layers, in order:
//   1. Buttondown (or nothing, if BUTTONDOWN_API_KEY is unset) — stores the
//      subscriber durably in the newsletter tool. Activating it is a Vercel
//      env-var change, no code edit: create a Buttondown account and set
//      BUTTONDOWN_API_KEY.
//   2. Notification email to hello@ — keeps the human in the loop either way.
//
// A signup only counts as successful if at least one layer succeeded, so the
// form shows its error path (with the mailto fallback) instead of silently
// losing an address.

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

  let notified = false;
  try {
    await transporter.sendMail({
      from: "Suor Society <hello@suorsociety.com>",
      to: "hello@suorsociety.com",
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
