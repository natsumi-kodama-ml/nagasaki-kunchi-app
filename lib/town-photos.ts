// 踊町ごとの参考写真(Wikimedia Commons、CC BY-SA)。
// 今回登場する町そのものの写真ではなく、同種の演目の写真であることが多いため
// 各利用箇所でクレジット表記を必ず添えること。
export type TownPhoto = { src: string; alt: string; credit: string };

export const TOWN_PHOTOS: Record<string, TownPhoto> = {
  諏訪町: {
    src: "/images/dragon-dance-credit.jpg",
    alt: "龍踊(じゃおどり)",
    credit: "Marine-Blue(CC BY-SA 3.0)",
  },
  新橋町: {
    src: "/images/dance-credit.jpg",
    alt: "本踊のような奉納踊り",
    credit: "Marufish(CC BY-SA 2.0)",
  },
  新大工町: {
    src: "/images/float-credit.jpg",
    alt: "曳壇尻のような山車",
    credit: "Masoud Akbari(CC BY-SA 3.0)",
  },
  榎津町: {
    src: "/images/ebisu-boat-credit.jpg",
    alt: "川船のような祝船",
    credit: "Marine-Blue(CC BY-SA 4.0)",
  },
  西古川町: {
    src: "/images/shagiri-credit.jpg",
    alt: "囃子方(太鼓の演奏)",
    credit: "Marine-Blue(CC BY-SA 4.0)",
  },
  賑町: {
    src: "/images/ebisu-boat-credit.jpg",
    alt: "恵美須船のような祝船",
    credit: "Marine-Blue(CC BY-SA 4.0)",
  },
};

export function getTownPhoto(townName: string): TownPhoto | null {
  return TOWN_PHOTOS[townName] ?? null;
}
