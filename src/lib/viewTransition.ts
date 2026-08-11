import { flushSync } from "react-dom";
import type { NavigateFunction } from "react-router-dom";

type DocumentWithViewTransitions = Document & {
  startViewTransition?: (callback: () => void) => void;
};

export function navigateWithTransition(navigate: NavigateFunction, to: string) {
  const doc = document as DocumentWithViewTransitions;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!doc.startViewTransition || reduced) {
    navigate(to);
    return;
  }

  doc.startViewTransition(() => {
    flushSync(() => navigate(to));
  });
}
