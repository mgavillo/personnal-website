"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HiOutlineCursorArrowRays as HiOutlineCursor } from "react-icons/hi2";
import { PiSneakerMove } from "react-icons/pi";
import { MdRemove } from "react-icons/md";
import HoveredSelector from "@/components/HoveredSelector";
import Selector from "@/components/buttons/Selector";

function Row({ name, data, setCategories }: { name: string; data: string[]; setCategories: any }) {
  const [hovered, setHovered] = useState(false);
  const [checked, setChecked] = useState(true);
  const [childrenChecked, setChildrenChecked] = useState<boolean[]>(new Array(data.length).fill(true));
  const [indeterminate, setIndeterminate] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLLIElement>(null);

  useEffect(() => {
    let array = [...childrenChecked];
    array.fill(checked);
    setChildrenChecked(array);
  }, [checked]);

  useEffect(() => {
    let includesTrue = childrenChecked.includes(true);
    let includesFalse = childrenChecked.includes(false);
    if (includesFalse && !includesTrue) {
      ref.current.indeterminate = false;
      setChecked(false);
    } else if (!includesFalse && includesTrue) {
      setChecked(true);
      ref.current.indeterminate = false;
    } else if (includesFalse && includesTrue) ref.current.indeterminate = true;
    else ref.current.indeterminate = false;

    setCategories((categories: string[]) => {
      let _categories = [...categories];

      childrenChecked.map((el, i) => {
        let includes = _categories.includes(data[i]);
        if (el && !includes) {
          _categories.push(data[i]);
        } else if (!el && includes) {
          _categories = _categories.filter((el) => el !== data[i]);
        }
      });
      return _categories;
    });
  }, [childrenChecked]);

  function setIndividualChecked(index: number, value: boolean) {
    let array = [...childrenChecked];
    array[index] = value;
    console.log(array);
    setChildrenChecked(array);
  }

  function onMouseEnter(e: React.MouseEvent) {
    let rect = ref2.current.getBoundingClientRect();

    if (e.clientX > rect.x && e.clientX < rect.x + rect.width && e.clientY > rect.y && e.clientY < rect.y + rect.height)
      setHovered(true);
  }
  function onMouseLeave(e: React.MouseEvent) {
    setHovered(false);
  }

  return (
    <li
      ref={ref2}
      className={`relative w-full flex flex-row items-center gap-2 pt-2 border border-white/10 ${
        checked || indeterminate ? "text-white" : "text-gray-300"
      }`}
      onClick={() => setChecked(!checked)}
      onPointerEnter={(e) => onMouseEnter(e)}
      onMouseLeave={(e) => onMouseLeave(e)}>
      <div className="relative flex flex-col gap-2 w-full">
        <summary className="pl-2 flex flex-row gap-2 items-center cursor-pointer font-semibold select-none">
          <input
            type="checkbox"
            className="checkbox rounded-sm focus:ring-0 bg-dark-blue text-neon-blue/60"
            checked={checked}
            ref={ref}
            onChange={() => {}}
          />
          {name}
        </summary>
        <ul className="flex flex-col w-full">
          {data.map((el, index) => (
            <SubRow
              key={index}
              text={el}
              checked={childrenChecked[index]}
              setParentHovered={setHovered}
              setParentLeave={onMouseEnter}
              setChecked={(value) => setIndividualChecked(index, value)}
            />
          ))}
        </ul>
      </div>
      <HoveredSelector hovered={hovered} />
    </li>
  );
}

function SubRow({
  text,
  checked,
  setChecked,
  setParentHovered,
  setParentLeave,
}: {
  text: string;
  checked: boolean;
  setChecked: (boolean) => void;
  setParentHovered: any;
  setParentLeave: any;
}) {
  const [hovered, setHovered] = useState(false);
  function onChildrenClick(e: React.MouseEvent) {
    setChecked(!checked);
    e.stopPropagation();
  }

  function onMouseEnter(e: React.MouseEvent<HTMLLIElement>) {
    setHovered(true);
    e.stopPropagation();
    setParentHovered(false);
  }
  function onMouseLeave(e: React.MouseEvent<HTMLLIElement>) {
    setHovered(false);
    setParentLeave(e);
    e.stopPropagation();
  }

  return (
    <li
      className={`relative pl-5 w-full flex flex-row items-center gap-2 py-2 cursor-pointer ${
        !checked ? " text-gray-400" : " text-gray-200"
      }`}
      onClick={(e) => onChildrenClick(e)}
      onMouseEnter={(e) => onMouseEnter(e)}
      onMouseLeave={(e) => onMouseLeave(e)}>
      <input type="checkbox" className=" rounded-sm focus:ring-0 bg-dark-blue text-neon-blue/60" checked={checked} />
      <p className="select-none">{text}</p>
      <HoveredSelector hovered={hovered} />
    </li>
  );
}

export default function Filter() {
  const _categories = [
    { name: "2D", data: ["Flat", "Vector"] },
    { name: "3D", data: ["Shaders", "Modelling"] },
  ];
  const [categories, setCategories] = useState(_categories.flatMap((el) => [...el.data]));
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<boolean[]>(new Array(5).fill(true));

  function updateSelected(index: number | null) {
    let array = [...selected];
    array[index] = !array[index];
    setSelected(array);
  }

  useEffect(() => {
    if (!selected.length) return;
    let cat = categories;
    if (!categories.length) cat = ["null"];

    router.push(
      `/gallery/?static=${selected[0]}&animated=${selected[1]}&interactive=${selected[2]}&categories=${categories}`
    );
  }, [categories, selected]);

  return (
    <div className=" md:sticky top-24 rounded-md h-full flex flex-col items-start gap-6 p-4 border border-white/10 over-y-scroll w-full md:w-72">
      <h3 className=" text-white/80 font-medium text-xl">Filters</h3>
      <div className="w-full h-[1px] bg-white/10" />
      <div className="flex flex-row w-full gap-1 flex-wrap justify-center px-6">
        <Selector content="Static" icon={MdRemove} onClick={() => updateSelected(0)} selected={selected[0]} />
        <Selector content="Animated" icon={PiSneakerMove} onClick={() => updateSelected(1)} selected={selected[1]} />
        <Selector
          content="Interactive"
          icon={HiOutlineCursor}
          onClick={() => updateSelected(2)}
          selected={selected[2]}
        />
      </div>
      <ul className="flex flex-row md:flex-col items-start w-full">
        {_categories.map((el, i) => (
          <Row key={i} name={el.name} data={el.data} setCategories={setCategories} />
        ))}
      </ul>
    </div>
  );
}
