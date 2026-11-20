import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { writeFile } from "node:fs/promises";
import { projects } from "../src/lib/content.ts";

const origin = process.argv[2] || "http://127.0.0.1:3000";
const large = process.argv[3] === "large";
const browser = await chromium.launch({
  executablePath:
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || "/usr/bin/google-chrome",
});
const report = [];
try {
  const context = await browser.newContext({
    viewport: { width: large ? 320 : 1440, height: 1000 },
  });
  const page = await context.newPage();
  if (large)
    await page.addInitScript(() =>
      localStorage.setItem(
        "benjamin-portfolio-accessibility",
        JSON.stringify({
          largeText: true,
          highContrast: true,
          reduceMotion: true,
        }),
      ),
    );
  await page.addInitScript(() => {
    window.__portfolioLcp = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries())
        window.__portfolioLcp = entry.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
  });
  for (const route of [
    "/",
    ...projects.map((project) => `/projects/${project.slug}/`),
    "/404.html",
  ]) {
    await page.goto(`${origin}${route}`);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(600);
    if (large)
      console.log(
        JSON.stringify({
          route,
          overflow: await page.evaluate(() =>
            Array.from(document.querySelectorAll("body *"))
              .map((element) => ({
                element,
                rect: element.getBoundingClientRect(),
              }))
              .filter(
                ({ rect }) =>
                  rect.width > 0 &&
                  (rect.right > innerWidth + 1 || rect.left < -1),
              )
              .slice(0, 12)
              .map(({ element, rect }) => ({
                tag: element.tagName,
                class: element.className,
                right: Math.round(rect.right),
                left: Math.round(rect.left),
                text: element.textContent?.slice(0, 60),
              })),
          ),
        }),
      );
    const violations = (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations;
    const performance = await page.evaluate(() => {
      const navigation = performance.getEntriesByType("navigation")[0];
      const paints = performance.getEntriesByType("paint");
      return {
        domContentLoadedMs: Math.round(navigation.domContentLoadedEventEnd),
        firstContentfulPaintMs: Math.round(
          paints.find((item) => item.name === "first-contentful-paint")
            ?.startTime || 0,
        ),
        largestContentfulPaintMs: Math.round(window.__portfolioLcp || 0),
        externalResources: performance
          .getEntriesByType("resource")
          .filter((item) => new URL(item.name).origin !== location.origin)
          .map((item) => item.name),
      };
    });
    const entry = {
      route,
      performance,
      violations: violations.map((item) => ({
        id: item.id,
        nodes: item.nodes.map((node) => ({
          target: node.target,
          summary: node.failureSummary,
        })),
      })),
    };
    report.push(entry);
    console.log(JSON.stringify(entry));
  }
  await writeFile(
    large
      ? "docs/verification/browser-audit-large.json"
      : "docs/verification/browser-audit.json",
    JSON.stringify(report, null, 2) + "\n",
  );
} finally {
  await browser.close();
}
if (report.some((item) => item.violations.length)) process.exitCode = 1;
