import { LightInDark } from "./LightInDark";

export default function Dual3D() {
  return (
    <div className="w-full h-screen flex flex-row justify-center items-center relative">
      <div
        id="dual-left"
        className="relative w-1/2 h-4/6 -mr-32 overflow-visible"
      >
        <h2 className="absolute top-0 left-0 z-40 -mt-14 w-[1200px] pointer-events-none">
          I'm searching light in the dark
        </h2>
        <div
          className="absolute inset-0 bg-blue -z-10"
          style={{ clipPath: "polygon(0 0, 100% 0%, 75% 100%, 0 100%)" }}
        ></div>

        <LightInDark />
      </div>
      <div id="dual-right" className="relative w-1/2 h-4/6">
        <div
          className="absolute inset-0 bg-blue -z-10"
          style={{ clipPath: "polygon(25% 0, 100% 0%, 100% 100%, 0 100%)" }}
        />
        <div
          className="absolute right-0 bottom-0 left-1 top-1 bg-black cursor-pointer"
          style={{ clipPath: "polygon(25% 0, 100% 0%, 100% 100%, 0 100%)" }}
        ></div>
        <h2 className="absolute bottom-0 right-0 z-40 -mb-11">Order in chaos</h2>
      </div>
    </div>
  );
}
