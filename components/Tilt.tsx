"use client";
import { useRef, type ReactNode } from "react";

/* 3D tilt on hover. Runs once per animation frame and only on devices with a real mouse. */
export default function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const canHover = () => window.matchMedia("(hover: hover)").matches;
  return (
    <div
      ref={ref}
      className={`card ${className}`}
      onMouseEnter={() => { if (ref.current && canHover()) ref.current.style.willChange = "transform"; }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el || raf.current || !canHover()) return;
        const { clientX, clientY } = e;
        raf.current = requestAnimationFrame(() => {
          raf.current = 0;
          const r = el.getBoundingClientRect();
          const x = (clientX - r.left) / r.width - 0.5, y = (clientY - r.top) / r.height - 0.5;
          el.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(8px)`;
        });
      }}
      onMouseLeave={() => {
        const el = ref.current; if (!el) return;
        cancelAnimationFrame(raf.current); raf.current = 0;
        el.style.transform = ""; el.style.willChange = "";
      }}
    >
      {children}
    </div>
  );
}
