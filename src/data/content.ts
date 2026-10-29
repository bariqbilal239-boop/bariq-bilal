// Contact details, lists and card data shared by the pages.
// Edit values here; the page layouts read from this file.

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

const phoneDigits = "923451136239";

export const contactInfo = {
  email: "info@bariqbilal7.com",
  phone: "+92 345 1136239",
  phoneHref: `tel:+${phoneDigits}`,
  whatsappHref: `https://wa.me/${phoneDigits}`,
  location: "Islamabad, Pakistan",
};

export const socialLinks = {
  github: "https://github.com/bariq49",
  whatsapp: contactInfo.whatsappHref,
  linkedin: "#",
  dribbble: "#",
};

export const resumeUrl = "/resume.pdf";

export const heroStats = [
  { value: "10", suffix: "+", label: "Experience" },
  { value: "50", suffix: "+", label: "Projects Delivered" },
  { value: "15", suffix: "+", label: "Happy Clients" },
];

export const techStack = [
  "MySQL",
  "Tailwind CSS",
  "TypeScript",
  "Node.js",
  "REST APIs",
  "PostgreSQL",
  "Firestore",
  "Fire base",
  "React.js",
];

export const aboutTags = [
  "React / Next.js",
  "TypeScript",
  "Figma",
  "Tailwind CSS",
  "Node.js",
  "Motion",
  "Webflow",
  "PostgreSQL",
  "MongoDB",
];

export type Project = {
  url: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
};

export const projects: Project[] = [
  {
    url: "www.chauffeurio.com",
    title: "Chauffeurio Website",
    description:
      "Chauffeurio operates across Spain, offering premium chauffeur services with punctual pickups and professional drivers tailored to business and leisure travellers.",
    image: "/images/project-chauffeurio.png",
    tech: ["Node.js", "Stripe", "React", "Tailwind"],
  },
  {
    url: "www.oktaxis.co.uk",
    title: "OK Taxis Website",
    description:
      "OK Taxis operates across London and the surrounding Greater London areas, delivering reliable and professional transport services for residents and visitors.",
    image: "/images/project-oktaxis.png",
    tech: ["Node.js", "Stripe", "React", "Tailwind"],
  },
  {
    url: "www.austinlimoservice.com",
    title: "Austin Limo Service",
    description:
      "Austin Limo Service operates in Austin, Texas, USA, offering premium and reliable transportation solutions throughout the city and surrounding areas.",
    image: "/images/project-austinlimo.png",
    tech: ["Node.js", "Stripe", "React", "Tailwind"],
  },
];

export const processSteps = ["Identify", "Design", "Build", "Implement", "Enable"];

// Real client feedback from Bariq's Upwork profile. Add new reviews here as they come in.
export type Review = {
  name: string;
  initials: string;
  project: string;
  date: string;
  rating: number;
  source: string;
  quote: string[];
};

export const reviews: Review[] = [
  {
    name: "Lovejeet S.",
    initials: "LS",
    project: "Client Dashboard & Ride Management System (Next.js)",
    date: "March 2026",
    rating: 5,
    source: "Upwork",
    quote: [
      "Great experience working with Bariq Bilal on the DSL website project. He developed a complete admin panel and successfully integrated the customer Sign Up and Login system. Everything works smoothly, and the admin dashboard makes it easy to manage customers.",
      "Professional work, clear communication, and delivered exactly as required. Highly recommended!",
    ],
  },
];

export const upworkProfile = {
  url: "https://www.upwork.com/freelancers/~01fd3f660d8fc51703",
  rating: "5.0",
  highlights: ["Identity verified on Upwork", "Certified: Full Stack Web Development", "Certified: MERN Stack Developer"],
};

export const aboutStats = [
  { value: "50", suffix: "+", label: "Projects shipped" },
  { value: "6", suffix: "+", label: "Long-term client relationships" },
  { value: "25", suffix: "", label: "Average conversion lift delivered" },
  { value: "12", suffix: "h", label: "Average client rating" },
];

export const currently = [
  { badge: "SR", title: "Senior Full-Stack Developer", meta: "TechVision Labs · Full-Time", status: "Active" },
  { badge: "FL", title: "Freelance Projects", meta: "Select clients · Part-Time", status: "Open" },
  { badge: "ED", title: "Learning — Three.js & WebGL", meta: "Personal upskilling" },
];

