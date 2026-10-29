import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer container">
      <p>Copyright © {new Date().getFullYear()}. All rights reserved.</p>
      <nav className="footer__links" aria-label="Footer">
        <Link href="/about">About</Link>
        <Link href="/work">Work</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </footer>
  );
}
