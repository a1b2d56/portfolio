export type Project = {
  slug: string;
  name: string;
  category: string;
  oneLiner: string;
  description: string;
  stack: string[];
  status?: string;
  href: string;
  caseStudy?: boolean;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "spectre",
    name: "Spectre",
    category: "ANDROID / SECURITY",
    oneLiner: "A Bitwarden client for Android",
    description:
      "A Bitwarden client for Android built with Kotlin, Jetpack Compose, and Clean Architecture. Currently in progress, with a focus on security, performance, and interface quality.",
    stack: ["Kotlin", "Jetpack Compose", "Clean Architecture"],
    status: "In progress",
    href: "https://github.com/a1b2d56/Spectre",
    caseStudy: true,
    featured: true,
  },
  {
    slug: "planora",
    name: "Planora",
    category: "ANDROID / PRODUCTIVITY",
    oneLiner: "Notes, tasks, and finance in one offline-first app",
    description:
      "A native Android productivity app that combines notes, tasks, and personal finance — including automatic transaction logging from bank SMS — into a single offline-first, encrypted application built with Kotlin and Jetpack Compose.",
    stack: ["Kotlin", "Jetpack Compose", "Encryption", "Offline-first"],
    href: "https://github.com/a1b2d56/planora",
    caseStudy: true,
  },
  {
    slug: "ex-employee",
    name: "Ex-Employee",
    category: "ANDROID / ENTERPRISE",
    oneLiner: "Management portal for Power Grid Corporation of India",
    description:
      "An ex-employee management portal for Power Grid Corporation of India, built with Kotlin, Jetpack Compose, Clean Architecture, and Hilt.",
    stack: ["Kotlin", "Jetpack Compose", "Clean Architecture", "Hilt"],
    href: "https://github.com/a1b2d56/Ex-Employee",
  },
  {
    slug: "helix",
    name: "Helix",
    category: "WINDOWS / SYSTEMS",
    oneLiner: "Multi-threaded download manager",
    description:
      "A multi-threaded download manager for Windows, built with C# and WPF. Supports segmented HTTP downloads, torrents, HLS streams, and YouTube extraction, with a companion browser extension for capturing downloads directly.",
    stack: ["C#", "WPF", "Segmented HTTP", "Torrents", "HLS"],
    href: "https://github.com/a1b2d56/Helix",
    caseStudy: true,
    featured: true,
  },
  {
    slug: "multiai",
    name: "MultiAI",
    category: "WINDOWS / DESKTOP",
    oneLiner: "One interface for multiple AI providers",
    description:
      "A Windows desktop application that unifies multiple AI providers — including ChatGPT, Gemini, and Claude — behind one interface, built in C#.",
    stack: ["C#", "Desktop"],
    href: "https://github.com/a1b2d56/MultiAI",
  },
  {
    slug: "bypasstpm-secureboot",
    name: "BypassTPM-SecureBoot",
    category: "WINDOWS / SYSTEMS",
    oneLiner: "Install Windows 11 on unsupported hardware",
    description:
      "A registry-based utility for installing Windows 11 on hardware that doesn't meet the official TPM and Secure Boot requirements. Picked up by other developers solving the same problem.",
    stack: ["Windows Registry", "Systems"],
    href: "https://github.com/a1b2d56/BypassTPM-SecureBoot",
  },
  {
    slug: "midjourney-scraper",
    name: "Midjourney Scraper",
    category: "PYTHON / TOOLING",
    oneLiner: "Bulk image generation via the Midjourney API",
    description:
      "A Python tool that uses the Midjourney API to generate and collect high-resolution images.",
    stack: ["Python"],
    href: "https://github.com/a1b2d56/midjourney_scrapper",
  },
  {
    slug: "pixelguard",
    name: "PixelGuard",
    category: "PYTHON / TOOLING",
    oneLiner: "Pixel-level image processing toolkit",
    description:
      "A Python toolkit for pixel-level image processing, including watermarking and batch operations.",
    stack: ["Python"],
    href: "https://github.com/a1b2d56/PixelGuard",
  },
];

export const stackGroups: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["Kotlin", "Java", "Python", "C", "C++", "Dart", "C#"] },
  { label: "Mobile", items: ["Android", "Jetpack Compose", "Flutter"] },
  { label: "Design", items: ["UI Design"] },
  { label: "Tools", items: ["Android Studio", "IntelliJ IDEA", "VS Code"] },
  { label: "Infrastructure", items: ["Firebase", "GitHub Actions"] },
  { label: "Systems", items: ["Linux", "Arch Linux", "Git"] },
  { label: "Web", items: ["HTML", "CSS", "JavaScript"] },
];

export const affiliations = [
  { name: "Vizality", href: "https://github.com/vizality" },
  { name: "Constitution of India", href: "https://github.com/Constitution-of-India" },
];

export const contact = {
  github: "https://github.com/a1b2d56",
  linkedin: "https://www.linkedin.com/in/ananmay-jha-125bb028a/",
  email: "ananmayjha@gmail.com",
  instagram: "https://www.instagram.com/devilthebloke/",
  resume: "/resume.pdf",
};
