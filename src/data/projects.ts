export type Project = {
  slug: string;
  color: string;
  name: string;
  category: string;
  oneLiner: string;
  description: string;
  stack: string[];
  architecture?: string;
  concurrency?: string;
  securityModel?: string;
  status?: string;
  href: string;
  caseStudy?: boolean;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "spectre",
    color: "#3b8bff",
    name: "Spectre",
    category: "ANDROID / SECURITY",
    oneLiner: "Zero-knowledge Bitwarden client for Android",
    description:
      "A native Bitwarden password vault client engineered from first principles with Kotlin and Jetpack Compose. Built with Clean Architecture, hardware-backed key derivation (Argon2id/PBKDF2), and rigorous in-memory credential sanitization.",
    stack: ["Kotlin", "Jetpack Compose", "Clean Architecture", "Argon2id / AES-256", "Biometrics"],
    architecture: "Clean Architecture (Presentation → Domain ← Data)",
    concurrency: "Kotlin Coroutines & StateFlow",
    securityModel: "Zero-Knowledge (Argon2id + AES-256-CBC + HMAC-SHA256)",
    status: "Active Development",
    href: "https://github.com/a1b2d56/Spectre",
    caseStudy: true,
    featured: true,
  },
  {
    slug: "packer-antidebug-auditor",
    color: "#f97316",
    name: "Packer & Anti-Debug Auditor",
    category: "SECURITY / BINARY ANALYSIS",
    oneLiner: "Pre-execution static triage for Windows PE and Android binaries",
    description:
      "A pre-execution static triage engine for Windows PE32/PE32+ binaries and Android APKs. Detects packers, protectors, anti-debugging, and EDR-evasion stubs, analyzing per-section Shannon entropy and W^X violations with MITRE ATT&CK mapping and a Random Forest classifier.",
    stack: ["Python", "FastAPI", "React 19", "PE32 Internals", "JADX", "MITRE ATT&CK", "Random Forest"],
    architecture: "Tri-Interface Engine (CLI, FastAPI SSE, React Dashboard)",
    concurrency: "Multi-Core Batch Processing + Async SSE Streams",
    securityModel: "Pre-Execution Static Triage (Zero-Execution Sandbox Safe)",
    status: "Active Tool",
    href: "https://github.com/a1b2d56/packer-antidebug-auditor",
    caseStudy: true,
    featured: true,
  },
  {
    slug: "palette-auth",
    color: "#a855f7",
    name: "palette-auth",
    category: "SECURITY / CRYPTOGRAPHY",
    oneLiner: "In-pixel image authentication, tamper localization, and self-recovery",
    description:
      "A self-contained image authentication and tamper-localization library for indexed-color images (PNG-8, GIF). Embeds an Ed25519 digital signature, block verification tags, and low-frequency recovery color priors directly into pixel data using embedding-invariant pair-swap steganography.",
    stack: ["Python", "Ed25519", "Steganography", "Cryptography", "Image Forensics", "mypy"],
    architecture: "Self-Contained In-Pixel Steganographic Pipeline",
    concurrency: "Deterministic Spatial Block Traversal",
    securityModel: "Ed25519 Signature + SHA-256 Root Digest + Block Recovery Priors",
    status: "Library (35 Tests Passing)",
    href: "https://github.com/a1b2d56/palette-auth",
    caseStudy: true,
    featured: true,
  },
  {
    slug: "helix",
    color: "#ef4444",
    name: "Helix",
    category: "WINDOWS / SYSTEMS",
    oneLiner: "High-throughput multi-protocol download manager",
    description:
      "A high-performance Windows desktop download engine built with C# and WPF. Accelerates transfers via parallel segmented HTTP Range requests, BitTorrent peer swarms, HLS stream demuxing, and YouTube resolution, integrated with a companion browser extension.",
    stack: ["C#", "WPF", "Segmented HTTP", "BitTorrent", "HLS Demuxer", "IPC"],
    architecture: "Strategy Pattern + Producer-Consumer Channel Pipeline",
    concurrency: "Asynchronous Tasks + System.Threading.Channels",
    securityModel: "SHA-1 Torrent Piece Hashing & IPC Token Handshake",
    href: "https://github.com/a1b2d56/Helix",
    caseStudy: true,
    featured: true,
  },
  {
    slug: "planora",
    color: "#22c55e",
    name: "Planora",
    category: "ANDROID / PRIVACY",
    oneLiner: "Offline-first notes, tasks, and automated finance engine",
    description:
      "An offline-first Android productivity suite that unifies notes, task tracking, and personal finance. Features a deterministic on-device regex engine that extracts transactions from bank SMS notifications without cloud exposure.",
    stack: ["Kotlin", "Jetpack Compose", "SQLCipher", "Offline-First", "Regex Parser"],
    architecture: "Clean Architecture + MVI Unidirectional State Flow",
    concurrency: "Kotlin Coroutines & Flow + WorkManager",
    securityModel: "SQLCipher 256-bit AES Local Database Encryption",
    href: "https://github.com/a1b2d56/planora",
    caseStudy: true,
    featured: true,
  },
  {
    slug: "android-utils",
    color: "#10b981",
    name: "Android Partition Repack Toolkit",
    category: "ANDROID / SYSTEMS",
    oneLiner: "Low-level EROFS & EXT4 partition unpacker and repacker with AVB 2.0",
    description:
      "A battle-tested Android partition unpacker and repacker for modern Android 10 – 15+ ROMs. Features an inode-tree walker solving EROFS bogus i_mode crashes, automated preservation of SELinux file contexts and capabilities, and cryptographic AVB 2.0 image signing.",
    stack: ["Python", "EROFS", "EXT4", "SELinux", "AVB 2.0", "Filesystems", "CLI"],
    architecture: "Inode-Tree Walker & Dynamic Partition Pipeline",
    concurrency: "Multi-Threaded Extraction & Chunk Streaming",
    securityModel: "Android Verified Boot (AVB 2.0) Cryptographic Signing",
    status: "Active Tool",
    href: "https://github.com/a1b2d56/android-utils",
    caseStudy: true,
    featured: true,
  },
  {
    slug: "opaline",
    color: "#38bdf8",
    name: "Opaline",
    category: "COMPOSE / MULTIPLATFORM",
    oneLiner: "Compose Multiplatform UI library in the ColorOS 17 design language",
    description:
      "A cross-platform Compose UI framework targeting Android, iOS, Desktop (JVM), and Web (Wasm). Systematically reconstructs ColorOS 17 (COUI) components, fluid motion physics, glass materials, and token hierarchies extracted directly from real system firmware.",
    stack: ["Kotlin", "Compose Multiplatform", "Android", "iOS", "Wasm", "Design Systems"],
    architecture: "Multiplatform Component System with Hierarchical Token Tree",
    concurrency: "Kotlin Coroutines & Flow",
    securityModel: "Apache-2.0 Open-Source Component Library",
    status: "Active Development",
    href: "https://github.com/a1b2d56/opaline",
    featured: true,
  },
  {
    slug: "ex-employee",
    color: "#eab308",
    name: "Ex-Employee",
    category: "ANDROID / ENTERPRISE",
    oneLiner: "Welfare benefits portal for Power Grid Corporation of India",
    description:
      "An enterprise Android application built for Power Grid Corporation of India. Enables retired staff to track post-retirement benefits and file medical claims through an authenticated, offline-cached workflow.",
    stack: ["Kotlin", "Jetpack Compose", "Clean Architecture", "Hilt", "Room"],
    architecture: "Clean Architecture + Hilt Dependency Injection",
    concurrency: "Kotlin Coroutines & Flow",
    securityModel: "Android KeyStore Token Encryption + Session RBAC",
    href: "https://github.com/a1b2d56/Ex-Employee",
    caseStudy: true,
  },
  {
    slug: "bypasstpm-secureboot",
    color: "#ec4899",
    name: "BypassTPM-SecureBoot",
    category: "WINDOWS / SYSTEMS",
    oneLiner: "Hardware check bypass utility for Windows 11 installation",
    description:
      "A low-level systems deployment utility that overcomes TPM 2.0 and Secure Boot hardware restrictions for Windows 11 setups via automated registry and pre-installation environment (WinPE) patches.",
    stack: ["Windows Registry", "WinPE", "Batch / PowerShell", "Systems"],
    architecture: "WinPE Environment Hooks & Registry Hive Mutation",
    concurrency: "Deterministic Pre-OS Script Execution",
    securityModel: "Pre-Installation Hardware Requirement Override",
    href: "https://github.com/a1b2d56/BypassTPM-SecureBoot",
  },
  {
    slug: "multiai",
    color: "#8b5cf6",
    name: "MultiAI",
    category: "WINDOWS / DESKTOP",
    oneLiner: "Unified desktop workbench across foundational AI models",
    description:
      "A native Windows desktop application uniting multiple AI providers — OpenAI, Google Gemini, and Anthropic Claude — behind a singular, high-performance interface with prompt history, streaming telemetry, and local persistence.",
    stack: ["C#", "WPF", "REST APIs", "Streaming I/O"],
    architecture: "Provider Adapter Pattern with Persistent Context Store",
    concurrency: "Asynchronous Streaming HTTP Pipeline",
    securityModel: "Local DPAPI-Protected Credential Vault",
    href: "https://github.com/a1b2d56/MultiAI",
  },
  {
    slug: "pixelguard",
    color: "#06b6d4",
    name: "PixelGuard",
    category: "PYTHON / TOOLING",
    oneLiner: "Pixel-level image manipulation and verification toolkit",
    description:
      "A high-throughput Python utility for pixel-level image processing, automated spatial watermarking, batch asset conversions, and cryptographic asset verification.",
    stack: ["Python", "Pillow", "Image Processing", "Automation"],
    architecture: "Pipelined Image Processing Engine",
    concurrency: "Multiprocessing Worker Pool",
    securityModel: "Cryptographic Perceptual Watermark Integrity",
    href: "https://github.com/a1b2d56/PixelGuard",
  },
  {
    slug: "midjourney-scraper",
    color: "#d97706",
    name: "Midjourney Scraper",
    category: "PYTHON / TOOLING",
    oneLiner: "Automated media retrieval pipeline for generative assets",
    description:
      "A concurrent Python harvesting utility utilizing reverse-engineered session APIs to scrape, categorize, and archive high-resolution generative image assets and metadata at scale.",
    stack: ["Python", "AsyncIO", "REST APIs", "Concurrent Pipelines"],
    architecture: "Reverse-Engineered Concurrent Session Harvester",
    concurrency: "Python AsyncIO Event Loop",
    securityModel: "Session Cookie Token Rotation & Rate Limiting",
    href: "https://github.com/a1b2d56/midjourney_scrapper",
  },
];

