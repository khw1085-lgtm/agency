"use client";

import { motion, useScroll } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const COLORS_RGB = [
  [96, 165, 250],  // blue-400
  [129, 140, 248], // indigo-400
  [191, 219, 254], // blue-200
  [226, 232, 240], // slate-200
  [255, 255, 255], // white
  [165, 180, 252], // indigo-300
];

interface Particle {
  x: number;
  y: number;
  size: number;
  colorIdx: number;
  angle: number;       // 현재 회전 각도
  distance: number;    // 마우스로부터의 거리
  targetDist: number;  // 목표 궤도 거리
  speed: number;       // 회전 속도
}

const PARTICLE_COUNT = 2000; // 도트 타입이므로 약간 줄임 (깔끔함 강조)

export default function HeroTyping({ theme }: { theme: "light" | "dark" }) {
  const fullText = "Experience liftoff with the next-generation IDE";
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"typing" | "done">("typing");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  // 마우스 추종을 부드럽게 하기 위한 지연 좌표
  const smoothMouse = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const entryAlphaRef = useRef(0);

  function createParticles(count: number, width: number, height: number): Particle[] {
    const arr = new Array(count);
    for (let i = 0; i < count; i++) {
        arr[i] = {
            x: Math.random() * width,
            y: Math.random() * height,
            size: 0.8 + Math.random() * 1.5, // 도트 크기 가변
            colorIdx: Math.floor(Math.random() * COLORS_RGB.length),
            angle: Math.random() * Math.PI * 2,
            distance: Math.random() * width,
            targetDist: 100 + Math.random() * 400, // 넓은 궤적
            speed: 0.002 + Math.random() * 0.005,  // 극도로 느린 회전속도
        };
    }
    return arr;
  }

  useEffect(() => {
    if (phase !== "typing") return;
    if (displayText.length < fullText.length) {
      const t = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      }, 50);
      return () => clearTimeout(t);
    } else {
      setPhase("done");
    }
  }, [displayText, phase]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef as any,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        smoothMouse.current = { x: canvas.width / 2, y: canvas.height / 2 };
        const currentCount = canvas.width <= 400 ? PARTICLE_COUNT * 0.5 : PARTICLE_COUNT;
        particlesRef.current = createParticles(currentCount, canvas.width, canvas.height);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (phaseRef.current === "done") {
        if (entryAlphaRef.current < 1) {
          entryAlphaRef.current += 0.01;
        }

        const currentScroll = scrollYProgress.get();
        const fadeOut = currentScroll < 0.7 ? 1 : Math.max(0, 1 - (currentScroll - 0.7) / 0.3); 

        if (fadeOut > 0) {
          const particles = particlesRef.current;
          const rect = canvas.getBoundingClientRect();
          
          // 마우스 좌표 부드럽게 보정 (튀지 않게)
          const targetX = mouseRef.current.active ? (mouseRef.current.x - rect.left) : (canvas.width / 2);
          const targetY = mouseRef.current.active ? (mouseRef.current.y - rect.top) : (canvas.height / 2);
          
          smoothMouse.current.x += (targetX - smoothMouse.current.x) * 0.03;
          smoothMouse.current.y += (targetY - smoothMouse.current.y) * 0.03;

          const groups: Particle[][] = Array.from({ length: COLORS_RGB.length }, () => []);

          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            // 궤도 계산 (차분한 360도 회전)
            p.angle += p.speed;
            
            // 거리를 목표 거리로 부드럽게 수렴
            p.distance += (p.targetDist - p.distance) * 0.02;
            
            // 절대 좌표 업데이트 (마우스 중심 기반)
            p.x = smoothMouse.current.x + Math.cos(p.angle) * p.distance;
            p.y = smoothMouse.current.y + Math.sin(p.angle) * p.distance;
            
            groups[p.colorIdx].push(p);
          }

          // 도트 스타일 렌더링
          for(let i = 0; i < COLORS_RGB.length; i++) {
            const [r, g, b] = COLORS_RGB[i];
            const group = groups[i];
            if (group.length === 0) continue;
            
            ctx.fillStyle = `rgba(${r},${g},${b}, ${0.6 * fadeOut * entryAlphaRef.current})`;
            
            for(let j = 0; j < group.length; j++) {
              const p = group[j];
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fill();
            }
          }

          const gradientHeight = 250;
          const grad = ctx.createLinearGradient(0, canvas.height - gradientHeight, 0, canvas.height);
          grad.addColorStop(0, "rgba(255, 255, 255, 0)");
          grad.addColorStop(1, "rgba(255, 255, 255, 1)");
          ctx.fillStyle = grad;
          ctx.fillRect(0, canvas.height - gradientHeight, canvas.width, gradientHeight);
        }
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
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
      />

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
