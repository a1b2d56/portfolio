import SectionReveal from "./SectionReveal";

const layers = [
  {
    label: "Presentation",
    detail: "Compose UI, screen state",
  },
  {
    label: "Domain",
    detail: "Use cases, business rules",
    core: true,
  },
  {
    label: "Data",
    detail: "Repositories, local & remote sources",
  },
];

export default function CleanArchDiagram() {
  return (
    <div className="my-10 rounded-sm border border-border bg-surface/60 p-6 sm:p-8">
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint">
        Dependency direction — outer layers depend on inner layers, never the reverse
      </p>
      <div className="flex flex-col gap-px">
        {layers.map((layer, i) => (
          <SectionReveal key={layer.label} delay={i * 180}>
            <div
              className={`flex items-center justify-between gap-4 border border-border-soft px-4 py-3 sm:px-5 sm:py-4 ${
                layer.core
                  ? "bg-accent-soft border-accent/40"
                  : "bg-surface-raised"
              }`}
              style={{
                marginLeft: `${i * 20}px`,
                marginRight: `${i * 20}px`,
              }}
            >
              <span
                className={`font-display text-sm sm:text-base font-medium ${
                  layer.core ? "text-accent" : "text-text"
                }`}
              >
                {layer.label}
              </span>
              <span className="font-mono text-[11px] text-text-muted text-right">
                {layer.detail}
              </span>
            </div>
          </SectionReveal>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <span className="font-mono text-[10px] text-text-faint">
          ↓ presentation → domain ← data ↑
        </span>
      </div>
    </div>
  );
}
