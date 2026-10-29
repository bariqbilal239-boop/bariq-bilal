import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Stoke, Syne } from "next/font/google";
import "./globals.css";
import "./motion.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  axes: ["opsz"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const stoke = Stoke({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-stoke",
});

export const metadata: Metadata = {
  title: {
    default: "Bariq Bilal — Full-Stack Developer & UI/UX Designer",
    template: "%s · Bariq Bilal",
  },
  description:
    "Full-stack web developer & UI/UX designer specializing in modern web applications. I transform ideas into pixel-perfect, high-performance websites.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable} ${jetbrains.variable} ${stoke.variable}`}>
      <body>{children}</body>
    </html>
  );
}
