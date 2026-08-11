import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, useRef, Suspense, lazy } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";

const Work = lazy(() => import("./pages/Work"));
const About = lazy(() => import("./pages/About"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
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

  const closePalette = () => {
    setPaletteOpen(false);
    paletteTriggerRef.current?.focus();
  };

  return (
    <div className="min-h-dvh">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[300] -translate-y-20 rounded-sm border border-accent/50 bg-surface-raised px-4 py-2 font-mono text-sm text-accent transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <CustomCursor />
      <Nav onOpenPalette={() => setPaletteOpen(true)} paletteTriggerRef={paletteTriggerRef} />
      <CommandPalette open={paletteOpen} onClose={closePalette} />
      <main
        id="main-content"
        key={location.pathname}
        className={supportsViewTransitions ? undefined : "page-enter"}
      >
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
