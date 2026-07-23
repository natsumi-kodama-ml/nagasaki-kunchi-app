import { VENUES, sortedSessions } from "./data";
import type { Session, Venue } from "./types";
import { sessionStatus, sessionStart } from "./time";

export type VenueStatus = {
  venue: Venue;
  live: Session | null;
  next: Session | null;
};

export function getVenueStatuses(now: Date): VenueStatus[] {
  const sessions = sortedSessions();

  const statuses: VenueStatus[] = VENUES.map((venue) => {
    const venueSessions = sessions.filter((s) => s.venueId === venue.id);
    const live = venueSessions.find((s) => sessionStatus(s, now) === "live") ?? null;
    const next = venueSessions.find((s) => sessionStatus(s, now) === "upcoming") ?? null;
    return { venue, live, next };
  });

  return statuses.sort((a, b) => {
    const rank = (v: VenueStatus) => {
      if (v.live) return 0;
      if (v.next) return sessionStart(v.next).getTime();
      return Infinity;
    };
    return rank(a) - rank(b);
  });
}
