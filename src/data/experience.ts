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
  roles: ExperienceRole[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "PowerGrid Corporation of India Limited",
    location: "Gurugram, India",
    dates: "May 2025 – Jul 2026",
    roles: [
      {
        title: "Android Developer Intern — Employee Welfare Portal",
        dates: "May – Jul 2026",
        stack: ["Kotlin", "Jetpack Compose", "Clean Architecture", "Hilt"],
        bullets: [
          "Developed an Android application giving retired employees direct access to post-retirement welfare benefits, including medical allowance claims, from the Employee Welfare department",
          "Owned the benefits-claim workflow end-to-end, from employee record lookup to allowance submission, for retirees across the department",
        ],
      },
      {
        title: "Full Stack Developer Intern — Security Advisory Portal",
        dates: "May – Jul 2025",
        bullets: [
          "Built a full-stack security advisory portal to log, track, and coordinate rectification of security issues across the organization's departments, centralizing incident visibility for department stakeholders",
        ],
      },
    ],
  },
];
