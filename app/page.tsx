"use client";

import { Background } from "@/components/Background";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Timeline } from "@/components/Timeline";

export default function Home() {
  return (
    <>
      <Background />
      <main className="min-h-screen px-4 sm:px-6 py-16 sm:py-20 max-w-5xl mx-auto relative z-10 overflow-hidden">
        <section id="about" aria-label="About me">
          <About />
        </section>
        <section id="timeline" aria-label="Work experience timeline">
          <Timeline />
        </section>
        <section id="projects" aria-label="Featured projects">
          <Projects />
        </section>
        <section id="contact" aria-label="Contact information">
          <Contact />
        </section>
      </main>
    </>
  );
}