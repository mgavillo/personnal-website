"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import useOnScreen from "@/lib/useOnScreen";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
  useAnimation,
  useInView,
} from "framer-motion";
import { useParallax } from "@/lib/useParallax";

const LightInDark = dynamic(
  () => import("./LightInDark").then((mod) => mod.LightInDark),
  {
    loading: () => <p>Dynamically loading my canvas component...</p>,
    ssr: false,
  }
);

const OrderInChaos = dynamic(
  () => import("./OrderInChaos").then((mod) => mod.OrderInChaos),
  {
    loading: () => <p>Dynamically loading my canvas component...</p>,
    ssr: false,
  }
);

const animationVariant = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 120,
      damping: 12,
    },
  },
};

export default function Dual3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(containerRef);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useParallax(scrollYProgress, 200);
  const controls = useAnimation();
  const isInView = useInView(containerRef);

  return (
    <section
      className="w-full h-screen flex flex-row justify-center items-center relative px-24 snap-center"
      ref={containerRef}
    >
      <div
        id="dual-left"
        className="relative w-1/2 h-4/6 -mr-32 overflow-visible"
        // initial={{width: "100%"}} whileInView={{width:"50%"}}
      >
        <motion.h2 className="absolute top-0 left-0 z-40 -mt-14 w-[1200px] pointer-events-none">
          <span className="bg-gradient-to-r from-neon-violet to-neon-blue text-white/25 bg-clip-text">Play</span> with the light
        </motion.h2>

        <motion.div
          style={{
            // transform: isInView ? "none" : "translateX(-200px)",
            // opacity: isInView ? 1 : 0,
            // transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
        >
          <div
            className="absolute inset-0 bg-blue -z-10"
            style={{ clipPath: "polygon(0 0, 100% 0%, 75% 100%, 0 100%)" }}
          ></div>
          <LightInDark isOnScreen={isOnScreen} />
        </motion.div>
      </div>
      <div id="dual-right" className="relative w-1/2 h-4/6">
        <div
          className="absolute inset-0 bg-blue -z-10"
          style={{ clipPath: "polygon(25% 0, 100% 0%, 100% 100%, 0 100%)" }}
        />
        <OrderInChaos isOnScreen={isOnScreen} />
        <motion.h2 className="absolute bottom-0 right-0 z-40 -mb-11">
          <span className=" bg-gradient-to-r from-neon-violet to-neon-blue text-white/25 bg-clip-text ">Find</span> order in chaos
        </motion.h2>
      </div>
    </section>
  );
}
