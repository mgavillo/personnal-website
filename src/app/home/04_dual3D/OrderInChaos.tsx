"use client"

import {
    Canvas,
    useFrame,
  } from "@react-three/fiber";
  import React, {
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
  } from "react";
  import * as THREE from "three";
  import { vertexShader, fragmentShader } from "./shaders";
  
  let width:number;
  let height:number;
  let numPixels:number;
  const whitePixel = new Uint8Array([255, 255, 255]); // RGBA values of a white pixel
  
  interface InstancedParticuleProps {
    count: number;
    offsets: Float32Array;
    indices: Uint16Array;
    angles: Float32Array;
    uniforms: any;
    setUniforms: React.SetStateAction<{}>;
    ctx: any;
    hovered: boolean
  }
  const InstancedParticule = ({
    count,
    offsets,
    indices,
    angles,
    uniforms,
    setUniforms,
    ctx,
    hovered,
  }: InstancedParticuleProps) => {
    const ref = useRef<any>(null);
    const shaderRef = useRef<THREE.ShaderMaterial>(null);
    useLayoutEffect(() => {
      if (!ref.current) return;
      ref.current.setMatrixAt(0, new THREE.Matrix4());
    }, []);
    const [movingAnim, setMovingAnim] = useState(0)
  
  
    useFrame(({ clock, camera }) => {
      if (!shaderRef.current || !shaderRef.current.uniforms || !shaderRef.current.uniforms.uClock) return;
      shaderRef.current.uniforms.uClock.value = clock.elapsedTime;
      if(movingAnim >=1 && movingAnim <= 40){
        setMovingAnim(movingAnim+ 1);
      }
      if(movingAnim == 30){
        shaderRef.current.uniforms.uMoving.value = 1;
      }
      if(movingAnim >= 40)
        shaderRef.current.uniforms.uMoving.value = 0;
  
      if (hovered) {
  
        camera.position.lerp(new THREE.Vector3(70, 50, -300), 0.04);
        // if (shaderRef.current.uniforms.uSize.value < 0.8){
          // console.log("wsh alors", shaderRef.current.uniforms.uSize.value)
          // shaderRef.current.uniforms.uSize.value += 0.1;
        // }
      }
      if (!hovered) {
        camera.position.lerp(new THREE.Vector3(56, 90, -10), 0.04);
        // if (shaderRef.current.uniforms.uSize.value > 0.3)
          // shaderRef.current.uniforms.uSize.value -= 0.05;
      }
    });
  
    useEffect(() =>{
      if(hovered)
        setMovingAnim(1)
    }, [hovered])
  
    return (
      <instancedMesh ref={ref} args={[undefined, undefined, count]}>
        <planeGeometry args={[1, 1]}>
          <instancedBufferAttribute
            needsUpdate={true}
            attach="attributes-offset"
            args={[offsets, 3]}
          />
          <instancedBufferAttribute
            needsUpdate={true}
            attach="attributes-pindex"
            args={[indices, 1]}
          />
          <instancedBufferAttribute
            needsUpdate={true}
            attach="attributes-angle"
            args={[angles, 1]}
          />
        </planeGeometry>
        {/* <boxGeometry args={[1, 1, 1]}>
        </boxGeometry> */}
  
        <shaderMaterial
          ref={shaderRef}
          side={THREE.FrontSide}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent={true}
          depthTest={false}
          needsUpdate={true}
        />
      </instancedMesh>
    );
  };
  
  interface OrderInChaosProps {
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    isOnScreen?: boolean
  }
  
  export const OrderInChaos = ({id, className, style, isOnScreen=true}: OrderInChaosProps) => {
    const canvasRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
    const [boundingRect, setBoundingRect] = useState<DOMRect | undefined>();
    const [uniforms, setUniforms] = useState({});
    const [attributes, setAttributes] = useState({
      offsets: new Float32Array(),
      indices: new Uint16Array(),
      angles: new Float32Array(),
    });
  
    useLayoutEffect(() => {
      const texture = new THREE.TextureLoader().load("eye.png", (texture) => {
        width = texture.image.width;
        height = texture.image.height;
        numPixels = width * height;
        console.log("dimensions:", width, height, numPixels);
  
        const _indices = new Uint16Array(numPixels);
        const _offsets = new Float32Array(numPixels * 3);
        const _angles = new Float32Array(numPixels);
  
        for (let i = 0; i < numPixels; i++) {
          _offsets[i * 3 + 0] = i % width;
          _offsets[i * 3 + 1] = Math.floor(i / width);
          _indices[i] = i;
          _angles[i] = Math.random() * Math.PI;
        }
        setAttributes({ offsets: _offsets, indices: _indices, angles: _angles });
        setUniforms({
          uClock: { value: 1.0 },
          uRandom: { value: 10.0 },
          uDepth: { value: 2.0 },
          uSize: { value: 0.6 },
          uTextureSize: { value: new THREE.Vector2(width, height) },
          uTexture: { value: texture },
          uTouch: { value: null },
          uMoving: {value: 0}
        });
        setBoundingRect(containerRef.current?.getBoundingClientRect());
      });
    }, []);
  
    const lookat = new THREE.Vector3(50, 100, 20);
    return (
      <div
        className={"absolute right-0 bottom-0 left-1 top-1 z-10 bg-black"}
        style={{ clipPath: "polygon(25% 0, 100% 0%, 100% 100%, 0 100%)" }}
        ref={containerRef}
        onClick={() => setHovered(!hovered)}
      >
        <Canvas
          ref={canvasRef}
          frameloop={!isOnScreen ? "never" : "always"}
          className="cursor-pointer"
          camera={{
            position: [56, 90, -1],
            far: 20000,
            near: 0.01,
            rotation: [0, Math.PI, 0],
            lookAt: () => lookat,
          }}
        >
          <InstancedParticule
            count={numPixels}
            offsets={attributes.offsets}
            indices={attributes.indices}
            angles={attributes.angles}
            uniforms={uniforms}
            setUniforms={setUniforms}
            ctx={ctx ? ctx.getImageData(0, 0, width, height) : undefined}
            hovered={hovered}
          />
          <ambientLight />
        </Canvas>
      </div>
    );
  };
  