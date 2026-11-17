import type { Profile } from "@/data/content";

export const PROFILES: Profile[] = ["tech", "product"];
export const STORAGE_KEY = "sr-profile";

export function parseProfile(value: unknown): Profile | null {
  const v = Array.isArray(value) ? value[0] : value;
  return typeof v === "string" && (PROFILES as string[]).includes(v) ? (v as Profile) : null;
}

export function readStoredProfile(): Profile | null {
  try {
    return parseProfile(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

export function storeProfile(profile: Profile) {
  try {
    window.localStorage.setItem(STORAGE_KEY, profile);
  } catch {
    /* private mode: the URL still carries the profile */
  }
}

export function urlFor(profile: Profile | null, item?: string | null): string {
  const params = new URLSearchParams();
  if (profile) params.set("profile", profile);
  if (profile && item) params.set("item", item);
  const qs = params.toString();
  return qs ? `/?${qs}` : "/";
}

/**
 * Runs before first paint on "/": a returning visitor with no ?profile in the URL is sent
 * straight to their last profile, so the picker never flashes.
 */
export const returningVisitorScript = `(function(){try{var u=new URL(location.href);if(u.pathname!=="/"||u.searchParams.has("profile"))return;var p=localStorage.getItem(${JSON.stringify(
  STORAGE_KEY,
)});if(p==="tech"||p==="product"){u.searchParams.set("profile",p);location.replace(u.pathname+u.search+u.hash)}}catch(e){}})();`;
