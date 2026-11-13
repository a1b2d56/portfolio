import { useEffect, useState, type RefObject } from "react";
import { useLocation } from "react-router-dom";
import { Moon, Search, Sun } from "lucide-react";
import TransitionLink from "./TransitionLink";
import Logo, { GithubMark } from "./Logo";
import { contact } from "../data/projects";

type Theme = "dark" | "light";

function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === "light" ? "light" : "dark",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#f2f1ee" : "#121316");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage blocked - the choice just won't persist */
    }
  }, [theme]);

  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

const links = [
  { to: "/", label: "Home", match: (p: string) => p === "/", mobile: false },
  { to: "/work", label: "Work", match: (p: string) => p.startsWith("/work"), mobile: true },
  { to: "/about", label: "About", match: (p: string) => p === "/about", mobile: true },
];

export default function Nav({
  onOpenPalette,
  paletteTriggerRef,
}: {
  onOpenPalette: () => void;
  paletteTriggerRef: RefObject<HTMLButtonElement | null>;
}) {
  const { pathname } = useLocation();
  const [theme, toggleTheme] = useTheme();

  return (
    <header className="sticky top-0 left-0 z-50 w-full border-b border-line bg-bg/95 backdrop-blur-sm">
      <nav aria-label="Primary" className="flex h-14 items-stretch">
        <TransitionLink
          to="/"
          aria-label="Ananmay Jha — home"
          className="invert-block flex w-14 shrink-0 items-center justify-center border-r border-line text-ink-strong"
        >
          <Logo />
        </TransitionLink>

        <div className="flex min-w-0 items-center gap-1 px-2 sm:px-3">
          {links.map((link) => (
            <TransitionLink
              key={link.to}
              to={link.to}
              data-active={link.match(pathname)}
              aria-current={link.match(pathname) ? "page" : undefined}
              className={`invert-block hud-label px-2 py-1 text-muted ${link.mobile ? "" : "hidden sm:block"}`}
            >
              {link.label}
            </TransitionLink>
          ))}
          <a href="#contact" className="invert-block hud-label hidden px-2 py-1 text-muted sm:block">
            Contact
          </a>
        </div>

        <div className="ml-auto flex items-stretch">
          <button
            ref={paletteTriggerRef}
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command palette"
            className="invert-block hud-label flex items-center gap-2 border-l border-line px-4 text-muted"
          >
            <Search size={13} aria-hidden="true" />
            <span className="hidden md:inline">Search</span>
            <kbd className="hidden font-mono text-[10px] opacity-60 md:inline">Ctrl K</kbd>
          </button>
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="invert-block hidden w-12 items-center justify-center border-l border-line text-muted sm:flex"
          >
            <GithubMark size={15} />
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="invert-block flex w-12 items-center justify-center border-l border-line text-muted"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <a
            href={contact.resume}
            target="_blank"
            rel="noreferrer"
            className="hud-label flex items-center bg-invert-bg px-4 font-bold text-invert-fg transition-colors hover:bg-accent hover:text-white sm:px-6"
          >
            Résumé
          </a>
        </div>
      </nav>
    </header>
  );
}
