"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function AIToolShowcase({ theme }: { theme: "light" | "dark" }) {
  const fullText = "Build a Next.js dashboard with an activity graph using Recharts and a Prisma backend";
  const [displayText, setDisplayText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (displayText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      }, 40);
      return () => clearTimeout(timer);
    } else {
      setIsDone(true);
    }
  }, [displayText]);

  return (
    <section id="ai-tool-section" className="w-full py-32 px-5 md:px-20 max-w-[1600px] mx-auto overflow-hidden relative">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-32 items-center">
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

        {/* 우측: 그래디언트 카드 영역 */}
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
            {/* 배경 그래디언트 */}
            <div className="absolute inset-0 opacity-40 blur-[80px]">
              <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-200/40 animate-pulse" />
              <div className="absolute bottom-[10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-200/40 animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] rounded-full bg-yellow-100/40 animate-pulse" style={{ animationDelay: '2s' }} />
              <div className="absolute bottom-[-10%] left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-100/40 animate-pulse" style={{ animationDelay: '3.5s' }} />
            </div>

            {/* 카드 내부의 플로팅 레이블 */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className={cn(
                  "px-8 py-6 rounded-[24px] border backdrop-blur-md shadow-2xl flex flex-col gap-1 max-w-[400px]",
                  theme === "dark" ? "bg-white/10 border-white/20" : "bg-white/90 border-black/5"
                )}
              >
                <p className={cn(
                  "text-[15px] md:text-[16px] leading-[1.5] font-medium tracking-tight",
                  theme === "dark" ? "text-white" : "text-black"
                )}>
                  {displayText}
                  {!isDone && (
                    <motion.span 
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-1 h-4 bg-cyan-500 ml-1 align-middle"
                    />
                  )}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
