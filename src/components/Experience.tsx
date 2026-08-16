import SectionReveal from "./SectionReveal";
import { experience } from "../data/experience";

export default function Experience() {
  return (
    <div className="mt-16 border-t border-border-soft pt-14">
      <h2 className="font-display text-2xl font-semibold text-balance sm:text-3xl">
        Experience
      </h2>

      <div className="mt-10 space-y-10">
        {experience.map((company) => (
          <div key={company.company}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-lg font-medium text-text">
                {company.company}
              </h3>
              <span className="font-mono text-[11px] text-text-faint">
                {company.location} · {company.dates}
              </span>
            </div>

            <div className="mt-6 space-y-7 border-l border-border-soft pl-6">
              {company.roles.map((role, i) => (
                <SectionReveal key={role.title} delay={i * 60}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="font-mono text-sm text-accent">{role.title}</h4>
                    <span className="font-mono text-[10px] text-text-faint">
                      {role.dates}
                    </span>
                  </div>

                  {role.stack && (
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {role.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-sm border border-border px-2 py-0.5 font-mono text-[10px] text-text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <ul className="mt-3 space-y-2">
                    {role.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-text-muted">
                        <span className="mt-[3px] shrink-0 text-text-faint">—</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </SectionReveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
