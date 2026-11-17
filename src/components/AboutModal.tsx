"use client";

import { about, identity, timeline } from "@/data/content";
import LogoTile from "./LogoTile";
import Modal from "./Modal";

export default function AboutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} label={`About ${identity.name}`}>
      <div className="px-5 pb-10 pt-16 sm:px-10 sm:pt-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          {/* Photo placeholder: swap for an <img> when a photo is supplied. */}
          <div
            role="img"
            aria-label={`${identity.name} (photo placeholder)`}
            className="font-display flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-accent text-4xl font-semibold tracking-tight text-white"
          >
            {identity.initials}
          </div>
          <div>
            <h2 className="font-display text-[clamp(26px,4vw,40px)] font-semibold leading-tight tracking-[-0.02em]">{identity.name}</h2>
            <p className="mt-1 text-muted">Open to SDE and APM roles from January 2027</p>
          </div>
        </div>

        <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-ink">
          {about.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-4 rounded-xl bg-elevated p-4">
          <LogoTile logo={identity.education.logo} className="aspect-video w-28 shrink-0" />
          <div>
            <p className="font-medium text-ink">{identity.education.degree}</p>
            <p className="text-sm text-muted">
              {identity.education.institute}, {identity.education.years}
            </p>
          </div>
        </div>

        <h3 className="font-display mt-10 text-xl font-semibold tracking-tight">Timeline</h3>
        <div className="no-scrollbar -mx-5 mt-4 overflow-x-auto px-5 sm:-mx-10 sm:px-10">
          <ol className="relative flex min-w-[880px] gap-0 pr-6 pt-6">
            <span className="absolute left-0 right-0 top-[29px] h-px bg-white/20" aria-hidden />
            {timeline.map((t, i) => (
              <li key={t.label + t.text} className="relative flex-1 pr-3">
                <span
                  className={`relative z-10 block h-3 w-3 rounded-full ring-4 ring-surface ${i === timeline.length - 1 ? "bg-accent" : "bg-white"}`}
                  aria-hidden
                />
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.08em] text-ink">{t.label}</p>
                <p className="mt-1 text-[13px] leading-snug text-muted">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Modal>
  );
}
