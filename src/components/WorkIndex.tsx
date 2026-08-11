import { projects } from "../data/projects";
import SectionReveal from "./SectionReveal";
import CountUp from "./CountUp";
import TransitionLink from "./TransitionLink";
import { useGithubRepo } from "../hooks/useGithubRepo";

function LiveStars({ href }: { href: string }) {
  const data = useGithubRepo(href);
  if (!data || data.stars < 1) return null;
  return (
    <span className="font-mono text-[10px] text-accent tabular-nums">
      <CountUp end={data.stars} suffix=" stars" />
    </span>
  );
}

export default function WorkIndex({ standalone = false }: { standalone?: boolean }) {
  return (
    <section
      id="work"
      className={`mx-auto max-w-5xl px-6 sm:px-8 ${standalone ? "pt-16 pb-24 sm:pt-24" : "py-24"}`}
    >
      <SectionReveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint">
          // Work — {projects.length} projects
        </p>
        <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold text-balance sm:text-4xl">
          Original builds only. No forks.
        </h2>
      </SectionReveal>

      <div className="mt-14 border-t border-border-soft">
        {projects.map((project, i) => {
          const isInternal = Boolean(project.caseStudy);
          const RowInner = (
            <>
              <div className="flex flex-col gap-1 sm:w-[15%] sm:shrink-0">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-dim transition-colors duration-300 group-hover:text-accent">
                  {project.category}
                </span>
                {project.status && (
                  <span className="font-mono text-[10px] text-text-faint">
                    {project.status}
                  </span>
                )}
              </div>

              <div className="mt-3 flex-1 sm:mt-0 sm:px-6">
                <h3 className="font-display text-xl font-medium text-text sm:text-2xl">
                  {project.name}
                </h3>
                <p className="mt-1.5 max-w-lg text-sm text-text-muted">
                  {project.oneLiner}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-start gap-x-2 gap-y-1.5 sm:mt-0 sm:w-[26%] sm:shrink-0 sm:justify-end">
                {project.stack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-sm border border-border px-2 py-0.5 font-mono text-[10px] text-text-muted transition-colors duration-300 group-hover:border-accent/40 group-hover:text-text"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-3 sm:mt-0 sm:ml-6 sm:w-[8%] sm:shrink-0 sm:justify-end">
                <LiveStars href={project.href} />
                <span className="font-mono text-sm text-text-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">
                  {isInternal ? "→" : "↗"}
                </span>
              </div>
            </>
          );

          const rowClass =
            "group flex flex-col border-b border-border-soft py-6 transition-[border-color,background-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-l-2 hover:border-l-accent hover:bg-surface/40 hover:translate-x-0.5 sm:flex-row sm:items-center sm:py-7 sm:pl-4 sm:-ml-4";

          return (
            <SectionReveal key={project.slug} delay={i * 40}>
              {isInternal ? (
                <TransitionLink to={`/work/${project.slug}`} className={rowClass}>
                  {RowInner}
                </TransitionLink>
              ) : (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className={rowClass}
                >
                  {RowInner}
                </a>
              )}
            </SectionReveal>
          );
        })}
      </div>
    </section>
  );
}
