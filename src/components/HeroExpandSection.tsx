"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroExpandSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end end"],
  });

  // 가로: 600px → 1500px (스크롤 50% 지점에서 완성되도록 재조정)
  const width = useTransform(scrollYProgress, [0, 0.5], [600, 1500]);

  // 세로: 360px → 800px (800px 높이 유지)
  const height = useTransform(scrollYProgress, [0, 0.5], [360, 800]);

  // 라운드: 고정 30
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [30, 30]);

  return (
    // 스크롤 트리거용 여분 높이를 가진 래퍼
    <div ref={wrapperRef} className="w-full flex flex-col">
      {/* sticky 영역: 스크롤되는 동안 뷰포트 중앙에 고정 */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center bg-white">
        <motion.div
          style={{
            width,
            height,
            borderRadius,
            backgroundColor: "#0a0a0a",
            maxWidth: "100%",
            overflow: "hidden",
          }}
          className="flex items-center justify-center"
        >
          {/* 내부 컨텐츠 자리 */}
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0.6, 1], [0, 1]) }}
            className="text-white/30 text-[11px] font-bold uppercase tracking-[0.3em]"
          >
            Antigravity Studio · 2026
          </motion.div>
        </motion.div>
      </div>

      {/* 스크롤 공간 확보 (이 div가 스크롤 드라이버 역할) */}
      <div className="h-[100vh]" />
    </div>
  );
}
