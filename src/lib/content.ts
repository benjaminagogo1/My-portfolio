import { z } from "zod";

export const identity = {
  name: "Otete Benjamin Agogo",
  title: "AI-Native Engineer",
  email: "josephbenjamin046@gmail.com",
  github: "https://github.com/benjaminagogo1",
  linkedin: "https://www.linkedin.com/in/otete-benjamin-agogo-03861b210/",
  facebook: "https://www.facebook.com/profile.php?id=61573088355413",
};

export const cvPath = process.env.NEXT_PUBLIC_CV_PATH?.trim() || null;

export const navigation = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Expertise", id: "expertise" },
  { label: "Journey", id: "journey" },
  { label: "Contact", id: "contact" },
];

const previewSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("screenshot"),
    name: z.string(),
    strapline: z.string(),
    src: z.string(),
    alt: z.string(),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    tone: z.enum(["sage", "harvest"]),
    context: z.string(),
    caption: z.string(),
    description: z.string(),
    credit: z
      .object({
        description: z.string(),
        sourceUrl: z.url(),
        license: z.string(),
        licenseUrl: z.url(),
      })
      .optional(),
  }),
  z.object({
    kind: z.literal("architecture"),
    description: z.string(),
  }),
  z.object({
    kind: z.literal("language"),
    name: z.string(),
    languages: z.tuple([z.string(), z.string()]),
    caption: z.string(),
    description: z.string(),
  }),
]);

export type ProjectPreviewData = z.infer<typeof previewSchema>;

const projectSchema = z.object({
  slug: z.string(),
  name: z.string(),
  formerName: z.string().optional(),
  category: z.string(),
  domain: z.string(),
  status: z.string(),
  headline: z.string(),
  description: z.string(),
  problem: z.string(),
  solution: z.string(),
  technologies: z.array(z.string()),
  implemented: z.array(z.string()),
  planned: z.array(z.string()),
  inProgress: z.array(z.string()).default([]),
  architecture: z.string().optional(),
  teamDescription: z.string().optional(),
  role: z.string().optional(),
  contribution: z.string().optional(),
  engineering: z.object({
    title: z.string(),
    approach: z.string(),
    tradeoff: z.string(),
  }),
  verification: z.array(
    z.object({ title: z.string(), description: z.string() }),
  ),
  evidenceLinks: z
    .array(z.object({ label: z.string(), href: z.url() }))
    .default([]),
  repository: z.url().nullable(),
  liveUrl: z.url().optional(),
  repositoryNote: z.string().optional(),
  repositoryRequestLabel: z.string().optional(),
  preview: previewSchema,
  evidence: z.string(),
});

