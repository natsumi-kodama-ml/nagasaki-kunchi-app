"use client";

import { Suspense } from "react";
import Link from "next/link";
import { CaretRight, MapPin } from "@phosphor-icons/react";
import { EVENT, sortedSessions } from "@/lib/data";
import { formatCountdown, formatDateLabel, sessionStart, sessionStatus } from "@/lib/time";
import { useNow } from "@/lib/use-now";
import { SessionCard } from "@/components/session-card";
import { OverviewSheet } from "@/components/overview-sheet";
import { LanternGlyph } from "@/components/lantern-glyph";

function HomeContent() {
  const now = useNow();

  if (!now) {
    return <div className="px-4 pt-8 text-sm text-muted-foreground">読み込み中…</div>;
  }

  const sessions = sortedSessions();
  const withStatus = sessions.map((s) => ({ s, status: sessionStatus(s, now) }));
  const live = withStatus.filter((x) => x.status === "live").map((x) => x.s);
  const upcoming = withStatus
    .filter((x) => x.status === "upcoming")
    .map((x) => x.s)
    .slice(0, 4);
  const allDone = withStatus.every((x) => x.status === "done");
  const firstSession = sessions[0];
  const beforeEventStarts = now < sessionStart(firstSession);

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

      {live.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-medium text-primary">今、奉納中</h2>
          <div className="space-y-3">
            {live.map((s) => (
              <SessionCard key={s.id} session={s} now={now} variant="live" />
            ))}
          </div>
        </section>
      )}

      {live.length === 0 && beforeEventStarts && (
        <section className="glow-primary relative space-y-2 overflow-hidden rounded-2xl bg-card p-5">
          <LanternGlyph className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 text-accent" />
          <p className="relative text-xs text-muted-foreground">開催まで</p>
          <p className="relative font-heading text-3xl font-medium text-primary">
            {formatCountdown(sessionStart(firstSession), now) || "本日開催"}
          </p>
          <p className="relative text-sm text-foreground/90">{EVENT.period}</p>
          <p className="relative text-xs text-muted-foreground">
            開催期間中はここに「今、奉納中」の演目が表示されます
          </p>
        </section>
      )}

      {live.length === 0 && !beforeEventStarts && allDone && (
        <section className="glow-card space-y-1 rounded-2xl bg-card p-5">
          <p className="font-heading text-lg font-medium text-foreground">
            今年の奉納は終了しました
          </p>
          <p className="text-sm text-muted-foreground">来年の開催をお楽しみに。</p>
        </section>
      )}

      {upcoming.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground">次の予定</h2>
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
