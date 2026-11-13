import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type RailItem = { id: string; label: string };

/**
 * Bottom-right index of the sections on the current page. Reads every
 * [data-rail] element; the one crossing the middle of the viewport is
 * shown large.
 */
export default function SectionRail() {
  const { pathname } = useLocation();
  const [items, setItems] = useState<RailItem[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const collect = () => {
      observer?.disconnect();
      const nodes = [...document.querySelectorAll<HTMLElement>("[data-rail]")].filter((n) => n.id);
      setItems(nodes.map((n) => ({ id: n.id, label: n.dataset.rail ?? "" })));
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setActive(entry.target.id);
          }
        },
        { rootMargin: "-45% 0px -45% 0px" },
      );
      nodes.forEach((n) => observer!.observe(n));
    };

    // Route chunks are lazy, so sections can mount a beat after the path changes.
    collect();
    const main = document.getElementById("main-content");
    const mutations = new MutationObserver(collect);
    if (main) mutations.observe(main, { childList: true });

    return () => {
      observer?.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  if (items.length < 2) return null;

  return (
    <nav
      aria-label="On this page"
      className="pointer-events-none fixed right-14 bottom-8 z-20 hidden flex-col items-end gap-1 xl:flex"
    >
      {items.map((item) => {
        const isActive = item.id === active;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={isActive ? "location" : undefined}
            className={`pointer-events-auto font-display uppercase leading-none transition-all duration-300 ${
              isActive ? "py-1 text-2xl text-ink-strong" : "text-[13px] text-faint hover:text-ink"
            }`}
            style={{ textShadow: "0 0 12px var(--bg), 0 0 4px var(--bg)" }}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
