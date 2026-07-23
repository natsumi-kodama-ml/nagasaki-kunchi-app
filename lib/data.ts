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
      label: "10/7(水) 前日(まえび)",
      detail: "諏訪神社→中央公園→お旅所の順で全6踊町が奉納。夕方にも諏訪神社→中央公園で奉納。",
    },
    {
      label: "10/8(木) 中日(なかび)",
      detail: "八坂神社→中央公園の順で全6踊町が奉納。",
    },
    {
      label: "10/9(金) 後日(あとび)",
      detail: "お旅所→諏訪神社の順で全6踊町が奉納し、3日間の奉納を終える。",
    },
  ],
  note: "演目・会場・披露時刻は令和7年(2025年)の実績を参考にした参考データです。踊町は年により変わるため、当日は必ず公式情報をご確認ください。",
  organizer: "長崎伝統芸能振興会(長崎商工会議所内)",
  contact: "095-822-0111",
};

export const GLOSSARY = [
  {
    term: "踊町(おどりちょう)",
    detail:
      "演し物を奉納する町内会。長崎市内の全59町が7年に一度の持ち回りで担当する。",
  },
  {
    term: "演し物(だしもの)",
    detail: "踊町が奉納する演目。龍踊り・川船・本踊りなど町ごとに異なる。",
  },
  {
    term: "本場所(ほんばしょ)",
    detail: "諏訪神社・お旅所・八坂神社・中央公園など、演し物が正式に奉納される会場。",
  },
  {
    term: "庭先回り(にわさきまわり)",
    detail:
      "本場所での奉納の間に、踊町が日頃お世話になっている商店や企業などを回り、演し物を披露すること。",
  },
  {
    term: "お上り・お下り",
    detail:
      "諏訪神社の御神輿が、祭りの間だけお旅所へ渡御(お上り)し、最終日に諏訪神社へ戻る(お下り)こと。",
  },
] as const;

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
    role: "本場所",
    address: "長崎県長崎市元船町",
    access: ["長崎電軌「大波止」電停から徒歩4分"],
    mapQuery: "長崎 お旅所",
  },
  {
    id: "yasaka-shrine",
    name: "八坂神社",
    kana: "やさかじんじゃ",
    role: "本場所",
    address: "長崎県長崎市鍛冶屋町8-53",
    access: ["長崎電軌「思案橋」電停から徒歩8分"],
    mapQuery: "八坂神社 長崎",
  },
  {
    id: "chuo-koen",
    name: "中央公園会場",
    kana: "ちゅうおうこうえんかいじょう",
    role: "本場所・桟敷席あり(有料観覧エリア)",
    address: "長崎県長崎市浜町",
    access: ["長崎電軌「観光通」電停から徒歩3分"],
    mapQuery: "長崎市中央公園",
    note: "有料観覧席は事前申込制です。",
  },
];

type Town = {
  id: string;
  name: string;
  program: string;
  summary: string;
  description: string;
  highlights: string[];
};

const TOWNS: Record<string, Town> = {
  shinbashi: {
    id: "shinbashi",
    name: "新橋町",
    program: "本踊・阿蘭陀万才",
    summary: "艶やかな本踊と、異国情緒あふれる阿蘭陀万才の二本立て。",
    description:
      "女形の舞方が舞う「本踊」と、出島にゆかりのある異国風の掛け合い芸「阿蘭陀万才」を続けて奉納。長崎らしい南蛮文化の名残が感じられる演目です。",
    highlights: ["華やかな本踊の衣装", "異国風の阿蘭陀万才"],
  },
  suwamachi: {
    id: "suwamachi",
    name: "諏訪町",
    program: "龍踊",
    summary: "玉追いの龍が唸り声とともに境内を駆ける、くんち最大の人気演目。",
    description:
      "「じゃおどり」とも呼ばれる長崎くんちの代表的な演目。玉を追う龍が唸り声とともに舞い、本場所を取り囲む観覧席から一体感のある迫力を楽しめます。",
    highlights: ["玉追いの舞", "囲み観覧の迫力", "写真撮影の名所"],
  },
  shindaiku: {
    id: "shindaiku",
    name: "新大工町",
    program: "詩舞・曳壇尻",
    summary: "詩を舞う優雅な詩舞と、豪華な山車「壇尻」を曳く迫力の二本立て。",
    description:
      "漢詩に合わせて舞う「詩舞」と、装飾を施した山車「壇尻(だんじり)」を曳き回す「曳壇尻」を奉納。静と動、両方の見どころがある演目です。",
    highlights: ["詩舞の優雅な所作", "壇尻の豪華な装飾"],
  },
  enokizu: {
    id: "enokizu",
    name: "榎津町",
    program: "川船",
    summary: "網を投げる勇壮な船頭さばきが見どころの演目。",
    description:
      "漁師町らしい演目で、船に乗った若者が網を投げる仕草を披露します。船を曳く「音頭取り」の掛け声とともに、勇壮な船さばきが見どころです。",
    highlights: ["網投げの所作", "音頭取りの掛け声"],
  },
  nishikogawa: {
    id: "nishikogawa",
    name: "西古川町",
    program: "櫓太鼓・本踊",
    summary: "太鼓の力強い響きと、艶やかな本踊の二本立て。",
    description:
      "威勢のよい「櫓太鼓」の演奏に続き、艶やかな衣装での「本踊」を奉納。太鼓の響きと舞の華やかさ、両方を一度に楽しめる演目です。",
    highlights: ["櫓太鼓の力強い響き", "艶やかな本踊"],
  },
  nigiwai: {
    id: "nigiwai",
    name: "賑町",
    program: "大漁万祝恵美須船",
    summary: "大漁旗を掲げた恵美須船が福を運ぶ、縁起のよい演目。",
    description:
      "恵美須(えびす)様を祀った船が大漁旗を掲げて練り歩く演目。豊漁と商売繁盛への願いが込められた、縁起のよい奉納です。",
    highlights: ["大漁旗の飾り", "恵美須様にちなむ縁起物"],
  },
};

