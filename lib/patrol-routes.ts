// 令和7年(2025年)長崎くんち踊町庭先回りスケジュール(長崎伝統芸能振興会 公式PDF)より、
// ○印(本場所)以外の庭先回り(商店・企業・個人宅などへの呈上まわり)の経由地テキストを抜粋。
// 日付は導線確認用に2026年10月7日〜9日に読み替えている。
// 一部の踊町は複数グループ(花組/月組、もみじ組/松組、櫓日/櫓月など)に分かれて同時に別ルートを回る。

export type PatrolStop = { group: string | null; route: string };

// PATROL_ROUTES[date][town][hour] = そのhour台(hour:00〜hour:59)の庭先回り経由地
export const PATROL_ROUTES: Record<string, Record<string, Record<string, PatrolStop[]>>> = {
  "2026-10-07": {
    "新橋町": {
      "10": [
        { group: "花", route: "ゆめタウン夢彩都→元船町" },
        { group: "月", route: "文明堂総本店" },
      ],
      "11": [
        { group: "花", route: "元町→五島町→大黒町→かもめ広場" },
        { group: "月", route: "江戸町→樺島町→恵美須町→かもめ広場" },
      ],
      "13": [
        { group: "花", route: "県警→県庁→出島メッセ長崎→ヒルトン長崎→NBC→長崎警察署→西部ガス長崎→NHK→大黒町" },
        { group: "月", route: "尾上町→大黒町" },
      ],
      "14": [
        { group: "花", route: "中町→筑後町→上町→玉園町" },
        { group: "月", route: "大黒町→中町→筑後町→恵美須町→上町" },
      ],
      "15": [
        { group: "花", route: "長崎歴史文化博物館→八百屋町→炉粕町" },
        { group: "月", route: "長崎歴史文化博物館→馬町" },
      ],
      "18": [
        { group: "花", route: "栄町→万屋町→鍛冶屋町" },
        { group: "月", route: "浜町→油屋町" },
      ],
      "19": [
        { group: "花", route: "油屋町→浜市アーケード(浜屋裏通り)→思案橋通り→銅座町→本石灰町" },
        { group: "月", route: "油屋町→浜市アーケード→銅座町→本石灰町" },
      ],
    },
    "諏訪町": {
      "10": [{ group: null, route: "ゆめタウン夢彩都→元船町→大波止通り→五島町(電車通り)" }],
      "11": [{ group: null, route: "県庁→出島メッセ長崎→NBC" }],
      "12": [{ group: null, route: "かもめ広場→ホテルニュー長崎" }],
      "13": [{ group: null, route: "恵美須町→大黒町" }],
      "14": [{ group: null, route: "大黒町→筑後町→中町" }],
      "15": [{ group: null, route: "上町→玉園町→長崎歴史文化博物館→八百屋町" }],
      "18": [{ group: null, route: "アルコア中通り" }],
      "19": [{ group: null, route: "麹屋町→八幡町→諏訪町" }],
    },
    "新大工町": {
      "10": [
        { group: "もみじ組", route: "元船町" },
        { group: "松組", route: "ゆめタウン夢彩都" },
      ],
      "11": [
        { group: "もみじ組", route: "文明堂総本店→樺島町→五島町" },
        { group: "松組", route: "元船町→五島町" },
        { group: "曳壇尻", route: "ゆめタウン夢彩都→元船町→出島町" },
      ],
      "12": [{ group: "曳壇尻", route: "銅座町→十八親和銀行本店" }],
      "13": [
        { group: "もみじ組", route: "かもめ広場→八千代町→西部ガス長崎→西坂町" },
        { group: "松組", route: "かもめ広場→NBC→ヒルトン長崎→出島メッセ長崎→県庁" },
        { group: "曳壇尻", route: "新地町→銅座町" },
      ],
      "14": [
        { group: "もみじ組", route: "NHK→大黒町→ぜに屋本店→大黒町→筑後町" },
        { group: "松組", route: "元船町→五島町→金屋町→KTN" },
        { group: "曳壇尻", route: "江戸町" },
      ],
      "15": [
        { group: "もみじ組", route: "セントヒル長崎→筑後町→長崎ケーブルメディア→玉園町" },
        { group: "松組", route: "恵美須町→五島町→恵美須町" },
        { group: "曳壇尻", route: "築町→賑町" },
      ],
      "16": [
        { group: "もみじ組", route: "長崎歴史文化博物館→八百屋町→日本銀行長崎支店" },
        { group: "松組", route: "上町" },
        { group: "曳壇尻", route: "栄町→興善町→桜町→勝山町→八百屋町" },
      ],
      "18": [
        { group: "もみじ組", route: "栄町→魚の町" },
        { group: "松組", route: "桶屋町" },
      ],
      "19": [
        { group: "もみじ組", route: "桶屋町→今博多町→大井手町→出来大工町" },
        { group: "松組", route: "勝山町→今博多町→大井手町→炉粕町→上西山町" },
        { group: "曳壇尻", route: "馬町→上西山町→下西山町→出来大工町" },
      ],
    },
    "榎津町": {
      "11": [{ group: null, route: "ゆめタウン夢彩都→元船町" }],
      "12": [{ group: null, route: "サンプリエール→県庁→出島メッセ長崎" }],
      "13": [{ group: null, route: "出島メッセ長崎→ヒルトン長崎→NBC→西部ガス長崎→NHK→大黒町" }],
      "14": [{ group: null, route: "ホテルニュー長崎→かもめ広場→大黒町→ぜにや本店" }],
      "15": [
        {
          group: null,
          route: "大黒町→お告げの聖母保育園→中町→小川町→恵美須町→長崎ケーブルメディア→筑後町",
        },
      ],
      "16": [
        {
          group: null,
          route: "上町→炉粕町→長崎歴史文化博物館→馬町→上西山町→日本銀行長崎支店→立正佼成会長崎教会",
        },
      ],
      "19": [{ group: null, route: "思案橋横丁" }],
    },
    "西古川町": {
      "12": [
        { group: "本踊", route: "五島町" },
        { group: "櫓日", route: "江戸町→築町" },
        { group: "櫓月", route: "元船町" },
      ],
      "13": [
        { group: "本踊", route: "大黒町→恵美須町" },
        { group: "櫓日", route: "築町" },
        { group: "櫓月", route: "五島町" },
      ],
      "14": [
        { group: "本踊", route: "金屋町→興善町" },
        { group: "櫓日", route: "築町→賑町" },
        { group: "櫓月", route: "五島町→万才町" },
      ],
      "15": [
        { group: "本踊", route: "勝山町→桶屋町→古町" },
        { group: "櫓日", route: "万才町→樺島町" },
        { group: "櫓月", route: "興善町" },
      ],
      "16": [
        { group: "本踊", route: "今博多町→大井手町→出来大工町" },
        { group: "櫓日", route: "樺島町" },
        { group: "櫓月", route: "栄町→桜町" },
      ],
      "17": [
        { group: "本踊", route: "馬町" },
        { group: "櫓日", route: "勝山町" },
        { group: "櫓月", route: "勝山町" },
      ],
    },
    "賑町": {
      "12": [{ group: null, route: "ゆめタウン夢彩都→JA長崎せいひAGRI+店" }],
      "13": [{ group: null, route: "ホテルニュー長崎→かもめ広場→県庁" }],
      "14": [{ group: null, route: "出島メッセ長崎" }],
      "15": [{ group: null, route: "NHK→大黒町" }],
      "16": [{ group: null, route: "五島町→樺島町→五島町" }],
      "17": [{ group: null, route: "万才町→金屋町(坂本屋)→KTN→恵美須町→上町" }],
    },
  },

  "2026-10-08": {
    "西古川町": {
      "9": [
        { group: "本踊", route: "魚の町→市役所" },
        { group: "櫓日", route: "魚の町→市役所" },
        { group: "櫓月", route: "栄町→古川町" },
      ],
      "10": [
        { group: "本踊", route: "諏訪町→アルコア中通り" },
        { group: "櫓日", route: "諏訪町→アルコア中通り" },
        { group: "櫓月", route: "銀屋町→本古川町" },
      ],
      "11": [
        { group: "本踊", route: "ベルナード観光通り" },
        { group: "櫓日", route: "ベルナード観光通り→万屋町" },
        { group: "櫓月", route: "万屋町" },
      ],
      "12": [
        { group: "本踊", route: "浜市アーケード" },
        { group: "櫓日", route: "万屋町" },
        { group: "櫓月", route: "万屋町" },
      ],
      "13": [
        { group: "本踊", route: "十八親和銀行本店" },
        { group: "櫓日", route: "浜町→本石灰町→船大工町" },
        { group: "櫓月", route: "万屋町→鍛冶屋町" },
      ],
      "14": [
        { group: "本踊", route: "新地町→湊公園" },
        { group: "櫓日", route: "籠町→湊公園" },
        { group: "櫓月", route: "寺町通り" },
      ],
      "15": [
        { group: "本踊", route: "銅座町→鍛冶屋町" },
        { group: "櫓日", route: "長崎みなとメディカルセンター→出島ワーフ" },
        { group: "櫓月", route: "八幡町" },
      ],
      "16": [
        { group: "本踊", route: "油屋町→八坂町" },
        { group: "櫓日", route: "江戸町" },
        { group: "櫓月", route: "麹屋町" },
      ],
      "17": [
        { group: "本踊", route: "本石灰町→丸山町" },
        { group: "櫓日", route: "浜市アーケード" },
        { group: "櫓月", route: "伊勢町→出来大工町" },
      ],
      "18": [
        { group: "本踊", route: "船大工町→銅座町" },
        { group: "櫓日", route: "万屋町" },
        { group: "櫓月", route: "今博多町→古町" },
      ],
      "19": [
        { group: "櫓日", route: "榎津町" },
        { group: "櫓月", route: "桶屋町→魚の町" },
      ],
    },
    "賑町": {
      "9": [{ group: null, route: "栄町→魚の町" }],
      "10": [{ group: null, route: "魚の町→栄町" }],
      "11": [{ group: null, route: "興善町→桜町→興善町" }],
      "12": [{ group: null, route: "栄町→賑町" }],
      "13": [{ group: null, route: "築町→西濱町" }],
      "14": [{ group: null, route: "浜町→本石灰町→丸山町" }],
      "15": [{ group: null, route: "船大工町→籠町→新地町" }],
      "16": [{ group: null, route: "湊公園→新地町→銅座町" }],
      "17": [{ group: null, route: "西濱町→新地町→出島町" }],
      "18": [{ group: null, route: "出島町→江戸町" }],
      "19": [{ group: null, route: "築町→賑町" }],
    },
    "新大工町": {
      "9": [
        { group: "もみじ組", route: "興善町" },
        { group: "松組", route: "賑町→栄町" },
      ],
      "10": [
        { group: "もみじ組", route: "商工会議所→桜町→魚の町→市役所" },
        { group: "松組", route: "興善町→魚の町→市役所" },
        { group: "曳壇尻", route: "栄町→魚の町" },
      ],
      "11": [
        { group: "もみじ組", route: "興善町→万才町→樺島町" },
        { group: "松組", route: "桜町→興善町→万才町" },
        { group: "曳壇尻", route: "魚の町→栄町→西古川町→銀屋町→磨屋町" },
      ],
      "12": [
        { group: "もみじ組", route: "江戸町→出島" },
        { group: "松組", route: "江戸町→築町→出島" },
        { group: "曳壇尻", route: "諏訪町→諏訪小学校" },
      ],
      "13": [
        { group: "もみじ組", route: "十八親和銀行本店→新地町" },
        { group: "松組", route: "十八親和銀行本店→新地中華街" },
        { group: "曳壇尻", route: "磨屋町→銀屋町→東古川町(アルコア中通り)" },
      ],
      "14": [
        { group: "もみじ組", route: "新地町→湊公園→梅香崎町→籠町" },
        { group: "松組", route: "新地中華街→湊公園→梅香崎町" },
        { group: "曳壇尻", route: "ベルナード観光通り" },
      ],
      "15": [
        { group: "もみじ組", route: "籠町→船大工町→福砂屋本店" },
        { group: "松組", route: "長崎みなとメディカルセンター→出島ワーフ→出島町→NIB" },
        { group: "曳壇尻", route: "銅座町→籠町→湊町→湊公園→籠町" },
      ],
      "16": [
        { group: "もみじ組", route: "丸山町" },
        { group: "松組", route: "出島町→銅座町" },
        { group: "曳壇尻", route: "新地町→銅座町→浜町→本石灰町→福砂屋本店" },
      ],
      "17": [
        { group: "もみじ組", route: "丸山町→本石灰町→浜町" },
        { group: "松組", route: "浜町→万屋町" },
        { group: "曳壇尻", route: "本石灰町→ベルナード観光通り→本古川町→榎津町" },
      ],
      "18": [
        { group: "もみじ組", route: "浜市アーケード" },
        { group: "松組", route: "万屋町→ベルナード観光通り→浜市アーケード" },
        { group: "曳壇尻", route: "鍛冶屋町→今籠町→油屋町→万屋町" },
      ],
      "19": [
        { group: "もみじ組", route: "ハマクロス411" },
        { group: "松組", route: "ハマクロス411" },
        { group: "曳壇尻", route: "浜市アーケード→油屋町" },
      ],
    },
    "諏訪町": {
      "10": [{ group: null, route: "栄町→魚の町" }],
      "11": [{ group: null, route: "魚の町→桶屋町" }],
      "12": [{ group: null, route: "今博多町→古町→桶屋町→市役所" }],
      "13": [{ group: null, route: "桜町→商工会議所→興善町" }],
      "14": [{ group: null, route: "市立図書館→桜町" }],
      "15": [{ group: null, route: "恵美須町→金屋町→KTN→五島町" }],
      "16": [{ group: null, route: "樺島町→江戸町→NIB→出島町→湊公園" }],
      "17": [{ group: null, route: "十八親和銀行本店→銅座町→西濱町" }],
      "18": [{ group: null, route: "新地町→籠町" }],
      "19": [{ group: null, route: "船大工町→丸山町→本石灰町" }],
    },
    "新橋町": {
      "11": [
        { group: "花", route: "魚の町→桶屋町→古町→今博多町→大井手町" },
        { group: "月", route: "栄町→魚の町→桶屋町→古町→今博多町→大井手町" },
      ],
      "12": [
        { group: "花", route: "勝山町→桶屋町→魚の町→栄町" },
        { group: "月", route: "出来大工町→伊勢町→八幡町→魚の町→栄町" },
      ],
      "13": [
        { group: "花", route: "万屋町→鍛冶屋町→油屋町→丸山町→本石灰町" },
        { group: "月", route: "万屋町→鍛冶屋町→油屋町→本石灰町→丸山町" },
      ],
      "15": [
        { group: "花", route: "長崎検番→花月→福砂屋本店→船大工町→籠町→梅香崎町" },
        { group: "月", route: "長崎検番→花月→福砂屋本店→船大工町→銅座町→籠町" },
      ],
      "16": [
        { group: "花", route: "湊公園→新地町→銅座町→万屋町" },
        { group: "月", route: "湊公園→新地町" },
      ],
      "17": [
        { group: "花", route: "銅座町→浜町→万屋町" },
        { group: "月", route: "新地町→浜町→鍛冶屋町→東古川町" },
      ],
      "18": [
        { group: "花", route: "古川町→東古川町" },
        { group: "月", route: "東古川町→銀屋町" },
      ],
      "19": [
        { group: "花", route: "銀屋町→諏訪町" },
        { group: "月", route: "銀屋町→諏訪町" },
      ],
    },
    "榎津町": {
      "11": [{ group: null, route: "賑町→栄町→魚の町" }],
      "12": [{ group: null, route: "市役所→魚の町→商工会議所" }],
      "13": [{ group: null, route: "桜町小学校→桜町→興善町→万才町→中央橋" }],
      "14": [{ group: null, route: "中央橋→十八親和銀行本店→西濱町→新地町→福建通り→広馬場町" }],
      "15": [{ group: null, route: "湊公園→新地町→JALシティ長崎→西浜通り" }],
      "16": [{ group: null, route: "西濱町→新地町→出島町→江戸町" }],
      "17": [{ group: null, route: "NIB→出島町→江戸町→県庁舎跡地" }],
      "18": [{ group: null, route: "万才町→金屋町→KTN→五島町→樺島町" }],
      "19": [{ group: null, route: "樺島町→五島町→興善町→栄町" }],
    },
  },

  "2026-10-09": {
    "榎津町": {
      "9": [{ group: null, route: "松森天満宮→新大工町→新大工町商店街" }],
      "10": [{ group: null, route: "上長崎地区ふれあいセンター→伊勢町→伊勢宮神社→出来大工町" }],
      "11": [{ group: null, route: "八幡町→麹屋町→紺屋町→新橋町→諏訪町→新橋町" }],
      "12": [{ group: null, route: "魚の町→諏訪町→諏訪小学校" }],
      "13": [{ group: null, route: "諏訪小学校→諏訪町→魚の町→栄町→賑町→築町" }],
      "14": [{ group: null, route: "築町→浜市アーケード→ベルナード観光通り" }],
      "15": [{ group: null, route: "電車通り商店街(春雨通り)→万屋町→ベルナード観光通り" }],
      "16": [{ group: null, route: "ベルナード観光通り→本古川町→東古川町→銀屋町→磨屋町" }],
      "17": [{ group: null, route: "諏訪町→魚の町→栄町→本古川町→鍛冶屋町→今籠町" }],
      "18": [{ group: null, route: "鍛冶屋町→油屋町→本石灰町→福砂屋本店→丸山町" }],
      "19": [{ group: null, route: "船大工町→籠町→銅座町→電車通り商店街(春雨通り)→ハマクロス411" }],
    },
    "新橋町": {
      "9": [
        { group: "花", route: "松森天満宮→新大工町" },
        { group: "月", route: "上西山町→新大工町" },
      ],
      "10": [
        { group: "花", route: "新大工町→片淵→夫婦川町→桜馬場" },
        { group: "月", route: "新大工町→片淵→新大工町" },
      ],
      "11": [
        { group: "花", route: "桜馬場→伊勢町→八幡町→麹屋町→寺町" },
        { group: "月", route: "新大工町→伊勢町→八幡町→麹屋町→紺屋町" },
      ],
      "13": [
        { group: "花", route: "諏訪小学校→魚の町" },
        { group: "月", route: "諏訪小学校→桜町" },
      ],
      "14": [
        { group: "花", route: "魚の町→桜町→金屋町" },
        { group: "月", route: "桜町→興善町" },
      ],
      "15": [
        { group: "花", route: "万才町→賑町" },
        { group: "月", route: "賑町→築町" },
      ],
      "16": [
        { group: "花", route: "万才町→県庁舎跡地→江戸町" },
        { group: "月", route: "築町→県庁舎跡地→江戸町" },
      ],
      "17": [
        { group: "花", route: "出島町→十八親和銀行本店→NIB" },
        { group: "月", route: "江戸町→十八親和銀行本店→NIB" },
      ],
      "18": [
        { group: "花", route: "銅座町→ハマクロス411" },
        { group: "月", route: "出島町→ハマクロス411" },
      ],
      "19": [
        { group: "花", route: "ベルナード観光通り→諏訪町" },
        { group: "月", route: "ベルナード観光通り→諏訪町" },
      ],
    },
    "諏訪町": {
      "10": [{ group: null, route: "新大工町→上長崎地区ふれあいセンター" }],
      "11": [{ group: null, route: "新大工町→伊勢町→八幡町" }],
      "12": [{ group: null, route: "八幡町→今博多町→古町" }],
      "13": [{ group: null, route: "桶屋町→魚の町→栄町" }],
      "14": [{ group: null, route: "栄町→興善町" }],
      "15": [{ group: null, route: "賑町→栄町" }],
      "16": [{ group: null, route: "築町→浜町→浜市アーケード" }],
      "17": [{ group: null, route: "ベルナード観光通り→諏訪町→古川町→銀屋町→東古川町→本古川通り" }],
      "18": [{ group: null, route: "榎津通り→万屋通り→鍛冶市通り" }],
      "19": [{ group: null, route: "崇福寺通り→八坂町→油屋町" }],
    },
    "西古川町": {
      "10": [
        { group: "本踊", route: "勝山町" },
        { group: "櫓日", route: "勝山町" },
        { group: "櫓月", route: "新大工町" },
      ],
      "11": [
        { group: "本踊", route: "玉園町→上町" },
        { group: "櫓日", route: "玉園町→上町" },
        { group: "櫓月", route: "上長崎地区ふれあいセンター→新大工町" },
      ],
      "12": [
        { group: "本踊", route: "筑後町→中町" },
        { group: "櫓日", route: "筑後町" },
        { group: "櫓月", route: "新大工町" },
      ],
      "13": [
        { group: "本踊", route: "大黒町" },
        { group: "櫓日", route: "筑後町→大黒町" },
        { group: "櫓月", route: "新大工町→馬町" },
      ],
      "14": [
        { group: "本踊", route: "かもめ広場" },
        { group: "櫓日", route: "大黒町→かもめ広場" },
        { group: "櫓月", route: "馬町→炉粕町" },
      ],
      "15": [
        { group: "本踊", route: "元船町" },
        { group: "櫓日", route: "尾上町→出島メッセ長崎→県庁" },
        { group: "櫓月", route: "八百屋町" },
      ],
      "16": [
        { group: "本踊", route: "出島町" },
        { group: "櫓日", route: "元船町" },
        { group: "櫓月", route: "小川町→中町" },
      ],
      "17": [
        { group: "本踊", route: "ハマクロス411" },
        { group: "櫓日", route: "ハマクロス411" },
        { group: "櫓月", route: "ハマクロス411" },
      ],
    },
    "賑町": {
      "11": [{ group: null, route: "日本銀行長崎支店→八百屋町→勝山町" }],
      "12": [{ group: null, route: "馬町→新大工町→伊勢町" }],
      "13": [{ group: null, route: "伊勢町→出来大工町→大井手町" }],
      "14": [{ group: null, route: "八幡町→麹屋町→諏訪町" }],
      "15": [{ group: null, route: "諏訪町→古川町→銀屋町" }],
      "16": [{ group: null, route: "銀屋町→古川町→万屋町→浜町(ハマクロス411)" }],
      "17": [{ group: null, route: "浜町→油屋町→鍛冶屋町→万屋町" }],
      "18": [{ group: null, route: "万屋町→古川町→万屋町→浜町(ハマクロス411)" }],
      "19": [{ group: null, route: "万屋町→賑町" }],
    },
    "新大工町": {
      "12": [
        { group: "もみじ組", route: "伊勢宮神社" },
        { group: "松組", route: "伊勢宮神社" },
        { group: "曳壇尻", route: "馬町→立山1丁目→長崎歴史文化博物館" },
      ],
      "13": [
        { group: "もみじ組", route: "伊勢町→桜馬場1丁目→片淵1丁目" },
        { group: "松組", route: "八幡町→伊良林1丁目→八幡町→寺町" },
        { group: "曳壇尻", route: "馬町→勝山町→上町→筑後町→中町" },
      ],
      "14": [
        { group: "もみじ組", route: "馬町→勝山町→魚の町" },
        { group: "松組", route: "寺町→鍛冶屋町" },
        { group: "曳壇尻", route: "桜町→金屋町→五島町" },
      ],
      "15": [
        { group: "もみじ組", route: "魚の町→栄町" },
        { group: "松組", route: "鍛冶屋町→油屋町" },
        { group: "曳壇尻", route: "元船町→ホテルニュー長崎→かもめ広場" },
      ],
      "16": [
        { group: "もみじ組", route: "賑町→築町" },
        { group: "松組", route: "浜町→鍛冶屋町→油屋町→本石灰町→銅座町" },
        { group: "曳壇尻", route: "大黒町→恵美須町→五島町" },
      ],
      "17": [
        { group: "もみじ組", route: "万才町→興善町→桜町" },
        { group: "松組", route: "浜町" },
        { group: "曳壇尻", route: "樺島町→万才町" },
      ],
      "18": [
        { group: "もみじ組", route: "小川町→八百屋町" },
        { group: "松組", route: "栄町→魚の町→桶屋町→古町→今博多町→出来大工町" },
        { group: "曳壇尻", route: "栄町→西古川町→東古川町→鍛冶屋町" },
      ],
      "19": [{ group: "曳壇尻", route: "銀屋町→磨屋町→諏訪町" }],
    },
  },
};

export function getPatrolStops(town: string, date: string, hour: number): PatrolStop[] {
  return PATROL_ROUTES[date]?.[town]?.[String(hour)] ?? [];
}

export type PatrolHourBlock = { hour: number; stops: PatrolStop[] };

// fromHour(開始セッションの時)〜toHour(次のセッションの時、含まない)の間の庭先回りを時間帯ごとに返す。
export function getPatrolRangeByHour(
  town: string,
  date: string,
  fromHour: number,
  toHour: number
): PatrolHourBlock[] {
  const blocks: PatrolHourBlock[] = [];
  for (let h = fromHour; h < toHour; h++) {
    const stops = getPatrolStops(town, date, h);
    if (stops.length > 0) blocks.push({ hour: h, stops });
  }
  return blocks;
}

export function jstHour(date: Date): number {
  return Number(
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: "Asia/Tokyo",
    }).format(date)
  );
}

export function formatPatrolStops(stops: PatrolStop[]): string {
  return stops.map((s) => (s.group ? `[${s.group}] ${s.route}` : s.route)).join(" / ");
}
