"use client"
import { useState } from "react";
import { elementCat } from "./elementCategories";

function CheckBox({ name }: { name: string }) {
    const [checked, setChecked] = useState(true)
  return (
    <label className="flex flex-row gap-2 items-center">
      <input
        id="default-checkbox"
        type="checkbox"
        checked={checked}
        onChange={ () => setChecked(!checked)}
        className={`w-4 h-4 rounded-full border ring-0  ${checked ? "  border-2 border-blue": " bg-dark-blue hover:bg-white/25 border-white"} checked:bg-gradient-radial from-neon-pink via-blue to-white hover:bg-blend-lighten focus:outline-transparent focus:border-0`}
      />
      {name}
    </label>
  );
}
export default function Filter() {
  return (
    <div className="w-fit rounded-sm fixed top-24 left-12 flex flex-col hover:bg-blend-multiply gap-1 p-4">
      {elementCat.map((el, i) => (
        <CheckBox name={el} />
      ))}
    </div>
  );
}
