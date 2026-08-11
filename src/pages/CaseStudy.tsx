import { Navigate, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import { caseStudies } from "../data/caseStudies";
import SectionReveal from "../components/SectionReveal";
import CleanArchDiagram from "../components/CleanArchDiagram";
import Magnetic from "../components/Magnetic";
import ScrollProgress from "../components/ScrollProgress";
import TransitionLink from "../components/TransitionLink";
import { useGithubRepo, formatRelativeDate } from "../hooks/useGithubRepo";

export default function CaseStudy() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const study = slug ? caseStudies[slug] : undefined;
  const repoData = useGithubRepo(project?.href ?? "");

  if (!project || !study) {
    return <Navigate to="/" replace />;
  }

  return (
    <article className="mx-auto max-w-3xl px-6 pt-16 pb-28 sm:px-8 sm:pt-24">
      <ScrollProgress />
      <SectionReveal>
        <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">
          <span className="text-accent-dim">{project.category}</span>
          {project.status && <span>· {project.status}</span>}
          {repoData && repoData.stars > 0 && (
            <span className="text-accent">· {repoData.stars} stars</span>
          )}
          {repoData?.pushedAt && (
            <span className="normal-case tracking-normal">
              · updated {formatRelativeDate(repoData.pushedAt)}
            </span>
          )}
        </div>

        <h1 className="mt-5 font-display text-4xl font-semibold text-balance sm:text-5xl">
          {project.name}
        </h1>
        <p className="mt-4 max-w-lg text-lg text-text-muted">
          {project.oneLiner}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-sm border border-border px-2.5 py-1 font-mono text-[11px] text-text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal delay={80}>
        <div className="mt-16 border-t border-border-soft pt-10">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-dim">
            Overview
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text sm:text-lg">
            {study.overview}
          </p>
        </div>
      </SectionReveal>

      <SectionReveal delay={120}>
        <div className="mt-12">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-dim">
            Approach
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text sm:text-lg">
            {study.approach}
          </p>
          {study.showArchDiagram && <CleanArchDiagram />}
        </div>
      </SectionReveal>

      <SectionReveal delay={160}>
        <div className="mt-14 flex flex-wrap items-center gap-6 border-t border-border-soft pt-10">
          <Magnetic
            href={project.href}
            target="_blank"
            rel="noreferrer"
            strength={8}
            className="inline-flex items-center gap-2 rounded-sm border border-accent/50 bg-accent-soft px-5 py-2.5 font-mono text-sm text-accent transition-colors hover:bg-accent hover:text-bg"
          >
            View on GitHub ↗
          </Magnetic>
          <TransitionLink
            to="/work"
            className="font-mono text-sm text-text-muted hover:text-accent transition-colors"
          >
            ← Back to index
          </TransitionLink>
        </div>
      </SectionReveal>
    </article>
  );
}
