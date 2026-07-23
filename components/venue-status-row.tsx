"use client";

import Link from "next/link";
import type { VenueStatus } from "@/lib/venue-status";
import { formatCountdown, sessionEnd, sessionStart } from "@/lib/time";
import { getVenueColor } from "@/lib/venue-colors";
import { cn } from "@/lib/utils";

export function VenueStatusRow({
  statuses,
  now,
}: {
  statuses: VenueStatus[];
  now: Date;
}) {
  return (
    <div className="space-y-2">
      {statuses.map((status) => {
        const session = status.live ?? status.next;
        const className = cn(
          "block w-full rounded-2xl bg-card p-3 text-left transition-transform active:scale-[0.98]",
          status.live ? "glow-primary" : "glow-card"
        );

        const content = (
          <>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: getVenueColor(status.venue.id) }}
                />
                {status.venue.name}
              </span>
              <span
                className={cn(
                  "text-[11px] font-medium",
                  status.live ? "text-primary" : status.next ? "text-accent" : "text-muted-foreground"
                )}
              >
                {status.live ? "奉納中" : status.next ? "次の奉納" : "本日終了"}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {status.live && (
                <>
                  {status.live.title}({status.live.town})・終了まで
                  {formatCountdown(sessionEnd(status.live), now)}
                </>
              )}
              {!status.live && status.next && (
                <>
                  {status.next.title}({status.next.town})・
                  {formatCountdown(sessionStart(status.next), now)}
                </>
              )}
              {!status.live && !status.next && "本日の奉納はすべて終了しました"}
            </p>
          </>
        );

        return session ? (
          <Link key={status.venue.id} href={`/sessions/${session.id}`} className={className}>
            {content}
          </Link>
        ) : (
          <div key={status.venue.id} className={className}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
