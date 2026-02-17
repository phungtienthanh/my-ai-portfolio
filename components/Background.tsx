"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Background = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    return () => motionQuery.removeEventListener("change", handleMotionChange);
  }, []);

  // Pause animations when page is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Determine animation based on visibility and motion preference
  const shouldAnimate = isPageVisible && !prefersReducedMotion;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-white">
      {/* Blurred gradient overlays - commented out for clean white background */}
      {/* 
      <motion.div 
        animate={shouldAnimate ? {
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        } : {}}
        transition={{ duration: 20, repeat: isPageVisible ? Infinity : 0, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-400/20 blur-[120px]"
        style={{ willChange: shouldAnimate ? "transform" : "auto" }}
      />
      <motion.div 
        animate={shouldAnimate ? {
          scale: [1, 1.3, 1],
          x: [0, -100, 0],
          y: [0, -50, 0],
        } : {}}
        transition={{ duration: 25, repeat: isPageVisible ? Infinity : 0, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-teal-300/15 blur-[120px]"
        style={{ willChange: shouldAnimate ? "transform" : "auto" }}
      />
      */}
      {/* CSS-based noise pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise'/%3E%3C/filter%3E%3Crect width='400' height='400' fill='%23000' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
        aria-hidden="true"
      />
    </div>
  );
};