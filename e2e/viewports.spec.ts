import { expect, test, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";

const VIEWPORTS = [
  [360, 780],
  [390, 844],
  [414, 896],
  [768, 1024],
  [820, 1180],
  [1024, 768],
  [1280, 800],
  [1440, 900],
  [1920, 1080],
] as const;

const URLS = [
  ["tech", "/?profile=tech"],
  ["product", "/?profile=product"],
  ["tech-llm-gisx", "/?profile=tech&item=llm-gisx"],
  ["product-kpmg", "/?profile=product&item=kpmg"],
] as const;

const CARD_ROWS = ["experience", "projects", "competitions", "research", "leadership", "awards"];

mkdirSync("screenshots", { recursive: true });

async function visibleCards(page: Page, row: string) {
  return page.evaluate((row) => {
    const vw = document.documentElement.clientWidth;
    const cards = Array.from(document.querySelectorAll<HTMLElement>(`[data-row="${row}"] [data-card]`));
    const visible = cards.filter((c) => {
      const r = c.getBoundingClientRect();
      return r.left >= -1 && r.right <= vw + 1;
    }).length;
    return { visible, total: cards.length };
  }, row);
}

for (const [w, h] of VIEWPORTS) {
  test.describe(`${w}x${h}`, () => {
    test.use({ viewport: { width: w, height: h }, hasTouch: w < 1024 });

    for (const [name, url] of URLS) {
      test(`${name}`, async ({ page }) => {
        const errors: string[] = [];
        page.on("pageerror", (e) => errors.push(e.message));
        await page.goto(url, { waitUntil: "networkidle" });
        await page.waitForTimeout(600);

        // No horizontal page scroll at any width.
        const [scrollW, clientW] = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
        expect(scrollW, "horizontal page scroll").toBeLessThanOrEqual(clientW);

        if (url.includes("item=")) {
          const dialog = page.getByRole("dialog");
          await expect(dialog).toBeVisible();
          if (w < 640) {
            // The modal must scroll on a phone.
            const scroller = page.locator("[data-modal-scroll]");
            const before = await scroller.evaluate((el) => el.scrollTop);
            const canScroll = await scroller.evaluate((el) => el.scrollHeight > el.clientHeight);
            expect(canScroll, "modal content taller than the phone screen").toBe(true);
            await scroller.evaluate((el) => el.scrollBy(0, 600));
            expect(await scroller.evaluate((el) => el.scrollTop)).toBeGreaterThan(before);
          }
        } else {
          // Cards per row: at least 2 at 360, 6 at 1440 (or the whole row when it is shorter).
          const need = w >= 1440 ? 6 : 2;
          for (const row of CARD_ROWS) {
            await page.locator(`[data-row="${row}"]`).scrollIntoViewIfNeeded();
            const { visible, total } = await visibleCards(page, row);
            expect(visible, `${row}: visible cards`).toBeGreaterThanOrEqual(Math.min(need, total));
          }

          // Hover expansion never clips at the row edges (pointer devices only).
          if (w >= 1024) {
            for (const row of ["experience", "competitions"]) {
              await page.locator(`[data-row="${row}"]`).scrollIntoViewIfNeeded();
              const cards = page.locator(`[data-row="${row}"] [data-card]`);
              const slugs = await cards.evaluateAll((els) => {
                const vw = document.documentElement.clientWidth;
                const vis = els.filter((e) => {
                  const r = e.getBoundingClientRect();
                  return r.left >= 0 && r.right <= vw;
                });
                return [vis[0], vis[vis.length - 1]].map((e) => e.getAttribute("data-card")!);
              });
              for (const slug of slugs) {
                await page.mouse.move(2, 2);
                await page.waitForTimeout(250);
                await page.hover(`[data-row="${row}"] [data-card="${slug}"]`);
                const preview = page.locator(`[data-preview="${slug}"]`);
                await expect(preview).toBeVisible();
                await page.waitForTimeout(350); // let the 200 ms grow finish
                const box = (await preview.boundingBox())!;
                expect(box.x, `${slug} preview left edge`).toBeGreaterThanOrEqual(0);
                expect(box.x + box.width, `${slug} preview right edge`).toBeLessThanOrEqual(w);
              }
              await page.mouse.move(2, 2);
              await page.waitForTimeout(250);
            }
            await page.evaluate(() => window.scrollTo(0, 0));
            await page.waitForTimeout(300);
          }
        }

        await page.evaluate(() => {
          window.scrollTo({ top: 0, behavior: "instant" });
          document.querySelector("[data-modal-scroll]")?.scrollTo({ top: 0, behavior: "instant" });
        });
        await page.waitForTimeout(300);
        await page.screenshot({ path: `screenshots/${w}x${h}-${name}.png` });
        expect(errors, "page errors").toEqual([]);
      });
    }
  });
}
