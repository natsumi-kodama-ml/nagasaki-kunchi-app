// 会場の簡易マップ座標(%, 実際の地理を簡略化した概念図)と、会場間の徒歩目安時間(推定)。
// 正確なGPS/地理データではなく、位置関係の雰囲気を伝えるための近似値。

export const VENUE_POSITIONS: Record<string, { x: number; y: number }> = {
  "suwa-shrine": { x: 40, y: 15 },
  "otabisho": { x: 8, y: 62 },
  "chuo-koen": { x: 28, y: 53 },
  "yasaka-shrine": { x: 52, y: 82 },
};

const WALK_MINUTES: Record<string, number> = {
  "suwa-shrine|chuo-koen": 20,
  "suwa-shrine|otabisho": 25,
  "suwa-shrine|yasaka-shrine": 28,
  "chuo-koen|otabisho": 13,
  "chuo-koen|yasaka-shrine": 15,
  "otabisho|yasaka-shrine": 22,
};

export function getWalkMinutes(fromVenueId: string, toVenueId: string): number {
  if (fromVenueId === toVenueId) return 0;
  const key1 = `${fromVenueId}|${toVenueId}`;
  const key2 = `${toVenueId}|${fromVenueId}`;
  return WALK_MINUTES[key1] ?? WALK_MINUTES[key2] ?? 20;
}

export function lerpPosition(
  a: { x: number; y: number },
  b: { x: number; y: number },
  t: number
): { x: number; y: number } {
  const clamped = Math.min(1, Math.max(0, t));
  return {
    x: a.x + (b.x - a.x) * clamped,
    y: a.y + (b.y - a.y) * clamped,
  };
}
