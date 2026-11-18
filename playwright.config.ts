import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PORTFOLIO_TEST_URL || "http://127.0.0.1:3000";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  timeout: 60000,
  reporter: "list",
  use: {
    baseURL,
    trace: "retain-on-failure",
    launchOptions: {
      executablePath:
        process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
        "/usr/bin/google-chrome",
    },
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1000 },
      },
    },
    { name: "tablet", use: { viewport: { width: 768, height: 1024 } } },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
  webServer: {
    command: "npm run preview",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
