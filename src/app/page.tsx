import Link from "next/link";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Code2,
  HeartPulse,
  Network,
  Github,
  Linkedin,
  Facebook,
  Leaf,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SystemVisual } from "@/components/system-visual";
import { ExpertiseGrid } from "@/components/expertise";
import { ProjectPreview } from "@/components/project-preview";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { identity, projects } from "@/lib/content";
import { EmailContact } from "@/components/email-contact";

const journey = [
  {
    title: "Healthcare background",
    description:
      "A nursing background brings a practical perspective to engineering.",
    icon: HeartPulse,
  },
  {
    title: "HMSI-API foundation",
    description:
      "Referral workflows, facility-scoped access, and audit history.",
    icon: Network,
  },
  {
    title: "Agro-Shield · 2026",
    description: "A team project for the Idoma Centenary Plus Hackathon.",
    icon: Leaf,
  },
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: identity.name,
    jobTitle: identity.title,
    sameAs: [identity.github, identity.linkedin, identity.facebook],
    knowsAbout: [
      "Software Engineering",
      "Healthcare Technology",
      "Backend APIs",
    ],
  };
  return (
    <>
      <Header home />
      <main tabIndex={-1} id="main-content">
        <section
          id="home"
          className="hero container"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="tiny-dot" /> ENGINEERING · AI · HEALTHCARE
            </p>
            <div className="hero-introduction">
              <Image
                src="/images/benjamin-agogo-portrait.webp"
                alt="Otete Benjamin Agogo"
                width={294}
                height={273}
                sizes="(max-width: 800px) 64px, 72px"
                loading="eager"
                className="hero-portrait"
              />
              <div className="hero-profile-copy">
                <p>
                  Hello, I’m <strong>{identity.name}</strong>.
                </p>
                <span>{identity.title}</span>
              </div>
            </div>
            <h1 id="hero-title">
              Engineering for
              <br />a more <em>connected</em>
              <br />
              world<span className="headline-dot">.</span>
            </h1>
            <p className="hero-description">
              I’m an {identity.title} building useful software and exploring
              intelligent, connected systems—with real people and real-world
              problems at the center.
            </p>
            <div className="hero-actions">
              <a href="#projects" className={buttonVariants()}>
                Explore My Projects <ArrowUpRight aria-hidden="true" />
              </a>
              <a href="#contact" className="text-cta">
                Contact Me <ArrowRight aria-hidden="true" size={17} />
              </a>
            </div>
            <div className="hero-footnote">
              <span className="footnote-line" />
              <span>
                Thoughtful engineering.
                <br />
                <strong>Meaningful possibilities.</strong>
              </span>
            </div>
          </div>
          <SystemVisual />
          <div className="hero-bottom">
            <a href="#about">
              <ArrowDown aria-hidden="true" size={15} /> A LITTLE MORE ABOUT ME
            </a>
            <span>SOFTWARE. INTELLIGENCE. HUMAN IMPACT.</span>
          </div>
        </section>

        <div className="identity-strip" aria-label="Engineering focus">
          <div className="container">
            <span>
              <Code2 aria-hidden="true" size={18} /> Software that serves a
              purpose
            </span>
            <span className="strip-star" aria-hidden="true">
              ✳
            </span>
            <span>
              <Network aria-hidden="true" size={18} /> Systems that connect
            </span>
            <span className="strip-star" aria-hidden="true">
              ✳
            </span>
            <span>
              <HeartPulse aria-hidden="true" size={18} /> Technology with people
              in mind
            </span>
          </div>
        </div>

        <section
          id="about"
          className="section container about-section"
          aria-labelledby="about-title"
        >
          <Reveal>
            <div className="section-label">
              <span>01 / ABOUT</span>
              <span>THE PERSON BEHIND THE SYSTEMS</span>
            </div>
            <div className="about-layout">
              <div className="about-heading">
                <h2 id="about-title">
                  An engineering mindset.
                  <br />A <em>human perspective.</em>
                </h2>
              </div>
              <div className="about-copy">
                <p className="about-lead">
                  I build full-stack applications and backend APIs with people
                  in mind.
                </p>
                <p>
                  My nursing and healthcare background shapes how I approach
                  access, information, and continuity of care. I bring that
                  perspective to software for healthcare and other practical
                  domains. My fellowship programme is preparing me for AI-native
                  engineering.
                </p>
                <a href="#projects" className="inline-link">
                  See that perspective in my projects{" "}
                  <ArrowUpRight aria-hidden="true" size={16} />
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        <section
          id="projects"
          className="section container projects-section"
          aria-labelledby="projects-title"
        >
          <Reveal>
            <div className="section-label">
              <span>02 / SELECTED PROJECTS</span>
              <span>IDEAS BECOMING USEFUL SYSTEMS</span>
            </div>
            <div className="section-heading">
              <h2 id="projects-title">
                Built around <em>real needs.</em>
              </h2>
              <p>
                Healthcare, agriculture, and language preservation.
                <br />
                Practical problems. Thoughtful engineering.
              </p>
            </div>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <article className="project-card" key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}/`}
                    className="project-preview-link"
                    aria-label={`Explore the ${project.name} case study`}
                  >
                    <ProjectPreview preview={project.preview} />
                    <span className="preview-link-arrow">
                      <ArrowUpRight aria-hidden="true" size={22} />
                    </span>
                  </Link>
                  <div className="project-copy">
                    <div className="project-meta">
                      <span>
                        0{index + 1} / {project.category}
                      </span>
                      <span className="project-status">
                        <span />
                        {project.status}
                      </span>
                    </div>
                    <div className="project-title">
                      <h3>
                        <Link href={`/projects/${project.slug}/`}>
                          {project.name}
                        </Link>
                      </h3>
                      <Link
                        href={`/projects/${project.slug}/`}
                        aria-label={`Read about ${project.name}`}
                      >
                        <ArrowUpRight aria-hidden="true" size={25} />
                      </Link>
                    </div>
                    <p className="project-description">{project.description}</p>
                    {project.role && (
                      <p className="project-role">My role: {project.role}</p>
                    )}
                    <ul
                      className="project-technologies"
                      aria-label={`${project.name} technologies`}
                    >
                      {project.technologies.slice(0, 4).map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                    <div className="project-links">
                      <Link
                        href={`/projects/${project.slug}/`}
                        className="inline-link"
                      >
                        Explore the project{" "}
                        <ArrowRight aria-hidden="true" size={15} />
                      </Link>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live application{" "}
                          <ArrowUpRight aria-hidden="true" size={13} />
                        </a>
                      )}
                      {!project.liveUrl && (
                        <span className="link-placeholder">
                          Live demo coming soon
                        </span>
                      )}
                      {project.repository ? (
                        <a
                          href={project.repository}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github aria-hidden="true" size={14} /> Source code{" "}
                          <ArrowUpRight aria-hidden="true" size={13} />
                        </a>
                      ) : project.repositoryRequestLabel ? (
                        <Link href="#contact" className="inline-link">
                          <Github aria-hidden="true" size={14} />
                          {project.repositoryRequestLabel}
                          <ArrowUpRight aria-hidden="true" size={13} />
                        </Link>
                      ) : (
                        <span className="access-note">
                          Repository access on request
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <a
              href={identity.github}
              className="more-projects"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <Github aria-hidden="true" size={19} /> More experiments, ideas,
                and work in progress.
              </span>
              <strong>
                Explore my GitHub <ArrowUpRight aria-hidden="true" size={16} />
              </strong>
            </a>
          </Reveal>
        </section>

        <section
          id="expertise"
          className="expertise-section"
          aria-labelledby="expertise-title"
        >
          <div className="container section">
            <Reveal>
              <div className="section-label">
                <span>03 / EXPERTISE & INTERESTS</span>
                <span>A CONNECTED SET OF DISCIPLINES</span>
              </div>
              <div className="section-heading">
                <h2 id="expertise-title">
                  Different disciplines.
                  <br />
                  <em>One problem-solving mindset.</em>
                </h2>
                <p>
                  The areas I’m building in and growing toward.
                  <br />
                  Select a discipline to see the details.
                </p>
              </div>
              <ExpertiseGrid />
            </Reveal>
          </div>
        </section>

        <section
          id="journey"
          className="journey-section"
          aria-labelledby="journey-title"
        >
          <div className="container section">
            <Reveal>
              <div className="section-label">
                <span>04 / ENGINEERING JOURNEY</span>
                <span>LEARNING THROUGH PRACTICAL WORK</span>
              </div>
              <div className="journey-heading">
                <h2 id="journey-title">
                  From healthcare
                  <br />
                  to <em>useful software.</em>
                </h2>
                <p>
                  My fellowship programme is preparing me for AI-native
                  engineering, alongside the practical work shown here.
                </p>
              </div>
              <ol className="journey-path">
                {journey.map(({ title, description, icon: Icon }, index) => (
                  <li key={title}>
                    <div className="journey-point">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <Icon aria-hidden="true" size={18} />
                    </div>
                    <div className="journey-entry">
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        <section
          id="contact"
          className="section container contact-section"
          aria-labelledby="contact-title"
        >
          <Reveal>
            <div className="section-label">
              <span>05 / LET’S CONNECT</span>
              <span>GOOD WORK STARTS WITH A CONVERSATION</span>
            </div>
            <div className="contact-layout">
              <div>
                <p className="eyebrow">HAVE A PROBLEM WORTH SOLVING?</p>
                <h2 id="contact-title">
                  Let’s build
                  <br />
                  something <em>meaningful.</em>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="contact-heading-arrow"
                  />
                </h2>
                <p className="contact-description">
                  Engineering opportunities, thoughtful collaborations, or an
                  interesting exchange of ideas. I’d be glad to connect.
                </p>
                <EmailContact />
              </div>
              <div className="contact-links">
                {[
                  {
                    name: "GitHub",
                    description: "The code, the experiments, the process.",
                    href: identity.github,
                    icon: Github,
                  },
                  {
                    name: "LinkedIn",
                    description: "Professional connections and conversations.",
                    href: identity.linkedin,
                    icon: Linkedin,
                  },
                  {
                    name: "Facebook",
                    description: "Another place to stay connected.",
                    href: identity.facebook,
                    icon: Facebook,
                  },
                ].map(({ name, description, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon aria-hidden="true" size={22} strokeWidth={1.5} />
                    <span>
                      <strong>{name}</strong>
                      <small>{description}</small>
                    </span>
                    <ArrowUpRight aria-hidden="true" size={19} />
                  </a>
                ))}
                <p>You can also connect with me on these platforms.</p>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer home />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
