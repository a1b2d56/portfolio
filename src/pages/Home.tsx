import {
  ArrowRight,
  Cpu,
  FileText,
  Hammer,
  LayoutGrid,
  Layers,
  Lock,
  PanelsTopLeft,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import { contact, projects } from "../data/projects";
import HeroOrbit from "../components/HeroOrbit";
import Section from "../components/Section";
import SectionReveal from "../components/SectionReveal";
import TransitionLink from "../components/TransitionLink";
import WorkIndex from "../components/WorkIndex";
import { GithubMark } from "../components/Logo";

const platforms = [
  {
    label: "Android",
    detail: "Kotlin · Jetpack Compose · Clean Architecture",
    description: "Declarative, fluid UI with strict domain separation and offline-first local persistence.",
  },
  {
    label: "Windows",
    detail: "C# · .NET · WPF · Systems",
    description: "Multi-threaded desktop software, high-throughput I/O pipelines, and system utilities.",
  },
  {
    label: "Command Line & Tooling",
    detail: "Python · Linux · Automation",
    description: "Concurrent data pipelines, low-level system tooling, and reverse-engineered workflow automation.",
  },
];

const principles: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Layers,
    title: "Clean Architecture",
    body: "Domain rules stay independent of UI frameworks and data sources. Dependencies point inward, making core logic testable and resilient to platform changes.",
  },
  {
    icon: Lock,
    title: "Secure by Default",
    body: "Cryptographic routines, key derivation, and vault operations live in isolated layers with explicit in-memory credential sanitization.",
  },
  {
    icon: Cpu,
    title: "Native Execution",
    body: "Software built directly with platform-native toolkits — Jetpack Compose on Android, WPF on Windows, Python on the shell — with zero unnecessary runtime abstraction.",
  },
  {
    icon: WifiOff,
    title: "Offline-First",
    body: "An application shouldn't require a network connection to feel trustworthy. Local persistence and conflict-free models come first.",
  },
  {
    icon: PanelsTopLeft,
    title: "Interface Craft",
    body: "Software should be as clear and tactile to use as it is solid underneath. Ergonomics, responsiveness, and typography receive equal priority.",
  },
  {
    icon: Hammer,
    title: "First Principles",
    body: "Architected directly from protocol specifications and platform SDKs. Every project is built from scratch with deliberate design choices.",
  },
];

const h2Class =
  "max-w-3xl font-display text-4xl leading-[1.02] tracking-[-0.035em] text-balance text-ink-strong sm:text-5xl md:text-6xl";

