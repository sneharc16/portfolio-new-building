import { Mail, Phone } from "lucide-react";
import { identity } from "@/data/content";
import { CodechefIcon, GithubIcon, LeetcodeIcon, LinkedinIcon } from "./Icons";

const SOCIAL = [
  { href: identity.social.github, label: "GitHub", Icon: GithubIcon },
  { href: identity.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: identity.social.leetcode, label: "LeetCode", Icon: LeetcodeIcon },
  { href: identity.social.codechef, label: "CodeChef", Icon: CodechefIcon },
];

export default function ContactBand() {
  return (
    <section aria-labelledby="row-contact">
      <div className="gutter">
        <div className="relative overflow-hidden rounded-2xl bg-surface px-6 py-10 sm:px-10 sm:py-14">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-[80px]"
            style={{ background: "var(--accent)" }}
            aria-hidden
          />
          <h2 id="row-contact" className="font-display relative text-[clamp(26px,3.6vw,44px)] font-semibold leading-tight tracking-[-0.02em]">
            Let&apos;s talk.
          </h2>
          <p className="relative mt-2 max-w-[52ch] text-muted">Open to SDE and APM roles starting January 2027.</p>
          <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <a href={`mailto:${identity.email}`} className="inline-flex items-center gap-2 text-lg font-medium text-ink hover:underline">
              <Mail className="h-5 w-5 text-accent" aria-hidden /> {identity.email}
            </a>
            <a href={`tel:${identity.phone.replace(/[^+\d]/g, "")}`} className="inline-flex items-center gap-2 text-lg font-medium text-ink hover:underline">
              <Phone className="h-5 w-5 text-accent" aria-hidden /> {identity.phone}
            </a>
          </div>
          <ul className="relative mt-8 flex gap-3">
            {SOCIAL.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  title={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-ink transition-colors duration-200 hover:bg-white/20"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <footer className="gutter py-10 text-sm text-muted">Designed and built by {identity.name}, 2026</footer>
    </section>
  );
}
