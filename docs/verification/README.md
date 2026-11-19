# Final portfolio verification

Verified on 18 November 2026 against the production export, including the display and accessibility settings and owner-supplied portrait, served from its own local preview port. The original deletions of `index.html` and `.vscode/settings.json` were preserved.

The latest [case study and readability verification](refinements/README.md) covers the Frontend Engineer role, engineering evidence, larger default text, email copying, prepared link placeholders, and sharing metadata. The [layout and contact verification](layout-contact/README.md) records the section order and shorter About and Journey.

## Completed checks

- `npm run build`: passed. Home, both case studies, custom 404, robots, and sitemap are generated as static output; Next.js type checking remains enabled.
- `npm run typecheck`: passed.
- `npm run lint`: passed with no errors or warnings.
- `git diff --check`: passed.
- Full accessibility and appearance regression before the portrait update: **30 passed** across desktop (1440px), tablet (768px), and phone (390px) projects: ten tests at each screen size.
- Additional layouts in the suite: 320px, 390px, 768px, and 1280px; home and both case studies have no horizontal overflow.
- Every main section renders; the project image loads; no browser console errors or unhandled page errors were observed on the production home page.
- Systems illustration selection, keyboard activation, all expertise disclosures, desktop/mobile navigation, both case-study routes, next-project navigation, contact links, and back-to-top actions passed.
- Mobile dialog opens/closes, closes after a navigation choice, restores focus, and supports Escape.
- Reduced-motion checks passed; browser scrolling becomes immediate and content remains available.
- Larger text, higher contrast, and reduced-motion controls passed at 320px, including saved preferences across reloads and project pages, reset, and blocked-storage feedback.
- Keyboard skip navigation, 44px display-control targets, and essential content and section navigation without JavaScript passed.
- Light, Dark, and System appearance choices passed keyboard selection, persistence across reloads and project pages, live system-theme changes, and explicit theme overrides.
- Automated axe WCAG A/AA checks reported **zero violations** on the home page, both case studies, and custom 404 at all three principal screen sizes, plus the expanded mobile/tablet navigation dialog.
- Additional axe scans reported **zero violations** for larger-text/high-contrast pages and settings at 320px, the dark home page and both dark case studies, and the dark settings panel with higher contrast enabled.

The suite checks multiple pages in some tests and permits 60 seconds per test, with 90 seconds for the combined reading-preference and appearance tests; individual Playwright assertions keep their normal deadlines. The multi-page accessibility scan takes longer than a single interaction test. The earlier full suite completed in 5.2 minutes using two workers and a dedicated production preview on port 3173.

To test an already running preview on another port:

```sh
PORTFOLIO_TEST_URL=http://127.0.0.1:3173 npm run test:e2e
```

Without this override, the suite starts/reuses the normal local preview on port 3000. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` if Chrome is installed elsewhere.

## Local performance and assets

The final [`browser-audit.json`](browser-audit.json) records browser paint timings and a separate zero-violation accessibility scan. In this local desktop run, largest contentful paint was 2.116 seconds for the home page, 0.712 seconds for Nurse.ng, and 0.772 seconds for HMSI-API. These are measurements on the local machine, not a public-hosting performance score or field data.

The separate [`browser-audit-large.json`](browser-audit-large.json) checks the home page, both case studies, and custom 404 at 320px with larger text, higher contrast, and reduced motion enabled. Every page reported zero accessibility violations and no overflowing elements.

There were **zero external runtime resources** in the audit. Fonts, the project screenshot, scripts, and styles are served locally. The globe does not run a continuous animation loop.

The production export contains 70 files totaling 2,397,135 bytes. Its largest individual asset is 242,282 bytes. The owner's WebP portrait is 14,248 bytes, the actual Nurse.ng WebP screenshot is 103,174 bytes, the two font files total 59,060 bytes, and compressed home-page HTML is 35,777 bytes. These are comfortably below Cloudflare Pages' free-plan asset limits.

## Links and authenticity

GitHub and Facebook returned HTTP 200. The public Nurse.ng repository was reviewed through GitHub's API and source archive. LinkedIn returned its anti-automation response (999); the portfolio retains the exact profile address supplied by the user and corroborated by the public profile README. Authenticated LinkedIn visibility could not be independently tested through the automated request.

The supplied HMSI-API public repository URL returned 404. Its current implementation was reviewed from the available local Git checkout. The site records that availability limit and offers a real contact action to request access, rather than a link to the known 404. Project descriptions separate implemented capabilities from future work.

No live Nurse.ng application URL was verified. The site contains a direct email action using the owner-supplied address and real social contact links, with no simulated message submission.

## Visual evidence

Full-page captures include `home-*`, `nurse-ng-*`, and `hmsi-api-*` at 1440, 768, 390, and 320 pixels in both light and dark appearances. Hero and display-settings captures are available at the same widths. Section captures at 1440 and 390 pixels cover About, Expertise, Projects, Journey, and Contact in both appearances. Individual section captures hide the sticky navigation and focus-only skip control so fixed elements do not overlay the captured content; the full-page and hero captures show the actual navigation.

- [Desktop hero](hero-1440.png)
- [Phone hero](hero-390.png)
- [Desktop portfolio](home-1440.png)
- [Phone portfolio](home-390.png)
- [Desktop dark hero](hero-1440-dark.png)
- [Phone dark portfolio](home-390-dark.png)
- [Phone display and accessibility settings](accessibility-390.png)
- [Phone dark display and accessibility settings](accessibility-390-dark.png)
- [Desktop selected projects](projects-1440.png)
- [Nurse.ng case study](nurse-ng-1440.png)
- [HMSI-API case study](hmsi-api-1440.png)
- [Unmodified Nurse.ng source capture](nurse-ng-source.png)

No public deployment was performed. Set the real public origin before publication, then follow [the Cloudflare Pages deployment guide](../DEPLOYMENT.md).
