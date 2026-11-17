// Records which resume PDFs exist in public/resume, so the Resume button can show
// "Resume coming soon" without a network request. Runs before `next dev` and `next build`.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const out = join(root, "src", "data", "resumes.json");
const manifest = {
  tech: existsSync(join(root, "public", "resume", "sneha-tech.pdf")),
  product: existsSync(join(root, "public", "resume", "sneha-product.pdf")),
};
const next = JSON.stringify(manifest, null, 2) + "\n";
if (!existsSync(out) || readFileSync(out, "utf8") !== next) writeFileSync(out, next);
console.log("resumes:", manifest);
