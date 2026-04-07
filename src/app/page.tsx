"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Monitor, Smartphone, X, Menu, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Lenis from "lenis";
import BrillancePreview from "@/components/BrillancePreview";
import Work02Preview from "@/components/Work02Preview";
import Lottie from "lottie-react";
import aboutAnimation from "@/lottie/cat_animation.json";
import HeroTyping from "@/components/HeroTyping";
import HeroExpandSection from "@/components/HeroExpandSection";
import AIToolShowcase from "@/components/AIToolShowcase";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const colors = [
  "#FF6666", "#7C3AED", "#EA580C", 
  "#0891B2", "#BE185D", "#4F46E5", 
  "#10B981", "#F59E0B", "#DC2626", 
  "#8B5CF6", "#F43F5E", "#14B8A6"
];

const projects = [
  {
    id: "01",
    title: "PROJECT 01",
    category: "Design System",
    description: "CREATIVE DIRECTION AND DESIGN SYSTEM FOR AGENTIC AI.",
    color: "#000000",
    image: "/projects/logo_01.svg",
  },
  {
    id: "02",
    title: "ZIGBANG",
    category: "Fintech",
    description: "NEXT-GEN FINTECH INTERFACE AND DATA VISUALIZATION.",
    color: "#FF681B",
    image: "/projects/logo_02.svg",
  },
  {
    id: "03",
    title: "HGNN",
    category: "Analytics",
    description: "ADVANCED ANALYTICS PLATFORM DESIGN.",
    color: "#FFDE00",
    image: null,
  }
];

