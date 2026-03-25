"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Monitor, Smartphone, ArrowUpRight, X, Menu } from "lucide-react";
import { motion, AnimatePresence, useScroll, useVelocity, useSpring, useTransform, useMotionValue, useMotionValueEvent, animate } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Lenis from "lenis";
import BrillancePreview from "@/components/BrillancePreview";
import Lottie from "lottie-react";
import aboutAnimation from "@/lottie/cat_animation.json";

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
  ...Array.from({ length: 11 }, (_, i) => ({
    id: String(i + 2).padStart(2, '0'),
    title: `PROJECT ${i + 2}`,
    category: (i + 1) % 2 === 0 ? "Turnkey site" : "Corporate site",
    description: `THIS IS A CREATIVE PROJECT SHOWCASE NUMBER ${i + 2}...`,
    color: colors[(i + 1) % colors.length],
    image: null,
  })),
];

export default function Home() {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Smooth Scroll Wrapper Setup (글로벌 적용)
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.06, // 좀 더 부드럽게 감속 (반박자 늦게)
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

  // 모바일 뷰 강제 라이트 모드 전환 (반응형 다크모드 제한)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && theme === "dark") {
        setTheme("light");
      }
    };
    handleResize(); // Load 시 확인
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [theme]);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  return (
    <div className={cn(
      "min-h-screen flex flex-col items-center overflow-x-hidden pt-[60px] transition-colors duration-[800ms]",
      theme === "dark" ? "bg-[#111111] text-white" : "bg-[#f7f6f2] text-black"
    )}>
      <ThemeToggle theme={theme} setTheme={setTheme} />
      
      <Header 
        theme={theme} 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
      />

      <motion.main
        layout
        className={cn(
          "transition-colors duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] relative flex flex-col flex-1 origin-top",
          theme === "dark" ? "bg-[#111111]" : "bg-[#f7f6f2]",
          viewMode === "mobile"
            ? cn("w-[375px] my-8 mx-auto border border-dashed-custom rounded-[40px] overflow-hidden min-h-[812px]", theme === "dark" ? "border-white/10" : "border-black/10")
            : "w-full min-h-screen"
        )}
      >
        {/* 메인 About 섹션 */}
        <div 
          id="about-section" 
          className="w-full min-h-screen px-5 md:px-0 md:max-w-[70vw] mx-auto py-24 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-32 relative"
        >
           {/* 좌측: 콘텐츠 영역 (Lottie 아트워크) */}
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
           
           {/* 우측: 브랜드 소개 텍스트 영역 */}
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

        {/* 
          - 맥시멈 70vw 제한 및 중앙 정렬 처리 (mx-auto)
        */}
        <div id="work-section" className="flex-1 w-full px-5 md:px-0 md:max-w-[70vw] mx-auto py-16 md:py-32">
          {/* 섹션 타이틀 (가로 정렬된 그리드 위쪽에 배치) */}
          <h2 className={cn(
             "text-[32px] font-bold uppercase tracking-tighter mb-16 transition-colors duration-[800ms]",
             theme === "dark" ? "text-white" : "text-black"
          )}>
            Work
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 md:gap-y-24 items-start">
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

        {/* Contact 섹션 (최하단, 브라우저 세로 100%) */}
        <div id="contact-section" className="w-full min-h-screen px-5 md:px-0 md:max-w-[70vw] mx-auto py-24 flex flex-col pt-32">
          {/* 섹션 타이틀 (Work 섹션과 위치 동일하게 좌측 정렬) */}
          <div className="w-full mb-16">
            <h2 className={cn(
               "text-[32px] font-bold uppercase tracking-tighter transition-colors duration-[800ms]",
               theme === "dark" ? "text-white" : "text-black"
            )}>
              Contact
            </h2>
          </div>

          <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 items-start">
            {/* 좌측: 입력 필드 영역 */}
            <div className="flex flex-col gap-10">
              {/* 성함 */}
              <div className="flex flex-col gap-3 group">
                <label className={cn("text-[14px] font-bold uppercase tracking-widest", theme === "dark" ? "text-white/40" : "text-black/40")}>성함 *</label>
                <input 
                  type="text" 
                  placeholder="성함을 입력해주세요." 
                  className={cn("bg-transparent border border-dashed-custom input-focus-effect px-5 py-3 text-sm transition-colors duration-[800ms]", theme === "dark" ? "text-white" : "text-black")}
                />
              </div>

              {/* 전화번호 */}
              <div className="flex flex-col gap-3 group">
                <label className={cn("text-[14px] font-bold uppercase tracking-widest", theme === "dark" ? "text-white/40" : "text-black/40")}>전화번호 *</label>
                <input 
                  type="tel" 
                  placeholder="- 없이 숫자만 입력" 
                  className={cn("bg-transparent border border-dashed-custom input-focus-effect px-5 py-3 text-sm transition-colors duration-[800ms]", theme === "dark" ? "text-white" : "text-black")}
                />
              </div>

              {/* 이메일 */}
              <div className="flex flex-col gap-3 group">
                <label className={cn("text-[14px] font-bold uppercase tracking-widest", theme === "dark" ? "text-white/40" : "text-black/40")}>이메일 *</label>
                <input 
                  type="email" 
                  placeholder="customer@domain.com" 
                  className={cn("bg-transparent border border-dashed-custom input-focus-effect px-5 py-3 text-sm transition-colors duration-[800ms]", theme === "dark" ? "text-white" : "text-black")}
                />
              </div>

              {/* 제작 종류 (태그 스타일) */}
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

              {/* 알게 된 경로 */}
              <div className="flex flex-col gap-3 group">
                <label className={cn("text-[14px] font-bold uppercase tracking-widest", theme === "dark" ? "text-white/40" : "text-black/40")}>알게 된 경로 *</label>
                <input 
                  type="text" 
                  placeholder="인터넷 검색 / 유튜브 / 추천 / 블로그 등" 
                  className={cn("bg-transparent border border-dashed-custom input-focus-effect px-5 py-3 text-sm transition-colors duration-[800ms]", theme === "dark" ? "text-white" : "text-black")}
                />
              </div>

              {/* 문의 내용 */}
              <div className="flex flex-col gap-3 group">
                <label className={cn("text-[14px] font-bold uppercase tracking-widest", theme === "dark" ? "text-white/40" : "text-black/40")}>문의 내용 *</label>
                <textarea 
                  rows={4}
                  placeholder="요청 사항을 메시지로 남겨주세요." 
                  className={cn("bg-transparent border border-dashed-custom input-focus-effect px-5 py-4 text-sm transition-colors duration-[800ms] resize-none", theme === "dark" ? "text-white" : "text-black")}
                />
              </div>

              {/* 개인정보 동의 */}
              <div className="flex items-center gap-3 mt-4">
                <input type="checkbox" id="privacy" className="w-4 h-4 border border-dashed-custom rounded-none bg-transparent cursor-pointer" />
                <label htmlFor="privacy" className={cn("text-[10px] font-bold uppercase tracking-[0.1em] opacity-60 cursor-pointer", theme === "dark" ? "text-white" : "text-black")}>
                  개인정보 수집 및 이용약관에 동의합니다. *
                </label>
              </div>
            </div>

            {/* 우측: 설명글 및 버튼 영역 */}
            <div className="flex flex-col justify-center items-center min-h-full">
              <div className="max-w-md w-full mx-auto">
                <p className={cn(
                  "text-[13px] leading-[1.8] tracking-widest uppercase opacity-60 mb-12 transition-colors duration-[800ms]",
                  theme === "dark" ? "text-white" : "text-black"
                )}>
                  Ready to transform your vision into a digital reality? Our team is dedicated to crafting extraordinary experiences that resonate with your audience and elevate your brand's presence in the global landscape. Fill out the form to initiate a conversation about your next visionary project.
                </p>
                <button 
                  type="submit" 
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

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              data-lenis-prevent
              className={cn(
                "fixed inset-0 z-[9999] p-8 md:p-16 overflow-y-auto block",
                theme === "dark" ? "bg-[#111111] text-white" : "bg-[#f7f6f2] text-black"
              )}
            >
              {/* 상단 닫기 헤더 */}
              <div className="flex justify-end mb-12">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="group flex items-center gap-3 uppercase font-bold text-xs tracking-widest hover:opacity-50 transition-all"
                >
                  Close <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              {/* 디테일 레이아웃: 제목 (48px) 상단 배치, 1600px 맥스값 */}
              <div className="max-w-[1600px] mx-auto w-full pb-60 px-4 md:px-0">
                
                {/* 첫 번째 줄: 프로젝트 제목 (48px) - 라인 제거 */}
                <div className="w-full pb-10">
                  <h1 className={cn(
                    "text-[48px] font-bold uppercase tracking-tight",
                    theme === "dark" ? "text-white" : "text-black"
                  )}>
                    {selectedProject.title}
                  </h1>
                </div>

                {/* 두 번째 줄: 설명글 가로 최대 가변 레이아웃 */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24 items-start">
                  {/* 설명글 (12컬럼 전체 채움) - 가로 최대 가변 적용 */}
                  <div className="md:col-span-12 flex flex-col pt-1">
                    <div className="w-full text-justify">
                      <p className={cn(
                        "text-[14px] leading-[1.8] uppercase opacity-40 font-medium",
                        theme === "dark" ? "text-white" : "text-black"
                      )}>
                        Elevating the brand&apos;s digital presence through a meticulous alignment of sophisticated motion and architectural minimalism. This project redefined the visual landscape of the industry, delivering a seamless experience across all platforms. In a world where digital experiences are often cluttered, we chose a path of radical simplicity.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 사이트 게시 영역 (코드로 구현될 영역) */}
                <div className="w-full flex flex-col gap-12">
                  <div className={cn(
                    "w-full border rounded-lg overflow-hidden bg-white/5",
                    theme === "dark" ? "border-white/20" : "border-black"
                  )}>
                    {selectedProject.id === "01" ? (
                      <BrillancePreview theme={theme} />
                    ) : (
                      <div 
                        className="w-full aspect-[16/10] relative rounded-lg overflow-hidden flex items-center justify-center"
                        style={{ backgroundColor: selectedProject.color }}
                      >
                        {selectedProject.image ? (
                          <img 
                            src={selectedProject.image} 
                            alt={selectedProject.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <>
                            <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                            <div className="z-10 bg-white/10 backdrop-blur-3xl border border-white/20 p-8 rounded-2xl text-center max-w-md">
                              <p className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-4">Preview Area</p>
                              <p className="text-white/60 text-[11px] leading-relaxed uppercase">High-resolution project gallery and interactive demonstration assets would be presented in this viewport.</p>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
      
      {/* 70사이즈의 글로벌 원형 검정색 커서 */}
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

  // 스크롤 시 h값(높이)이 1.5배 눌리게 작동시킵니다 (1 / 1.5 = 0.66)
  const squishY = useTransform(smoothVelocity, [-1500, 0, 1500], [0.66, 1, 0.66]);

  // 섬네일 로컬 좌표계 트래커 (텍스트 툴팁용)
  const mouseX = useMotionValue(200);
  const mouseY = useMotionValue(250);

  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    
    // 절대 픽셀 좌표값 매핑
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
      {/* 텍스트 영역 (배경색 제거로 자연스러운 글로벌 테마 스로스페이드 흡수) */}
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

        {/* 커서 추적 텍스트 제거됨 */}
      </div>

      <div className="flex items-start justify-between py-[14px] mt-[8px] relative transition-colors duration-[800ms]">
        <p className={cn(
           "text-[10px] font-medium max-w-[85%] leading-[1.4] uppercase pr-4 transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] origin-top-left group-hover:scale-[1.4] group-hover:font-semibold",
           theme === "dark" ? "text-gray-400 group-hover:text-white" : "text-gray-600 group-hover:text-black"
        )}>
          {project.description}
        </p>
        <div className="flex-shrink-0 pt-0.5">
          <ArrowUpRight className={cn(
             "w-4 h-4 transition-colors duration-300 group-hover:translate-x-1 group-hover:-translate-y-1",
             theme === "dark" ? "text-[#555] group-hover:text-white" : "text-[#888] group-hover:text-black"
          )} />
        </div>
      </div>
    </motion.div>
  );
}

// 실시간 테마 스위치 컴포넌트 (우측 100px 고정, 날아다니는 인디케이터 도트 포함, 18px로 조절됨)
function ThemeToggle({ theme, setTheme }: { theme: "light" | "dark", setTheme: (t: "light" | "dark") => void }) {
  return (
    <div className="hidden md:flex fixed top-1/2 -translate-y-1/2 right-[100px] z-[9000] flex-col items-start gap-3 font-bold uppercase tracking-widest text-[18px]">
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
          Dark Theme
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
          Light Theme
        </span>
      </div>
    </div>
  );
}



function GlobalCustomCursor({ theme }: { theme: "light" | "dark" }) {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 최고급 커스텀 커서의 빠르고 부드러운 반응성 스프링
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
  theme, 
  viewMode, 
  setViewMode 
}: { 
  theme: "light" | "dark";
  viewMode: "desktop" | "mobile";
  setViewMode: (mode: "desktop" | "mobile") => void;
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
          <button 
            onClick={() => setViewMode("desktop")}
            className={cn(
              "p-2 rounded-full transition-all",
              viewMode === "desktop" 
                ? (theme === "dark" ? "bg-white text-black" : "bg-black text-white")
                : (theme === "dark" ? "text-white/40 hover:text-white" : "text-black/40 hover:text-black")
            )}
          >
            <Monitor className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setViewMode("mobile")}
            className={cn(
              "p-2 rounded-full transition-all",
              viewMode === "mobile" 
                ? (theme === "dark" ? "bg-white text-black" : "bg-black text-white")
                : (theme === "dark" ? "text-white/40 hover:text-white" : "text-black/40 hover:text-black")
            )}
          >
            <Smartphone className="w-5 h-5" />
          </button>
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

      {/* 모바일 전체 화면 메뉴 오버레이 */}
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
