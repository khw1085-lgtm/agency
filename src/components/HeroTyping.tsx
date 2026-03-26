"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function HeroTyping({ theme }: { theme: "light" | "dark" }) {
  const fullText = "Experience liftoff with the next-generation IDE";
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"typing" | "waiting">("typing");

  useEffect(() => {
    if (phase === "typing") {
      if (displayText.length < fullText.length) {
        const timer = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, 60);
        return () => clearTimeout(timer);
      } else {
        setPhase("waiting");
      }
    }
  }, [displayText, phase]);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-white overflow-hidden px-5 md:px-12">
      <div className="max-w-[1000px] w-full text-center">
        <h1 className="text-[32px] sm:text-[48px] md:text-[72px] lg:text-[88px] leading-[1.05] font-semibold tracking-[-0.03em] text-black">
          <span className="relative">
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-[2px] md:w-[3px] h-[30px] sm:h-[44px] md:h-[68px] lg:h-[80px] bg-black ml-1 md:ml-2 align-middle"
            />
          </span>
        </h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "waiting" ? 0.4 : 0 }}
          className="mt-10 md:mt-16 flex flex-col items-center gap-4"
        >
          <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.4em] text-black">The Future is Here</span>
          <div className="w-[1px] h-12 md:h-16 bg-black" />
        </motion.div>
      </div>
    </section>
  );
}
