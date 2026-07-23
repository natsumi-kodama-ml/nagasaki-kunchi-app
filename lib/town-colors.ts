// 踊町ごとの識別色。マップ上でどの町のピンかを色だけで区別できるようにする。
export const TOWN_COLORS: Record<string, string> = {
  "新橋町": "#2C6FBB",
  "諏訪町": "#2E8B57",
  "新大工町": "#A83E64",
  "榎津町": "#2C4A76",
  "西古川町": "#7B4B94",
  "賑町": "#B8860B",
};

const FALLBACK_COLOR = "#736C63";

export function getTownColor(town: string): string {
  return TOWN_COLORS[town] ?? FALLBACK_COLOR;
}
