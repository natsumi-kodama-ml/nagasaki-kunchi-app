"use client";

import { Suspense, useState } from "react";
import { EVENT, getVenue, sortedSessions } from "@/lib/data";
import { formatCountdown, sessionEnd, sessionStart } from "@/lib/time";
import { useNow } from "@/lib/use-now";
import { useFavorites } from "@/lib/favorites-context";
import { getVenueStatuses } from "@/lib/venue-status";
import { getAllTowns, getTownTracks } from "@/lib/town-tracker";
import { formatPatrolStops } from "@/lib/patrol-routes";
import { getMikoshiStatus } from "@/lib/mikoshi";
import { PageHeader } from "@/components/page-header";
import { VenueStatusRow } from "@/components/venue-status-row";
import { MiniMap, trackKey, trackStatusClassName, trackStatusLabel } from "@/components/mini-map";
import { getTownColor } from "@/lib/town-colors";
import { TimeTravelControl } from "@/components/time-travel-control";
import { Heart } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const TRACK_RANK: Record<string, number> = { live: 0, transit: 1, before: 2, done: 3 };

function HomeContent() {
  const now = useNow();
  const { favorites } = useFavorites();
  const [selectedTrackKey, setSelectedTrackKey] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"venue" | "town">("venue");

  if (!now) {
    return <div className="px-4 pt-8 text-sm text-muted-foreground">読み込み中…</div>;
  }

  const sessions = sortedSessions();
  const statuses = getVenueStatuses(now);

  const favoriteTowns = new Set(
    sessions.filter((s) => favorites.has(s.id)).map((s) => s.town)
  );
  const allTracks = getAllTowns()
    .flatMap((town) => getTownTracks(town, now))
    .sort((a, b) => {
      const rankDiff = TRACK_RANK[a.status] - TRACK_RANK[b.status];
      if (rankDiff !== 0) return rankDiff;
      const aTime = a.next ? sessionStart(a.next).getTime() : 0;
      const bTime = b.next ? sessionStart(b.next).getTime() : 0;
      return aTime - bTime;
    });

  const mikoshi = getMikoshiStatus(now);

  return (
    <div>
      <PageHeader eyebrow="参加者ガイド" title={`2025年${EVENT.name}`} />
      <div className="space-y-7 px-4 pt-6">
      <TimeTravelControl />

      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-medium text-foreground">今、どこで何が</h2>
          <p className="text-xs text-muted-foreground">
            長崎くんちは1日の中で複数の会場を移動しながら演目が奉納されます。今どこで何が行われているか確認できます。
          </p>
        </div>
        <MiniMap
          tracks={allTracks}
          mikoshiPosition={mikoshi.position}
          selectedTrackKey={selectedTrackKey}
          showLegend
          onSelectTrack={(key) =>
            setSelectedTrackKey((prev) => (prev === key ? null : key))
          }
        />

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setViewMode("venue")}
            className={cn(
              "flex-1 rounded-xl py-1.5 text-xs font-medium",
              viewMode === "venue"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground"
            )}
          >
            会場で見る
          </button>
          <button
            type="button"
            onClick={() => setViewMode("town")}
            className={cn(
              "flex-1 rounded-xl py-1.5 text-xs font-medium",
              viewMode === "town"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground"
            )}
          >
            踊町で見る
          </button>
        </div>

        {viewMode === "venue" ? (
          <VenueStatusRow statuses={statuses} now={now} />
        ) : (
          <div className="max-h-[380px] space-y-2 overflow-y-auto pr-0.5">
            <div className="glow-card rounded-2xl bg-card p-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: "var(--gold)" }}
                  />
                  御神輿(本社神輿)
                </span>
                <span className="text-[11px] font-medium" style={{ color: "var(--gold)" }}>
                  {mikoshi.label}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{mikoshi.detail}</p>
            </div>
            {allTracks.map((t) => (
              <button
                key={trackKey(t)}
                type="button"
                onClick={() =>
                  setSelectedTrackKey((prev) => (prev === trackKey(t) ? null : trackKey(t)))
                }
                className={cn(
                  "glow-card w-full rounded-2xl bg-card p-3 text-left transition-transform active:scale-[0.98]",
                  selectedTrackKey === trackKey(t) && "ring-2 ring-primary"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: getTownColor(t.town) }}
                    />
                    {t.town}
                    {t.groupLabel && (
                      <span className="text-xs text-muted-foreground">({t.groupLabel})</span>
                    )}
                    {favoriteTowns.has(t.town) && (
                      <Heart size={12} weight="fill" className="text-primary" />
                    )}
                  </span>
                  <span className={trackStatusClassName(t.status)}>
                    {trackStatusLabel(t.status, t.patrol.length > 0)}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {t.status === "live" && t.live && (
                    <>
                      {getVenue(t.live.venueId)?.name} で{t.live.title}
                      (終了まで{formatCountdown(sessionEnd(t.live), now)})
                    </>
                  )}
                  {t.status === "transit" && (
                    <>
                      {t.patrol.length > 0 && (
                        <>{formatPatrolStops(t.patrol)}を回っています・</>
                      )}
                      {t.next && (
                        <>
                          次は{getVenue(t.next.venueId)?.name}(
                          {formatCountdown(sessionStart(t.next), now)})
                        </>
                      )}
                    </>
                  )}
                  {t.status === "before" && t.next && (
                    <>
                      最初の奉納は{getVenue(t.next.venueId)?.name}(
                      {formatCountdown(sessionStart(t.next), now)})
                    </>
                  )}
                  {t.status === "done" && "本日の奉納は終了しました"}
                </p>
              </button>
            ))}
          </div>
        )}
      </section>

      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
