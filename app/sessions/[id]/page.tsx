"use client";

import { Suspense } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { CaretLeft, Clock, Heart, MapPin } from "@phosphor-icons/react";
import { getSession, getVenue } from "@/lib/data";
import {
  formatCountdown,
  formatDateLabel,
  formatTimeRange,
  sessionEnd,
  sessionStart,
  sessionStatus,
} from "@/lib/time";
import { useNow } from "@/lib/use-now";
import { useFavorites } from "@/lib/favorites-context";
import { LanternGlyph } from "@/components/lantern-glyph";
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
          <LanternGlyph className="pointer-events-none absolute -right-8 -top-10 h-44 w-44 text-primary" />
          <div className="relative flex items-center gap-2">
            {status === "live" ? (
              <span className="flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-medium text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
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
          <p className="relative text-sm text-muted-foreground">{session.town}</p>

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

        <Link href="/venues" className="glow-card flex items-center justify-between rounded-2xl bg-card p-4">
          <span className="text-sm text-foreground">会場・アクセスを見る</span>
          <MapPin size={16} className="text-accent" />
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
