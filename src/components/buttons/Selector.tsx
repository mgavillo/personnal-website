import { MouseEventHandler, ReactElement, ReactNode, createElement } from "react";
import Tooltip from "../Tooltip";
import { IconType } from "react-icons";

interface SelectorParams {
  selected: boolean;
  onClick?: MouseEventHandler;
  className?: string;
  content: string;
  icon?: IconType | undefined;
}

export default function Selector({ selected, onClick, className, content, icon }: SelectorParams) {
  const Button = ({ children }: { children: ReactNode | string }) => (
    <button
      className={`relative bg-dark-blue border border-white/10 rounded-md text-center cursor-pointer hover:bg-transparent flex items-center justify-center p-3 hover:bg-gradient-to-r hover:from-blue/20 hover:to-neon-blue/30 ${
        selected ? "bg-gradient-to-r from-blue/60 to-neon-blue/60" : "text-gray-400"
      }`}
      onClick={onClick}>
      {children}
    </button>
  )

  if (icon)
    return (
      <Tooltip text={content}>
        <Button>{createElement(icon)}</Button>
      </Tooltip>
    );
  else return <Button>{content}</Button>;
}

