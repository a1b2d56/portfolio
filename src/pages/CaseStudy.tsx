import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  Cpu,
  Layers,
  ShieldCheck,
  Terminal,
  Workflow,
} from "lucide-react";
import { projects } from "../data/projects";
import { caseStudies } from "../data/caseStudies";
import CleanArchDiagram from "../components/CleanArchDiagram";
import ProtocolDiagram from "../components/ProtocolDiagram";
import PageHeader from "../components/PageHeader";
import ProjectTile from "../components/ProjectTile";
import Section from "../components/Section";
import TransitionLink from "../components/TransitionLink";
import { GithubMark } from "../components/Logo";
import { useGithubRepo, formatRelativeDate } from "../hooks/useGithubRepo";

const proseClass = "max-w-3xl text-base leading-relaxed text-ink/90 sm:text-lg";

function CodeBlock({
  filename,
  language,
  caption,
  code,
}: {
  filename: string;
  language: string;
  caption: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-8 border border-line bg-bg-sunken">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-bg-raised px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-accent-ink" />
          <span className="font-mono text-xs font-bold text-ink-strong">{filename}</span>
          <span className="hud-label text-[10px] text-faint">({language})</span>
        </div>
        <button
          type="button"
          onClick={copyCode}
          className="hud-label flex items-center gap-1.5 border border-line px-2 py-1 text-muted transition-colors hover:bg-bg hover:text-ink-strong"
          aria-label="Copy snippet"
        >
          {copied ? (
            <>
              <Check size={12} className="text-accent-ink" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <p className="hud-label border-b border-line/60 bg-bg/50 px-4 py-1.5 text-[10px] text-faint">
        {caption}
      </p>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-ink sm:p-6 sm:text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  const study = slug ? caseStudies[slug] : undefined;
  const repoData = useGithubRepo(project?.href ?? "");

  // Available case study slugs for prev/next navigation
  const caseStudyList = projects.filter((p) => p.caseStudy);
  const currentCsIndex = caseStudyList.findIndex((p) => p.slug === slug);
  const prevStudy = currentCsIndex > 0 ? caseStudyList[currentCsIndex - 1] : null;
  const nextStudy =
    currentCsIndex >= 0 && currentCsIndex < caseStudyList.length - 1
      ? caseStudyList[currentCsIndex + 1]
      : null;

  if (!project || !study) {
    return <Navigate to="/work" replace />;
  }

  return (
    <article>
      <PageHeader
        eyebrow={
          <>
            <span
              className="px-1.5 py-0.5 font-bold text-[#0b0b0c]"
              style={{ background: project.color }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-muted">{project.category}</span>
            {project.status && <span>· {project.status}</span>}
            {repoData && repoData.stars > 0 && (
              <span>
                · {repoData.stars} {repoData.stars === 1 ? "star" : "stars"}
              </span>
            )}
            {repoData?.pushedAt && <span>· updated {formatRelativeDate(repoData.pushedAt)}</span>}
          </>
        }
        title={
          <span className="flex flex-wrap items-center gap-x-5 gap-y-4">
            <ProjectTile project={project} size={64} />
            {project.name}
          </span>
        }
      >
        <p className="text-xl font-medium text-ink-strong">{project.oneLiner}</p>
        <p className="mt-4 text-base leading-relaxed text-muted">{project.description}</p>

        {/* System Specifications Matrix */}
        <div className="mt-8 border border-line">
          <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
            <div className="bg-bg p-4">
              <p className="hud-label text-faint">Engineering Role</p>
              <p className="mt-1 font-display text-sm text-ink-strong">{study.role}</p>
            </div>
            <div className="bg-bg p-4">
              <p className="hud-label text-faint">Timeline / Status</p>
              <p className="mt-1 font-display text-sm text-ink-strong">{study.timeline}</p>
            </div>
            <div className="bg-bg p-4">
              <p className="hud-label text-faint">Domain &amp; Platform</p>
              <p className="mt-1 font-display text-sm text-ink-strong">{project.category}</p>
            </div>
            <div className="bg-bg p-4">
              <p className="hud-label text-faint">Repository</p>
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center gap-1 font-display text-sm text-accent-ink hover:underline"
              >
                GitHub Source <ArrowUpRight size={12} />
              </a>
            </div>
          </div>

          {(project.architecture || project.concurrency || project.securityModel) && (
            <div className="grid grid-cols-1 gap-px border-t border-line bg-line sm:grid-cols-3">
              {project.architecture && (
                <div className="bg-bg p-4">
                  <p className="hud-label text-faint">Architecture Pattern</p>
                  <p className="mt-1 font-mono text-xs text-ink-strong">{project.architecture}</p>
                </div>
              )}
              {project.concurrency && (
                <div className="bg-bg p-4">
                  <p className="hud-label text-faint">Concurrency Model</p>
                  <p className="mt-1 font-mono text-xs text-ink-strong">{project.concurrency}</p>
                </div>
              )}
              {project.securityModel && (
                <div className="bg-bg p-4">
                  <p className="hud-label text-faint">Security / Integrity</p>
                  <p className="mt-1 font-mono text-xs text-ink-strong">{project.securityModel}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>
      </PageHeader>

      <Section id="overview" index="01" label="Overview" aside="Executive Summary">
        <div className="px-6 py-14 sm:px-8 sm:py-20">
          <h2 className="font-display text-2xl tracking-[-0.02em] text-ink-strong sm:text-3xl">
            Executive Summary
          </h2>
          <p className={`${proseClass} mt-6`}>{study.overview}</p>
        </div>
      </Section>

      <Section id="challenge" index="02" label="Challenge" aside="Technical Problem Statement">
        <div className="px-6 py-14 sm:px-8 sm:py-20">
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center border border-line-strong text-accent-ink">
              <ShieldCheck size={16} aria-hidden="true" />
            </span>
            <h2 className="font-display text-2xl tracking-[-0.02em] text-ink-strong sm:text-3xl">
              The Engineering Challenge
            </h2>
          </div>
          <p className={`${proseClass} mt-6`}>{study.challenge}</p>
        </div>
      </Section>

      <Section id="architecture" index="03" label="Architecture" aside="System Blueprint">
        <div className="px-6 py-14 sm:px-8 sm:py-20">
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center border border-line-strong text-accent-ink">
              <Layers size={16} aria-hidden="true" />
            </span>
            <h2 className="font-display text-2xl tracking-[-0.02em] text-ink-strong sm:text-3xl">
              System Architecture &amp; Boundaries
            </h2>
          </div>
          <p className={`${proseClass} mt-6`}>{study.architecture}</p>
          <div className="max-w-3xl">
            {study.diagram === "clean-arch" && <CleanArchDiagram />}
            {study.diagram === "protocol" && <ProtocolDiagram />}
          </div>
        </div>
      </Section>

      <Section id="implementation" index="04" label="Implementation" aside="Mechanisms &amp; Source">
        <div className="border-b border-line px-6 py-12 sm:px-8 sm:py-16">
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center border border-line-strong text-accent-ink">
              <Cpu size={16} aria-hidden="true" />
            </span>
            <h2 className="font-display text-2xl tracking-[-0.02em] text-ink-strong sm:text-3xl">
              Implementation Details &amp; Low-Level Pipelines
            </h2>
          </div>
          <p className="mt-4 max-w-2xl text-muted">
            Cryptographic primitives, in-memory constraints, and concurrency structures engineered into
            the codebase.
          </p>
        </div>

        {study.implementation && study.implementation.length > 0 && (
          <div className="grid gap-px bg-line md:grid-cols-2">
            {study.implementation.map((item, i) => (
              <div key={item.title} className="bg-bg p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="hud-label text-accent-ink">Module {String(i + 1).padStart(2, "0")}</span>
                  <span className="hud-label text-faint">Specification</span>
                </div>
                <h3 className="mt-4 font-display text-lg tracking-[-0.01em] text-ink-strong">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        )}

        {/* Code Snippet Box */}
        {study.codeSnippet && (
          <div className="border-t border-line px-6 py-12 sm:px-8 sm:py-16">
            <div className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center border border-line-strong text-accent-ink">
                <Code2 size={16} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-xl tracking-[-0.01em] text-ink-strong sm:text-2xl">
                  Architectural Implementation
                </h3>
                <p className="text-xs text-muted">Direct view of core contract implementation</p>
              </div>
            </div>

            <div className="max-w-3xl">
              <CodeBlock
                filename={study.codeSnippet.filename}
                language={study.codeSnippet.language}
                caption={study.codeSnippet.caption}
                code={study.codeSnippet.code}
              />
            </div>
          </div>
        )}
      </Section>

      {study.keyDecisions && study.keyDecisions.length > 0 && (
        <Section id="decisions" index="05" label="Trade-offs" aside="Engineering Decisions">
          <div className="border-b border-line px-6 py-12 sm:px-8 sm:py-16">
            <div className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center border border-line-strong text-accent-ink">
                <Workflow size={16} aria-hidden="true" />
              </span>
              <h2 className="font-display text-2xl tracking-[-0.02em] text-ink-strong sm:text-3xl">
                Key Technical Decisions &amp; Trade-offs
              </h2>
            </div>
            <p className="mt-4 max-w-2xl text-muted">
              Deliberate architectural choices made to balance performance, security, and runtime constraints.
            </p>
          </div>
          <div className="grid gap-px bg-line md:grid-cols-2">
            {study.keyDecisions.map((d, i) => (
              <div key={d.decision} className="bg-bg p-6 sm:p-8">
                <span className="hud-label text-faint">Decision {String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-lg tracking-[-0.01em] text-ink-strong">
                  {d.decision}
                </h3>
                <div className="mt-5 space-y-4">
                  <div className="border-l-2 border-accent pl-3">
                    <p className="hud-label text-[10px] text-accent-ink">Rationale</p>
                    <p className="mt-1 text-sm text-ink/90">{d.rationale}</p>
                  </div>
                  <div className="border-l-2 border-line-strong pl-3">
                    <p className="hud-label text-[10px] text-faint">Trade-off</p>
                    <p className="mt-1 text-sm text-muted">{d.tradeoff}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {study.outcomes && study.outcomes.length > 0 && (
        <Section id="outcomes" index="06" label="Results" aside="Verification &amp; Metrics">
          <div className="px-6 py-14 sm:px-8 sm:py-20">
            <div className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center border border-line-strong text-accent-ink">
                <CheckCircle2 size={16} aria-hidden="true" />
              </span>
              <h2 className="font-display text-2xl tracking-[-0.02em] text-ink-strong sm:text-3xl">
                Measurable Outcomes &amp; Verification
              </h2>
            </div>
            <ul className="mt-8 max-w-3xl space-y-4">
              {study.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-4 border border-line bg-bg p-5">
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-ink">
                    <CheckCircle2 size={14} />
                  </span>
                  <span className="text-base text-ink-strong">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* Prev / Next Navigation Footer */}
      <div className="border-t border-line">
        <div className="frame grid sm:grid-cols-2">
          {prevStudy ? (
            <TransitionLink
              to={`/work/${prevStudy.slug}`}
              className="group flex flex-col justify-between border-b border-line p-6 transition-colors hover:bg-bg-raised sm:border-b-0 sm:border-r sm:p-8"
            >
              <span className="hud-label flex items-center gap-1.5 text-faint group-hover:text-ink">
                <ArrowLeft size={12} />
                Previous Case Study
              </span>
              <span className="mt-3 font-display text-xl text-ink-strong group-hover:text-accent-ink">
                {prevStudy.name}
              </span>
              <span className="mt-1 text-xs text-muted">{prevStudy.category}</span>
            </TransitionLink>
          ) : (
            <div className="border-b border-line p-6 opacity-30 sm:border-b-0 sm:border-r sm:p-8">
              <span className="hud-label text-faint">Start of Case Studies</span>
            </div>
          )}

          {nextStudy ? (
            <TransitionLink
              to={`/work/${nextStudy.slug}`}
              className="group flex flex-col justify-between p-6 text-right transition-colors hover:bg-bg-raised sm:p-8"
            >
              <span className="hud-label flex items-center justify-end gap-1.5 text-faint group-hover:text-ink">
                Next Case Study
                <ArrowRight size={12} />
              </span>
              <span className="mt-3 font-display text-xl text-ink-strong group-hover:text-accent-ink">
                {nextStudy.name}
              </span>
              <span className="mt-1 text-xs text-muted">{nextStudy.category}</span>
            </TransitionLink>
          ) : (
            <div className="p-6 text-right opacity-30 sm:p-8">
              <span className="hud-label text-faint">End of Case Studies</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Bar */}
      <div className="border-t border-line bg-bg-sunken">
        <div className="frame flex flex-wrap items-center justify-between gap-4 px-6 py-8 sm:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <a href={project.href} target="_blank" rel="noreferrer" className="btn btn-solid">
              <GithubMark size={14} />
              View Source on GitHub
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <TransitionLink to="/work" className="btn btn-outline">
              <ArrowLeft size={14} aria-hidden="true" />
              All Projects Directory
            </TransitionLink>
          </div>
          <p className="hud-label text-faint">
            Project {String(index + 1).padStart(2, "0")} of {projects.length}
          </p>
        </div>
      </div>
    </article>
  );
}