export const stackGroups: { label: string; items: string[] }[] = [
  {
    label: "Languages",
    items: ["Kotlin", "Java", "C# (.NET)", "Python", "C / C++", "Dart", "TypeScript"],
  },
  {
    label: "Mobile & Multiplatform",
    items: [
      "Native Android SDK",
      "Jetpack Compose",
      "Compose Multiplatform (iOS, Desktop, Wasm)",
      "Coroutines & StateFlow",
      "Hilt Dependency Injection",
      "Room Persistence",
    ],
  },
  {
    label: "Systems & Binary Analysis",
    items: [
      "PE32/PE32+ Executable Internals",
      "EROFS & EXT4 Filesystem Drivers",
      "Anti-Debug & Anti-VM Detection",
      "SELinux Contexts & Capabilities",
      "Android Verified Boot (AVB 2.0)",
      "Named Pipe IPC & WinPE",
    ],
  },
  {
    label: "Architecture & Cryptography",
    items: [
      "Clean Architecture & Hexagonal Boundaries",
      "Ed25519 Digital Signatures",
      "In-Pixel Pair-Swap Steganography",
      "AES-256-CBC & HMAC-SHA256",
      "Argon2id & PBKDF2 Key Derivation",
      "In-Memory Credential Sanitization",
    ],
  },
  {
    label: "Cloud & Infrastructure",
    items: [
      "Oracle Cloud Infrastructure (OCI)",
      "FastAPI (Asynchronous REST & SSE)",
      "GitHub Actions (CI/CD Pipelines)",
      "Docker Containers",
      "Firebase Auth & Firestore",
    ],
  },
  {
    label: "Development & Forensic Tools",
    items: ["Android Studio", "IntelliJ IDEA", "Visual Studio / VS Code", "JADX Decompiler", "Git CLI", "mypy"],
  },
];

export const affiliations = [
  {
    name: "Vizality",
    href: "https://github.com/vizality",
    role: "Open Source Contributor",
    description:
      "Contributed to the open-source client-side Discord modification framework, crafting native UI extensions and modular plugin interfaces.",
  },
  {
    name: "Constitution of India",
    href: "https://github.com/Constitution-of-India",
    role: "Open Source Contributor",
    description:
      "Open-source civic initiative making Indian constitutional law structured, accessible, and queryable for developers and legal scholars.",
  },
];

export const contact = {
  name: "Ananmay Jha",
  role: "Native Systems & Mobile Software Engineer",
  location: "New Delhi & Vellore, India",
  github: "https://github.com/a1b2d56",
  linkedin: "https://www.linkedin.com/in/ananmay-jha-125bb028a/",
  email: "ananmayjha@gmail.com",
  instagram: "https://www.instagram.com/devilthebloke/",
  resume: "/resume.pdf",
};
