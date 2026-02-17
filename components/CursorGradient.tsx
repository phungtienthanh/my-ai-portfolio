"use client";
import { useEffect, useRef, useState } from "react";

export const CursorGradient = () => {
  const mousePos = useRef({ x: 0, y: 0 });
  const [displayPos, setDisplayPos] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Detect touch device
    const touchQuery = window.matchMedia("(pointer:coarse)");
    setIsTouchDevice(touchQuery.matches);

    // Initialize center position để tránh hydration mismatch
    if (typeof window !== "undefined") {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mousePos.current = { x: centerX, y: centerY };
      setDisplayPos({ x: centerX, y: centerY });
    }

    const handleTouchChange = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches);
    };
    touchQuery.addEventListener("change", handleTouchChange);

    return () => touchQuery.removeEventListener("change", handleTouchChange);
  }, []);

  useEffect(() => {
    // Không setup mousemove listener nếu là touch device
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        setDisplayPos({ x: mousePos.current.x, y: mousePos.current.y });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMounted, isTouchDevice]);

  // Only render cursor gradient on desktop (not touch)
  // On first load/hydration, render invisible div to prevent layout shift
  if (isTouchDevice) {
    return null; // Touch device → no cursor gradient needed
  }

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: isMounted 
          ? `radial-gradient(800px at ${displayPos.x}px ${displayPos.y}px, rgba(0, 176, 144, 0.12), transparent 80%)`
          : "transparent",
        willChange: "transform",
        opacity: isMounted ? 1 : 0,
      }}
    />
  );
};