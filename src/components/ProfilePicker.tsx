"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profileMeta, type Profile } from "@/data/content";
import { PROFILES } from "@/lib/profile";

/** Generated geometric avatar per profile: no faces, no stock imagery. */
export function ProfileAvatar({ profile, className = "" }: { profile: Profile; className?: string }) {
  const accent = profileMeta[profile].accent;
  const id = `av-${profile}`;
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={accent} />
          <stop offset="1" stopColor={accent} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="10" fill="#0B0B0B" />
      <rect width="120" height="120" rx="10" fill={`url(#${id}-bg)`} />
      {profile === "tech" && (
        <g fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M44 38 L22 60 L44 82" />
          <path d="M76 38 L98 60 L76 82" />
          <path d="M66 30 L54 90" strokeOpacity="0.55" />
        </g>
      )}
      {profile === "product" && (
        <g fill="none" stroke="#fff" strokeWidth="6">
          <circle cx="60" cy="60" r="34" strokeOpacity="0.45" />
          <circle cx="60" cy="60" r="20" strokeOpacity="0.75" />
          <circle cx="60" cy="60" r="6" fill="#fff" stroke="none" />
          <path d="M60 60 L92 28" strokeLinecap="round" />
          <path d="M84 24 L94 26 L96 36" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
      {profile === "both" && (
        <g fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="46" cy="60" r="26" strokeOpacity="0.6" />
          <rect x="52" y="34" width="44" height="52" rx="6" strokeOpacity="0.95" />
          <path d="M64 52 L58 60 L64 68" />
          <path d="M84 52 L90 60 L84 68" />
        </g>
      )}
    </svg>
  );
}

type Props = { onSelect: (p: Profile) => void };

export default function ProfilePicker({ onSelect }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.main
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

      <ul className="mt-10 flex w-full max-w-[880px] flex-col items-center gap-6 sm:mt-14 sm:flex-row sm:items-start sm:justify-center sm:gap-8">
        {PROFILES.map((p) => {
          const meta = profileMeta[p];
          return (
            <li key={p} className="w-full max-w-[260px] sm:w-auto sm:flex-1">
              <button
                type="button"
                onClick={() => onSelect(p)}
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
    </motion.main>
  );
}
