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
import { First,  } from "@mgavillo/r3f-lib";
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
     
     <div className="absolute top-0 h-screen w-screen -z-10">
      <Waves/>
      </div>

      {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-dark-blue/60 to-dark-blue z-20 pointer-events-none" style={{height: "100vh"}}></div> */}
      {/* <div className="absolute h-screen inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neon-violet via-blue to-dark-blue via-4:orange-500 -z-40 bg-opacity-5"></div> */}
    </motion.section>
  );
}
