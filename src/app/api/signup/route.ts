import nodemailer from "nodemailer";
import { NextRequest } from "next/server";

const transporter = nodemailer.createTransport({
  host: "smtp.purelymail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || typeof email !== "string") {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    await transporter.sendMail({
      from: "Suor Society <hello@suorsociety.com>",
      to: "hello@suorsociety.com",
      subject: "New signup",
      text: `New signup: ${email}`,
    });
  } catch (err) {
    console.error("Signup notification email failed:", err);
    console.log("Signup email:", email);
  }

  return Response.json({ ok: true });
}
