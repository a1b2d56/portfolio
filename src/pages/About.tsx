import SectionReveal from "../components/SectionReveal";
import Magnetic from "../components/Magnetic";
import Experience from "../components/Experience";
import { stackGroups, affiliations, contact } from "../data/projects";

export default function About() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-16 pb-24 sm:px-8 sm:pt-24">
      <SectionReveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint">
          // About
        </p>
        <h1 className="mt-4 max-w-xl font-display text-3xl font-semibold text-balance sm:text-4xl">
          Computer science student, native-software developer.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
          Based in New Delhi. Most of what I build sits close to the
          system — Android apps in Kotlin and Jetpack Compose, desktop
          tools in C# and WPF, scripts and utilities in Python — with
          Clean Architecture as the constant underneath all three.
          Interface design gets equal weight to the architecture behind
          it: software should be as clear to use as it is to maintain.
        </p>
      </SectionReveal>

      <SectionReveal delay={80}>
        <Experience />
        <Magnetic
          href={contact.resume}
          target="_blank"
          rel="noreferrer"
          strength={8}
          className="mt-8 inline-flex items-center gap-2 rounded-sm border border-accent/50 bg-accent-soft px-5 py-2.5 font-mono text-sm text-accent transition-colors hover:bg-accent hover:text-bg"
        >
          View Full Résumé ↗
        </Magnetic>
      </SectionReveal>

      <SectionReveal delay={120}>
        <div className="mt-16 grid gap-12 border-t border-border-soft pt-14 sm:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold text-balance sm:text-3xl">
              Stack
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              Affiliated with{" "}
              {affiliations.map((a, i) => (
                <span key={a.name}>
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-text underline decoration-border underline-offset-4 hover:text-accent hover:decoration-accent transition-colors"
                  >
                    {a.name}
                  </a>
                  {i < affiliations.length - 1 ? " and " : "."}
                </span>
              ))}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3">
            {stackGroups.map((group, i) => (
              <SectionReveal key={group.label} delay={i * 60}>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-dim">
                  {group.label}
                </h3>
                <ul className="mt-2.5 space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </SectionReveal>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
