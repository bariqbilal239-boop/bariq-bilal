"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Review } from "@/data/content";
import { Stars } from "./ui";

const AUTOPLAY_MS = 4500;

function initials(name: string) {
  const parts = name.replace(/[_\d]+/g, " ").trim().split(/[\s.]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || name[0].toUpperCase();
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);

  useLayoutEffect(() => {
    const el = quoteRef.current;
    if (el && !expanded) setOverflowing(el.scrollHeight > el.clientHeight + 2);
  }, [expanded]);

  return (
    <figure className="card review" aria-roledescription="slide" aria-label={`Review ${index + 1}`}>
      <span className="review__mark" aria-hidden>
        &ldquo;
      </span>
      <div className="review__top">
        <Stars rating={review.rating} />
        <span className="review__badge">
          <svg viewBox="0 0 24 24" aria-hidden>
            <path d="M20 6 9 17l-5-5" />
          </svg>
          {review.source ? `Verified ${review.source} review` : "Verified client"}
        </span>
      </div>
      {review.project && <p className="review__project">{review.project}</p>}
      <blockquote ref={quoteRef} className={expanded ? "review__quote review__quote--open" : "review__quote"}>
        {review.quote.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </blockquote>
      {(overflowing || expanded) && (
        <button type="button" className="review__more" onClick={() => setExpanded((value) => !value)}>
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
      <figcaption className="review__author">
        <span className={`review__avatar review__avatar--${index % 4}`} aria-hidden>
          {initials(review.name)}
        </span>
        <span>
          <span className="review__name">{review.name}</span>
          <span className="review__meta">
            {review.location} · {review.date}
          </span>
        </span>
        {review.tag && <span className="review__tag">{review.tag}</span>}
      </figcaption>
    </figure>
  );
}

export default function ReviewSlider({ reviews }: { reviews: Review[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pageCount, setPageCount] = useState(reviews.length);
  const [paused, setPaused] = useState(false);

  const step = useCallback(() => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return 0;
    return card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0");
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const last = pageCount - 1;
      const target = index > last ? 0 : index < 0 ? last : index;
      track.scrollTo({ left: target * step(), behavior: "smooth" });
    },
    [pageCount, step],
  );

  // Track which card is first in view, and how many "stops" the slider has.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const size = step();
      if (!size) return;
      const visible = Math.round(track.clientWidth / size);
      setPageCount(Math.max(reviews.length - visible + 1, 1));
      setActive(Math.round(track.scrollLeft / size));
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reviews.length, step]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduceMotion || pageCount <= 1) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) goTo(active + 1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [active, goTo, pageCount, paused]);

  return (
    <div
      className="slider"
      role="region"
      aria-roledescription="carousel"
      aria-label="Client reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") goTo(active + 1);
        if (event.key === "ArrowLeft") goTo(active - 1);
      }}
    >
      <div ref={trackRef} className="slider__track">
        {reviews.map((review, index) => (
          <ReviewCard key={review.name} review={review} index={index} />
        ))}
      </div>

      {pageCount > 1 && (
        <div className="slider__controls">
          <button type="button" className="slider__arrow" aria-label="Previous reviews" onClick={() => goTo(active - 1)}>
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="slider__dots">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                type="button"
                className={index === active ? "slider__dot slider__dot--active" : "slider__dot"}
                aria-label={`Go to review ${index + 1}`}
                aria-current={index === active}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
          <button type="button" className="slider__arrow" aria-label="Next reviews" onClick={() => goTo(active + 1)}>
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
