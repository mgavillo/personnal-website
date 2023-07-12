"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MdAnimation } from "react-icons/md";
import { HiOutlineCursorArrowRays } from "react-icons/hi2";
import { PiSneakerMove } from "react-icons/pi";
import { MdRemove } from "react-icons/md";
import Selector from "@/components/buttons/Selector";
import { skills } from "../home/02_whoami/skills3";
import { iconComponentMap } from "@/lib/iconComponents";
import Tooltip from "@/components/Tooltip";
import { text } from "stream/consumers";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import HoveredSelector from "@/components/HoveredSelector";
import { data } from "autoprefixer";

function CheckBox({
  name,
  checked,
  onChange,
}: {
  name: string;
  checked: boolean;
  onChange: (name: string) => void;
}) {
  return (
    <label
      className="flex flex-row gap-2 items-center"
      onChange={() => onChange(name)}
    >
      <input
        id="default-checkbox"
        type="checkbox"
        checked={checked}
        className={`w-4 h-4 rounded-sm border ring-0  ${
          checked ? "" : " bg-dark-blue hover:bg-white/25 border-white"
        } checked:bg-white checked:before:bg-transparent focus:outline-transparent focus:border-0`}
        // } checked:bg-gradient-radial from-neon-pink via-blue to-white hover:bg-blend-lighten focus:outline-transparent focus:border-0`}
      />
      {name}
    </label>
  );
}

