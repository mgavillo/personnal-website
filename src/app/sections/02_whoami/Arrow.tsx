"use client"
import useCharacterStore from "@/lib/zustandStore";
import Selector from "../../../../bin/HoverButton";

export default function Arrow({ side, onPointerDown, onPointerUp}: { side: "left" | "right", onPointerDown:any, onPointerUp: any}) {
  const { incrCharacterCat, decrCharacterCat } = useCharacterStore();

    function changeCat(){
        if(side == "left")
            decrCharacterCat()
        else 
            incrCharacterCat()
    }

  return (
    <Selector className=" pb-3 pt-1 px-3" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
      <p className="font-black text-7xl select-none cursor-pointer text-center">
        {side === "left" ? "<" : ">"}
      </p>
    </Selector>
  );
}
