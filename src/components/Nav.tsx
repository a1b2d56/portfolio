import type { RefObject } from "react";
import { Search } from "lucide-react";
import TransitionLink from "./TransitionLink";

export default function Nav({
  onOpenPalette,
  paletteTriggerRef,
}: {
  onOpenPalette: () => void;
  paletteTriggerRef: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-bg/85 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
        <TransitionLink
          to="/"
          className="font-display text-sm font-semibold tracking-tight text-text hover:text-accent transition-colors"
        >
          Ananmay
        </TransitionLink>
        <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
          <TransitionLink to="/work" className="hover:text-accent transition-colors">
            Work
          </TransitionLink>
          <TransitionLink to="/about" className="hover:text-accent transition-colors">
            About
          </TransitionLink>
          <a href="#contact" className="hidden hover:text-accent transition-colors sm:inline">
            Contact
          </a>
          <button
            ref={paletteTriggerRef}
            type="button"
            onClick={onOpenPalette}
            className="flex items-center gap-1.5 rounded-sm border border-border px-2 py-1.5 normal-case tracking-normal text-text-faint transition-colors hover:border-accent/40 hover:text-accent sm:py-1"
            aria-label="Open command palette"
          >
            <Search size={12} className="sm:hidden" aria-hidden="true" />
            <span className="hidden sm:inline">Search</span>
            <span className="hidden text-[10px] sm:inline">⌘K</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
