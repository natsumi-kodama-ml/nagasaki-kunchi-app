"use client";

import { Suspense } from "react";
import Link from "next/link";
import { Heart, ListBullets } from "@phosphor-icons/react";
import { sortedSessions } from "@/lib/data";
import { useNow } from "@/lib/use-now";
import { useFavorites } from "@/lib/favorites-context";
import { SessionCard } from "@/components/session-card";

function FavoritesContent() {
  const now = useNow();
  const { favorites } = useFavorites();
  const sessions = sortedSessions().filter((s) => favorites.has(s.id));

  if (!now) {
    return <div className="px-4 pt-8 text-sm text-muted-foreground">読み込み中…</div>;
  }

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
          <p className="text-xs text-muted-foreground">
            お気に入りの踊町が今どこにいるかは、ホームのマップで確認できます
          </p>
          <div className="space-y-3">
            {sessions.map((s) => (
              <SessionCard key={s.id} session={s} now={now} />
            ))}
          </div>
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
