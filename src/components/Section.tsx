import type { ReactNode } from "react";

/**
 * A framed page section. The numbered bar sticks under the nav while the
 * section is on screen; `id` + `label` also feed the SectionRail.
 */
export default function Section({
  id,
  index,
  label,
  aside,
  children,
}: {
  id: string;
  index: string;
  label: string;
  aside?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} data-rail={label} className="relative border-t border-line">
      <div className="sticky top-14 z-30 border-b border-line bg-bg/95 backdrop-blur-sm">
        <div className="frame flex h-10 items-center justify-between gap-4 px-6 sm:px-8">
          <p className="hud-label text-muted">
            <span className="text-faint">{index}</span>
            <span className="px-2 text-faint">/</span>
            {label}
          </p>
          {aside && <p className="hud-label hidden text-faint sm:block">{aside}</p>}
        </div>
      </div>
      <div className="frame">{children}</div>
    </section>
  );
}
