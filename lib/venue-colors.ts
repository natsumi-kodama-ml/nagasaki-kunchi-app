// 会場ごとの識別色。踊町の識別色(town-colors.ts)とは別パレットで、
// マップのピンとカードのドットを同じ色で統一するために使う。
export const VENUE_COLORS: Record<string, string> = {
  "suwa-shrine": "#8B5A2B",
  "otabisho": "#1F6F5C",
  "yasaka-shrine": "#6B7280",
  "chuo-koen": "#B45309",
};

const FALLBACK_COLOR = "#736C63";

export function getVenueColor(venueId: string): string {
  return VENUE_COLORS[venueId] ?? FALLBACK_COLOR;
}
