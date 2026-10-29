# Bariq Bilal — Portfolio

Personal portfolio website built with Next.js (App Router) and TypeScript, implemented from the Figma design.

Pages: Home (`/`), About (`/about`), Work (`/work`), Contact (`/contact`).

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Contact form email

The contact form sends through a Hostinger mailbox (`src/app/api/contact/route.ts`): you get a
notification email and the visitor gets an automatic thank-you. Both designs live in
`src/lib/email-templates.ts`.

Copy `.env.example` to `.env.local` and fill in `SMTP_PASS`. `.env.local` is ignored by git, so the
password is never uploaded. On your hosting provider, add the same values as environment variables.

## Editing content

All text, projects, testimonials, contact details and social links live in `src/data/content.ts`.
Images are in `public/images`, icons in `public/icons`.