export const projects = z.array(projectSchema).parse([
  {
    slug: "nurse-ng",
    name: "Nurse.ng",
    category: "Healthcare · Community platform",
    domain: "Healthcare technology",
    status: "In development",
    headline: "A stronger connection for the people who care.",
    description:
      "A healthcare technology initiative connecting nurses with their professional community, career opportunities, and one another.",
    problem:
      "Nursing professionals need a useful place to discover opportunities, share knowledge, and build professional connections. These needs are often spread across separate channels.",
    solution:
      "Build a community-centered platform for the nursing ecosystem. The current application brings discussions, professional profiles, connections, opportunities, and messaging into one member workspace.",
    engineering: {
      title: "Discovery with member-controlled visibility",
      approach:
        "Professional profiles start as private drafts. Publishing is an explicit choice, and each field has its own visibility setting. Following a member and requesting a connection are separate actions; private messaging requires an accepted connection.",
      tradeoff:
        "Public discovery only includes members who choose to publish. This gives members control over their professional presence while keeping community participation separate from profile sharing.",
    },
    verification: [
      {
        title: "Private by default",
        description:
          "The repository’s profile and community tests check that an unpublished profile stays out of discovery and appears only after explicit publication.",
      },
      {
        title: "Connections require acceptance",
        description:
          "Community tests distinguish an immediate follow from a pending connection request, then check the transition after the recipient accepts.",
      },
    ],
    evidenceLinks: [
      {
        label: "Browse automated tests",
        href: "https://github.com/benjaminagogo1/nurse-ng/tree/main/tests",
      },
      {
        label: "Explore application routes",
        href: "https://github.com/benjaminagogo1/nurse-ng/tree/main/app/web",
      },
    ],
    technologies: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "Jinja2",
      "PostgreSQL",
      "JavaScript",
    ],
    implemented: [
      "Community discussions, replies, search, and discussion follows",
      "Professional profiles with member-controlled visibility",
      "Nurse discovery, connection requests, and private messaging between accepted connections",
      "Job listings, employer posting, and applications with contact-sharing consent",
      "Community events, saved information, and selected offline drafts",
    ],
    planned: [
      "Broader employer capabilities as the community becomes established",
      "AI-assisted recruitment discovery",
      "Further hosting and operational verification before a public launch",
    ],
    repository: "https://github.com/benjaminagogo1/nurse-ng",
    liveUrl: undefined, // Replace with the public application URL when available.
    preview: {
      kind: "screenshot",
      name: "NURSE.NG",
      strapline: "THE NURSING ECOSYSTEM",
      src: "/images/nurse-ng-preview.webp",
      alt: "Actual Nurse.ng public page with the headline Better Careers, Stronger Nurses, Healthier Communities and nursing career search",
      width: 1440,
      height: 1030,
      tone: "sage",
      context: "Local development preview",
      caption: "ACTUAL APPLICATION · LOCAL PAGE CAPTURE",
      description:
        "A genuine capture of the current Nurse.ng public page, running locally. It shows the application’s actual interface.",
      credit: {
        description:
          "Preview photograph: Lindsay Mgbor / DFID. Adapted in the application layout.",
        sourceUrl:
          "https://commons.wikimedia.org/wiki/File:Learning_to_save_lives_(7138904925).jpg",
        license: "CC BY-SA 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
      },
    },
    evidence:
      "Reviewed the public repository README, dependency manifest, community routes, and application templates in November 2026. Preview captured from the actual public-page template running locally with an isolated database. This is development work; no adoption or live deployment is asserted.",
  },
  {
    slug: "hmsi-api",
    name: "HMSI-API",
    category: "Healthcare · Systems interoperability",
    domain: "Healthcare technology",
    status: "API foundation implemented",
    headline: "Care moves forward when information can follow.",
    description:
      "A referral and clinical information exchange API addressing the gaps between healthcare facilities, with continuity of care at its core.",
    problem:
      "When patients move between facilities, relevant clinical information can become fragmented. A receiving team needs an appropriate medical summary and a clear referral history.",
    solution:
      "Start with a defined referral workflow between two facilities, carrying the minimum relevant clinical information. The implemented API coordinates referral creation, receipt, clinical decisions, returned outcomes, and closure within a facility-scoped system.",
    engineering: {
      title: "Complete the referral workflow before the client",
      approach:
        "The first milestone is an API workflow from referral creation to returned outcome. Explicit lifecycle states govern the permitted actions. Facility-scoped authorization, version checks, and idempotency keys protect each transition.",
      tradeoff:
        "The clinician-facing interface and FHIR mapping come later. The current foundation concentrates on a persistent referral workflow that can reject stale updates and handle repeated submissions consistently.",
    },
    verification: [
      {
        title: "Repeated submissions stay consistent",
        description:
          "The API tests repeat a submission with the same idempotency key and payload, expect the original response, and check that only one submission transition and outbox event were created.",
      },
      {
        title: "Stale updates are rejected",
        description:
          "The same test submits an older version and expects a 409 stale-version response. Separate tests cover facility boundaries and invalid lifecycle actions.",
      },
    ],
    technologies: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "Alembic",
      "SQLite",
      "JWT",
    ],
    implemented: [
      "Referral lifecycle from draft through returned outcome and closure",
      "JWT authentication and facility-scoped, role-based authorization",
      "Persistent records, audit history, and optimistic version checks",
      "Idempotent submission and an explicitly invoked outbox dispatcher",
      "REST endpoints and generated OpenAPI documentation",
    ],
    planned: [
      "Clinician-facing web interface and offline synchronization",
      "FHIR R4 mapping and integration with existing hospital systems",
      "Support for facilities with and without existing digital systems",
      "Clinical, legal, and operational validation before use with real patient information",
    ],
    repository: null,
    liveUrl: undefined, // Replace with the public application URL when available.
    repositoryNote:
      "The supplied repository, github.com/benjaminagogo1/HMSI-API, is currently unavailable publicly. Implementation details were verified from the local repository. Contact Benjamin for repository access.",
    preview: {
      kind: "architecture",
      description:
        "An explanatory diagram of the referral exchange workflow. The clinician-facing interface is planned.",
    },
    evidence:
      "Reviewed the local repository README, Python dependency manifest, referral endpoints, authentication modules, lifecycle specification, and outbox dispatcher in November 2026. The visual is an explanatory architecture diagram, not a product screenshot. Development is restricted to synthetic data; FHIR integration and independent hospital deployments are not implemented.",
  },
  {
    slug: "agro-shield",
    name: "Agro-Shield",
    category: "Agriculture · Team project",
    domain: "Agricultural technology",
    status: "In development",
    headline: "Better visibility, from stored produce to the marketplace.",
    description:
      "A team-built agricultural platform bringing together produce management, farmer–buyer trading, and AI-assisted guidance to address post-harvest losses and limited market access.",
    problem:
      "Farmers need clearer visibility over stored produce, useful agricultural information, and direct access to buyers. Fragmented records and market information make it harder to plan sales and manage harvests.",
    solution:
      "Bring produce inventory, trading workflows, and agricultural guidance into one platform. Farmers can maintain stock and listings; buyers can browse, negotiate, and place orders. Shared services connect communication, market context, AI assistance, and payment and delivery workflows.",
    role: "Frontend Engineer",
    contribution:
      "I worked as the Frontend Engineer on Team Agro-Shield. The frontend uses HTML, CSS, and JavaScript with Go-rendered templates to present the platform’s farmer and buyer workflows.",
    engineering: {
      title: "Connect the browser interface to domain services",
      approach:
        "Go templates render the application pages, with HTML and CSS defining the interface and JavaScript handling browser interactions. Backend handlers connect those pages to inventory, trading, communication, and agricultural guidance services.",
      tradeoff:
        "The frontend is part of a shared Go application rather than a separate single-page client. AI and payment flows rely on configured external providers; expanded offline and low-bandwidth access remain further work.",
    },
    verification: [
      {
        title: "Real frontend source",
        description:
          "The public repository contains the application’s page templates, styles, and browser scripts. The source links below let a reviewer inspect that frontend directly.",
      },
      {
        title: "A public application to explore",
        description:
          "The live Agro-Shield site is available at agroshield.com.ng. The portfolio preview is a separate, genuine capture of the repository’s public landing-page template.",
      },
    ],
    evidenceLinks: [
      {
        label: "Frontend page templates",
        href: "https://github.com/etoosammy01/Agro-Shield/tree/main/frontend/pages",
      },
      {
        label: "Browser scripts",
        href: "https://github.com/etoosammy01/Agro-Shield/tree/main/frontend/js",
      },
    ],
    liveUrl: "https://agroshield.com.ng/",
    technologies: [
      "Go",
      "PostgreSQL",
      "JavaScript",
      "Gemini",
      "pgx",
      "HTML / CSS",
      "Go templates",
      "Groq / OpenRouter",
      "Flutterwave",
    ],
    implemented: [
      "Farmer and buyer accounts, profiles, and session authentication",
      "Produce inventory, sale listings, marketplace search, and cart/order workflows",
      "Farmer–buyer chat and price negotiations",
      "AI-assisted crop analysis with saved diagnosis history, plus agricultural learning chat",
      "Market-price comparisons and buyer-activity insights from listings and recorded events",
      "Payment, wallet, and delivery-status workflows with Flutterwave integration",
    ],
    inProgress: [
      "USSD access: basic server-side menus are implemented; a mobile-network gateway rollout has not been verified.",
    ],
    planned: [
      "Expanded local-language, low-bandwidth, and offline access",
      "More agricultural data sources and AI-based yield or price forecasting",
      "Logistics-provider integration and improved delivery tracking",
    ],
    architecture:
      "A Go net/http application renders HTML templates and uses JavaScript for browser interactions. HTTP handlers call domain services, which use repositories backed by PostgreSQL through pgx. Separate providers support Gemini crop analysis, Groq/OpenRouter learning chat, and Flutterwave payment workflows.",
    teamDescription:
      "Built by Team Agro-Shield for the Idoma Centenary Plus Hackathon 2026, in the Agro-Innovation track.",
    repository: "https://github.com/etoosammy01/Agro-Shield",
    preview: {
      kind: "screenshot",
      name: "AGRO-SHIELD",
      strapline: "AGRICULTURAL TECHNOLOGY",
      src: "/images/agro-shield-preview.webp",
      alt: "Agro-Shield public landing page introducing harvest management, agricultural guidance, and farmer–buyer connections",
      width: 1440,
      height: 1000,
      tone: "harvest",
      context: "Public landing-page template",
      caption: "PUBLIC INTERFACE · LOCAL TEMPLATE CAPTURE",
      description:
        "A genuine browser capture of the repository’s public landing-page template and marketing assets, served locally. It contains no private member data or uploaded profile images.",
    },
    evidence:
      "Reviewed public GitHub commit b12b4d3, the README, go.mod, registered Go routes, backend services and PostgreSQL repositories, frontend templates, and public branding in November 2026. Benjamin confirmed his Frontend Engineer role and supplied agroshield.com.ng; its public landing page was verified in November 2026. AI and payment capabilities depend on configured external providers; no live financial transactions, adoption figures, or agricultural outcomes are asserted.",
  },
  {
    slug: "igede-language-si",
    name: "Igede Language SI",
    formerName: "Igede AI",
    category: "AI · NLP · Language Preservation",
    domain: "Igede language technology",
    status: "In Development",
    headline: "Preserve • Document • Empower • Through Technology",
    description:
      "Igede Language SI is a community-driven initiative that uses artificial intelligence and technology to preserve, document, and advance Igede language technology.",
    problem:
      "Preserving Igede and developing useful language technology require structured examples, accessible ways for speakers to contribute, and a consistent process for reviewing language data. The initiative brings those needs into one community-led effort.",
    solution:
      "The project's long-term vision is to develop an English–Igede chatbot and bidirectional translation system. To achieve this, we are building a structured, community-verified Igede language dataset that can serve as a foundation for future Natural Language Processing (NLP) research and development.",
    role: "Project Lead and Head of Communication",
    contribution:
      "I serve as the Project Lead and Head of Communication for Igede Language SI. I provide project direction, coordinate team activities, contribute to strategic planning, oversee team communication, and help drive the project's vision and objectives. I am also involved in shaping the frontend experience of the data collection platform. My responsibilities include coordinating team contributions, facilitating collaboration, communicating project updates, and helping ensure that our development efforts remain aligned with the project's long-term vision.",
    teamDescription:
      "A community-driven initiative bringing together the project team, Igede speakers, and contributors to preserve, document, and advance Igede language technology.",
    technologies: [
      "Python",
      "Flask",
      "PostgreSQL",
      "JavaScript",
      "Jinja2",
      "HTML / CSS",
    ],
    architecture:
      "The current collection platform uses Python and Flask with Jinja2-rendered HTML, CSS, and browser JavaScript. PostgreSQL stores contributions, consent metadata, review decisions, and staff accounts. The repository’s AI area documents future chatbot and NLP development; the collection platform is the implemented foundation.",
    engineering: {
      title: "Community-reviewed data before model development",
      approach:
        "Contributions carry language direction, category, source information, and consent metadata. Validation and duplicate checks run before storage. Pending, approved, and rejected states support a staff review workflow, with approved entries used for public browsing and controlled exports.",
      tradeoff:
        "Dataset collection, review, and standardisation come before training and evaluating language models. The implemented platform supports that foundation; chatbot development, bidirectional translation, and translation-quality evaluation remain future work.",
    },
    implemented: [
      "Community submission forms for text, audio, and image contributions",
      "English–Igede language-direction metadata, optional translations, categories, consent records, and duplicate checks",
      "PostgreSQL-backed review queues, approval and rejection, staff permissions, and review history",
      "Public browsing and controlled exports of approved language contributions",
      "Image-labeling workflows with text names or voice recordings",
    ],
    inProgress: [
      "Growing and reviewing community contributions toward a structured Igede language dataset",
      "Refining submission guidelines, standardisation practices, and the contributor experience",
    ],
    planned: [
      "An English–Igede chatbot and bidirectional translation system",
      "NLP research, model development, and evaluation using reviewed language data",
      "Broader access to Igede language technology for future generations",
    ],
    verification: [
      {
        title: "Validation and consent",
        description:
          "The local repository’s submission tests cover required consent, allowed language directions and categories, input limits, and normalised duplicate detection.",
      },
      {
        title: "Reviewed data has a clear boundary",
        description:
          "Tests check that public browsing excludes pending submissions, staff permissions govern review actions, and approvals record review history. Export tests check the default inclusion of approved, consented records.",
      },
    ],
    repository: null,
    repositoryRequestLabel: "Request GitHub access",
    repositoryNote:
      "The supplied repository, github.com/benjaminagogo1/Igede-language-AI, is not publicly accessible. Its renamed local checkout was available for source review. Contact Benjamin to request GitHub access.",
    liveUrl: undefined, // Add a verified public application URL when available.
    preview: {
      kind: "language",
      name: "IGEDE LANGUAGE SI",
      languages: ["English", "Igede"],
      caption: "PROJECT PIPELINE · CHATBOT & TRANSLATION PLANNED",
      description:
        "An explanatory illustration of the community contribution, review, and dataset workflow. It represents the initiative’s direction, not a product screenshot or a completed chatbot.",
    },
    evidence:
      "Reviewed the available local checkout at commit 2d2d628, including requirements.txt, the Flask application, PostgreSQL schema and database layer, submission validators, frontend templates and scripts, and tests in November 2026. The supplied GitHub URL and the renamed repository endpoint both returned 404 to unauthenticated requests. Benjamin’s Project Lead and Head of Communication role and frontend involvement were supplied by the owner. No dataset volume, trained model, translation accuracy, or public deployment is asserted.",
  },
]);

