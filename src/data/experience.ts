export type ExperienceRole = {
  title: string;
  dates: string;
  stack?: string[];
  bullets: string[];
};

export type ExperienceEntry = {
  company: string;
  location: string;
  dates: string;
  description?: string;
  roles: ExperienceRole[];
};

export type EducationEntry = {
  institution: string;
  location: string;
  degree: string;
  field: string;
  dates: string;
  highlights: string[];
};

export type CertificationEntry = {
  issuer: string;
  year: string;
  title: string;
  credentialId?: string;
};

export const experience: ExperienceEntry[] = [
  {
    company: "PowerGrid Corporation of India Limited",
    location: "Gurugram, India",
    dates: "May 2025 – Jul 2026",
    description:
      "Central public sector enterprise operating India's national power transmission network.",
    roles: [
      {
        title: "Android Developer Intern — Employee Welfare Portal",
        dates: "May – Jul 2026",
        stack: ["Kotlin", "Jetpack Compose", "Clean Architecture", "Hilt", "Coroutines & Flow"],
        bullets: [
          "Architected and deployed a native Android application enabling retired personnel to securely access post-retirement welfare schemes and file medical allowance claims directly with the Employee Welfare Department.",
          "Engineered the end-to-end benefits-claim pipeline from employee identity verification to allowance adjudication, enforcing strict input validation and offline-first state persistence.",
          "Structured the codebase under Clean Architecture with strict separation between Compose presentation, domain use cases, and repository data sources, powered by Hilt for modular dependency injection.",
        ],
      },
      {
        title: "Full Stack Developer Intern — Security Advisory Portal",
        dates: "May – Jul 2025",
        stack: ["Full Stack", "Security Auditing", "Access Control", "Enterprise Portal"],
        bullets: [
          "Engineered a centralized security advisory and vulnerability governance portal to identify, classify, and track remediation of security issues across enterprise divisions.",
          "Consolidated disparate department reports into a unified incident management dashboard, accelerating vulnerability lifecycle resolution for administrative and IT security stakeholders.",
          "Implemented role-based access control (RBAC) and audit logging to ensure regulatory compliance and strict confidentiality across organizational boundaries.",
        ],
      },
    ],
  },
];

export const education: EducationEntry[] = [
  {
    institution: "Vellore Institute of Technology (VIT)",
    location: "Vellore, India",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science & Technology — Information Security",
    dates: "Aug 2023 – May 2027",
    highlights: [
      "Specialization in Information Security, focusing on Applied Cryptography, Network Protocols, and Secure Software Design.",
      "Core Coursework: Operating Systems, Distributed Systems, Database Systems, Computer Networks, Object-Oriented Analysis & Design.",
      "Hands-on research and prototyping in zero-knowledge client architectures, memory-safe systems, and low-level OS utilities.",
    ],
  },
];

export const certifications: CertificationEntry[] = [
  {
    issuer: "Oracle Cloud Infrastructure",
    year: "2025",
    title: "Certified Generative AI Professional",
  },
  {
    issuer: "Oracle Cloud Infrastructure",
    year: "2025",
    title: "Certified DevOps Professional",
  },
  {
    issuer: "Oracle Cloud Infrastructure",
    year: "2025",
    title: "Certified Data Science Professional",
  },
  {
    issuer: "Oracle Cloud Infrastructure",
    year: "2025",
    title: "Certified Multi-Cloud Architect Professional",
  },
];
