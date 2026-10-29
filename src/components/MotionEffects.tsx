"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Elements that fade up as they scroll into view. Cards inside a grid get a staggered delay.
// Each block animates once (no nested fades), so content appears without waiting on its parent.
const REVEAL_SELECTOR = [
  ".section-header",
  ".section-title--lg",
  ".experience-head",
  ".story__head",
  ".featured",
  ".cta-banner",
  ".process",
  ".card",
  ".process__step",
  ".big-stat",
  ".stat",
].join(",");

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target)) return;
  const start = performance.now();
  const duration = 900;
  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = String(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export default function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    // Sticky nav gets a glass background once the page scrolls.
    const onScroll = () => root.classList.toggle("is-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Cursor-following glow on cards.
    const onPointerMove = (event: PointerEvent) => {
      const card = (event.target as HTMLElement).closest<HTMLElement>(".card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onPointerMove, { passive: true });

    if (reduceMotion) {
      return () => {
        window.removeEventListener("scroll", onScroll);
        document.removeEventListener("pointermove", onPointerMove);
      };
    }

    const targets = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    targets.forEach((el) => {
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
      el.style.setProperty("--stagger", String(Math.min(siblings.indexOf(el), 6)));
      el.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("in-view");
          el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
          observer.unobserve(el);
        });
      },
      // Start a little before the element enters the screen so it is already moving when seen.
      { threshold: 0, rootMargin: "0px 0px 12% 0px" },
    );
    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointermove", onPointerMove);
    };
  }, [pathname]);

  return null;
}