export const skillGroups = [
  {
    icon: "/icons/skill-code.svg",
    title: "Frontend Development",
    description: "Pixel-perfect interfaces with clean, maintainable code and a strong focus on performance.",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Motion / GSAP", level: 80 },
    ],
  },
  {
    icon: "/icons/skill-palette.svg",
    title: "UI/UX Design",
    description:
      "Research-driven design that solves real problems — from wireframes to high-fidelity prototypes.",
    skills: [
      { name: "Figma", level: 93 },
      { name: "Prototyping", level: 87 },
      { name: "Design Systems", level: 85 },
    ],
  },
  {
    icon: "/icons/skill-database.svg",
    title: "Backend & Infra",
    description: "Solid backend foundations — APIs, databases, and deployments that scale reliably.",
    skills: [
      { name: "Node.js / Express", level: 82 },
      { name: "PostgreSQL", level: 75 },
      { name: "REST / tRPC APIs", level: 84 },
      { name: "Vercel / Railway", level: 88 },
    ],
  },
];

export const experience = [
  {
    period: "Jan 2024 — Present",
    role: "Senior Full-Stack Developer",
    company: "TechVision Labs",
    location: "San Francisco, CA",
    summary:
      "Lead frontend development for 8+ client products across SaaS and e-commerce verticals. Architected design system used by 5 products. Cut page load times by 45% through code splitting and image optimization.",
  },
  {
    period: "Jun 2022 — Dec 2023",
    role: "UI/UX Designer + Developer",
    company: "Digital Creative Studio",
    location: "Remote",
    summary:
      "Designed and developed marketing websites and landing pages for 12 clients. Owned full pipeline from UX research to Webflow/Framer delivery. Avg. 42% conversion lift across client sites.",
  },
  {
    period: "Jan 2021 — May 2022",
    role: "Freelance Web Developer",
    company: "Self-Employed",
    location: "Various clients",
    summary:
      "Took on select freelance projects — SaaS dashboards, mobile app UIs, and e-commerce stores. Managed client relationships end-to-end while building in public on Twitter.",
  },
  {
    period: "Mar 2019 — Dec 2020",
    role: "Frontend Developer",
    company: "StartupHub Inc.",
    location: "Austin, TX",
    summary:
      "Built and maintained frontend for a B2B analytics platform. Collaborated closely with product and design teams. First exposure to large-scale React codebases and agile workflows.",
  },
];

export const services = [
  {
    number: "01",
    title: "Website Design & Development",
    description:
      "End-to-end custom websites — from strategy and wireframes to pixel-perfect code and launch. No templates, no shortcuts.",
    items: [
      "Landing pages & marketing sites",
      "Portfolio & personal brand sites",
      "Corporate & product pages",
      "CMS integration (Sanity, Contentful)",
    ],
  },
  {
    number: "02",
    title: "SaaS & Web App Development",
    description: "Full-stack product development with a strong UX foundation. Built to scale, tested to ship.",
    items: [
      "Dashboard & admin panels",
      "User authentication & onboarding",
      "API design & integrations",
      "Performance & SEO optimisation",
    ],
  },
  {
    number: "03",
    title: "UI/UX Design & Prototyping",
    description:
      "Research-backed design that looks great and actually works. Fully handoff-ready Figma files included.",
    items: [
      "UX research & user flows",
      "Wireframes & high-fidelity design",
      "Interactive Figma prototypes",
      "Design system creation",
    ],
  },
];

export const values = [
  {
    icon: "/icons/value-zap.svg",
    title: "Speed without compromise",
    text: "Fast doesn't mean careless. I ship quickly because I plan well — clear scope, tight iterations, and no unnecessary meetings.",
  },
  {
    icon: "/icons/value-clock.svg",
    title: "Ownership over excuses",
    text: "I take full accountability for every project I accept. If something isn't right, I fix it — not because I have to, but because I care about the outcome.",
  },
  {
    icon: "/icons/value-eye.svg",
    title: "Design for real people",
    text: "Every decision I make is grounded in how real humans will use the product — not what looks best in a Dribbble shot.",
  },
  {
    icon: "/icons/value-trend.svg",
    title: "Always be learning",
    text: "The web moves fast. I invest time every week in keeping my skills sharp — new frameworks, design trends, and emerging patterns.",
  },
];

export const featuredProject = {
  category: "SaaS Platform",
  title: ["Knovia — Learning", "Management System"],
  description:
    "End-to-end design and development of a modern enterprise LMS. Built the full product: onboarding, course builder, learner dashboard, and admin analytics — all from a single Figma file to production deployment.",
  image: "/images/project-chauffeurio.png",
  facts: [
    { label: "Timeline", value: "12 weeks" },
    { label: "Role", value: "Design + Frontend Dev" },
    { label: "Impact", value: "+62% user retention" },
  ],
  tags: ["React / Next.js", "TypeScript", "Figma", "Tailwind CSS"],
};

export const workStats = [
  { value: "50", suffix: "+", label: "Projects shipped across 6 industries" },
  { value: "25", suffix: "", label: "Long-term client relationships" },
  { value: "42", suffix: "%", label: "Average conversion lift delivered" },
  { value: "5", suffix: "★", label: "Average client rating" },
];
