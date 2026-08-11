import { projects } from "../data/projects";
import SectionReveal from "../components/SectionReveal";
import HeroBackground from "../components/HeroBackground";
import Magnetic from "../components/Magnetic";
import TransitionLink from "../components/TransitionLink";

const featured = projects.filter((p) => p.caseStudy);

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-20 pb-16 sm:px-8 sm:pt-28 sm:pb-24">
          <p className="animate-reveal font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint">
            // Developer — New Delhi, India
          </p>
          <h1 className="animate-reveal mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.08] text-balance sm:text-6xl [animation-delay:90ms]">
            Native software that's{" "}
            <span className="text-accent">secure by default</span>, and clear
            enough to maintain.
          </h1>
          <p className="animate-reveal mt-8 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg [animation-delay:200ms]">
            Computer science student building across Android, Windows, and
            the command line — Kotlin and Jetpack Compose, C# and WPF,
            Python. Clean Architecture underneath all of it, with equal
            attention paid to interface design.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
        <SectionReveal>
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint">
              // Selected work
            </p>
            <TransitionLink
              to="/work"
              className="font-mono text-[11px] text-text-muted hover:text-accent transition-colors"
            >
              All {projects.length} projects →
            </TransitionLink>
          </div>
        </SectionReveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {featured.map((project, i) => (
            <SectionReveal key={project.slug} delay={i * 80}>
              <TransitionLink
                to={`/work/${project.slug}`}
                className="group block h-full rounded-sm border border-border-soft p-6 transition-colors duration-300 hover:border-accent/40 hover:bg-surface/40 sm:p-8"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-dim transition-colors duration-300 group-hover:text-accent">
                  {project.category}
                </span>
                <h3 className="mt-3 font-display text-2xl font-medium text-text sm:text-3xl">
                  {project.name}
                </h3>
                <p className="mt-2 text-sm text-text-muted">{project.oneLiner}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] text-text-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">
                  Read the case study →
                </span>
              </TransitionLink>
            </SectionReveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border-soft">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
          <SectionReveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint">
              // About
            </p>
            <h2 className="mt-4 max-w-lg font-display text-2xl font-semibold text-balance sm:text-3xl">
              Kotlin, C#, and Python — Clean Architecture as the constant.
            </h2>
            <Magnetic
              as={TransitionLink}
              to="/about"
              strength={8}
              className="mt-5 inline-flex items-center gap-2 font-mono text-sm text-text-muted hover:text-accent transition-colors"
            >
              More about the stack and background →
            </Magnetic>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
