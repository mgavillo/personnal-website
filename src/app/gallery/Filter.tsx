"use client";
import { useState } from "react";
import { elementCat } from "./elementCategories";
import { useRouter } from "next/navigation";

function CheckBox({ name, checked,  onChange}: { name: string, checked: boolean, onChange: (name: string) => void; }) {
  return (
    <label className="flex flex-row gap-2 items-center" onChange={() => onChange(name)}>
      <input
        id="default-checkbox"
        type="checkbox"
        checked={checked}
        className={`w-4 h-4 rounded-full border ring-0  ${
          checked
            ? "  border-2 border-blue"
            : " bg-dark-blue hover:bg-white/25 border-white"
        } checked:bg-blue checked:before:bg-transparent from-neon-pink via-blue to-white hover:bg-blend-lighten focus:outline-transparent focus:border-0`}
        // } checked:bg-gradient-radial from-neon-pink via-blue to-white hover:bg-blend-lighten focus:outline-transparent focus:border-0`}
      />
      {name}
    </label>
  );
}
export default function Filter() {
  const [categories, setCategories] = useState(elementCat);
  const router = useRouter();

  function handleCheckboxChange(name: string) {
    const isChecked = categories.includes(name);
    let _cat = categories;
    if (isChecked) {
      _cat = _cat.filter((cat) => cat !== name);
      setCategories(_cat);
    } else {
      _cat.push(name);
    }
    setCategories(_cat);
    console.log(_cat.length)
    if(_cat.length == 0)
        router.push("/gallery/?categories=none")
    else
        router.push(`/gallery/?categories=${_cat.toString().replaceAll(" ", "")}`);
  }

  return (
    <div className="w-fit rounded-sm fixed top-24 left-12 flex flex-col hover:bg-blend-multiply gap-1 p-4">
      {elementCat.map((el, i) => (
        <CheckBox name={el} onChange={handleCheckboxChange} checked={categories.includes(el)}/>
      ))}
    </div>
  );
}
