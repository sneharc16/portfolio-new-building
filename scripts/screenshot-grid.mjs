// Stitches screenshots/*.png into screenshots/grid-<name>.png, one tile per viewport.
import { readdirSync } from "node:fs";
import sharp from "sharp";

const dir = "screenshots";
const names = ["tech", "product", "tech-llm-gisx", "product-kpmg"];
const H = 420;
for (const name of names) {
  const files = readdirSync(dir)
    .filter((f) => f.endsWith(`-${name}.png`) && /^\d+x\d+-/.test(f))
    .sort((a, b) => parseInt(a) - parseInt(b));
  const tiles = await Promise.all(files.map((f) => sharp(`${dir}/${f}`).resize({ height: H }).png().toBuffer({ resolveWithObject: true })));
  let x = 0;
  const comps = [];
  for (const [i, t] of tiles.entries()) {
    comps.push({ input: t.data, left: x, top: 28 });
    const label = Buffer.from(`<svg width="${t.info.width}" height="24"><text x="2" y="17" font-family="sans-serif" font-size="15" fill="#fff">${files[i].replace(`-${name}.png`, "")}</text></svg>`);
    comps.push({ input: label, left: x, top: 2 });
    x += t.info.width + 16;
  }
  await sharp({ create: { width: x, height: H + 28, channels: 3, background: "#222" } })
    .composite(comps)
    .png()
    .toFile(`${dir}/grid-${name}.png`);
  console.log(`screenshots/grid-${name}.png`);
}