// 令和7年(2025年)長崎くんち踊町庭先回りスケジュール(長崎伝統芸能振興会 公式PDF)より、
// 本場所(○印)の披露時刻を抜粋。日付は導線確認用に2026年10月7日〜9日に読み替えている。
const SCHEDULE: Array<{
  town: keyof typeof TOWNS;
  day: 1 | 2 | 3;
  date: string;
  venueId: string;
  start: string;
}> = [
  // 10/7 前日(まえび) 朝: 諏訪神社→中央公園→お旅所
  { town: "shinbashi", day: 1, date: "2026-10-07", venueId: "suwa-shrine", start: "07:00" },
  { town: "shinbashi", day: 1, date: "2026-10-07", venueId: "chuo-koen", start: "08:10" },
  { town: "shinbashi", day: 1, date: "2026-10-07", venueId: "otabisho", start: "09:10" },
  { town: "suwamachi", day: 1, date: "2026-10-07", venueId: "suwa-shrine", start: "07:30" },
  { town: "suwamachi", day: 1, date: "2026-10-07", venueId: "chuo-koen", start: "08:40" },
  { town: "suwamachi", day: 1, date: "2026-10-07", venueId: "otabisho", start: "09:40" },
  { town: "shindaiku", day: 1, date: "2026-10-07", venueId: "suwa-shrine", start: "08:00" },
  { town: "shindaiku", day: 1, date: "2026-10-07", venueId: "chuo-koen", start: "09:10" },
  { town: "shindaiku", day: 1, date: "2026-10-07", venueId: "otabisho", start: "10:10" },
  { town: "enokizu", day: 1, date: "2026-10-07", venueId: "suwa-shrine", start: "08:30" },
  { town: "enokizu", day: 1, date: "2026-10-07", venueId: "chuo-koen", start: "09:40" },
  { town: "enokizu", day: 1, date: "2026-10-07", venueId: "otabisho", start: "10:40" },
  { town: "nishikogawa", day: 1, date: "2026-10-07", venueId: "suwa-shrine", start: "09:00" },
  { town: "nishikogawa", day: 1, date: "2026-10-07", venueId: "chuo-koen", start: "10:10" },
  { town: "nishikogawa", day: 1, date: "2026-10-07", venueId: "otabisho", start: "11:10" },
  { town: "nigiwai", day: 1, date: "2026-10-07", venueId: "suwa-shrine", start: "09:30" },
  { town: "nigiwai", day: 1, date: "2026-10-07", venueId: "chuo-koen", start: "10:40" },
  { town: "nigiwai", day: 1, date: "2026-10-07", venueId: "otabisho", start: "11:40" },
  // 10/7 前日(まえび) 夕: 諏訪神社→中央公園
  { town: "shinbashi", day: 1, date: "2026-10-07", venueId: "suwa-shrine", start: "16:00" },
  { town: "shinbashi", day: 1, date: "2026-10-07", venueId: "chuo-koen", start: "17:10" },
  { town: "suwamachi", day: 1, date: "2026-10-07", venueId: "suwa-shrine", start: "16:30" },
  { town: "suwamachi", day: 1, date: "2026-10-07", venueId: "chuo-koen", start: "17:40" },
  { town: "shindaiku", day: 1, date: "2026-10-07", venueId: "suwa-shrine", start: "17:00" },
  { town: "shindaiku", day: 1, date: "2026-10-07", venueId: "chuo-koen", start: "18:10" },
  { town: "enokizu", day: 1, date: "2026-10-07", venueId: "chuo-koen", start: "18:40" },
  { town: "nishikogawa", day: 1, date: "2026-10-07", venueId: "suwa-shrine", start: "18:00" },
  { town: "nishikogawa", day: 1, date: "2026-10-07", venueId: "chuo-koen", start: "19:10" },
  { town: "nigiwai", day: 1, date: "2026-10-07", venueId: "suwa-shrine", start: "18:30" },
  { town: "nigiwai", day: 1, date: "2026-10-07", venueId: "chuo-koen", start: "19:40" },

  // 10/8 中日(なかび): 八坂神社→中央公園
  { town: "nishikogawa", day: 2, date: "2026-10-08", venueId: "yasaka-shrine", start: "07:00" },
  { town: "nishikogawa", day: 2, date: "2026-10-08", venueId: "chuo-koen", start: "08:00" },
  { town: "nigiwai", day: 2, date: "2026-10-08", venueId: "yasaka-shrine", start: "07:30" },
  { town: "nigiwai", day: 2, date: "2026-10-08", venueId: "chuo-koen", start: "08:30" },
  { town: "shindaiku", day: 2, date: "2026-10-08", venueId: "yasaka-shrine", start: "08:00" },
  { town: "shindaiku", day: 2, date: "2026-10-08", venueId: "chuo-koen", start: "09:00" },
  { town: "suwamachi", day: 2, date: "2026-10-08", venueId: "yasaka-shrine", start: "08:30" },
  { town: "suwamachi", day: 2, date: "2026-10-08", venueId: "chuo-koen", start: "09:30" },
  { town: "shinbashi", day: 2, date: "2026-10-08", venueId: "yasaka-shrine", start: "09:00" },
  { town: "shinbashi", day: 2, date: "2026-10-08", venueId: "chuo-koen", start: "10:00" },
  { town: "enokizu", day: 2, date: "2026-10-08", venueId: "yasaka-shrine", start: "09:30" },
  { town: "enokizu", day: 2, date: "2026-10-08", venueId: "chuo-koen", start: "10:30" },

  // 10/9 後日(あとび): お旅所→諏訪神社
  { town: "enokizu", day: 3, date: "2026-10-09", venueId: "otabisho", start: "07:00" },
  { town: "enokizu", day: 3, date: "2026-10-09", venueId: "suwa-shrine", start: "08:20" },
  { town: "shinbashi", day: 3, date: "2026-10-09", venueId: "otabisho", start: "07:30" },
  { town: "shinbashi", day: 3, date: "2026-10-09", venueId: "suwa-shrine", start: "08:50" },
  { town: "suwamachi", day: 3, date: "2026-10-09", venueId: "otabisho", start: "08:00" },
  { town: "suwamachi", day: 3, date: "2026-10-09", venueId: "suwa-shrine", start: "09:20" },
  { town: "nishikogawa", day: 3, date: "2026-10-09", venueId: "otabisho", start: "08:30" },
  { town: "nishikogawa", day: 3, date: "2026-10-09", venueId: "suwa-shrine", start: "09:50" },
  { town: "nigiwai", day: 3, date: "2026-10-09", venueId: "otabisho", start: "09:00" },
  { town: "nigiwai", day: 3, date: "2026-10-09", venueId: "suwa-shrine", start: "10:20" },
  { town: "shindaiku", day: 3, date: "2026-10-09", venueId: "otabisho", start: "09:30" },
  { town: "shindaiku", day: 3, date: "2026-10-09", venueId: "suwa-shrine", start: "10:50" },
];

const SESSION_DURATION_MIN = 20;

function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minutes;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

export const SESSIONS: Session[] = SCHEDULE.map((entry, index) => {
  const town = TOWNS[entry.town];
  return {
    id: `${entry.town}-${entry.date}-${entry.start.replace(":", "")}-${index}`,
    title: town.program,
    kind: "奉納踊り",
    town: town.name,
    venueId: entry.venueId,
    day: entry.day,
    date: entry.date,
    start: entry.start,
    end: addMinutes(entry.start, SESSION_DURATION_MIN),
    summary: town.summary,
    description: town.description,
    highlights: town.highlights,
  };
});

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
