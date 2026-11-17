"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { blurbFor, type Item, type Profile } from "@/data/content";
import { play } from "@/lib/sound";
import { useIsClient } from "@/lib/useIsClient";
import Art from "./Art";
import { IconLinks } from "./LinkButtons";
import MatchTag from "./MatchTag";

type Props = {
  item: Item;
  profile: Profile;
  onOpen: (slug: string) => void;
  /** Projects show the initials placeholder instead of the organisation logo. */
  preferPlaceholder?: boolean;
  rank?: number;
};

const HOVER_DELAY = 300;
const SCALE = 1.4;

type Box = { left: number; top: number; width: number; originX: string };

export default function Card({ item, profile, onOpen, preferPlaceholder, rank }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const [box, setBox] = useState<Box | null>(null);
  const reduce = useReducedMotion();
  const client = useIsClient();

  const close = useCallback(() => {
    window.clearTimeout(timer.current);
    setBox(null);
  }, []);

  const start = () => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const width = r.width * SCALE;
      const gutter = 12;
      const ideal = r.left + r.width / 2 - width / 2;
      const left = Math.min(Math.max(ideal, gutter), document.documentElement.clientWidth - gutter - width);
      // Grow from the edge the card is pinned to, so it never clips at the row edges.
      const originX = left === gutter && ideal < gutter ? "0%" : ideal > left ? "100%" : "50%";
      const artH = (width * 9) / 16;
      play("tick");
      setBox({ left: left + window.scrollX, top: r.top + window.scrollY + r.height / 2 - artH / 2, width, originX });
    }, HOVER_DELAY);
  };

  useEffect(() => {
    if (!box) return;
    const onScroll = (e: Event) => e.target !== document && close();
    const onResize = () => close();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [box, close]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const open = () => {
    play("click");
    close();
    onOpen(item.slug);
  };

  return (
    <div className={`relative shrink-0 snap-start ${rank ? "card-w flex items-center" : "card-w"}`}>
      {rank && (
        <span
          aria-hidden
          className="font-display pointer-events-none -mr-[4%] w-[30%] shrink-0 select-none text-right text-[clamp(64px,8vw,128px)] font-bold leading-[0.78] tracking-[-0.08em] text-bg [-webkit-text-stroke:2px_rgba(255,255,255,0.55)]"
        >
          {rank}
        </span>
      )}
      <div className={rank ? "min-w-0 flex-1" : ""}>
      <button
        ref={ref}
        type="button"
        data-card={item.slug}
        onClick={open}
        onMouseEnter={start}
        onMouseLeave={() => !box && window.clearTimeout(timer.current)}
        aria-label={`${item.title}. ${item.kicker}. Open details`}
        className="relative block aspect-video w-full overflow-hidden rounded-[12px] bg-surface outline-none ring-accent transition-transform duration-200 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        <Art item={item} preferPlaceholder={preferPlaceholder} />
      </button>
      <p className="mt-2 truncate pr-2 text-[13px] text-muted">{item.title}</p>
      </div>

      {client &&
        createPortal(
          <AnimatePresence>
            {box && (
              <m.div
                key="preview"
                onMouseLeave={close}
                initial={{ opacity: 0, scale: reduce ? 1 : 1 / SCALE }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduce ? 1 : 1 / SCALE }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ position: "absolute", left: box.left, top: box.top, width: box.width, transformOrigin: `${box.originX} 30%` }}
                className="z-[60] overflow-hidden rounded-[12px] bg-elevated shadow-[0_18px_48px_rgba(0,0,0,0.75)]"
                data-preview={item.slug}
              >
                <button type="button" onClick={open} tabIndex={-1} aria-hidden className="block aspect-video w-full">
                  <Art item={item} preferPlaceholder={preferPlaceholder} className="rounded-b-none" />
                </button>
                <div className="space-y-2.5 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <IconLinks item={item} />
                    <button
                      type="button"
                      onClick={open}
                      aria-label={`More about ${item.title}`}
                      title="Details"
                      className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white transition-colors duration-200 hover:border-white hover:bg-white/10"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px]">
                    <MatchTag item={item} profile={profile} compact />
                    <span className="font-medium text-ink">{item.kicker}</span>
                  </div>
                  <p className="line-clamp-2 text-[13px] leading-snug text-muted">{blurbFor(item, profile)}</p>
                  {item.stack.length > 0 && (
                    <ul className="flex flex-wrap gap-x-2 text-[12px] text-ink">
                      {item.stack.slice(0, 3).map((s, i) => (
                        <li key={s} className="flex items-center gap-2">
                          {i > 0 && <span className="h-1 w-1 rounded-full bg-white/40" aria-hidden />}
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </m.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
