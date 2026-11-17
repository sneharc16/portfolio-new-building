import type { Metadata } from "next";
import LogoTile from "@/components/LogoTile";
import { logoFiles, logoNames } from "@/lib/logos";

export const metadata: Metadata = {
  title: "Logo tiles",
  robots: { index: false, follow: false },
};

/** Hidden QA route: every logo tile in one grid, to check they read as one set. */
export default function LogosPage() {
  const keys = Object.keys(logoNames);
  return (
    <main className="gutter min-h-screen py-12">
      <h1 className="font-display text-2xl font-semibold tracking-tight">Logo tiles</h1>
      <p className="mt-2 text-muted">
        {keys.length} organisations, {keys.filter((k) => !logoFiles[k]).length} on the initials fallback.
      </p>
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {keys.map((k) => (
          <li key={k}>
            <LogoTile logo={k} className="aspect-video w-full" />
            <p className="mt-2 text-xs text-muted">
              {k}
              {!logoFiles[k] && " · initials"}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
