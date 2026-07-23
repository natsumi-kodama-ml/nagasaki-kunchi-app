import { VENUE_POSITIONS } from "@/lib/geo";
import { VENUES } from "@/lib/data";
import { getTownColor, TOWN_COLORS } from "@/lib/town-colors";
import type { TownTrack } from "@/lib/town-tracker";
import { cn } from "@/lib/utils";

export function trackKey(t: { town: string; groupLabel: string | null }): string {
  return `${t.town}-${t.groupLabel ?? ""}`;
}

export function MiniMap({
  tracks,
  highlightVenueId,
  onSelectVenue,
  mikoshiPosition,
  selectedTrackKey,
  onSelectTrack,
  showLegend,
  route,
}: {
  tracks: TownTrack[];
  highlightVenueId?: string | null;
  onSelectVenue?: (venueId: string) => void;
  mikoshiPosition?: { x: number; y: number } | null;
  selectedTrackKey?: string | null;
  onSelectTrack?: (key: string) => void;
  showLegend?: boolean;
  route?: { positions: { x: number; y: number }[]; activeIndex: number; color?: string };
}) {
  return (
    <div className="glow-card overflow-hidden rounded-2xl bg-card p-3">
      <svg viewBox="0 0 100 100" className="h-64 w-full">
        <image
          href="/images/kunchi-map.png"
          x="0"
          y="0"
          width="100"
          height="100"
          preserveAspectRatio="none"
        />

        {route && route.positions.length > 1 && (
          <polyline
            points={route.positions.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke={route.color ?? "var(--info)"}
            strokeOpacity="0.55"
            strokeWidth="0.7"
            strokeDasharray="1.6,1.4"
          />
        )}
        {route &&
          route.positions.map((p, i) => {
            const isActive = i === route.activeIndex;
            return (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={isActive ? 3 : 1.4}
                fill={route.color ?? "var(--info)"}
                opacity={isActive ? 1 : 0.4}
              />
            );
          })}

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
                  strokeOpacity="0.6"
                  strokeWidth="1"
                />
              )}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={active ? 2.6 : 1.6}
                fill={active ? "var(--primary)" : "var(--foreground)"}
                opacity={active ? 1 : 0.5}
              />
            </g>
          );
        })}

        {tracks.map((t) => {
          const key = trackKey(t);
          const selected = key === selectedTrackKey;
          const fill = getTownColor(t.town);
          return (
            <g
              key={key}
              onClick={onSelectTrack ? () => onSelectTrack(key) : undefined}
              className={onSelectTrack ? "cursor-pointer" : undefined}
            >
              {onSelectTrack && (
                <circle cx={t.position.x} cy={t.position.y} r={6} fill="transparent" />
              )}
              {(t.status === "live" || selected) && (
                <circle
                  cx={t.position.x}
                  cy={t.position.y}
                  r={selected ? 5.5 : 5}
                  fill="none"
                  stroke={fill}
                  strokeOpacity={selected ? 0.8 : 0.5}
                  strokeWidth={selected ? 1 : 0.8}
                />
              )}
              <circle
                cx={t.position.x}
                cy={t.position.y}
                r={selected ? 3 : 2.4}
                fill={fill}
                opacity={t.status === "done" ? 0.4 : 1}
              />
              {selected && (
                <text
                  x={t.position.x}
                  y={t.position.y - 5}
                  fontSize="3.8"
                  fontWeight={700}
                  textAnchor="middle"
                  fill={fill}
                  stroke="white"
                  strokeWidth="3"
                  style={{ paintOrder: "stroke" }}
                >
                  {t.town}
                  {t.groupLabel ? `(${t.groupLabel})` : ""}
                </text>
              )}
            </g>
          );
        })}

        {mikoshiPosition && (
          <g>
            <circle
              cx={mikoshiPosition.x}
              cy={mikoshiPosition.y}
              r={4.2}
              fill="none"
              stroke="var(--chart-4)"
              strokeOpacity="0.5"
              strokeWidth="0.8"
            />
            <rect
              x={mikoshiPosition.x - 1.8}
              y={mikoshiPosition.y - 1.8}
              width={3.6}
              height={3.6}
              fill="var(--chart-4)"
              transform={`rotate(45 ${mikoshiPosition.x} ${mikoshiPosition.y})`}
            />
            <text
              x={mikoshiPosition.x}
              y={mikoshiPosition.y + 7}
              fontSize="3.6"
              fontWeight={700}
              textAnchor="middle"
              fill="var(--chart-4)"
              stroke="white"
              strokeWidth="3"
              style={{ paintOrder: "stroke" }}
            >
              御神輿
            </text>
          </g>
        )}
      </svg>
      {showLegend && (
        <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1">
          {Object.entries(TOWN_COLORS).map(([town, color]) => (
            <span key={town} className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              {town}
            </span>
          ))}
        </div>
      )}
      <p className="mt-1 text-center text-[10px] text-muted-foreground">
        公式の庭先回りMAPを使用。位置は披露時刻・経由地からの推定です
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
