"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Timeline", href: "#timeline" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [active, setActive] = useState("About");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -60% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // Filter only intersecting entries
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      
      if (visibleEntries.length > 0) {
        // Find the entry closest to top of viewport within preferred range
        const topEntry = visibleEntries.reduce((prev, current) => {
          const prevTop = prev.boundingClientRect.top;
          const currentTop = current.boundingClientRect.top;
          
          // Prefer entries in upper portion of viewport (0-240px from top)
          const prevInRange = prevTop >= 0 && prevTop <= 240;
          const currentInRange = currentTop >= 0 && currentTop <= 240;
          
          if (prevInRange && currentInRange) {
            // Both in preferred range, pick closer to top
            return currentTop < prevTop ? current : prev;
          }
          
          // One in range, prefer it
          if (currentInRange) return current;
          if (prevInRange) return prev;
          
          // Both outside range, pick closest to 0 (least negative)
          return Math.abs(currentTop) < Math.abs(prevTop) ? current : prev;
        });
        
        const sectionId = topEntry.target.id;
        const matchedItem = navItems.find((item) => item.href === `#${sectionId}`);
        if (matchedItem) setActive(matchedItem.name);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, itemName: string) => {
    e.preventDefault();
    setActive(itemName);
    
    const target = document.querySelector(e.currentTarget.getAttribute("href") || "");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Only render after mount to avoid hydration mismatches
  if (!isMounted) {
    return null;
  }

  return (
    <nav className="fixed top-4 sm:top-8 left-1/2 -translate-x-1/2 z-50" aria-label="Main navigation">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-0.5 sm:gap-1 bg-white/80 backdrop-blur-xl border border-gray-200 p-1 sm:p-1.5 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.1)]"
      >
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.name)}
            aria-current={active === item.name ? "page" : undefined}
            className={`relative px-3 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 focus:ring-offset-white
              ${active === item.name ? "text-emerald-600" : "text-gray-500 hover:text-gray-900"}
            `}
          >
            {item.name}
            {active === item.name && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/30 rounded-full -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </a>
        ))}
      </motion.div>
    </nav>
  );
};