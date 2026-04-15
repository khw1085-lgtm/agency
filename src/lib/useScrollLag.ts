"use client";

import { useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

/**
 * 전역 스크롤 시간차(lag) 훅.
 *
 * 개념:
 *   - `scrollY`  : 실제(raw) 스크롤 위치 — 휠/트랙패드 입력에 즉시 반응.
 *   - `smoothed` : 위 값을 spring 으로 살짝 느리게 따라오게 함.
 *   - 두 값의 차(raw - smoothed) 가 "지연량" — 스크롤이 빠를수록 커지고,
 *     멈추면 0 으로 수렴.
 *
 * 각 섹션에 이 MotionValue 를 translateY 로 걸면, 마우스 움직임보다 살짝
 * 느리게 콘텐츠가 따라오는 미묘한 시간차가 생김.
 *
 * @param amplitude 지연량 스케일 (0~1). 0.35 = 중간 정도.
 */
export function useScrollLag(amplitude = 0.35): MotionValue<number> {
  const { scrollY } = useScroll();
  const smoothed = useSpring(scrollY, {
    stiffness: 140,
    damping: 28,
    mass: 0.55,
  });
  return useTransform<number, number>(
    [scrollY, smoothed],
    ([raw, s]: number[]) => (raw - s) * amplitude
  );
}
