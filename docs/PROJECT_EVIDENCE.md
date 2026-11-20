# Content and asset evidence

Reviewed on 17–19 November 2026. Personal copy follows the user's supplied identity, confirmed responsibilities and education, updated CV, and [public GitHub profile README](https://github.com/benjaminagogo1/benjaminagogo1). No employment dates, proficiency levels, qualifications beyond supplied information, adoption figures, or testimonials were invented.

The final authenticated repository review checked the current main branches and manifests: Nurse.ng `df1394b`, HMSI-API `40885e9`, Agro-Shield `b12b4d3`, and Igede Language SI `9619ec9`. GitHub metadata confirmed that HMSI-API and Igede Language SI are private repositories. The owner's latest clarification confirms **Project Initiator & Lead Developer** for Nurse.ng and HMSI-API, **Frontend Lead** for Agro-Shield, and **Project Lead & Data Collection Platform Co-Developer** for Igede Language SI. The fellowship title is **AI Engineering Fellow**.

The owner requests simple project labels: Nurse.ng **MVP Completed**, Agro-Shield **Completed** as a collaborative hackathon project, and HMSI-API and Igede Language SI in development. Further capabilities remain documented in each project's planned and in-progress sections. Deployment URL fields remain blank for the owner to fill in; the website shows a live link once its URL is supplied, without deployment-status placeholder text. The editable fields are grouped in `projectLiveUrls` near the top of `src/lib/content.ts`; the portfolio origin uses `NEXT_PUBLIC_SITE_URL`. The editable CV also leaves blank URL spaces for Nurse.ng, HMSI-API, and Igede Language SI.

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

The owner has confirmed that deployment is ongoing. No public live application URL has been supplied or verified. The site links to the public repository and the local case study, preserving an editable deployment field instead of treating the example `nurse.ng` production configuration as a verified launch. The repository's AI integration proposal distinguishes AI-assisted development from planned member-facing model features.

## HMSI-API

Supplied GitHub location: `https://github.com/benjaminagogo1/HMSI-API`

The unauthenticated URL and API review on 17–18 November returned 404. The authenticated review on 19 November confirmed a private repository and checked its current main branch and dependency manifest. A local Git checkout at `/home/recoding/HMSI-API` was also reviewed without modifying it. Sources included:

- `README.md`: Phase 1 referral vertical slice complete; clinician client, offline sync, FHIR, and next-phase work have not started; synthetic data only.
- `services/api/pyproject.toml`: Python, FastAPI, SQLAlchemy, Alembic, Pydantic settings, and PyJWT.
- `services/api/hmsi/api/referrals.py`: draft creation, reading, readiness, submission, acknowledgment, clinical decisions, outcome recording, and closure.
- `services/api/hmsi/referrals/delivery.py`: explicitly invoked outbox dispatcher and system transitions. This does not establish an independently deployed hospital-to-hospital transport system.
- Authentication and persistence modules: facility-scoped authorization, audit records, version checks, and submission idempotency.
- Architecture decision records and shared referral lifecycle specification.

The portfolio diagram explains a referral exchange. It is labeled as an architecture visual, not a screenshot. Existing hospital system adapters, FHIR R4 mapping, independent facility deployment, clinician interfaces, and offline synchronization are described as planned.

Because the repository is private, the visible repository action opens Contact to request GitHub access. If it becomes public, set its `repository` URL in `src/lib/content.ts` and update the availability note. Its deployment field accepts the real public API documentation or demo address when supplied; the clinician interface remains future work.

## Agro-Shield

Public repository: <https://github.com/etoosammy01/Agro-Shield>. The supplied `etoosammy01-oss/Agro-Shield` address redirects to this canonical repository. Reviewed the public `main` snapshot at [commit b12b4d3032a64656db0b33738bfb9b82f231cd13](https://github.com/etoosammy01/Agro-Shield/tree/b12b4d3032a64656db0b33738bfb9b82f231cd13), downloaded from GitHub on 18 November 2026.

