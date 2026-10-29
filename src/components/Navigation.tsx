"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/content";

function TalkButton() {
  return (
    <Link href="/contact" className="btn btn--primary nav__cta">
      Let&apos;s Talk
      <img src="/icons/arrow-right-small.svg" alt="" className="btn__icon" />
    </Link>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const renderLink = (link: (typeof navLinks)[number]) => {
    const active = pathname === link.href;
    return (
      <Link
        key={link.href}
        href={link.href}
        className={active ? "nav__link nav__link--active" : "nav__link"}
        aria-current={active ? "page" : undefined}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <header className="nav container">
      <div className="nav__bar">
        <Link href="/" className="nav__logo">
          Portfolio
        </Link>

        <nav aria-label="Main">
          <ul className="nav__links list-reset">
            {navLinks.map((link) => (
              <li key={link.href}>{renderLink(link)}</li>
            ))}
          </ul>
        </nav>

        <div className="nav__desktop-cta">
          <TalkButton />
        </div>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="nav__toggle-bars" />
        </button>
      </div>

      <nav id="mobile-menu" className="nav__menu" hidden={!open} aria-label="Mobile">
        {navLinks.map(renderLink)}
        <TalkButton />
      </nav>
    </header>
  );
}
