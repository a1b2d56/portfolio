import { experience } from "../data/experience";

export default function Experience() {
  return (
    <div>
      {experience.map((company) => (
        <div key={company.company}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line px-6 py-8 sm:px-8">
            <div>
              <h3 className="font-display text-2xl tracking-[-0.02em] text-ink-strong sm:text-3xl">
                {company.company}
              </h3>
              {company.description && (
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                  {company.description}
                </p>
              )}
            </div>
            <p className="hud-label text-faint">
              {company.location} · {company.dates}
            </p>
          </div>

          <ol className="grid gap-px bg-line md:grid-cols-2">
            {company.roles.map((role, i) => (
              <li key={role.title} className="bg-bg p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="hud-label border border-line-strong px-1.5 py-0.5 text-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="hud-label text-faint">{role.dates}</span>
                </div>
                <h4 className="mt-6 font-display text-lg leading-snug text-ink-strong">
                  {role.title}
                </h4>

                {role.stack && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {role.stack.map((tech) => (
                      <span key={tech} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <ul className="mt-5 space-y-3">
                  {role.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-[0.6em] h-px w-3 shrink-0 bg-accent-ink" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
