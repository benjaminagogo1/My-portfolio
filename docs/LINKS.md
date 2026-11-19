# Updating prepared links

The portfolio’s available links are active. Missing destinations have clearly labeled placeholders, so visitors are not sent to missing files or invented public applications.

| Item | Where to update it | Current state |
| --- | --- | --- |
| Public portfolio address | `NEXT_PUBLIC_SITE_URL` in `.env.local` or hosting build settings | `https://your-portfolio.example` placeholder |
| CV PDF | `NEXT_PUBLIC_CV_PATH` in `.env.local` or hosting build settings | View CV placeholders in desktop navigation, the mobile menu, and Contact |
| Nurse.ng live application | Nurse.ng’s `liveUrl` in `src/lib/content.ts` | Live demo coming soon |
| HMSI-API live application | HMSI-API’s `liveUrl` in `src/lib/content.ts` | Live demo coming soon |
| HMSI-API repository | HMSI-API’s `repository` in `src/lib/content.ts` | Repository access through Contact |
| Igede Language SI repository | Igede Language SI’s `repository` in `src/lib/content.ts` | Request GitHub access through Contact; the supplied URL is not publicly accessible |
| Igede Language SI live application | Igede Language SI’s `liveUrl` in `src/lib/content.ts` | Live demo coming soon |
| Agro-Shield live application | Agro-Shield’s `liveUrl` in `src/lib/content.ts` | `https://agroshield.com.ng/` |

For local configuration, copy `.env.example` to `.env.local`, then replace the values you have available. Restart the development server after changing environment values. Production updates require a new build and publication.

## When the CV is ready

1. Put the finished PDF in `public/cv`, for example `public/cv/otete-benjamin-agogo-cv.pdf`.
2. Set `NEXT_PUBLIC_CV_PATH=/cv/otete-benjamin-agogo-cv.pdf`.
3. Restart locally or rebuild for publication.

The placeholders become View CV links automatically. All three locations open the same PDF in a new tab. A configured path must name an existing PDF in `public/cv`; the build reports a missing file rather than generating a broken link.

## When the portfolio is hosted

Replace `NEXT_PUBLIC_SITE_URL=https://your-portfolio.example` with the actual public origin. Use the website’s origin without a page path, query, or fragment. This updates canonical URLs, the sitemap, robots instructions, and all portfolio and project sharing images together.

The explicit `.example` placeholder keeps indexing disabled. A real public origin enables indexing for the home and project pages; the custom 404 remains excluded.

## Project links and artwork

Project records are identified by their `slug` in `src/lib/content.ts`. Replace the relevant `liveUrl` or `repository` value with the verified URL. The cards and case-study actions update together. Remove the unavailable-repository note once HMSI-API’s repository becomes public.

Run `npm run assets:social` locally after changing project sharing copy. It generates the portfolio image and one 1200 × 630 image per project from local artwork and project captures. Include the updated files in the next production build.
