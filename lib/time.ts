import type { Session } from "./types";

export type SessionStatus = "live" | "upcoming" | "done";

export function sessionStart(s: Session): Date {
  return new Date(`${s.date}T${s.start}:00+09:00`);
}

export function sessionEnd(s: Session): Date {
  return new Date(`${s.date}T${s.end}:00+09:00`);
}

export function sessionStatus(s: Session, now: Date): SessionStatus {
  const start = sessionStart(s);
  const end = sessionEnd(s);
  if (now >= start && now <= end) return "live";
  if (now < start) return "upcoming";
  return "done";
}

export function formatCountdown(target: Date, now: Date): string {
  const diffMs = target.getTime() - now.getTime();
  if (diffMs <= 0) return "";
  const diffMin = Math.round(diffMs / 60000);
  if (diffMin < 60) return `あと${diffMin}分`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `あと${diffHour}時間`;
  const diffDay = Math.floor(diffHour / 24);
  return `あと${diffDay}日`;
}

export function formatTimeRange(s: Session): string {
  return `${s.start}〜${s.end}`;
}

export function formatDateLabel(s: Session): string {
  const d = new Date(`${s.date}T00:00:00+09:00`);
  const weekday = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
  return `${d.getMonth() + 1}/${d.getDate()}(${weekday})`;
}

export function resolveDemoNow(demoNowParam: string | null): Date {
  if (demoNowParam) {
    const parsed = new Date(demoNowParam);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return new Date();
}
