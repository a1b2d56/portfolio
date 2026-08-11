export type CaseStudy = {
  slug: string;
  overview: string;
  approach: string;
  showArchDiagram?: boolean;
};

export const caseStudies: Record<string, CaseStudy> = {
  spectre: {
    slug: "spectre",
    overview:
      "Spectre is an independently built Android client for Bitwarden — not a fork of the official app, but a from-scratch implementation of the vault experience in Kotlin and Compose. The brief was simple to state and harder to execute: handle a person's passwords without giving security a reason to feel like an afterthought.",
    approach:
      "The app follows Clean Architecture: presentation, domain, and data kept as separate, independently testable layers, with dependencies pointing inward toward the domain. That separation matters most here — vault and encryption logic shouldn't know how a screen is drawn, and a screen shouldn't need to know how a secret is stored. Jetpack Compose handles presentation, which keeps the UI layer thin and the state flow easy to reason about.",
    showArchDiagram: true,
  },
  planora: {
    slug: "planora",
    overview:
      "Planora is a single Android app for three things people usually juggle across separate apps: notes, tasks, and personal finance. The distinguishing piece is automatic transaction logging — reading bank SMS notifications and turning them into tracked transactions without manual entry.",
    approach:
      "Built offline-first and encrypted at the data layer, on the reasoning that a finance app has no business depending on a network connection to feel trustworthy. Kotlin and Jetpack Compose handle the app itself; the same Clean Architecture split used across these projects keeps SMS-parsing and encryption logic in the domain and data layers, isolated from the UI.",
    showArchDiagram: true,
  },
};
