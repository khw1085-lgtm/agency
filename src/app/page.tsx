"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Monitor, Smartphone, ArrowUpRight, X, Menu, ChevronLeft, ChevronRight, ExternalLink, RotateCcw, Maximize2 } from "lucide-react";
import { motion, AnimatePresence, useScroll, useVelocity, useSpring, useTransform, useMotionValue, useMotionValueEvent, animate } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Lenis from "lenis";
import BrillancePreview from "@/components/BrillancePreview";
import Work02Preview from "@/components/Work02Preview";
import Lottie from "lottie-react";
import aboutAnimation from "@/lottie/cat_animation.json";
import catPlayingAnimation from "@/lottie/cat_playing.json";

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
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const [isIframe, setIsIframe] = useState(false);
  const [fullSiteId, setFullSiteId] = useState<string | null>(null);
  const [projectViewMode, setProjectViewMode] = useState<"desktop" | "mobile">("desktop");

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

  // Smooth Scroll Wrapper Setup
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.06,
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // 모바일 뷰 강제 라이트 모드
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && theme === "dark") {
        setTheme("light");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [theme]);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  if (fullSiteId) {
    return (
      <div className={cn(
        "min-h-screen transition-colors duration-[800ms]",
        theme === "dark" ? "bg-[#111111] text-white" : "bg-[#f7f6f2] text-black"
      )}>
        {fullSiteId === "01" ? (
          <BrillancePreview theme={theme} />
        ) : fullSiteId === "02" ? (
          <div className="w-full bg-white text-black text-left flex flex-col items-center work-02-preview">
            <Work02Preview />
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-screen">Project not found</div>
        )}
      </div>
    );
  }

  return (
    <div className={cn(
      "min-h-screen min-w-[375px] flex flex-col items-center overflow-x-hidden pt-[60px] transition-colors duration-[800ms]",
      theme === "dark" ? "bg-[#111111] text-white" : "bg-[#f7f6f2] text-black",
      isIframe ? "bg-transparent !pt-0" : ""
    )}>
      {!isIframe && <ThemeToggle theme={theme} setTheme={setTheme} />}
      
      {!isIframe && (
        <Header theme={theme} />
      )}

      <motion.main
        layout
        className={cn(
          "transition-colors duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] relative flex flex-col flex-1 origin-top",
          theme === "dark" ? "bg-[#111111]" : "bg-[#f7f6f2]",
          "w-full min-h-screen"
        )}
      >
        {isIframe ? null : (
          <>
          {/* 메인 About 섹션 */}
          <div
            id="about-section"
            className="w-full min-h-screen px-5 md:px-8 max-w-[1500px] mx-auto py-24 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-32 relative"
          >
             {/* 좌측: Lottie 아트워크 */}
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
             
             {/* 우측: 브랜드 소개 텍스트 */}
             <div className="flex-1 w-full text-center md:text-left flex flex-col justify-center">
                <h1 className={cn("text-4xl md:text-[50px] leading-none font-bold uppercase tracking-tighter mb-8 transition-colors duration-[800ms]", theme === "dark" ? "text-white" : "text-black")}>
                   About us
                </h1>
                <p className={cn("text-[13px] md:text-sm leading-[1.8] tracking-widest mb-6 opacity-60 transition-colors duration-[800ms] uppercase", theme === "dark" ? "text-white" : "text-black")}>
                   We are a forward-thinking creative studio specializing in digital innovation. Our focus is on crafting bold, timeless, and highly interactive experiences that defy expectations. Every line of code and pixel of design is meticulously aligned to bring visionary brands to life on the web.
                </p>
                <p className={cn("text-[13px] md:text-sm leading-[1.8] tracking-widest opacity-60 transition-colors duration-[800ms] uppercase", theme === "dark" ? "text-white" : "text-black")}>
                   From fluid animations to structural minimalism, we believe in the profound beauty of motion and the impact of a truly solid strategy. Welcome to the future of digital identity.
                </p>
             </div>
          </div>

          {/* Work 섹션 */}
          <div id="work-section" className="flex-1 w-full px-5 md:px-8 max-w-[1500px] mx-auto py-16 md:py-32">
            <h2 className={cn(
               "text-[32px] font-bold uppercase tracking-tighter mb-16 transition-colors duration-[800ms]",
               theme === "dark" ? "text-white" : "text-black"
            )}>
              Work
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-24 items-start">
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

          {/* Contact 섹션 */}
          <div id="contact-section" className="w-full min-h-screen px-5 md:px-8 max-w-[1500px] mx-auto py-24 flex flex-col pt-32">
            <div className="w-full mb-16">
              <h2 className={cn(
                 "text-[32px] font-bold uppercase tracking-tighter transition-colors duration-[800ms]",
                 theme === "dark" ? "text-white" : "text-black"
              )}>
                Contact
              </h2>
            </div>

            <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 items-start">
              {/* 좌측: 입력 필드 */}
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-3 group">
                  <label className={cn("text-[14px] font-bold uppercase tracking-widest", theme === "dark" ? "text-white/40" : "text-black/40")}>성함 *</label>
                  <input
                    type="text"
                    placeholder="성함을 입력해주세요."
                    className={cn("bg-transparent border border-dashed-custom input-focus-effect px-5 py-3 text-sm transition-colors duration-[800ms]", theme === "dark" ? "text-white" : "text-black")}
                  />
                </div>

                <div className="flex flex-col gap-3 group">
                  <label className={cn("text-[14px] font-bold uppercase tracking-widest", theme === "dark" ? "text-white/40" : "text-black/40")}>전화번호 *</label>
                  <input
                    type="tel"
                    placeholder="- 없이 숫자만 입력"
                    className={cn("bg-transparent border border-dashed-custom input-focus-effect px-5 py-3 text-sm transition-colors duration-[800ms]", theme === "dark" ? "text-white" : "text-black")}
                  />
                </div>

                <div className="flex flex-col gap-3 group">
                  <label className={cn("text-[14px] font-bold uppercase tracking-widest", theme === "dark" ? "text-white/40" : "text-black/40")}>이메일 *</label>
                  <input
                    type="email"
                    placeholder="customer@domain.com"
                    className={cn("bg-transparent border border-dashed-custom input-focus-effect px-5 py-3 text-sm transition-colors duration-[800ms]", theme === "dark" ? "text-white" : "text-black")}
                  />
                </div>

                <div className="flex flex-col gap-6">
                  <label className={cn("text-[14px] font-bold uppercase tracking-widest", theme === "dark" ? "text-white/40" : "text-black/40")}>어떤 종류의 사이트 제작을 원하시나요? (복수 선택 가능)</label>
                  <div className="flex flex-wrap gap-2">
                    {["회사/브랜드 홈페이지", "랜딩 페이지", "블로그", "인터렉티브 웹", "포트폴리오 사이트", "채용 사이트", "기타"].map((tag) => {
                      const isSelected = selectedTypes.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleType(tag)}
                          className={cn(
                            "px-4 py-2 border transition-all duration-300 text-[10px] font-bold uppercase tracking-wider",
                            isSelected
                              ? "bg-[#ffde00] text-black border-solid border-black"
                              : cn("border-dashed-custom border-dashed hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black", theme === "dark" ? "text-white/60" : "text-black/60")
                          )}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-3 group">
                  <label className={cn("text-[14px] font-bold uppercase tracking-widest", theme === "dark" ? "text-white/40" : "text-black/40")}>알게 된 경로 *</label>
                  <input
                    type="text"
                    placeholder="인터넷 검색 / 유튜브 / 추천 / 블로그 등"
                    className={cn("bg-transparent border border-dashed-custom input-focus-effect px-5 py-3 text-sm transition-colors duration-[800ms]", theme === "dark" ? "text-white" : "text-black")}
                  />
                </div>

                <div className="flex flex-col gap-3 group">
                  <label className={cn("text-[14px] font-bold uppercase tracking-widest", theme === "dark" ? "text-white/40" : "text-black/40")}>문의 내용 *</label>
                  <textarea
                    rows={4}
                    placeholder="요청 사항을 메시지로 남겨주세요."
                    className={cn("bg-transparent border border-dashed-custom input-focus-effect px-5 py-4 text-sm transition-colors duration-[800ms] resize-none", theme === "dark" ? "text-white" : "text-black")}
                  />
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <input type="checkbox" id="privacy" className="w-4 h-4 border border-dashed-custom rounded-none bg-transparent cursor-pointer" />
                  <label htmlFor="privacy" className={cn("text-[10px] font-bold uppercase tracking-[0.1em] opacity-60 cursor-pointer", theme === "dark" ? "text-white" : "text-black")}>
                    개인정보 수집 및 이용약관에 동의합니다. *
                  </label>
                </div>
              </div>

              {/* 우측: Lottie + 버튼 */}
              <div className="flex flex-col justify-center items-center min-h-full">
                <div className="max-w-md w-full mx-auto flex flex-col items-center">
                  <div className="mb-4 overflow-hidden flex items-center justify-center" style={{ width: 300, height: 300 }}>
                    <Lottie animationData={catPlayingAnimation} loop={true} style={{ width: 300, height: 300 }} />
                  </div>
                  <button
                    type="button"
                    className={cn(
                      "w-full px-12 py-6 rounded-full text-sm font-bold uppercase tracking-[0.3em] transition-all hover:scale-105 active:scale-95 shadow-2xl",
                      theme === "dark" ? "bg-[#ffde00] text-black" : "bg-black text-white"
                    )}
                  >
                    문의 접수하기
                  </button>
                </div>
              </div>
            </form>
          </div>
          </>
        )}

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)", y: "-4%" }}
              animate={{ clipPath: "inset(0 0 0% 0)", y: "0%" }}
              exit={{ clipPath: "inset(100% 0 0% 0)", y: "2%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              data-lenis-prevent
              className={cn(
                "fixed inset-0 z-[9999] overflow-y-auto scrollbar-hide",
                theme === "dark" ? "bg-[#111111] text-white" : "bg-[#f7f6f2] text-black"
              )}
            >
              {/* ── 상세페이지 헤더 (sticky top-0, 80px) ── */}
              <div
                className={cn(
                  "sticky top-0 z-[10001] w-full h-[80px] flex items-center justify-between px-6 md:px-8 border-b backdrop-blur-md",
                  theme === "dark"
                    ? "bg-[#111111]/80 border-white/10 text-white"
                    : "bg-[#f7f6f2]/80 border-black/8 text-black"
                )}
              >
                {/* 좌측: 인덱스 + 프로젝트명 */}
                <div className="flex items-center gap-6">
                  <span className={cn(
                    "text-[11px] font-bold uppercase tracking-[0.25em] opacity-40",
                    theme === "dark" ? "text-white" : "text-black"
                  )}>
                    {selectedProject.id} / 12
                  </span>
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "hidden md:block text-[13px] font-bold uppercase tracking-[0.15em]",
                      theme === "dark" ? "text-white" : "text-black"
                    )}>
                      {selectedProject.title}
                    </span>
                    <span className={cn(
                      "hidden md:block text-[11px] font-medium uppercase tracking-[0.1em] opacity-30",
                      theme === "dark" ? "text-white" : "text-black"
                    )}>|</span>
                    <span className={cn(
                      "hidden md:block text-[11px] font-medium uppercase tracking-[0.1em] opacity-30",
                      theme === "dark" ? "text-white" : "text-black"
                    )}>
                      {selectedProject.category}
                    </span>
                  </div>
                </div>

                {/* 우측: Close 버튼 */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className={cn(
                    "group flex items-center gap-2 uppercase font-bold text-xs tracking-widest hover:opacity-50 transition-all px-4 py-2 rounded-full",
                    theme === "dark" ? "bg-white/10 text-white" : "bg-black/5 text-black"
                  )}
                >
                  Close <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              {/* ── max-w-[1500px] 단일 래퍼: 타이틀 + 프레임 정렬 통일 ── */}
              <div className="w-full max-w-[1500px] mx-auto">

                {/* ── 타이틀 섹션 (높이 320px로 조정) ── */}
                <div
                  className="w-full px-6 md:px-8 flex flex-col justify-end"
                  style={{ height: 320, paddingBottom: 60 }}
                >
                  {/* 중앙: 대형 프로젝트 제목 — fluid 폰트로 overflow 방지 */}
                  <h1
                    className={cn(
                      "font-bold uppercase tracking-tight leading-none mb-8",
                      theme === "dark" ? "text-white" : "text-black"
                    )}
                    style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
                  >
                    {selectedProject.title}
                  </h1>

                  {/* 하단: 서브텍스트 */}
                  <p className={cn(
                    "text-[13px] md:text-[14px] leading-[1.9] uppercase opacity-40 font-medium max-w-2xl",
                    theme === "dark" ? "text-white" : "text-black"
                  )}>
                    Elevating the brand&apos;s digital presence through a meticulous alignment of sophisticated motion and architectural minimalism. Delivering a seamless experience across all platforms.
                  </p>
                </div>

                {/* ── 브라우저 프레임 (sticky top-[80px] → 헤더 아래에 걸림) ── */}
                <div
                  className={cn(
                    "sticky top-[80px] z-10 flex flex-col border overflow-hidden",
                    "h-[calc(100vh-80px)]",
                    theme === "dark" ? "bg-black border-white/20" : "bg-[#fdfdfd] border-black"
                  )}
                >
                  {/* 상단 브라우저 프레임 헤더 */}
                  <div className={cn(
                    "w-full h-14 flex items-center justify-between px-6 border-b shrink-0",
                    theme === "dark" ? "bg-black/40 border-white/10" : "bg-white/80 backdrop-blur-md border-black/5"
                  )}>
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* 더미 윈도우 컨트롤 */}
                      <div className="hidden md:flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                      </div>
                      {/* 주소창 스타일의 컨트롤러 */}
                      <div className={cn(
                        "flex items-center gap-3 px-4 py-2 rounded-xl text-[11px] font-medium flex-1 min-w-0",
                        theme === "dark" ? "bg-white/5 text-white/40" : "bg-[#f3f3f3] text-black/40"
                      )}>
                        <div className="flex items-center gap-3">
                          <ChevronLeft className="w-4 h-4 cursor-pointer hover:text-black dark:hover:text-white" />
                          <ChevronRight className="w-4 h-4 cursor-pointer hover:text-black dark:hover:text-white" />
                        </div>
                        <span className="mx-2 opacity-10">/</span>
                        <span className="truncate flex-1 tracking-tight">/{selectedProject.title.toLowerCase().replace(/\s+/g, '-')}</span>
                        <div className="flex items-center gap-3 border-l border-black/5 dark:border-white/5 pl-3 ml-1">
                          <ExternalLink
                            className="w-4 h-4 cursor-pointer hover:text-black dark:hover:text-white transition-colors"
                            onClick={() => window.open(selectedProject.id === "01" ? "/?full_site=01" : "/?full_site=02", "_blank")}
                          />
                          <RotateCcw className="w-4 h-4 cursor-pointer hover:text-black dark:hover:text-white transition-colors" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => window.open(selectedProject.id === "01" ? "/?full_site=01" : "/?full_site=02", "_blank")}
                        className={cn(
                          "group flex items-center gap-2 py-2 px-4 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                          theme === "dark" ? "bg-white text-black" : "bg-black text-white hover:bg-[#3b82f6]"
                        )}
                      >
                        OPEN WEB <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* 프레임 내 콘텐츠 스크롤 영역 */}
                  <div
                    data-lenis-prevent
                    className={cn(
                      "flex-1 overflow-y-auto pretty-scrollbar transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
                      projectViewMode === "mobile" ? "w-full flex justify-center py-6 px-4 bg-[#f0f0f0] dark:bg-black/40" : "w-full"
                    )}
                  >
                    <div
                      className={cn(
                        "transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] origin-top",
                        projectViewMode === "mobile"
                          ? "border-[6px] border-black/10 dark:border-white/10 rounded-[40px] overflow-y-auto shadow-2xl bg-white flex-shrink-0"
                          : "w-full"
                      )}
                      style={projectViewMode === "mobile" ? {
                        width: "min(390px, calc(100vw - 32px))",
                        minHeight: 600,
                        maxHeight: "calc(100vh - 120px)",
                      } : undefined}
                    >
                      {selectedProject.id === "01" ? (
                        <BrillancePreview theme={theme} />
                      ) : selectedProject.id === "02" ? (
                        <div className="w-full bg-white text-black text-left flex flex-col work-02-preview">
                          <Work02Preview />
                        </div>
                      ) : (
                        <div
                          className="w-full aspect-[16/10] relative flex items-center justify-center p-12"
                          style={{ backgroundColor: selectedProject.color }}
                        >
                          {selectedProject.image ? (
                            <img
                              src={selectedProject.image}
                              alt={selectedProject.title}
                              className="w-full h-full object-cover rounded-xl shadow-2xl"
                            />
                          ) : (
                            <div className="z-10 bg-white/10 backdrop-blur-3xl border border-white/20 p-8 rounded-2xl text-center max-w-md">
                              <p className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-4">Preview Area</p>
                              <p className="text-white/60 text-[11px] leading-relaxed uppercase">High-resolution project gallery and interactive demonstration assets would be presented in this viewport.</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>{/* sticky 프레임 끝 */}

                {/* sticky 이후 추가 스크롤 공간 */}
                <div className="h-[100vh]" />

              </div>{/* max-w-[1500px] 래퍼 끝 */}

            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
      
      {/* 글로벌 원형 커서 */}
      <GlobalCustomCursor theme={theme} />
    </div>
  );
}

function ThumbnailCard({
  project,
  index,
  onClick,
  theme
}: {
  project: typeof projects[0];
  index: number;
  onClick: () => void;
  theme: "light" | "dark";
}) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 30, stiffness: 200 });

  const squishY = useTransform(smoothVelocity, [-1500, 0, 1500], [0.66, 1, 0.66]);

  const mouseX = useMotionValue(200);
  const mouseY = useMotionValue(250);

  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    mouseX.set(localX);
    mouseY.set(localY);
  };

  const handleMouseLeave = () => {
    mouseX.set(200);
    mouseY.set(250);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, zIndex: 50 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      style={{ scaleY: squishY }}
      className="flex flex-col w-full max-w-[400px] relative group origin-center mx-auto"
      onClick={onClick}
    >
      <div className="flex flex-col w-full text-xs font-semibold uppercase tracking-tight mb-[2px] relative transition-colors duration-[800ms]">
        <div className={cn("text-[10px] mb-1", theme === "dark" ? "text-gray-400" : "text-gray-500")}>{project.id} / 12</div>
        <div className="flex justify-between items-end pb-2">
          <span className="text-[13px]">{project.title}</span>
          <span className={cn("font-normal text-[11px]", theme === "dark" ? "text-gray-500" : "text-gray-500")}>
            {project.category}
          </span>
        </div>
      </div>

      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "w-full aspect-[400/300] max-h-[300px] relative mt-2 mb-2 overflow-hidden rounded-[20px] border transition-colors duration-[800ms]",
          theme === "dark"
            ? "bg-[#222] border-white/10"
            : "bg-[#ebeae6] border-black/10"
        )}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0 w-full h-full"
            style={{ backgroundColor: project.color }}
          />
        )}
      </div>
    </motion.div>
  );
}

