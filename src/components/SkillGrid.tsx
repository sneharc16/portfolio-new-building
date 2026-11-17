import { skillsFor, type Profile } from "@/data/content";

export default function SkillGrid({ profile }: { profile: Profile }) {
  const groups = Object.entries(skillsFor(profile));
  return (
    <section aria-labelledby="row-skills" className="gutter">
      <h2 id="row-skills" className="font-display text-[clamp(24px,2.2vw,28px)] font-semibold tracking-[-0.01em] text-ink">
        Skills
      </h2>
      <div className={`mt-4 grid gap-4 md:grid-cols-2 ${groups.length === 4 ? "xl:grid-cols-4" : "xl:grid-cols-3"}`}>
        {groups.map(([group, list]) => (
          <div key={group} className="rounded-xl bg-surface p-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{group}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {list.map((s) => (
                <li key={s} className="rounded-full border border-white/10 bg-elevated px-3 py-1 text-[13px] text-ink">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
