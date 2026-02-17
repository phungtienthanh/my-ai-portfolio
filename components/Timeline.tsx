"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { experiences } from "@/data/timeline";

export const Timeline = () => (
  <section id="timeline" className="py-20 scroll-mt-32 mb-64">
    <motion.h2 
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-2xl font-semibold mb-12 flex items-center gap-4 uppercase"
    >
      <span className="w-12 h-[1px] bg-gray-700"></span> Timeline
    </motion.h2>

    <div className="bg-emerald-100/40 rounded-2xl p-8 border border-emerald-200">
      <ol className="border-l border-emerald-300 ml-4 space-y-16">
      {experiences.map((exp) => (
        <li key={exp.id}>
          <motion.article 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (exp.id - 1) * 0.1, duration: 0.8 }}
            className="relative pl-8 group"
          >
            {/* Điểm mốc sáng lên khi hover */}
            <div className="absolute left-[-5px] top-1.5 w-[9px] h-[9px] rounded-full bg-gray-600 group-hover:bg-emerald-500 group-hover:shadow-[0_0_15px_#00b090] transition-all duration-300" />
            
            <div className="flex flex-col gap-1">
              <span className="text-[14px] font-mono font-bold text-emerald-600 uppercase tracking-widest leading-none">
                {exp.year}
              </span>
              
              <div className="flex flex-col mb-4">
                <h3 className="text-2xl md:text-[35px] font-bold uppercase transition-colors duration-300 group-hover:text-emerald-600">
                  {exp.title}
                </h3>
                <div className="flex items-center gap-3 mt-2">
                  {exp.logo && (
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      width={40}
                      height={40}
                      className="object-contain rounded"
                    />
                  )}
                  <span className="text-[18px] font-medium italic">
                    {exp.company}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed max-w-2xl mb-4 italic">
                {exp.desc}
              </p>

              {/* Tech Stack nhỏ đi kèm mỗi vị trí */}
              <div className="flex flex-wrap gap-2">
                {exp.tech.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 border-2 border-gray-300 rounded bg-gray-100/10 text-gray-700 font-mono font-semibold uppercase">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        </li>
      ))}
    </ol>
    </div>
  </section>
);