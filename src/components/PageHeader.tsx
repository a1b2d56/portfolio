import type { ReactNode } from "react";

/** Top-of-page title block used by every route except the home hero. */
export default function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="frame px-6 pt-16 pb-14 sm:px-8 sm:pt-24 sm:pb-20">
      <div className="animate-reveal hud-label flex flex-wrap items-center gap-x-3 gap-y-2 text-faint">
        {eyebrow}
      </div>
      <h1 className="animate-reveal mt-6 max-w-3xl font-display text-4xl leading-[1.02] tracking-[-0.035em] text-balance text-ink-strong [animation-delay:80ms] sm:text-5xl md:text-6xl">
        {title}
      </h1>
      {children && (
        <div className="animate-reveal mt-6 max-w-xl text-lg leading-relaxed text-muted [animation-delay:160ms]">
          {children}
        </div>
      )}
    </div>
  );
}
