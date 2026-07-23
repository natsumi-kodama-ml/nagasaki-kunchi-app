import { sortedSessions } from "./data";
import { VENUE_POSITIONS, findHubPosition, lerpPosition } from "./geo";
import { getPatrolStops, jstHour, type PatrolStop } from "./patrol-routes";
import { sessionEnd, sessionStart, sessionStatus } from "./time";
import type { Session } from "./types";

export type TownTrackStatus = "live" | "transit" | "before" | "done";

export type TownTrack = {
  town: string;
  groupLabel: string | null;
  status: TownTrackStatus;
  position: { x: number; y: number };
  live: Session | null;
  prev: Session | null;
  next: Session | null;
  patrol: PatrolStop[];
};

export function getAllTowns(): string[] {
  const names = new Set<string>();
  sortedSessions().forEach((s) => names.add(s.town));
  return [...names];
}

// くんちナビと同様、庭先回り中は町がグループ(花組/月組など)ごとに別行動する場合
// グループ単位で別々のトラック(ピン)を返す。合流中(本場所)は1つにまとめる。
export function getTownTracks(town: string, now: Date): TownTrack[] {
  const sessions = sortedSessions().filter((s) => s.town === town);

  const live = sessions.find((s) => sessionStatus(s, now) === "live") ?? null;
  const doneSessions = sessions.filter((s) => sessionStatus(s, now) === "done");
  const prev = doneSessions.length > 0 ? doneSessions[doneSessions.length - 1] : null;
  const next = sessions.find((s) => sessionStatus(s, now) === "upcoming") ?? null;

  if (live) {
    return [
      {
        town,
        groupLabel: null,
        status: "live",
        position: VENUE_POSITIONS[live.venueId] ?? { x: 50, y: 50 },
        live,
        prev,
        next,
        patrol: [],
      },
    ];
  }

  if (prev && next) {
    const prevEnd = sessionEnd(prev).getTime();
    const nextStart = sessionStart(next).getTime();
    const t = (now.getTime() - prevEnd) / (nextStart - prevEnd || 1);
    const from = VENUE_POSITIONS[prev.venueId] ?? { x: 50, y: 50 };
    const to = VENUE_POSITIONS[next.venueId] ?? { x: 50, y: 50 };
    const patrol = getPatrolStops(town, prev.date, jstHour(now));

    if (patrol.length === 0) {
      return [
        {
          town,
          groupLabel: null,
          status: "transit",
          position: lerpPosition(from, to, t),
          live: null,
          prev,
          next,
          patrol: [],
        },
      ];
    }

    return patrol.map((stop) => ({
      town,
      groupLabel: stop.group,
      status: "transit" as const,
      position: findHubPosition(stop.route) ?? lerpPosition(from, to, t),
      live: null,
      prev,
      next,
      patrol: [stop],
    }));
  }

  if (next && !prev) {
    return [
      {
        town,
        groupLabel: null,
        status: "before",
        position: VENUE_POSITIONS[next.venueId] ?? { x: 50, y: 50 },
        live: null,
        prev: null,
        next,
        patrol: [],
      },
    ];
  }

  return [
    {
      town,
      groupLabel: null,
      status: "done",
      position: prev ? VENUE_POSITIONS[prev.venueId] ?? { x: 50, y: 50 } : { x: 50, y: 50 },
      live: null,
      prev,
      next: null,
      patrol: [],
    },
  ];
}