The README identifies Team Agro-Shield and the Idoma Centenary Plus Hackathon 2026. The owner confirmed that he was the Frontend Lead, led the frontend development team, coordinated implementation, and contributed interfaces using JavaScript, HTML, CSS, and Go-rendered templates. The hackathon project is presented as completed, with further USSD and integration work documented separately. The portfolio puts frontend technologies first and attributes individual interface work and team leadership to Benjamin.

The review included:

- `README.md`: agricultural problem, intended users, implementation status, team context, and future improvements.
- `backend/go.mod`, `backend/main.go`, and `backend/internal/database/database.go`: Go, `net/http`, PostgreSQL/pgx, and configured AI and Flutterwave providers. The production-facing frontend uses HTML, CSS, JavaScript, and Go templates.
- `backend/routes/Routes.go` and the handlers, services, and repositories for crops, marketplace/cart/orders, chat, negotiations, deliveries, payments, and wallets: implemented request paths and persistence, rather than README-only feature claims.
- `backend/internal/services/ai_services.go`, `gemini_provider.go`, and `learning/`: Gemini crop-analysis integration and saved diagnosis history, with separate Groq/OpenRouter agricultural learning providers. No accuracy claim or independently trained model is implied.
- `backend/internal/repository/market_event_repository.go` and `backend/cmd/market-import/`: price comparisons and activity signals come from listings, recorded events, and imported data. AI yield/price forecasting remains future work.
- `backend/ussd/handler.go`: registered, provider-neutral menus for storage, marketplace, sales, notifications, and profile access. The callback exists; a mobile-network gateway deployment was not verified. The README describes USSD as in progress.
- `frontend/pages/index.html`, `marketplace.html`, `storage.html`, `ai-assistant.html`, `learning.html`, and `order.html`, plus public CSS/JavaScript and branding assets: real interface structure and the supported user workflows.

The preview uses the original public landing-page template, CSS, JavaScript, logos, and its public farming photographs. This page's Go handler renders the template with no member data. Only the assets referenced by that public page were copied into an isolated static preview; no authenticated screens, uploaded profile pictures, private records, or fabricated transactions were used. The 1440 × 1000 source capture is `docs/verification/agro-shield-source.png`; its optimized WebP is `public/images/agro-shield-preview.webp`. The source manifest records the commit and template checksum in `docs/verification/agro-shield-source.json`. The portfolio labels the preview as a local public-template capture.

The owner supplied `https://agroshield.com.ng/` as the live application. Its public home page returned HTTP 200 and the actual Agro-Shield title, public navigation, and harvest-management introduction on 18 November 2026. The portfolio links to that live application. The separate `https://agro-shield.com` address found in an OpenRouter identification header is not used. Provider integrations are described as implemented code; payment processing, private member flows, and agricultural outcomes were not exercised or measured during this portfolio review.

## Igede Language SI

The owner supplied `https://github.com/benjaminagogo1/Igede-language-AI` and identified the project’s current name as **Igede Language SI**, formerly **Igede AI**. The latest role clarification is **Project Lead & Data Collection Platform Co-Developer**, covering project direction, team coordination, delegation, progress monitoring, meetings, updates, and documentation. The owner confirmed that he collaborated with another developer on the data collection platform and contributed substantially to its conceptualisation and ideas. He currently oversees community data collection; chatbot and translation development remain planned.

The supplied GitHub repository endpoint and renamed endpoint returned 404 to unauthenticated requests on 18 November. Authenticated metadata and manifest review on 19 November confirmed that the canonical `benjaminagogo1/Igede-language-AI` repository is private. The GitHub action therefore requests access through Contact. A public source link is not implied by the owner's ability to review the private repository.

