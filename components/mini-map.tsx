import { VENUE_POSITIONS } from "@/lib/geo";
import { VENUES } from "@/lib/data";
import type { TownTrack } from "@/lib/town-tracker";
import { cn } from "@/lib/utils";

export function MiniMap({
  tracks,
  highlightVenueId,
  onSelectVenue,
}: {
  tracks: (TownTrack & { color?: "primary" | "accent" })[];
  highlightVenueId?: string | null;
  onSelectVenue?: (venueId: string) => void;
}) {
  return (
    <div className="glow-card overflow-hidden rounded-2xl bg-card p-3">
      <svg viewBox="0 0 100 100" className="h-56 w-full">
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="30%" r="80%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="100" height="100" fill="url(#mapGlow)" />

        {VENUES.map((v) => {
          const pos = VENUE_POSITIONS[v.id];
          if (!pos) return null;
          const active = v.id === highlightVenueId;
          return (
            <g
              key={v.id}
              onClick={onSelectVenue ? () => onSelectVenue(v.id) : undefined}
              className={onSelectVenue ? "cursor-pointer" : undefined}
            >
              {onSelectVenue && (
                <circle cx={pos.x} cy={pos.y} r={7} fill="transparent" />
              )}
              {active && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={5}
                  fill="none"
                  stroke="var(--primary)"
                  strokeOpacity="0.4"
                  strokeWidth="0.8"
                />
              )}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={active ? 3.2 : 2.2}
                fill={active ? "var(--primary)" : "var(--muted-foreground)"}
                opacity={active ? 1 : 0.5}
              />
              <text
                x={pos.x}
                y={pos.y - 4.5}
                fontSize="4"
                fontWeight={active ? 700 : 400}
                textAnchor="middle"
                fill={active ? "var(--primary)" : "var(--muted-foreground)"}
              >
                {v.name.replace("会場", "")}
              </text>
            </g>
          );
        })}

        {tracks.map((t) => (
          <g key={t.town}>
            {t.status === "live" && (
              <circle
                cx={t.position.x}
                cy={t.position.y}
                r={5}
                fill="none"
                stroke="var(--primary)"
                strokeOpacity="0.5"
                strokeWidth="0.8"
              />
            )}
            <circle
              cx={t.position.x}
              cy={t.position.y}
              r={2.4}
              fill={t.color === "accent" ? "var(--accent)" : "var(--primary)"}
              opacity={t.status === "done" ? 0.4 : 1}
            />
          </g>
        ))}
      </svg>
      <p className="mt-1 text-center text-[10px] text-muted-foreground">
        地図はイメージです(実際の地理・距離とは異なります)
      </p>
    </div>
  );
}

export function trackStatusLabel(status: TownTrack["status"], hasPatrol?: boolean): string {
  switch (status) {
    case "live":
      return "会場で奉納中";
    case "transit":
      return hasPatrol ? "庭先回り中" : "会場間を移動中(推定)";
    case "before":
      return "奉納前";
    case "done":
      return "本日の奉納は終了";
  }
}

export function trackStatusClassName(status: TownTrack["status"]): string {
  return cn(
    "text-[11px] font-medium",
    status === "live" ? "text-primary" : "text-muted-foreground"
  );
}
