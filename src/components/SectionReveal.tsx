import { useEffect, useRef, useState, type ReactNode } from "react";

let nativeSupport: boolean | null = null;
function supportsScrollTimeline() {
  if (nativeSupport !== null) return nativeSupport;
  nativeSupport =
    typeof CSS !== "undefined" &&
    typeof CSS.supports === "function" &&
    CSS.supports("animation-timeline: view()");
  return nativeSupport;
}

export default function SectionReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reducedMotion || supportsScrollTimeline()) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  // Reduced motion: render plainly, no animation path at all.
  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // Native path: CSS animation-timeline scrubs the reveal with scroll
  // position directly - the same category of technique behind the GTA VI
  // site's scroll animations. No JS, no IntersectionObserver needed.
  if (supportsScrollTimeline()) {
    return <div className={`sr-native ${className}`}>{children}</div>;
  }

  // Fallback: IntersectionObserver-triggered one-shot CSS animation.
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? undefined : 0,
        animation: visible ? "reveal 0.7s cubic-bezier(0.16,1,0.3,1) forwards" : undefined,
        animationDelay: visible ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </div>
  );
}
