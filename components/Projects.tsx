"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { projects, Project } from "@/data/projects";

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // Default true to prevent FOUC
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);

  // Detect touch device on mount
  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (isTouchDevice) return;
    
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseXRef.current = clientX - left;
    mouseYRef.current = clientY - top;
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsHovering(!isHovering);
    }
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isTouchDevice && setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => isTouchDevice && setIsHovering(!isHovering)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={isHovering}
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group p-8 rounded-2xl border-2 border-gray-400 bg-gray-500/[0.02] overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 focus:ring-offset-white"
    >
      {/* Hiệu ứng Glow khi hover - Desktop only */}
      {!isTouchDevice && (
        <div
          className={`pointer-events-none absolute -inset-px rounded-2xl transition duration-300 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: isHovering
              ? `radial-gradient(400px circle at ${mouseXRef.current}px ${mouseYRef.current}px, rgba(0, 176, 144, 0.15), transparent 80%)`
              : "transparent",
          }}
        />
      )}

      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block group/link"
      >
        <h3 className={`text-2xl font-extrabold mb-3 transition-transform duration-300 uppercase text-gray-900 group-hover/link:text-emerald-600 group-hover/link:underline decoration-emerald-600 underline-offset-4 ${
          isHovering ? "translate-x-1" : ""
        }`}>
          {project.title}
        </h3>
      </a>
      <p className="text-gray-700 text-sm leading-relaxed mb-6 italic font-medium">
        {project.description}
      </p>

      {/* Tags Công nghệ */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {project.tech.map((t: string) => (
          <span
            key={t}
            className="text-[10px] px-2.5 py-1.5 bg-emerald-600 border border-emerald-500 rounded uppercase text-white shadow-sm "
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  return (
    <section id="projects" className="scroll-mt-32 mb-64">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-semibold mb-12 flex items-center gap-4 uppercase tracking-wider"
      >
        <span className="w-12 h-[1px] bg-gray-700"></span>
        Projects
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};