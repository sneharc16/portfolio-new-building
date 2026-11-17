"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSyncExternalStore } from "react";
import { isMuted, onMuteChange, play, setMuted } from "@/lib/sound";

export default function SoundToggle() {
  const muted = useSyncExternalStore(onMuteChange, isMuted, () => false);
  return (
    <button
      type="button"
      onClick={() => {
        setMuted(!muted);
        if (muted) play("click");
      }}
      aria-pressed={!muted}
      aria-label={muted ? "Turn sound on" : "Turn sound off"}
      title={muted ? "Sound off" : "Sound on"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink transition-colors duration-200 hover:bg-white/10"
    >
      {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
    </button>
  );
}
