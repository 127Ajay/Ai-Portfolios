"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingMeshProps {
  position: [number, number, number];
  scale: number;
  geometry: THREE.BufferGeometry;
  speed: number;
  rotationSpeed: [number, number, number];
  color: string;
}

const FloatingMesh: React.FC<FloatingMeshProps> = ({
  position,
  scale,
  geometry,
  speed,
  rotationSpeed,
  color,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  const elapsedRef = useRef(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    elapsedRef.current += delta;
    const time = elapsedRef.current;

    // Floating floating oscillation
    meshRef.current.position.y = initialY + Math.sin(time * speed) * 0.4;
    
    // Inertial rotation
    meshRef.current.rotation.x += rotationSpeed[0] * 0.01;
    meshRef.current.rotation.y += rotationSpeed[1] * 0.01;
    meshRef.current.rotation.z += rotationSpeed[2] * 0.01;
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      geometry={geometry}
      castShadow
      receiveShadow
    >
      {/* Physical glass shader replicating Frosted Glassmorphism */}
      <meshPhysicalMaterial
        color={color}
        roughness={0.12}
        metalness={0.1}
        transmission={0.88} // highly transparent
        ior={1.48}          // glass refraction index
        thickness={1.6}     // refraction thickness
        clearcoat={0.9}
        clearcoatRoughness={0.1}
        transparent={true}
        opacity={0.8}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export const Geometries: React.FC = () => {
  // Memoize geometries to conserve memory footprint
  const sphereGeo = new THREE.SphereGeometry(1, 32, 32);
  const torusKnotGeo = new THREE.TorusKnotGeometry(0.7, 0.25, 64, 8);
  const octaGeo = new THREE.OctahedronGeometry(0.9, 0);

  return (
    <group>
      {/* Floating glass Sphere */}
      <FloatingMesh
        position={[-6, 3, -12]}
        scale={1.4}
        geometry={sphereGeo}
        speed={0.6}
        rotationSpeed={[0.2, 0.4, 0.1]}
        color="#06b6d4"
      />

      {/* Floating glass TorusKnot */}
      <FloatingMesh
        position={[6, -2, -10]}
        scale={1.3}
        geometry={torusKnotGeo}
        speed={0.5}
        rotationSpeed={[0.3, 0.2, 0.5]}
        color="#10b981"
      />

      {/* Floating glass Octahedron */}
      <FloatingMesh
        position={[-3, -4, -8]}
        scale={1.1}
        geometry={octaGeo}
        speed={0.8}
        rotationSpeed={[0.6, 0.1, 0.3]}
        color="#3b82f6"
      />
    </group>
  );
};
export default Geometries;
