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
    <div className="-mx-4 overflow-x-auto px-4">
      <div className="flex gap-2.5 pb-1">
        {statuses.map((status) => {
          const session = status.live ?? status.next;
          const content = (
            <>
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: getVenueColor(status.venue.id) }}
                />
                <span className="truncate text-sm font-semibold text-foreground">
                  {status.venue.name}
                </span>
              </div>

              {status.live ? (
                <>
                  <div className="mt-1.5">
                    <span className="inline-block rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">
                      奉納中
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm font-medium text-foreground">
                    {status.live.title}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{status.live.town}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    終了まで{formatCountdown(sessionEnd(status.live), now)}
                  </p>
                </>
              ) : status.next ? (
                <>
                  <p className="mt-1.5 text-[11px] text-accent">次の奉納</p>
                  <p className="mt-1 truncate text-sm font-medium text-foreground">
                    {status.next.title}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{status.next.town}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {formatCountdown(sessionStart(status.next), now)}
                  </p>
                </>
              ) : (
                <p className="mt-3 text-xs text-muted-foreground">
                  本日の奉納は終了しました
                </p>
              )}
            </>
          );

          const className = cn(
            "block w-[168px] shrink-0 rounded-2xl bg-card p-3 text-left transition-transform active:scale-[0.97]",
            status.live ? "glow-primary" : "glow-card"
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
    </div>
  );
}
