# Otete Benjamin Agogo — Portfolio

A responsive personal portfolio for a software engineer exploring the intersection of engineering, AI, healthcare, and connected systems. The design combines an editorial layout, forest-green palette, DM Sans and Instrument Serif typography, and an original interactive systems illustration.

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
- **Contact:** real GitHub, LinkedIn, and Facebook links. No public email was verified, so an email form and React Hook Form are intentionally unnecessary for this version.
- **Assets:** self-hosted fonts, an optimized genuine Nurse.ng screenshot, and original code-native diagrams. There are no runtime font or image CDN dependencies.

## Content maintenance

`src/lib/content.ts` owns identity, navigation, expertise, and project descriptions. Add a project object there and choose a suitable preview in `src/components/project-preview.tsx`; case-study routes are generated automatically. Keep implemented capabilities and planned work separate.

`src/components` contains shared navigation, footer, illustration, expertise interactions, project visuals, and animation wrappers. `src/app/projects/[slug]/page.tsx` renders each project case study.

Set `NEXT_PUBLIC_SITE_URL` to the actual public origin before the production build. Until a public origin is configured, local social metadata uses localhost and the sitemap contains no invented domain.

## Deployment and evidence

- [Free Cloudflare Pages deployment](docs/DEPLOYMENT.md): verified framework compatibility, setup, free-plan limits, and post-deployment checks.
- [Project and asset evidence](docs/PROJECT_EVIDENCE.md): sources, screenshot provenance, verified technologies, and implementation boundaries.
- [Accessibility implementation](docs/ACCESSIBILITY.md): saved reading preferences, keyboard support, screen-reader structure, touch targets, and graceful fallbacks.
- [Verification results](docs/verification/README.md): responsive screenshots and completed QA.

The repository has not been pushed or deployed as part of the local build. No paid service, domain, account, or subscription is required.
