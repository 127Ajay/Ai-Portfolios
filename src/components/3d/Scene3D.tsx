"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, useTexture } from "@react-three/drei";
import * as THREE from "three";
import Particles from "./Particles";
import CanvasLoader from "./CanvasLoader";

interface PlanetData {
  name: string;
  radius: number;
  orbitRadius: number;
  speed: number;
  color: string;
  roughness: number;
  metalness: number;
  textureUrl: string;
  hasClouds?: boolean;
}

// 4 Main photorealistic celestial bodies matching requested timeline
const PLANETS: PlanetData[] = [
  { name: "Sun", radius: 1.8, orbitRadius: 0, speed: 0, color: "#f59e0b", roughness: 0.1, metalness: 0, textureUrl: "/assets/textures/sun.png" },
  { name: "Earth", radius: 0.5, orbitRadius: 4.8, speed: 0.35, color: "#0ea5e9", roughness: 0.4, metalness: 0.1, textureUrl: "/assets/textures/earth.png", hasClouds: true },
  { name: "Mars", radius: 0.36, orbitRadius: 6.8, speed: 0.28, color: "#ef4444", roughness: 0.7, metalness: 0.1, textureUrl: "/assets/textures/mars.png" },
  { name: "Jupiter", radius: 1.05, orbitRadius: 9.2, speed: 0.18, color: "#f97316", roughness: 0.5, metalness: 0, textureUrl: "/assets/textures/jupiter.png" },
];

// Preload planet textures outside the rendering cycle to prevent CanvasLoader React render clashes
PLANETS.forEach(planet => {
  useTexture.preload(planet.textureUrl);
});

// Module-level variables to track scroll velocity for orbital acceleration
let currentScrollVelocity = 0;
let lastScrollY = 0;
let lastScrollTime = 0;

if (typeof window !== "undefined") {
  lastScrollY = window.scrollY;
  lastScrollTime = Date.now();

  window.addEventListener("scroll", () => {
    const now = Date.now();
    const currentY = window.scrollY;
    const timeDelta = Math.max(1, now - lastScrollTime);
    const scrollDelta = Math.abs(currentY - lastScrollY);

    // Calculate instantaneous scroll velocity (pixels per millisecond)
    const velocity = scrollDelta / timeDelta;

    // Add to velocity factor with smooth gain scaling
    currentScrollVelocity += velocity * 0.9;

    // Cap maximum scroll velocity to avoid extreme speeds
    currentScrollVelocity = Math.min(currentScrollVelocity, 22.0);

    lastScrollY = currentY;
    lastScrollTime = now;
  }, { passive: true });
}

interface PlanetMeshProps {
  data: PlanetData;
}

const Planet: React.FC<PlanetMeshProps> = ({ data }) => {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(Math.random() * Math.PI * 2);

  // Load the planet texture map synchronously inside Suspense
  const texture = useTexture(data.textureUrl);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Calculate orbital speed multiplier based on scroll velocity
    const speedMultiplier = 1.0 + currentScrollVelocity * 1.6;

    // Orbit orbital rotation
    angleRef.current += data.speed * delta * 0.12 * speedMultiplier;
    groupRef.current.position.x = Math.cos(angleRef.current) * data.orbitRadius;
    groupRef.current.position.z = Math.sin(angleRef.current) * data.orbitRadius;

    // Self-spin on axis (also scales slightly with scroll)
    const spinMultiplier = 1.0 + currentScrollVelocity * 0.4;
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.25 * spinMultiplier;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.38 * spinMultiplier;
    }
  });

  return (
    <group ref={groupRef}>
      {data.name === "Sun" ? (
        // Glowing sun core with real map texture
        <mesh ref={sphereRef}>
          <sphereGeometry args={[data.radius, 32, 32]} />
          <meshBasicMaterial map={texture} />
        </mesh>
      ) : (
        // Planet sphere with real map texture and standard lighting physics
        <mesh ref={sphereRef} castShadow receiveShadow>
          <sphereGeometry args={[data.radius, 32, 32]} />
          <meshStandardMaterial
            map={texture}
            roughness={data.roughness}
            metalness={data.metalness}
          />
        </mesh>
      )}

      {/* Earth clouds */}
      {data.hasClouds && (
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[data.radius + 0.02, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent={true}
            opacity={0.3}
            blending={THREE.NormalBlending}
          />
        </mesh>
      )}
    </group>
  );
};

