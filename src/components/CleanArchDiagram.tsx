import { useState } from "react";
import { ArrowDown, ArrowUp, Code2, Layers, ShieldCheck } from "lucide-react";

type LayerDetail = {
  name: string;
  sub: string;
  badge: string;
  direction: string;
  components: string[];
  rules: string;
  technologies: string[];
};

const layers: LayerDetail[] = [
  {
    name: "Presentation Layer",
    sub: "Declarative UI & State Hoisting",
    badge: "Outer Layer",
    direction: "Depends strictly inward on Domain Use Cases",
    components: [
      "Jetpack Compose UI (Stateless Composables)",
      "MVI / MVVM ViewModels with Unidirectional Data Flow",
      "Immutable StateFlow<UiState> & SharedFlow<UiEvent>",
      "Zero direct reference to Database or Network APIs",
    ],
    rules: "Transforms domain entities into immutable view representations; emits user intents inward.",
    technologies: ["Jetpack Compose", "StateFlow", "Navigation Compose", "ViewModel"],
  },
  {
    name: "Domain Layer (Core)",
    sub: "Pure Business Rules & Cryptographic Contracts",
    badge: "Protected Core",
    direction: "Zero outward dependencies (Pure Kotlin stdlib)",
    components: [
      "Use Cases / Interactors (e.g., DecryptVaultCipherUseCase)",
      "Domain Entities & Cryptographic Value Objects",
      "Repository Interfaces (e.g., IVaultRepository, ICryptoEngine)",
      "Strict Result<T, DomainError> functional returns",
    ],
    rules: "Contains zero Android framework imports (`android.*`). Remains 100% unit-testable on JVM.",
    technologies: ["Pure Kotlin", "Coroutines", "Domain Entities", "Repository Interfaces"],
  },
  {
    name: "Data & Infrastructure Layer",
    sub: "Persistence, Cryptography & Network Sources",
    badge: "Outer Adapter",
    direction: "Implements Domain Repository interfaces (Inversion of Control)",
    components: [
      "Repository Implementations (e.g., VaultRepositoryImpl)",
      "SQLCipher encrypted Room Database & Data Access Objects (DAOs)",
      "Retrofit2 / OkHttp API clients with token rotation interceptors",
      "Android KeyStore hardware backing & Biometric CryptoObjects",
    ],
    rules: "Maps raw network DTOs and database models into pure domain models before returning inward.",
    technologies: ["Room", "SQLCipher", "Android KeyStore", "Hilt DI", "Retrofit"],
  },
];

export default function CleanArchDiagram() {
  const [activeLayer, setActiveLayer] = useState<number>(1); // default to Domain

  const current = layers[activeLayer];

  return (
    <figure className="mt-10 border border-line bg-bg-sunken">
      <figcaption className="hud-label flex flex-wrap items-center justify-between gap-2 border-b border-line bg-bg-raised px-5 py-3 text-faint">
        <span className="flex items-center gap-2">
          <Layers size={13} className="text-accent-ink" />
          Clean Architecture Boundary Specification
        </span>
        <span className="text-[10px] text-muted">Dependency Rule: Outer → Inner Core</span>
      </figcaption>

      {/* Layer Hierarchy Visualizer */}
      <div className="grid-paper p-5 sm:p-8">
        <div className="mx-auto flex max-w-2xl flex-col gap-3">
          {layers.map((layer, idx) => {
            const isSelected = activeLayer === idx;
            const isCore = idx === 1;

            return (
              <button
                key={layer.name}
                type="button"
                onClick={() => setActiveLayer(idx)}
                className={`group relative flex w-full flex-col p-4 text-left transition-all sm:p-5 ${
                  isSelected
                    ? isCore
                      ? "border-2 border-accent bg-accent/10 shadow-lg"
                      : "border-2 border-ink-strong bg-bg-raised shadow-md"
                    : "border border-line bg-bg hover:border-line-strong hover:bg-bg-raised"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={`hud-label flex size-6 items-center justify-center border font-mono text-[10px] font-bold ${
                        isSelected
                          ? isCore
                            ? "border-accent bg-accent text-white"
                            : "border-ink-strong bg-ink-strong text-invert-fg"
                          : "border-line text-muted"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <span className="font-display text-base font-bold text-ink-strong sm:text-lg">
                      {layer.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hud-label text-[10px] text-faint">{layer.badge}</span>
                    {idx === 0 && <ArrowDown size={14} className="text-accent-ink" />}
                    {idx === 2 && <ArrowUp size={14} className="text-accent-ink" />}
                    {idx === 1 && (
                      <span className="flex size-4 items-center justify-center rounded-full bg-accent/20 text-accent-ink">
                        <ShieldCheck size={12} />
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-1 text-xs text-muted">{layer.sub}</p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {layer.technologies.map((t) => (
                    <span key={t} className="tag text-[9px]">
                      {t}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Layer Technical Inspector */}
        <div className="mx-auto mt-6 max-w-2xl border border-line bg-bg p-5 sm:p-6">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <span className="hud-label text-accent-ink">
              Layer Spec: {current.name}
            </span>
            <span className="hud-label text-[10px] text-faint">
              {current.direction}
            </span>
          </div>

          <div className="mt-4">
            <p className="hud-label text-[10px] text-faint">Key Components &amp; Responsibilities</p>
            <ul className="mt-2 space-y-2">
              {current.components.map((item) => (
                <li key={item} className="flex gap-2.5 text-xs text-ink/90 sm:text-sm">
                  <span className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 border-t border-line pt-3">
            <p className="hud-label text-[10px] text-faint">Architectural Boundary Enforcement</p>
            <p className="mt-1 font-mono text-xs text-muted">{current.rules}</p>
          </div>
        </div>

        {/* Data flow footer */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-center">
          <Code2 size={13} className="text-accent-ink" />
          <p className="hud-label text-[10px] text-faint">
            Unidirectional Data Flow: UI Event → ViewModel → Domain UseCase → Repository → Immutable ViewState
          </p>
        </div>
      </div>
    </figure>
  );
}
