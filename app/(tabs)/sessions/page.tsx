"use client";

import { Suspense } from "react";
import { sortedSessions } from "@/lib/data";
import { formatDateLabel } from "@/lib/time";
import { useNow } from "@/lib/use-now";
import { SessionCard } from "@/components/session-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

function SessionsContent() {
  const now = useNow();
  const sessions = sortedSessions();

  const days = [1, 2, 3] as const;
  const dayLabels = days.map((day) => {
    const first = sessions.find((s) => s.day === day);
    return { day, label: first ? formatDateLabel(first) : `Day${day}` };
  });

  if (!now) {
    return <div className="px-4 pt-8 text-sm text-muted-foreground">読み込み中…</div>;
  }

  return (
    <div className="safe-top space-y-5 px-4 pt-6">
      <header>
        <p className="text-xs text-muted-foreground">全{sessions.length}演目</p>
        <h1 className="font-heading text-xl font-medium text-foreground">演目一覧</h1>
      </header>

      <Tabs defaultValue="1">
        <TabsList className="w-full bg-card">
          {dayLabels.map(({ day, label }) => (
            <TabsTrigger key={day} value={String(day)} className="flex-1">
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {dayLabels.map(({ day }) => (
          <TabsContent key={day} value={String(day)} className="mt-4 space-y-3">
            {sessions
              .filter((s) => s.day === day)
              .map((s) => (
                <SessionCard key={s.id} session={s} now={now} />
              ))}
          </TabsContent>
        ))}
      </Tabs>
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
