'use client'
import Element from "./Element";
import { GalleryElement } from "@/types/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Grid({
  data,
}: {
  data: GalleryElement[];
}) {

  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== "undefined" && window.innerWidth <= 767.98);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(typeof window !== "undefined" && window.innerWidth <= 767.98);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return (
    <motion.div layout layoutRoot className="mt-4 gap-4 md:columns-xs columns-sm w-full">
      {data?.map((e, i) => (
        <div key={i} className="flex flex-col mb-4 gap-2">
          <Element element={e} expand={isMobile}/>
        </div>
      ))}
    </motion.div>
  );
}
