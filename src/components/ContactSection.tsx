"use client";

import { useState, type FormEvent } from "react";
import { contactInfo, socialLinks } from "@/data/content";
import { SectionHeader } from "./ui";

const infoItems = [
  { icon: "/icons/mail.svg", label: "Email", value: contactInfo.email, href: `mailto:${contactInfo.email}` },
  { icon: "/icons/phone.svg", label: "Phone", value: contactInfo.phone, href: contactInfo.phoneHref },
  { icon: "/icons/whatsapp.svg", label: "WhatsApp", value: contactInfo.phone, href: contactInfo.whatsappHref },
  { icon: "/icons/map-pin.svg", label: "Location", value: contactInfo.location },
];

const socials = [
  { icon: "/icons/github.svg", label: "GitHub", href: socialLinks.github },
  { icon: "/icons/social-whatsapp.svg", label: `WhatsApp ${contactInfo.phone}`, href: socialLinks.whatsapp },
];

type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; message: string };

export default function ContactSection() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus({ state: "sending" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Something went wrong.");
      form.reset();
      setStatus({ state: "sent" });
    } catch (error) {
      setStatus({ state: "error", message: error instanceof Error ? error.message : "Something went wrong." });
    }
  }

  return (
    <section className="section" id="contact">
      <SectionHeader
        eyebrow="Contact"
        title="Let's build something"
        lead="Reach out for freelance work, consulting, or just to talk about systems and tooling."
      />
      <div className="contact-row">
        <form className="card contact-form" onSubmit={handleSubmit}>
          <div className="contact-form__fields">
            <label className="field">
              <span className="field__label">Name</span>
              <input className="field__input" name="name" placeholder="Your name" required autoComplete="name" />
            </label>
            <label className="field">
              <span className="field__label">Email</span>
              <input
                className="field__input"
                type="email"
                name="email"
                placeholder="you@company.com"
                required
                autoComplete="email"
              />
            </label>
            <label className="field">
              <span className="field__label">Message</span>
              <textarea className="field__input" name="message" placeholder="Tell me about your project..." required />
            </label>
            <input className="contact-form__trap" name="company" tabIndex={-1} autoComplete="off" aria-hidden />
          </div>
          <button type="submit" className="btn btn--primary btn--block" disabled={status.state === "sending"}>
            {status.state === "sending" ? "Sending…" : "Send message"}
            <img src="/icons/send.svg" alt="" className="btn__icon" />
          </button>
          <p
            className={`contact-form__note${status.state === "sent" ? " contact-form__note--ok" : ""}${status.state === "error" ? " contact-form__note--error" : ""}`}
            role="status"
          >
            {status.state === "sent" && "Thanks! Your message is on its way — check your inbox for a confirmation."}
            {status.state === "error" && status.message}
            {(status.state === "idle" || status.state === "sending") && "Typically replies within 1-2 business days."}
          </p>
        </form>

        <aside className="card contact-info">
          <ul className="contact-info__list list-reset">
            {infoItems.map((item) => {
              const content = (
                <>
                  <span className="icon-box">
                    <img src={item.icon} alt="" />
                  </span>
                  <span>
                    <span className="contact-info__label">{item.label}</span>
                    <span className="contact-info__value">{item.value}</span>
                  </span>
                </>
              );
              const external = item.href?.startsWith("http");
              return (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      className="contact-info__item"
                      href={item.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="contact-info__item">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="divider" />
          <div>
            <p className="contact-info__social-title">Social</p>
            <div className="social-row">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="icon-box icon-box--lg"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={social.icon} alt="" />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
