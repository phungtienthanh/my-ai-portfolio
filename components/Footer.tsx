"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="border-t border-emerald-200 py-16 mt-20 bg-emerald-50/50"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Main Content */}
        <div className="text-center space-y-6 mb-10">
          {/* Tagline */}
          <div className="space-y-2">
            <p className="text-lg font-semibold text-emerald-900 tracking-tight">
              Crafting intelligent solutions with AI
            </p>
            <p className="text-sm text-emerald-700 italic">
              Passionate about Computer Vision & ML
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center justify-center gap-4 text-sm text-emerald-700">
            <Link
              href="/privacy-policy"
              className="hover:text-emerald-900 transition-colors duration-300 hover:underline"
            >
              Privacy Policy
            </Link>
            <span className="text-emerald-300">·</span>
            <span className="font-mono text-xs">Built with React & Next.js</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent my-8" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs text-emerald-600">
            © {currentYear} Phùng Tiến Thành. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};
