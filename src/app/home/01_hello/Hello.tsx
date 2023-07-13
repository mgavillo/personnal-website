"use client";
import "./Hello.css";
import Blob from "@/components/backgrounds/Blob";
import Waves1 from "@/components/backgrounds/Waves1";
import Waves2 from "@/components/backgrounds/Waves2";
// import Waves3 from "@/components/backgrounds/Waves3";
import Selector from "@/components/buttons/HoverButton";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import AnimatedLetters from "@/components/AnimatedLetters";
import TypedLetters from "@/components/TypedLetters";
import { Animations } from "@/components/Animations";
import { LightInDark } from "../04_dual3D/LightInDark";
import { useParallax } from "@/lib/useParallax";
import Waves from "./Waves";
import Waves3 from "@/components/backgrounds/Waves3";
import Waves4 from "@/components/backgrounds/Waves4";
export default function Hello() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.1]);
  const y = useParallax(scrollYProgress, 20);

  // const developerSize = useTransform(scrollYProgress, [0, 0.2], [1, 0.1])
  const [showSecondHeader, setShowSecondHeader] = useState(false);
  const subTexts = [
    "write specifications",
    "design figma mocks",
    "develop your website",
    "conceive data structures",
    "manage databases",
    "host and deploy",
  ];

  return (
    <motion.section className="w-screen h-screen flex items-center justify-center relative py-24" style={{height: "100vh"}} ref={ref} initial="hidden" animate="visible">
      {/* <LightInDark isOnScreen={true} /> */}
      {/* <div className="flex flex-col justify-start items-center">
        <p>Hello, i'm Marie</p>
        <h1 className=" w-[1200px] h-32 text-center bg-gradient-radial from-white from-30% to-blue/5 text-white text-opacity-50 bg-clip-text">
          Developer and designer
        </h1>
        <h3 className="text-left text-3xl ">
          I can help you{" "}
          <span className="bg-gradient-to-r from-neon-pink to-neon-blue text-white/25 bg-clip-text relative font-bold">
            write specifications
          </span>
        </h3>
      </div> */}
     <div className="absolute inset-0 z-30 pointer-events-none">
      <Waves/>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-dark-blue to-transparent -mb-48 z-40 pointer-events-none h-96"></div>
      {/* <div className="absolute h-screen inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neon-violet via-blue to-dark-blue via-4:orange-500 -z-40 bg-opacity-5"></div> */}
    </motion.section>
  );
}
