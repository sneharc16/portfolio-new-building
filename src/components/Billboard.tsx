import { Info } from "lucide-react";
import { hero, heroLogos, identity, profileMeta, type Profile } from "@/data/content";
import LogoTile from "./LogoTile";
import ResumeButton from "./ResumeButton";

type Props = { profile: Profile; onAbout: () => void };

/** Full-viewport hero. The moving gradient is pure CSS in the profile accent: no video, no image assets. */
export default function Billboard({ profile, onAbout }: Props) {
  const accent = profileMeta[profile].accent;
  const copy = hero[profile];
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden" aria-label="Introduction">
      <div className="absolute inset-0 bg-bg" aria-hidden>
        <div
          className="billboard-glow absolute -right-[20%] -top-[30%] h-[120%] w-[90%] rounded-full opacity-90 blur-[80px]"
          style={{ background: `radial-gradient(closest-side, ${accent}, transparent)` }}
        />
        <div
          className="billboard-glow-2 absolute -bottom-[40%] left-[10%] h-[80%] w-[60%] rounded-full opacity-50 blur-[100px]"
          style={{ background: `radial-gradient(closest-side, ${accent}, transparent)` }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse at 70% 30%, black, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="gutter relative w-full pb-[clamp(56px,12vh,120px)] pt-28">
        <p className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.2em] text-muted">
          <span className="h-3 w-[3px] rounded-full bg-accent" aria-hidden />
          {copy.label}
        </p>
        <h1 className="font-display mt-4 max-w-[14ch] text-[clamp(40px,7vw,76px)] font-bold leading-[0.98] tracking-[-0.035em] text-white">
          {identity.name}
        </h1>
        <p className="mt-5 max-w-[56ch] text-[clamp(15px,1.45vw,19px)] leading-relaxed text-ink">{copy.tagline}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ResumeButton profile={profile} variant="hero" />
          <button
            type="button"
            onClick={onAbout}
            className="inline-flex h-12 items-center gap-2 rounded-md bg-white/15 px-6 text-[15px] font-semibold text-white backdrop-blur transition-colors duration-200 hover:bg-white/25"
          >
            <Info className="h-5 w-5" aria-hidden />
            About me
          </button>
        </div>

        <ul className="mt-10 flex flex-wrap gap-2 sm:gap-2.5" aria-label="Organisations">
          {heroLogos.map((k) => (
            <li key={k}>
              <LogoTile logo={k} className="h-10 w-[62px] min-[400px]:h-11 min-[400px]:w-[68px] sm:h-14 sm:w-[100px]" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
