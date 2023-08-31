"use client";

import { GalleryElement } from "@/types/types";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { iconComponentMap } from "@/lib/iconComponents";
import Tooltip from "@/components/Tooltip";

const dropIn = {
  hidden: {
    scale: 0.2,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    scale: 0.2,
    opacity: 0,
  },
};

export default function Element({ element, expand=true }: { element: GalleryElement, expand: boolean }) {
  const [isLoading, setLoading] = useState(true);
  const [selected, setSelected] = useState(false);
  const modal = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      layout
      className="group overflow-hidden md:cursor-pointer relative w-full"
    >
      <Image
        alt="image"
        src={element.url}
        className={`rounded-md object-cover w-full h-auto group-hover:opacity-60 relative inline-block`}
        onClick={() => setSelected(true)}
        width={500}
        height={350}
        onLoad={() => setLoading(false)}
      />
      {isLoading && (
        <div
          className={`asbolute inset-0 z-40 rounded-2xl overflow-hidden shadow-xl relative bg-blue/10
            before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-neon-pink/20 before:to-transparent before:animate-[shimmer_2s_infinite]`}
        />
      )}
      {!isLoading && (
        <>
          <div className="absolute top-2 left-2 w-fit flex flex-row gap-2 z-20 group-hover:opacity-100 opacity-0">
            {element.softwares.map((el, i) => {
              const delay = 0;
              const IconComponent = iconComponentMap[el];

              return (
                <>
                  {IconComponent && (
                    // <Tooltip text={el}>
                      <IconComponent size={24} key={i}/>
                    // </Tooltip>
                  )}
                </>
              );
            })}
          </div>
        </>
      )}
      {expand && selected && (
        <motion.div
          id="my_modal_2"
          className="fixed inset-0 h-screen w-screen flex items-center justify-center bg-black/60 z-50 backdrop-blur-sm p-12"
          ref={modal}
          onClick={() => setSelected(false)}
        >
          <motion.div
            className="relative h-full"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Image
              alt={element.type}
              src={element.url}
              className="object-contain block bg-black h-full w-auto "
              width={1024}
              height={1024}
              onClick={(e) => e.stopPropagation()}
            />
            <button className=" bg-black/20 p-2 rounded-full w-10 h-10 absolute z-50 right-2 top-2 text-sm hover:bg-black/70">
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
