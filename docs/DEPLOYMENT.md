# Free deployment on Cloudflare Pages

Compatibility and free-plan limits were checked against Cloudflare's official documentation on 17 November 2026:

- [Static Next.js deployment](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)
- [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/)

This site uses Next.js App Router with `output: "export"`. All routes, including every project case study, are generated at build time. Navigation, the systems illustration, expertise disclosures, and the mobile dialog run in the browser. There are no request-time server components, server actions, API routes, cookies, or middleware. Fonts are self-hosted. Project screenshots and the owner portrait are compressed to WebP before deployment; Next.js's request-time image optimizer is disabled because it needs a server.

Cloudflare Pages supports this architecture with its **Next.js (Static HTML Export)** preset. The free plan currently includes 500 builds per month, up to 20,000 files per site, and a 25 MiB limit per individual asset. This portfolio is comfortably below the asset limits. Cloudflare provides a free `pages.dev` hostname and HTTPS. No domain purchase, paid worker, or subscription is needed.

## Deploy

1. Push the finished repository to GitHub when ready to publish it.
2. In Cloudflare, open **Workers & Pages → Create application → Pages → Connect to Git** and select `My-portfolio`.
3. Choose **Next.js (Static HTML Export)**. Set the production branch to `main`, the build command to `npm run build`, and the output directory to `out`. The project root is the repository root.
4. Use Node.js 22 (set `NODE_VERSION=22` if the dashboard does not detect `.node-version`).
5. Replace the `https://your-portfolio.example` placeholder in `NEXT_PUBLIC_SITE_URL` with the actual `https://<project-name>.pages.dev` origin. This updates canonical links, project sharing images, the sitemap, and robots instructions. The placeholder configuration requests no indexing. If Cloudflare assigns the hostname only after the first deployment, add the variable and rebuild once.
6. Run `npm run lint`, `npm run typecheck`, `npm run build`, and `npm run test:e2e` locally before publication.
7. After the deployment succeeds, test the home page, every direct project URL, mobile navigation, contact links, `robots.txt`, `sitemap.xml`, and an unknown URL. An unknown URL should display the custom 404.

The security headers in `public/_headers` are copied into `out` and applied by Cloudflare Pages. The static export includes `404.html` for the custom error page.

## Local production preview

```sh
npm ci
npm run build
npm run preview
```

Open `http://localhost:3000`. `npm run preview` serves the actual production output; it is different from the development server.

## If the architecture changes

An actual server-side contact form or request-time Next.js functionality would need a compatible backend. Cloudflare Pages static export cannot run Next.js server actions or dynamic route handlers. Review [Next.js on Cloudflare Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/) and its current free-tier limits before introducing those features. The present site uses verified social contact links, so no email provider, secret, or backend is required.

The build uses Next.js's supported webpack compiler and TypeScript's compiler API. Turbopack and the default CLI-based TypeScript discovery encountered process restrictions in the development sandbox. Type checking remains enabled; no correctness checks are skipped.
