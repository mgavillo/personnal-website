"use client";
import { Canvas } from "@react-three/fiber";
import { Rain } from "./Rain_rig";
import { Suspense, useEffect, useRef, useState } from "react";
import useOnScreen from "@/lib/useOnScreen";
import { PerspectiveCamera } from "@react-three/drei";
import { Color } from "three";
export default function CanvasWrapper({}: {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isOnScreen = useOnScreen(canvasRef);
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== "undefined" && window.innerWidth <= 767.98);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(typeof window !== "undefined" && window.innerWidth <= 767.98);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return (
    // <div className="w-full md:w-fit flex justify-center items-center">
      <div className={`relative overflow-hidden md:overflow-visible h-[210px] md:h-[80vh] w-full md:w-[400px] ${isMobile ? "screen-bg": "screen-bg"}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Canvas
           shadows
            frameloop={isOnScreen ? "always" : "never"}
            ref={canvasRef}
            style={{ position: "absolute", zIndex: "0", height: "100vh" }}>
            <Rain isMobile={isMobile}/>
            <ambientLight color="#FFFFFF" intensity={8} castShadow />
            <spotLight intensity={1} angle={0.1} penumbra={1} position={[0, 20, 10]} castShadow />
            {/* <spotLight intensity={2} angle={0.1} penumbra={1} position={[20, 20, 10]} castShadow  /> */}
            {/* <spotLight intensity={4} angle={0.1} penumbra={1} position={[20, -20, 10]} castShadow  /> */}

          </Canvas>
        </Suspense>
      {/* </div> */}
    </div>
  );
}
