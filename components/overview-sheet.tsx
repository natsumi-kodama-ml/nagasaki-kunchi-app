"use client";

import { Info } from "@phosphor-icons/react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { EVENT } from "@/lib/data";

export function OverviewSheet() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <button
            type="button"
            aria-label="イベント概要を見る"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-card/80 text-foreground/80 glow-card"
          />
        }
      >
        <Info size={20} />
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="max-h-[85vh] overflow-y-auto rounded-t-3xl border-t-0 bg-popover glow-card"
      >
        <SheetHeader>
          <SheetTitle className="text-lg">{EVENT.name}</SheetTitle>
          <SheetDescription>{EVENT.since}から続く{EVENT.shrine}の秋季大祭</SheetDescription>
        </SheetHeader>

        <div className="space-y-5 px-4 pb-8">
          <p className="text-sm leading-relaxed text-foreground/90">{EVENT.overview}</p>

          <div>
            <h3 className="mb-2 text-sm font-medium text-accent">開催日程</h3>
            <p className="text-sm text-foreground/90">{EVENT.period}</p>
          </div>

          <div className="space-y-3">
            {EVENT.schedule.map((s) => (
              <div key={s.label} className="rounded-xl bg-card p-3">
                <p className="text-sm font-medium text-foreground">{s.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.detail}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-card p-3 text-xs text-muted-foreground">
            <p>主催: {EVENT.organizer}</p>
            <p>お問い合わせ: {EVENT.contact}</p>
            <p className="mt-1">{EVENT.note}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
