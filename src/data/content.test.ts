import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { TODO, allItems, identity, rowsFor } from "./content";

// Built from parts so this file never contains the forbidden strings itself.
const FORBIDDEN = [["C", "G", "P", "A"].join(""), ["8", "6"].join(".")];
const ROOT = join(__dirname, "..", "..");

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (["node_modules", ".next", ".git", "screenshots", "test-results", "playwright-report"].includes(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(ts|tsx|js|mjs|json|md|css|sh|html|txt)$/.test(name) && name !== "pnpm-lock.yaml") out.push(p);
  }
  return out;
}

describe("content.ts", () => {
  it("has unique slugs", () => {
    const slugs = allItems.map((i) => i.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses https for every link (or the TODO placeholder)", () => {
    for (const item of allItems) {
      for (const [key, url] of Object.entries(item.links)) {
        if (url === TODO) continue;
        expect(url, `${item.slug}.${key}`).toMatch(/^https:\/\//);
      }
    }
    for (const url of Object.values(identity.social)) expect(url).toMatch(/^https:\/\//);
  });

  it("only references related slugs that exist", () => {
    const slugs = new Set(allItems.map((i) => i.slug));
    for (const item of allItems) if (item.related) expect(slugs.has(item.related), item.slug).toBe(true);
  });

  it("never mentions a grade in content.ts", () => {
    const src = readFileSync(join(__dirname, "content.ts"), "utf8");
    for (const s of FORBIDDEN) expect(src.includes(s), s).toBe(false);
  });

  it("never mentions a grade anywhere in the repo source", () => {
    for (const file of walk(ROOT)) {
      const src = readFileSync(file, "utf8");
      for (const s of FORBIDDEN) expect(src.includes(s), `${file} contains a forbidden string`).toBe(false);
    }
  });

  it("orders rows per profile", () => {
    const ids = (p: "tech" | "product") => rowsFor(p).map((r) => r.id);
    expect(ids("tech")).toEqual(["now", "experience", "projects", "competitions", "research", "leadership", "skills", "awards", "contact"]);
    expect(ids("product")).toEqual(["now", "experience", "competitions", "projects", "research", "leadership", "skills", "awards", "contact"]);
    expect(rowsFor("product")[1].items[0].slug).toBe("kpmg");
    expect(rowsFor("product")[2].items.slice(0, 5).every((i) => i.pinProduct)).toBe(true);
  });
});

describe("logos", () => {
  it("has a file on disk for every mapped logo and a name for every key used", async () => {
    const { existsSync } = await import("node:fs");
    const { logoFiles, logoNames } = await import("@/lib/logos");
    for (const [key, path] of Object.entries(logoFiles)) expect(existsSync(join(ROOT, "public", path)), key).toBe(true);
    for (const item of allItems) {
      if (item.logo) expect(logoNames[item.logo], item.slug).toBeTruthy();
      if (item.secondaryLogo) expect(logoNames[item.secondaryLogo], item.slug).toBeTruthy();
    }
  });
});
