import { sortedSessions } from "./data";
import { VENUE_POSITIONS, lerpPosition } from "./geo";
import { sessionEnd, sessionStart, sessionStatus } from "./time";
import type { Session } from "./types";

export type TownTrackStatus = "live" | "transit" | "before" | "done";

export type TownTrack = {
  town: string;
  status: TownTrackStatus;
  position: { x: number; y: number };
  live: Session | null;
  prev: Session | null;
  next: Session | null;
};

export function getAllTowns(): string[] {
  const names = new Set<string>();
  sortedSessions().forEach((s) => names.add(s.town));
  return [...names];
}

export function getTownTrack(town: string, now: Date): TownTrack {
  const sessions = sortedSessions().filter((s) => s.town === town);

  const live = sessions.find((s) => sessionStatus(s, now) === "live") ?? null;
  const doneSessions = sessions.filter((s) => sessionStatus(s, now) === "done");
  const prev = doneSessions.length > 0 ? doneSessions[doneSessions.length - 1] : null;
  const next = sessions.find((s) => sessionStatus(s, now) === "upcoming") ?? null;

  if (live) {
    return {
      town,
      status: "live",
      position: VENUE_POSITIONS[live.venueId] ?? { x: 50, y: 50 },
      live,
      prev,
      next,
    };
  }

  if (prev && next) {
    const prevEnd = sessionEnd(prev).getTime();
    const nextStart = sessionStart(next).getTime();
    const t = (now.getTime() - prevEnd) / (nextStart - prevEnd || 1);
    const from = VENUE_POSITIONS[prev.venueId] ?? { x: 50, y: 50 };
    const to = VENUE_POSITIONS[next.venueId] ?? { x: 50, y: 50 };
    return {
      town,
      status: "transit",
      position: lerpPosition(from, to, t),
      live: null,
      prev,
      next,
    };
  }

  if (next && !prev) {
    return {
      town,
      status: "before",
      position: VENUE_POSITIONS[next.venueId] ?? { x: 50, y: 50 },
      live: null,
      prev: null,
      next,
    };
  }

  return {
    town,
    status: "done",
    position: prev ? VENUE_POSITIONS[prev.venueId] ?? { x: 50, y: 50 } : { x: 50, y: 50 },
    live: null,
    prev,
    next: null,
  };
}
