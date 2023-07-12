"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import React from "react";
import { Float, Html, MeshRefractionMaterial, MeshTransmissionMaterial } from "@react-three/drei";
import { EffectComposer, GodRays } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import useOnScreen from "@/lib/useOnScreen";
// import { RGBELoader } from 'three-stdlib'

const Lights = ({ hovered }: { hovered: boolean }) => {
  const spotLight = useRef<THREE.SpotLight>(null);
  const empty = useRef<THREE.Mesh>(null);
  const MIN_INTENSITY = 0;

  useFrame((mouse: any) => {
    let intensity = spotLight.current.intensity;
    if (hovered) {
      if (intensity < 100) intensity += 0.5;
      if (!empty.current) return;
      empty.current.position.x = mouse.pointer.x * 15;
      empty.current.position.y = mouse.pointer.y * 10;
    } else {
      if (intensity > MIN_INTENSITY) intensity -= 1.5;
      if (intensity < MIN_INTENSITY) intensity = MIN_INTENSITY;
    }
    spotLight.current.intensity = intensity;
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
        // intensity={100}
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

      {/* <ambientLight color="#061340" /> */}
      {/* <Float> */}
      <mesh ref={empty} position={[0, 0, -22]} />
      {/* </Float> */}
    </>
  );
};

interface LightInDarkProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  isOnScreen?: boolean;
}
export function LightInDark({ id, className, style, isOnScreen = false }: LightInDarkProps) {
  const canvasRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);
  const sunRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const handleSunCreated = (mesh) => {
    sunRef.current = mesh;
  };
  isOnScreen = useOnScreen(canvasRef);
  useEffect(() => {
    if (sunRef.current !== null) {
      setLoaded(true);
      console.log("!!!!!");
    }
  }, [sunRef.current]);
  console.log(loaded, sunRef.current);
  const renderTarget = new THREE.WebGLRenderTarget()
  // const texture = useLoader(RGBELoader, 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr')

  return (
    // <motion.div
    //   className="absolute right-1 bottom-1 left-0 top-0 z-10"
    //   style={{ clipPath: "polygon(0 0, 100% 0%, 75% 100%, 0 100%)" }}
    // >
    <div className="absolute inset-0 z-10">
      <Canvas
        ref={canvasRef}
        shadows
        dpr={[1, 2]}
        frameloop={!isOnScreen ? "never" : "always"}
        className="cursor-pointer w-full h-full"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}>
        <Float floatIntensity={4} rotationIntensity={3} speed={2}>
          <mesh ref={handleSunCreated}>
            <icosahedronGeometry />
            {/* <MeshRefractionMaterial 
            envMap={null}
            color="#FF00E5"
            /> */}
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
        <Lights hovered={hovered} />
        {loaded && sunRef.current !== null && (
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

    // </motion.div>
  );
}
