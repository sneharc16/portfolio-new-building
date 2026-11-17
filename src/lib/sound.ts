/**
 * Original UI sounds, synthesised at runtime with the Web Audio API (no audio files, no third-party sounds).
 * Browsers only allow audio after a user gesture, so the context is created lazily on first play.
 * Muting is remembered in localStorage.
 */

export type Sound = "intro" | "click" | "tick" | "open" | "close" | "chime";

const KEY = "sr-sound";
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
const listeners = new Set<(muted: boolean) => void>();

export function isMuted(): boolean {
  try {
    return window.localStorage.getItem(KEY) === "off";
  } catch {
    return false;
  }
}

export function setMuted(muted: boolean) {
  try {
    window.localStorage.setItem(KEY, muted ? "off" : "on");
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l(muted));
}

export function onMuteChange(fn: (muted: boolean) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function audio(): { ac: AudioContext; out: GainNode } | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.55;
    const comp = ctx.createDynamicsCompressor();
    master.connect(comp).connect(ctx.destination);
  }
  if (ctx.state === "suspended") void ctx.resume();
  return { ac: ctx, out: master! };
}

function tone(ac: AudioContext, out: AudioNode, opts: { type?: OscillatorType; from: number; to?: number; at: number; dur: number; gain: number; attack?: number }) {
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = opts.type ?? "sine";
  osc.frequency.setValueAtTime(opts.from, opts.at);
  if (opts.to) osc.frequency.exponentialRampToValueAtTime(opts.to, opts.at + opts.dur);
  const attack = opts.attack ?? 0.005;
  g.gain.setValueAtTime(0.0001, opts.at);
  g.gain.exponentialRampToValueAtTime(opts.gain, opts.at + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, opts.at + opts.dur);
  osc.connect(g).connect(out);
  osc.start(opts.at);
  osc.stop(opts.at + opts.dur + 0.05);
}

function noise(ac: AudioContext, out: AudioNode, opts: { at: number; dur: number; gain: number; filter: BiquadFilterType; from: number; to?: number; q?: number }) {
  const len = Math.ceil(ac.sampleRate * opts.dur);
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  const src = ac.createBufferSource();
  src.buffer = buf;
  const f = ac.createBiquadFilter();
  f.type = opts.filter;
  f.Q.value = opts.q ?? 0.8;
  f.frequency.setValueAtTime(opts.from, opts.at);
  if (opts.to) f.frequency.exponentialRampToValueAtTime(opts.to, opts.at + opts.dur);
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, opts.at);
  g.gain.exponentialRampToValueAtTime(opts.gain, opts.at + opts.dur * 0.3);
  g.gain.exponentialRampToValueAtTime(0.0001, opts.at + opts.dur);
  src.connect(f).connect(g).connect(out);
  src.start(opts.at);
}

export function play(sound: Sound) {
  if (isMuted()) return;
  // Respect autoplay rules: no sound until the visitor has interacted with the page.
  const ua = (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation;
  if (ua && !ua.hasBeenActive) return;
  const a = audio();
  if (!a) return;
  const { ac, out } = a;
  const t = ac.currentTime + 0.01;

  switch (sound) {
    case "intro": {
      // Two low cinematic hits, then a warm open-fifth swell.
      tone(ac, out, { from: 110, to: 46, at: t, dur: 0.5, gain: 0.9, attack: 0.004 });
      noise(ac, out, { at: t, dur: 0.18, gain: 0.25, filter: "lowpass", from: 900, to: 120 });
      tone(ac, out, { from: 98, to: 41, at: t + 0.32, dur: 0.9, gain: 1, attack: 0.004 });
      noise(ac, out, { at: t + 0.32, dur: 0.25, gain: 0.3, filter: "lowpass", from: 800, to: 100 });
      for (const [f, g] of [
        [146.8, 0.16],
        [220, 0.12],
        [293.7, 0.08],
        [440, 0.04],
      ] as const) {
        tone(ac, out, { type: "triangle", from: f, at: t + 0.34, dur: 1.8, gain: g, attack: 0.25 });
      }
      break;
    }
    case "click":
      tone(ac, out, { type: "triangle", from: 1400, to: 700, at: t, dur: 0.06, gain: 0.18 });
      noise(ac, out, { at: t, dur: 0.03, gain: 0.08, filter: "highpass", from: 3000 });
      break;
    case "tick":
      tone(ac, out, { from: 2200, to: 1800, at: t, dur: 0.035, gain: 0.05 });
      break;
    case "open":
      noise(ac, out, { at: t, dur: 0.28, gain: 0.16, filter: "bandpass", from: 300, to: 2400, q: 1.2 });
      tone(ac, out, { from: 220, to: 330, at: t + 0.05, dur: 0.25, gain: 0.06, attack: 0.04 });
      break;
    case "close":
      noise(ac, out, { at: t, dur: 0.22, gain: 0.12, filter: "bandpass", from: 2000, to: 300, q: 1.2 });
      break;
    case "chime":
      tone(ac, out, { from: 880, at: t, dur: 0.35, gain: 0.08 });
      tone(ac, out, { from: 1318.5, at: t + 0.09, dur: 0.45, gain: 0.07 });
      break;
  }
}
