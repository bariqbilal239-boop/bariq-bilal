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
