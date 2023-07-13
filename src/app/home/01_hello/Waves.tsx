"use client"

import {
  Effects,
  MeshReflectorMaterial,
  MeshTransmissionMaterial,
  OrbitControls,
  PerspectiveCamera,
  Stars,
  Html,
} from "@react-three/drei";
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { vertex, fragment } from "./shaders";
import { useRef } from "react";
import { BufferGeometry, Material, Mesh, MeshPhongMaterial, NormalBufferAttributes, PlaneGeometry } from "three";
import * as THREE from "three";
import { UnrealBloomPass } from "three-stdlib";
import {
  Autofocus,
  Bloom,
  DepthOfField,
  DotScreen,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
extend({ UnrealBloomPass });
import { BlendFunction } from "postprocessing";
import { useScroll, useTransform } from "framer-motion";
import useOnScreen from "@/lib/useOnScreen";
import TypedLetters from "@/components/TypedLetters";

const vector = [0, 0, 0];
const lookat = new THREE.Vector3(100, 30, 500);
const subTexts = [
  "write specifications",
  "design figma mocks",
  "develop your website",
  "conceive data structures",
  "manage databases",
  "host and deploy",
];

function Text() {
  const { scrollYProgress } = useScroll();
  const xposition = useTransform(scrollYProgress, [0, 1], [0, -20]);
  useFrame(({ clock, camera }) => {
    // mixer.update(clock.getDelta());
    camera.position.y = xposition.get();
    // camera.lookAt(lookat);
  });

  return (
    <Html as="div" center position={[0, 0, 1200]} receiveShadow castShadow className="w-screen">
      <div className="flex flex-col justify-start items-center">
        <p>Hello, i'm Marie</p>
        <h1 className=" w-[1200px] h-32 text-center bg-gradient-radial from-white from-30% to-blue/5 text-white text-opacity-50 bg-clip-text">
          Developer and designer
        </h1>
        <h3 className="text-left text-3xl flex flex-row gap-2">
          I can help you{" "}
          <TypedLetters
            texts={subTexts}
            className="bg-gradient-to-r from-neon-pink to-neon-blue text-white/25 bg-clip-text relative font-bold"
          />
        </h3>
      </div>
    </Html>
  );
}

export default function Waves() {
  const canvasRef = useRef(null);
  const uniforms = {
    center: { value: "co" },
  };
  const isOnScreen = useOnScreen(canvasRef);

  return (
    <Canvas
      ref={canvasRef}
      frameloop={isOnScreen ? "always" : "never"}
      camera={{ fov: 25, far: 1000, near: 0.1, position: [0, 0, -100] }}>
      <directionalLight intensity={30} color="#FF00E5" rotation={[0, 0, 1.60254]} position={[0, 0, 300]} />
      <directionalLight intensity={10} color="#0000FF" rotation={[0, 0, 1.60254]} position={[0, 50, 300]} />
      <directionalLight intensity={1} color="#6a00ff" position={[0, 20, -50]} rotation={[0, 3, 0]} />
      <Text />
      <ambientLight color="#2809DA" />
      <group position={[50, 24, 100.29852]}>
        <mesh castShadow receiveShadow scale={0.40021}>
          <sphereGeometry args={[3, 32, 16]} />
          <meshPhongMaterial color="#2809DA" />
        </mesh>
        <mesh rotation={[-0.9, 1.6, 0.0]}>
          <torusGeometry args={[2.6, 0.1, 4, 60]} />
          <meshPhongMaterial color="#2809da5a" />
        </mesh>
      </group>
      <mesh castShadow receiveShadow position={[-70, 23, 120]} scale={0.91328}>
        <sphereGeometry args={[4, 32, 16]} />
        <meshPhongMaterial color="#2809da5a" />
      </mesh>
      <mesh castShadow receiveShadow position={[140, 30, 300]}>
        <sphereGeometry args={[10, 32, 16]} />

        <meshPhongMaterial color="#2809da5a" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, -23, -80]} rotation={[-Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[20, 124, 78]} />
        <meshPhongMaterial color="#000038" />
      </mesh>
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={0.2} />
        {/* <Autofocus /> */}
      </EffectComposer>
      {/* <Effects> */}
      {/* </Effects> */}
      {/* <OrbitControls /> */}
    </Canvas>
  );
}
