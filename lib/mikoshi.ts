import { VENUE_POSITIONS } from "./geo";

// お上り(諏訪神社→お旅所)・お下り(お旅所→諏訪神社)の目安時刻。
// 公式PDFには分単位の時刻が無かったため、一般的な進行を踏まえた見立て。
const OMIKOSHI_AGARI = new Date("2025-10-07T07:00:00+09:00"); // お上り(目安)
const OMIKOSHI_KUDARI = new Date("2025-10-09T08:00:00+09:00"); // お下り(目安)

export type MikoshiStatus = {
  label: string;
  detail: string;
  position: { x: number; y: number };
};

export function getMikoshiStatus(now: Date): MikoshiStatus {
  if (now < OMIKOSHI_AGARI) {
    return {
      label: "諏訪神社で待機中",
      detail: "お上り(諏訪神社→お旅所)は10/7早朝の予定",
      position: VENUE_POSITIONS["suwa-shrine"],
    };
  }
  if (now < OMIKOSHI_KUDARI) {
    return {
      label: "お旅所に鎮座中",
      detail: "お下り(お旅所→諏訪神社)は10/9朝の予定",
      position: VENUE_POSITIONS["otabisho"],
    };
  }
  return {
    label: "諏訪神社に還御",
    detail: "3日間の渡御を終え、諏訪神社に戻りました",
    position: VENUE_POSITIONS["suwa-shrine"],
  };
}
