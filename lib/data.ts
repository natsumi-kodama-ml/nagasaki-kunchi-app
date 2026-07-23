import type { Session, Venue } from "./types";

export const EVENT = {
  name: "長崎くんち",
  shrine: "諏訪神社",
  period: "2026年10月7日(水)〜9日(金)",
  since: "寛永11年(1634年)",
  overview:
    "長崎くんちは諏訪神社の秋季大祭。氏子である「踊町」が7年に一度の持ち回りで、龍踊りや川船などの「演し物」を神社や市内各所の会場で奉納します。",
  schedule: [
    {
      label: "10/7(水) 前日",
      detail: "諏訪神社にて奉納踊り(本場所)。早朝から各踊町が奉納。",
    },
    {
      label: "10/8(木) 中日",
      detail: "お旅所・八坂神社などの会場で庭先回り・奉納が続く。",
    },
    {
      label: "10/9(金) 後日",
      detail: "お上り・お下りの渡御とともに祭りが終盤へ。",
    },
  ],
  note: "演目・会場・時間は導線確認用のサンプルデータです。",
  organizer: "長崎伝統芸能振興会(長崎商工会議所内)",
  contact: "095-822-0111",
};

export const VENUES: Venue[] = [
  {
    id: "suwa-shrine",
    name: "諏訪神社",
    kana: "すわじんじゃ",
    role: "本場所(奉納踊りのメイン会場)",
    address: "長崎県長崎市上西山町18-15",
    access: ["長崎電軌「諏訪神社」電停から徒歩5分", "長崎バス「諏訪神社前」から徒歩3分"],
    mapQuery: "諏訪神社 長崎",
    note: "境内は石段が多く混雑します。動きやすい靴で。",
  },
  {
    id: "otabisho",
    name: "お旅所",
    kana: "おたびしょ",
    role: "脇場所",
    address: "長崎県長崎市元船町",
    access: ["長崎電軌「大波止」電停から徒歩4分"],
    mapQuery: "長崎 お旅所",
  },
  {
    id: "yasaka-shrine",
    name: "八坂神社",
    kana: "やさかじんじゃ",
    role: "脇場所",
    address: "長崎県長崎市鍛冶屋町8-53",
    access: ["長崎電軌「思案橋」電停から徒歩8分"],
    mapQuery: "八坂神社 長崎",
  },
  {
    id: "chuo-koen",
    name: "中央公園会場",
    kana: "ちゅうおうこうえんかいじょう",
    role: "桟敷席あり(有料観覧エリア)",
    address: "長崎県長崎市浜町",
    access: ["長崎電軌「観光通」電停から徒歩3分"],
    mapQuery: "長崎市中央公園",
    note: "有料観覧席は事前申込制です。",
  },
];

export const SESSIONS: Session[] = [
  {
    id: "s1",
    title: "龍踊り",
    kind: "奉納踊り",
    town: "本篭町",
    venueId: "suwa-shrine",
    day: 1,
    date: "2026-10-07",
    start: "08:00",
    end: "08:30",
    summary: "本場所での奉納。玉追いの龍が境内を駆ける迫力の演目。",
    description:
      "「じゃおどり」とも呼ばれる長崎くんちの代表的な演目。玉を追う龍が唸り声とともに境内を舞います。囲むように観覧できる本場所での奉納は迫力が違います。",
    highlights: ["玉追いの舞", "囲み観覧が可能", "写真撮影の名所"],
  },
  {
    id: "s2",
    title: "コッコデショ",
    kind: "奉納踊り",
    town: "玉園町",
    venueId: "suwa-shrine",
    day: 1,
    date: "2026-10-07",
    start: "08:45",
    end: "09:15",
    summary: "太鼓山を担ぎ手が空中に投げ上げる勇壮な演目。",
    description:
      "重さ約1トンの太鼓山を、担ぎ手が息を合わせて空中に投げ上げます。「ヨイヤァ」の掛け声とともに宙に浮く瞬間は必見。",
    highlights: ["太鼓山の空中投げ上げ", "掛け声が見どころ"],
  },
  {
    id: "s3",
    title: "川船",
    kind: "奉納踊り",
    town: "江戸町",
    venueId: "suwa-shrine",
    day: 1,
    date: "2026-10-07",
    start: "09:30",
    end: "10:00",
    summary: "網を投げる勇壮な船頭さばきが見どころの演目。",
    description:
      "漁師町らしい演目で、船に乗った若者が網を投げる仕草を披露します。船を引く「音頭取り」の掛け声も見どころ。",
    highlights: ["網投げの所作", "音頭取りの掛け声"],
  },
  {
    id: "s4",
    title: "傘鉾巡行",
    kind: "庭先回り",
    town: "諸踊町合同",
    venueId: "otabisho",
    day: 1,
    date: "2026-10-07",
    start: "13:00",
    end: "14:30",
    summary: "各踊町の傘鉾がお旅所周辺を巡行。",
    description:
      "踊町の先頭を飾る「傘鉾」が周辺を巡行します。豪華な飾りは各町ごとに異なり、見比べるのも楽しみ方の一つです。",
    highlights: ["町ごとの飾りの違い", "巡行ルートで近距離観覧"],
  },
  {
    id: "s5",
    title: "本踊り",
    kind: "奉納踊り",
    town: "諏訪町",
    venueId: "yasaka-shrine",
    day: 2,
    date: "2026-10-08",
    start: "10:00",
    end: "10:30",
    summary: "艶やかな衣装で舞う伝統的な日本舞踊。",
    description:
      "女形の舞方が艶やかな衣装で舞う、くんちの中でも華やかな演目。三味線と唄に合わせたゆるやかな所作が見どころです。",
    highlights: ["華やかな衣装", "三味線と唄"],
  },
  {
    id: "s6",
    title: "御座船",
    kind: "奉納踊り",
    town: "榎津町",
    venueId: "chuo-koen",
    day: 2,
    date: "2026-10-08",
    start: "14:00",
    end: "14:30",
    summary: "極彩色の御座船が桟敷席前を進む豪華な演目。",
    description:
      "朱と金で彩られた御座船が桟敷席前をゆっくりと進みます。船体の彫刻や装飾の細部まで見応えがあります。",
    highlights: ["極彩色の装飾", "有料桟敷席から近距離観覧"],
  },
  {
    id: "s7",
    title: "お上り渡御",
    kind: "お上り・お下り",
    town: "諸踊町合同",
    venueId: "suwa-shrine",
    day: 3,
    date: "2026-10-09",
    start: "07:00",
    end: "08:00",
    summary: "神輿が諏訪神社へ渡御する祭りの締めの儀式。",
    description:
      "3日間の奉納を終え、神輿が諏訪神社へ戻る渡御の儀。祭り全体を締める神聖な場面です。",
    highlights: ["神輿渡御", "祭り最終日の締めの場面"],
  },
];

export function getVenue(id: string): Venue | undefined {
  return VENUES.find((v) => v.id === id);
}

export function getSession(id: string): Session | undefined {
  return SESSIONS.find((s) => s.id === id);
}

export function sortedSessions(): Session[] {
  return [...SESSIONS].sort((a, b) =>
    `${a.date}T${a.start}`.localeCompare(`${b.date}T${b.start}`)
  );
}
