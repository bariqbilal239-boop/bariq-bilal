import Image from "next/image";
import Link from "next/link";
import { processSteps, reviews, ratingSummary, type Project } from "@/data/content";
import ReviewSlider from "./ReviewSlider";
import { ArrowButton, Chips, SectionHeader, Stars } from "./ui";

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

export function TestimonialsSection() {
  return (
    <section className="section">
      <SectionHeader
        eyebrow="Testimonials"
        title="What clients say"
        lead="Real feedback from clients I've built products for."
      />
      <div className="card rating-bar">
        <div className="rating-bar__score">
          <span className="rating-bar__number">
            {ratingSummary.rating}
            <span className="accent-2">★</span>
          </span>
          <span>
            <Stars rating={5} />
            <span className="rating-bar__label">{ratingSummary.reviewSummary}</span>
          </span>
        </div>
        <ul className="rating-bar__list list-reset">
          {ratingSummary.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <ReviewSlider reviews={reviews} />
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
