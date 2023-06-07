"use client";

import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import React from "react";
import {
  AccumulativeShadows,
  Caustics,
  ContactShadows,
  CubeCamera,
  Environment,
  Float,
  MeshReflectorMaterial,
  MeshTransmissionMaterial,
  OrbitControls,
  RandomizedLight,
} from "@react-three/drei";
import { EffectComposer, GodRays } from "@react-three/postprocessing";

const Lights = () => {
  const spotLight = useRef<THREE.SpotLight>(null);
  const spotLight1 = useRef<THREE.SpotLight>(null);
  const empty = useRef<THREE.Mesh>(null);

  useFrame((mouse: any) => {
    if (!empty.current) return;
    empty.current.position.x = mouse.pointer.x * 15;
    empty.current.position.y = mouse.pointer.y * 10;
  });

  useEffect(() => {
    if (!spotLight.current || !empty.current) return;
    spotLight.current.target = empty.current;
  }, []);

  return (
    <>
      <spotLight
        ref={spotLight}
        castShadow
        position={[0, 0, 10]}
        intensity={100}
        distance={10000}
        angle={0.15}
        color="#052287"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        penumbra={0.5}
      />

      <ambientLight color="#061340" />
      <mesh ref={empty} position={[0, 0, -22]} />
    </>
  );
};

interface LightInDarkProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  isOnScreen?: boolean;
}
export const LightInDark = ({
  id,
  className,
  style,
  isOnScreen = true,
}: LightInDarkProps) => {
  const canvasRef = useRef<any>(null);
  // const isOnScreen = useOnScreen(canvasRef);
  const sunRef = useRef(null);
  return (
    <div
    className="absolute right-1 bottom-1 left-0 top-0 z-10"
    style={{ clipPath: "polygon(0 0, 100% 0%, 75% 100%, 0 100%)" }}
  >
    <Canvas
      ref={canvasRef}
      shadows
      dpr={[1, 2]}
    
      frameloop={!isOnScreen ? "never" : "always"}
      className="cursor-pointer"
    >
      <Float floatIntensity={4} rotationIntensity={3} speed={2}>
        <mesh ref={sunRef}>
          {/* <octahedronGeometry /> */}
          {/* <latheGeometry/> */}
          {/* <capsuleGeometry/> */}
            <icosahedronGeometry/>
          <MeshTransmissionMaterial
            color="#FF00E5"
            resolution={128}
            thickness={4}
            anisotropy={2}
            chromaticAberration={0.4}
            distortionScale={0.7}
            temporalDistortion={0.001}
            distortion={4}
            forceSinglePass={false}
          />
        </mesh>
      </Float>
      <mesh position={[0, 0, -1]}>
        <planeGeometry args={[20, 20]} />
        <meshPhongMaterial />
      </mesh>
      <Lights />
      {sunRef.current && (
        <EffectComposer>
          <GodRays
            sun={sunRef.current}
            samples={30}
            density={0.97}
            decay={0.96}
            weight={0.1}
            exposure={0.2}
            clampMax={0.3}
            blur={true}
          />
        </EffectComposer>
      )}
    </Canvas>
  </div>
  )
};