function Check({
  item,
  level,
  parentChecked,
  parentIndeterminate,
  changeParentState,
}: {
  item: any;
  level: number;
  parentChecked?: boolean;
  parentIndeterminate?: boolean;
  changeParentState?: (event: any, indeterminate: any) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const IconComponent = iconComponentMap[item.name];
  const [checked, setChecked] = useState(parentChecked);
  const [nbChildren, setNbChildren] = useState(
    item.data ? item.data.length : 0
  );
  const [nbChildrenChecked, setNbChildrenChecked] = useState(
    item.data ? item.data.length : 0
  );

  function setIndeterminate(state: boolean) {
    ref.current.indeterminate = state;
  }
  const handleCheckboxChange = (event) => {
    const _checked = event.target.checked;
    setChecked(_checked);
    if (!_checked) setNbChildrenChecked(0);
    else setNbChildrenChecked(nbChildren);
    if (changeParentState) changeParentState(_checked, false);
  };

  useEffect(() => {
    setChecked(parentChecked);
    if (parentIndeterminate) setIndeterminate(true);
  }, [parentChecked, parentIndeterminate]);

  function onChildrenChecked(childrenChecked, childrenIndeterminate) {
    let _nbChildrenChecked = nbChildrenChecked;
    let _indeterminate = true;
    let _checked;

    console.log(
      item.name,
      childrenIndeterminate,
      childrenChecked,
      nbChildrenChecked,
      nbChildren
    );
    if (childrenIndeterminate) {
      _indeterminate = true;
    } else if (childrenChecked) {
      _nbChildrenChecked += 1;
    } else if (!childrenChecked) {
      _nbChildrenChecked -= 1;
    }

    if (_nbChildrenChecked === 0) {
      _checked = false;
      _indeterminate = false;
    } else if (_nbChildrenChecked >= nbChildren) {
      _checked = true;
      _indeterminate = false;
    }

    setNbChildrenChecked(_nbChildrenChecked);
    setIndeterminate(_indeterminate);
    if (_checked !== undefined) setChecked(_checked);
    if (changeParentState) changeParentState(_checked, _indeterminate);
  }

  return (
    <details>
      <summary className="flex flex-row gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          className="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
          ref={ref}
        />
        {IconComponent && <IconComponent size={15} />}
        {item.name}
      </summary>

      {item.data && (
        <ul style={{ paddingLeft: 10 * level + "px" }} className="">
          <CheckBoxTree
            treeData={item.data}
            level={level + 1}
            parentChecked={checked}
            changeParentState={onChildrenChecked}
            // onCheckboxChange={handleChildCheckboxChange}
          />
        </ul>
      )}
    </details>
  );
}

function CheckBoxTree({
  treeData,
  level,
  parentChecked = true,
  parentIndeterminate = false,
  changeParentState,
}: {
  treeData: any;
  level: number;
  parentChecked?: boolean;
  parentIndeterminate?: boolean;
  changeParentState?: (event: any, indeterminate: any) => void;
}) {
  if (!treeData || !treeData.length) return;

  return (
    <li style={{ paddingLeft: 5 * level + "px" }}>
      {treeData.map((item) => {
        return (
          <Check
            item={item}
            level={level}
            parentChecked={parentChecked}
            changeParentState={changeParentState}
            parentIndeterminate={parentIndeterminate}
          />
        );
      })}
    </li>
  );
}

function StyledCheckbox() {
  return <input type="checkbox" className=" rounded-sm checked:bg-blue-500" />;
}

function Row({
  name,
  data,
  setCategories,
}: {
  name: string;
  data: string[];
  setCategories: any;
}) {
  const [hovered, setHovered] = useState(false);
  const [checked, setChecked] = useState(true);
  const [childrenChecked, setChildrenChecked] = useState<boolean[]>(
    new Array(data.length).fill(true)
  );
  const [indeterminate, setIndeterminate] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLLIElement>(null);

  useEffect(() => {
    let array = [...childrenChecked];
    array.fill(checked);
    setChildrenChecked(array);
  }, [checked]);

  // useEffect(() => {
  //   console.log(indeterminate, checked, childrenChecked);
  //   setCategories((categories: string[]) => {
  //     let _categories = categories;
  //     let includes = _categories.includes(name);
  //     if (checked && !includes) _categories.push(name);
  //     else if (!checked && includes) _categories = _categories.filter((el) => el !== name);
  //     childrenChecked.map((el, i) => {
  //       includes = _categories.includes(data[i]);
  //       if (el && !includes) {
  //         _categories.push(data[i]);
  //       } else if (!el && includes) {
  //         _categories = _categories.filter((el) => el !== data[i]);
  //       }
  //     });
  //     return _categories;
  //   });
  // }, [childrenChecked]);

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

    if (
      e.clientX > rect.x &&
      e.clientX < rect.x + rect.width &&
      e.clientY > rect.y &&
      e.clientY < rect.y + rect.height
    )
      setHovered(true);
  }
  function onMouseLeave(e: React.MouseEvent) {
    setHovered(false);
  }

  return (
    <li
      ref={ref2}
      className={`relative w-full flex flex-row items-center gap-2 pt-2 ${
        checked || indeterminate ? "text-white" : "text-gray-300"
      }`}
      onClick={() => setChecked(!checked)}
      onPointerEnter={(e) => onMouseEnter(e)}
      onMouseLeave={(e) => onMouseLeave(e)}
    >
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
    // setParentHovered()
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
      onMouseLeave={(e) => onMouseLeave(e)}
    >
      {/* <StyledCheckbox /> */}
      <input
        type="checkbox"
        className=" rounded-sm focus:ring-0 bg-dark-blue text-neon-blue/60"
        checked={checked}
      />
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
  const [categories, setCategories] = useState(
    _categories.flatMap((el) => [...el.data])
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hovered, setHovered] = useState<null | number>(null);
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
    <div className=" sticky top-24 rounded-md h-full  flex flex-col items-start hover:bg-blend-multiply gap-6 p-4 border border-white/5 overflow-scroll w-72">
      <h3 className=" text-white/80 font-medium text-xl">Filters</h3>
      <div className="w-full h-[1px] bg-white/10" />
      <div className="flex flex-row w-full gap-1 flex-wrap justify-around px-6">
        <Tooltip text="Static">
          <div
            className={`relative bg-dark-blue border border-white/10 rounded-md text-center cursor-pointer hover:bg-transparent flex items-center justify-center w-12 h-12 hover:bg-gradient-to-r hover:from-blue/20 hover:to-neon-blue/30 ${
              selected[0]
                ? "bg-gradient-to-r from-blue/60 to-neon-blue/60"
                : "text-gray-400"
            }`}
            onMouseEnter={() => setHovered(0)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => updateSelected(0)}
          >
            <MdRemove size={selected[0] ? 20 : 15} />
          </div>
        </Tooltip>

        <Tooltip text="Animated">
          <p
            className={`relative bg-dark-blue border rounded-md border-white/10 text-center cursor-pointer hover:bg-transparent flex items-center justify-center w-12 h-12 hover:bg-gradient-to-r hover:from-blue/20 hover:to-neon-blue/30 ${
              selected[1]
                ? "bg-gradient-to-r from-blue/60 to-neon-blue/60"
                : "text-gray-400"
            }`}
            onMouseEnter={() => setHovered(1)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => updateSelected(1)}
          >
            <PiSneakerMove size={selected[1] ? 20 : 15} />
          </p>
        </Tooltip>
        <Tooltip text="Interactive">
          <p
            className={`relative bg-dark-blue border rounded-md border-white/10 text-center cursor-pointer hover:bg-transparent  flex items-center justify-center w-12 h-12 hover:bg-gradient-to-r hover:from-blue/20 hover:to-neon-blue/30 ${
              selected[2]
                ? "  bg-gradient-to-r from-blue/60 to-neon-blue/60"
                : "text-gray-400"
            }`}
            onMouseEnter={() => setHovered(2)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => updateSelected(2)}
          >
            <HiOutlineCursorArrowRays size={selected[2] ? 20 : 15} />
          </p>
        </Tooltip>
      </div>
      <ul className="flex flex-col items-start w-full">
        {_categories.map((el) => (
          <Row name={el.name} data={el.data} setCategories={setCategories} />
        ))}
      </ul>
    </div>
  );
}
