/**
 * Monograma «pa»: la p en blanco y la a en lima sobre ultramar. Es el mismo dibujo que
 * src/app/icon.svg (favicon); si cambias uno, cambia el otro.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className={className}>
      <rect width="64" height="64" rx="16" fill="var(--cobalt)" />
      <g fill="#fff">
        <path
          fillRule="evenodd"
          d="M9.5 25.5a11 11 0 1 0 22 0 11 11 0 1 0-22 0ZM16 25.5a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0-9 0Z"
        />
        <rect x="9.5" y="25.5" width="6.5" height="24" />
      </g>
      <g fill="var(--marker)">
        <path
          fillRule="evenodd"
          d="M32.5 25.5a11 11 0 1 0 22 0 11 11 0 1 0-22 0ZM39 25.5a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0-9 0Z"
        />
        <rect x="48" y="25.5" width="6.5" height="11" />
      </g>
    </svg>
  );
}
