import type { Metadata } from "next";
import Image from "next/image";
import ContactSection from "@/components/ContactSection";
import PageShell from "@/components/PageShell";
import { CtaBanner } from "@/components/sections";
import { ArrowButton, StatList } from "@/components/ui";
import {
  aboutStats,
  contactInfo,
  currently,
  experience,
  resumeUrl,
  services,
  skillGroups,
  socialLinks,
  values,
} from "@/data/content";

export const metadata: Metadata = {
  title: "About",
};

const profileLinks = [
  { icon: "/icons/card-github.svg", label: "GitHub", href: socialLinks.github },
  { icon: "/icons/card-linkedin.svg", label: "LinkedIn", href: socialLinks.linkedin },
  { icon: "/icons/card-dribbble.svg", label: "Dribbble", href: socialLinks.dribbble },
];

function ProfileCard() {
  return (
    <div className="profile-card">
      <div className="portrait">
        <Image
          src="/images/portrait.png"
          alt="Portrait of Bariq Bilal"
          width={405}
          height={607}
          sizes="405px"
          priority
          className="portrait__img"
        />
      </div>
      <div className="profile-card__body">
        <p className="profile-card__name">Bariq Bilal</p>
        <p className="profile-card__role">
          Full-Stack Developer &amp; UI/UX Designer · Based in {contactInfo.location}
        </p>
        <div className="profile-card__links">
          {profileLinks.map((link) => (
            <a key={link.label} href={link.href} className="profile-card__link" target="_blank" rel="noopener noreferrer">
              <img src={link.icon} alt="" />
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Currently() {
  return (
    <div className="currently">
      <h3 className="currently__title">Currently</h3>
      <ul className="currently__list list-reset">
        {currently.map((item) => (
          <li key={item.title} className="currently__item">
            <span className="currently__badge">{item.badge}</span>
            <span className="currently__text">
              <span className="currently__name">{item.title}</span>
              <span className="currently__meta">{item.meta}</span>
            </span>
            {item.status && <span className="status-pill">{item.status}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Skills() {
  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">Skills &amp; Expertise</p>
        <h2 className="section-title">From curious kid to full-stack creator</h2>
      </div>
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <article key={group.title} className="card skill-card">
            <span className="skill-card__icon">
              <img src={group.icon} alt="" />
            </span>
            <h3 className="skill-card__title">{group.title}</h3>
            <p className="skill-card__text">{group.description}</p>
            <ul className="skill-list list-reset">
              {group.skills.map((skill) => (
                <li key={skill.name}>
                  <div className="skill__row">
                    <span>{skill.name}</span>
                    <span className="skill__level">{skill.level}%</span>
                  </div>
                  <div
                    className="skill__bar"
                    role="progressbar"
                    aria-label={skill.name}
                    aria-valuenow={skill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div className="skill__fill" style={{ width: `${skill.level}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section">
      <div className="experience-head">
        <h2 className="section-title--lg">Where I&apos;ve worked and what I built</h2>
        <p className="section-lead">
          A track record of shipping real products across agencies, startups, and on my own. Every role taught me
          something new about building for real users.
        </p>
        <a href={resumeUrl} className="btn btn--primary experience-head__cta" download>
          Full Resume
          <img src="/icons/resume-download.svg" alt="" className="btn__icon btn__icon--sm" />
        </a>
      </div>
      <div className="experience-grid">
        {experience.map((job) => (
          <article key={job.role} className="card job-card">
            <div>
              <p className="job-card__period">{job.period}</p>
              <h3 className="job-card__role">{job.role}</h3>
              <p className="job-card__meta">
                <span>{job.company}</span>
                <span>{job.location}</span>
              </p>
            </div>
            <p className="job-card__summary">{job.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">What I Offer</p>
        <h2 className="section-title">Services built around your full product journey</h2>
      </div>
      <div className="services-grid">
        {services.map((service) => (
          <article key={service.number} className="card service-card">
            <span className="service-card__number">{service.number}</span>
            <div className="service-card__body">
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__text">{service.description}</p>
              <ul className="service-card__list list-reset">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="section">
      <h2 className="section-title--lg">How I think about the work I do</h2>
      <div className="values-grid">
        {values.map((value) => (
          <article key={value.title} className="card value-card">
            <span className="value-card__icon">
              <img src={value.icon} alt="" />
            </span>
            <h3 className="value-card__title">{value.title}</h3>
            <p className="value-card__text">{value.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <PageShell>
      <section className="about-hero">
        <div className="about-hero__copy">
          <h1 className="about-hero__title">
            The person behind <span className="text-gradient">the pixels</span>
          </h1>
          <p className="hero__lead">
            I&apos;m a full-stack developer and UI/UX designer who&apos;s obsessed with building digital experiences
            that are fast, beautiful, and purposeful. I work across the entire product lifecycle, from research to
            release.
          </p>
          <ArrowButton href="/work">View projects</ArrowButton>
        </div>
        <ProfileCard />
      </section>

      <section className="story">
        <div className="story__head">
          <p className="eyebrow">About</p>
          <h2 className="section-title story__title">From curious kid to full-stack creator</h2>
          <div className="story__copy">
            <p>
              It started at 16 when I built my first webpage using nothing but a YouTube tutorial and a cracked copy
              of Dreamweaver. That spark never left. Over the next decade, I turned a self-taught obsession into a
              professional craft.
            </p>
            <p>
              I studied Computer Science, but most of what I know came from building things — real projects, real
              clients, real deadlines. I&apos;ve shipped 50+ websites and apps across SaaS, e-commerce, fintech, and
              healthcare verticals.
            </p>
          </div>
        </div>
        <StatList stats={aboutStats} className="big-stats" />
        <Currently />
      </section>

      <Skills />
      <Experience />
      <Services />
      <Values />
      <CtaBanner />
      <ContactSection />
    </PageShell>
  );
}
