import { Play } from "lucide-react";
import { blurbFor, type Item, type Profile, type Row } from "@/data/content";
import LogoTile from "./LogoTile";

/** "Now streaming": one wide continue-watching card for the current role. */
export default function FeatureRow({ row, profile, onOpen }: { row: Row; profile: Profile; onOpen: (slug: string) => void }) {
  const item: Item = row.items[0];
  return (
    <section aria-labelledby={`row-${row.id}`}>
      <h2 id={`row-${row.id}`} className="gutter font-display text-[clamp(20px,2.2vw,28px)] font-semibold tracking-[-0.01em] text-ink">
        {row.title}
      </h2>
      <div className="gutter mt-3">
        <button
          type="button"
          data-card={item.slug}
          onClick={() => onOpen(item.slug)}
          className="card-w-feature group block overflow-hidden rounded-[12px] bg-surface text-left transition-transform duration-200 ease-out hover:scale-[1.02]"
          aria-label={`${item.title}, ${item.kicker}, ${item.dates}. Open details`}
        >
          <div className="relative grid grid-cols-[minmax(0,1fr)] sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div className="relative aspect-video">
              <div className="absolute inset-0 flex gap-2 p-3">
                <LogoTile logo={item.logo} className="h-full flex-1" />
                {item.secondaryLogo && <LogoTile logo={item.secondaryLogo} className="hidden h-full w-[38%] min-[420px]:flex" />}
              </div>
              <span className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white opacity-0 ring-1 ring-white/60 transition-opacity duration-200 group-hover:opacity-100">
                <Play className="h-5 w-5 fill-current" aria-hidden />
              </span>
            </div>
            <div className="flex min-w-0 flex-col justify-center gap-1.5 px-4 pb-4 sm:py-4 sm:pl-1 sm:pr-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{item.kicker}</p>
              <p className="font-display text-lg font-semibold leading-tight text-ink">{item.title}</p>
              <p className="line-clamp-2 text-[13px] leading-snug text-muted">{blurbFor(item, profile)}</p>
            </div>
          </div>
          <div className="px-4 pb-4">
            <div className="flex items-center justify-between text-[12px] text-muted">
              <span>{item.dates?.replace(" to Present", " to present")}</span>
              <span>{item.location}</span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/15" role="presentation">
              <div className="h-full w-[18%] rounded-full bg-accent" />
            </div>
          </div>
        </button>
      </div>
    </section>
  );
}
