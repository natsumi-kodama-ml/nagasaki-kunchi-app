import { EVENT, GLOSSARY } from "@/lib/data";
import { PageHeader } from "@/components/page-header";

export default function AboutPage() {
  return (
    <div>
      <PageHeader eyebrow={`${EVENT.since}から続く`} title={`${EVENT.name}とは`} />
      <div className="space-y-6 px-4 pt-6 pb-4">
        <section className="space-y-2">
          <p className="text-sm leading-relaxed text-foreground/90">{EVENT.overview}</p>
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
          <h2 className="text-sm font-medium text-accent">はじめての方へ:用語集</h2>
          <div className="space-y-3">
            {GLOSSARY.map((g) => (
              <div key={g.term} className="glow-card rounded-xl bg-card p-3">
                <p className="text-sm font-medium text-foreground">{g.term}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
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
