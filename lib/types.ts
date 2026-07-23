export type Venue = {
  id: string;
  name: string;
  kana: string;
  role: string;
  address: string;
  access: string[];
  mapQuery: string;
  note?: string;
};

export type Session = {
  id: string;
  title: string;
  kind: string;
  town: string;
  venueId: string;
  day: 1 | 2 | 3;
  date: string; // YYYY-MM-DD (JST)
  start: string; // HH:mm (JST)
  end: string; // HH:mm (JST)
  summary: string;
  description: string;
  highlights: string[];
};
