"use client";

import { MouseEventHandler, useEffect, useRef } from "react";
import "./HoverButton.css";
import setProp from "@/lib/setProps";

export default function HoverButton({
  children,
  className,
  border = 1,
  color = "white",
  width = 10,
  onClick,
  onPointerDown,
  onPointerUp,
  type = "button",
}: {
  children: React.ReactElement;
  className?: string;
  border?: number;
  color?: string;
  width?: number;
  onClick?: MouseEventHandler;
  onPointerUp?: any;
  onPointerDown?: any;
  type?: "button" | "reset" | "submit";
}) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    resetBorder();
  }, []);

  function _onPointerDown() {
    if (onPointerDown) onPointerDown();
    extraLongBorder();
  }

  function _onPointerUp() {
    if (onPointerUp) onPointerUp();
    longBorder();
  }
  function resetBorder() {
    if (ref.current) {
      setProp(ref.current, "b", border.toString() + "px");
      setProp(ref.current, "c", color);
      setProp(ref.current, "w", 0 + "px");
    }
  }
  function longBorder() {
    if (ref.current) {
      setProp(ref.current, "b", border.toString() + "px");
      setProp(ref.current, "c", color);
      setProp(ref.current, "w", width.toString() + "px");
    }
  }

  function extraLongBorder() {
    if (ref.current) {
      setProp(ref.current, "b", border.toString() + "px");
      setProp(ref.current, "c", color);
      setProp(ref.current, "w", width.toString() + "px");
    }
  }
  return (
    <button
      type={type}
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => longBorder()}
      onMouseLeave={() => resetBorder()}
      onPointerDown={_onPointerDown}
      onPointerUp={_onPointerUp}
      className={
        "box transition-all flex box-content active:scale-[0.85] items-center justify-center cursor-pointer select-none hover:mix-blend-hard-light " +
        className
      }>
      {children}
    </button>
  );
}
