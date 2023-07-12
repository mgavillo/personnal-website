"use client";
import { useEffect, useRef } from "react";
import { iconComponentMap } from "@/lib/iconComponents";
import { useState } from "react";

export default function Skill({
  name,
  percentage,
  items,
}: {
  name: string;
  percentage: number;
  items: string[];
}) {
  const [cardActive, setCardActive] = useState(false)
  const barRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!barRef.current) return;
    barRef.current.style.width = `calc( ${percentage}% + 10px`;
  }, [percentage]);

  const IconComponent = iconComponentMap[name];


  return (
    <div ref={ref} className="group p-4 rounded-lg bg-dark-blue text-2xl w-32 h-32 overflow-y-scroll flex flex-col items-center justify-around cursor-pointer text-gray-400 hover:bg-black group hover:text-white hover:shadow-box-xs hover:text-4xl " >
      {IconComponent ? (
        <IconComponent className="" />
      ) : <div className=" capitalize font-bold ">{name[0]}</div>}
      <p className="font-semi-bold text-sm text-center">{name}</p>
      {/* <div className="w-full mt-1 h-1 border border-blue rounded-md shadow-box-xs shadow-blue/40 overflow-hidden ">
        <div
          ref={barRef}
          className=" transition-all w-0 h-full bg-gradient-to-r from-blue to-neon-pink/80"
        ></div>
      </div> */}
    </div>
  );
}
