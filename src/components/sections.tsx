import Image from "next/image";
import Link from "next/link";
import { processSteps, reviews, upworkProfile, type Project, type Review } from "@/data/content";
import { ArrowButton, Chips, SectionHeader } from "./ui";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card project-card">
      <div className="project-card__thumb">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 960px) 50vw, 400px"
        />
      </div>
      <div>
        <a href={`https://${project.url}`} target="_blank" rel="noopener noreferrer" className="project-card__url">
          {project.url}
        </a>
        <h3 className="project-card__title">{project.title}</h3>
      </div>
      <p className="project-card__text">{project.description}</p>
      <Chips items={project.tech} />
    </article>
  );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid-3">
      {projects.map((project, index) => (
        <ProjectCard key={`${project.title}-${index}`} project={project} />
      ))}
    </div>
  );
}

export function ProcessSection() {
  return (
    <section className="section">
      <SectionHeader eyebrow="our process" title="How it works" />
      <ol className="process list-reset" aria-label="Process steps">
        {processSteps.map((step, index) => (
          <li key={step} className="process__step">
            <span className="process__circle">{String(index + 1).padStart(2, "0")}</span>
            <span className="process__label">{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="stars" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} viewBox="0 0 24 24" className={index < rating ? "star star--on" : "star"} aria-hidden>
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="card review">
      <span className="review__mark" aria-hidden>
        &ldquo;
      </span>
      <div className="review__top">
        <Stars rating={review.rating} />
        <span className="review__badge">
          <svg viewBox="0 0 24 24" aria-hidden>
            <path d="M20 6 9 17l-5-5" />
          </svg>
          Verified {review.source} review
        </span>
      </div>
      <blockquote className="review__quote">
        {review.quote.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </blockquote>
      <figcaption className="review__author">
        <span className="review__avatar" aria-hidden>
          {review.initials}
        </span>
        <span>
          <span className="review__name">{review.name}</span>
          <span className="review__meta">
            {review.project} · {review.date}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export function TestimonialsSection() {
  return (
    <section className="section">
      <SectionHeader
        eyebrow="Testimonials"
        title="What clients say"
        lead="Real feedback from clients I've built products for."
      />
      <div className="reviews">
        {reviews.map((review) => (
          <ReviewCard key={review.name + review.date} review={review} />
        ))}
        <aside className="card rating-card">
          <p className="rating-card__score">
            {upworkProfile.rating}
            <span className="accent-2">★</span>
          </p>
          <Stars rating={5} />
          <p className="rating-card__label">Average client rating on Upwork</p>
          <ul className="rating-card__list list-reset">
            {upworkProfile.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a href={upworkProfile.url} target="_blank" rel="noopener noreferrer" className="btn btn--secondary">
            View my Upwork profile
            <img src="/icons/arrow-right-small.svg" alt="" className="btn__icon btn__icon--sm" />
          </a>
        </aside>
      </div>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section className="section">
      <div className="cta-banner">
        <div>
          <p className="cta-banner__eyebrow">The Future We&apos;re Building</p>
          <h2 className="cta-banner__title">
            Have a project idea?
            <br />
            Let&apos;s build it together
          </h2>
          <p className="cta-banner__lead">
            I&apos;ll respond within 12 hours. Let&apos;s discuss how we can bring your vision to life.
          </p>
        </div>
        <div className="cta-banner__actions">
          <ArrowButton href="/work">View projects</ArrowButton>
          <Link href="/work" className="btn btn--ghost">
            See my work
          </Link>
        </div>
      </div>
    </section>
  );
}
