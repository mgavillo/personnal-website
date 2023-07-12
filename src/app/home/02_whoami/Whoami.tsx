"use client";

import CanvasWrapper from "./Canvas";
import Infos from "./Infos";
import Arrow from "./Arrow";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import AnimatedLetters from "@/components/AnimatedLetters";
import useOnScreen from "@/lib/useOnScreen";

export default function Whoami() {
  const sectionRef = useRef(null);

  const [rotation, setRotation] = useState<null | "left" | "right">(null);
  const isOnScreen = useOnScreen(sectionRef);
  return (
    <section className="w-full h-screen px-24 snap-center" ref={sectionRef}>
      {isOnScreen && (
        <h2 className="flex flex-row items-center gap-2">
          <span className="text-neon-pink">{"→ "}</span>
          <AnimatedLetters text="whoami ?" />
        </h2>
      )}
      {/* <h2 className="mb-8">My name is Marie</h2> */}
      <div className="flex flex-row justify-around">
        <div id="character-wraper" className="flex flex-row gap-10 items-center overflow-visible">
          {/* <Arrow
            side="left"
            onPointerDown={() => setRotation("left")}
            onPointerUp={() => setRotation(null)}
          />

          <div
            id="character-container"
            className="relative h-[550px] w-[450px] rounded-md bg-gradient-to-tr from-neon-pink to-blue border-1 border-blue p-1 shadow-box shadow-blue"
          > */}
          {/* <div className="bg-black w-full h-full" /> */}
          {/* <div className="absolute h-full w-[450px] top-0"> */}
          <CanvasWrapper rotation={rotation} />
          {/* </div>
          </div> */}
          {/* <Arrow
            side="right"
            onPointerDown={() => setRotation("right")}
            onPointerUp={() => setRotation(null)}
          /> */}
        </div>
        <Infos />
      </div>
    </section>
  );
}
