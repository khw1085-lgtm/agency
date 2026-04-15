"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  PanInfo,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * Section 002 — Swipe carousel (mouse only)
 *   + per-card film-strip entry with stagger
 *   + per-card scroll-linked parallax
 *
 * Figma reference (node 8:1583, file p8Iiu87Gzejo0QripFBTui) — 2장 placeholder → 5장
 *
 * 동작:
 *  1) 섹션이 뷰포트 70% 이상 차지하면 인트로 재생 (한 번만):
 *     각 카드가 화면 왼쪽 바깥에서 자기 자리로 순차적으로 날아 들어옴.
 *     stagger = ENTRY_STAGGER 초 간격 → 필름 프레임이 하나씩 지나가는 느낌.
 *  2) 인트로가 끝나면 마우스 드래그로 패널 전환.
 *  3) 스크롤 시간차(패럴럭스): 각 카드가 약간씩 다른 속도로 Y 이동 → 스크롤에 생동감.
 */

const CARD_WIDTH = 999;
const CARD_HEIGHT = 509;
const CARD_GAP = 48;
const CARD_COUNT = 5;

// 5종 색상 — 각 섬네일 구별용
const CARD_COLORS = [
  "#FF6B6B", // coral
  "#FFD166", // sunshine
  "#06D6A0", // teal
  "#118AB2", // ocean
  "#7209B7", // violet
];

// 카드 flyin 간격(초). 크게 = 더 느리게 하나씩
const ENTRY_STAGGER = 0.22;
const ENTRY_DURATION = 1.1; // 각 카드 진입 duration
// 마지막 카드까지 완료되는 데 걸리는 총 시간 (ms)
const INTRO_DURATION_MS =
  (ENTRY_STAGGER * (CARD_COUNT - 1) + ENTRY_DURATION) * 1000;

// 자동 전환 주기(ms). 마지막 카드 다음은 첫 카드로 순환.
const AUTOPLAY_INTERVAL_MS = 2500;

// 카드별 스크롤 패럴럭스 폭(px). index 별로 다르게 해서 시간차.
const PARALLAX_AMPS = [40, 90, 140, 90, 40];

const DRAG_THRESHOLD = 80;
const VELOCITY_THRESHOLD = 400;

const SPRING = {
  type: "spring" as const,
  stiffness: 160,
  damping: 26,
  mass: 0.55,
};

const SLOT = CARD_WIDTH + CARD_GAP;

function restingX(index: number): string {
  return `calc(50vw - ${CARD_WIDTH / 2}px - ${index * SLOT}px)`;
}

