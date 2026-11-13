import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { projects, contact } from "../data/projects";
import { navigateWithTransition } from "../lib/viewTransition";

type Item = {
  label: string;
  hint: string;
  action: () => void;
};

export default function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const items = useMemo<Item[]>(() => {
    const go = (path: string) => () => {
      navigateWithTransition(navigate, path);
      onClose();
    };
    const visit = (url: string) => () => {
      window.open(url, "_blank", "noreferrer");
      onClose();
    };
    const mail = (address: string) => () => {
      window.location.href = `mailto:${address}`;
      onClose();
    };

    return [
      { label: "Home", hint: "Page", action: go("/") },
      { label: "Work & Projects", hint: "Page", action: go("/work") },
      { label: "About & Background", hint: "Page", action: go("/about") },
      { label: "Experience (PowerGrid)", hint: "Section", action: go("/about#experience") },
      { label: "Education (VIT)", hint: "Section", action: go("/about#education") },
      { label: "Certifications (Oracle OCI)", hint: "Section", action: go("/about#education") },
      { label: "Tech Stack & Skills", hint: "Section", action: go("/about#stack") },
      ...projects.map((p) => ({
        label: p.name,
        hint: p.caseStudy ? `Case Study · ${p.category}` : p.category,
        action: p.caseStudy ? go(`/work/${p.slug}`) : visit(p.href),
      })),
      { label: "GitHub Profile", hint: "External", action: visit(contact.github) },
      { label: "LinkedIn Profile", hint: "External", action: visit(contact.linkedin) },
      { label: "Email Ananmay", hint: "Contact", action: mail(contact.email) },
      { label: "Download Full Résumé", hint: "PDF Document", action: visit(contact.resume) },
    ];
  }, [navigate, onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) || item.hint.toLowerCase().includes(q),
    );
  }, [items, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const container = dialogRef.current;
    if (!container) return;
    const buttons = container.querySelectorAll<HTMLElement>("button");
    buttons[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        filtered[activeIndex]?.action();
      } else if (e.key === "Tab") {
        const container = dialogRef.current;
        if (!container) return;
        const focusables = container.querySelectorAll<HTMLElement>(
          'input, button:not([disabled]), [href]',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, activeIndex, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-bg-sunken/70 px-4 pt-24 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="page-enter w-full max-w-lg overflow-hidden border border-line-strong bg-bg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
          <span className="font-mono text-faint">/</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, case studies, technologies, credentials…"
            className="w-full bg-transparent font-mono text-sm text-ink placeholder:text-faint focus:outline-none"
          />
          <kbd className="hud-label border border-line px-1.5 py-0.5 text-faint">Esc</kbd>
        </div>
        <p role="status" aria-live="polite" className="sr-only">
          {filtered.length} result{filtered.length === 1 ? "" : "s"}
        </p>
        <div className="max-h-80 overflow-y-auto">
          {filtered.length === 0 && (
            <p className="hud-label px-4 py-8 text-center text-faint">
              No matching pages or commands.
            </p>
          )}
          {filtered.map((item, i) => (
            <button
              key={item.label}
              type="button"
              onClick={item.action}
              onMouseEnter={() => setActiveIndex(i)}
              className={`flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left text-sm transition-colors ${
                i === activeIndex
                  ? "bg-invert-bg text-invert-fg font-medium"
                  : "text-muted hover:text-ink"
              }`}
            >
              <span>{item.label}</span>
              <span className="hud-label shrink-0 text-[10px] opacity-60">
                {item.hint}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
