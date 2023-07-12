"use client";
import Selector from "@/components/buttons/HoverButton";
import Skill from "./Skill";
import { skills } from "./skills";
import useCharacterStore from "@/lib/zustandStore";
import { useEffect, useRef, useState } from "react";
import { useParallax } from "@/lib/useParallax";
import { motion, useScroll } from "framer-motion";
import { Reorder } from "framer-motion";

export default function Infos() {
  const { characterCat, setCharacterCat, incrCharacterCat, decrCharacterCat } = useCharacterStore();
  const ref = useRef<HTMLDivElement>(null);
  const top = useRef(0);
  // const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 100);

  // const handleScroll = () => {
  //   setScrollY(top.current - window.pageYOffset - ref.current.getBoundingClientRect().height/2 );
  // };

  // useEffect(() => {
  //   top.current = ref.current.getBoundingClientRect().top
  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      className="w-1/2 min-w-[150px] flex flex-col justify-start h-full border-white/20 rounded-md border-05 shadow-lg shadow-black"
      // style={{ transform: `translateY(${scrollY * -0.2}px)` }}
    >
      <div className="flex flex-row items-center border-white/20 border-b-05">
        <div className="flex flex-row gap-2 px-3">
          <div className="rounded-full w-3 h-3 border-white/20 " style={{ borderWidth: "0.5px" }} />
          <div className="rounded-full w-3 h-3 border-white/20   " style={{ borderWidth: "0.5px" }} />
          <div className="rounded-full w-3 h-3 border-white/20   " style={{ borderWidth: "0.5px" }} />
        </div>
        <div id="categories" className="flex flex-row justify-start items-end  w-full">
          {skills.map((el, i) => (
            <button
              className={`cursor-pointer p-3 px-6 bg-opacity-20 backdrop-blur-sm border-white/20 border-l-05 border-r-05 ${
                characterCat == i ? " bg-gradient-to-t from-neon-blue/20 to-transparent" : " bg-dark"
              }`}
              onClick={() => setCharacterCat(i)}>
              <h3 className="text-base ">{el.name}</h3>
            </button>
          ))}
        </div>
      </div>
      <div className="relative p-6  rounded-lg bg-gradient-to-t from-neon-blue/40 to-neon-blue/20 rounded-tl-none bg-opacity-20 backdrop-blur-sm h-[450px] overflow-y-scroll">

        <div className="flex flex-row flex-wrap w-full gap-2">
          {skills[characterCat].data.map((el, i) => (
            <Skill name={el.text} percentage={el.percent} items={el.items} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
