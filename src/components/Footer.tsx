import { ArrowUpRight, Mail } from "lucide-react";
import { contact, projects } from "../data/projects";
import TransitionLink from "./TransitionLink";
import Logo from "./Logo";

const elsewhere = [
  { label: "GitHub", href: contact.github },
  { label: "LinkedIn", href: contact.linkedin },
  { label: "Instagram", href: contact.instagram },
  { label: "Full Résumé (PDF)", href: contact.resume },
];

const pages = [
  { label: "Home", to: "/" },
  { label: "Work & Projects", to: "/work" },
  { label: "About & Background", to: "/about" },
];

const linkClass = "text-sm text-muted transition-colors hover:text-ink-strong";

export default function Footer() {
  return (
    <footer>
      <section id="contact" data-rail="Contact" className="border-t border-line">
        <div className="frame px-6 py-20 sm:px-8 sm:py-28">
          <p className="hud-label text-faint">Contact &amp; Inquiries · New Delhi &amp; Vellore, India</p>
          <h2 className="mt-6 max-w-4xl font-display text-5xl leading-[0.98] tracking-[-0.04em] text-ink-strong sm:text-6xl md:text-7xl">
            Let&apos;s build something <span className="text-accent-ink">solid.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Interested in discussing software architecture, security, native client systems, or potential
            engineering opportunities? Reach out directly via email or connect on LinkedIn.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${contact.email}`} className="btn btn-solid">
              <Mail size={14} aria-hidden="true" />
              {contact.email}
            </a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline">
              LinkedIn Profile
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a href={contact.resume} target="_blank" rel="noreferrer" className="btn btn-outline">
              View Résumé
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <div className="border-t border-line">
        <div className="frame grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="bg-bg p-6 sm:p-8">
            <span className="text-ink-strong">
              <Logo size={28} />
            </span>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Ananmay Jha — Native Systems &amp; Mobile Software Engineer. Information Security @ VIT · Prev. PowerGrid Corporation of India.
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="hud-label mt-5 inline-block text-faint transition-colors hover:text-ink"
            >
              {contact.email}
            </a>
          </div>

          <nav aria-label="Pages" className="bg-bg p-6 sm:p-8">
            <p className="hud-label text-faint">Navigation</p>
            <ul className="mt-5 space-y-2.5">
              {pages.map((page) => (
                <li key={page.to}>
                  <TransitionLink to={page.to} className={linkClass}>
                    {page.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Case Studies" className="bg-bg p-6 sm:p-8">
            <p className="hud-label text-faint">Case Studies</p>
            <ul className="mt-5 space-y-2.5">
              {projects
                .filter((p) => p.caseStudy)
                .map((project) => (
                  <li key={project.slug}>
                    <TransitionLink to={`/work/${project.slug}`} className={linkClass}>
                      {project.name}
                    </TransitionLink>
                  </li>
                ))}
            </ul>
          </nav>

          <nav aria-label="Elsewhere" className="bg-bg p-6 sm:p-8">
            <p className="hud-label text-faint">Network</p>
            <ul className="mt-5 space-y-2.5">
              {elsewhere.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noreferrer" className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="frame flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-5 sm:px-8">
          <p className="hud-label text-faint">© {new Date().getFullYear()} Ananmay Jha · All rights reserved</p>
          <p className="hud-label text-faint">Vite · React 19 · TypeScript · Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
