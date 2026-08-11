import { useEffect, useRef, useState } from "react";

const traces = [
  { d: "M -20 120 L 300 120 L 340 160 L 700 160 L 740 120 L 1220 120", flow: true, dur: 9 },
  { d: "M -20 280 L 200 280 L 200 380 L 500 380 L 540 420 L 1220 420", flow: false },
  { d: "M -20 500 L 380 500 L 420 460 L 750 460 L 750 200 L 900 200 L 940 240 L 1220 240", flow: true, dur: 12 },
  { d: "M 1220 60 L 950 60 L 910 100 L 600 100 L 600 300 L 450 300", flow: false },
  { d: "M -20 620 L 150 620 L 190 580 L 1000 580 L 1040 620 L 1220 620", flow: true, dur: 15 },
  { d: "M 1220 460 L 1080 460 L 1040 500 L 860 500", flow: false },
];

const vias = [
  [300, 120], [700, 160], [500, 380], [750, 460], [750, 200],
  [900, 200], [380, 500], [1000, 580], [600, 100], [1080, 460],
];

export default function CircuitField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        const node = outerRef.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const ratio = Math.min(Math.max(rect.bottom / (window.innerHeight * 1.1), 0), 1);
        node.style.opacity = String(0.4 + ratio * 0.6);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (mq.matches || !finePointer) {
      return () => {
        window.removeEventListener("scroll", onScroll);
        cancelAnimationFrame(scrollRaf);
      };
    }

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      curX += (targetX - curX) * 0.04;
      curY += (targetY - curY) * 0.04;
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${curX * -10}px, ${curY * -6}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scrollRaf);
    };
  }, []);

  return (
    <div
      ref={outerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div ref={wrapRef} className="absolute inset-[-4%]">
        <svg
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
        >
          <g fill="none" stroke="var(--color-border)" strokeWidth="1.5">
            {traces.map((t, i) => (
              <path
                key={i}
                d={t.d}
                className={!reduced && t.flow ? "circuit-flow" : undefined}
                style={
                  !reduced && t.flow
                    ? ({ "--dur": `${t.dur}s` } as React.CSSProperties)
                    : undefined
                }
                opacity={t.flow ? 0.55 : 0.35}
              />
            ))}
          </g>
          <g fill="var(--color-border)">
            {vias.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={3} opacity={0.5} />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
