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

const vector = [0, 0, 0];
const lookat = new THREE.Vector3(100, 30, 500);

function Text() {
  const { scrollYProgress } = useScroll();
  const xposition = useTransform(scrollYProgress, [0, 1], [3, -10]);
  useFrame(({ clock, camera }) => {
    // mixer.update(clock.getDelta());
    camera.position.y = xposition.get();
    // camera.lookAt(lookat);
  });

  return (
    <Html as="div" position={[250, 20, 700]} receiveShadow castShadow className="w-screen">
      <div className="flex flex-col justify-start items-center">
        <p>Hello, i'm Marie</p>
        <h1 className=" w-[1200px] h-32 text-center bg-gradient-radial from-white from-30% to-blue/5 text-white text-opacity-50 bg-clip-text">
          Developer and designer
        </h1>
        <h3 className="text-left text-3xl ">
          I can help you{" "}
          <span className="bg-gradient-to-r from-neon-pink to-neon-blue text-white/25 bg-clip-text relative font-bold">
            write specifications
          </span>
        </h3>
      </div>
    </Html>
  );
}

export default function Waves() {
  const uniforms = {
    center: { value: "co" },
  };
  
  return (
    <Canvas className="absolute top-0 w-screen" style={{height: "200vh"}}>
      <PerspectiveCamera makeDefault={true} far={375.79999} near={0.1} fov={22.89519} rotation={[0, 0, 0]} position={[0, 0, -110]}/>
      <Text />
      {/* <perspectiveCamera /> */}
      <group position={[0, 0, 300]} rotation={[0, 0, 1.60254]}>
        <directionalLight intensity={30} color="#FF00E5" rotation={[0, 0, 0]} />
      </group>
      <group position={[0, 0, -300]} rotation={[0, 3, 0]}>
        <directionalLight intensity={1} color="#6a00ff" rotation={[0, 0, 0]} />
      </group>
      <ambientLight color="#2809DA" />
      <group position={[50, 24, 100.29852]}>
        <mesh castShadow receiveShadow scale={0.40021}>
          <sphereGeometry args={[3, 32, 16]} />
          <meshPhongMaterial color="#2809DA" />
        </mesh>
        <mesh rotation={[-0.2, 1.2, 0.3]}>
          <torusGeometry args={[2.6, 0.1, 3, 30]} />
          <meshPhongMaterial color="#2809DA" />
        </mesh>
      </group>
      <mesh castShadow receiveShadow position={[-15, -0.53129, 120]} scale={0.91328}>
        <sphereGeometry args={[2, 32, 16]} />
        <meshPhongMaterial color="#2809da5a" />
      </mesh>
      <mesh castShadow receiveShadow position={[40, 20, 100]}>
        <sphereGeometry args={[6, 32, 16]} />

        <meshPhongMaterial color="#2809DA" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, -21, -90]} rotation={[-Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[20, 124, 78]} />
        <meshPhongMaterial color="#0d0056" />
      </mesh>
      {/* <Stars /> */}
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={0.2} />
        <Autofocus />
      </EffectComposer>
      {/* <Effects> */}
      {/* </Effects> */}
      <OrbitControls />
    </Canvas>
  );
}
