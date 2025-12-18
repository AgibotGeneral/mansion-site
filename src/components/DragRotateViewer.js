import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function PlaceholderModel() {
  // Replace with a GLTF model loader later if you have an asset.
  return (
    <mesh>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial />
    </mesh>
  );
}

export default function DragRotateViewer({ height = 360 }) {
  return (
    <div style={{ height, width: "100%", borderRadius: 16, overflow: "hidden" }}>
      <Canvas camera={{ position: [2.2, 1.4, 2.2], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 4, 2]} intensity={1.2} />
        <PlaceholderModel />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.9}
          // Optional: keep it “upright”
          // minPolarAngle={Math.PI / 3}
          // maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
