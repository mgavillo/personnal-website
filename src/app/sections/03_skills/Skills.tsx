"use client";
import Skill from "./Skill";
import { skillSet } from "./skillSet";
import useCharacterStore from "@/lib/zustandStore";
import { useRef } from "react";
import { useParallax } from "@/lib/useParallax";
import { motion, useScroll } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";

function Circle() {
  return <div className="rounded-full w-2 md:w-3 h-2 md:h-3 border-white/20 " style={{ borderWidth: "0.5px" }} />;
}

export default function Skills() {
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
    <section className="items-center justify-center pt-0 pb-24">
      <span className="w-full">
      <SectionTitle text="Skills"/>

      </span>
      <motion.div
        ref={ref}
        style={{ y }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        className="w-[355px] md:w-[800px] lg:w-[1000px] flex flex-col justify-start border-white/20 border-05 rounded-md shadow-lg shadow-black text-xs md:text-xl relative overflow-hidden">
        <div className="flex flex-row justify-start items-center border-white/20 border-b-05">
          <div className="flex flex-row gap-2 px-3">
            <Circle />
            <Circle />
            <Circle />
          </div>
          <div id="categories" className="flex flex-row justify-start">
            {skillSet.map((el, i) => (
              <button
                className={`cursor-pointer p-3 w-[97px] md:w-[160px] bg-opacity-20 backdrop-blur-sm border-white/20 border-l-05 border-r-05 font-semibold
                        ${characterCat == i ? " bg-gradient-to-t from-neon-blue/20 to-transparent" : " bg-dark"}`}
                onClick={() => setCharacterCat(i)}>
                {el.name}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full rounded-b-lg bg-gradient-to-t from-neon-blue/40 to-neon-blue/20 bg-opacity-20 backdrop-blur-sm h-[380px] md:h-[450px] overflow-y-scroll">
          <div className="box-content p-2 md:p-6 flex flex-row flex-wrap gap-1">
            {skillSet[characterCat].data.map((el, i) => (
              <Skill name={el.text} percentage={el.percent} items={el.items} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
