"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CaretDown, CaretUp, Clock } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const DAYS = [
  { date: "2026-10-07", label: "10/7(水)" },
  { date: "2026-10-08", label: "10/8(木)" },
  { date: "2026-10-09", label: "10/9(金)" },
];

const MIN_MINUTES = 6 * 60; // 6:00
const MAX_MINUTES = 20 * 60; // 20:00
const STEP = 10;

function formatMinutes(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function TimeTravelControl() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const demoNow = searchParams.get("demoNow");
  const [open, setOpen] = useState(Boolean(demoNow));

  const parsed = useMemo(() => {
    if (!demoNow) return null;
    const d = new Date(demoNow);
    if (Number.isNaN(d.getTime())) return null;
    const jstStr = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(d);
    const get = (t: string) => jstStr.find((p) => p.type === t)?.value ?? "";
    return {
      date: `${get("year")}-${get("month")}-${get("day")}`,
      minutes: Number(get("hour")) * 60 + Number(get("minute")),
    };
  }, [demoNow]);

  const day = parsed?.date ?? DAYS[0].date;
  const minutes = parsed?.minutes ?? 7 * 60;

  function apply(nextDay: string, nextMinutes: number) {
    const hh = String(Math.floor(nextMinutes / 60)).padStart(2, "0");
    const mm = String(nextMinutes % 60).padStart(2, "0");
    const params = new URLSearchParams(searchParams.toString());
    params.set("demoNow", `${nextDay}T${hh}:${mm}:00+09:00`);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function clear() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("demoNow");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <div className="glow-card overflow-hidden rounded-2xl bg-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between p-3"
      >
        <span className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Clock size={16} className="text-info" />
          時刻を変更して見る(テスト用)
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          {demoNow ? `${DAYS.find((d) => d.date === day)?.label ?? ""} ${formatMinutes(minutes)}` : "リアルタイム"}
          {open ? <CaretUp size={14} /> : <CaretDown size={14} />}
        </span>
      </button>

      {open && (
        <div className="space-y-3 border-t border-border p-3">
          <div className="flex gap-2">
            {DAYS.map((d) => (
              <button
                key={d.date}
                type="button"
                onClick={() => apply(d.date, minutes)}
                className={cn(
                  "flex-1 rounded-xl py-1.5 text-xs font-medium",
                  day === d.date && demoNow
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                )}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>6:00</span>
              <span className="text-sm font-medium text-foreground">
                {formatMinutes(minutes)}
              </span>
              <span>20:00</span>
            </div>
            <input
              type="range"
              min={MIN_MINUTES}
              max={MAX_MINUTES}
              step={STEP}
              value={minutes}
              onChange={(e) => apply(day, Number(e.target.value))}
              className="w-full"
              style={{ accentColor: "var(--primary)" }}
            />
          </div>

          <button
            type="button"
            onClick={clear}
            className="w-full rounded-xl bg-secondary py-2 text-xs font-medium text-foreground"
          >
            リアルタイムに戻す
          </button>
        </div>
      )}
    </div>
  );
}
