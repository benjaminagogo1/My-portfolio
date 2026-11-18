import { z } from "zod";

export const identity = {
  name: "Otete Benjamin Agogo",
  title: "Software Engineer",
  github: "https://github.com/benjaminagogo1",
  linkedin: "https://www.linkedin.com/in/otete-benjamin-agogo-03861b210/",
  facebook: "https://www.facebook.com/profile.php?id=61573088355413",
};

export const navigation = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Expertise", id: "expertise" },
  { label: "Projects", id: "projects" },
  { label: "Journey", id: "journey" },
  { label: "Contact", id: "contact" },
];

const projectSchema = z.object({
  slug: z.string(),
  name: z.string(),
  category: z.string(),
  status: z.string(),
  headline: z.string(),
  description: z.string(),
  problem: z.string(),
  solution: z.string(),
  technologies: z.array(z.string()),
  implemented: z.array(z.string()),
  planned: z.array(z.string()),
  repository: z.url().nullable(),
  repositoryNote: z.string().optional(),
  preview: z.enum(["screenshot", "architecture"]),
  evidence: z.string(),
});

export const projects = z.array(projectSchema).parse([
  {
    slug: "nurse-ng",
    name: "Nurse.ng",
    category: "Healthcare · Community platform",
    status: "In development",
    headline: "A stronger connection for the people who care.",
    description:
      "A healthcare technology initiative connecting nurses with their professional community, career opportunities, and one another.",
    problem:
      "Nursing professionals need a useful place to discover opportunities, share knowledge, and build professional connections. These needs are often spread across separate channels.",
    solution:
      "Build a community-centered platform for the nursing ecosystem. The current application brings discussions, professional profiles, connections, opportunities, and messaging into one member workspace.",
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
    preview: "screenshot",
    evidence:
      "Reviewed the public repository README, dependency manifest, community routes, and application templates in November 2026. Preview captured from the actual public-page template running locally with an isolated database. This is development work; no adoption or live deployment is asserted.",
  },
  {
    slug: "hmsi-api",
    name: "HMSI-API",
    category: "Healthcare · Systems interoperability",
    status: "API foundation implemented",
    headline: "Care moves forward when information can follow.",
    description:
      "A referral and clinical information exchange API addressing the gaps between healthcare facilities, with continuity of care at its core.",
    problem:
      "When patients move between facilities, relevant clinical information can become fragmented. A receiving team needs an appropriate medical summary and a clear referral history.",
    solution:
      "Start with a defined referral workflow between two facilities, carrying the minimum relevant clinical information. The implemented API coordinates referral creation, receipt, clinical decisions, returned outcomes, and closure within a facility-scoped system.",
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
    repositoryNote:
      "The supplied repository, github.com/benjaminagogo1/HMSI-API, is currently unavailable publicly. Implementation details were verified from the local repository. Contact Benjamin for repository access.",
    preview: "architecture",
    evidence:
      "Reviewed the local repository README, Python dependency manifest, referral endpoints, authentication modules, lifecycle specification, and outbox dispatcher in November 2026. The visual is an explanatory architecture diagram, not a product screenshot. Development is restricted to synthetic data; FHIR integration and independent hospital deployments are not implemented.",
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
    title: "AI & machine learning",
    icon: "brain",
    description: "Exploring intelligence with a practical purpose.",
    detail:
      "Learning how AI can be integrated into useful applications, with attention to validated outputs, responsible use, and clear limitations.",
    tools: "Python · AI integration · Responsible AI",
    status: "Exploring",
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
