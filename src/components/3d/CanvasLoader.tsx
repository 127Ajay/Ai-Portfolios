"use client";

import React, { useEffect, useRef } from "react";
import { Html, useProgress } from "@react-three/drei";

export const CanvasLoader: React.FC = () => {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Subscribe to progress changes and update DOM directly to avoid setState in render conflicts
    const unsubscribe = useProgress.subscribe((state) => {
      if (textRef.current) {
        textRef.current.textContent = `${state.progress.toFixed(1)}% loaded`;
      }
    });

    // Set initial value safely
    if (textRef.current) {
      textRef.current.textContent = `${useProgress.getState().progress.toFixed(1)}% loaded`;
    }

    return () => unsubscribe();
  }, []);
  
  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <span className="canvas-loader" />
      <p
        ref={textRef}
        style={{
          fontSize: 14,
          color: "#06b6d4",
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        0.0% loaded
      </p>
    </Html>
  );
};
export default CanvasLoader;