export default function Home() {
  const router = useRouter();
  const theme = "light";
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

  const [isIframe, setIsIframe] = useState(false);
  const [fullSiteId, setFullSiteId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('iframe') === 'true') {
      setIsIframe(true);
    }
    const fullSite = params.get('full_site');
    if (fullSite) {
      setFullSiteId(fullSite);
    }
  }, []);

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.06,
      wheelMultiplier: 1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  if (fullSiteId) {
    return (
      <div className="min-h-screen bg-white text-black transition-colors duration-[800ms]">
        {fullSiteId === "01" ? (
          <BrillancePreview theme={theme} />
        ) : fullSiteId === "02" ? (
          <div className="w-full bg-white text-black text-left flex flex-col items-center">
            <Work02Preview />
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-screen">Project not found</div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen min-w-[375px] flex flex-col items-center overflow-x-hidden pt-[56px] md:pt-[64px] bg-white text-black">
      {!isIframe && <Header theme={theme} />}

      <motion.main
        layout
        className="transition-colors duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] relative flex flex-col flex-1 origin-top bg-white w-full min-h-screen"
      >
        {isIframe ? null : (
          <>
            <HeroTyping theme={theme} />
            
            <div
              id="about-me-section"
              className="w-full h-screen px-5 md:px-8 max-w-[1500px] mx-auto flex flex-col items-center justify-center gap-[20px] relative"
            >
               <div className="w-full flex justify-center items-center">
                 <div className="w-[300px] h-[300px]">
                    <Lottie
                      animationData={aboutAnimation}
                      loop={true}
                      autoPlay={true}
                      style={{ width: '100%', height: '100%' }}
                    />
                 </div>
               </div>
               <div className="w-full text-center flex flex-col items-center max-w-[800px]">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[24px] md:text-[30px] font-semibold uppercase tracking-tighter mb-8 md:mb-10 text-black leading-none"
                  >
                     About me
                  </motion.h1>
                  <p className="text-[13px] md:text-sm leading-[1.8] tracking-widest mb-6 opacity-60 text-black uppercase text-center">
                     We are a forward-thinking creative studio specializing in digital innovation. Our focus is on crafting bold, timeless, and highly interactive experiences that defy expectations.
                  </p>
                  <p className="text-[13px] md:text-sm leading-[1.8] tracking-widest opacity-60 text-black uppercase text-center">
                     Welcome to the future of digital identity.
                  </p>
               </div>
            </div>

            <HeroExpandSection />
            
            <AIToolShowcase theme={theme} />

            <div id="work-section" className="flex-1 w-full px-5 md:px-8 max-w-[1500px] mx-auto py-16 md:py-28">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-[24px] md:text-[30px] font-semibold uppercase tracking-tighter mb-8 md:mb-10 text-black"
              >
                Work
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 items-start"
              >
                {projects.map((project, index) => (
                  <ThumbnailCard
                    key={project.id}
                    index={index}
                    project={project}
                    theme={theme}
                    onClick={() => router.push(`/project/${project.id}`)}
                  />
                ))}
              </motion.div>
            </div>

            <div id="contact-section" className="w-full px-5 md:px-8 max-w-[1500px] mx-auto py-16 md:py-28 flex flex-col">
               <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                 className="text-[24px] md:text-[30px] font-semibold uppercase tracking-tighter mb-8 md:mb-10 text-black"
               >
                 Contact
               </motion.h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                  <div className="flex flex-col gap-10">
                     {["성함", "전화번호", "이메일"].map((label) => (
                       <div key={label} className="flex flex-col gap-3">
                          <label className="text-[14px] font-bold uppercase tracking-widest text-black/40">{label} *</label>
                          <input className="bg-transparent border border-dashed-custom px-5 py-3 text-sm text-black" placeholder={`${label}을 입력해주세요.`} />
                       </div>
                     ))}
                  </div>
                  <div className="flex flex-col gap-10">
                     <div className="flex flex-col gap-3">
                        <label className="text-[14px] font-bold uppercase tracking-widest text-black/40">문의 내용 *</label>
                        <textarea rows={5} className="bg-transparent border border-dashed-custom px-5 py-3 text-sm text-black resize-none" placeholder="내용을 입력해주세요." />
                     </div>
                     <button className="w-full py-5 bg-black text-white font-bold uppercase tracking-widest hover:bg-[#ffde00] hover:text-black transition-all">Send Message</button>
                  </div>
               </div>
            </div>
          </>
        )}
      </motion.main>

    </div>
  );
}

function ThumbnailCard({ project, theme, onClick, index }: { project: any, theme: string, onClick: () => void, index: number }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex flex-col w-full cursor-pointer group"
      onClick={onClick}
    >
      <div className={cn(
        "w-full aspect-[4/5] bg-[#f8f8f8] border border-black/5 rounded-none overflow-hidden relative shadow-sm hover:shadow-xl transition-all duration-500",
        (index === 0 || index === 1) && "group-hover:border-black"
      )}>
        <div 
          className={cn(
            "absolute inset-0 transition-colors duration-500",
            (index === 0 || index === 1) ? "group-hover:!bg-white" : ""
          )} 
          style={{ backgroundColor: project.color }} 
        />
        {project.image && (
          <div className="absolute inset-0 flex items-center justify-center p-10 md:p-16">
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              src={project.image} 
              alt={project.title} 
              className={cn(
                "w-full h-auto object-contain brightness-100 transition-all duration-500",
                index === 1 ? "scale-[0.67]" : "scale-100",
                (index === 0 || index === 1) && "group-hover:brightness-0"
              )} 
            />
          </div>
        )}
        {index === 2 && !project.image && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-black font-bold text-2xl uppercase tracking-tighter">HGNN</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}


function Header({ theme }: { theme: "light" | "dark" }) {
  return (
    <nav className="fixed top-0 left-0 w-full z-[9999] px-5 md:px-8 py-4 md:py-5 flex justify-between items-center bg-white/90 backdrop-blur-md border-b border-black/5">
       <div className="flex items-center gap-2">
          <div className="w-7 h-7 md:w-8 md:h-8 rounded bg-black flex items-center justify-center font-black text-white text-lg">A</div>
          <span className="font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[11px] md:text-sm">Antigravity</span>
       </div>
       <div className="hidden md:flex gap-12 text-[10px] font-bold uppercase tracking-widest opacity-60">
          <a href="#about-me-section" className="hover:opacity-100 transition-opacity">Story</a>
          <a href="#work-section" className="hover:opacity-100 transition-opacity">Work</a>
          <a href="#contact-section" className="hover:opacity-100 transition-opacity">Enquiry</a>
       </div>
       <div className="md:hidden"><Menu className="w-5 h-5" /></div>
    </nav>
  );
}
