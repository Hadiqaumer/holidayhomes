"use client";
import { useEffect, useRef, type ReactNode } from "react";

/* One shared IntersectionObserver for every Reveal on the page (much cheaper than one JS animation per block). */
let io: IntersectionObserver | null = null;
function observer() {
  if (!io) {
    io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io!.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );
  }
  return io;
}

export default function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = observer();
    o.observe(el);
    return () => o.unobserve(el);
  }, []);
  return <div ref={ref} className={`rv ${className}`} style={delay ? { transitionDelay: `${delay}s` } : undefined}>{children}</div>;
}
