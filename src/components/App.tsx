"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { getItem, profileMeta, type Profile } from "@/data/content";
import { parseProfile, storeProfile, urlFor } from "@/lib/profile";
import Home from "./Home";
import ProfilePicker from "./ProfilePicker";

type Props = { initialProfile: Profile | null; initialItem: string | null };

/** Owns the two pieces of URL state: ?profile and ?item. History is kept in sync without a server round trip. */
export default function App({ initialProfile, initialItem }: Props) {
  const [profile, setProfile] = useState<Profile | null>(initialProfile);
  const [item, setItem] = useState<string | null>(initialProfile && getItem(initialItem) ? initialItem : null);

  useEffect(() => {
    if (initialProfile) storeProfile(initialProfile);
    const onPop = () => {
      const sp = new URLSearchParams(window.location.search);
      const p = parseProfile(sp.get("profile"));
      setProfile(p);
      const i = sp.get("item");
      setItem(p && getItem(i) ? i : null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [initialProfile]);

  const choose = useCallback((p: Profile) => {
    storeProfile(p);
    setProfile(p);
    setItem(null);
    window.history.pushState(null, "", urlFor(p));
    window.scrollTo({ top: 0 });
  }, []);

  const switchProfile = useCallback(() => {
    setProfile(null);
    setItem(null);
    window.history.pushState(null, "", "/");
    window.scrollTo({ top: 0 });
  }, []);

  const openItem = useCallback(
    (slug: string | null) => {
      setItem(slug);
      window.history[slug ? "pushState" : "replaceState"](null, "", urlFor(profile, slug));
    },
    [profile],
  );

  const accent = profile ? profileMeta[profile].accent : "#FFFFFF";

  return (
    <div style={{ ["--accent" as string]: accent }}>
      <AnimatePresence mode="wait" initial={false}>
        {profile ? (
          <Home
            key={`home-${profile}`}
            profile={profile}
            item={item}
            onOpenItem={openItem}
            onSwitchProfile={switchProfile}
            onChooseProfile={choose}
          />
        ) : (
          <ProfilePicker key="picker" onSelect={choose} />
        )}
      </AnimatePresence>
    </div>
  );
}