export default function Home() {
  const caseStudyCount = projects.filter((p) => p.caseStudy).length;

  return (
    <>
      <section
        id="intro"
        data-rail="Intro"
        className="relative flex min-h-[calc(100svh-3.5rem)] items-center justify-center overflow-hidden"
      >
        <HeroOrbit />
        <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center">
          <p className="animate-reveal font-display text-[clamp(2.5rem,9vw,6.5rem)] leading-[0.9] font-extrabold tracking-[-0.03em] text-ink-strong uppercase [font-stretch:125%]">
            Ananmay Jha
          </p>

          <h1 className="animate-reveal mt-8 max-w-2xl font-display text-3xl leading-[1.12] tracking-[-0.03em] text-ink-strong [animation-delay:90ms] sm:text-4xl">
            Software engineer crafting native mobile apps, desktop systems, and developer tools.
          </h1>

          <p className="animate-reveal mt-5 max-w-lg text-base leading-relaxed text-muted [animation-delay:180ms] sm:text-lg">
            Focused on Clean Architecture, offline-first persistence, and software that sits close
            to the system. Built to be fast, maintainable, and secure by design.
          </p>

          <div className="animate-reveal mt-8 flex flex-wrap justify-center gap-3 [animation-delay:260ms]">
            <a href="#work" className="btn btn-solid">
              <LayoutGrid size={14} aria-hidden="true" />
              Explore the work
            </a>
            <TransitionLink to="/about" className="btn btn-outline">
              About &amp; Background
              <ArrowRight size={14} aria-hidden="true" />
            </TransitionLink>
            <a href={contact.resume} target="_blank" rel="noreferrer" className="btn btn-outline">
              <FileText size={14} aria-hidden="true" />
              Résumé
            </a>
          </div>

          <div className="animate-reveal mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 [animation-delay:340ms]">
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="hud-label flex items-center gap-2 text-faint transition-colors hover:text-ink"
            >
              <GithubMark size={12} />
              Open source on GitHub
            </a>
            <span className="hud-label text-faint">Kotlin · C# · Python</span>
            <span className="hud-label text-faint">New Delhi &amp; Vellore, India</span>
          </div>
        </div>
      </section>

      <Section id="work" index="01" label="Work" aside={`${projects.length} Projects · ${caseStudyCount} Case Studies`}>
        <SectionReveal className="border-b border-line px-6 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <h2 className={h2Class}>
                Featured systems. <span className="text-accent-ink">Built</span> from scratch.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                From cryptographic password vaults and offline financial intelligence engines to
                multi-threaded download accelerators. Deep case studies with system architecture
                diagrams, plus open-source codebases.
              </p>
            </div>
            <TransitionLink to="/work" className="btn btn-outline shrink-0">
              Browse with filters
              <ArrowRight size={14} aria-hidden="true" />
            </TransitionLink>
          </div>
        </SectionReveal>
        <WorkIndex />
      </Section>

      <Section id="platforms" index="02" label="Platforms" aside="Engineering Scope">
        <div className="grid lg:grid-cols-[1.3fr_1fr]">
          <SectionReveal className="px-6 py-16 sm:px-8 sm:py-24">
            <h2 className={h2Class}>
              Three environments. <span className="text-accent-ink">One</span> architectural standard.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              I choose native technologies that provide direct control over system capabilities and
              memory. Clean Architecture remains the constant across all three: presentation layers
              remain thin, business logic is purely isolated, and persistence is resilient to
              intermittent connectivity.
            </p>
            <TransitionLink to="/about" className="btn btn-outline mt-8">
              Technical stack &amp; credentials
              <ArrowRight size={14} aria-hidden="true" />
            </TransitionLink>
          </SectionReveal>

          <dl className="flex flex-col border-t border-line lg:border-t-0 lg:border-l">
            {platforms.map((platform, i) => (
              <div
                key={platform.label}
                className="flex flex-1 flex-col justify-center border-b border-line px-6 py-6 last:border-b-0 sm:px-8"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="flex items-baseline gap-4">
                    <span className="hud-label text-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-xl text-ink-strong">{platform.label}</span>
                  </dt>
                  <dd className="hud-label text-right text-accent-ink">{platform.detail}</dd>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{platform.description}</p>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section id="principles" index="03" label="Principles" aside="Core Philosophy">
        <SectionReveal className="border-b border-line px-6 py-16 sm:px-8 sm:py-20">
          <h2 className={h2Class}>
            Engineered to be <span className="text-accent-ink">solid &amp; maintainable.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            The same standards apply whether engineering a security-critical client, a systems
            accelerator, or a personal utility.
          </p>
        </SectionReveal>
        <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle, i) => (
            <li key={principle.title} className="bg-bg p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center border border-line-strong text-accent-ink">
                  <principle.icon size={16} aria-hidden="true" />
                </span>
                <span className="hud-label text-faint">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-8 font-display text-xl tracking-[-0.02em] text-ink-strong">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{principle.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="about-preview" index="04" label="Background" aside="Education &amp; Experience">
        <SectionReveal className="px-6 py-16 sm:px-8 sm:py-24">
          <p className="hud-label text-faint">Background &amp; Profile</p>
          <h2 className={`${h2Class} mt-6`}>
            Systems, security, and <span className="text-accent-ink">software craft.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Currently pursuing Computer Science &amp; Technology with a specialization in
            Information Security at Vellore Institute of Technology. Background includes enterprise
            internship experience, active open-source contributions, and professional cloud
            certifications.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TransitionLink to="/about" className="btn btn-solid">
              Read background &amp; experience
              <ArrowRight size={14} aria-hidden="true" />
            </TransitionLink>
            <a href={contact.resume} target="_blank" rel="noreferrer" className="btn btn-outline">
              <FileText size={14} aria-hidden="true" />
              Download résumé
            </a>
          </div>
        </SectionReveal>
      </Section>
    </>
  );
}
