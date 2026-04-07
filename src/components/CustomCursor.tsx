"use client";

import { useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
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
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      className="fixed top-0 left-0 w-[70px] h-[70px] rounded-full pointer-events-none z-[21000] bg-black"
    />
  );
}
