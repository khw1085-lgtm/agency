"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Global smooth scroll provider.
 *
 * Wraps the entire app so every route (/ , /figma-preview, /project/*) gets
 * buttery wheel→scroll conversion. This is required for spring-driven motion
 * (e.g. Section002) to feel cursor-attached — without Lenis, native wheel
 * delivers chunky impulses and scrollYProgress jumps rather than glides.
 *
 * Mount once in layout.tsx.
 */
export default function SmoothScrollProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,           // 0(instant) ~ 1(molasses). 0.08 = tight/attached
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      smoothWheel: true,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