// 테마 스위치 컴포넌트
function ThemeToggle({ theme, setTheme }: { theme: "light" | "dark", setTheme: (t: "light" | "dark") => void }) {
  return (
    <div className="hidden md:flex fixed top-1/2 -translate-y-1/2 right-12 z-[9000] flex-col items-start gap-3 font-bold uppercase tracking-widest text-[18px]">
      <div
        onClick={() => setTheme("dark")}
        className="relative cursor-pointer flex items-center h-8 group"
      >
        <div className="w-6 flex justify-center mr-2 relative">
          {theme === "dark" && (
            <motion.div layoutId="themeDot" className="absolute w-[8px] h-[8px] rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
          )}
        </div>
        <span className={cn(
           "transition-colors duration-[800ms]",
           theme === "dark" ? "text-white" : "text-[#777] group-hover:text-[#333]"
        )}>
          Dark
        </span>
      </div>

      <div
        onClick={() => setTheme("light")}
        className="relative cursor-pointer flex items-center h-8 group"
      >
        <div className="w-6 flex justify-center mr-2 relative">
          {theme === "light" && (
            <motion.div layoutId="themeDot" className="absolute w-[8px] h-[8px] rounded-full bg-black shadow-[0_0_12px_rgba(0,0,0,0.5)]" />
          )}
        </div>
        <span className={cn(
           "transition-colors duration-[800ms]",
           theme === "light" ? "text-black" : "text-[#888] group-hover:text-white"
        )}>
          Light
        </span>
      </div>
    </div>
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
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className={cn(
        "fixed top-0 left-0 w-[70px] h-[70px] rounded-full pointer-events-none z-[10000] transition-colors duration-[800ms]",
        theme === "dark" ? "bg-white" : "bg-black"
      )}
    />
  );
}

