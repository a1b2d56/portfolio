export type CaseStudy = {
  slug: string;
  overview: string;
  approach: string;
  diagram?: "clean-arch" | "protocol";
};

export const caseStudies: Record<string, CaseStudy> = {
  spectre: {
    slug: "spectre",
    overview:
      "Spectre is an independently built Android client for Bitwarden — not a fork of the official app, but a from-scratch implementation of the vault experience in Kotlin and Compose. The brief was simple to state and harder to execute: handle a person's passwords without giving security a reason to feel like an afterthought.",
    approach:
      "The app follows Clean Architecture: presentation, domain, and data kept as separate, independently testable layers, with dependencies pointing inward toward the domain. That separation matters most here — vault and encryption logic shouldn't know how a screen is drawn, and a screen shouldn't need to know how a secret is stored. Jetpack Compose handles presentation, which keeps the UI layer thin and the state flow easy to reason about.",
    diagram: "clean-arch",
  },
  planora: {
    slug: "planora",
    overview:
      "Planora is a single Android app for three things people usually juggle across separate apps: notes, tasks, and personal finance. The distinguishing piece is automatic transaction logging — reading bank SMS notifications and turning them into tracked transactions without manual entry.",
    approach:
      "Built offline-first and encrypted at the data layer, on the reasoning that a finance app has no business depending on a network connection to feel trustworthy. Kotlin and Jetpack Compose handle the app itself; the same Clean Architecture split used across these projects keeps SMS-parsing and encryption logic in the domain and data layers, isolated from the UI.",
    diagram: "clean-arch",
  },
  helix: {
    slug: "helix",
    overview:
      "Helix is a multi-threaded download manager for Windows, built to close two gaps browsers don't: a single connection rarely uses all of the bandwidth available for a large file, and direct downloads, torrents, streaming video, and YouTube each normally need a separate tool. Helix handles all four from one interface, with a companion browser extension that captures downloads straight from the page instead of a copy-pasted URL.",
    approach:
      "For direct HTTP downloads, the \"multi-threaded\" part is literal: the file gets split into byte-range chunks — using the Range header most servers already support — pulled down across several connections at once, then reassembled in order, using more of the available bandwidth than a single connection would. The harder problem is that torrents, HLS streams, and YouTube don't work anything like that. A torrent is swarm-based with no single source; HLS is a playlist of segments to fetch and concatenate; YouTube requires resolving the actual media URL before anything else applies. Keeping those differences out of the UI means treating each as its own strategy behind a shared interface, so the queue, pause/resume, and progress display don't need to know or care which protocol they're looking at.",
    diagram: "protocol",
  },
};
