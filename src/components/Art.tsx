/* eslint-disable @next/next/no-img-element -- art is optional and swapped in later */
import type { Item } from "@/data/content";
import { initialsOf } from "@/lib/slug";
import LogoTile from "./LogoTile";

/**
 * Card art. Order of preference: supplied screenshot (item.art) → white logo tile →
 * dark placeholder with the project's initials and a thin accent line.
 */
export default function Art({ item, preferPlaceholder = false, className = "" }: { item: Item; preferPlaceholder?: boolean; className?: string }) {
  if (item.art) {
    return <img src={item.art} alt={item.title} className={`h-full w-full rounded-[12px] object-cover ${className}`} />;
  }
  if (item.logo && !preferPlaceholder) {
    return <LogoTile logo={item.logo} name={item.org} className={`h-full w-full ${className}`} />;
  }
  return <Placeholder item={item} className={className} />;
}

export function Placeholder({ item, className = "" }: { item: Item; className?: string }) {
  return (
    <div
      role="img"
      aria-label={item.title}
      className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-[12px] bg-gradient-to-br from-[#1F1F1F] to-[#121212] ${className}`}
      style={{ containerType: "size" }}
    >
      <span className="font-display font-semibold tracking-[-0.04em] text-white/85" style={{ fontSize: "min(34cqh, 22cqw)" }}>
        {initialsOf(item.title)}
      </span>
      <span className="absolute bottom-[9%] left-[8%] flex max-w-[84%] flex-col gap-[max(4px,3cqh)]">
        <span className="h-[2px] w-[min(48px,22cqw)] bg-accent" aria-hidden />
        <span className="truncate text-[clamp(9px,7cqh,12px)] uppercase tracking-[0.14em] text-white/50">
          {item.title.split(/[:(]/)[0].trim()}
        </span>
      </span>
    </div>
  );
}
