import type { Item, LinkKey } from "@/data/content";
import { TODO } from "@/data/content";
import { ExternalLink, linkMeta } from "./Icons";

const ORDER: LinkKey[] = ["live", "github", "paper", "report", "deck", "demo", "event", "profile"];

export function linkEntries(item: Item): [LinkKey, string][] {
  return ORDER.filter((k) => item.links[k]).map((k) => [k, item.links[k]!]);
}

/** Round icon buttons for card previews. TODO links render disabled with a "coming soon" label. */
export function IconLinks({ item }: { item: Item }) {
  return (
    <>
      {linkEntries(item).map(([key, url]) => {
        const { label, Icon } = linkMeta[key];
        const base =
          "inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-200";
        if (url === TODO)
          return (
            <span
              key={key}
              role="img"
              aria-label={`${label}: coming soon`}
              title={`${label}: coming soon`}
              className={`${base} cursor-not-allowed border-white/15 text-white/30`}
            >
              <Icon className="h-4 w-4" />
            </span>
          );
        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} for ${item.title} (opens in a new tab)`}
            title={label}
            onClick={(e) => e.stopPropagation()}
            className={`${base} border-white/40 text-white hover:border-white hover:bg-white/10`}
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </>
  );
}

/** Full-width labelled buttons for the detail modal. */
export function LabelledLinks({ item }: { item: Item }) {
  const entries = linkEntries(item);
  if (!entries.length) return null;
  return (
    <ul className="flex flex-col gap-2">
      {entries.map(([key, url]) => {
        const { label, Icon } = linkMeta[key];
        const cls =
          "flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium transition-colors duration-200";
        return (
          <li key={key}>
            {url === TODO ? (
              <span aria-disabled="true" className={`${cls} cursor-not-allowed bg-white/5 text-white/40`}>
                <Icon className="h-4 w-4" />
                {label}
                <span className="ml-auto text-xs">Coming soon</span>
              </span>
            ) : (
              <a href={url} target="_blank" rel="noopener noreferrer" className={`${cls} bg-white/10 text-ink hover:bg-white/20`}>
                <Icon className="h-4 w-4" />
                {label}
                <ExternalLink className="ml-auto h-3.5 w-3.5 text-muted" aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
