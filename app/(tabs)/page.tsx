"use client";

import { Suspense } from "react";
import Link from "next/link";
import { CaretRight, MapPin } from "@phosphor-icons/react";
import { EVENT, sortedSessions } from "@/lib/data";
import { formatDateLabel, sessionStatus } from "@/lib/time";
import { useNow } from "@/lib/use-now";
import { useLocation } from "@/lib/location-context";
import { getVenueStatuses } from "@/lib/venue-status";
import { SessionCard } from "@/components/session-card";
import { OverviewSheet } from "@/components/overview-sheet";
import { VenueStatusRow } from "@/components/venue-status-row";

function HomeContent() {
  const now = useNow();
  const { venueId } = useLocation();

  if (!now) {
    return <div className="px-4 pt-8 text-sm text-muted-foreground">読み込み中…</div>;
  }

  const sessions = sortedSessions();
  const upcoming = sessions
    .filter((s) => sessionStatus(s, now) === "upcoming")
    .slice(0, 4);

  const statuses = getVenueStatuses(now);
  const selected = statuses.find((v) => v.venue.id === venueId) ?? statuses[0];

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

      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-medium text-foreground">会場から選ぶ</h2>
          <p className="text-xs text-muted-foreground">
            今いる(または行きたい)会場をタップすると、そこでの「今・次」が下に出ます
          </p>
        </div>
        <VenueStatusRow statuses={statuses} now={now} />
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
          <MapPin size={18} className="text-accent" />
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
