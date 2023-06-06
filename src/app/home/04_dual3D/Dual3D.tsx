export default function Dual3D() {
  return (
    <div className="w-full h-screen flex flex-row justify-center items-center relative">
      <h2 className="absolute top-0 left-0 z-40">
        I'm searching light in the dark
      </h2>
      <div id="dual-left" className="relative w-1/2 h-4/6 -mr-32">
        <div
          className="absolute inset-0 bg-blue -z-10"
          style={{ clipPath: "polygon(0 0, 100% 0%, 75% 100%, 0 100%)" }}
        ></div>
        <div
          className="absolute right-1 bottom-1 left-0 top-0 bg-black"
          style={{ clipPath: "polygon(0 0, 100% 0%, 75% 100%, 0 100%)" }}
        ></div>
      </div>
      <div id="dual-right" className="relative w-1/2 h-4/6">
        <div
          className="absolute inset-0 bg-blue -z-10"
          style={{ clipPath: "polygon(25% 0, 100% 0%, 100% 100%, 0 100%)" }}
        />
        <div
          className="absolute right-0 bottom-0 left-1 top-1 bg-black"
          style={{ clipPath: "polygon(25% 0, 100% 0%, 100% 100%, 0 100%)" }}
        ></div>
      </div>
      <h2 className="absolute bottom-0 right-0 z-40">Order in chaos</h2>
    </div>
  );
}
