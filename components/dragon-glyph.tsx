export function DragonGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 170" fill="none" aria-hidden className={className}>
      {/* flowing mane trailing behind the head */}
      <path
        d="M6 108 Q46 82 84 92"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.16"
      />
      <path
        d="M14 130 Q52 104 88 106"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.16"
      />
      <path
        d="M24 150 Q58 126 92 120"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.16"
      />

      {/* head + snout silhouette, facing right with open jaw */}
      <path
        d="M84 92
           C90 62, 118 42, 152 40
           C168 39, 180 46, 182 58
           C183 66, 178 72, 170 74
           L196 84
           L168 90
           C172 100, 166 112, 152 116
           C126 124, 98 118, 86 100
           Z"
        fill="currentColor"
        opacity="0.16"
      />

      {/* lower fang */}
      <path
        d="M170 90 L182 100 L166 98 Z"
        fill="currentColor"
        opacity="0.16"
      />

      {/* horn */}
      <path
        d="M148 42 Q160 16 180 6"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.16"
      />

      {/* whisker */}
      <path
        d="M118 58 Q104 46 88 46"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.16"
      />

      {/* eye */}
      <circle cx="146" cy="62" r="4" fill="currentColor" opacity="0.28" />

      {/* back spikes along the neck */}
      <path
        d="M96 96 L102 84 M110 100 L117 88 M124 102 L131 91"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.16"
      />
    </svg>
  );
}
