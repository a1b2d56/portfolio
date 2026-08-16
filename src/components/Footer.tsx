import { contact } from "../data/projects";
import Magnetic from "./Magnetic";

const links = [
  { label: "GitHub", href: contact.github, external: true },
  { label: "LinkedIn", href: contact.linkedin, external: true },
  { label: "Email", href: `mailto:${contact.email}`, external: false },
  { label: "Resume", href: contact.resume, external: true },
  { label: "Instagram", href: contact.instagram, external: true },
];

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border-soft">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint">
          // Contact
        </p>
        <h2 className="mt-4 font-display text-2xl font-semibold text-balance sm:text-3xl">
          Get in touch.
        </h2>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {links.map((link) => (
            <Magnetic
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              strength={10}
              className="group inline-flex items-center gap-2 font-mono text-sm text-text-muted hover:text-accent transition-colors"
            >
              {link.label}
              <span className="text-text-faint transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </Magnetic>
          ))}
        </div>
        <p className="mt-16 font-mono text-[11px] text-text-faint">
          Ananmay Jha — New Delhi, India
        </p>
      </div>
    </footer>
  );
}
