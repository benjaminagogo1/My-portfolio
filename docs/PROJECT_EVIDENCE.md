# Content and asset evidence

Reviewed on 17 November 2026. Personal copy follows the user's supplied identity and [public GitHub profile README](https://github.com/benjaminagogo1/benjaminagogo1). No employment dates, proficiency levels, qualifications, adoption figures, or testimonials were invented.

## Nurse.ng

Public repository: <https://github.com/benjaminagogo1/nurse-ng>

Reviewed a snapshot of the public `main` branch downloaded from GitHub, including:

- `README.md`: current community priority, implemented functionality, further employer expansion, operational limits, and AI discovery pending.
- `pyproject.toml`: Python, FastAPI, SQLAlchemy, Alembic, PostgreSQL driver, Jinja2, and supporting dependencies.
- `app/web/community_routes.py`: conversations, replies, discovery, and connection-related routes.
- `app/templates/home.html`, `app/templates/base.html`, and corresponding application styles: actual public-page design.
- Community, messaging, jobs, and offline service/module structure.

The featured screenshot was captured with Chrome from the actual public application at a local preview, using the public repository code and an isolated SQLite database in `/tmp`. It contains no seeded member activity, job statistics, or personal records. The unmodified source capture is `docs/verification/nurse-ng-source.png`; the optimized image is `public/images/nurse-ng-preview.webp` at the same 1440 × 1030 dimensions. The presentation frame and perspective transform are portfolio styling.

The screenshot's background photograph is an existing Nurse.ng project asset. Its original credit is recorded in that repository's `app/static/img/CREDITS.txt`. This portfolio does not claim the pictured person is Benjamin.

No public live application URL was verified. The site links to the public repository and the local case study instead of treating the example `nurse.ng` production configuration as a verified launch.

## HMSI-API

Supplied GitHub location: `https://github.com/benjaminagogo1/HMSI-API`

That URL and the GitHub repository API returned 404. A local Git checkout at `/home/recoding/HMSI-API` was available and reviewed without modifying it. Sources included:

- `README.md`: Phase 1 referral vertical slice complete; clinician client, offline sync, FHIR, and next-phase work have not started; synthetic data only.
- `services/api/pyproject.toml`: Python, FastAPI, SQLAlchemy, Alembic, Pydantic settings, and PyJWT.
- `services/api/hmsi/api/referrals.py`: draft creation, reading, readiness, submission, acknowledgment, clinical decisions, outcome recording, and closure.
- `services/api/hmsi/referrals/delivery.py`: explicitly invoked outbox dispatcher and system transitions. This does not establish an independently deployed hospital-to-hospital transport system.
- Authentication and persistence modules: facility-scoped authorization, audit records, version checks, and submission idempotency.
- Architecture decision records and shared referral lifecycle specification.

The portfolio diagram explains a referral exchange. It is labeled as an architecture visual, not a screenshot. Existing hospital system adapters, FHIR R4 mapping, independent facility deployment, clinician interfaces, and offline synchronization are described as planned.

To avoid sending visitors to a known 404, the visible repository action opens the contact section to request access. The supplied address is recorded in project notes as plain text. Once the public repository becomes available, set its URL in `src/lib/content.ts` and remove the unavailable-access note; the project links update automatically.

## Expertise and contact

Python, Go, JavaScript, FastAPI, HTML, CSS, PostgreSQL, Docker, Git, and Linux are supported by the user's public profile or reviewed projects. AI is presented as an area of exploration; embedded systems and IoT as a longer-term learning direction. No unsupported hardware platform or ML library is listed as a proficiency.

The GitHub, LinkedIn, and Facebook links match the user's supplied URLs and public profile README. No public contact email was verified. There is no contact form or simulated message submission.

## Original portfolio assets

- The connected-systems wireframe globe, about symbol, and exchange diagram are built directly in SVG, CSS, and React. They do not represent live telemetry or implemented product screens.
- Social sharing artwork is rendered from original HTML/SVG through `scripts/generate-social-preview.mjs`.
- DM Sans and Instrument Serif are downloaded from Google Fonts and served locally. SIL Open Font License files are included in `public/fonts`.
