"use client";

import { useState, useEffect, useRef } from "react";
import { Monitor, Smartphone, ArrowUpRight, X, Menu, ChevronLeft, ChevronRight, ExternalLink, RotateCcw, Maximize2 } from "lucide-react";
import { motion, AnimatePresence, useScroll, useVelocity, useSpring, useTransform, useMotionValue, useMotionValueEvent } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Lenis from "lenis";
import BrillancePreview from "@/components/BrillancePreview";
import Work02Preview from "@/components/Work02Preview";
import Lottie from "lottie-react";
import aboutAnimation from "@/lottie/cat_animation.json";
import catPlayingAnimation from "@/lottie/cat_playing.json";
import HeroTyping from "@/components/HeroTyping";
import HeroExpandSection from "@/components/HeroExpandSection";

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
    title: "BRILLANCE",
    category: "SaaS Billing Site",
    description: "EFFORTLESS CUSTOM CONTRACT BILLING FOR MODERN ENTERPRISE. A SEAMLESS AUTOMATION PLATFORM BUILT BY BRILLANCE.",
    color: "#F7F5F3",
    image: "/projects/work_01.png",
  },
  {
    id: "02",
    title: "FINTECH PLATFORM",
    category: "Banking Solutions",
    description: "NEXT-GENERATION DIGITAL BANKING INTERFACE AND FINANCIAL TOOLS.",
    color: "#0F172A",
    image: "/projects/work_02.png",
  },
  ...Array.from({ length: 10 }, (_, i) => ({
    id: String(i + 3).padStart(2, '0'),
    title: `PROJECT ${i + 3}`,
    category: (i + 1) % 2 === 0 ? "Turnkey site" : "Corporate site",
    description: `THIS IS A CREATIVE PROJECT SHOWCASE NUMBER ${i + 3}...`,
    color: colors[(i + 1) % colors.length],
    image: null,
  })),
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const theme = "light";

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

  // 모달 오픈 시 Lenis 정지로 배경 스크롤 완전 차단
  useEffect(() => {
    if (selectedProject) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [selectedProject]);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

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
          <HeroExpandSection />
          
          <div
            id="about-section"
            className="w-full min-h-screen px-5 md:px-8 max-w-[1500px] mx-auto py-24 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-32 relative"
          >
             <div className="flex-1 w-full flex justify-center items-center">
               <div className="w-[300px] h-[300px]">
                  <Lottie
                    animationData={aboutAnimation}
                    loop={true}
                    autoPlay={true}
                    style={{ width: '100%', height: '100%' }}
                  />
               </div>
             </div>
             <div className="flex-1 w-full text-center md:text-left flex flex-col justify-center">
                <h1 className="text-4xl md:text-[50px] leading-none font-bold uppercase tracking-tighter mb-8 text-black">
                   About us
                </h1>
                <p className="text-[13px] md:text-sm leading-[1.8] tracking-widest mb-6 opacity-60 text-black uppercase">
                   We are a forward-thinking creative studio specializing in digital innovation. Our focus is on crafting bold, timeless, and highly interactive experiences that defy expectations.
                </p>
                <p className="text-[13px] md:text-sm leading-[1.8] tracking-widest opacity-60 text-black uppercase">
                   Welcome to the future of digital identity.
                </p>
             </div>
          </div>

          <div id="work-section" className="flex-1 w-full px-5 md:px-8 max-w-[1500px] mx-auto py-16 md:py-28">
            <h2 className="text-2xl md:text-[32px] font-bold uppercase tracking-tighter mb-8 md:mb-16 text-black">
              Work
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 items-start">
              {projects.map((project, index) => (
                <ThumbnailCard
                  key={project.id}
                  index={index}
                  project={project}
                  theme={theme}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </div>

          <div id="contact-section" className="w-full px-5 md:px-8 max-w-[1500px] mx-auto py-16 md:py-28 flex flex-col">
             <h2 className="text-2xl md:text-[32px] font-bold uppercase tracking-tighter mb-10 md:mb-16 text-black">Contact</h2>
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

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-2 md:p-10 pointer-events-none"
          >
            <div onClick={() => setSelectedProject(null)} className="absolute inset-0 bg-white/60 cursor-pointer pointer-events-auto backdrop-blur-xl" />
            <motion.div
              layoutId={`project-${selectedProject.id}`}
              className="relative w-full max-w-[1400px] h-[95vh] md:h-[90vh] rounded-[16px] md:rounded-[32px] overflow-hidden pointer-events-auto flex flex-col bg-white border border-black/5 shadow-2xl z-20"
            >
              <div className="h-12 md:h-16 flex items-center justify-between px-4 md:px-8 border-b border-black/5 bg-white/80 backdrop-blur-md shrink-0">
                 <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                 </div>
                 <h3 className="hidden md:block text-[11px] font-bold uppercase tracking-[0.2em] opacity-30">{selectedProject.title} / {selectedProject.category}</h3>
                 <button onClick={() => setSelectedProject(null)} className="p-2 hover:bg-black/5 rounded-full transition-all">
                    <X className="w-5 h-5" />
                 </button>
              </div>
              {/* 콘텐츠 스크롤 영역 - Lenis 제외 */}
              <div
                className="flex-1 overflow-y-auto custom-scrollbar bg-white overscroll-contain"
                data-lenis-prevent
              >
                <div className="w-full flex flex-col h-fit">
                  {selectedProject.id === "01" ? <BrillancePreview theme={theme} /> : <Work02Preview />}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <GlobalCustomCursor theme={theme} />
    </div>
  );
}

function ThumbnailCard({ project, theme, onClick }: { project: any, theme: string, onClick: () => void, index: number }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex flex-col w-full cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex flex-col text-xs font-semibold uppercase tracking-tight mb-2">
        <span className="opacity-40 mb-1">{project.id} / 12</span>
        <div className="flex justify-between items-end">
          <span className="text-[13px] font-bold">{project.title}</span>
          <span className="opacity-40 text-[10px]">{project.category}</span>
        </div>
      </div>
      <div className="w-full aspect-[400/300] bg-[#f8f8f8] border border-black/5 rounded-2xl overflow-hidden relative">
        {project.image ? (
          <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <div className="w-full h-full" style={{ backgroundColor: project.color }} />
        )}
      </div>
    </motion.div>
  );
}

function GlobalCustomCursor({ theme }: { theme: "light" | "dark" }) {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 800, damping: 30, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 800, damping: 30, mass: 0.5 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);
  return (
    <motion.div
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      className="fixed top-0 left-0 w-[70px] h-[70px] rounded-full pointer-events-none z-[21000] bg-black"
    />
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
          <a href="#about-section" className="hover:opacity-100 transition-opacity">Story</a>
          <a href="#work-section" className="hover:opacity-100 transition-opacity">Work</a>
          <a href="#contact-section" className="hover:opacity-100 transition-opacity">Enquiry</a>
       </div>
       <div className="md:hidden"><Menu className="w-5 h-5" /></div>
    </nav>
  );
}
