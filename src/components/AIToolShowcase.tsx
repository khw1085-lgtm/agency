"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Cpu, Code, Database, Zap, Binary, Terminal } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const codeSnippets = [
  "const neuralNetwork = new AgencyNeuralCore();",
  "neuralNetwork.train({ data: creativeVision });",
  "const finalDesign = neuralNetwork.generateUI();",
  "console.log('Antigravity Builder Online.');"
];

const mockJSON = {
  project_id: "ANTIGRAVITY_BUILDER_v1.0",
  status: "Ready for Orchestration",
  engine: "Zero-Gravity-V9",
  accuracy: "100%",
  sync_mode: "Quantum"
};

export default function AIToolShowcase({ theme }: { theme: "light" | "dark" }) {
  const [typedText, setTypedText] = useState("");
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < codeSnippets[snippetIndex].length) {
      const timer = setTimeout(() => {
        setTypedText(prev => prev + codeSnippets[snippetIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setTypedText("");
        setCharIndex(0);
        setSnippetIndex(prev => (prev + 1) % codeSnippets.length);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [charIndex, snippetIndex]);

  return (
    <section id="ai-tool-section" className="w-full py-32 px-5 md:px-8 max-w-[1500px] mx-auto overflow-hidden relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* 좌측: 브랜드 스토리 및 액션 */}
        <div className="flex flex-col gap-8 order-2 lg:order-1 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
             <div className="w-10 h-10 rounded-xl bg-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-400/20">
                <Zap className="text-black w-5 h-5 fill-black" />
             </div>
             <span className={cn("text-xs font-bold uppercase tracking-[0.4em] opacity-40", theme === "dark" ? "text-white" : "text-black")}>
               Beyond Zero Gravity
             </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={cn(
              "text-[45px] md:text-[90px] leading-[0.9] font-bold uppercase tracking-tighter transition-colors duration-[800ms]",
              theme === "dark" ? "text-white" : "text-black"
            )}
          >
            Design with <br />
            <span className="text-cyan-400 font-extrabold italic">Antigravity</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={cn(
            "text-[14px] md:text-lg leading-[1.8] tracking-[0.1em] opacity-60 uppercase max-w-[550px]",
            theme === "dark" ? "text-white" : "text-black"
          )}>
            Experience the future of web orchestration with Antigravity Builder. 
            Automate complex layout logic and generate cinematic digital identities 
            with our proprietary AI-driven creative environment.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 mt-4"
          >
             <button className={cn(
               "px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
               theme === "dark" ? "bg-white text-black hover:bg-cyan-400" : "bg-black text-white hover:bg-cyan-600"
             )}>
                Start Building Now
             </button>
             <button className={cn(
               "px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all",
               theme === "dark" ? "border-white/20 text-white hover:border-white" : "border-black/20 text-black hover:border-black"
             )}>
                View AI Analytics
             </button>
          </motion.div>

          {/* AI 스테이터스 요약 */}
          <div className="grid grid-cols-2 gap-4 mt-8">
             <div className={cn("p-6 border rounded-[24px] flex flex-col gap-2 backdrop-blur-sm", theme === "dark" ? "border-white/10 bg-white/5" : "border-black/5 bg-black/5")}>
                <Database className="w-5 h-5 opacity-40 text-cyan-400" />
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">Builder Engine v9.0</span>
                <span className="text-2xl font-bold tracking-tighter text-cyan-400">Initialized</span>
             </div>
             <div className={cn("p-6 border rounded-[24px] flex flex-col gap-2 backdrop-blur-sm", theme === "dark" ? "border-white/10 bg-white/5" : "border-black/5 bg-black/5")}>
                <Binary className="w-5 h-5 opacity-40 text-indigo-400" />
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">Neural Pathfinding</span>
                <span className="text-2xl font-bold tracking-tighter text-indigo-400">99.9% Optimal</span>
             </div>
          </div>
        </div>

        {/* 우측: Antigravity Builder UI 미리보기 */}
        <div className="relative order-1 lg:order-2 group perspective-2000">
           {/* 메인 이미지 (Actual Antigravity Builder Screenshot Style) */}
           <motion.div
             initial={{ opacity: 0, scale: 0.8, rotateX: 5, rotateY: 10 }}
             animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className={cn(
               "relative z-10 w-full rounded-[32px] overflow-hidden border shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]",
               theme === "dark" ? "border-white/10" : "border-black/10"
             )}
           >
              <img 
                src="/images/antigravity-builder.png" 
                alt="Antigravity Builder UI" 
                className="w-full aspect-[4/3.5] object-cover contrast-110 saturate-110 group-hover:scale-105 transition-transform duration-[2000ms]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-20 pointer-events-none bg-[length:100%_2px,3px_100%]" />
           </motion.div>

           {/* 코딩 터미널 오버레이 */}
           <motion.div
             initial={{ x: 100, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 1.2, duration: 1 }}
             className="absolute -top-12 -right-4 md:-right-20 z-20 w-[280px] md:w-[380px] bg-black/80 rounded-[20px] p-8 shadow-2xl border border-white/20 backdrop-blur-3xl"
           >
              <div className="flex items-center gap-3 mb-4">
                 <Terminal className="w-5 h-5 text-cyan-400" />
                 <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest">Neural Orchestrator</span>
                 <div className="ml-auto flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    <div className="w-2 h-2 rounded-full bg-cyan-400/20" />
                 </div>
              </div>
              <div className="font-mono text-[11px] md:text-[13px] text-white/90 leading-relaxed">
                 <span className="text-cyan-400">$ </span>
                 <span>{typedText}</span>
                 <motion.span 
                   animate={{ opacity: [1, 0] }}
                   transition={{ duration: 0.8, repeat: Infinity }}
                   className="inline-block w-2 h-5 bg-cyan-400 ml-1 align-middle"
                 />
              </div>
           </motion.div>

           {/* 플로팅 엘리먼트 */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none opacity-10">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="w-full h-full border border-cyan-400/30 rounded-full"
              />
           </div>
        </div>
      </div>
    </section>
  );
}
