import { Link, useNavigate, type LinkProps } from "react-router-dom";
import { navigateWithTransition } from "../lib/viewTransition";

export default function TransitionLink({ to, onClick, ...rest }: LinkProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault();
    navigateWithTransition(navigate, to as string);
  };

  return <Link to={to} onClick={handleClick} {...rest} />;
}
