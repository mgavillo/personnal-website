import { MouseEventHandler, ReactElement, ReactNode } from "react";
import HoverButton from "./HoverButton";

export default function Selector({
  children,
  selected,
  onClick,
  className
}: {
  children: ReactElement;
  selected: boolean;
  onClick?: MouseEventHandler;
  className?: string
}) {
  return (
    <HoverButton
      children={children}
      className={`px-6 py-2 ${selected ? " bg-neon-blue/40" : " bg-neon-violet/20 text-white/30"} ${className}` }
      onClick={onClick}
    />
  );
}
