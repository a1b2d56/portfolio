import { useState, useMemo } from "react";
import PageHeader from "../components/PageHeader";
import WorkIndex from "../components/WorkIndex";
import { projects } from "../data/projects";

type CategoryFilter = "ALL" | "SECURITY" | "MOBILE" | "WINDOWS" | "TOOLING";

export default function Work() {
  const [filter, setFilter] = useState<CategoryFilter>("ALL");
  const [onlyCaseStudies, setOnlyCaseStudies] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        filter === "ALL" ||
        (filter === "SECURITY" &&
          (p.category.includes("SECURITY") ||
            p.category.includes("BINARY") ||
            p.category.includes("CRYPTOGRAPHY"))) ||
        (filter === "MOBILE" &&
          (p.category.includes("ANDROID") ||
            p.category.includes("MULTIPLATFORM") ||
            p.category.includes("COMPOSE"))) ||
        (filter === "WINDOWS" &&
          (p.category.includes("WINDOWS") || p.category.includes("DESKTOP"))) ||
        (filter === "TOOLING" &&
          (p.category.includes("TOOLING") ||
            p.category.includes("PYTHON") ||
            p.category.includes("SYSTEMS")));

      const matchesCaseStudy = !onlyCaseStudies || p.caseStudy;
      return matchesCategory && matchesCaseStudy;
    });
  }, [filter, onlyCaseStudies]);

  const caseStudyCount = projects.filter((p) => p.caseStudy).length;
  const securityCount = projects.filter(
    (p) =>
      p.category.includes("SECURITY") ||
      p.category.includes("BINARY") ||
      p.category.includes("CRYPTOGRAPHY"),
  ).length;
  const mobileCount = projects.filter(
    (p) =>
      p.category.includes("ANDROID") ||
      p.category.includes("MULTIPLATFORM") ||
      p.category.includes("COMPOSE"),
  ).length;
  const windowsCount = projects.filter(
    (p) => p.category.includes("WINDOWS") || p.category.includes("DESKTOP"),
  ).length;
  const toolingCount = projects.filter(
    (p) =>
      p.category.includes("TOOLING") ||
      p.category.includes("PYTHON") ||
      p.category.includes("SYSTEMS"),
  ).length;

  return (
    <>
      <PageHeader
        eyebrow={<span>Work · {projects.length} Engineering Projects &amp; {caseStudyCount} Case Studies</span>}
        title={
          <>
            Engineered from first principles. <span className="text-accent-ink">Zero</span> black boxes.
          </>
        }
      >
        <p>
          Architected across security-critical clients, binary analysis engines, in-pixel steganography,
          low-level filesystem tools, and native desktop systems. Every system is built directly against
          protocol and operating system specifications.
        </p>
      </PageHeader>

      {/* Filter and Control Bar */}
      <div className="border-t border-line bg-bg-raised">
        <div className="frame flex flex-wrap items-center justify-between gap-4 px-6 py-4 sm:px-8">
          <div className="flex flex-wrap items-center gap-1">
            <button
              type="button"
              onClick={() => setFilter("ALL")}
              className={`hud-label px-3 py-1.5 transition-colors ${
                filter === "ALL"
                  ? "bg-invert-bg text-invert-fg font-bold"
                  : "text-muted hover:text-ink-strong"
              }`}
            >
              All ({projects.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("SECURITY")}
              className={`hud-label px-3 py-1.5 transition-colors ${
                filter === "SECURITY"
                  ? "bg-invert-bg text-invert-fg font-bold"
                  : "text-muted hover:text-ink-strong"
              }`}
            >
              Security &amp; Binary ({securityCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter("MOBILE")}
              className={`hud-label px-3 py-1.5 transition-colors ${
                filter === "MOBILE"
                  ? "bg-invert-bg text-invert-fg font-bold"
                  : "text-muted hover:text-ink-strong"
              }`}
            >
              Mobile &amp; Multiplatform ({mobileCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter("WINDOWS")}
              className={`hud-label px-3 py-1.5 transition-colors ${
                filter === "WINDOWS"
                  ? "bg-invert-bg text-invert-fg font-bold"
                  : "text-muted hover:text-ink-strong"
              }`}
            >
              Windows &amp; Systems ({windowsCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter("TOOLING")}
              className={`hud-label px-3 py-1.5 transition-colors ${
                filter === "TOOLING"
                  ? "bg-invert-bg text-invert-fg font-bold"
                  : "text-muted hover:text-ink-strong"
              }`}
            >
              Tooling &amp; Python ({toolingCount})
            </button>
          </div>

          <label className="flex cursor-pointer items-center gap-2 select-none">
            <input
              type="checkbox"
              checked={onlyCaseStudies}
              onChange={(e) => setOnlyCaseStudies(e.target.checked)}
              className="accent-accent"
            />
            <span className="hud-label text-muted">Case studies only ({caseStudyCount})</span>
          </label>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="frame">
          <WorkIndex items={filteredProjects} />
        </div>
      </div>
    </>
  );
}
