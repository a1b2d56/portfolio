import { Link, useNavigate, type LinkProps } from "react-router-dom";
import type { Ref } from "react";
import { navigateWithTransition } from "../lib/viewTransition";

type TransitionLinkProps = LinkProps & { ref?: Ref<HTMLAnchorElement> };

export default function TransitionLink({ to, onClick, ref, ...rest }: TransitionLinkProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault();
    navigateWithTransition(navigate, to as string);
  };

  return <Link ref={ref} to={to} onClick={handleClick} {...rest} />;
}
