// 会場の簡易マップ座標(%, 実際の地理を簡略化した概念図)と、会場間の徒歩目安時間(推定)。
// 正確なGPS/地理データではなく、位置関係の雰囲気を伝えるための近似値。

export const VENUE_POSITIONS: Record<string, { x: number; y: number }> = {
  "suwa-shrine": { x: 69, y: 11 },
  "otabisho": { x: 14, y: 67 },
  "chuo-koen": { x: 47, y: 55 },
  "yasaka-shrine": { x: 80, y: 85 },
};

// 庭先回りで頻出する主要な地名の座標(%)。公式PDFの庭先回りMAP画像を元に読み取った近似値。
// 全ての地名を網羅しているわけではなく、よく登場する主要ポイントのみ。
export const HUB_POSITIONS: Record<string, { x: number; y: number }> = {
  "かもめ広場": { x: 20, y: 23 },
  "大黒町": { x: 25, y: 20 },
  "五島町": { x: 30, y: 44 },
  "恵美須町": { x: 34, y: 35 },
  "興善町": { x: 35, y: 46 },
  "桜町": { x: 49, y: 35 },
  "上町": { x: 54, y: 27 },
  "玉園町": { x: 54, y: 22 },
  "市役所": { x: 65, y: 41 },
  "魚の町": { x: 63, y: 45 },
  "栄町": { x: 55, y: 51 },
  "桶屋町": { x: 66, y: 35 },
  "古町": { x: 71, y: 36 },
  "勝山町": { x: 64, y: 32 },
  "八幡町": { x: 85, y: 35 },
  "麹屋町": { x: 88, y: 44 },
  "万才町": { x: 40, y: 58 },
  "賑町": { x: 48, y: 61 },
  "築町": { x: 39, y: 66 },
  "江戸町": { x: 30, y: 72 },
  "出島": { x: 28, y: 75 },
  "新地町": { x: 35, y: 82 },
  "銅座町": { x: 39, y: 79 },
  "浜町": { x: 43, y: 71 },
  "万屋町": { x: 80, y: 71 },
  "本石灰町": { x: 66, y: 82 },
  "油屋町": { x: 73, y: 81 },
  "鍛冶屋町": { x: 78, y: 78 },
  "丸山町": { x: 74, y: 88 },
  "船大工町": { x: 70, y: 86 },
  "湊公園": { x: 31, y: 91 },
};

// route文字列に含まれる地名からHUB_POSITIONSを検索(最初に見つかったもの)。
export function findHubPosition(route: string): { x: number; y: number } | null {
  for (const [name, pos] of Object.entries(HUB_POSITIONS)) {
    if (route.includes(name)) return pos;
  }
  return null;
}

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
