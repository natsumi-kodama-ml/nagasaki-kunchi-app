export type PerformanceIconType = "dragon" | "boat" | "dance" | "float" | "drum" | "mask";

export function getPerformanceIcons(program: string): PerformanceIconType[] {
  const icons: PerformanceIconType[] = [];
  const hasDragon = program.includes("龍");
  if (hasDragon) icons.push("dragon");
  if (program.includes("太鼓")) icons.push("drum");
  if (program.includes("壇尻")) icons.push("float");
  if (program.includes("船")) icons.push("boat");
  if (program.includes("万才")) icons.push("mask");
  if (!hasDragon && (program.includes("踊") || program.includes("舞"))) icons.push("dance");
  return icons;
}

export function PerformanceIcon({
  type,
  className,
}: {
  type: PerformanceIconType;
  className?: string;
}) {
  switch (type) {
    case "dragon":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path
            d="M3 15c2-1 4-1 5.5.5M9 12c1.5-3 4.5-5 8-4.5 1.5.2 2 1.3 1.3 2.4-.4.6-1.1.9-1.8.8l1.8 1.6-2.6.4c.3.9-.2 1.9-1.2 2.2-2 .6-4.4.2-5.5-1.3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path d="M17.2 12.4l1.6-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="15.8" cy="9.6" r="0.9" fill="currentColor" />
        </svg>
      );
    case "boat":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path
            d="M4 14h16l-2 4.5a2 2 0 0 1-1.8 1.2H7.8A2 2 0 0 1 6 18.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
            fill="none"
          />
          <path d="M12 14V4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12 5.5 18 9l-6 2.2Z" fill="currentColor" opacity="0.85" />
        </svg>
      );
    case "dance":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path
            d="M12 20c0-6-4-9-7.5-10.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M12 20c0-6 4-9 7.5-10.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M4.5 9.5c2.6-2.8 5.2-4 7.5-4s4.9 1.2 7.5 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="12" cy="5" r="1.4" fill="currentColor" />
        </svg>
      );
    case "float":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <rect
            x="4"
            y="7"
            width="16"
            height="8"
            rx="1.2"
            stroke="currentColor"
            strokeWidth="1.6"
            fill="none"
          />
          <path d="M4 10h16" stroke="currentColor" strokeWidth="1.4" opacity="0.7" />
          <circle cx="8" cy="18" r="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <circle cx="16" cy="18" r="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
        </svg>
      );
    case "drum":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path
            d="M6 8c0-1.7 2.7-3 6-3s6 1.3 6 3v8c0 1.7-2.7 3-6 3s-6-1.3-6-3Z"
            stroke="currentColor"
            strokeWidth="1.6"
            fill="none"
          />
          <path d="M6 8c0 1.7 2.7 3 6 3s6-1.3 6-3" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <path
            d="M6.8 9.5 4.5 15M17.2 9.5l2.3 5.5M9 10.2 7.3 16M15 10.2l1.7 5.8"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      );
    case "mask":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path
            d="M4 10c0-3.9 3.6-7 8-7s8 3.1 8 7c0 5-3.6 9-8 9s-8-4-8-9Z"
            stroke="currentColor"
            strokeWidth="1.6"
            fill="none"
          />
          <path d="M8.5 10.5c.5-1 1.3-1 1.8 0M13.7 10.5c.5-1 1.3-1 1.8 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M9 15c1.3 1 4.7 1 6 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </svg>
      );
  }
}
