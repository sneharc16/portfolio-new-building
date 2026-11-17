# Sneha Roychowdhury: portfolio

A streaming-style portfolio: a profile picker on entry, a full-bleed billboard, horizontally scrolling rows of cards,
hover previews and a detail modal for every item. Two profiles (Tech and Product) share one data file.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4 and Framer Motion.

## Run it

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm test         # Vitest: content rules (unique slugs, https links, no grades)
pnpm build && pnpm start
pnpm e2e          # Playwright: 9 viewports x 4 URLs, screenshots in /screenshots
node scripts/screenshot-grid.mjs   # stitch the screenshots into one grid per URL
```

Playwright needs Chromium once: `pnpm exec playwright install chromium`.

## Where things live

| What | Where |
| --- | --- |
| All content (items, hero copy, about, timeline, skills) | `src/data/content.ts` |
| Row order per profile | `rowsFor()` in `src/data/content.ts` |
| Logos | `public/logos` (sources in `public/logos/SOURCES.md`), map in `src/lib/logos.ts` |
| Project screenshots | `public/art` |
| Resumes | `public/resume` |
| UI sounds (synthesised, no audio files) | `src/lib/sound.ts` |

## Add a project

1. Add one object to `projects` in `src/data/content.ts` (copy an existing one: `slug`, `title`, `kicker`,
   `matchTech`/`matchProduct`, blurbs, bullets, `stack`, `links`).
2. Add its slug to the Top projects list for the profile(s) it belongs to (`TECH_TOP` / `PRODUCT_TOP`).
3. Optional: drop a 16:9 screenshot into `public/art/<slug>.jpg` and set `art: "/art/<slug>.jpg"`.
   Without it, the card shows a dark placeholder with the project's initials.

A link set to `TODO` renders a disabled "Coming soon" button; links you leave out render nothing.

## Resumes

Copy the PDFs to:

- `public/resume/sneha-tech.pdf` (SDE resume, used by the Tech profile)
- `public/resume/sneha-product.pdf` (APM resume, used by the Product profile)

`scripts/resume-manifest.mjs` runs before every `dev` and `build` and records which files exist. Until a file is
there, the Resume buttons show a "Resume coming soon" toast. After adding the PDFs, rebuild (or redeploy).

## Logos

`bash scripts/fetch-logos.sh && node scripts/process-logos.mjs` re-downloads the logos from Wikimedia and
normalises the rasters onto white. Organisations without a usable file (ICPC, CodeChef, Eightfold, SIH, TEDx) show
their initials on the same white tile. To add one, save it as `public/logos/<key>.svg` or `.png` and add the key to
`logoFiles` in `src/lib/logos.ts`. Check `/logos` (not linked from the site) to compare all tiles.

## URLs

| URL | Opens |
| --- | --- |
| `/` | Profile picker (returning visitors go straight to their last profile) |
| `/?profile=tech` | Tech view: engineering blurbs, SDE resume, blue accent |
| `/?profile=product` | Product view: product blurbs, KPMG first, APM resume, amber accent |
| `/?profile=tech&item=llm-gisx` | Tech view with that item's detail modal open |

`item` is any slug from `content.ts`. Share `/?profile=tech` with engineering recruiters and `/?profile=product` with
product ones.

## Deploy on Vercel

1. Push this repo to GitHub.
2. On vercel.com: **Add New → Project**, import the repo. Framework preset **Next.js**; keep the default build
   command (`pnpm build`) and output settings.
3. Deploy. Optionally set `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-domain.com`) so social cards use your domain;
   on Vercel it falls back to the production URL automatically.

No `vercel.json` is needed.
