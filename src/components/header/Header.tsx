"use client";

import Link from "next/link";
import { SiInstagram, SiTwitter } from "react-icons/si";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import HoveredSelector from "../HoveredSelector";

export default function Header() {
  const y = useRef(0);
  const [hovered, setHovered] = useState<null | number>(null);
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("up");
  const pathName = usePathname();
  const paths = ["home", "gallery", "contact"];

  function onScroll(e: any) {
    const w = e.currentTarget;
    if (y.current == null) return;
    if (y.current > w.scrollY) setScrollDirection("up");
    else setScrollDirection("down");
    y.current = w.scrollY;
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={` px-4 w-screen h-16 text-xl font-semibold fixed z-50 backdrop-blur-lg bg-dark-blue/50 flex justify-between top-0 transition-all border-b border-white/10 ${
        scrollDirection == "down" ? " -translate-y-20" : ""
      }`}>
      <div className="w-36 hidden md:flex"></div>
      <div className="flex flex-row h-full items-center">
        {paths.map((el, index) => {
          const currentPath = index == 0 ? "/" : "/" + el;
          return (
            <Link
              key={index}
              href={currentPath}
              className="relative w-24  md:w-36 py-2 h-full flex items-center justify-center text-white/70 hover:text-white transition-all"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}>
              <h4 className={` capitalize ${pathName == currentPath ? "text-white" : ""}`}>{el}</h4>
              <div
                className={`${
                  currentPath == pathName ? " w-1/2" : "w-0"
                } h-[1px] bg-white absolute bottom-0 transition-all`}></div>
              <HoveredSelector hovered={hovered === index} className="top-2 bottom-2" />
            </Link>
          );
        })}
      </div>
      <div className="hidden md:flex flex-row h-full items-center justify-end">
        <a
          href={"https://www.instagram.com/_swaggymarie"}
          target="_blank"
          className="relative cursor-pointer h-full flex items-center justify-center w-8 md:w-16 transition-all text-white/70 hover:text-white"
          onMouseEnter={() => setHovered(3)}
          onMouseLeave={() => setHovered(null)}>
          <SiInstagram className="text-2xl" />
          <HoveredSelector hovered={hovered === 3} className="top-2 bottom-2" />
        </a>
        <a
          href={"https://www.twitter.com/swagy_marie"}
          target="_blank"
          className="relative cursor-pointer h-full flex items-center justify-center w-8 md:w-16 transition-all text-white/70 hover:text-white"
          onMouseEnter={() => setHovered(4)}
          onMouseLeave={() => setHovered(null)}>
          <SiTwitter className="text-2xl" />
          <HoveredSelector hovered={hovered === 4} className="top-2 bottom-2" />
        </a>
      </div>
    </header>
  );
}
