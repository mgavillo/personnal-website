"use client"

import { GalleryElement } from "@/types/types";
import Image from "next/image";
import { useState } from "react";

export default function Element({element}: {element: GalleryElement}) {
    const [isLoading, setLoading] = useState(true);

    console.log("eleement")
  return (
    <div className="group overflow-hidden cursor-pointer">
      <Image
        alt="image"
        src={element.url}
        className={` rounded-md object-cover w-full h-auto group-hover:opacity-60 relative inline-block ${
          isLoading ? "grayscale blur " : "grayscale-0 blur-0"
        }`}
        // fill
        width={500}
        height={350}
        onLoadingComplete={() => setLoading(false)}
      />
      
    </div>
  );
}
