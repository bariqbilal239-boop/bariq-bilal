import nodemailer from "nodemailer";
import { NextResponse, type NextRequest } from "next/server";
import { autoReply, ownerNotification, type ContactMessage } from "@/lib/email-templates";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readMessage(body: unknown): ContactMessage | null {
  if (!body || typeof body !== "object") return null;
  const { name, email, message } = body as Record<string, unknown>;
  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") return null;

  const clean = { name: name.trim(), email: email.trim(), message: message.trim() };
  if (!clean.name || clean.name.length > 100) return null;
  if (!EMAIL_PATTERN.test(clean.email) || clean.email.length > 200) return null;
  if (!clean.message || clean.message.length > 5000) return null;
  return clean;
}

function createTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT ?? 465);
  return nodemailer.createTransport({
    host: SMTP_HOST ?? "smtp.hostinger.com",
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  // Hidden "company" field: real visitors never fill it, spam bots usually do.
  if (body && typeof body === "object" && (body as Record<string, unknown>).company) {
    return NextResponse.json({ ok: true });
  }

  const message = readMessage(body);
  if (!message) {
    return NextResponse.json({ error: "Please fill in your name, a valid email and a message." }, { status: 400 });
  }

  const transport = createTransport();
  if (!transport) {
    console.error("Contact form: SMTP_USER / SMTP_PASS are not set in .env.local");
    return NextResponse.json({ error: "Email is not configured yet." }, { status: 500 });
  }

  const from = `"Bariq Bilal" <${process.env.SMTP_USER}>`;
  const to = process.env.CONTACT_TO || process.env.SMTP_USER;
  const siteUrl = process.env.SITE_URL || request.nextUrl.origin;

  try {
    await transport.sendMail({ from, to, replyTo: message.email, ...ownerNotification(message) });
    // The thank-you is a courtesy; don't fail the request if only this one bounces.
    await transport
      .sendMail({ from, to: message.email, ...autoReply(message, siteUrl) })
      .catch((error) => console.error("Contact form: auto-reply failed", error));
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form: sending failed", error);
    return NextResponse.json({ error: "Sorry, the message could not be sent. Please try WhatsApp." }, { status: 502 });
  }
}
