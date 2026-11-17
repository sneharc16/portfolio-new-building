/** URL-safe slug, e.g. "Top projects" -> "top-projects". */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Up to three initials for a title, used on project placeholder art. */
export function initialsOf(title: string): string {
  const words = title
    .replace(/\(.*?\)/g, " ")
    .split(/[\s:,-]+/)
    .filter((w) => /^[A-Za-z0-9]/.test(w));
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return words
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
