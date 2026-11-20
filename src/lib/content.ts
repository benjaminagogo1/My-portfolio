import { z } from "zod";

export const identity = {
  name: "Otete Benjamin Agogo",
  title: "AI-Native Engineer",
  email: "josephbenjamin046@gmail.com",
  github: "https://github.com/benjaminagogo1",
  linkedin: "https://www.linkedin.com/in/otete-benjamin-agogo-03861b210/",
  facebook: "https://www.facebook.com/profile.php?id=61573088355413",
};

export const cvPath = process.env.NEXT_PUBLIC_CV_URL || null;

// Paste each public deployment URL between the quotes when it is ready.
// Leave values blank until you are ready to add each deployment URL.
export const projectLiveUrls = {
  nurseNg: "",
  hmsiApi: "",
  agroShield: "https://agroshield.com.ng/",
  igedeLanguageSi: "",
};

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
  statusNote: z.string(),
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
  liveLabel: z.string().default("Live application"),
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
    status: "MVP Completed",
    statusNote:
      "MVP for a professional networking and recruitment platform for nurses. Further employer capabilities and AI-assisted features are planned.",
    headline: "A stronger connection for the people who care.",
    description:
      "A professional community platform connecting nurses through discussions, professional profiles, career opportunities, and private messaging.",
    problem:
      "Nursing professionals need a useful place to discover opportunities, share knowledge, and build professional connections. These needs are often spread across separate channels.",
    solution:
      "The FastAPI application brings discussions, professional profiles, connections, opportunities, and messaging into one member workspace. Profiles start as private drafts, members control which fields become public, and applications require consent before sharing contact details.",
    role: "Project Initiator & Lead Developer",
    contribution:
      "I developed the community application across member-facing pages and backend workflows, including profiles, discussions, connections, applications, and private messaging. My work includes private-by-default profiles, field-level visibility, consent-based contact sharing, and verification of profile visibility and community workflows.",
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
      "Alembic",
      "JWT",
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
      "Evaluation of optional AI writing assistance and source-linked discovery",
      "Further hosting and operational verification before a public launch",
    ],
    repository: "https://github.com/benjaminagogo1/nurse-ng",
    liveUrl: projectLiveUrls.nurseNg || undefined,
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
      "Reviewed the public main branch at df1394b on 19 November 2026, including its dependency manifest, community routes, profile and messaging workflows, tests, and AI integration proposal. The preview is a genuine local capture. Member-facing model-provider integration remains proposed; no adoption figures are asserted.",
  },
  {
    slug: "hmsi-api",
    name: "HMSI-API",
    category: "Healthcare · Systems interoperability",
    domain: "Healthcare technology",
    status: "In Development",
    statusNote:
      "Referral and clinical information exchange API in development. The referral workflow is tested with synthetic data; the clinician interface, offline synchronization, and FHIR mapping are planned.",
    headline: "Care moves forward when information can follow.",
    description:
      "A referral and clinical information exchange API addressing the gaps between healthcare facilities, with continuity of care at its core.",
    problem:
      "When patients move between facilities, relevant clinical information can become fragmented. A receiving team needs an appropriate medical summary and a clear referral history.",
    solution:
      "Start with a defined referral workflow between two facilities, carrying the minimum relevant clinical information. The implemented API coordinates referral creation, receipt, clinical decisions, returned outcomes, and closure within a facility-scoped system.",
    role: "Project Initiator & Lead Developer",
    contribution:
      "I implemented the referral API foundation: lifecycle transitions, JWT authentication, facility-scoped authorization, audit records, optimistic version checks, idempotent submission, and the outbox dispatcher. My work includes automated checks for repeated requests, stale updates, and access boundaries using synthetic data.",
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
    liveUrl: projectLiveUrls.hmsiApi || undefined,
    liveLabel: "API demo",
    repositoryRequestLabel: "Request GitHub access",
    repositoryNote:
      "HMSI-API is a private repository and is not publicly accessible. Its source was reviewed with owner-authorized access. Contact Benjamin to request GitHub access.",
    preview: {
      kind: "architecture",
      description:
        "An explanatory diagram of the referral exchange workflow. The clinician-facing interface is planned.",
    },
    evidence:
      "Reviewed main branch 40885e9 with owner-authorized access on 19 November 2026, corroborating the dependency manifest, referral endpoints, authentication, lifecycle specification, tests, and outbox dispatcher. The diagram explains the architecture. Phase 1 uses synthetic data; FHIR integration, the clinician interface, and independently deployed hospital-to-hospital operation are not established.",
  },
  {
    slug: "agro-shield",
    name: "Agro-Shield",
    category: "Agriculture · Team project",
    domain: "Agricultural technology",
    status: "Completed",
    statusNote:
      "A collaborative hackathon project connecting farmers and buyers through produce management, trading, and agricultural guidance.",
    headline: "Better visibility, from stored produce to the marketplace.",
    description:
      "A team-built agricultural platform bringing together produce management, farmer–buyer trading, and AI-assisted guidance to address post-harvest losses and limited market access.",
    problem:
      "Farmers need clearer visibility over stored produce, useful agricultural information, and direct access to buyers. Fragmented records and market information make it harder to plan sales and manage harvests.",
    solution:
      "Bring produce inventory, trading workflows, and agricultural guidance into one platform. Farmers can maintain stock and listings; buyers can browse, negotiate, and place orders. Shared services connect communication, market context, AI assistance, and payment and delivery workflows.",
    role: "Frontend Lead",
    contribution:
      "I led the frontend development team within Team Agro-Shield's collaborative hackathon project. I contributed interfaces using JavaScript, HTML, CSS, and Go-rendered templates, coordinated frontend implementation, and worked with teammates on interface requirements and feature scope for marketplace, produce management, and AI-assisted guidance workflows.",
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
    liveUrl: projectLiveUrls.agroShield || undefined,
    technologies: [
      "JavaScript",
      "HTML / CSS",
      "Go templates",
      "Go",
      "PostgreSQL",
      "Gemini",
      "pgx",
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
      "Reviewed public main branch b12b4d3 on 19 November 2026, including the README, Go manifest, routes, services, PostgreSQL repositories, frontend templates, and public branding. Benjamin's completed contribution was frontend engineering. The team's AI and payment flows use configured external providers; USSD rollout remains in progress. The supplied agroshield.com.ng landing page was verified, without asserting live financial transactions, adoption figures, or agricultural outcomes.",
  },
  {
    slug: "igede-language-si",
    name: "Igede Language SI",
    formerName: "Igede AI",
    category: "AI · NLP · Language Preservation",
    domain: "Igede language technology",
    status: "In development",
    statusNote:
      "The community data-collection and review platform supports ongoing dataset collection. Chatbot and bidirectional translation development are planned for subsequent phases.",
    headline: "Preserve • Document • Empower • Through Technology",
    description:
      "Igede Language SI is a community-driven initiative that uses artificial intelligence and technology to preserve, document, and advance Igede language technology.",
    problem:
      "Preserving Igede and developing useful language technology require structured examples, accessible ways for speakers to contribute, and a consistent process for reviewing language data. The initiative brings those needs into one community-led effort.",
    solution:
      "The project's long-term vision is to develop an English–Igede chatbot and bidirectional translation system. To achieve this, we are building a structured, community-verified Igede language dataset that can serve as a foundation for future Natural Language Processing (NLP) research and development.",
    role: "Project Lead & Data Collection Platform Co-Developer",
    contribution:
      "I lead the Igede Language SI initiative, organise team activities, delegate responsibilities, and monitor project progress. I coordinate meetings, communicate progress updates, and document project activities. I collaborated with another developer to develop the community data collection platform, contributing substantially to its conceptualisation and ideas. I currently oversee the community data collection phase; chatbot and translation components are planned for subsequent development.",
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
      "Igede Language SI's repository is private and is not publicly accessible. Its source was reviewed with owner-authorized access. Contact Benjamin to request GitHub access.",
    liveUrl: projectLiveUrls.igedeLanguageSi || undefined,
    preview: {
      kind: "language",
      name: "IGEDE LANGUAGE SI",
      languages: ["English", "Igede"],
      caption: "PROJECT PIPELINE · CHATBOT & TRANSLATION PLANNED",
      description:
        "An explanatory illustration of the community contribution, review, and dataset workflow. It represents the initiative’s direction, not a product screenshot or a completed chatbot.",
    },
    evidence:
      "Reviewed private main branch 9619ec9 with owner-authorized access on 19 November 2026, corroborating the Flask manifest and available application, PostgreSQL schema, validators, frontend, and tests. Benjamin confirmed his role as Project Lead & Data Collection Platform Co-Developer. The repository documents chatbot and translation development as future work; no dataset volume, trained model, or translation accuracy is asserted.",
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
    description: "Applying AI within practical engineering workflows.",
    detail:
      "I use AI-assisted development to explore implementations and refine code, then check changes through source review and automated tests. Agro-Shield uses configured AI providers; I led the frontend team and contributed to its interfaces. Igede Language SI builds the language-data foundation for planned chatbot and translation work. Model training and embedded AI remain areas of development.",
    tools: "AI-assisted development · Python · AI integration",
    status: "Developing",
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
