import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Circle,
  Github,
} from "lucide-react";
import { projects } from "@/lib/content";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProjectPreview } from "@/components/project-preview";
import { buttonVariants } from "@/components/ui/button";
import { siteOrigin, siteUrl } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((project) => project.slug === slug);
  if (!project) notFound();
  const title = `${project.name} — Project case study`;
  const url = siteUrl(`/projects/${project.slug}/`);
  const images = siteOrigin
    ? [
        {
          url: siteUrl(`/images/${project.slug}-social.png`)!,
          width: 1200,
          height: 630,
          alt: `${project.name} — ${project.headline}`,
        },
      ]
    : [];
  return {
    title,
    description: project.description,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title: `${project.name} | Benjamin Agogo`,
      description: project.description,
      type: "article",
      url,
      siteName: "Benjamin Agogo Portfolio",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Benjamin Agogo`,
      description: project.description,
      images,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((project) => project.slug === slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === slug);
  const next = projects[(index + 1) % projects.length];
  return (
    <>
      <Header />
      <main tabIndex={-1} id="main-content">
        <article id="top" className="container case-study">
          <Link href="/#projects" className="case-back">
            <ArrowLeft aria-hidden="true" size={15} /> All selected projects
          </Link>
          <div className="case-header">
            <p className="eyebrow">{project.category.toUpperCase()}</p>
            <h1>
              {project.name}
              <span className="headline-dot">.</span>
            </h1>
            {project.formerName && (
              <p className="case-former-name">Formerly {project.formerName}</p>
            )}
            <p className="case-headline">{project.headline}</p>
            <p>{project.description}</p>
          </div>
          <div className="case-info">
            <span className="project-status">
              <span />
              {project.status}
            </span>
            <span>{project.domain}</span>
            {project.teamDescription && <span>Team project</span>}
            {project.role && <span>My role: {project.role}</span>}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live application <ArrowUpRight aria-hidden="true" size={13} />
              </a>
            )}
            {!project.liveUrl && (
              <span className="link-placeholder">Live demo coming soon</span>
            )}
            {project.repository ? (
              <a
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github aria-hidden="true" size={14} /> View repository{" "}
                <ArrowUpRight aria-hidden="true" size={13} />
              </a>
            ) : (
              <Link href="/#contact">
                {project.repositoryRequestLabel && (
                  <Github aria-hidden="true" size={14} />
                )}
                {project.repositoryRequestLabel || "Request repository access"}{" "}
                <ArrowUpRight aria-hidden="true" size={13} />
              </Link>
            )}
          </div>
          <ProjectPreview preview={project.preview} large />
          {project.preview.kind === "screenshot" && (
            <a
              href={project.preview.src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-link full-preview-link"
            >
              View full-size screenshot{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
          <div className="case-content">
            <div>
              <section className="case-block">
                <h2>The problem</h2>
                <p>{project.problem}</p>
              </section>
              {project.role && (
                <section className="case-block">
                  <h2>My role</h2>
                  <p className="case-role">{project.role}</p>
                  {project.contribution && <p>{project.contribution}</p>}
                </section>
              )}
              <section className="case-block">
                <h2>The engineering approach</h2>
                <p>{project.solution}</p>
              </section>
              <section className="case-block">
                <h2>Engineering decisions</h2>
                <h3>{project.engineering.title}</h3>
                <p>{project.engineering.approach}</p>
                <h3>Tradeoffs</h3>
                <p>{project.engineering.tradeoff}</p>
              </section>
              {project.teamDescription && (
                <section className="case-block">
                  <h2>A team project</h2>
                  <p>{project.teamDescription}</p>
                </section>
              )}
              {project.architecture && (
                <section className="case-block">
                  <h2>Architecture</h2>
                  <p>{project.architecture}</p>
                </section>
              )}
              <section className="case-block">
                <h2>What’s implemented</h2>
                <ul className="case-list">
                  {project.implemented.map((item) => (
                    <li key={item}>
                      <Check aria-hidden="true" size={14} />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
              {project.inProgress.length > 0 && (
                <section className="case-block">
                  <h2>In progress</h2>
                  <ul className="case-list">
                    {project.inProgress.map((item) => (
                      <li key={item}>
                        <Circle aria-hidden="true" size={10} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              <section className="case-block">
                <h2>Implementation evidence</h2>
                {project.verification.map(({ title, description }) => (
                  <div className="verification-example" key={title}>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                ))}
                {project.evidenceLinks.length > 0 && (
                  <div className="evidence-links">
                    {project.evidenceLinks.map(({ label, href }) => (
                      <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-link"
                      >
                        {label} <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                )}
              </section>
              <section className="case-block">
                <h2>Future direction</h2>
                <p>These are planned areas of development.</p>
                <ul className="case-list">
                  {project.planned.map((item) => (
                    <li key={item}>
                      <Circle aria-hidden="true" size={10} />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
            <aside className="case-sidebar">
              <h2>Project notes</h2>
              <p>Technologies verified from the repository:</p>
              <div className="case-tech-list">
                {project.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <h3>About the preview</h3>
              <p>{project.preview.description}</p>
              {project.preview.kind === "screenshot" &&
                project.preview.credit && (
                  <p className="photo-credit">
                    {project.preview.credit.description}{" "}
                    <a
                      href={project.preview.credit.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Source
                    </a>
                    {" · "}
                    <a
                      href={project.preview.credit.licenseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.preview.credit.license}
                    </a>
                    .
                  </p>
                )}
              <h3>Source review</h3>
              <p>{project.evidence}</p>
              {project.repositoryNote && (
                <>
                  <h3>Repository availability</h3>
                  <p>{project.repositoryNote}</p>
                </>
              )}
              <Link
                href="/#contact"
                className={buttonVariants({ size: "sm", variant: "outline" })}
              >
                Discuss this project <ArrowUpRight aria-hidden="true" />
              </Link>
            </aside>
          </div>
          <div className="case-next">
            <span>EXPLORE ANOTHER PROJECT</span>
            <Link href={`/projects/${next.slug}/`}>
              {next.name} <ArrowRight aria-hidden="true" size={21} />
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
