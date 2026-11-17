"use client";

import { m, useReducedMotion } from "framer-motion";
import { profileMeta, type Profile } from "@/data/content";
import { PROFILES } from "@/lib/profile";
import { play } from "@/lib/sound";

/**
 * Original streaming-style profile avatars: a flat colour square with a simple face.
 * Drawn from scratch (no third-party artwork); Tech wears glasses, Product winks.
 */
export function ProfileAvatar({ profile, className = "" }: { profile: Profile; className?: string }) {
  const accent = profileMeta[profile].accent;
  const face = profile === "tech" ? "#0B1E3F" : "#3B2300";
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <rect width="120" height="120" rx="8" fill={accent} />
      {profile === "tech" ? (
        <g fill="none" stroke={face} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="24" y="36" width="28" height="22" rx="7" />
          <rect x="68" y="36" width="28" height="22" rx="7" />
          <path d="M52 45 H68" />
          <circle cx="38" cy="47" r="3.5" fill={face} stroke="none" />
          <circle cx="82" cy="47" r="3.5" fill={face} stroke="none" />
          <path d="M40 78 Q60 94 80 78" strokeWidth="6" />
        </g>
      ) : (
        <g fill="none" stroke={face} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="40" cy="46" r="6" fill={face} stroke="none" />
          <path d="M72 47 Q80 41 88 47" />
          <path d="M36 74 Q60 98 84 74" />
          <path d="M84 74 L88 70" strokeWidth="5" />
        </g>
      )}
    </svg>
  );
}

type Props = { onSelect: (p: Profile) => void };

export default function ProfilePicker({ onSelect }: Props) {
  const reduce = useReducedMotion();
  return (
    <m.main
      key="picker"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: reduce ? 1 : 1.04 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="gutter flex min-h-[100svh] flex-col items-center justify-center bg-bg py-16"
    >
      <h1 className="font-display text-center text-[clamp(28px,5vw,52px)] font-semibold tracking-[-0.02em] text-ink">
        Who&apos;s viewing?
      </h1>
      <p className="mt-3 text-center text-muted">Pick a lens. Same person, different highlights.</p>

      <ul className="mt-10 flex w-full max-w-[620px] flex-col items-center gap-6 sm:mt-14 sm:flex-row sm:items-start sm:justify-center sm:gap-8">
        {PROFILES.map((p) => {
          const meta = profileMeta[p];
          return (
            <li key={p} className="w-full max-w-[260px] sm:w-auto sm:flex-1">
              <button
                type="button"
                onClick={() => onSelect(p)}
                onMouseEnter={() => play("tick")}
                className="group flex w-full items-center gap-4 rounded-xl p-2 text-left outline-none transition-transform duration-200 ease-out hover:scale-[1.06] focus-visible:scale-[1.06] sm:flex-col sm:gap-0 sm:text-center"
                style={{ ["--accent" as string]: meta.accent }}
                aria-label={`${meta.label}: ${meta.subtitle}`}
                data-profile={p}
              >
                <span className="relative block w-20 shrink-0 sm:w-full">
                  <span
                    aria-hidden
                    className="absolute -inset-3 rounded-2xl opacity-0 blur-2xl transition-opacity duration-200 ease-out group-hover:opacity-60 group-focus-visible:opacity-60"
                    style={{ background: meta.accent }}
                  />
                  <ProfileAvatar
                    profile={p}
                    className="relative block aspect-square w-full rounded-[10px] ring-2 ring-transparent transition-shadow duration-200 group-hover:ring-white/80 group-focus-visible:ring-white/90"
                  />
                </span>
                <span className="block min-w-0 sm:mt-5">
                  <span className="font-display block text-lg font-semibold uppercase tracking-[0.18em] text-muted transition-colors duration-200 group-hover:text-ink group-focus-visible:text-ink">
                    {meta.label}
                  </span>
                  <span className="mt-1 block text-sm text-muted">{meta.subtitle}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </m.main>
  );
}
