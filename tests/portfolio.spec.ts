import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { projects } from "../src/lib/content";

const projectRoutes = projects.map((project) => `/projects/${project.slug}/`);

async function expectAccessible(page: Page) {
  const { violations } = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    violations.map(({ id, nodes }) => ({
      id,
      nodes: nodes.map(({ target }) => target),
    })),
  ).toEqual([]);
}

for (const route of ["/", ...projectRoutes, "/404.html"]) {
  test(`WCAG accessibility on ${route}`, async ({ page }) => {
    await page.goto(route);
    await expectAccessible(page);
  });
}

for (const route of ["/", ...projectRoutes]) {
  test(`dark appearance is accessible on ${route}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expectAccessible(page);
  });

  test(`larger text and higher contrast stay accessible on ${route}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
    await page.addInitScript(() => {
      localStorage.setItem(
        "benjamin-portfolio-accessibility",
        JSON.stringify({
          theme: "light",
          largeText: true,
          highContrast: true,
          reduceMotion: true,
        }),
      );
    });
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute(
      "data-text-size",
      "large",
    );
    await expect(page.locator("html")).toHaveAttribute("data-contrast", "high");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expectAccessible(page);
  });
}

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
    "projects",
    "expertise",
    "journey",
    "contact",
  ]) {
    const section = page.locator(`#${id}`);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
  }
  await expect(
    page.locator("#home").getByRole("img", {
      name: "Otete Benjamin Agogo",
      exact: true,
    }),
  ).toBeVisible();
  for (const image of await page.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate((element) => (element as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);
  }
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

test("navigation, all case studies, contact links, and back-to-top work", async ({
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
  await page
    .locator(".case-next")
    .getByRole("link", { name: "Agro-Shield", exact: true })
    .click();
  await expect(page).toHaveURL(/projects\/agro-shield/);
  await expect(
    page.getByRole("heading", { name: "A team project" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Architecture", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "In progress", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /View repository/ }),
  ).toHaveAttribute("href", "https://github.com/etoosammy01/Agro-Shield");
  await expect(
    page.getByRole("link", { name: /Live application/ }),
  ).toHaveAttribute("href", "https://agroshield.com.ng/");
  await page
    .locator(".case-next")
    .getByRole("link", { name: "Igede Language SI", exact: true })
    .click();
  await expect(page).toHaveURL(/projects\/igede-language-si/);
  await expect(page.locator(".case-role")).toHaveText(
    "Project Lead and Head of Communication",
  );
  await expect(page.locator(".case-former-name")).toHaveText(
    "Formerly Igede AI",
  );
  await expect(
    page.getByRole("link", { name: "Request GitHub access", exact: true }),
  ).toHaveAttribute("href", "/#contact");
  await expect(
    page.locator(
      'a[href="https://github.com/benjaminagogo1/Igede-language-AI"]',
    ),
  ).toHaveCount(0);
  await expect(page.locator(".case-sidebar")).toContainText(
    "not publicly accessible",
  );
  await expect(page.locator(".language-preview")).toContainText(
    "CHATBOT & TRANSLATION PLANNED",
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

test("WCAG accessibility and keyboard focus in expanded navigation", async ({
  page,
}) => {
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Open navigation" });
  if (await menu.isVisible()) {
    await menu.click();
    await expectAccessible(page);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(menu).toBeFocused();
  } else {
    await expect(
      page.getByRole("navigation", { name: "Main navigation" }),
    ).toBeVisible();
  }
});

test("reduced motion and narrow layouts stay usable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", ...projectRoutes]) {
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
  await expectAccessible(page);
  await page.keyboard.press("Escape");
  await expect(control).toBeFocused();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-text-size", "large");
  for (const route of ["/", ...projectRoutes]) {
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
  await expectAccessible(page);
  await page.keyboard.press("Escape");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  for (const route of ["/", ...projectRoutes]) {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
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
  await expectAccessible(page);
});
