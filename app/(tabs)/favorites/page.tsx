"use client";

import { Suspense } from "react";
import Link from "next/link";
import { Heart, ListBullets } from "@phosphor-icons/react";
import { getVenue, sortedSessions } from "@/lib/data";
import { useNow } from "@/lib/use-now";
import { useFavorites } from "@/lib/favorites-context";
import { getTownTrack } from "@/lib/town-tracker";
import { formatPatrolStops } from "@/lib/patrol-routes";
import { formatCountdown, sessionEnd, sessionStart } from "@/lib/time";
import { SessionCard } from "@/components/session-card";
import { MiniMap, trackStatusClassName, trackStatusLabel } from "@/components/mini-map";

function FavoritesContent() {
  const now = useNow();
  const { favorites } = useFavorites();
  const sessions = sortedSessions().filter((s) => favorites.has(s.id));

  if (!now) {
    return <div className="px-4 pt-8 text-sm text-muted-foreground">読み込み中…</div>;
  }

  const favoriteTowns = [...new Set(sessions.map((s) => s.town))];
  const tracks = favoriteTowns.map((town) => getTownTrack(town, now));

  return (
    <div className="safe-top space-y-5 px-4 pt-6">
      <header>
        <p className="text-xs text-muted-foreground">参加予定</p>
        <h1 className="font-heading text-xl font-medium text-foreground">お気に入り</h1>
      </header>

      {sessions.length === 0 ? (
        <div className="glow-card flex flex-col items-center gap-3 rounded-2xl bg-card px-6 py-12 text-center">
          <Heart size={32} className="text-muted-foreground" />
          <p className="text-sm text-foreground/90">まだお気に入りがありません</p>
          <p className="text-xs text-muted-foreground">
            気になる演目のハートをタップすると、ここに表示されます
          </p>
          <Link
            href="/sessions"
            className="mt-2 flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground"
          >
            <ListBullets size={14} />
            演目一覧を見る
          </Link>
        </div>
      ) : (
        <>
          <section className="space-y-3">
            <div>
              <h2 className="text-sm font-medium text-foreground">
                お気に入りの踊町は今どこ?
              </h2>
              <p className="text-xs text-muted-foreground">
                会場間の移動時間から推定した、現在の位置イメージです
              </p>
            </div>
            <MiniMap tracks={tracks} />
            <div className="space-y-2">
              {tracks.map((t) => (
                <div key={t.town} className="glow-card rounded-2xl bg-card p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{t.town}</p>
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
                        {t.patrol.length > 0 && <>{formatPatrolStops(t.patrol)}を回っています・</>}
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
                        最初の奉納は{getVenue(t.next.venueId)?.name}({formatCountdown(sessionStart(t.next), now)})
                      </>
                    )}
                    {t.status === "done" && "また来年の奉納をお楽しみに"}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium text-muted-foreground">お気に入り一覧</h2>
            <div className="space-y-3">
              {sessions.map((s) => (
                <SessionCard key={s.id} session={s} now={now} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default function FavoritesPage() {
  return (
    <Suspense fallback={null}>
      <FavoritesContent />
    </Suspense>
  );
}
