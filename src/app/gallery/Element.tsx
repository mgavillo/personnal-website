"use client"

import Image from "next/image";
import { useState } from "react";

export default function Element() {
    const [isLoading, setLoading] = useState(true);

  return (
    <div className="group overflow-hidden cursor-pointer">
      <Image
        alt="image"
        src={"https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"}
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