export type Project = z.infer<typeof projectSchema>;

export const expertise = [
  {
    title: "Software engineering",
    icon: "code",
    description: "Understanding the system before writing the code.",
    detail:
      "Building from first principles, breaking problems into testable parts, and developing clear application architecture.",
    tools: "Python · Go · Git · Linux",
    status: "Building",
  },
  {
    title: "Full-stack development",
    icon: "layers",
    description: "Connecting thoughtful interfaces to useful functionality.",
    detail:
      "Working across application pages, backend services, and data persistence to understand how complete products fit together.",
    tools: "JavaScript · HTML · CSS · Jinja2",
    status: "Building",
  },
  {
    title: "Backend & APIs",
    icon: "network",
    description: "The foundations that make a product dependable.",
    detail:
      "Developing REST APIs, authentication, validation, database models, and explicit workflows in healthcare and other practical domains.",
    tools: "FastAPI · SQLAlchemy · PostgreSQL · Docker",
    status: "Building",
  },
  {
    title: "AI-native engineering",
    icon: "brain",
    description: "Developing through my fellowship programme.",
    detail:
      "My fellowship programme is preparing me toward an AI-Native Engineer role. I’m developing that direction alongside full-stack applications, backend APIs, and the practical engineering work shown in my projects.",
    tools: "Python · AI integration · Responsible AI",
    status: "Fellowship in progress",
  },
  {
    title: "Embedded systems & IoT",
    icon: "cpu",
    description: "Looking beyond the screen, into the physical world.",
    detail:
      "A longer-term learning direction: understanding sensors, connected devices, and the interfaces between hardware and software.",
    tools: "Embedded systems · Sensors · Connected devices",
    status: "Learning direction",
  },
  {
    title: "Healthcare technology",
    icon: "heart",
    description: "Engineering informed by the realities of care.",
    detail:
      "Drawing on a nursing and healthcare background to identify practical needs in professional communities, information exchange, and continuity of care.",
    tools: "Nurse.ng · HMSI-API · Healthcare workflows",
    status: "Building",
  },
];
