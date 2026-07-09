import { NextRequest } from "next/server";
import { recordSignup } from "@/lib/subscribe";

export async function POST(req: NextRequest) {
  const { email, source } = await req.json();

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  const tag = typeof source === "string" && source ? source : "home";
  const ok = await recordSignup({
    email: email.trim(),
    source: `newsletter-${tag}`,
    subject: "New signup",
    body: `New signup: ${email.trim()}\nSource: ${tag}`,
  });

  // Fail loudly when nothing durable happened, so the form shows the
  // mailto fallback instead of silently dropping the address.
  if (!ok) return Response.json({ error: "Signup failed" }, { status: 500 });
  return Response.json({ ok: true });
}
