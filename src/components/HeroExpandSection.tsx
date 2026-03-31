"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MockBrowser from "./MockBrowser";

export default function HeroExpandSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end end"],
  });

  // 애니메이션 수치 정교화
  const width = useTransform(scrollYProgress, [0, 0.4], [600, 1500]);
  const height = useTransform(scrollYProgress, [0, 0.4], [360, 800]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.4], [30, 30]);

  // 내부 UI 등장 시점 (확장이 끝날 때쯤 자연스럽게)
  const contentOpacity = useTransform(scrollYProgress, [0.35, 0.7], [0, 1]);
  const contentScale = useTransform(scrollYProgress, [0.35, 0.7], [0.92, 1]);
  const contentY = useTransform(scrollYProgress, [0.35, 0.7], [30, 0]);

  return (
    <div ref={wrapperRef} className="w-full flex flex-col">
      <div className="sticky top-0 w-full h-screen flex items-center justify-center bg-white overflow-hidden">
        <motion.div
          style={{
            width,
            height,
            borderRadius,
            maxWidth: "100%",
            overflow: "hidden",
            position: "relative",
          }}
          className="flex items-center justify-center bg-white" 
        >
          {/* 역동적인 애니메이션 메쉬 그라데이션 배경 */}
          <div className="absolute inset-0 z-0 bg-[#f9fafb]">
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                x: [0, 120, 0],
                y: [0, 60, 0],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[25%] -left-[15%] w-[70%] h-[70%] rounded-full bg-[#8BC6EC] opacity-40 blur-[110px]"
            />
            <motion.div
              animate={{
                scale: [1, 1.35, 1],
                x: [0, -90, 0],
                y: [0, 120, 0],
              }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-[25%] -right-[15%] w-[80%] h-[80%] rounded-full bg-[#9599E2] opacity-35 blur-[130px]"
            />
            <motion.div
              animate={{
                scale: [1.3, 1, 1.3],
                x: [0, 80, 0],
                y: [0, -100, 0],
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute top-[15%] right-[15%] w-[60%] h-[60%] rounded-full bg-[#FFD700] opacity-25 blur-[110px]"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                x: [0, -140, 0],
                y: [0, -80, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-[15%] left-[25%] w-[55%] h-[55%] rounded-full bg-[#B2FF59] opacity-30 blur-[120px]"
            />
          </div>

          {/* 유리 질감 필터 레이어 */}
          <div className="absolute inset-0 backdrop-blur-[80px] z-[1]">
             {/* 미세한 노이즈 텍스처 (선택적 추가) */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
          </div>

          {/* 내부 컨텐츠 (별도 분리된 MockBrowser) */}
          <motion.div
            style={{ 
              opacity: contentOpacity,
              scale: contentScale,
              y: contentY
            }}
            className="z-10 w-[92%] h-fit max-w-[1100px] px-4"
          >
             <MockBrowser />
          </motion.div>
        </motion.div>
      </div>

    </div>
  );
}
