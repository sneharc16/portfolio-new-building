"use client";

import { useState } from "react";
import { initialsFor, logoFiles, logoNames } from "@/lib/logos";

type Props = {
  logo?: string;
  /** Used for alt text and initials when the key has no file. */
  name?: string;
  className?: string;
  /** Relative font size of the initials fallback. */
  initialsScale?: number;
};

/**
 * A pure white tile (radius 12px) with the logo centred: 20% side padding, logo capped at
 * 60% width and 50% height, object-fit contain. Missing files fall back to dark-grey initials.
 */
export default function LogoTile({ logo, name, className = "", initialsScale = 1 }: Props) {
  const [failed, setFailed] = useState(false);
  const src = logo ? logoFiles[logo] : undefined;
  const label = (logo && logoNames[logo]) || name || "Logo";

  return (
    <div
      className={`logo-tile relative flex items-center justify-center overflow-hidden rounded-[12px] bg-white ${className}`}
      style={{ containerType: "size" }}
    >
      {src && !failed ? (
        <div className="absolute inset-y-[25%] inset-x-[20%] flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- static SVG/PNG logos, sized by the tile */}
          <img
            src={src}
            alt={label}
            loading="lazy"
            decoding="async"
            draggable={false}
            onError={() => setFailed(true)}
            className="h-full w-full object-contain"
          />
        </div>
      ) : (
        <span
          role="img"
          aria-label={label}
          className="font-display select-none font-semibold tracking-tight text-[#3A3A3A]"
          style={{ fontSize: `calc(min(22cqh, 14cqw) * ${initialsScale})` }}
        >
          {initialsFor(logo, label)}
        </span>
      )}
    </div>
  );
}
