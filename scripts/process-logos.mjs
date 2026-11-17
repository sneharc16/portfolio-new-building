// Trims transparent/white margins from raster logos and flattens any background to pure white,
// so every logo sits on the same #FFFFFF tile. SVGs are left untouched unless they exceed
// 200 KB, in which case they are rasterised to PNG to stay inside the asset budget.
import { readdirSync, renameSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const dir = join(import.meta.dirname, "..", "public", "logos");
for (const name of readdirSync(dir)) {
  const svg = name.match(/^(.+)\.svg$/i);
  if (svg && statSync(join(dir, name)).size > 200 * 1024) {
    await sharp(join(dir, name), { density: 144 })
      .resize({ width: 600, height: 600, fit: "inside" })
      .flatten({ background: "#ffffff" })
      .trim({ background: "#ffffff", threshold: 12 })
      .png({ compressionLevel: 9, palette: true })
      .toFile(join(dir, `${svg[1]}.png`));
    rmSync(join(dir, name));
    console.log("rasterised", `${svg[1]}.png`);
    continue;
  }
  const m = name.match(/^(.+)\.(png|jpe?g|webp)$/i);
  if (!m) continue;
  const src = join(dir, name);
  const tmp = join(dir, `${m[1]}.tmp.png`);
  await sharp(src)
    .flatten({ background: "#ffffff" })
    .trim({ background: "#ffffff", threshold: 12 })
    .resize({ width: 800, height: 800, fit: "inside", withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toFile(tmp);
  if (src !== join(dir, `${m[1]}.png`)) rmSync(src);
  renameSync(tmp, join(dir, `${m[1]}.png`));
  console.log("processed", `${m[1]}.png`);
}
