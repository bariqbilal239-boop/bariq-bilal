import Link from "next/link";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
};

export function SectionHeader({ eyebrow, title, lead, children }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
      {children}
    </div>
  );
}

export function ArrowButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="btn btn--primary">
      {children}
      <img src="/icons/arrow-right.svg" alt="" className="btn__icon" />
    </Link>
  );
}

export function Chips({ items, large = false }: { items: string[]; large?: boolean }) {
  return (
    <div className="chips">
      {items.map((item) => (
        <span key={item} className={large ? "chip chip--lg" : "chip"}>
          {item}
        </span>
      ))}
    </div>
  );
}

export function Stars({ rating }: { rating: number }) {
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

type Stat = { value: string; suffix: string; label: string };

export function StatList({ stats, className }: { stats: Stat[]; className: string }) {
  return (
    <div className={className}>
      {stats.map((stat) => (
        <div key={stat.label} className="big-stat">
          <span className="big-stat__value">
            <span data-count={stat.value}>{stat.value}</span>
            <span className="accent-2">{stat.suffix}</span>
          </span>
          <span className="big-stat__label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
