import type { Item, Profile } from "@/data/content";

/** "Tech 98% match", using the pack's number for the active profile. Hidden when the pack gives none. */
export default function MatchTag({ item, profile, compact = false }: { item: Item; profile: Profile; compact?: boolean }) {
  const score = profile === "tech" ? item.matchTech : item.matchProduct;
  if (score == null) return null;
  const lane = profile === "tech" ? "Tech" : "Product";
  return (
    <span className={`font-semibold text-[#46D369] ${compact ? "" : "text-sm"}`}>
      {lane} {score}% match
    </span>
  );
}
