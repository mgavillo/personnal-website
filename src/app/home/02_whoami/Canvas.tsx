"use client";
import { Canvas } from "@react-three/fiber";
import { Rain } from "./Rain_rig";
import { useRef } from "react";
import useOnScreen from "@/lib/useOnScreen";
import { PerspectiveCamera } from "@react-three/drei";

export default function CanvasWrapper({
  rotation,
}: {
  rotation: null | "left" | "right";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isOnScreen = useOnScreen(canvasRef);
  
  return (
    <Canvas frameloop={isOnScreen ? "always" : "never"} ref={canvasRef} className="overflow-visible -mt-28" style={{width: "609px", height:"100vh"}}>
      <Rain rotation={rotation} isOnScreen = {isOnScreen} />
      <ambientLight color="#FFFFFF" intensity={10} />
      <spotLight
        intensity={1}
        angle={0.1}
        penumbra={1}
        position={[0, 20, 10]}
        castShadow
      />
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
  );
}
