import {
  useRef,
  type CSSProperties,
  type ReactNode,
  type ElementType,
  type ComponentPropsWithoutRef,
} from "react";

type MagneticProps<T extends ElementType> = {
  as?: T;
  strength?: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className" | "style">;

const finePointer =
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
const reducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Magnetic<T extends ElementType = "a">({
  as,
  strength = 14,
  children,
  className,
  style,
  ...rest
}: MagneticProps<T>) {
  const ref = useRef<HTMLElement>(null);
  const Component = (as || "a") as ElementType;

  if (!finePointer || reducedMotion) {
    return (
      <Component className={className} style={style} {...rest}>
        {children}
      </Component>
    );
  }

  const handleMove = (e: React.MouseEvent) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    node.style.transform = `translate(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px)`;
  };

  const handleLeave = () => {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "translate(0, 0)";
  };

  return (
    <Component
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{ transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1)", ...style }}
      {...rest}
    >
      {children}
    </Component>
  );
}
