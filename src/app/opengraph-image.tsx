import { ImageResponse } from "next/og";
import { hero, identity } from "@/data/content";

export const alt = `${identity.name}: ${hero.tech.label}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social card generated from the billboard: near-black, accent glow, name and tagline. */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px",
          background: "radial-gradient(circle at 85% 15%, #3B82F6 0%, rgba(59,130,246,0.35) 28%, #0B0B0B 62%), #0B0B0B",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, letterSpacing: 6, textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>
          <div style={{ width: 5, height: 26, borderRadius: 3, background: "#3B82F6" }} />
          Tech · Product
        </div>
        <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: -3, marginTop: 18, lineHeight: 1 }}>{identity.name}</div>
        <div style={{ fontSize: 30, marginTop: 26, maxWidth: 980, lineHeight: 1.35, color: "rgba(255,255,255,0.88)" }}>{hero.tech.tagline}</div>
      </div>
    ),
    size,
  );
}
