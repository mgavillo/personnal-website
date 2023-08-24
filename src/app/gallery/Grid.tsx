'use client'
import Element from "./Element";
import { GalleryElement } from "@/types/types";
import { motion } from "framer-motion";

export default function Grid({
  data,
}: {
  data: GalleryElement[];
}) {

  return (
    <motion.div layout layoutRoot className="mt-4 gap-4 md:columns-xs columns-sm w-full">
      {data?.map((e, i) => (
        <div key={i} className="flex flex-col mb-4 gap-2">
          <Element element={e}/>
        </div>
      ))}
    </motion.div>
  );
}
