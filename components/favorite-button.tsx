"use client";

import { Heart } from "@phosphor-icons/react";
import { useFavorites } from "@/lib/favorites-context";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  sessionId,
  className,
}: {
  sessionId: string;
  className?: string;
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(sessionId);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "参加予定から外す" : "参加予定に追加"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(sessionId);
      }}
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary transition-colors active:scale-95",
        className
      )}
    >
      <Heart
        size={20}
        weight={active ? "fill" : "regular"}
        className={active ? "text-primary" : "text-foreground/80"}
      />
    </button>
  );
}
