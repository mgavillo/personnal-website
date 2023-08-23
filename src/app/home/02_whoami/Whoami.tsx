"use client";

import CanvasWrapper from "./Canvas";
import { Suspense, useRef, useState } from "react";
import { motion } from "framer-motion";
import AnimatedLetters from "@/components/AnimatedLetters";
import useOnScreen from "@/lib/useOnScreen";
import Waves3 from "@/components/backgrounds/Waves3";

export default function Whoami() {
  const sectionRef = useRef(null);
  const isOnScreen = useOnScreen(sectionRef);

  return (
    <section className="items-start" ref={sectionRef}>
      {isOnScreen && (
        <h2 className="flex flex-row items-center gap-2">
          <span className="text-neon-pink">{"→ "}</span>
          <AnimatedLetters text="whoami ?" />
        </h2>
      )}
      <div className="flex flex-row justify-around">
        {/* <div id="character-wraper" className="flex flex-row gap-10 items-center overflow-visible"> */}
          <Suspense fallback="">
            <CanvasWrapper />
          </Suspense>
        {/* </div> */}
        {/* <Infos /> */}
      </div>
    </section>
  );
}
