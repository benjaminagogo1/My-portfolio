# Case studies, reading, contact, and sharing verification

Verified on 18 November 2026 against the current production export.

The case studies now explain implementation decisions, tradeoffs, and concrete repository evidence. Agro-Shield identifies Benjamin as the Frontend Engineer and links to the owner-supplied `https://agroshield.com.ng/`, whose actual public landing page returned HTTP 200. The implementation evidence describes source and tests reviewed; it does not invent adoption figures or measured project outcomes.

Default reading paragraphs are 16px, supporting text is generally 14px, and small CSS labels are at least 12px. The 320px larger-text inspection measured reading paragraphs at 19.2px. Phone expertise cards and tablet project cards use one column, and preview captions remain in normal document flow.

Contact offers Email me, a visible email address, and Copy email. Browser inspection verified successful copying and the fallback selection/status message when clipboard access is unavailable. Navigation and Contact contain labeled CV placeholders until the finished PDF is configured. Missing project live destinations have labeled placeholders.

Canonical links, the four-entry sitemap, and all four social sharing images use the editable `https://your-portfolio.example` address. Indexing remains disabled while that placeholder is active. Project pages have their own Open Graph and Twitter titles and 1200 × 630 images. Public-origin normalization, replacement with a configured origin, invalid-origin rejection, and missing-CV protection passed separate configuration checks. See [the link guide](../../LINKS.md) for replacement instructions.

## Checks

- Production build, lint, standalone type checking, and whitespace checks passed.
- The full browser suite passed 68 checks. Its remaining phone asset check initially inspected a lazy-loaded image before scrolling to it. The check now scrolls to every image; the corrected test passed on desktop, tablet, and phone. All 69 distinct regression checks were therefore verified across the full run and targeted rerun.
- The regression suite includes automated WCAG A/AA checks on the home page, all three case studies, and the custom 404; dark and larger-text appearances; navigation; keyboard interactions; display preferences; reduced motion; narrow layouts; and essential content without JavaScript.
- The separate [browser inspection](report.json) covers the home and all three case studies at 1440px, 768px, 390px, 320px dark, and 320px dark with larger text and higher contrast. No horizontal overflow or browser errors were observed.
- Exported metadata contains the correct per-page canonical and sharing information, all referenced sharing images exist, and no localhost sharing URLs remain.

## Screenshots

- [Phone hero](hero-390-light.png)
- [Phone home](home-390-light.png)
- [Desktop projects](projects-1440-light.png)
- [Agro-Shield desktop case study](agro-shield-1440-light.png)
- [Agro-Shield phone case study](agro-shield-390-light.png)
- [HMSI-API phone introduction](hmsi-top-390-light.png)
- [Phone Contact](contact-390-light.png)
- [Narrow dark Contact with larger text](contact-320-dark-large.png)
- [Phone navigation and CV placeholder](navigation-390-light.png)
