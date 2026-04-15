"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useScrollLag } from "@/lib/useScrollLag";

/**
 * Section 003 — About (blink invert on full viewport fill)
 *
 * 100vh. 섹션이 뷰포트를 꽉 채우는 순간 딱 한 번 배경이 검정으로 반전됐다가
 * 다시 흰색으로 돌아오는 "깜빡이다 원상 복귀" 연출.
 *
 * 타임라인 (트리거 이후 약 0.8초):
 *   0.00s  흰(기본)
 *   0.08s  검정 (flash 1)
 *   0.20s  흰
 *   0.32s  검정 (flash 2)
 *   0.44s  흰
 *   0.56s  검정 (flash 3 — 살짝만)
 *   0.80s  흰 (최종 유지)
 *
 * 배경이 검정인 찰나에만 글씨색도 흰색으로 뒤집혀 보임.
 * 트리거 후에는 영구히 흰 배경 + 검정 텍스트로 고정.
 */

// 블링크 keyframes (backgroundColor & color) — times 와 맞추어야 함
const BLINK_BG = ["#ffffff", "#000000", "#ffffff", "#000000", "#ffffff", "#000000", "#ffffff"];
const BLINK_FG = ["#000000", "#ffffff", "#000000", "#ffffff", "#000000", "#ffffff", "#000000"];
const BLINK_TIMES = [0, 0.1, 0.25, 0.4, 0.55, 0.7, 1];
const BLINK_DURATION = 0.8; // 초
const BLINK_TRIGGER_PROGRESS = 0.95; // 섹션 top 이 viewport top 에 거의 닿을 때

export default function Section003() {
  const sectionRef = useRef<HTMLElement>(null);
  const [blinking, setBlinking] = useState(false);
  const [blinkDone, setBlinkDone] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  // scrollYProgress 가 임계값 도달 시 1회 블링크
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!blinkDone && latest >= BLINK_TRIGGER_PROGRESS) {
      setBlinking(true);
      setBlinkDone(true);
    }
  });

  // 블링크 중 잠깐 nav 테마를 번갈아 가며 바꿔서 네비 폰트도 같이 깜빡이게
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !blinking) return;
    // keyframe 중간중간 바뀜. data-nav-theme 도 동일 스케줄로 토글
    const toggles: Array<[number, "light" | "dark"]> = [
      [0, "light"],
      [BLINK_DURATION * 1000 * 0.1, "dark"],
      [BLINK_DURATION * 1000 * 0.25, "light"],
      [BLINK_DURATION * 1000 * 0.4, "dark"],
      [BLINK_DURATION * 1000 * 0.55, "light"],
      [BLINK_DURATION * 1000 * 0.7, "dark"],
      [BLINK_DURATION * 1000, "light"],
    ];
    const timers = toggles.map(([t, theme]) =>
      setTimeout(() => el.setAttribute("data-nav-theme", theme), t)
    );
    // 블링크 종료 후 상태 리셋
    const end = setTimeout(() => setBlinking(false), BLINK_DURATION * 1000 + 50);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(end);
    };
  }, [blinking]);

  const lagY = useScrollLag();

  return (
    <motion.section
      ref={sectionRef}
      aria-label="Section 003 · About"
      data-nav-theme="light"
      // 평상시는 흰 배경 + 검정 텍스트. 블링크 시 keyframe 으로 덮어씀
      animate={
        blinking
          ? { backgroundColor: BLINK_BG, color: BLINK_FG }
          : { backgroundColor: "#ffffff", color: "#000000" }
      }
      transition={
        blinking
          ? { duration: BLINK_DURATION, times: BLINK_TIMES, ease: "linear" }
          : { duration: 0 }
      }
      className="relative flex h-screen w-full flex-col justify-between overflow-hidden px-8 pb-8 pt-24 md:px-12 md:pb-10 md:pt-28"
    >
      {/* 공통 스크롤 lag 레이어 */}
      <motion.div
        style={{ y: lagY }}
        className="flex h-full w-full flex-col justify-between"
      >
        {/* ── About kicker ── */}
        <div className="flex items-center gap-2 text-[13px] font-medium">
          {/* 점은 현재 텍스트 컬러를 따라감 */}
          <span className="inline-block h-2 w-2 rounded-full bg-current" />
          <span>About</span>
        </div>

        {/* ── Main heading + right sidenote ── */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_320px] md:gap-16">
          <h2 className="max-w-[1200px] font-medium leading-[1.08] tracking-[-0.02em] text-[clamp(32px,5vw,76px)]">
            WE ARE A SEOUL BASED{" "}
            <span className="font-serif font-normal italic">(GLOBAL)</span>{" "}
            AGENCY FOCUSING ON <span className="whitespace-nowrap">→ </span>
            MARKETING, UI/UX DESIGN CONTENTS STRATEGY DEVELOPMENT{" "}
            <span className="whitespace-nowrap">● </span>
            ENTERPRISE E - COMMERCE
          </h2>

          <p className="self-end text-[12px] leading-[1.75] tracking-wide opacity-60">
            엠싱크는 온라인쇼핑몰 구축&amp;운영 / 디지털 마케팅 / 웹&amp;앱 제작 및 디자인 /
            브랜딩 / UX컨설팅 / 디지털 컨텐츠 제작 등 디지털 전반의 모든 서비스를
            제공하는 Full service Digital Agency입니다
          </p>
        </div>

        {/* ── Bottom labels ── */}
        <div className="flex flex-wrap items-baseline gap-x-16 gap-y-4 text-[11px] font-bold uppercase tracking-[0.25em]">
          {[
            { label: "ESTABLISHED", value: "2020" },
            { label: "EMPLOYEES", value: "24+" },
            { label: "LOCATION", value: "SEOUL, KR" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              <span className="opacity-60">{item.label}</span>
              <span className="text-[13px] tracking-[0.1em] opacity-100">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
