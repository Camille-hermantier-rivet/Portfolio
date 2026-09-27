import Link from "next/link";
import type { ReactNode } from "react";

/** Petite étoile 8 branches utilisée comme séparateur dans les bandeaux. */
export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
      fill="currentColor"
    >
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <path
          key={angle}
          d="M12 12 10.6 3.2A1.4 1.4 0 0 1 12 1.6a1.4 1.4 0 0 1 1.4 1.6L12 12Z"
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
    </svg>
  );
}

/**
 * Soleil à 16 rayons ondulés, séparateur du bandeau orange des Réalisations.
 * Contour relevé sur la maquette (zone/projet), d'où le tracé point par point.
 */
export function Soleil({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`shrink-0 ${className}`} fill="currentColor">
      <path d="M23.42 12L22.24 12.36L20.39 12.59L19.65 12.80L19.37 13.04L19.37 13.30L19.76 13.65L20.39 14.09L20.70 14.49L20.82 14.86L20.86 15.22L20.87 15.58L20.89 15.96L21.24 16.51L21.97 17.30L21.98 17.76L21.11 17.69L19.23 16.88L18.09 16.42L17.78 16.51L17.73 16.81L18.03 17.43L18.25 18.03L18.24 18.46L18.13 18.81L17.98 19.13L17.85 19.49L17.76 19.93L17.92 20.78L18.07 21.71L17.72 21.91L16.94 21.29L15.73 19.64L15.06 18.88L14.76 18.82L14.53 18.94L14.38 19.33L14.29 19.98L14.12 20.51L13.88 20.85L13.61 21.11L13.32 21.37L13.02 21.67L12.72 22.36L12.39 23.25L12 23.30L11.63 22.55L11.40 20.63L11.23 19.36L11 19.13L10.73 19.20L10.39 19.59L9.99 20.08L9.59 20.40L9.22 20.56L8.83 20.70L8.42 20.86L8 20.98L7.45 21.33L6.70 21.97L6.27 21.92L6.22 21.25L6.91 19.54L7.45 18.27L7.43 17.85L7.29 17.61L6.89 17.68L6.19 18.01L5.57 18.21L5.13 18.18L4.77 18.07L4.37 17.96L3.95 17.85L3.42 17.79L2.56 17.90L2.17 17.68L2.68 16.96L4.19 15.81L5.01 15.11L5.12 14.78L5.08 14.52L4.70 14.37L3.87 14.33L3.28 14.17L2.94 13.92L2.63 13.65L2.32 13.36L1.96 13.06L1.16 12.76L0.49 12.40L0.60 12L1.24 11.62L3.22 11.39L4.58 11.22L4.75 10.98L4.74 10.72L4.26 10.35L3.62 9.91L3.38 9.53L3.26 9.16L3.20 8.80L3.15 8.42L3.06 8.02L2.71 7.47L2 6.68L2.07 6.27L3.19 6.49L4.89 7.21L5.76 7.46L6.08 7.37L6.30 7.22L6.36 6.92L6.16 6.36L6.03 5.81L6.02 5.35L6.06 4.92L6.11 4.46L6.15 3.94L6 3.11L5.83 2.13L6.21 1.97L7.29 3.15L8.55 4.93L9 5.27L9.29 5.29L9.52 5.17L9.57 4.52L9.62 3.70L9.81 3.23L10.07 2.90L10.35 2.63L10.65 2.37L10.96 2.09L11.26 1.43L11.60 0.61L12 0.66L12.35 2.08L12.55 4.08L12.77 4.65L13.01 4.81L13.26 4.83L13.64 4.28L14.13 3.44L14.53 3.18L14.89 3.10L15.26 3.05L15.63 3.01L16.05 2.90L16.63 2.51L17.36 1.91L17.47 2.52L16.66 4.54L16.30 5.63L16.38 5.97L16.55 6.17L16.86 6.21L17.44 5.96L18 5.78L18.43 5.79L18.84 5.84L19.21 5.95L19.54 6.11L19.95 6.22L20.66 6.16L21.66 5.96L21.98 6.24L20.70 7.37L19.38 8.40L19.11 8.83L19.06 9.15L19.17 9.39L19.55 9.55L20.10 9.68L20.55 9.87L20.87 10.11L21.17 10.38L21.48 10.67L21.83 10.97L22.61 11.26L23.49 11.60Z" />
    </svg>
  );
}

/** Flèche en diagonale dans une pastille (boutons « Voir tous les projets », etc.). */
export function ArrowBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid size-6 place-items-center rounded-full ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 16 16" className="size-3" fill="none" strokeWidth="2">
        <path
          d="M4 12L12 4M12 4H5.5M12 4v6.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

type PillLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  badgeClassName?: string;
};

/** Bouton pilule avec pastille flèche. */
export function PillLink({
  href,
  children,
  className = "",
  badgeClassName = "",
}: PillLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-pill py-1.5 pl-4 pr-1.5 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 ${className}`}
    >
      {children}
      <ArrowBadge className={badgeClassName} />
    </Link>
  );
}

/** Flèches ← → de navigation d'un carrousel. */
export function RailArrows({
  onPrev,
  onNext,
  className = "",
}: {
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <button
        type="button"
        onClick={onPrev}
        aria-label="Précédent"
        className="grid size-9 place-items-center rounded-full transition-colors hover:bg-ink/5"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" strokeWidth="1.6">
          <path
            d="M20 12H4m0 0 6-6m-6 6 6 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Suivant"
        className="grid size-9 place-items-center rounded-full transition-colors hover:bg-ink/5"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" strokeWidth="1.6">
          <path
            d="M4 12h16m0 0-6-6m6 6-6 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

/** Placeholder visuel tant que l'image du Figma n'est pas fournie. */
export function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="grid size-full place-items-center bg-sand">
      <span className="px-4 text-center text-xs uppercase tracking-widest text-steel">
        {label}
      </span>
    </div>
  );
}
