import { ArrowUpRight, Award, GraduationCap, Mail } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Section from "../components/Section";
import Experience from "../components/Experience";
import { stackGroups, contact } from "../data/projects";
import { education, certifications } from "../data/experience";

export default function About() {
  const fillers = (4 - (stackGroups.length % 4)) % 4;

  return (
    <>
      <PageHeader
        eyebrow={<span>About · New Delhi &amp; Vellore, India</span>}
        title={
          <>
            Software engineer, <span className="text-accent-ink">systems</span> &amp;{" "}
            <span className="text-accent-ink">security</span> enthusiast.
          </>
        }
      >
        <p className="text-lg leading-relaxed text-ink-strong">
          I build client software that sits close to the operating system — focusing on native
          Android applications with Kotlin and Jetpack Compose, desktop systems in C# and WPF,
          and automation tooling in Python.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          My work is guided by Clean Architecture, offline-first reliability, and careful
          security modeling. Whether designing zero-knowledge password clients, deterministic
          transaction parsers, or enterprise workflow tools, I prioritize clean domain boundaries,
          deliberate interfaces, and code that remains straightforward to maintain.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={contact.resume} target="_blank" rel="noreferrer" className="btn btn-solid">
            View Full Résumé
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <a href={`mailto:${contact.email}`} className="btn btn-outline">
            <Mail size={14} aria-hidden="true" />
            Get in touch
          </a>
        </div>
      </PageHeader>

      <Section id="experience" index="01" label="Experience" aside="Internships &amp; Roles">
        <Experience />
      </Section>

      <Section id="education" index="02" label="Education" aside="Academic Foundation">
        <div className="grid lg:grid-cols-[1.3fr_1fr]">
          {/* Education Details */}
          <div className="border-b border-line p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center border border-line-strong text-accent-ink">
                <GraduationCap size={18} aria-hidden="true" />
              </span>
              <div>
                <p className="hud-label text-faint">Degree &amp; Institution</p>
                <h3 className="font-display text-2xl tracking-[-0.02em] text-ink-strong">
                  {education[0].institution}
                </h3>
              </div>
            </div>

            <div className="mt-6 border-t border-line pt-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="font-display text-lg text-ink-strong">{education[0].degree}</h4>
                <span className="hud-label text-faint">{education[0].dates}</span>
              </div>
              <p className="mt-1 text-sm font-medium text-accent-ink">{education[0].field}</p>
              <p className="hud-label mt-1 text-[11px] text-faint">{education[0].location}</p>

              <ul className="mt-5 space-y-3">
                {education[0].highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-[0.6em] h-px w-3 shrink-0 bg-accent-ink" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Certifications */}
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center border border-line-strong text-accent-ink">
                <Award size={18} aria-hidden="true" />
              </span>
              <div>
                <p className="hud-label text-faint">Certifications</p>
                <h3 className="font-display text-2xl tracking-[-0.02em] text-ink-strong">
                  Oracle Cloud (OCI)
                </h3>
              </div>
            </div>

            <ul className="mt-6 space-y-3 border-t border-line pt-6">
              {certifications.map((cert) => (
                <li
                  key={cert.title}
                  className="flex items-start justify-between gap-4 border border-line bg-bg-raised p-4"
                >
                  <div>
                    <p className="font-display text-sm text-ink-strong">{cert.title}</p>
                    <p className="hud-label mt-1 text-[10px] text-faint">{cert.issuer}</p>
                  </div>
                  <span className="hud-label border border-line px-1.5 py-0.5 text-accent-ink">
                    {cert.year}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="stack" index="03" label="Stack" aside={`${stackGroups.length} Domains`}>
        <div className="border-b border-line px-6 py-12 sm:px-8 sm:py-16">
          <h2 className="font-display text-3xl leading-[1.02] tracking-[-0.035em] text-ink-strong sm:text-4xl">
            Technical Competencies
          </h2>
          <p className="mt-3 max-w-xl text-muted">
            Core programming languages, client SDKs, and engineering methodologies.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-px bg-line lg:grid-cols-3">
          {stackGroups.map((group, i) => (
            <div key={group.label} className="bg-bg p-6 sm:p-8">
              <div className="flex items-center justify-between gap-2">
                <h3 className="hud-label text-accent-ink">{group.label}</h3>
                <span className="hud-label text-faint">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <ul className="mt-5 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {Array.from({ length: fillers }, (_, i) => (
            <div key={i} aria-hidden="true" className="grid-paper bg-bg-sunken max-lg:hidden" />
          ))}
        </div>
      </Section>
    </>
  );
}
