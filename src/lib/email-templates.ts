import { contactInfo } from "@/data/content";

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

type Email = { subject: string; html: string; text: string };

const colors = {
  page: "#070710",
  card: "#0f0f1c",
  border: "#23233a",
  text: "#ededf3",
  muted: "#8a8aa3",
  accent: "#ff6b00",
  violet: "#9b7cff",
};

const font = "'DM Sans', 'Segoe UI', Helvetica, Arial, sans-serif";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function paragraphs(value: string) {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

function button(href: string, label: string) {
  return `<a href="${href}" style="display:inline-block;background:${colors.accent};color:#070710;font-family:${font};font-size:14px;font-weight:700;text-decoration:none;padding:14px 26px;border-radius:999px;">${label}</a>`;
}

function infoRow(label: string, value: string) {
  return `<tr>
    <td style="padding:12px 0;border-bottom:1px solid ${colors.border};font-family:${font};font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${colors.muted};width:110px;">${label}</td>
    <td style="padding:12px 0;border-bottom:1px solid ${colors.border};font-family:${font};font-size:15px;color:${colors.text};">${value}</td>
  </tr>`;
}

/** Shared shell: dark page, glowing header bar, card body and footer. */
function layout({ preheader, eyebrow, title, body }: { preheader: string; eyebrow: string; title: string; body: string }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="dark" />
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:${colors.page};">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${colors.page};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
        <tr>
          <td style="padding:0 4px 20px;font-family:${font};font-size:20px;font-weight:700;color:${colors.text};">
            Bariq Bilal<span style="color:${colors.accent};">.</span>
          </td>
        </tr>
        <tr>
          <td style="background:${colors.card};border:1px solid ${colors.border};border-radius:20px;overflow:hidden;">
            <div style="height:4px;background:${colors.accent};background-image:linear-gradient(90deg,${colors.violet},${colors.accent});"></div>
            <div style="padding:36px 32px;">
              <p style="margin:0 0 10px;font-family:${font};font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${colors.accent};">${eyebrow}</p>
              <h1 style="margin:0 0 20px;font-family:${font};font-size:26px;line-height:1.3;font-weight:700;color:${colors.text};">${title}</h1>
              ${body}
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 4px;font-family:${font};font-size:12px;line-height:1.6;color:${colors.muted};text-align:center;">
            Bariq Bilal · Full-Stack Developer &amp; UI/UX Designer · ${escapeHtml(contactInfo.location)}<br />
            <a href="mailto:${contactInfo.email}" style="color:${colors.muted};">${contactInfo.email}</a> ·
            <a href="${contactInfo.whatsappHref}" style="color:${colors.muted};">WhatsApp ${escapeHtml(contactInfo.phone)}</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

/** Sent to Bariq when someone submits the contact form. */
export function ownerNotification(msg: ContactMessage): Email {
  const name = escapeHtml(msg.name);
  const email = escapeHtml(msg.email);
  const replyHref = `mailto:${encodeURIComponent(msg.email)}?subject=${encodeURIComponent("Re: your project enquiry")}`;

  const body = `
    <p style="margin:0 0 24px;font-family:${font};font-size:15px;line-height:1.6;color:${colors.muted};">
      Someone just reached out through your portfolio contact form.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${infoRow("Name", name)}
      ${infoRow("Email", `<a href="mailto:${email}" style="color:${colors.accent};text-decoration:none;">${email}</a>`)}
    </table>
    <div style="background:${colors.page};border:1px solid ${colors.border};border-left:3px solid ${colors.accent};border-radius:12px;padding:20px;margin-bottom:28px;font-family:${font};font-size:15px;line-height:1.7;color:${colors.text};">
      ${paragraphs(msg.message)}
    </div>
    ${button(replyHref, `Reply to ${name} →`)}`;

  return {
    subject: `New project enquiry from ${msg.name}`,
    html: layout({
      preheader: `${msg.name} sent you a message`,
      eyebrow: "New message",
      title: `${name} wants to work with you`,
      body,
    }),
    text: `New message from your portfolio\n\nName: ${msg.name}\nEmail: ${msg.email}\n\n${msg.message}`,
  };
}

/** Automatic thank-you sent back to the visitor. */
export function autoReply(msg: ContactMessage, siteUrl: string): Email {
  const name = escapeHtml(msg.name);

  const body = `
    <p style="margin:0 0 16px;font-family:${font};font-size:15px;line-height:1.7;color:${colors.muted};">
      Hi ${name}, thanks for getting in touch! Your message landed safely and I'll get back to you within 12 hours.
    </p>
    <p style="margin:0 0 8px;font-family:${font};font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${colors.muted};">Your message</p>
    <div style="background:${colors.page};border:1px solid ${colors.border};border-left:3px solid ${colors.violet};border-radius:12px;padding:20px;margin-bottom:28px;font-family:${font};font-size:14px;line-height:1.7;color:${colors.text};">
      ${paragraphs(msg.message)}
    </div>
    <p style="margin:0 0 24px;font-family:${font};font-size:15px;line-height:1.7;color:${colors.muted};">
      Need a faster answer? Message me on WhatsApp at
      <a href="${contactInfo.whatsappHref}" style="color:${colors.accent};text-decoration:none;">${escapeHtml(contactInfo.phone)}</a>.
    </p>
    ${button(`${siteUrl}/work`, "See my recent work →")}
    <p style="margin:28px 0 0;font-family:${font};font-size:15px;line-height:1.6;color:${colors.text};">
      Talk soon,<br /><strong>Bariq Bilal</strong>
    </p>`;

  return {
    subject: "Thanks for reaching out — Bariq Bilal",
    html: layout({
      preheader: "Your message arrived. I'll reply within 12 hours.",
      eyebrow: "Message received",
      title: "Let's build something great together",
      body,
    }),
    text: `Hi ${msg.name},\n\nThanks for getting in touch! Your message arrived and I'll get back to you within 12 hours.\n\nYour message:\n${msg.message}\n\nNeed a faster answer? WhatsApp: ${contactInfo.phone}\n\nTalk soon,\nBariq Bilal`,
  };
}
