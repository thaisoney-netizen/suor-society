import { NextRequest } from "next/server";
import { recordSignup } from "@/lib/subscribe";

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  const submissionText = [
    "New race guide download request.",
    "",
    `Name:  ${name?.trim() || "(not given)"}`,
    `Email: ${email.trim()}`,
    "",
    "Source: Culture Archive, 2026 Race Guide post",
  ].join("\n");

  const ok = await recordSignup({
    email: email.trim(),
    source: "race-guide",
    subject: "Race Guide Download, Suor Society",
    body: submissionText,
  });

  // Fail loudly when nothing durable happened, so the form shows the
  // mailto fallback instead of silently dropping the address.
  if (!ok) return Response.json({ error: "Signup failed" }, { status: 500 });
  return Response.json({ ok: true });
}
