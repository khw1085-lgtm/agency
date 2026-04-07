"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function AIToolShowcase({ theme }: { theme: "light" | "dark" }) {
  useEffect(() => {
    // Typing animation state cleanup if needed, but here we don't need it anymore
  }, []);

  return (
    <section id="ai-tool-section" className="w-full py-32 px-5 md:px-20 max-w-[1600px] mx-auto overflow-hidden relative">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "text-[24px] md:text-[30px] font-semibold mb-8 md:mb-10 tracking-tighter uppercase",
          theme === "dark" ? "text-white" : "text-black"
        )}
      >
        Skill
      </motion.h2>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-32 items-center"
      >
        {/* 좌측: 텍스트 영역 */}
        <div className="flex flex-col gap-6 max-w-[500px]">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "text-[42px] md:text-[56px] leading-[1.1] font-medium tracking-tight",
              theme === "dark" ? "text-white" : "text-black"
            )}
          >
            Higher-level Abstractions
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "text-[16px] md:text-[18px] leading-[1.6] opacity-50 font-normal",
              theme === "dark" ? "text-white" : "text-black"
            )}
          >
            A more intuitive task-based approach to monitoring agent activity, 
            presenting you with essential artifacts and verification results to build trust.
          </motion.p>
        </div>

        {/* 우측: 비디오 카드 영역 */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95, x: 20 }}
           whileInView={{ opacity: 1, scale: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="relative aspect-[4/3] lg:aspect-[1.4/1] w-full"
        >
          {/* 메인 카드 */}
          <div className={cn(
            "w-full h-full rounded-[48px] overflow-hidden relative shadow-[0_40px_100px_rgba(0,0,0,0.05)] border",
            theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border-black/[0.03]"
          )}>
            {/* 비디오 배경 */}
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover scale-105"
            >
              <source src="/videos/showcase.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* 비디오 위의 투명 레이어 */}
            <div className="absolute inset-0 bg-black/[0.02]" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
