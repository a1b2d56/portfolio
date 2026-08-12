import { flushSync } from "react-dom";
import type { NavigateFunction } from "react-router-dom";

type DocumentWithViewTransitions = Document & {
  startViewTransition?: (callback: () => void) => void;
};

export function navigateWithTransition(navigate: NavigateFunction, to: string) {
  const doc = document as DocumentWithViewTransitions;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (window.location.pathname === to) {
    window.scrollTo({ top: 0, left: 0, behavior: reduced ? "instant" : "smooth" });
    return;
  }

  if (!doc.startViewTransition || reduced) {
    navigate(to);
    return;
  }

  doc.startViewTransition(() => {
    flushSync(() => navigate(to));
  });
}
