"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { CaretRight, MapPin } from "@phosphor-icons/react";
import { EVENT, getVenue, sortedSessions } from "@/lib/data";
import {
  formatCountdown,
  formatDateLabel,
  sessionEnd,
  sessionStart,
  sessionStatus,
} from "@/lib/time";
import { useNow } from "@/lib/use-now";
import { useLocation } from "@/lib/location-context";
import { useFavorites } from "@/lib/favorites-context";
import { getVenueStatuses } from "@/lib/venue-status";
import { getAllTowns, getTownTracks } from "@/lib/town-tracker";
import { formatPatrolStops } from "@/lib/patrol-routes";
import { getMikoshiStatus } from "@/lib/mikoshi";
import { SessionCard } from "@/components/session-card";
import { OverviewSheet } from "@/components/overview-sheet";
import { VenueStatusRow } from "@/components/venue-status-row";
import { MiniMap, trackKey, trackStatusClassName, trackStatusLabel } from "@/components/mini-map";
import { TimeTravelControl } from "@/components/time-travel-control";
import { Heart } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const TRACK_RANK: Record<string, number> = { live: 0, transit: 1, before: 2, done: 3 };

function HomeContent() {
  const now = useNow();
  const { venueId, setVenueId } = useLocation();
  const { favorites } = useFavorites();
  const [selectedTrackKey, setSelectedTrackKey] = useState<string | null>(null);

  if (!now) {
    return <div className="px-4 pt-8 text-sm text-muted-foreground">読み込み中…</div>;
  }

  const sessions = sortedSessions();
  const upcoming = sessions
    .filter((s) => sessionStatus(s, now) === "upcoming")
    .slice(0, 4);

  const statuses = getVenueStatuses(now);
  const selected = statuses.find((v) => v.venue.id === venueId) ?? statuses[0];

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
    <div className="safe-top space-y-7 px-4 pt-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">参加者ガイド</p>
          <h1 className="font-heading text-xl font-medium text-foreground">
            {EVENT.name}
          </h1>
        </div>
        <OverviewSheet />
      </header>

      <TimeTravelControl />

      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-medium text-foreground">会場から選ぶ</h2>
          <p className="text-xs text-muted-foreground">
            今いる(または行きたい)会場をタップすると、そこでの「今・次」が下に出ます
          </p>
        </div>
        <MiniMap
          tracks={allTracks}
          highlightVenueId={venueId}
          onSelectVenue={setVenueId}
          mikoshiPosition={mikoshi.position}
          selectedTrackKey={selectedTrackKey}
          showLegend
          onSelectTrack={(key) =>
            setSelectedTrackKey((prev) => (prev === key ? null : key))
          }
        />
        <p className="text-center text-xs text-muted-foreground">
          踊町のピンをタップすると、どのグループか表示されます
        </p>
        <VenueStatusRow statuses={statuses} now={now} />
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-medium text-foreground">踊町は今どこ?</h2>
          <p className="text-xs text-muted-foreground">
            お気に入りの踊町にはハート印が付きます
          </p>
        </div>
        <div className="space-y-2">
          <div className="glow-card rounded-2xl bg-card p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">御神輿(本社神輿)</span>
              <span className="text-[11px] font-medium" style={{ color: "var(--chart-4)" }}>
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
      </section>

      {selected && (
        <section className="space-y-3">
          <h2 className="text-sm font-medium text-primary">
            {selected.venue.name}の「今」
          </h2>
          {selected.live ? (
            <SessionCard session={selected.live} now={now} variant="live" />
          ) : selected.next ? (
            <SessionCard session={selected.next} now={now} />
          ) : (
            <div className="glow-card rounded-2xl bg-card p-5">
              <p className="text-sm text-foreground/90">
                {selected.venue.name}での奉納はすべて終了しました
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                他の会場を選ぶと、そこでの「今・次」を確認できます
              </p>
            </div>
          )}
        </section>
      )}

      {upcoming.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground">
            次の予定(全会場)
          </h2>
          <div className="space-y-3">
            {upcoming.map((s) => (
              <div key={s.id} className="space-y-1">
                <p className="pl-1 text-[11px] text-muted-foreground">
                  {formatDateLabel(s)}
                </p>
                <SessionCard session={s} now={now} />
              </div>
            ))}
          </div>
        </section>
      )}

      <Link
        href="/venues"
        className="glow-card flex items-center justify-between rounded-2xl bg-card p-4"
      >
        <span className="flex items-center gap-2 text-sm text-foreground">
          <MapPin size={18} className="text-info" />
          会場・アクセスを確認する
        </span>
        <CaretRight size={16} className="text-muted-foreground" />
      </Link>
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
