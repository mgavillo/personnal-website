"use client";

import { GalleryElement } from "@/types/types";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Element({ element }: { element: GalleryElement }) {
  const [isLoading, setLoading] = useState(true);
  const [selected, setSelected] = useState(false);
  const modal = useRef<HTMLDivElement>(null);
  return (
    <div className="group overflow-hidden cursor-pointer relative">
      <Image
        alt="image"
        src={element.url}
        className={` rounded-md object-cover w-full h-auto group-hover:opacity-60 relative inline-block ${
          isLoading ? "grayscale blur " : "grayscale-0 blur-0"
        }`}
        // fill
        onClick={() => setSelected(true)}
        width={500}
        height={350}
        onLoadingComplete={() => setLoading(false)}
      />
      {selected && (
        <div
          id="my_modal_2"
          className="fixed inset-0 h-screen w-screen flex items-center justify-center bg-black/60 z-50 backdrop-blur-sm p-12"
          ref={modal}
          onClick={() => setSelected(false)}
        >
          <div className="relative h-full">
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
          </div>
        </div>
      )}
      <div className="absolute top-2 left-2 w-fit flex flex-row gap-2 z-20">
        {element.tags.map((tag, i) => {
          const delay = 0;
          return (
            <div
              className={`border rounded-xl border-white text-xs px-3 py-1 group-hover:opacity-100 opacity-0 transition duration-700`}
              style={{ transitionDelay: `${delay}ms` }}
              key={`tag-${i}`}
            >
              {tag}
            </div>
          );
        })}
      </div>
    </div>
  );
}
