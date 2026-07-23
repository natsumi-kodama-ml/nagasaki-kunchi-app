"use client";

import { Suspense } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { CaretLeft, Clock, Heart, MapPin } from "@phosphor-icons/react";
import { getSession, getVenue, sortedSessions } from "@/lib/data";
import {
  formatCountdown,
  formatDateLabel,
  formatTimeRange,
  sessionEnd,
  sessionStart,
  sessionStatus,
} from "@/lib/time";
import { findHubPosition, getWalkMinutes, VENUE_POSITIONS } from "@/lib/geo";
import { formatPatrolStops, getPatrolRangeByHour } from "@/lib/patrol-routes";
import { getTownTracks } from "@/lib/town-tracker";
import { getTownColor } from "@/lib/town-colors";
import { useNow } from "@/lib/use-now";
import { useFavorites } from "@/lib/favorites-context";
import { DragonGlyph } from "@/components/dragon-glyph";
import { MiniMap } from "@/components/mini-map";
import { cn } from "@/lib/utils";

function SessionDetailContent() {
  const params = useParams<{ id: string }>();
  const session = getSession(params.id);
  const now = useNow();
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!session) {
    notFound();
  }

  const venue = getVenue(session.venueId);
  const status = now ? sessionStatus(session, now) : "upcoming";
  const active = isFavorite(session.id);
  const townRoute = sortedSessions().filter(
    (s) => s.town === session.town && s.date === session.date
  );
  const townTracks = now ? getTownTracks(session.town, now) : [];

  const routePositions: { x: number; y: number; isStop?: boolean }[] = [];
  let activeIndex = -1;
  townRoute.forEach((stop, i) => {
    if (stop.id === session.id) activeIndex = routePositions.length;
    routePositions.push({
      ...(VENUE_POSITIONS[stop.venueId] ?? { x: 50, y: 50 }),
      isStop: true,
    });
    const next = townRoute[i + 1];
    if (next) {
      const blocks = getPatrolRangeByHour(
        session.town,
        stop.date,
        Number(stop.start.split(":")[0]),
        Number(next.start.split(":")[0])
      );
      blocks.forEach((b) => {
        b.stops.forEach((s) => {
          const pos = findHubPosition(s.route);
          if (pos) routePositions.push({ ...pos, isStop: false });
        });
      });
    }
  });

  return (
    <div className="mx-auto min-h-screen max-w-md pb-28">
      <header className="safe-top flex items-center justify-between px-4 pt-5">
        <Link
          href="/sessions"
          aria-label="一覧に戻る"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-card glow-card"
        >
          <CaretLeft size={18} />
        </Link>
        <button
          type="button"
          aria-pressed={active}
          aria-label={active ? "参加予定から外す" : "参加予定に追加"}
          onClick={() => toggleFavorite(session.id)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-card glow-card"
        >
          <Heart size={18} weight={active ? "fill" : "regular"} className={active ? "text-primary" : ""} />
        </button>
      </header>

      <div className="relative mt-4 overflow-hidden px-4">
        <div className="relative overflow-hidden rounded-2xl bg-card p-5 glow-card">
          <DragonGlyph className="pointer-events-none absolute -right-8 -top-10 h-44 w-44 text-primary" />
          <div className="relative flex items-center gap-2">
            {status === "live" ? (
              <span className="flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">
                奉納中
              </span>
            ) : (
              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium text-accent">
                {session.kind}
              </span>
            )}
            <span className="text-[11px] text-muted-foreground">{formatDateLabel(session)}</span>
          </div>
          <h1 className="relative mt-2 font-heading text-2xl font-medium text-foreground">
            {session.title}
          </h1>
          <p className="relative flex items-center gap-1.5 text-sm text-muted-foreground">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: getTownColor(session.town) }}
            />
            {session.town}
          </p>

          <div className="relative mt-4 space-y-2 text-sm text-foreground/90">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-muted-foreground" />
              <span>{formatTimeRange(session)}</span>
              {now && (
                <span className="text-xs text-muted-foreground">
                  {status === "live"
                    ? `終了まで${formatCountdown(sessionEnd(session), now)}`
                    : status === "upcoming"
                      ? formatCountdown(sessionStart(session), now)
                      : "終了"}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-muted-foreground" />
              <span>{venue?.name}</span>
              <span className="text-xs text-muted-foreground">{venue?.role}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 px-4 pt-6">
        <section className="space-y-2">
          <h2 className="text-sm font-medium text-muted-foreground">演目について</h2>
          <p className="text-sm leading-relaxed text-foreground/90">{session.description}</p>
        </section>

        {session.highlights.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground">見どころ</h2>
            <div className="flex flex-wrap gap-2">
              {session.highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-full bg-card px-3 py-1.5 text-xs text-foreground/90 glow-card"
                >
                  {h}
                </span>
              ))}
            </div>
          </section>
        )}

        {townRoute.length > 1 && (
          <section className="space-y-3">
            <h2 className="text-sm font-medium text-muted-foreground">
              {session.town}の本日のルート
            </h2>
            <MiniMap
              tracks={townTracks}
              route={{
                positions: routePositions,
                activeIndex,
                color: getTownColor(session.town),
              }}
            />
            <div className="glow-card rounded-2xl bg-card p-4">
              {townRoute.map((stop, i) => {
                const stopStatus = now ? sessionStatus(stop, now) : "upcoming";
                const next = townRoute[i + 1];
                const walk = next ? getWalkMinutes(stop.venueId, next.venueId) : null;
                const patrolBlocks = next
                  ? getPatrolRangeByHour(
                      session.town,
                      stop.date,
                      Number(stop.start.split(":")[0]),
                      Number(next.start.split(":")[0])
                    )
                  : [];
                return (
                  <div key={stop.id}>
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "mt-1 h-2.5 w-2.5 shrink-0 rounded-full",
                          stopStatus === "live"
                            ? "bg-primary"
                            : stopStatus === "done"
                              ? "bg-muted-foreground/40"
                              : "border border-muted-foreground bg-transparent"
                        )}
                      />
                      <div className={cn("flex-1 pb-1", stop.id === session.id && "font-medium")}>
                        <p
                          className={cn(
                            "text-sm",
                            stopStatus === "done" ? "text-muted-foreground" : "text-foreground/90"
                          )}
                        >
                          {stop.start} {getVenue(stop.venueId)?.name}
                        </p>
                      </div>
                    </div>
                    {walk !== null && (
                      <div className="ml-[5px] space-y-1 border-l border-dashed border-muted-foreground/30 py-1 pl-[15px] text-[11px] text-muted-foreground">
                        {patrolBlocks.length > 0 ? (
                          patrolBlocks.map((b) => (
                            <p key={b.hour}>
                              {b.hour}時台 庭先回り: {formatPatrolStops(b.stops)}
                            </p>
                          ))
                        ) : (
                          <p>徒歩約{walk}分</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <Link href="/venues" className="glow-card flex items-center justify-between rounded-2xl bg-card p-4">
          <span className="text-sm text-foreground">会場・アクセスを見る</span>
          <MapPin size={16} className="text-info" />
        </Link>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[calc(env(safe-area-inset-bottom)+16px)]">
        <button
          type="button"
          onClick={() => toggleFavorite(session.id)}
          className={cn(
            "w-full max-w-md rounded-2xl py-3.5 text-center text-sm font-medium transition-colors glow-primary",
            active ? "bg-secondary text-foreground" : "bg-primary text-primary-foreground"
          )}
        >
          {active ? "参加予定に追加済み" : "参加予定に追加する"}
        </button>
      </div>
    </div>
  );
}

export default function SessionDetailPage() {
  return (
    <Suspense fallback={null}>
      <SessionDetailContent />
    </Suspense>
  );
}
