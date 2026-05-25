"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Particles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate 1500 random particle coordinates
  const [positions, speeds] = useMemo(() => {
    const count = 1200;
    const pos = new Float32Array(count * 3);
    const sp = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Position particles in a medium sphere radius
      const r = 12 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      sp[i] = 0.05 + Math.random() * 0.15;
    }
    return [pos, sp];
  }, []);

  const elapsedRef = useRef(0);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    elapsedRef.current += delta;
    const time = elapsedRef.current;
    const { x: mouseX, y: mouseY } = state.pointer; // normalized mouse coords (-1 to 1)

    // Base slow rotation
    pointsRef.current.rotation.y = time * 0.015;
    pointsRef.current.rotation.x = time * 0.008;

    // React magnetophilically to mouse coordinate adjustments
    pointsRef.current.rotation.y += mouseX * 0.05;
    pointsRef.current.rotation.x -= mouseY * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#06b6d4"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
export default Particles;
