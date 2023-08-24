"use client";
import { Canvas } from "@react-three/fiber";
import { Rain } from "./Rain_rig";
import { Suspense, useRef } from "react";
import useOnScreen from "@/lib/useOnScreen";
import { PerspectiveCamera } from "@react-three/drei";

export default function CanvasWrapper({}: {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isOnScreen = useOnScreen(canvasRef);

  return (
    <div className="w-full md:w-fit flex justify-end md:justify-start">
      <div className="relative overflow-hidden md:overflow-visible h-[242px] md:h-screen w-[150px] md:w-[500px] md:mb-0 -mb-24  border md:border-transparent border-neon-blue rounded-md">
        <Suspense fallback={<div>Loading...</div>}>
          <Canvas
            frameloop={isOnScreen ? "always" : "never"}
            ref={canvasRef}
            style={{ position: "absolute", zIndex: "-10", height: "100vh" }}>
            <Rain />
            <ambientLight color="#FFFFFF" intensity={10} />
            <spotLight intensity={1} angle={0.1} penumbra={1} position={[0, 20, 10]} castShadow />
            <PerspectiveCamera
              name="Camera_Orientation"
              position={[0, 0.91, 2.33]}
              makeDefault={true}
              far={1000}
              near={0.1}
              fov={60.28}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
}
