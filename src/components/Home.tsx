"use client";

import { motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { getItem, projects, rowsFor, type Profile } from "@/data/content";
import AboutModal from "./AboutModal";
import Billboard from "./Billboard";
import ContactBand from "./ContactBand";
import DetailModal from "./DetailModal";
import FeatureRow from "./FeatureRow";
import Nav from "./Nav";
import { Toaster } from "./ResumeButton";
import Row from "./Row";
import SkillGrid from "./SkillGrid";

type Props = {
  profile: Profile;
  item: string | null;
  onOpenItem: (slug: string | null) => void;
  onSwitchProfile: () => void;
  onChooseProfile: (p: Profile) => void;
};

export default function Home({ profile, item, onOpenItem, onSwitchProfile, onChooseProfile }: Props) {
  const rows = useMemo(() => rowsFor(profile), [profile]);
  const [aboutOpen, setAboutOpen] = useState(false);
  const active = getItem(item);
  const close = useCallback(() => onOpenItem(null), [onOpenItem]);

  // "More like this": three other cards from the first card row that holds the item.
  const home = active ? rows.find((r) => r.kind !== "feature" && r.items.some((i) => i.slug === active.slug)) : undefined;
  const more = home && active ? home.items.filter((i) => i.slug !== active.slug).slice(0, 3) : [];
  const isProject = !!active && projects.some((p) => p.slug === active.slug);

  return (
    <motion.div
      id="top"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen bg-bg"
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-black">
        Skip to content
      </a>
      <Nav profile={profile} onSwitchProfile={onSwitchProfile} onChooseProfile={onChooseProfile} />
      <Billboard profile={profile} onAbout={() => setAboutOpen(true)} />

      <main id="main" className="relative z-10 -mt-[clamp(8px,4vh,48px)] flex flex-col gap-[clamp(36px,5vw,56px)] pb-4">
        {rows.map((row) => {
          const body =
            row.kind === "feature" ? (
              <FeatureRow row={row} profile={profile} onOpen={onOpenItem} />
            ) : row.kind === "skills" ? (
              <SkillGrid profile={profile} />
            ) : row.kind === "contact" ? (
              <ContactBand />
            ) : (
              <Row row={row} profile={profile} onOpen={onOpenItem} />
            );
          return (
            <div key={row.id} id={row.anchor} className="scroll-mt-20">
              {body}
            </div>
          );
        })}
      </main>

      <DetailModal item={active} profile={profile} more={more} placeholderArt={isProject} onOpen={onOpenItem} onClose={close} />
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <Toaster />
    </motion.div>
  );
}