export default function Section002() {
  const [index, setIndex] = useState(0);
  const [introDone, setIntroDone] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const isCentered = useInView(sectionRef, { amount: 0.7, once: true });

  // 스크롤 패럴럭스용 scrollYProgress (섹션이 뷰포트에 들어오기~벗어날 때까지 0→1)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // 카드별로 다른 y 오프셋 (hook 은 render 최상위에서만 호출 가능하므로 펼쳐서 선언)
  const y0 = useTransform(scrollYProgress, [0, 1], [PARALLAX_AMPS[0], -PARALLAX_AMPS[0]]);
  const y1 = useTransform(scrollYProgress, [0, 1], [PARALLAX_AMPS[1], -PARALLAX_AMPS[1]]);
  const y2 = useTransform(scrollYProgress, [0, 1], [PARALLAX_AMPS[2], -PARALLAX_AMPS[2]]);
  const y3 = useTransform(scrollYProgress, [0, 1], [PARALLAX_AMPS[3], -PARALLAX_AMPS[3]]);
  const y4 = useTransform(scrollYProgress, [0, 1], [PARALLAX_AMPS[4], -PARALLAX_AMPS[4]]);
  const parallaxYs = [y0, y1, y2, y3, y4];

  // 인트로 종료 타이머
  useEffect(() => {
    if (!isCentered || introDone) return;
    const t = setTimeout(() => setIntroDone(true), INTRO_DURATION_MS + 100);
    return () => clearTimeout(t);
  }, [isCentered, introDone]);

  // 자동 전환 — 인트로 완료 후 시작, 마지막 카드에서 첫 카드로 순환
  useEffect(() => {
    if (!introDone) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % CARD_COUNT);
    }, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(id);
  }, [introDone]);

  const advance = useCallback((delta: number) => {
    setIndex((prev) => Math.max(0, Math.min(CARD_COUNT - 1, prev + delta)));
  }, []);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const dx = info.offset.x;
    const vx = info.velocity.x;
    const distancePasses = Math.abs(dx) > DRAG_THRESHOLD;
    const velocityPasses = Math.abs(vx) > VELOCITY_THRESHOLD;
    if (!distancePasses && !velocityPasses) return;
    const goingRight = dx < 0 || (Math.abs(dx) < DRAG_THRESHOLD && vx < 0);
    advance(goingRight ? 1 : -1);
  };

  // 트랙은 처음부터 resting 위치에 고정. 각 카드가 개별로 flyin 한다.
  const trackX = restingX(index);

  return (
    <section
      ref={sectionRef}
      aria-label="Section 002"
      data-node-id="8:1583"
      data-nav-theme="light"
      className="relative h-screen w-full overflow-hidden bg-white"
    >
      {/* 섹션 라벨 + 카운터 */}
      <div className="pointer-events-none absolute left-8 top-8 z-20 flex items-baseline gap-4 text-black/60 md:left-12 md:top-10">
        <span className="text-[11px] font-bold uppercase tracking-[0.4em]">002</span>
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: introDone ? 1 : 0, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-[11px] font-bold uppercase tracking-[0.4em]"
        >
          {String(index + 1).padStart(2, "0")} / {String(CARD_COUNT).padStart(2, "0")}
        </motion.span>
      </div>

      {/* 트랙 — 고정 위치(resting). 각 카드가 개별 motion */}
      <motion.div
        className={
          "absolute inset-0 flex items-center " +
          (introDone ? "cursor-grab active:cursor-grabbing" : "cursor-default")
        }
        drag={introDone ? "x" : false}
        dragMomentum={false}
        dragElastic={0.18}
        onDragEnd={onDragEnd}
        animate={{ x: trackX }}
        transition={SPRING}
        style={{ gap: `${CARD_GAP}px`, willChange: "transform" }}
      >
        {Array.from({ length: CARD_COUNT }).map((_, i) => {
          const isActive = introDone && i === index;

          // 인트로 중에 쓸 entry 애니메이션 target
          // - 진입 전: x = -1800 (화면 왼쪽 바깥), opacity 0
          // - 진입: x = 0, opacity 1, scale 1
          // - 종료 후: active 상태에 따라 opacity/scale/filter 다르게
          const entryTarget = !isCentered
            ? { x: -1800, opacity: 0, scale: 0.95, filter: "blur(0px)" }
            : !introDone
            ? { x: 0, opacity: 1, scale: 1, filter: "blur(0px)" }
            : {
                x: 0,
                opacity: isActive ? 1 : 0.35,
                scale: isActive ? 1 : 0.92,
                filter: isActive ? "blur(0px)" : "blur(2px)",
              };

          const entryTransition =
            isCentered && !introDone
              ? {
                  x: {
                    duration: ENTRY_DURATION,
                    delay: i * ENTRY_STAGGER,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  },
                  opacity: { duration: 0.5, delay: i * ENTRY_STAGGER },
                  scale: { duration: 0.5, delay: i * ENTRY_STAGGER },
                }
              : SPRING;

          return (
            <motion.div
              key={i}
              data-node-id={i < 2 ? `8:${1580 + i * 2}` : undefined}
              style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                backgroundColor: CARD_COLORS[i],
                y: parallaxYs[i], // 스크롤 패럴럭스
              }}
              animate={entryTarget}
              transition={entryTransition}
              className="relative shrink-0 select-none overflow-hidden"
            >
              <span className="absolute bottom-6 left-6 text-[11px] font-bold uppercase tracking-[0.4em] text-white/80">
                {String(i + 1).padStart(2, "0")} / {String(CARD_COUNT).padStart(2, "0")}
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* 진행 인디케이터 */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : 8 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3"
      >
        {Array.from({ length: CARD_COUNT }).map((_, i) => (
          <motion.span
            key={i}
            animate={{ width: i === index ? 40 : 6 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={
              "block h-[6px] rounded-full " +
              (i === index ? "bg-black" : "bg-black/20")
            }
          />
        ))}
      </motion.div>
    </section>
  );
}
