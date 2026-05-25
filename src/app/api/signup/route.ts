import { Resend } from "resend";
import { NextRequest } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || typeof email !== "string") {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  await resend.emails.send({
    from: "Suor Society <hello@suorsociety.com>",
    to: "hello@suorsociety.com",
    subject: "New signup",
    text: `New signup: ${email}`,
  });

  return Response.json({ ok: true });
}
