"use client";
import { Canvas } from "@react-three/fiber";
import { Rain } from "./Rain_rig";
import { useRef } from "react";
import useOnScreen from "@/lib/useOnScreen";
import { PerspectiveCamera } from "@react-three/drei";

export default function CanvasWrapper({}: {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isOnScreen = useOnScreen(canvasRef);

  return (
    <div className="overflow-visible h-[80vh] w-[200px] md:h-screen md:w-[500px]">
      <Canvas frameloop={isOnScreen ? "always" : "never"} ref={canvasRef}>
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
    </div>
  );
}
