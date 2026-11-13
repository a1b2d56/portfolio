import { useEffect, useRef } from "react";

/** Right-edge ruler with a marker that tracks scroll position. */
export default function ScrollRuler() {
  const markerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const pct = scrollable > 0 ? Math.min(doc.scrollTop / scrollable, 1) : 0;
      if (markerRef.current) markerRef.current.style.top = `${pct * 100}%`;
      if (labelRef.current) labelRef.current.textContent = `${Math.round(pct * 100)}%`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Page height changes on route change and as lazy content mounts.
    const observer = new ResizeObserver(onScroll);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-14 right-0 bottom-0 z-20 hidden w-9 border-l border-line xl:block"
    >
      <div className="absolute inset-x-0 top-4 bottom-6">
        {Array.from({ length: 21 }, (_, i) => (
          <span
            key={i}
            className={`absolute left-0 h-px bg-line-strong ${i % 5 === 0 ? "w-2.5" : "w-1.5 opacity-50"}`}
            style={{ top: `${i * 5}%` }}
          />
        ))}
        <div ref={markerRef} className="absolute inset-x-0 top-0">
          <span className="absolute top-0 left-0 h-0.5 w-full -translate-y-1/2 bg-accent" />
          <span
            ref={labelRef}
            className="absolute top-1.5 right-1 font-mono text-[9px] font-medium tracking-wider text-accent-ink"
          >
            0%
          </span>
        </div>
      </div>
    </div>
  );
}
