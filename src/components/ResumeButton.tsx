"use client";

import { Download, ExternalLink, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { identity, type Profile } from "@/data/content";
import { play } from "@/lib/sound";

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent("sr-toast", { detail: message }));
}

/** Checks once per path whether the PDF has been dropped into /public/resume yet. */
const cache = new Map<string, Promise<boolean>>();
function useExists(path: string) {
  const [exists, setExists] = useState<boolean | null>(null);
  useEffect(() => {
    let alive = true;
    if (!cache.has(path)) {
      cache.set(
        path,
        fetch(path, { method: "HEAD" })
          .then((r) => r.ok && (r.headers.get("content-type") ?? "").includes("pdf"))
          .catch(() => false),
      );
    }
    cache.get(path)!.then((ok) => alive && setExists(ok));
    return () => {
      alive = false;
    };
  }, [path]);
  return exists;
}

const COMING_SOON = "Resume coming soon";

type Props = { profile: Profile; variant: "nav" | "hero" };

/**
 * TECH → /resume/sneha-tech.pdf, PRODUCT → /resume/sneha-product.pdf.
 * Download uses an anchor with `download`; "View" opens it in a new tab.
 * If the PDF is missing the button still renders and shows a "Resume coming soon" toast.
 */
export default function ResumeButton({ profile, variant }: Props) {
  const path = identity.resume[profile];
  const exists = useExists(path);
  const fileName = `Sneha-Roychowdhury-${profile === "tech" ? "SDE" : "APM"}-Resume.pdf`;
  const guard = (e: React.MouseEvent) => {
    if (exists === false) {
      e.preventDefault();
      toast(COMING_SOON);
    }
  };

  if (variant === "hero") {
    return (
      <div className="flex items-center gap-2">
        <a
          href={path}
          target="_blank"
          rel="noopener noreferrer"
          onClick={guard}
          className="inline-flex h-12 items-center gap-2 rounded-md bg-accent px-6 text-[15px] font-semibold text-white transition-[filter] duration-200 hover:brightness-110"
        >
          <FileText className="h-5 w-5" aria-hidden />
          View Resume
        </a>
        <a
          href={path}
          download={fileName}
          onClick={guard}
          aria-label="Download resume"
          title="Download"
          className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-white/15 text-white backdrop-blur transition-colors duration-200 hover:bg-white/25"
        >
          <Download className="h-5 w-5" aria-hidden />
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center overflow-hidden rounded-md bg-white/10 text-sm font-medium text-ink">
      <a
        href={path}
        download={fileName}
        onClick={guard}
        className="inline-flex h-9 items-center gap-1.5 px-3 transition-colors duration-200 hover:bg-white/15"
      >
        <Download className="h-4 w-4" aria-hidden />
        Resume
      </a>
      <a
        href={path}
        target="_blank"
        rel="noopener noreferrer"
        onClick={guard}
        aria-label="View resume in a new tab"
        title="View"
        className="inline-flex h-9 items-center border-l border-white/10 px-2.5 transition-colors duration-200 hover:bg-white/15"
      >
        <ExternalLink className="h-4 w-4" aria-hidden />
      </a>
    </div>
  );
}

export function Toaster() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    let t: number | undefined;
    const on = (e: Event) => {
      setMsg((e as CustomEvent<string>).detail);
      play("chime");
      window.clearTimeout(t);
      t = window.setTimeout(() => setMsg(null), 2600);
    };
    window.addEventListener("sr-toast", on);
    return () => {
      window.removeEventListener("sr-toast", on);
      window.clearTimeout(t);
    };
  }, []);
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[100] flex justify-center px-4">
      {msg && (
        <div role="status" className="rounded-md bg-elevated px-4 py-3 text-sm text-ink shadow-xl ring-1 ring-white/10">
          {msg}
        </div>
      )}
    </div>
  );
}
