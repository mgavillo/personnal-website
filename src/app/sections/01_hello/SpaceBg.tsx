"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Bloom, EffectComposer} from "@react-three/postprocessing";
import { useScroll, useTransform } from "framer-motion";
import useOnScreen from "@/lib/useOnScreen";

function Lights() {
  const { scrollYProgress } = useScroll();
  const xposition = useTransform(scrollYProgress, [0, 1], [0, -20]);
  useFrame(({ clock, camera }) => {
    // mixer.update(clock.getDelta());
    camera.position.y = xposition.get();
    // camera.lookAt(lookat);
  });

  return (
    <>
      <directionalLight intensity={30} color="#FF00E5" rotation={[0, 10, 1.60254]} position={[0, 20, 300]} />
      <directionalLight intensity={10} color="#0000FF" rotation={[0, 0, 1.60254]} position={[0, 50, 300]} />
      <directionalLight intensity={2} color="#6a00ff" position={[0, 20, -50]} rotation={[0, 60, 0]} />
      <ambientLight color="#2809DA" />
    </>
  );
}

export default function SpaceBg() {
  const canvasRef = useRef(null);
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
    <Canvas
      ref={canvasRef}
      frameloop={isOnScreen ? "always" : "never"}
      camera={{ fov: 25, far: 1000, near: 0.1, position: [0, 0, -100] }}>
      {/* <Text /> */}
      <Lights />
      <group position={[isMobile ? 17 : 50, 24, 100.29852]}>
        <mesh castShadow receiveShadow scale={0.40021}>
          <sphereGeometry args={[3, 32, 16]} />
          <meshPhongMaterial color="#2809DA" />
        </mesh>
        <mesh rotation={[-0.9, 1.6, 0.0]}>
          <torusGeometry args={[2.6, 0.1, 4, 60]} />
          <meshPhongMaterial color="#2809da5a" />
        </mesh>
      </group>
      <mesh castShadow receiveShadow position={[isMobile ? -20 : -70, 23, 120]} scale={0.91328}>
        <sphereGeometry args={[4, 32, 16]} />
        <meshPhongMaterial color="#2809da5a" />
      </mesh>
      <mesh castShadow receiveShadow position={[140, 30, 300]}>
        <sphereGeometry args={[10, 32, 16]} />

        <meshPhongMaterial color="#2809da5a" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, -23, -80]} rotation={[-Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[20, 124, 78]} />
        {/* <meshMatcapMaterial /> */}
        <meshPhongMaterial color="#000038" />
      </mesh>
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={0.2} />
      </EffectComposer>
    </Canvas>
  );
}
