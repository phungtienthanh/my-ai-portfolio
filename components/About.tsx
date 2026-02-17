"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

const SKILLS = ["Computer Vision", "Machine Learning", "AI/ML"];
const EXPERTISE = [
  { label: "AI & ML", level: 90 },
  { label: "Data Analysis", level: 85 },
  { label: "Problem Solving", level: 95 },
];
const PROCESSING_STATES = ["Analyzing Problems", "Designing Solutions", "Implementing Results"];

const EDUCATION_COURSES = [
  "Machine Learning",
  "Deep Learning",
  "Computer Vision",
  "Natural Language Processing",
  "Big Data Storage & Processing",
  "Data Structures & Algorithms",
  "Probability & Statistics",
  "Linear Algebra",
  "Database",
  "Parallel Distributed Programming",
];

export const About = () => {
  const [processingIndex, setProcessingIndex] = useState(0);
  const [educationExpanded, setEducationExpanded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProcessingIndex((prev) => (prev + 1) % PROCESSING_STATES.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    const timelineSection = document.getElementById("timeline");
    timelineSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="mb-32 mt-20 scroll-mt-32 pb-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="bg-emerald-100/40 rounded-2xl p-8 border border-emerald-200">
          {/* Processing Header - Enhanced */}
          <div className="mb-12">
            {/* Animated Bars */}
            <div className="flex items-center gap-2 mb-6" aria-hidden="true">
              <div className="flex items-end gap-[2px] h-6">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 4 }}
                    animate={{
                      height: [4, 24, 8, 20, 6, 22, 10, 18, 12, 4],
                    }}
                    transition={{
                      duration: 1.8,
                      delay: i * 0.1,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    className="w-[3px] bg-gradient-to-t from-emerald-500 to-emerald-400 shadow-[0_0_8px_#00b090] rounded-full"
                  />
                ))}
              </div>
            </div>

            {/* Cycling Text with Status */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <motion.div
                  key={processingIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6 }}
                  className="h-8 flex items-center"
                >
                  <span className="font-mono text-sm sm:text-base tracking-[0.3em] text-emerald-600 uppercase font-bold">
                    {PROCESSING_STATES[processingIndex]}
                  </span>
                </motion.div>

                {/* Status Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex items-center gap-2 mt-3"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#00b090]"
                  />
                  <span className="text-xs sm:text-sm text-emerald-700 font-semibold">
                    Status: Actively Learning & Building
                  </span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Name & Role */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-3 tracking-tighter leading-none"
          >
            PHÙNG <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-emerald-600 to-emerald-700 uppercase">
              TIẾN THÀNH
            </span>
          </motion.h1>

          {/* Role Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-emerald-600 font-semibold mb-8 italic tracking-wide"
          >
            AI Engineer | Data Specialist
          </motion.h2>

          {/* Education Section - Expandable */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-8 bg-gradient-to-r from-emerald-500/10 to-emerald-400/10 border border-emerald-300/50 rounded-lg p-4"
          >
            <button
              onClick={() => setEducationExpanded(!educationExpanded)}
              className="flex items-center justify-between w-full text-left hover:text-emerald-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Image 
                  src="/logoHUST.png" 
                  alt="HUST Logo"
                  width={28}
                  height={28}  
                  className="w-7 h-7 object-contain"
                />
                <div>
                  <div className="font-semibold text-emerald-700">
                    Bachelor of Data Science & AI
                  </div>
                  <div className="text-sm text-gray-600">
                    Hanoi University of Science & Technology (HUST) • 2022 - 2026
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ rotate: educationExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-emerald-600"
              >
                ▼
              </motion.div>
            </button>

            {/* Expandable Content */}
            <motion.div
              initial={false}
              animate={{
                height: educationExpanded ? "auto" : 0,
                opacity: educationExpanded ? 1 : 0,
                marginTop: educationExpanded ? 12 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-emerald-300/30">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Relevant Coursework:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {EDUCATION_COURSES.map((course, index) => (
                    <motion.div
                      key={course}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {course}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Skills Badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {SKILLS.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, backgroundColor: "rgb(16, 185, 129)" }}
                className="px-4 py-2 bg-emerald-500/20 border border-emerald-400 rounded-full text-sm font-semibold text-emerald-700 transition-all cursor-default"
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="h-[1px] bg-emerald-300 mb-10 origin-left"
          />

          {/* Description Paragraphs */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.75 }}
            viewport={{ once: true }}
            className="relative mb-10"
          >
            <div className="absolute left-0 top-0 h-full w-[2px] bg-emerald-500/20 overflow-hidden">
              <motion.div 
                initial={{ y: "-100%" }}
                animate={{ y: "100%" }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                className="h-1/2 w-full bg-gradient-to-b from-transparent via-emerald-500 to-transparent"
              />
            </div>

            <div className="pl-6 sm:pl-8 space-y-6">
              <p className="text-base sm:text-base md:text-lg text-gray-700 font-medium leading-relaxed max-w-3xl">
                Chào mừng đến với hành trình khám phá trí tuệ nhân tạo của tôi. Tại đây, tôi chia sẻ những dự án đột phá và kiến thức sâu sắc về Data & AI, được xây dựng trên nền tảng tư duy tối giản nhưng hiệu quả vượt trội. Hãy cùng tôi bước vào thế giới của những ý tưởng táo bạo và công nghệ tiên tiến.
              </p>
              
              <p className="text-base sm:text-base md:text-lg text-gray-700 font-medium leading-relaxed max-w-3xl">
                Với kinh nghiệm trong <span className="font-bold text-emerald-600">Computer Vision</span>, <span className="font-bold text-emerald-600">Machine Learning</span> và <span className="font-bold text-emerald-600">xử lý dữ liệu lớn</span>, tôi chuyên tạo ra những giải pháp thông minh giải quyết các thách thức phức tạp.
              </p>
            </div>
          </motion.div>

          {/* Expertise Bars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.95 }}
            viewport={{ once: true }}
            className="space-y-6 mb-12"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-6">Expertise</h3>
            {EXPERTISE.map((item, index) => (
              <div key={item.label}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">{item.label}</span>
                  <span className="text-sm font-bold text-emerald-600">{item.level}%</span>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.level}%` }}
                  transition={{ duration: 1.2, delay: 1.1 + index * 0.15, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="h-2 bg-emerald-400 rounded-full relative overflow-hidden"
                >
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                </motion.div>
              </div>
            ))}
          </motion.div>

          {/* CTA Button with Arrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            viewport={{ once: true }}
            className="flex justify-center pt-6 border-t border-emerald-200"
          >
            <motion.button
              onClick={scrollToProjects}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
            >
              <span className="text-sm tracking-widest uppercase">Explore My Work</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChevronDown size={24} />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};