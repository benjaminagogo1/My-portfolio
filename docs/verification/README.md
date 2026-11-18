# Final portfolio verification

Verified on 17 November 2026 against the completed production export, served from its own local preview port. The original deletions of `index.html` and `.vscode/settings.json` were preserved.

## Completed checks

- `npm run build`: passed. Home, both case studies, custom 404, robots, and sitemap are generated as static output; Next.js type checking remains enabled.
- `npm run typecheck`: passed.
- `npm run lint`: passed with no errors or warnings.
- `git diff --check`: passed.
- Browser regression suite: **15 passed** across desktop (1440px), tablet (768px), and phone (390px) projects.
- Additional layouts in the suite: 320px, 390px, 768px, and 1280px; home and both case studies have no horizontal overflow.
- Every main section renders; the project image loads; no browser console errors or unhandled page errors were observed on the production home page.
- Systems illustration selection, keyboard activation, all expertise disclosures, desktop/mobile navigation, both case-study routes, next-project navigation, contact links, and back-to-top actions passed.
- Mobile dialog opens/closes, closes after a navigation choice, restores focus, and supports Escape.
- Reduced-motion checks passed; browser scrolling becomes immediate and content remains available.
- Automated axe WCAG A/AA checks reported **zero violations** on the home page, both case studies, and custom 404 at all three principal screen sizes, plus the expanded mobile/tablet navigation dialog.

The suite checks multiple pages in some tests and permits 60 seconds per test; individual Playwright assertions keep their normal deadlines. The multi-page accessibility scan takes longer than a single interaction test. The site was tested on its own preview port because port 3000 belonged to a development server.

To test an already running preview on another port:

```sh
PORTFOLIO_TEST_URL=http://127.0.0.1:36619 npm run test:e2e
```

Without this override, the suite starts/reuses the normal local preview on port 3000. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` if Chrome is installed elsewhere.

## Local performance and assets

The final [`browser-audit.json`](browser-audit.json) records browser paint timings and a separate zero-violation accessibility scan. In this local desktop run, largest contentful paint was 1.86 seconds for the home page, 0.512 seconds for Nurse.ng, and 0.412 seconds for HMSI-API. These are measurements on the local machine, not a public-hosting performance score or field data.

There were **zero external runtime resources** in the audit. Fonts, the project screenshot, scripts, and styles are served locally. The globe does not run a continuous animation loop.

The production export contains 66 files totaling 2,339,256 bytes. Its largest individual asset is 242,282 bytes. The actual Nurse.ng WebP screenshot is 103,174 bytes, the two font files total 59,060 bytes, and compressed home-page HTML is 34,443 bytes. These are comfortably below Cloudflare Pages' free-plan asset limits.

## Links and authenticity

GitHub and Facebook returned HTTP 200. The public Nurse.ng repository was reviewed through GitHub's API and source archive. LinkedIn returned its anti-automation response (999); the portfolio retains the exact profile address supplied by the user and corroborated by the public profile README. Authenticated LinkedIn visibility could not be independently tested through the automated request.

The supplied HMSI-API public repository URL returned 404. Its current implementation was reviewed from the available local Git checkout. The site records that availability limit and offers a real contact action to request access, rather than a link to the known 404. Project descriptions separate implemented capabilities from future work.

No live Nurse.ng application URL or public contact email was verified. The site contains real social contact actions and no simulated message submission.

## Visual evidence

Full-page captures include `home-*`, `nurse-ng-*`, and `hmsi-api-*` at 1440, 768, 390, and 320 pixels. Hero captures are available at the same widths. Section captures at 1440 and 390 pixels cover About, Expertise, Projects, Journey, and Contact. Individual section captures hide the sticky navigation and focus-only skip control so fixed elements do not overlay the captured content; the full-page and hero captures show the actual navigation.

- [Desktop hero](hero-1440.png)
- [Phone hero](hero-390.png)
- [Desktop portfolio](home-1440.png)
- [Phone portfolio](home-390.png)
- [Desktop selected projects](projects-1440.png)
- [Nurse.ng case study](nurse-ng-1440.png)
- [HMSI-API case study](hmsi-api-1440.png)
- [Unmodified Nurse.ng source capture](nurse-ng-source.png)

No public deployment was performed. Set the real public origin before publication, then follow [the Cloudflare Pages deployment guide](../DEPLOYMENT.md).
