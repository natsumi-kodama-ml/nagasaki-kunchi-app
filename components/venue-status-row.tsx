"use client";

import { useEffect } from "react";
import { MapPin, PersonSimpleWalk } from "@phosphor-icons/react";
import type { VenueStatus } from "@/lib/venue-status";
import { formatCountdown, minutesUntil, sessionEnd, sessionStart } from "@/lib/time";
import { getWalkMinutes } from "@/lib/geo";
import { useLocation } from "@/lib/location-context";
import { cn } from "@/lib/utils";

export function VenueStatusRow({
  statuses,
  now,
}: {
  statuses: VenueStatus[];
  now: Date;
}) {
  const { venueId, setVenueId } = useLocation();

  useEffect(() => {
    if (!venueId && statuses.length > 0) {
      setVenueId(statuses[0].venue.id);
    }
  }, [venueId, statuses, setVenueId]);

  return (
    <div className="-mx-4 overflow-x-auto px-4">
      <div className="flex gap-2.5 pb-1">
        {statuses.map((status) => {
          const selected = status.venue.id === venueId;
          const walkMin = venueId ? getWalkMinutes(venueId, status.venue.id) : 0;
          const reachable =
            !selected && status.next
              ? minutesUntil(sessionStart(status.next), now) >= walkMin + 3
              : null;

          return (
            <button
              key={status.venue.id}
              type="button"
              onClick={() => setVenueId(status.venue.id)}
              className={cn(
                "w-[168px] shrink-0 rounded-2xl bg-card p-3 text-left transition-transform active:scale-[0.97]",
                selected ? "glow-primary" : "glow-card"
              )}
            >
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <MapPin size={12} className={selected ? "text-primary" : ""} />
                <span className="truncate">{status.venue.name}</span>
                {selected && <span className="ml-auto text-[10px] text-primary">現在地</span>}
              </div>

              {!selected && (
                <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                  <PersonSimpleWalk size={12} />
                  徒歩{walkMin}分
                  {reachable === true && (
                    <span className="text-accent">・間に合う</span>
                  )}
                  {reachable === false && (
                    <span className="text-muted-foreground/70">・厳しいかも</span>
                  )}
                </div>
              )}

              {status.live ? (
                <>
                  <div className="mt-1.5">
                    <span className="stripe-badge inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold">
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
            </button>
          );
        })}
      </div>
    </div>
  );
}
