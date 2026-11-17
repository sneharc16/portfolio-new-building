"use client";

import { motion } from "framer-motion";
import type { Profile } from "@/data/content";

type Props = {
  profile: Profile;
  item: string | null;
  onOpenItem: (slug: string | null) => void;
  onSwitchProfile: () => void;
  onChooseProfile: (p: Profile) => void;
};

export default function Home({ profile, onSwitchProfile }: Props) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="gutter min-h-screen py-24"
    >
      <p className="text-muted">Home ({profile}) is built in Phase 4.</p>
      <button type="button" onClick={onSwitchProfile} className="mt-4 underline">
        Switch profile
      </button>
    </motion.main>
  );
}
