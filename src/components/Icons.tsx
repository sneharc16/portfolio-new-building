import {
  ChefHat,
  CirclePlay,
  Code2,
  ExternalLink,
  FileText,
  Globe,
  Presentation,
  Ticket,
  UserRound,
  type LucideProps,
} from "lucide-react";
import type { LinkKey } from "@/data/content";

type IconProps = { className?: string };

export function GithubIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8 .6A12 12 0 0 0 12 .3" />
    </svg>
  );
}

export function LinkedinIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export const LeetcodeIcon = (p: LucideProps) => <Code2 {...p} />;
export const CodechefIcon = (p: LucideProps) => <ChefHat {...p} />;

export const linkMeta: Record<LinkKey, { label: string; Icon: (p: { className?: string }) => React.ReactNode }> = {
  github: { label: "GitHub", Icon: GithubIcon },
  live: { label: "Live site", Icon: (p) => <Globe {...p} /> },
  paper: { label: "Paper", Icon: (p) => <FileText {...p} /> },
  report: { label: "Report", Icon: (p) => <FileText {...p} /> },
  deck: { label: "Deck", Icon: (p) => <Presentation {...p} /> },
  demo: { label: "Demo", Icon: (p) => <CirclePlay {...p} /> },
  event: { label: "Event", Icon: (p) => <Ticket {...p} /> },
  profile: { label: "Profile", Icon: (p) => <UserRound {...p} /> },
};

export { ExternalLink };
