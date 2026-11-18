"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { heroSlides } from "@/lib/content";

const tones = [
  "from-[#0e9aa7] to-[#06323a]",
  "from-[#10b981] to-[#0b4f5c]",
  "from-[#35c9d6] to-[#0b6b73]",
  "from-[#34d399] to-[#0e7a8a]",
  "from-[#0b6b73] to-[#10b981]",
];

const RATIO = 1.5;   // capsule height = width * 1.5
const CAPTION = 104; // space under the cards for title + buttons

/*
  SMOOTHNESS: every card is drawn once at its biggest size and is only moved with
  transform + opacity (GPU). Nothing that triggers layout (width, height, font-size)
  is animated, and there is no backdrop-filter or mask on the moving layers.
*/
export default function HeroSlider() {
  const n = heroSlides.length;
  const wrap = useRef<HTMLDivElement>(null);
  const [cw, setCw] = useState(600);
  const [mode, setMode] = useState<"peek" | "focus">("focus");
  const [active, setActive] = useState(0);
  const [side, setSide] = useState<"front" | "back">("front");
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

  const select = (i: number) => { setActive(i); setSide("front"); };
  const go = (d: number) => select((active + d + n) % n);

  // autoplay only while the slider is on screen and the tab is open
  useEffect(() => {
    if (paused || !visible) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      setActive((v) => (v + 1) % n); setSide("front");
    }, mode === "focus" ? 5000 : 3800);
    return () => clearInterval(id);
  }, [mode, paused, visible, n]);

  const focused = mode === "focus";
  const B = Math.min(cw * 0.6, 340);      // size every card is drawn at
  const wPeek = Math.min(cw * 0.5, 320);  // centre card size in closed view
  const kp = wPeek / B;
  const height = 10 + B * RATIO + CAPTION;
  const cur = heroSlides[active];
  const wrapStyle = { height, touchAction: "pan-y" } as CSSProperties;

  return (
    <div
      ref={wrap}
      className={`relative mx-auto w-full max-w-[760px] select-none ${focused ? "" : "overflow-hidden"}`}
      style={wrapStyle}
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
      aria-label="Guest management services"
    >
      <div className="absolute inset-x-0 top-[10px] [perspective:1100px]">
        {heroSlides.map((s, i) => {
          let d = i - active;
          if (d > n / 2) d -= n;
          if (d < -n / 2) d += n;
          const abs = Math.abs(d);
          const isActive = abs === 0;

          let sc: number, tx: number, blur = 0, opacity = 1, rot = 0;
          if (focused) {
            const ws = B * 0.62, o1 = ((B + ws) / 2) * 0.93;
            if (isActive) { sc = 1; tx = 0; }
            else if (abs === 1) { sc = 0.62; tx = d * o1; blur = 4; opacity = 0.75; rot = -d * 14; }
            else { sc = 0.5; tx = d * (o1 + B * 0.3); opacity = 0; rot = -d * 14; }
          } else {
            if (isActive) { sc = kp; tx = 0; }
            else if (abs === 1) { sc = kp * 0.86; tx = d * (cw / 2); blur = 2.5; opacity = 0.9; rot = -d * 16; }
            else { sc = kp * 0.7; tx = d * (cw / 2 + wPeek * 0.4); opacity = 0; }
          }
          const flipped = focused && isActive && side === "back";

          return (
            <div
              key={s.title}
              onClick={() => {
                if (isActive) { if (!focused) { setMode("focus"); setSide("front"); } }
                else select(i);
              }}
              className="absolute left-1/2 top-0 cursor-pointer"
              style={{
                width: B,
                fontSize: B * 0.055,
                transform: `translateX(calc(-50% + ${tx}px))${rot ? ` rotateY(${rot}deg)` : ""} scale(${sc})`,
                transformOrigin: "50% 0",
                filter: blur ? `blur(${blur}px)` : "none",
                opacity,
                zIndex: 10 - abs,
                pointerEvents: opacity === 0 ? "none" : "auto",
                transition: "transform .8s cubic-bezier(.22,.8,.25,1), opacity .8s ease, filter .8s ease",
                willChange: "transform, opacity",
              }}
            >
              <div className="aspect-[200/300] [perspective:900px]">
                <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "none", transition: "transform .7s cubic-bezier(.22,.8,.25,1)" }}>
                  {/* FRONT (capsule) */}
                  <div className={`absolute inset-0 overflow-hidden rounded-[999px] bg-gradient-to-br ${tones[i % tones.length]} shadow-[0_30px_44px_-26px_rgba(6,50,58,.75)] [backface-visibility:hidden]`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.image} alt="" width={720} height={1080} draggable={false} decoding="async" loading="eager" fetchPriority={i === 0 ? "high" : "auto"} className="absolute inset-0 h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/5 to-ink/20" />
                    <span className="absolute left-1/2 top-[9%] -translate-x-1/2 whitespace-nowrap rounded-full bg-ink/35 px-[.9em] py-[.3em] text-[.7em] font-semibold tracking-wider text-white ring-1 ring-white/30">{s.tag}</span>
                    <div className="absolute inset-x-[16%] bottom-[13%] rounded-2xl bg-ink/45 px-[.8em] py-[.7em] text-center font-head text-[.92em] font-bold leading-tight text-white ring-1 ring-white/25">{s.title}</div>
                  </div>
                  {/* BACK (capsule) */}
                  <div className="absolute inset-0 overflow-hidden rounded-[999px] bg-white px-[15%] pt-[20%] shadow-[0_30px_44px_-26px_rgba(6,50,58,.75)] ring-1 ring-teal/20 [backface-visibility:hidden]" style={{ transform: "rotateY(180deg)" }}>
                    <div className="text-center font-head text-[.7em] font-bold uppercase tracking-[2px] text-em">What we handle</div>
                    <ul className="mt-[1.2em] space-y-[.7em]">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-[.5em] text-[.85em] font-medium leading-snug text-ink">
                          <i className="mt-[.1em] grid h-[1.6em] w-[1.6em] shrink-0 place-items-center rounded-full bg-grad text-[.6em] not-italic text-white">✓</i>{p}
                        </li>
                      ))}
                    </ul>
                    <div className="absolute inset-x-[18%] bottom-[11%] text-center text-[.78em] leading-snug text-mut">{s.text}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* soft edge fade, only in the closed (half-cards) view */}
      {!focused && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[14%] bg-gradient-to-r from-[#e9f8f4] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[14%] bg-gradient-to-l from-[#e9f8f4] to-transparent" />
        </>
      )}

      {/* arrows */}
      <button onClick={() => go(-1)} aria-label="Previous service" style={{ top: 10 + (B * RATIO) / 2 - 18 }} className="absolute left-[2%] z-30 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-teal shadow ring-1 ring-ink/20 transition hover:scale-110">‹</button>
      <button onClick={() => go(1)} aria-label="Next service" style={{ top: 10 + (B * RATIO) / 2 - 18 }} className="absolute right-[2%] z-30 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-teal shadow ring-1 ring-ink/20 transition hover:scale-110">›</button>
      {focused && (
        <button onClick={() => { setMode("peek"); setSide("front"); }} className="absolute right-[6%] top-0 z-30 text-[10px] font-bold uppercase tracking-[2px] text-ink/60 hover:text-ink">Close ×</button>
      )}

      {/* caption */}
      <div className="absolute inset-x-0 bottom-0 z-30 px-3 text-center">
        <div className="font-head text-[14px] font-extrabold uppercase tracking-[1.5px] text-ink sm:text-[15px]">{cur.title}</div>
        <div className="mt-0.5 text-[11px] text-mut">Hospitality BPO · Guest management</div>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          {focused ? (
            <>
              <div className="inline-flex overflow-hidden rounded-full ring-1 ring-ink/70">
                {(["front", "back"] as const).map((v) => (
                  <button key={v} onClick={() => setSide(v)} className={`px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider transition ${side === v ? "bg-ink text-white" : "text-ink"}`}>{v}</button>
                ))}
              </div>
              <a href="#solutions" className="rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink ring-1 ring-ink/70 transition hover:bg-ink hover:text-white">See details →</a>
            </>
          ) : (
            <button onClick={() => { setMode("focus"); setSide("front"); }} className="rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[2px] text-ink ring-1 ring-ink/70 transition hover:bg-ink hover:text-white">Explore services</button>
          )}
        </div>
      </div>
    </div>
  );
}
