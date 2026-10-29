import Link from "next/link";

// Same artwork as src/app/icon.svg (the favicon). Keep the two in sync if the mark changes.
function LogoMark() {
  return (
    <svg className="logo__mark" viewBox="0 0 64 64" aria-hidden>
      <defs>
        <linearGradient id="logo-ring" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffb347" />
          <stop offset="0.45" stopColor="#ff6b00" />
          <stop offset="1" stopColor="#8b5cff" />
        </linearGradient>
        <linearGradient id="logo-letter" x1="16" y1="12" x2="48" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffd08a" />
          <stop offset="0.5" stopColor="#ff6b00" />
          <stop offset="1" stopColor="#b07cff" />
        </linearGradient>
        <radialGradient id="logo-glow" cx="20" cy="14" r="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ff6b00" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ff6b00" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" rx="18" fill="url(#logo-ring)" />
      <rect x="3" y="3" width="58" height="58" rx="15.5" fill="#0c0c18" />
      <rect x="3" y="3" width="58" height="58" rx="15.5" fill="url(#logo-glow)" />
      <path
        fill="url(#logo-letter)"
        fillRule="evenodd"
        d="M17 13H34.5C41 13 44.5 16.6 44.5 22C44.5 25.6 42.7 28.3 39.7 29.6C43.5 30.8 46.1 34 46.1 38.8C46.1 45.6 41.5 51 34.1 51H17ZM25 20.5H33.3C35.5 20.5 36.8 21.9 36.8 24C36.8 26.1 35.5 27.5 33.3 27.5H25ZM25 34.5H34.7C37.1 34.5 38.5 36.1 38.5 39C38.5 41.9 37.1 43.5 34.7 43.5H25Z"
      />
      <path className="logo__spark" fill="#bef03a" d="M50 9.5l1.6 4.1 4.1 1.6-4.1 1.6L50 20.9l-1.6-4.1-4.1-1.6 4.1-1.6z" />
    </svg>
  );
}

export default function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Bariq Bilal — home">
      <LogoMark />
      <span className="logo__text">
        Bariq <span className="text-gradient">Bilal</span>
      </span>
    </Link>
  );
}
