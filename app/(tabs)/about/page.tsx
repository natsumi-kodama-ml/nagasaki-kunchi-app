import { MapPin, Megaphone, Umbrella, Sparkle, CloudRain } from "@phosphor-icons/react/ssr";
import { EVENT, GLOSSARY, ENJOYMENT_TIPS, TOWN_PROFILES, WHAT_IS_KUNCHI } from "@/lib/data";
import { getTownColor } from "@/lib/town-colors";
import { getPerformanceIcons, PerformanceIcon } from "@/components/performance-icon";
import { PageHeader } from "@/components/page-header";

const TIP_ICONS = [MapPin, Megaphone, Umbrella, Sparkle, CloudRain];

export default function AboutPage() {
  return (
    <div>
      <PageHeader eyebrow={`${EVENT.since}から続く`} title={`${EVENT.name}とは`} />
      <div className="space-y-7 px-4 pt-6 pb-4">
        <section className="space-y-2">
          <div className="overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/dragon-dance-credit.jpg"
              alt="長崎くんちの龍踊(じゃおどり)"
              className="h-44 w-full object-cover"
            />
          </div>
          <p className="text-center text-[10px] text-muted-foreground/70">
            Photo: Marine-Blue(CC BY-SA 3.0) via Wikimedia Commons
          </p>
          <h2 className="text-sm font-medium text-accent">{WHAT_IS_KUNCHI.title}</h2>
          <p className="text-sm leading-relaxed text-foreground/90">{WHAT_IS_KUNCHI.body}</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {WHAT_IS_KUNCHI.facts.map((f) => (
              <span
                key={f}
                className="rounded-full bg-secondary/60 px-2.5 py-1 text-[11px] font-medium text-foreground/90"
              >
                {f}
              </span>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-medium text-accent">見どころ・楽しみ方</h2>
          <div className="grid grid-cols-2 gap-2">
            {ENJOYMENT_TIPS.map((tip, i) => {
              const Icon = TIP_ICONS[i];
              const isKasaboko = i === 2;
              return (
                <div key={tip.title} className="glow-card overflow-hidden rounded-xl bg-card">
                  {isKasaboko ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src="/images/kasaboko-credit.jpg"
                      alt="傘鉾(かさぼこ)"
                      className="h-16 w-full object-cover"
                    />
                  ) : (
                    <Icon size={16} className="ml-2.5 mt-2.5 text-accent" />
                  )}
                  <div className="p-2.5 pt-1.5">
                    <p className="text-xs font-semibold text-foreground">{tip.title}</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                      {tip.detail}
                    </p>
                    {isKasaboko && (
                      <p className="mt-1 text-[9px] text-muted-foreground/70">
                        Photo: Houjyou-Minori(CC BY-SA 4.0)
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-medium text-accent">開催日程</h2>
          <p className="text-sm text-foreground/90">{EVENT.period}</p>
          <div className="space-y-3 pt-1">
            {EVENT.schedule.map((s) => (
              <div key={s.label} className="glow-card rounded-xl bg-card p-3">
                <p className="text-sm font-medium text-foreground">{s.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-medium text-accent">今回登場する踊町紹介</h2>
          <p className="text-xs text-muted-foreground">
            町ごとに演し物の種類が違うので、見る前にチェックしておこう
          </p>
          <div className="space-y-3 pt-1">
            {TOWN_PROFILES.map((town) => {
              const color = getTownColor(town.name);
              const icons = getPerformanceIcons(town.program);
              const photo =
                town.id === "nigiwai"
                  ? { src: "/images/ebisu-boat-credit.jpg", alt: "恵美須船のような祝船", credit: "Marine-Blue(CC BY-SA 4.0)" }
                  : town.id === "nishikogawa"
                    ? { src: "/images/shagiri-credit.jpg", alt: "囃子方(太鼓の演奏)", credit: "Marine-Blue(CC BY-SA 4.0)" }
                    : null;
              return (
                <div key={town.id} className="glow-card overflow-hidden rounded-xl bg-card">
                  {photo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photo.src} alt={photo.alt} className="h-28 w-full object-cover" />
                  )}
                  <div className="p-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex shrink-0 items-center gap-1 rounded-lg p-1.5"
                        style={{ backgroundColor: `${color}1a`, color }}
                      >
                        {icons.length > 0 ? (
                          icons.map((icon) => (
                            <PerformanceIcon key={icon} type={icon} className="h-4 w-4" />
                          ))
                        ) : (
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{town.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{town.program}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {town.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {town.highlights.map((h) => (
                        <span
                          key={h}
                          className="rounded-full bg-secondary/60 px-2 py-0.5 text-[11px] text-foreground/90"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                    {photo && (
                      <p className="mt-1.5 text-[9px] text-muted-foreground/70">
                        Photo: {photo.credit} via Wikimedia Commons(写真は他地区の同種の演目です)
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-medium text-accent">はじめての方へ:用語集</h2>
          <div className="grid grid-cols-2 gap-2">
            {GLOSSARY.map((g) => (
              <div key={g.term} className="glow-card rounded-xl bg-card p-2.5">
                <p className="text-xs font-semibold text-foreground">{g.term}</p>
                <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                  {g.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="rounded-xl bg-secondary/60 p-3 text-xs text-muted-foreground">
          <p>主催: {EVENT.organizer}</p>
          <p>お問い合わせ: {EVENT.contact}</p>
          <p className="mt-1">{EVENT.note}</p>
        </div>
      </div>
    </div>
  );
}
