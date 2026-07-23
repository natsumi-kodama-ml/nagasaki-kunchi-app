import { ArrowSquareOut, MapPin } from "@phosphor-icons/react/ssr";
import { VENUES } from "@/lib/data";
import { PageHeader } from "@/components/page-header";

export default function VenuesPage() {
  return (
    <div>
      <PageHeader eyebrow={`全${VENUES.length}会場`} title="会場・アクセス" />
      <div className="space-y-5 px-4 pt-6">
      <div className="space-y-3 pb-2">
        {VENUES.map((venue) => (
          <div key={venue.id} className="glow-card space-y-3 rounded-2xl bg-card p-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-medium text-foreground">{venue.name}</h2>
                <span className="rounded-full bg-info/15 px-2 py-0.5 text-[11px] font-medium text-info">
                  {venue.role}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{venue.address}</p>
            </div>

            <ul className="space-y-1">
              {venue.access.map((a) => (
                <li key={a} className="flex items-start gap-1.5 text-xs text-foreground/85">
                  <MapPin size={13} className="mt-0.5 shrink-0 text-muted-foreground" />
                  {a}
                </li>
              ))}
            </ul>

            {venue.note && (
              <p className="rounded-xl bg-secondary/60 px-3 py-2 text-xs text-muted-foreground">
                {venue.note}
              </p>
            )}

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl bg-secondary py-2.5 text-xs font-medium text-foreground"
            >
              地図で開く
              <ArrowSquareOut size={14} />
            </a>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
