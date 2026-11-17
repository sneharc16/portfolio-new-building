"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Profile, Row as RowT } from "@/data/content";
import { play } from "@/lib/sound";
import Art from "./Art";
import Card from "./Card";
import Modal from "./Modal";

type Props = { row: RowT; profile: Profile; onOpen: (slug: string) => void };

export default function Row({ row, profile, onOpen }: Props) {
  const scroller = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [grid, setGrid] = useState(false);
  const isTop = row.kind === "top10";
  const placeholderArt = row.id === "projects";

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const page = (dir: 1 | -1) => {
    const el = scroller.current;
    play("tick");
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  /** Arrow keys move focus between cards; Enter opens (native button behaviour). */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const cards = Array.from(scroller.current?.querySelectorAll<HTMLButtonElement>("[data-card]") ?? []);
    const i = cards.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    e.preventDefault();
    const next = cards[Math.min(cards.length - 1, Math.max(0, i + (e.key === "ArrowRight" ? 1 : -1)))];
    next.focus({ preventScroll: true });
    next.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  };

  const headingId = `row-${row.id}`;

  return (
    <section aria-labelledby={headingId} className="group/row relative" data-row={row.id}>
      <div className="gutter flex items-baseline justify-between gap-4">
        <h2 id={headingId} className="font-display text-[clamp(24px,2.2vw,28px)] font-semibold tracking-[-0.01em] text-ink">
          {row.title}
        </h2>
        {row.items.length > 2 && (
          <button
            type="button"
            onClick={() => setGrid(true)}
            className="shrink-0 text-sm font-medium text-muted transition-colors duration-200 hover:text-ink"
          >
            Explore all <span aria-hidden>›</span>
          </button>
        )}
      </div>

      <div className="relative mt-3">
        <ul
          ref={scroller}
          onScroll={measure}
          onKeyDown={onKeyDown}
          className="no-scrollbar gutter flex snap-x snap-mandatory gap-[var(--card-gap)] overflow-x-auto scroll-px-[var(--gutter)] pb-2 pt-1"
        >
          {row.items.map((item, i) => (
            <li key={item.slug} className="contents">
              <Card item={item} profile={profile} onOpen={onOpen} rank={isTop ? i + 1 : undefined} preferPlaceholder={placeholderArt} />
            </li>
          ))}
        </ul>

        {!edges.start && (
          <button
            type="button"
            aria-label={`Scroll ${row.title} left`}
            onClick={() => page(-1)}
            className="absolute inset-y-1 left-0 z-10 hidden w-[var(--gutter)] items-center justify-center bg-gradient-to-r from-bg/95 to-bg/30 text-ink opacity-0 transition-opacity duration-200 focus-visible:opacity-100 group-hover/row:opacity-100 lg:flex"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
        )}
        {!edges.end && (
          <button
            type="button"
            aria-label={`Scroll ${row.title} right`}
            onClick={() => page(1)}
            className="absolute inset-y-1 right-0 z-10 hidden w-[var(--gutter)] items-center justify-center bg-gradient-to-l from-bg/95 to-bg/30 text-ink opacity-0 transition-opacity duration-200 focus-visible:opacity-100 group-hover/row:opacity-100 lg:flex"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        )}
      </div>

      <Modal open={grid} onClose={() => setGrid(false)} label={row.title} width={1100}>
        <div className="p-6 pt-16 sm:p-10">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{row.title}</h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-3">
            {row.items.map((item) => (
              <li key={item.slug}>
                <button
                  type="button"
                  onClick={() => {
                    setGrid(false);
                    window.setTimeout(() => onOpen(item.slug), 50);
                  }}
                  className="group block w-full text-left"
                >
                  <span className="block aspect-video overflow-hidden rounded-[12px] transition-transform duration-200 ease-out group-hover:scale-[1.03]">
                    <Art item={item} preferPlaceholder={placeholderArt} />
                  </span>
                  <span className="mt-2 block font-medium text-ink">{item.title}</span>
                  <span className="block text-sm text-muted">{item.kicker}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </section>
  );
}
