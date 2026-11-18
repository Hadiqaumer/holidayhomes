"use client";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { journey } from "@/lib/content";

const images = [
  "/images/journey/booking.webp",
  "/images/journey/pre-arrival.webp",
  "/images/journey/checkin.webp",
  "/images/journey/during-stay.webp",
  "/images/journey/checkout.webp",
  "/images/journey/post-stay.webp",
];

/* Smooth 3-card slider: cards are drawn once and only moved with transform/opacity (GPU). */
export default function Journey() {
  const n = journey.length;
  const wrap = useRef<HTMLDivElement>(null);
  const [cw, setCw] = useState(600);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    setCw(el.clientWidth);
    const ro = new ResizeObserver(([e]) => setCw((p) => (Math.abs(p - e.contentRect.width) > 1 ? e.contentRect.width : p)));
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);

  const go = (d: number) => setActive((v) => (v + d + n) % n);

  useEffect(() => {
    if (paused || !visible) return;
    const id = setInterval(() => { if (!document.hidden) setActive((v) => (v + 1) % n); }, 4500);
    return () => clearInterval(id);
  }, [paused, visible, n]);

  const w = Math.min(cw * 0.7, 420); // every card is drawn at this size
  const o1 = w * 0.7;                // side card offset
  const height = w + 24;

  return (
    <section id="journey" className="sec overflow-hidden bg-[#edf9f6]">
      <div className="wrap">
        <Reveal>
          <span className="ey">The complete guest journey</span>
          <h2 className="h2">One guest. Every touchpoint. Completely managed.</h2>
          <p className="lead max-w-[680px]">
            From the first booking to the final goodbye, we manage every guest interaction with personalized support, seamless communication, and reliable hospitality solutions.
          </p>
        </Reveal>

        <Reveal className="mt-8 grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* LEFT: details */}
          <div key={active} className="fade-in flex flex-col justify-center">
            <span className="mb-3 text-[11px] font-bold tracking-[3px] text-mut">0{active + 1} <span className="text-teal/50">/ 0{n}</span></span>
            <h3 className="mb-3 font-head text-[32px] font-extrabold leading-[1.05] tracking-tight text-ink md:text-[44px]">{journey[active][0]}</h3>
            <p className="mb-4 max-w-[480px] text-[15px] leading-7 text-mut">{journey[active][1]}</p>
            <p className="mb-5 max-w-[480px] text-[14px] leading-7 text-mut">
              Our dedicated hospitality team ensures smooth coordination, timely responses, and personalized guest communication throughout this stage of the journey.
            </p>
            <div className="mb-6 space-y-2.5">
              {["Professional guest communication", "Consistent service and follow-ups", "Reliable operational support"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal/10 text-xs font-bold text-teal">✓</span>
                  <span className="text-[14px] font-medium text-ink">{item}</span>
                </div>
              ))}
            </div>
            <a href="#contact" className="group inline-flex w-fit items-center gap-4 rounded-full bg-deepg px-7 py-3.5 font-head text-sm font-bold text-white shadow-[0_15px_30px_-12px_#0b4f5c] transition duration-300 hover:-translate-y-1">
              Get a Quote <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* RIGHT: 3-card slider */}
          <div className="w-full">
            <div
              ref={wrap}
              className="relative mx-auto w-full max-w-[640px] select-none overflow-hidden"
              style={{ height, touchAction: "pan-y" }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onPointerDown={(e) => { startX.current = e.clientX; }}
              onPointerUp={(e) => {
                if (startX.current === null) return;
                const dx = e.clientX - startX.current;
                if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
                startX.current = null;
              }}
              aria-roledescription="carousel"
              aria-label="Guest journey"
            >
              <div className="absolute inset-x-0 top-[12px] [perspective:1100px]">
                {journey.map(([t], k) => {
                  let d = k - active;
                  if (d > n / 2) d -= n;
                  if (d < -n / 2) d += n;
                  const abs = Math.abs(d);
                  const isActive = abs === 0;
                  const sc = isActive ? 1 : abs === 1 ? 0.62 : 0.5;
                  const tx = isActive ? 0 : d * (abs === 1 ? o1 : o1 + w * 0.3);
                  const rot = isActive ? 0 : -d * 14;
                  return (
                    <div
                      key={t}
                      onClick={() => !isActive && setActive(k)}
                      className="absolute left-1/2 top-0 cursor-pointer"
                      style={{
                        width: w,
                        transform: `translateX(calc(-50% + ${tx}px))${rot ? ` rotateY(${rot}deg)` : ""} scale(${sc})`,
                        transformOrigin: "50% 50%",
                        filter: abs === 1 ? "blur(3px)" : "none",
                        opacity: isActive ? 1 : abs === 1 ? 0.85 : 0,
                        zIndex: 10 - abs,
                        pointerEvents: abs > 1 ? "none" : "auto",
                        transition: "transform .8s cubic-bezier(.22,.8,.25,1), opacity .8s ease, filter .8s ease",
                        willChange: "transform, opacity",
                      }}
                    >
                      <div className="relative aspect-square overflow-hidden rounded-[28px] bg-deepg shadow-[0_30px_44px_-26px_rgba(6,50,58,.75)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={images[k]} alt={t} width={1350} height={900} draggable={false} decoding="async" loading="eager" fetchPriority={k === 0 ? "high" : "auto"} className="absolute inset-0 h-full w-full object-cover" />
                        <div className={`absolute inset-0 ${isActive ? "bg-gradient-to-t from-[#032f37]/60 via-transparent to-transparent" : "bg-[#06323a]/15"}`} />
                        <span className="absolute bottom-4 left-0 w-full text-center font-head text-lg font-extrabold text-white">0{k + 1}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[11%] bg-gradient-to-r from-[#edf9f6] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[11%] bg-gradient-to-l from-[#edf9f6] to-transparent" />
              <button onClick={() => go(-1)} aria-label="Previous" style={{ top: 12 + w / 2 - 18 }} className="absolute left-[2%] z-30 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-teal shadow ring-1 ring-ink/20 transition hover:scale-110">‹</button>
              <button onClick={() => go(1)} aria-label="Next" style={{ top: 12 + w / 2 - 18 }} className="absolute right-[2%] z-30 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-teal shadow ring-1 ring-ink/20 transition hover:scale-110">›</button>
            </div>

            <div className="mt-3 flex items-center justify-center gap-2">
              {journey.map((_, k) => (
                <button key={k} onClick={() => setActive(k)} aria-label={`Go to step ${k + 1}`} className={`h-1 rounded-full transition-all duration-500 ${active === k ? "w-12 bg-teal" : "w-5 bg-teal/20 hover:bg-teal/50"}`} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
