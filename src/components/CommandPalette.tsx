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
      { label: "Home", hint: "page", action: go("/") },
      { label: "Work", hint: "page", action: go("/work") },
      { label: "About", hint: "page", action: go("/about") },
      ...projects.map((p) => ({
        label: p.name,
        hint: p.category,
        action: p.caseStudy ? go(`/work/${p.slug}`) : visit(p.href),
      })),
      { label: "GitHub", hint: "contact", action: visit(contact.github) },
      { label: "LinkedIn", hint: "contact", action: visit(contact.linkedin) },
      { label: "Email", hint: "contact", action: mail(contact.email) },
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
      className="fixed inset-0 z-[100] flex items-start justify-center bg-bg/70 px-4 pt-24 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="page-enter w-full max-w-lg overflow-hidden rounded-sm border border-border bg-surface-raised shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border-soft px-4 py-3">
          <span className="font-mono text-text-faint">/</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a page, project, or contact link…"
            className="w-full bg-transparent font-mono text-sm text-text placeholder:text-text-faint focus:outline-none"
          />
          <span className="font-mono text-[10px] text-text-faint">ESC</span>
        </div>
        <div className="max-h-80 overflow-y-auto py-2">
          {filtered.length === 0 && (
            <p className="px-4 py-6 text-center font-mono text-xs text-text-faint">
              No matches.
            </p>
          )}
          {filtered.map((item, i) => (
            <button
              key={item.label}
              type="button"
              onClick={item.action}
              onMouseEnter={() => setActiveIndex(i)}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-left font-mono text-sm transition-colors ${
                i === activeIndex
                  ? "bg-accent-soft text-accent"
                  : "text-text-muted hover:bg-surface"
              }`}
            >
              <span>{item.label}</span>
              <span className="text-[10px] uppercase tracking-[0.1em] text-text-faint">
                {item.hint}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
