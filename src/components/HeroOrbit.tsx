import type { CSSProperties } from "react";
import { projects } from "../data/projects";
import ProjectTile from "./ProjectTile";

// Everything is sized in multiples of --u (set on the wrapper), which
// shrinks on narrow screens so the inner ring still fits a phone.
const rings = [
  { radius: "calc(400 * var(--u))", dur: "110s", reverse: false, count: 3 },
  { radius: "calc(590 * var(--u))", dur: "160s", reverse: true, count: 5 },
];

// Coloured arc segments laid over the hairline rings: [ring r, start, length, colour index].
const arcs: [number, number, number, number][] = [
  [400, 0.02, 0.1, 3],
  [400, 0.45, 0.07, 0],
  [590, 0.2, 0.08, 4],
  [590, 0.62, 0.06, 1],
  [590, 0.86, 0.05, 6],
];

export default function HeroOrbit() {
  let cursor = 0;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ "--u": "clamp(0.46px, 0.082vw, 1px)" } as CSSProperties}
    >
      <svg
        viewBox="-650 -650 1300 1300"
        className="absolute top-1/2 left-1/2 size-[calc(1300*var(--u))] -translate-x-1/2 -translate-y-1/2"
        fill="none"
      >
        {[150, 275, 400, 495, 590].map((r) => (
          <circle key={r} r={r} stroke="var(--line)" strokeWidth="1" opacity={r % 2 ? 0.5 : 1} />
        ))}
        <g className="animate-[orbit-spin_240s_linear_infinite]" style={{ transformOrigin: "0 0" }}>
          {arcs.map(([r, start, length, colour]) => {
            const c = 2 * Math.PI * r;
            return (
              <circle
                key={`${r}-${start}`}
                r={r}
                stroke={projects[colour].color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${c * length} ${c}`}
                strokeDashoffset={-c * start}
              />
            );
          })}
        </g>
      </svg>

      {rings.map((ring) => {
        const members = projects.slice(cursor, cursor + ring.count);
        cursor += ring.count;
        return (
          <div
            key={ring.dur}
            className={`orbit ${ring.reverse ? "orbit-reverse" : ""}`}
            style={{ "--dur": ring.dur } as CSSProperties}
          >
            {members.map((project, i) => (
              <div
                key={project.slug}
                className="orbit-slot"
                style={
                  {
                    "--angle": `${(360 / members.length) * i + (ring.reverse ? 20 : 200)}deg`,
                    "--radius": ring.radius,
                  } as CSSProperties
                }
              >
                <div className="orbit-tile flex -translate-x-1/2 -translate-y-1/2">
                  <ProjectTile project={project} size={60} className="max-sm:scale-75 max-sm:opacity-40" />
                </div>
              </div>
            ))}
          </div>
        );
      })}

      {/* Fade the rings out behind the copy and at the bottom edge. */}
      <div className="absolute inset-0 bg-[radial-gradient(closest-side,var(--bg)_30%,transparent_75%)] opacity-80" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-bg to-transparent" />
    </div>
  );
}
