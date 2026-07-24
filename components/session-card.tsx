import Link from "next/link";
import { MapPin, Clock } from "@phosphor-icons/react/ssr";
import type { Session } from "@/lib/types";
import { getVenue } from "@/lib/data";
import {
  formatCountdown,
  formatTimeRange,
  sessionEnd,
  sessionStart,
  sessionStatus,
} from "@/lib/time";
import { FavoriteButton } from "@/components/favorite-button";
import { DragonGlyph } from "@/components/dragon-glyph";
import { getTownColor } from "@/lib/town-colors";
import { cn } from "@/lib/utils";

export function SessionCard({
  session,
  now,
  variant = "default",
}: {
  session: Session;
  now: Date;
  variant?: "default" | "live";
}) {
  const venue = getVenue(session.venueId);
  const status = variant === "live" ? "live" : sessionStatus(session, now);
  const isLive = status === "live";
  const isDone = status === "done";
  const countdown = isLive
    ? formatCountdown(sessionEnd(session), now)
    : formatCountdown(sessionStart(session), now);

  return (
    <Link
      href={`/sessions/${session.id}`}
      className={cn(
        "relative block overflow-hidden rounded-2xl bg-card p-4 transition-transform active:scale-[0.98]",
        isLive ? "glow-primary" : "glow-card"
      )}
    >
      {isLive && (
        <DragonGlyph className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 text-primary" />
      )}
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {isLive ? (
              <span className="flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">
                奉納中
              </span>
            ) : (
              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium text-accent">
                {session.kind}
              </span>
            )}
            <span className="text-[11px] text-muted-foreground">
              {isDone ? "終了" : isLive ? `終了まで${countdown}` : countdown}
            </span>
          </div>

          <h3 className="mt-1.5 truncate text-base font-medium text-foreground">
            {session.title}
          </h3>
          <p className="flex items-center gap-1.5 truncate text-sm text-muted-foreground">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: getTownColor(session.town) }}
            />
            {session.town}
          </p>

          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {formatTimeRange(session)}
            </span>
            <span className="flex min-w-0 items-center gap-1">
              <MapPin size={14} className="shrink-0" />
              <span className="truncate">{venue?.name}</span>
            </span>
          </div>
        </div>

        <FavoriteButton sessionId={session.id} />
      </div>
    </Link>
  );
}
