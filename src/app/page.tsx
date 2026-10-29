import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import PageShell from "@/components/PageShell";
import { CtaBanner, ProcessSection, ProjectGrid, TestimonialsSection } from "@/components/sections";
import { ArrowButton, Chips, SectionHeader } from "@/components/ui";
import { aboutTags, heroStats, projects, techStack } from "@/data/content";

function HeroStats() {
  return (
    <div className="stats">
      {heroStats.map((stat) => (
        <div key={stat.label} className="stat">
          <span className="stat__dot" aria-hidden />
          <span className="stat__value">
            <span data-count={stat.value}>{stat.value}</span>
            <span className="accent">{stat.suffix}</span>
          </span>
          <span className="stat__label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

function TechMarquee() {
  return (
    <div className="marquee" aria-label="Technologies I use">
      <div className="marquee__track">
        {/* Two identical groups so the loop scrolls seamlessly. */}
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee__group" aria-hidden={copy === 1}>
            {techStack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <PageShell>
      <section className="hero">
        <h1 className="hero__title">
          Designing &amp; Building Digital <span className="text-gradient">Web Experiences</span>
        </h1>
        <p className="hero__lead">
          Full-stack web developer &amp; UI/UX designer specializing in modern web applications. I transform ideas
          into pixel-perfect, high-performance websites that convert and delight users.
        </p>
        <div className="hero__ctas">
          <ArrowButton href="/work">View projects</ArrowButton>
          <Link href="/contact" className="btn btn--secondary">
            Let&apos;s Talk
          </Link>
        </div>
        <HeroStats />
        <TechMarquee />
      </section>

      <section className="section" id="about">
        <SectionHeader eyebrow="About" title="A little about me" />
        <div className="card bio-card">
          <div className="bio-card__row">
            <div className="bio-card__text">
              <div className="bio-card__copy">
                <p>
                  I&apos;m Bariq Bilal, a full-stack web developer and UI/UX designer with 6+ years of experience
                  transforming ideas into polished digital products. I work across the entire stack — from Figma
                  wireframes to production deployments.
                </p>
                <p>
                  My process combines research-driven design thinking with clean, maintainable code. Every project
                  gets the same commitment: performance, accessibility, and a user experience that converts.
                </p>
                <p>
                  I specialize in React, Next.js, TypeScript, and modern frontend frameworks. Whether working solo or
                  with a team, I deliver pixel-perfect implementations on time.
                </p>
              </div>
              <div className="bio-card__meta">
                <Image src="/images/avatar-small.jpg" alt="" width={40} height={40} className="bio-card__avatar" />
                <div>
                  <p className="bio-card__name">Bariq Bilal</p>
                  <p className="bio-card__place">Pakistan • Remote friendly</p>
                </div>
              </div>
            </div>
            <div className="portrait">
              <Image
                src="/images/portrait.png"
                alt="Portrait of Bariq Bilal"
                width={405}
                height={607}
                sizes="405px"
                className="portrait__img"
              />
            </div>
          </div>
          <Chips items={aboutTags} large />
        </div>
      </section>

      <section className="section" id="projects">
        <SectionHeader eyebrow="Featured projects" title="Projects that speak for themselves">
          <Link href="/work" className="btn btn--secondary">
            View all Projects
          </Link>
        </SectionHeader>
        <ProjectGrid projects={projects} />
      </section>

      <ProcessSection />
      <TestimonialsSection />
      <CtaBanner />
      <ContactSection />
    </PageShell>
  );
}
