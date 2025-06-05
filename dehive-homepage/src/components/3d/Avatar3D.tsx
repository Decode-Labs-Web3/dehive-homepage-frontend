"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Html, Text } from "@react-three/drei";
import { Suspense, useRef } from "react";

function GlassySphere() {
  return (
    <mesh castShadow receiveShadow>
      <sphereGeometry args={[0.8, 64, 64]} />
      <meshPhysicalMaterial
        color="#a855f7"
        roughness={0.08}
        transmission={0.95}
        thickness={1.2}
        ior={1.4}
        clearcoat={1}
        clearcoatRoughness={0.05}
        reflectivity={0.9}
        envMapIntensity={1.2}
        attenuationColor="#3b82f6"
        attenuationDistance={0.8}
      />
    </mesh>
  );
}

function FloatingLetter({ letter }: { letter: string }) {
  const ref = useRef<any>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
      ref.current.position.y = 0.18 + Math.sin(state.clock.getElapsedTime() * 1.2) * 0.09;
    }
  });
  return (
    <Text
      ref={ref}
      position={[0, 0.18, 0.5]}
      fontSize={0.5}
      color="#fff"
      font="/fonts/helvetiker_regular.typeface.json"
      anchorX="center"
      anchorY="middle"
      outlineColor="#a855f7"
      outlineWidth={0.04}
      outlineBlur={0.7}
      fillOpacity={1}
    >
      {letter}
    </Text>
  );
}

export default function Avatar3D({ letter = "A" }: { letter?: string }) {
  return (
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: "50%",
        boxShadow: "0 4px 24px 0 rgba(80, 60, 200, 0.18)",
        background: "radial-gradient(circle at 60% 30%, #a855f7 40%, #3b82f6 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }} shadows>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 2, 2]} intensity={1.5} castShadow />
        <Suspense fallback={<Html center>Loading...</Html>}>
          <GlassySphere />
          <FloatingLetter letter={letter} />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
} 