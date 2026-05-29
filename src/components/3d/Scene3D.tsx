"use client";

import React, { useEffect, useRef } from "react";

const CODE_SNIPPETS = [
  "await producer.ProduceAsync(\"events\", message);",
  "public void ProcessOutboxQueue() {",
  "SELECT TOP 100 * FROM OperationsLog WITH (NOLOCK);",
  "var session = new EventStreamSession();",
  "Checkmarx.ScanCompliance(policy: Enterprise);",
  "SignalR.Hub.Clients.All.SendAsync(\"TelemetryUpdate\", data);",
  "AWS.SecretsManager.GetSecret(\"DatabaseConnectionString\");",
  "using (var transaction = dbContext.Database.BeginTransaction())",
  "Apache.Kafka.Stream.Pipeline.Initialize();",
  "public async Task<IActionResult> GetRealTimeDash() {",
  "reCAPTCHA.VerifyClientToken(token);",
  "01010101101011001100111010110111",
  "SYSTEM_HEALTH: OK | KAFKA_LAG: 0ms | DB_LOAD: 12%",
  "SpecFlow.Feature(\"ManufacturingExecutionSystem\");",
  "[TransactionBoundOutbox] eventId = Guid.NewGuid();",
  "WCF.ServiceHost.Open();",
  "Worker.BackgroundService.ExecuteAsync(token);",
  "System.Diagnostics.Process.GetCurrentProcess().WorkingSet64;",
  "ORDER BY Timestamp DESC OPTION (RECOMPILE);",
  "C#", ".NET Core", "Apache Kafka", "SQL Server", "SignalR", "AWS", "Checkmarx", "Outbox"
];

export const Scene3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Track scroll velocity for interactive speed boost
  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high-DPI screens
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize columns
    const fontSize = 11;
    const columnsCount = Math.floor(canvas.width / 16);
    
    // Each column has position, speed, text snippet, character index, and opacity
    const columns = Array.from({ length: columnsCount }, () => {
      const snippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height, // start above the screen
        speed: 1.0 + Math.random() * 2.2,
        snippet: snippet,
        charIndex: 0,
        colorType: Math.random() > 0.5 ? "cyan" : "emerald",
      };
    });

    // Track scroll velocity
    lastScrollYRef.current = window.scrollY;
    lastScrollTimeRef.current = Date.now();

    const handleScroll = () => {
      const now = Date.now();
      const currentY = window.scrollY;
      const timeDelta = Math.max(1, now - lastScrollTimeRef.current);
      const scrollDelta = Math.abs(currentY - lastScrollYRef.current);
      
      const velocity = scrollDelta / timeDelta;
      scrollVelocityRef.current += velocity * 1.5;
      scrollVelocityRef.current = Math.min(scrollVelocityRef.current, 15.0); // Cap velocity boost

      lastScrollYRef.current = currentY;
      lastScrollTimeRef.current = now;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });

    let animationFrameId: number;

    // Render loop
    const render = () => {
      // Very slight decay of scroll velocity back to baseline
      scrollVelocityRef.current *= 0.95;
      if (scrollVelocityRef.current < 0.05) scrollVelocityRef.current = 0;

      // Draw dark semi-transparent overlay to create fading trails
      ctx.fillStyle = "rgba(3, 7, 18, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text parameters
      ctx.font = `${fontSize}px "Consolas", "Courier New", monospace`;
      
      // Draw dynamic coding streams
      columns.forEach((col) => {
        // Calculate interactive speed multiplier
        const currentSpeed = (col.speed + scrollVelocityRef.current * 1.8);
        
        // Advance stream down the screen
        col.y += currentSpeed;

        // Render snippet character-by-character along the y path
        const charsToShow = Math.floor(Math.abs(col.y) / (fontSize * 1.2));
        
        for (let i = 0; i < charsToShow; i++) {
          const charY = col.y - (i * fontSize * 1.2);
          if (charY < 0 || charY > canvas.height) continue;

          // Pick character from active snippet string
          const char = col.snippet[(col.charIndex + i) % col.snippet.length];

          // The head of the stream glows bright white (like movie matrix rain!)
          if (i === 0) {
            ctx.fillStyle = "#ffffff";
            ctx.shadowColor = col.colorType === "cyan" ? "#06b6d4" : "#10b981";
            ctx.shadowBlur = 8;
          } else {
            // Fade colors down the tail
            const opacity = Math.max(0.05, 1.0 - (i / 18));
            ctx.fillStyle = col.colorType === "cyan" 
              ? `rgba(6, 182, 212, ${opacity * 0.45})` 
              : `rgba(16, 185, 129, ${opacity * 0.45})`;
            ctx.shadowBlur = 0;
          }

          ctx.fillText(char, col.x, charY);
        }

        // Reset column if it fully scrolls off the screen
        if (col.y - (col.snippet.length * fontSize * 1.2) > canvas.height) {
          col.x = Math.random() * canvas.width;
          col.y = -50 - Math.random() * 200;
          col.speed = 1.0 + Math.random() * 2.2;
          col.snippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
          col.charIndex = Math.floor(Math.random() * col.snippet.length);
          col.colorType = Math.random() > 0.5 ? "cyan" : "emerald";
        }
      });

      // Draw high-tech CRT Scanlines Overlay
      ctx.fillStyle = "rgba(3, 7, 18, 0.02)";
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 1);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full -z-20 bg-[#030712] pointer-events-none no-print overflow-hidden"
      aria-hidden="true"
    >
      {/* Background radial matrix glow for futuristic depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.03)_0%,transparent_75%)] z-0 pointer-events-none" />
      
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-65 z-10"
      />
    </div>
  );
};

export default Scene3D;
