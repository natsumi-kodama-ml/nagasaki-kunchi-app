"use client";

import { Suspense, useState } from "react";
import { sortedSessions, VENUES, TOWN_PROFILES } from "@/lib/data";
import { formatDateLabel } from "@/lib/time";
import { useNow } from "@/lib/use-now";
import { SessionCard } from "@/components/session-card";
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getVenueColor } from "@/lib/venue-colors";
import { getTownColor } from "@/lib/town-colors";
import { cn } from "@/lib/utils";

function SessionsContent() {
  const now = useNow();
  const sessions = sortedSessions();
  const [venueFilter, setVenueFilter] = useState<string | null>(null);
  const [townFilter, setTownFilter] = useState<string | null>(null);

  const days = [1, 2, 3] as const;
  const dayLabels = days.map((day) => {
    const first = sessions.find((s) => s.day === day);
    return { day, label: first ? formatDateLabel(first) : `Day${day}` };
  });

  if (!now) {
    return <div className="px-4 pt-8 text-sm text-muted-foreground">読み込み中…</div>;
  }

  const filtered = sessions
    .filter((s) => !venueFilter || s.venueId === venueFilter)
    .filter((s) => !townFilter || s.town === townFilter);

  return (
    <div>
      <PageHeader eyebrow={`全${sessions.length}演目`} title="演目一覧" />
      <div className="space-y-4 px-4 pt-6">
        <div className="space-y-1.5">
        <p className="text-[11px] font-medium text-muted-foreground">会場で絞る</p>
        <div className="-mx-4 overflow-x-auto px-4">
          <div className="flex gap-2 pb-1">
            <button
              type="button"
              onClick={() => setVenueFilter(null)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium",
                venueFilter === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground"
              )}
            >
              すべての会場
            </button>
            {VENUES.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVenueFilter((prev) => (prev === v.id ? null : v.id))}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium",
                  venueFilter === v.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                )}
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor:
                      venueFilter === v.id ? "currentColor" : getVenueColor(v.id),
                  }}
                />
                {v.name}
              </button>
            ))}
          </div>
        </div>
        </div>

        <div className="space-y-1.5">
        <p className="text-[11px] font-medium text-muted-foreground">踊町で絞る</p>
        <div className="-mx-4 overflow-x-auto px-4">
          <div className="flex gap-2 pb-1">
            <button
              type="button"
              onClick={() => setTownFilter(null)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium",
                townFilter === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground"
              )}
            >
              すべての踊町
            </button>
            {TOWN_PROFILES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTownFilter((prev) => (prev === t.name ? null : t.name))}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium",
                  townFilter === t.name
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                )}
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{
                    backgroundColor:
                      townFilter === t.name ? "currentColor" : getTownColor(t.name),
                  }}
                />
                {t.name}
              </button>
            ))}
          </div>
        </div>
        </div>

        <Tabs defaultValue="1">
          <TabsList className="w-full bg-card">
            {dayLabels.map(({ day, label }) => (
              <TabsTrigger key={day} value={String(day)} className="flex-1">
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {dayLabels.map(({ day }) => {
            const daySessions = filtered.filter((s) => s.day === day);
            return (
              <TabsContent key={day} value={String(day)} className="mt-4 space-y-3">
                {daySessions.length > 0 ? (
                  daySessions.map((s) => <SessionCard key={s.id} session={s} now={now} />)
                ) : (
                  <p className="pt-6 text-center text-sm text-muted-foreground">
                    この日・条件では奉納がありません
                  </p>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}

export default function SessionsPage() {
  return (
    <Suspense fallback={null}>
      <SessionsContent />
    </Suspense>
  );
}
