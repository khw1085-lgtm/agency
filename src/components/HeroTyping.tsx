"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const COLORS_RGB = [
  [99, 102, 241],   // indigo-500
  [139, 92, 246],   // violet-500
  [59, 130, 246],   // blue-500
  [167, 139, 250],  // violet-400
  [96, 165, 250],   // blue-400
  [129, 140, 248],  // indigo-400
  [79, 70, 229],    // indigo-600
  [124, 58, 237],   // violet-600
  [196, 181, 253],  // violet-300
  [37, 99, 235],    // blue-600
];

interface Particle {
  orbitRadius: number;
  angle: number;
  angleSpeed: number;
  size: number;
  colorIdx: number;
  alpha: number;
  alphaSpeed: number;
  springX: number;
  springY: number;
  springStiffness: number;
}

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    orbitRadius: 20 + Math.random() * 380,
    angle: (i / count) * Math.PI * 2 + Math.random() * 0.5,
    angleSpeed: (0.002 + Math.random() * 0.006) * (Math.random() > 0.5 ? 1 : -1),
    size: 1 + Math.random() * 3,
    colorIdx: Math.floor(Math.random() * COLORS_RGB.length),
    alpha: 0.3 + Math.random() * 0.7,
    alphaSpeed: 0.005 + Math.random() * 0.015,
    springX: 0,
    springY: 0,
    springStiffness: 0.02 + Math.random() * 0.05,
  }));
}

const PARTICLE_COUNT = 1200;

export default function HeroTyping({ theme }: { theme: "light" | "dark" }) {
  const fullText = "Experience liftoff with the next-generation IDE";
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"typing" | "done">("typing");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const targetRef = useRef({ x: -9999, y: -9999 }); // 스프링 목표
  const smoothRef = useRef({ x: -9999, y: -9999 }); // 현재 스무스 위치
  const particlesRef = useRef<Particle[]>(createParticles(PARTICLE_COUNT));
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  // 타이핑
  useEffect(() => {
    if (phase !== "typing") return;
    if (displayText.length < fullText.length) {
      const t = setTimeout(() => setDisplayText(fullText.slice(0, displayText.length + 1)), 60);
      return () => clearTimeout(t);
    } else {
      setPhase("done");
    }
  }, [displayText, phase]);

  // 마우스 추적
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const inside =
          e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top && e.clientY <= rect.bottom;
        if (inside) {
          targetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        }
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Canvas 렌더링 루프
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      // 마우스 초기값 = 화면 중앙
      if (smoothRef.current.x < 0) {
        smoothRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
        targetRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = particlesRef.current;

    const draw = () => {
      if (phaseRef.current !== "done") {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      // 마우스 스프링 (전체 파티클 군의 중심 추적)
      const k = 0.06;
      smoothRef.current.x += (targetRef.current.x - smoothRef.current.x) * k;
      smoothRef.current.y += (targetRef.current.y - smoothRef.current.y) * k;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = smoothRef.current.x;
      const cy = smoothRef.current.y;

      for (const p of particles) {
        // 궤도 회전
        p.angle += p.angleSpeed;

        // 각 파티클도 독립적 스프링으로 cx,cy를 따라감
        p.springX += (cx - p.springX) * p.springStiffness;
        p.springY += (cy - p.springY) * p.springStiffness;

        const x = p.springX + Math.cos(p.angle) * p.orbitRadius;
        const y = p.springY + Math.sin(p.angle) * p.orbitRadius;

        // alpha 맥동
        p.alpha += p.alphaSpeed;
        if (p.alpha > 1 || p.alpha < 0.15) p.alphaSpeed *= -1;

        const [r, g, b] = COLORS_RGB[p.colorIdx];

        // 알약형 그리기
        const w = p.size * 2.5;
        const h = p.size;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(p.angle * 0.4);
        ctx.globalAlpha = p.alpha;

        const grad = ctx.createLinearGradient(-w / 2, 0, w / 2, 0);
        grad.addColorStop(0, `rgb(${r},${g},${b})`);
        grad.addColorStop(1, `rgb(${Math.min(r + 60, 255)},${Math.min(g + 40, 255)},${Math.min(b + 80, 255)})`);

        ctx.beginPath();
        ctx.roundRect(-w / 2, -h / 2, w, h, h / 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center bg-white overflow-hidden px-5 md:px-12"
    >
      {/* Canvas 파티클 레이어 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
      />

      {/* 텍스트 */}
      <div className="max-w-[1000px] w-full text-center relative z-10">
        <h1 className="text-[32px] sm:text-[48px] md:text-[72px] lg:text-[88px] leading-[1.05] font-semibold tracking-[-0.03em] text-black">
          <span className="relative">
            {displayText}
            {phase === "typing" && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-[2px] md:w-[3px] h-[30px] sm:h-[44px] md:h-[68px] lg:h-[80px] bg-black ml-1 md:ml-2 align-middle"
              />
            )}
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "done" ? 0.4 : 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mt-10 md:mt-16 flex flex-col items-center gap-4"
        >
          <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.4em] text-black">
            The Future is Here
          </span>
          <div className="w-[1px] h-12 md:h-16 bg-black" />
        </motion.div>
      </div>
    </section>
  );
}