const SceneController: React.FC = () => {
  const { camera } = useThree();
  const lookAtTargetRef = useRef(new THREE.Vector3(0, 0, 0));
  const mouseLightRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    // Decay scroll velocity in the main frame loop
    currentScrollVelocity = THREE.MathUtils.lerp(currentScrollVelocity, 0, delta * 3.0);

    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;

    // Continuous orbital camera angle + scroll panning rotation
    const scrollAngle = state.clock.getElapsedTime() * 0.04 + (scrollY * 0.0006);
    
    // Angled cinematic top-down perspective that orbits the whole system
    const targetCamX = Math.sin(scrollAngle) * 16.5;
    const targetCamZ = Math.cos(scrollAngle) * 16.5;
    const targetCamY = 7.5 + (scrollY * 0.0003); // very subtle camera rise

    const targetCameraPos = new THREE.Vector3(targetCamX, targetCamY, targetCamZ);

    // Easing camera target vectors towards the Sun (0, 0, 0)
    camera.position.lerp(targetCameraPos, 0.04);
    lookAtTargetRef.current.lerp(new THREE.Vector3(0, 0, 0), 0.04);
    camera.lookAt(lookAtTargetRef.current);

    // Mouse tracking specular point light
    if (mouseLightRef.current) {
      const { x, y } = state.pointer;
      mouseLightRef.current.position.copy(lookAtTargetRef.current);
      mouseLightRef.current.position.x += x * 6;
      mouseLightRef.current.position.y += (y * 5) + 1.5;
      mouseLightRef.current.position.z += 3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.25} />
      
      {/* Centered Sun point light emitting outwards to create realistic planet faces */}
      <pointLight position={[0, 0, 0]} intensity={18} distance={35} castShadow />
      
      {/* Mouse reactive point light */}
      <pointLight
        ref={mouseLightRef}
        position={[0, 0, 5]}
        intensity={2.5}
        distance={15}
        color="#00d2ff"
      />

      <Particles />

      {/* Orbit Rings indicators */}
      {PLANETS.map((planet) => {
        if (planet.name === "Sun") return null;
        const ringGeo = new THREE.RingGeometry(planet.orbitRadius - 0.012, planet.orbitRadius + 0.012, 64);
        return (
          <mesh key={`orbit-${planet.name}`} rotation={[Math.PI / 2, 0, 0]} geometry={ringGeo}>
            <meshBasicMaterial
              color="#38bdf8"
              side={THREE.DoubleSide}
              transparent={true}
              opacity={0.06}
            />
          </mesh>
        );
      })}

      {/* Planets rendering */}
      {PLANETS.map((planet) => (
        <Planet key={planet.name} data={planet} />
      ))}
    </>
  );
};

export const Scene3D: React.FC = () => {
  const [isInViewport, setIsInViewport] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Performance Optimization: Viewport observer culling
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-10 bg-transparent pointer-events-none no-print"
      aria-hidden="true"
    >
      {isInViewport && (
        <Canvas
          shadows={{ type: THREE.PCFShadowMap }}
          gl={{
            powerPreference: "high-performance",
            antialias: true,
            alpha: true,
          }}
          camera={{ position: [0, 8, 14], fov: 60 }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <SceneController />
          </Suspense>
          <AdaptiveDpr pixelated />
        </Canvas>
      )}
    </div>
  );
};
export default Scene3D;
