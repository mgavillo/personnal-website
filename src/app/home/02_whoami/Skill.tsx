"use client"
import { useEffect, useRef } from "react";

export default function Skill({ name, percentage }: { name: string; percentage: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(()=> {
    if (!barRef.current) return;
    barRef.current.style.width = `calc( ${percentage}% + 10px`;
  }, [percentage])

  return (
    <div>
      <p>{name}</p>
      <div className="w-full transition-all h-2 border border-blue">
        <div ref={barRef} className="w-0 h-full bg-blue"></div>
      </div>
    </div>
  );
}