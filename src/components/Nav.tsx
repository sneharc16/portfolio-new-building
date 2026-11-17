"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Repeat, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { identity, profileMeta, type Profile } from "@/data/content";
import { PROFILES } from "@/lib/profile";
import { ProfileAvatar } from "./ProfilePicker";
import ResumeButton from "./ResumeButton";

export const ANCHORS = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "leadership", label: "Leadership" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

type Props = { profile: Profile; onSwitchProfile: () => void; onChooseProfile: (p: Profile) => void };

export default function Nav({ profile, onSwitchProfile, onChooseProfile }: Props) {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const [sheet, setSheet] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Scroll spy for the active underline.
  useEffect(() => {
    const els = ANCHORS.map((a) => document.getElementById(a.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [profile]);

  useEffect(() => {
    if (!menu) return;
    const off = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !menuRef.current?.contains(e.target as Node)) setMenu(false);
    };
    document.addEventListener("mousedown", off);
    document.addEventListener("keydown", off);
    return () => {
      document.removeEventListener("mousedown", off);
      document.removeEventListener("keydown", off);
    };
  }, [menu]);

  useEffect(() => {
    if (!sheet) return;
    const off = (e: KeyboardEvent) => e.key === "Escape" && setSheet(false);
    document.addEventListener("keydown", off);
    return () => document.removeEventListener("keydown", off);
  }, [sheet]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ease-out ${
        solid || sheet ? "bg-[#0B0B0B]/[0.92] backdrop-blur" : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <nav className="gutter flex h-16 items-center gap-6 lg:h-[72px]" aria-label="Primary">
        <a href="#top" className="font-display shrink-0 text-[15px] font-bold uppercase tracking-[0.28em] text-white sm:text-base">
          Sneha<span className="text-accent">.</span>
          <span className="hidden min-[420px]:inline"> Roychowdhury</span>
        </a>

        <ul className="hidden items-center gap-5 lg:flex">
          {ANCHORS.map((a) => (
            <li key={a.id}>
              <a
                href={`#${a.id}`}
                aria-current={active === a.id ? "true" : undefined}
                className={`relative py-2 text-sm transition-colors duration-200 hover:text-white ${active === a.id ? "font-semibold text-white" : "text-ink/80"}`}
              >
                {a.label}
                {active === a.id && <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-accent" aria-hidden />}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <ResumeButton profile={profile} variant="nav" />
          </div>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenu((m) => !m)}
              aria-expanded={menu}
              aria-haspopup="menu"
              aria-label={`Profile: ${profileMeta[profile].label}. Switch profile`}
              className="flex items-center gap-1.5 rounded-md p-1"
            >
              <ProfileAvatar profile={profile} className="h-8 w-8 rounded-[6px]" />
              <ChevronDown className={`h-4 w-4 text-ink transition-transform duration-200 ${menu ? "rotate-180" : ""}`} aria-hidden />
            </button>
            <AnimatePresence>
              {menu && (
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 top-12 w-56 overflow-hidden rounded-lg border border-white/10 bg-[#0B0B0B]/95 py-2 shadow-2xl backdrop-blur"
                >
                  {PROFILES.map((p) => (
                    <button
                      key={p}
                      role="menuitemradio"
                      aria-checked={p === profile}
                      type="button"
                      onClick={() => {
                        setMenu(false);
                        if (p !== profile) onChooseProfile(p);
                      }}
                      className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-ink hover:bg-white/10"
                    >
                      <ProfileAvatar profile={p} className="h-7 w-7 rounded-[5px]" />
                      <span className={p === profile ? "font-semibold" : ""}>{profileMeta[p].label}</span>
                      {p === profile && <span className="ml-auto text-xs text-muted">Viewing</span>}
                    </button>
                  ))}
                  <div className="my-2 h-px bg-white/10" />
                  <button
                    role="menuitem"
                    type="button"
                    onClick={() => {
                      setMenu(false);
                      onSwitchProfile();
                    }}
                    className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-ink hover:bg-white/10"
                  >
                    <Repeat className="h-4 w-4" aria-hidden /> Switch profile
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink lg:hidden"
            aria-label={sheet ? "Close menu" : "Open menu"}
            aria-expanded={sheet}
            onClick={() => setSheet((s) => !s)}
          >
            {sheet ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {sheet && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/10 lg:hidden"
          >
            <ul className="gutter flex flex-col py-3">
              {ANCHORS.map((a) => (
                <li key={a.id}>
                  <a href={`#${a.id}`} onClick={() => setSheet(false)} className="block py-3 text-lg font-medium text-ink">
                    {a.label}
                  </a>
                </li>
              ))}
              <li className="pt-3 sm:hidden">
                <ResumeButton profile={profile} variant="nav" />
              </li>
              <li className="pt-4 text-xs text-muted">{identity.email}</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
