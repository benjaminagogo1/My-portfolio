import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { projects } from "../src/lib/content.ts";

const browser = await chromium.launch({
  executablePath:
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || "/usr/bin/google-chrome",
});
const origin = process.argv[2] || "http://127.0.0.1:3000";
const widths = process.argv[3]
  ? process.argv[3].split(",").map(Number)
  : [1440, 768, 390, 320];
const theme = process.argv[4] || "system";
const suffix = theme === "system" ? "" : `-${theme}`;
try {
  await mkdir("docs/verification", { recursive: true });
  for (const width of widths) {
    const page = await browser.newPage({
      viewport: { width, height: width < 600 ? 844 : 1000 },
      reducedMotion: "reduce",
    });
    if (theme !== "system")
      await page.addInitScript((value) => {
        localStorage.setItem(
          "benjamin-portfolio-accessibility",
          JSON.stringify({
            theme: value,
            largeText: false,
            highContrast: false,
            reduceMotion: true,
          }),
        );
      }, theme);
    for (const [name, route] of [
      ["home", "/"],
      ...projects.map((project) => [
        project.slug,
        `/projects/${project.slug}/`,
      ]),
    ]) {
      await page.goto(`${origin}${route}`);
      await page.evaluate(() => document.fonts.ready);
      for (const image of await page.locator("img").all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate((element) => element.decode());
      }
      await page.locator("footer").scrollIntoViewIfNeeded();
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(150);
      await page.screenshot({
        path: `docs/verification/${name}-${width}${suffix}.png`,
        fullPage: true,
      });
      if (name === "home") {
        await page.screenshot({
          path: `docs/verification/hero-${width}${suffix}.png`,
        });
        if (width === 1440 || width === 390) {
          for (const section of [
            "about",
            "expertise",
            "projects",
            "journey",
            "contact",
          ]) {
            await page.locator("header, .skip-link").evaluateAll((elements) => {
              elements.forEach((element) => {
                element.style.visibility = "hidden";
              });
            });
            await page.locator(`#${section}`).screenshot({
              path: `docs/verification/${section}-${width}${suffix}.png`,
            });
            await page.locator("header, .skip-link").evaluateAll((elements) => {
              elements.forEach((element) => {
                element.style.visibility = "";
              });
            });
          }
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        await page
          .getByRole("button", { name: "Display and accessibility" })
          .click();
        await page.getByRole("dialog").screenshot({
          path: `docs/verification/accessibility-${width}${suffix}.png`,
        });
        await page.keyboard.press("Escape");
      }
    }
    await page.close();
  }
  console.log(
    `Captured production screenshots at ${widths.join(", ")}px (${theme}).`,
  );
} finally {
  await browser.close();
}
