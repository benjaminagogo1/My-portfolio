# Updating prepared links

The portfolio’s available links are active. Missing destinations have clearly labeled placeholders, so visitors are not sent to missing files or invented public applications.

| Item                               | Where to update it                                                               | Current state                                                                      |
| ---------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Public portfolio address           | `NEXT_PUBLIC_SITE_URL` in `.env.local` or hosting build settings                 | `https://your-portfolio.example` placeholder                                       |
| CV PDF                             | `public/cv/otete-benjamin-agogo-cv.pdf`; optional `NEXT_PUBLIC_CV_PATH` override | View CV links in desktop navigation, the mobile menu, and Contact                  |
| Nurse.ng live application          | `projectLiveUrls.nurseNg` near the top of `src/lib/content.ts`                   | `https://nurse-ng.onrender.com/`                                                     |
| HMSI-API public API demo           | `projectLiveUrls.hmsiApi` near the top of `src/lib/content.ts`                   | Blank; ready for the owner to add the URL                                           |
| HMSI-API repository                | HMSI-API’s `repository` in `src/lib/content.ts`                                  | Repository access through Contact                                                  |
| Igede Language SI repository       | Igede Language SI’s `repository` in `src/lib/content.ts`                         | Request GitHub access through Contact; the supplied URL is not publicly accessible |
| Igede Language SI live application | `projectLiveUrls.igedeLanguageSi` near the top of `src/lib/content.ts`           | Blank; ready for the owner to add the URL                                           |
| Agro-Shield live application       | `projectLiveUrls.agroShield` near the top of `src/lib/content.ts`                | `https://agroshield.com.ng/`                                                       |

For local configuration, copy `.env.example` to `.env.local`, then replace the values you have available. Restart the development server after changing environment values. Production updates require a new build and publication.

## Updating the CV

1. Export your updated CV as a PDF.
2. Replace `public/cv/otete-benjamin-agogo-cv.pdf` with that PDF, keeping the same filename.
3. Run `npm run build`, then commit and publish the updated site through your normal deployment process.

All three View CV locations open the same PDF in a new tab. The build calculates a version from the file's contents and appends it to the shared link. Replacing the PDF changes that version automatically, so browsers request the updated document without editing any buttons or page components.

The project copy is the website's source of truth. Editing the original document or the PDF in Downloads does not update the website; export it, replace the project PDF, and publish again. When using `npm run dev`, restart the development server after replacing the PDF so it calculates the new version.

An editable Word/LibreOffice source is available at [`docs/cv/otete-benjamin-agogo-cv.docx`](cv/otete-benjamin-agogo-cv.docx). See [the editing guide](cv/README.md) for the source-to-PDF update process.

To use a different filename, put the PDF in `public/cv` and set `NEXT_PUBLIC_CV_PATH=/cv/your-filename.pdf` in local or hosting build settings. The build reports a missing or invalid PDF path rather than generating a broken link.

## When the portfolio is hosted

Replace `NEXT_PUBLIC_SITE_URL=https://your-portfolio.example` with the actual public origin. Use the website’s origin without a page path, query, or fragment. This updates canonical URLs, the sitemap, robots instructions, and all portfolio and project sharing images together.

The explicit `.example` placeholder keeps indexing disabled. A real public origin enables indexing for the home and project pages; the custom 404 remains excluded.

## Project links and artwork

All project deployment URLs are together near the top of `src/lib/content.ts`:

```ts
export const projectLiveUrls = {
  nurseNg: "https://nurse-ng.onrender.com/",
  hmsiApi: "",
  agroShield: "https://agroshield.com.ng/",
  igedeLanguageSi: "",
};
```

Paste each complete public `https://` URL between its quotes when deployment is ready. For HMSI-API, use the public API documentation or demo address. Leave the values blank until then. Cards and case-study live links activate together when their value is filled in. Restart the development server for local changes, or rebuild and publish for the hosted site.

The portfolio's own address is configured separately with `NEXT_PUBLIC_SITE_URL` in `.env.local` or your hosting build settings. It must be the website origin, without a page path. This updates canonical URLs, sharing metadata, the sitemap and indexing together.

Repository fields remain inside the project records identified by their `slug`. HMSI-API and Igede Language SI are verified private repositories. If either becomes public, set its `repository` to the real GitHub URL and update its availability note; the cards and case studies update together.

Run `npm run assets:social` locally after changing project sharing copy. It generates the portfolio image and one 1200 × 630 image per project from local artwork and project captures. Include the updated files in the next production build.
