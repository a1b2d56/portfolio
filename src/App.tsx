import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, useRef, Suspense, lazy } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import ScrollRuler from "./components/ScrollRuler";
import SectionRail from "./components/SectionRail";
import Home from "./pages/Home";

const Work = lazy(() => import("./pages/Work"));
const About = lazy(() => import("./pages/About"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const NotFound = lazy(() => import("./pages/NotFound"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const paletteTriggerRef = useRef<HTMLButtonElement>(null);
  const [supportsViewTransitions] = useState(
    () => typeof document !== "undefined" && "startViewTransition" in document,
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Route chunks are code-split for initial load size, but a View
  // Transition navigating to a not-yet-loaded chunk would snapshot the
  // Suspense fallback (blank) as the "after" state - the transition plays
  // to nothing, then real content pops in outside the transition once the
  // chunk resolves. Pre-warming during idle time keeps the initial-load
  // win while avoiding that race for effectively all real navigations.
  useEffect(() => {
    const preload = () => {
      import("./pages/Work");
      import("./pages/About");
      import("./pages/CaseStudy");
      import("./pages/NotFound");
    };

    type WindowWithIdle = typeof window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const w = window as WindowWithIdle;

    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(preload);
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(preload, 1);
    return () => window.clearTimeout(id);
  }, []);

  const closePalette = () => {
    setPaletteOpen(false);
    paletteTriggerRef.current?.focus();
  };

  return (
    <div className="min-h-dvh">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[300] -translate-y-20 bg-invert-bg px-4 py-2 hud-label font-bold text-invert-fg transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Nav onOpenPalette={() => setPaletteOpen(true)} paletteTriggerRef={paletteTriggerRef} />
      <CommandPalette open={paletteOpen} onClose={closePalette} />
      <main
        id="main-content"
        tabIndex={-1}
        key={location.pathname}
        className={supportsViewTransitions ? undefined : "page-enter"}
      >
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ScrollRuler />
      <SectionRail />
    </div>
  );
}
