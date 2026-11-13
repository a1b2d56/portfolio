import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, type Project } from "../data/projects";
import CountUp from "./CountUp";
import ProjectTile from "./ProjectTile";
import TransitionLink from "./TransitionLink";
import { useGithubRepo } from "../hooks/useGithubRepo";

function LiveStars({ href }: { href: string }) {
  const data = useGithubRepo(href);
  if (!data || data.stars < 1) return null;
  return (
    <span className="tag tabular-nums" style={{ borderColor: "var(--line-strong)", color: "var(--ink)" }}>
      <CountUp end={data.stars} suffix={data.stars === 1 ? " star" : " stars"} />
    </span>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardClass = "group flex h-full flex-col bg-bg transition-colors duration-200 hover:bg-bg-raised";
  const Arrow = project.caseStudy ? ArrowRight : ArrowUpRight;

  const inner = (
    <>
      <div className="flex h-10 items-center justify-between border-b border-line pr-4">
        <span
          className="flex h-full w-10 items-center justify-center font-mono text-[11px] font-bold text-[#0b0b0c]"
          style={{ background: project.color }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="hud-label truncate pl-3 text-faint">{project.category}</span>
      </div>

      <div className="grid-paper relative flex aspect-[16/9] items-center justify-center overflow-hidden border-b border-line bg-bg-sunken">
        <span
          className="absolute inset-0 opacity-25 transition-opacity duration-300 group-hover:opacity-50"
          style={{ background: `radial-gradient(closest-side, ${project.color}, transparent)` }}
        />
        <ProjectTile
          project={project}
          size={64}
          className="relative transition-transform duration-300 ease-out group-hover:scale-110"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-2xl leading-none tracking-[-0.02em] text-ink-strong">
            {project.name}
          </h3>
          {project.caseStudy && (
            <span className="hud-label shrink-0 text-accent-ink">Case Study</span>
          )}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.oneLiner}</p>

        {project.architecture && (
          <p className="mt-2 text-[11px] font-mono text-faint line-clamp-1">
            {project.architecture}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.status && (
            <span className="tag" style={{ borderColor: project.color, color: project.color }}>
              {project.status}
            </span>
          )}
          <LiveStars href={project.href} />
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>

        <span className="hud-label mt-auto flex items-center gap-1.5 pt-8 text-muted transition-colors group-hover:text-ink-strong">
          {project.caseStudy ? "Read case study" : "View source on GitHub"}
          <Arrow
            size={13}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </>
  );

  return project.caseStudy ? (
    <TransitionLink to={`/work/${project.slug}`} className={cardClass}>
      {inner}
    </TransitionLink>
  ) : (
    <a href={project.href} target="_blank" rel="noreferrer" className={cardClass}>
      {inner}
    </a>
  );
}

/** The full project lineup as a hairline-divided card grid, with optional item list filter. */
export default function WorkIndex({ items }: { items?: Project[] }) {
  const displayProjects = items ?? projects;

  if (displayProjects.length === 0) {
    return (
      <div className="p-12 text-center">
        <p className="hud-label text-faint">No projects match the selected filter.</p>
      </div>
    );
  }

  return (
    <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
      {displayProjects.map((project, i) => (
        <li key={project.slug}>
          <ProjectCard project={project} index={i} />
        </li>
      ))}
    </ul>
  );
}
