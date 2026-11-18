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
  return {
    title: project
      ? `${project.name} — Project case study`
      : "Project not found",
    description: project?.description,
    openGraph: {
      title: project?.name,
      description: project?.description,
      type: "article",
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
  const next = projects.find((item) => item.slug !== slug)!;
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
            <p className="case-headline">{project.headline}</p>
            <p>{project.description}</p>
          </div>
          <div className="case-info">
            <span className="project-status">
              <span />
              {project.status}
            </span>
            <span>Healthcare technology</span>
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
                Request repository access{" "}
                <ArrowUpRight aria-hidden="true" size={13} />
              </Link>
            )}
          </div>
          <ProjectPreview kind={project.preview} large />
          <div className="case-content">
            <div>
              <section className="case-block">
                <h2>The problem</h2>
                <p>{project.problem}</p>
              </section>
              <section className="case-block">
                <h2>The engineering approach</h2>
                <p>{project.solution}</p>
              </section>
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
              <p>
                {project.preview === "screenshot"
                  ? "A genuine capture of the current Nurse.ng public page, running locally. It shows the application’s actual interface."
                  : "An explanatory diagram of the referral exchange workflow. The clinician-facing interface is planned."}
              </p>
              {project.preview === "screenshot" && (
                <p className="photo-credit">
                  Preview photograph: Lindsay Mgbor / DFID. Adapted in the
                  application layout.{" "}
                  <a
                    href="https://commons.wikimedia.org/wiki/File:Learning_to_save_lives_(7138904925).jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source
                  </a>
                  {" · "}
                  <a
                    href="https://creativecommons.org/licenses/by-sa/2.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CC BY-SA 2.0
                  </a>
                  .
                </p>
              )}
              <h3>Implementation evidence</h3>
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
