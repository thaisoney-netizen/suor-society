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

  try {
    await transporter.sendMail({
      from: "Suor Society <hello@suorsociety.com>",
      to: "hello@suorsociety.com",
      subject: "Race Guide Download, Suor Society",
      text: submissionText,
    });
  } catch (err) {
    console.error("Race guide notification email failed:", err);
    console.log("Submission details:\n" + submissionText);
  }

  return Response.json({ ok: true });
}