An available, clean local checkout at `/home/recoding/Igede-language-SI-formerly-called-AI-`, commit `2d2d628`, was reviewed without running or modifying its application or databases. Its remote points to the renamed repository. An older local checkout at `/home/recoding/igede-clean` documents an earlier SQLite prototype; the portfolio uses the newer, verified PostgreSQL implementation.

Reviewed sources:

- `README.md`, `data/README.md`, `ai/README.md`, and project documentation: dataset-first mission, community roles, contribution and review pipeline, and future chatbot and bidirectional translation work.
- `requirements.txt` and `web/MVP/app.py`: Python, Flask, Jinja2, and Flask-Login; HTML templates and browser JavaScript provide the interface.
- `web/MVP/database.py` and `schema.sql`: PostgreSQL through psycopg2, language-direction and contribution metadata, consent records, pending/approved/rejected states, and review history.
- Submission and review routes, `validators.py`, image-labeling modules, and frontend templates/scripts: text, audio, and image contributions; optional English–Igede translations; validation and duplicate checks; staff review; approved public browsing; exports; and image-name recordings.
- `web/MVP/tests/test_submissions.py` and `test_image_labeling.py`: source-level coverage of consent, validation, duplicate handling, staff permissions, approved public listings, review history, exports, and labeling.

Only confirmed implementation technologies are listed: Python, Flask, PostgreSQL, JavaScript, Jinja2, and HTML/CSS. README suggestions such as pandas, FastAPI, Hugging Face, or model training are not presented as implemented technologies. The AI directory contains a roadmap, not a verified trained chatbot or translation model. Dataset targets and structural examples are not claimed as achieved volume or verified translations. No public application URL was supplied or independently verified.

The new preview and sharing artwork are original HTML/CSS illustrations of the contribution → review → dataset workflow, using the portfolio’s palette and typography. They include no contributor records, translations, private images, or unverified product interface. The caption explicitly marks chatbot and translation work as planned.

## Expertise and contact

Python, Go, JavaScript, FastAPI, HTML, CSS, PostgreSQL, Docker, Git, and Linux are supported by the user's profile or reviewed projects. The owner selected **AI-Native Engineer** as his identity. About and Expertise explain the documented AI-assisted development workflow: source review and automated checks accompany assistant-supported implementation. Agro-Shield's model-provider integrations are team platform capabilities; Benjamin's individual role is frontend engineering. Igede's collection platform precedes future chatbot and translation work. Embedded systems, IoT and model training remain learning directions; no unsupported hardware platform or ML library is listed as a proficiency.

The CV records the owner-confirmed B.Sc. in Nursing Science from Benue State University, graduated in 2025, and **AI Engineering Fellow** at Talent Nation Fellowship (formerly Learn2Earn), retaining the dates of 2025–Present. The homepage and engineering journey describe a durable professional direction rather than a temporary fellowship status. Healthcare and agriculture are application domains within that broader engineering identity.

The GitHub, LinkedIn, and Facebook links match the user's supplied URLs and profile README. The owner supplied `josephbenjamin046@gmail.com`; the portfolio displays it, provides Copy email, and opens the visitor's email application through `mailto:`. The verified two-page, tagged PDF CV is linked from desktop navigation, the mobile menu and Contact. Its URL includes an automatically computed file-content version. The editable DOCX and public PDF use the same confirmed roles and scoped completion labels. There is no contact form or simulated message submission.

## Original portfolio assets

- The connected-systems wireframe globe and exchange diagram are built directly in SVG, CSS, and React. They do not represent live telemetry or implemented product screens.
- The hero portrait was supplied by the owner as `Me.jpg` on 18 November 2026. `public/images/benjamin-agogo-portrait.webp` preserves the full photograph at its original 294 × 273 dimensions; the circular presentation is CSS styling.
- Social sharing artwork is rendered from original HTML/SVG through `scripts/generate-social-preview.mjs`.
- DM Sans and Instrument Serif are downloaded from Google Fonts and served locally. SIL Open Font License files are included in `public/fonts`.
