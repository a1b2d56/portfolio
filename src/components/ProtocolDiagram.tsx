const sources = [
  { label: "HTTP", detail: "segmented, multi-connection" },
  { label: "Torrent", detail: "swarm-based" },
  { label: "HLS", detail: "playlist + segments" },
  { label: "YouTube", detail: "resolved media URL" },
];

export default function ProtocolDiagram() {
  return (
    <div className="my-10 rounded-sm border border-border bg-surface/60 p-6 sm:p-8">
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint">
        Four source types, one queue
      </p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {sources.map((s) => (
          <div
            key={s.label}
            className="border border-border-soft bg-surface-raised px-3 py-2.5"
          >
            <p className="font-mono text-xs text-text">{s.label}</p>
            <p className="mt-0.5 font-mono text-[10px] text-text-faint">{s.detail}</p>
          </div>
        ))}
      </div>

      <div className="my-3 text-center font-mono text-text-faint">↓</div>

      <div className="border border-accent/40 bg-accent-soft px-5 py-4 text-center">
        <p className="font-display text-sm font-medium text-accent">Download Core</p>
        <p className="mt-1 font-mono text-[10px] text-text-muted">
          queue, pause/resume, reassembly
        </p>
      </div>
    </div>
  );
}
