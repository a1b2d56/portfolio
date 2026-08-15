import SectionReveal from "../components/SectionReveal";
import TransitionLink from "../components/TransitionLink";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-center px-6 py-24 sm:px-8">
      <SectionReveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint">
          // 404
        </p>
        <h1 className="mt-4 max-w-lg font-display text-3xl font-semibold text-balance sm:text-4xl">
          Route not found.
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-text-muted">
          This path doesn't exist. It might've moved, or never did.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          <TransitionLink
            to="/"
            className="font-mono text-sm text-text-muted hover:text-accent transition-colors"
          >
            ← Home
          </TransitionLink>
          <TransitionLink
            to="/work"
            className="font-mono text-sm text-text-muted hover:text-accent transition-colors"
          >
            View work →
          </TransitionLink>
        </div>
      </SectionReveal>
    </section>
  );
}
