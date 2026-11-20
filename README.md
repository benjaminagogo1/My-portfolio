# Otete Benjamin Agogo — Portfolio

A responsive personal portfolio for an AI-Native Engineer developing through a fellowship programme and exploring the intersection of engineering, AI, healthcare, and connected systems. The design combines an editorial layout, forest-green palette, DM Sans and Instrument Serif typography, and an original interactive systems illustration.

## Run locally

Node.js 22 or newer and npm are required.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`.

```sh
npm run lint
npm run typecheck
npm run build
npm run preview
npm run test:e2e
```

Browser tests use Chrome at `/usr/bin/google-chrome` by default. Override `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` for another Chromium installation. Alternatively, install Chromium with `npx playwright install chromium` and set the executable path to the installed browser. The tests cover desktop, tablet, mobile, 320px layouts, reduced motion, keyboard interactions, project navigation, image loading, console errors, and automated WCAG accessibility.

## Architecture

- **Next.js App Router + TypeScript:** statically exported home page, dedicated project case studies, sitemap, robots file, and custom 404.
- **Tailwind CSS:** shared design tokens and utilities, with component-oriented responsive styles in `src/app/globals.css`.
- **shadcn/ui approach:** locally owned Button and Radix Dialog components, configured in `components.json`. Lucide provides icons.
- **Motion:** restrained section reveals respecting reduced motion. Essential content also renders without JavaScript.
- **Display and accessibility:** saved System, Light, and Dark appearance choices, larger text, higher contrast, and reduced motion, available from the header on every page.
- **Zod:** validates shared project data at build time.
- **Contact:** direct email, a Copy email action, and real GitHub, LinkedIn, and Facebook links. CV placeholders appear in navigation and Contact until the owner’s finished PDF is configured.
- **Assets:** self-hosted fonts, an optimized owner-supplied portrait, genuine Nurse.ng and Agro-Shield public-page captures, and original code-native diagrams for HMSI-API and Igede Language SI. There are no runtime font or image CDN dependencies.

## Content maintenance

`src/lib/content.ts` owns identity, navigation, expertise, and validated project records. The `projectLiveUrls` block near its top contains editable deployment URLs. Each project contains its domain, scoped status and status note, technologies, implemented features, work in progress, planned work, repository, optional verified live URL, and preview metadata. Team context and architecture are optional fields. To add a screenshot project, place the asset in `public/images` and add its record, including dimensions, alt text, provenance, and presentation tone. Cards and case-study routes are generated automatically. Keep implemented capabilities, in-progress work, and planned work separate.

`src/components` contains shared navigation, footer, illustration, expertise interactions, project visuals, and animation wrappers. `src/app/projects/[slug]/page.tsx` renders each project case study.

Set `NEXT_PUBLIC_SITE_URL` to the actual public origin before publishing. The default `https://your-portfolio.example` is an explicit placeholder used for canonical links, sharing images, and the sitemap. Indexing remains disabled while that placeholder is active. Configuring the real origin updates every page, the sitemap, and robots instructions.

The CV in `public/cv/otete-benjamin-agogo-cv.pdf` is linked automatically from desktop navigation, the mobile menu, and Contact. To update it, replace that PDF, rebuild, and publish the updated site. A file-content version in the shared link changes automatically so browsers request the updated PDF. Set `NEXT_PUBLIC_CV_PATH` only if you prefer another filename in `public/cv`; the build rejects a missing PDF. See [the CV update guide](docs/LINKS.md#updating-the-cv).

Project live links, repository availability, and evidence links are maintained in `src/lib/content.ts`. Deployment URLs stay blank until the owner adds them, and live links appear automatically once configured. Both verified private repositories offer access through Contact. Case studies use the owner's confirmed roles and project labels, explain Benjamin's contributions and implementation choices, and identify source evidence without inventing measured outcomes.

Run `npm run assets:social` locally after changing project sharing copy. It generates the portfolio artwork and a 1200 × 630 sharing image for each project using the installed browser and local assets.

## Deployment and evidence

- [Free Cloudflare Pages deployment](docs/DEPLOYMENT.md): verified framework compatibility, setup, free-plan limits, and post-deployment checks.
- [Project and asset evidence](docs/PROJECT_EVIDENCE.md): sources, screenshot provenance, verified technologies, and implementation boundaries.
- [Accessibility implementation](docs/ACCESSIBILITY.md): saved reading preferences, keyboard support, screen-reader structure, touch targets, and graceful fallbacks.
- [Updating prepared links](docs/LINKS.md): public origin, CV PDF, project links, and sharing artwork.
- [Verification results](docs/verification/README.md): responsive screenshots and completed QA.

The repository has not been pushed or deployed as part of the local build. No paid service, domain, account, or subscription is required.
