import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("all sections render with working assets and no browser errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page).toHaveTitle(/Otete Benjamin Agogo/);
  for (const id of [
    "home",
    "about",
    "expertise",
    "projects",
    "journey",
    "contact",
  ]) {
    const section = page.locator(`#${id}`);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
  }
  await expect(page.locator("img")).toHaveCount(1);
  expect(
    await page
      .locator("img")
      .evaluate((image) => (image as HTMLImageElement).naturalWidth),
  ).toBeGreaterThan(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("system visual selections and expertise disclosures respond", async ({
  page,
}) => {
  await page.goto("/");
  const healthcare = page.getByRole("button", {
    name: "Healthcare",
    exact: true,
  });
  await healthcare.click();
  await expect(healthcare).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".visual-caption")).toContainText(
    "Keep people at the center.",
  );
  await page.getByRole("button", { name: "Intelligence", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".visual-caption")).toContainText(
    "Explore what’s possible.",
  );
  for (const button of await page.locator(".expertise-toggle").all()) {
    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    const control = await button.getAttribute("aria-controls");
    await expect(page.locator(`#${control}`)).toBeVisible();
    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "false");
  }
});

test("navigation, both case studies, contact links, and back-to-top work", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Open navigation" });
  if (await menu.isVisible()) {
    await menu.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: /Projects/ })
      .click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(menu).toBeFocused();
  } else {
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Projects" })
      .click();
  }
  await expect(page).toHaveURL(/#projects/);
  await page
    .getByRole("link", { name: "Explore the Nurse.ng case study" })
    .click();
  await expect(page).toHaveURL(/projects\/nurse-ng/);
  await expect(
    page.getByRole("heading", { name: "What’s implemented" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Future direction" }),
  ).toBeVisible();
  await page
    .locator(".case-next")
    .getByRole("link", { name: "HMSI-API" })
    .click();
  await expect(page).toHaveURL(/projects\/hmsi-api/);
  await expect(page.locator(".case-sidebar")).toContainText(
    "currently unavailable publicly",
  );
  await page.getByRole("link", { name: "Discuss this project" }).click();
  await expect(page).toHaveURL(/#contact/);
  const socialLinks = page.locator(".contact-links > a");
  await expect(socialLinks).toHaveCount(3);
  for (const link of await socialLinks.all()) {
    expect(await link.getAttribute("href")).toMatch(
      /^https:\/\/(github\.com|www\.linkedin\.com|www\.facebook\.com)\//,
    );
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  await page.getByRole("link", { name: "Back to top" }).click();
  await expect(page).toHaveURL(/#home/);
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeLessThan(100);
  void isMobile;
});

test("WCAG accessibility on every page and expanded navigation", async ({
  page,
}) => {
  for (const route of [
    "/",
    "/projects/nurse-ng/",
    "/projects/hmsi-api/",
    "/404.html",
  ]) {
    await page.goto(route);
    const violations = (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations;
    expect(
      violations.map((item) => ({
        id: item.id,
        nodes: item.nodes.map((node) => node.target),
      })),
    ).toEqual([]);
  }
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Open navigation" });
  if (await menu.isVisible()) {
    await menu.click();
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(menu).toBeFocused();
  }
});

test("reduced motion and narrow layouts stay usable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/projects/nurse-ng/", "/projects/hmsi-api/"]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => getComputedStyle(document.documentElement).scrollBehavior,
        ),
      ).toBe("auto");
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    }
  }
});

test("reading preferences are accessible, persistent, and usable at 320px", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/");
  const control = page.getByRole("button", {
    name: "Display and accessibility",
  });
  await control.click();
  await page
    .getByRole("checkbox", { name: "Larger text", exact: true })
    .check();
  await page
    .getByRole("checkbox", { name: "Higher contrast", exact: true })
    .check();
  await page
    .getByRole("checkbox", { name: "Reduce motion", exact: true })
    .check();
  await expect(page.locator("html")).toHaveAttribute("data-text-size", "large");
  await expect(page.locator("html")).toHaveAttribute("data-contrast", "high");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  expect(
    await page.evaluate(() =>
      parseFloat(getComputedStyle(document.documentElement).fontSize),
    ),
  ).toBeGreaterThan(16);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(control).toBeFocused();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-text-size", "large");
  for (const route of ["/", "/projects/nurse-ng/", "/projects/hmsi-api/"]) {
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(
      await page.evaluate(
        () => getComputedStyle(document.documentElement).scrollBehavior,
      ),
    ).toBe("auto");
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
  }
  await control.click();
  await page.getByRole("button", { name: "Reset to defaults" }).click();
  for (const name of ["Larger text", "Higher contrast", "Reduce motion"])
    await expect(
      page.getByRole("checkbox", { name, exact: true }),
    ).not.toBeChecked();
  await expect(page.locator("html")).toHaveAttribute(
    "data-text-size",
    "standard",
  );
});

test("keyboard skip link focuses main content and touch controls are large enough", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  const control = page.getByRole("button", {
    name: "Display and accessibility",
  });
  const box = await control.boundingBox();
  expect(box?.width).toBeGreaterThanOrEqual(44);
  expect(box?.height).toBeGreaterThanOrEqual(44);
});

test("blocked preference storage keeps controls functional with honest feedback", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException("Storage blocked", "SecurityError");
    };
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Display and accessibility" }).click();
  await page
    .getByRole("checkbox", { name: "Higher contrast", exact: true })
    .check();
  await expect(page.locator("html")).toHaveAttribute("data-contrast", "high");
  await expect(page.getByRole("status")).toContainText(
    "not allowing preferences to be saved",
  );
});

test("essential content and section navigation work without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  try {
    const page = await context.newPage();
    await page.goto(baseURL!);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Section navigation" }),
    ).toBeVisible();
    await page
      .getByRole("link", { name: "Explore the Nurse.ng case study" })
      .click();
    await expect(
      page.getByRole("heading", { name: "What’s implemented" }),
    ).toBeVisible();
  } finally {
    await context.close();
  }
});

test("Light, Dark, and System themes persist and remain accessible", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  const control = page.getByRole("button", {
    name: "Display and accessibility",
  });
  const selectTheme = async (name: "Dark" | "Light" | "System") => {
    const radio = page.getByRole("radio", { name, exact: true });
    await radio.focus();
    await page.keyboard.press("Space");
    await expect(radio).toBeChecked();
  };
  await control.click();
  await selectTheme("Dark");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  for (const route of ["/", "/projects/nurse-ng/", "/projects/hmsi-api/"]) {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
  }
  await control.click();
  await selectTheme("System");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await selectTheme("Light");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await selectTheme("Dark");
  await page
    .getByRole("checkbox", { name: "Higher contrast", exact: true })
    .check();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});