function Header({
  theme
}: {
  theme: "light" | "dark";
}) {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 100) setVisible(false);
    else if (latest < previous) setVisible(true);

    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      setVisible(true);
    }, 400);
  });

  const menuItems = [
    { label: "Home", target: "top" },
    { label: "About", target: "about-section" },
    { label: "Work", target: "work-section", offset: 100 },
    { label: "Contact", target: "contact-section" },
  ];

  const handleScroll = (target: string, offset: number = 0) => {
    setIsMenuOpen(false);
    if (target === "top") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(target);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : "-100%" }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[8000] h-[80px] flex items-center justify-between px-6 md:px-12 backdrop-blur-md transition-colors duration-[800ms]",
          theme === "dark" ? "bg-[#111111]/70" : "bg-[#f7f6f2]/70"
        )}
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-black/10 dark:bg-white/10" />
        </div>

        {/* 데스크탑 메뉴 */}
        <div className="hidden md:flex items-center justify-center gap-24 uppercase font-bold tracking-[0.2em] text-[18px]">
          {menuItems.map((item) => (
            <a
              key={item.label}
              onClick={() => handleScroll(item.target, item.offset)}
              className={cn("cursor-pointer transition-all duration-[800ms] hover:opacity-50", theme === "dark" ? "text-white" : "text-black")}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* 모바일 햄버거 버튼 */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className={cn("md:hidden p-2 transition-colors duration-[800ms]", theme === "dark" ? "text-white" : "text-black")}
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden md:block w-[80px]" />
      </motion.header>

      {/* 모바일 전체 화면 메뉴 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className={cn(
              "fixed inset-0 z-[9000] flex flex-col items-center justify-center transition-colors duration-[800ms]",
              theme === "dark" ? "bg-[#111111]" : "bg-[#f7f6f2]"
            )}
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className={cn("absolute top-8 right-8 p-4", theme === "dark" ? "text-white" : "text-black")}
            >
              <X className="w-8 h-8" />
            </button>

            <div className="flex flex-col items-center gap-12">
              {menuItems.map((item, idx) => (
                <motion.a
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleScroll(item.target, item.offset)}
                   className={cn(
                    "text-4xl font-bold uppercase tracking-[0.2em] cursor-pointer",
                    theme === "dark" ? "text-white" : "text-black"
                  )}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
