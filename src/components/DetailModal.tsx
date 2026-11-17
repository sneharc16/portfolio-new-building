"use client";

import { ArrowUpRight } from "lucide-react";
import { getItem, type Item, type Profile } from "@/data/content";
import Art from "./Art";
import { LabelledLinks } from "./LinkButtons";
import LogoTile from "./LogoTile";
import MatchTag from "./MatchTag";
import Modal from "./Modal";

type Props = {
  item: Item | undefined;
  profile: Profile;
  more: Item[];
  placeholderArt: boolean;
  onOpen: (slug: string) => void;
  onClose: () => void;
};

export default function DetailModal({ item, profile, more, placeholderArt, onOpen, onClose }: Props) {
  return (
    <Modal open={!!item} onClose={onClose} label={item?.title ?? "Details"}>
      {item && <Body item={item} profile={profile} more={more} placeholderArt={placeholderArt} onOpen={onOpen} />}
    </Modal>
  );
}

function Body({ item, profile, more, placeholderArt, onOpen }: Omit<Props, "onClose" | "item"> & { item: Item }) {
  const own = profile === "tech" ? item.bulletsTech : item.bulletsProduct;
  const other = profile === "tech" ? item.bulletsProduct : item.bulletsTech;
  const bullets = own ?? other;
  const related = getItem(item.related);
  const meta = [item.role, item.role ? item.org : item.org !== item.title ? item.org : null, item.dates, item.location].filter(Boolean);

  return (
    <article>
      {/* Header strip: art fading into the body */}
      <div className="relative h-[200px] overflow-hidden bg-elevated sm:h-[300px]">
        <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
          <div className="aspect-video h-full max-w-full">
            <Art item={item} preferPlaceholder={placeholderArt} />
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(20,20,20,0) 45%, #141414 100%)" }}
          aria-hidden
        />
      </div>

      <div className="grid gap-8 px-5 pb-10 sm:px-10 md:grid-cols-[1fr_220px]">
        <div className="min-w-0">
          <h2 className="font-display text-[clamp(24px,3.4vw,36px)] font-semibold leading-tight tracking-[-0.02em] text-ink">
            {item.title}
          </h2>
          <p className="mt-2 text-sm text-muted">{meta.join(" · ")}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
            <MatchTag item={item} profile={profile} />
            <span className="rounded border border-white/30 px-1.5 py-0.5 text-xs text-ink">{item.kicker}</span>
          </div>

          {item.blurb && <p className="mt-5 text-[15px] leading-relaxed text-ink">{item.blurb}</p>}
          {bullets && (
            <ul className="mt-5 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="relative pl-5 text-[15px] leading-relaxed text-ink">
                  <span className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          )}

          {item.stack.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
              {item.stack.map((s) => (
                <li key={s} className="rounded-full bg-white/10 px-3 py-1 text-xs text-ink">
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className="flex flex-col gap-4">
          {item.secondaryLogo && (
            <div className="flex gap-2">
              {item.logo && <LogoTile logo={item.logo} className="aspect-video flex-1" />}
              <LogoTile logo={item.secondaryLogo} className="aspect-video flex-1" />
            </div>
          )}
          <LabelledLinks item={item} />
          {related && (
            <button
              type="button"
              onClick={() => onOpen(related.slug)}
              className="flex w-full items-center gap-3 rounded-md bg-accent px-4 py-2.5 text-left text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
            >
              Open project: {related.title.split(/[:(]/)[0].trim()}
              <ArrowUpRight className="ml-auto h-4 w-4 shrink-0" aria-hidden />
            </button>
          )}
        </aside>
      </div>

      {more.length > 0 && (
        <section className="border-t border-white/10 px-5 py-8 sm:px-10" aria-labelledby="more-like-this">
          <h3 id="more-like-this" className="font-display text-xl font-semibold tracking-tight text-ink">
            More like this
          </h3>
          <ul className="mt-4 grid grid-cols-1 gap-4 min-[480px]:grid-cols-3">
            {more.map((m) => (
              <li key={m.slug}>
                <button type="button" onClick={() => onOpen(m.slug)} className="group block w-full overflow-hidden rounded-[12px] bg-elevated text-left">
                  <span className="block aspect-video">
                    <Art item={m} preferPlaceholder={placeholderArt} className="rounded-b-none" />
                  </span>
                  <span className="block p-3">
                    <span className="block truncate text-sm font-medium text-ink">{m.title}</span>
                    <span className="mt-1 line-clamp-2 block text-xs text-muted">{m.kicker}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
