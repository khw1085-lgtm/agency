"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu } from "lucide-react";
import Section002 from "@/components/Section002";

/* ─────────────────────────── DATA ─────────────────────────── */

const NAV = [
  "About",
  "Project",
  "Service",
  "Digital Marketing",
  "Contents",
  "Management",
  "Clients",
  "Awards",
  "Contact",
];

// 히어로 타이틀 롤링 — "인터랙티브웹" 영문 + 비슷한 맥락 (interactive web / creative craft)
const HERO_PHRASES = [
  "INTERACTIVE WEB",
  "MOTION DESIGN",
  "KINETIC CRAFT",
  "LIVING INTERFACE",
  "IMMERSIVE DIGITAL",
];
const HERO_ROLL_MS = 2000;

/* ─────────────────────── COMPONENTS ─────────────────────── */

function RollingHeroTitle() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % HERO_PHRASES.length);
    }, HERO_ROLL_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="w-full select-none font-semibold leading-[0.9] tracking-[-0.04em] text-[clamp(48px,12vw,172px)]"
    >
      {/* overflow-hidden wrapper clips the sliding phrase so it rolls in from below */}
      <span className="block overflow-hidden leading-[0.9]">
        <AnimatePresence mode="wait">
          <motion.span
            key={HERO_PHRASES[idx]}
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-105%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block whitespace-nowrap"
          >
            {HERO_PHRASES[idx]}
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.h1>
  );
}

/**
 * SiteNav — 전역 스티키 네비게이션.
 *  - 배경 없음(투명), 텍스트만 노출.
 *  - 스크롤 중인 현재 섹션의 `data-nav-theme` 값을 읽어
 *    "light" → 검정 폰트 / "dark" → 흰색 폰트 로 자동 전환.
 *  - 섹션에 `data-nav-theme="light"` (밝은 배경) 또는 `"dark"` (짙은 배경) 을 지정하면 됨.
 */
function SiteNav() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const probeY = 32; // 네비 중앙 근처의 측정 라인 (nav py ≈ 24~28)
    const update = () => {
      const sections = document.querySelectorAll<HTMLElement>("[data-nav-theme]");
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= probeY && r.bottom > probeY) {
          const t = s.getAttribute("data-nav-theme") as "light" | "dark" | null;
          if (t === "light" || t === "dark") setTheme(t);
          return;
        }
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const textColor = theme === "light" ? "text-black" : "text-white";

  return (
    <nav
      aria-label="Primary"
      className={
        "fixed left-0 top-0 z-50 flex w-full items-center justify-between " +
        "px-8 py-6 md:px-12 md:py-7 " +
        "transition-colors duration-300 " +
        textColor
      }
    >
      <motion.a
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-base font-black tracking-tight md:text-lg"
      >
        M-SYNC<span>.</span>
      </motion.a>

      <div className="hidden md:block">
        <ul className="flex items-center gap-7 text-[13px] font-medium tracking-tight lg:gap-10">
          {NAV.map((n, i) => (
            <motion.li
              key={n}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.04 }}
              className="relative cursor-pointer"
            >
              <span className="transition-opacity hover:opacity-50">{n}</span>
              <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-current transition-transform duration-300 hover:scale-x-100" />
            </motion.li>
          ))}
        </ul>
      </div>

      <button className="md:hidden" aria-label="Menu">
        <Menu className="h-5 w-5" />
      </button>
    </nav>
  );
}

function Header() {
  return (
    <section
      data-nav-theme="light"
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-white text-black"
    >
      {/* Small decorative dot at center-top */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="pointer-events-none absolute left-1/2 top-4 z-20 h-3 w-3 -translate-x-1/2 rounded-full bg-neutral-300"
      />

      {/* ─── Hero Typography (롤링 타이틀) ─── */}
      {/* nav 공간 확보를 위한 상단 패딩(py 대응) */}
      <div className="relative flex flex-1 items-center px-8 pt-24 md:px-12 md:pt-28">
        <RollingHeroTitle />
      </div>

      {/* ─── Bottom Row: tagline + WORK ARCHIVES ─── */}
      <div className="relative z-10 flex w-full items-end justify-between gap-6 px-8 pb-8 md:px-12 md:pb-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="text-[11px] font-medium leading-[1.5] tracking-wide md:text-[12px]"
        >
          A GLOBAL CREATIVE DESIGN STUDIO
          <br />
          FOR A DIGITAL-FIRST WORLD
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="group flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-[11px] font-semibold tracking-wider transition hover:border-black hover:bg-black hover:text-white md:text-[12px]"
        >
          WORK ARCHIVES
          <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </motion.button>
      </div>
    </section>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function AgencyInteractive() {
  return (
    <main className="relative bg-white">
      <SiteNav />
      <Header />
      <Section002 />
    </main>
  );
}
