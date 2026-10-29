import type { Metadata } from "next";
import Image from "next/image";
import PageShell from "@/components/PageShell";
import { CtaBanner, ProcessSection, ProjectGrid, TestimonialsSection } from "@/components/sections";
import { Chips, SectionHeader, StatList } from "@/components/ui";
import { featuredProject, projects, workStats } from "@/data/content";

export const metadata: Metadata = {
  title: "Work",
};

function FeaturedProject() {
  const { category, title, description, image, facts, tags } = featuredProject;
  return (
    <section className="featured">
      <div className="featured__media">
        <Image
          src={image}
          alt={`${title.join(" ")} preview`}
          width={1203}
          height={704}
          sizes="(max-width: 960px) 200vw, 1203px"
          priority
          className="featured__img"
        />
      </div>
      <div>
        <div className="featured__labels">
          <span className="featured__category">{category}</span>
          <span className="featured__badge">Featured</span>
        </div>
        <h2 className="featured__title">
          {title[0]}
          <br />
          {title[1]}
        </h2>
        <p className="featured__text">{description}</p>
        <dl className="facts">
          {facts.map((fact) => (
            <div key={fact.label} className="facts__row">
              <dt className="facts__label">{fact.label}</dt>
              <dd className="facts__value">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <Chips items={tags} large />
      </div>
    </section>
  );
}

export default function WorkPage() {
  return (
    <PageShell tallGlow>
      <section className="hero">
        <span className="pill">Selected Work</span>
        <h1 className="hero__title">
          Projects that define <span className="text-gradient">the craft</span>
        </h1>
        <p className="hero__lead">
          A curated selection of 50+ projects spanning SaaS platforms, e-commerce stores, mobile apps, and marketing
          websites — each built with the full design-to-development process.
        </p>
      </section>

      <FeaturedProject />
      <StatList stats={workStats} className="stats-strip" />

      <section className="section" id="projects">
        <SectionHeader eyebrow="Featured projects" title="Projects that speak for themselves" />
        <div className="projects-stack">
          <ProjectGrid projects={projects} />
          <ProjectGrid projects={projects} />
        </div>
      </section>

      <ProcessSection />
      <TestimonialsSection />
      <CtaBanner />
    </PageShell>
  );
}
