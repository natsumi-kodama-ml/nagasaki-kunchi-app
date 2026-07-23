export function LanternGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      aria-hidden
      className={className}
    >
      <ellipse cx="60" cy="80" rx="46" ry="58" fill="currentColor" opacity="0.14" />
      <path
        d="M60 12v16M60 132v16M28 32c9 8 15 8 32 8s23 0 32-8M28 128c9-8 15-8 32-8s23 0 32 8"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <ellipse cx="60" cy="80" rx="40" ry="52" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
      <path
        d="M60 28v104M34 80h52"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="2"
      />
    </svg>
  );
}
