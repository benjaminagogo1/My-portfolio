import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

// Capture a genuine application preview. Start the actual Nurse.ng application
// against an isolated development database, then pass its local URL.
const url = process.argv[2];
if (!url)
  throw new Error(
    "Usage: node scripts/capture-project.mjs <local-Nurse.ng-URL>",
  );
const browser = await chromium.launch({
  executablePath:
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || "/usr/bin/google-chrome",
});
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1030 },
    deviceScaleFactor: 1,
  });
  await page.goto(url, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.locator(".hero").waitFor();
  await mkdir("docs/verification", { recursive: true });
  await page.screenshot({ path: "docs/verification/nurse-ng-source.png" });
  console.log(
    "Captured the real Nurse.ng public page to docs/verification/nurse-ng-source.png",
  );
} finally {
  await browser.close();
}
