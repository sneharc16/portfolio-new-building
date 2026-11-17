import { defineConfig } from "@playwright/test";

const PORT = 3200;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  workers: 4,
  reporter: [["list"]],
  timeout: 60_000,
  use: { baseURL: `http://localhost:${PORT}`, browserName: "chromium" },
  webServer: {
    command: `pnpm build && pnpm start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
