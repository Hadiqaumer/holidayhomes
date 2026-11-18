"use client";
import { useRef, useState } from "react";
import Reveal from "./Reveal";
import Tilt from "./Tilt";
import { about } from "@/lib/content";

const tabs = ["Vision", "Mission", "Values"] as const;

function Capsule({ src, tone, className }: { src: string; tone: string; className: string }) {
  return (
    <div className={`absolute overflow-hidden rounded-[999px] bg-gradient-to-br shadow-[0_40px_60px_-30px_rgba(6,50,58,.8)] ring-4 ring-white/80 ${tone} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" width={1230} height={820} loading="lazy" decoding="async" draggable={false} className="absolute inset-0 h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-white/10" />
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/15" />
    </div>
  );
}

export default function About() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Vision");
  const stage = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  return (
    <section id="about" className="sec"><div className="wrap">
      <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
       

        {/* RIGHT: story + tabs */}
        <Reveal delay={0.1}>
          <span className="ey">About us</span>
          <h2 className="h2">Twisting technology into success.</h2>
          <p className="text-mut">{about.intro}</p>
          <p className="mt-3 text-mut">{about.hospitality}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {about.pills.map((p) => (<span key={p} className="rounded-full border border-teal/20 bg-white px-3.5 py-1.5 text-[13px] font-medium text-deep">{p}</span>))}
          </div>

          <div className="mt-6 inline-flex rounded-full bg-white p-1 shadow-[0_10px_30px_-16px_rgba(11,79,92,.5)] ring-1 ring-teal/20" role="tablist">
            {tabs.map((t) => (
              <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`rounded-full px-5 py-2 text-sm font-semibold transition ${tab === t ? "bg-grad text-white shadow" : "text-mut hover:text-ink"}`}>{t}</button>
            ))}
          </div>
          <div className="mt-4 min-h-[132px] rounded-3xl bg-deepg p-7 text-white shadow-[0_30px_60px_-34px_#0b4f5c]">
            <div key={tab} className="fade-in">
                {tab === "Vision" && <p className="text-[17px] leading-relaxed">{about.vision}</p>}
                {tab === "Mission" && <p className="text-[17px] leading-relaxed">{about.mission}</p>}
                {tab === "Values" && (
                  <div className="grid grid-cols-2 gap-3">
                    {about.values.map(([v]) => (
                      <span key={v} className="flex items-center gap-2 font-head font-bold"><i className="grid h-5 w-5 place-items-center rounded-full bg-white/20 text-[11px] not-italic">✓</i>{v}</span>
                    ))}
                  </div>
                )}
            </div>
          </div>
          <a href="#contact" className="btn mt-6">Work with us →</a>
        </Reveal>
         {/* LEFT: 3D capsule visual */}
        <Reveal>
          <div
            className="relative mx-auto h-[400px] w-full max-w-[440px] [perspective:1000px] sm:h-[440px]"
            onMouseMove={(e) => {
              const el = stage.current; if (!el || raf.current || !window.matchMedia("(hover: hover)").matches) return;
              const box = e.currentTarget.getBoundingClientRect(), cx = e.clientX, cy = e.clientY;
              raf.current = requestAnimationFrame(() => {
                raf.current = 0;
                const x = (cx - box.left) / box.width - 0.5, y = (cy - box.top) / box.height - 0.5;
                el.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 8}deg)`;
              });
            }}
            onMouseLeave={() => { cancelAnimationFrame(raf.current); raf.current = 0; if (stage.current) stage.current.style.transform = ""; }}
          >
            <div ref={stage} className="absolute inset-0" style={{ transformStyle: "preserve-3d", transition: "transform .3s ease-out" }}>
              <div className="absolute -z-10 left-[8%] top-[10%] h-[80%] w-[84%] rounded-full bg-grad opacity-20" />
              <Capsule src="/images/about/01.webp" tone="from-[#0e9aa7] to-[#06323a]" className="left-0 top-0 aspect-[2/3] w-[56%] [transform:translateZ(20px)]" />
              <Capsule src="/images/about/02.webp" tone="from-[#10b981] to-[#0b4f5c]" className="bottom-0 right-0 aspect-[2/3] w-[47%] [transform:translateZ(70px)]" />
              <div className="fc right-0 top-[8%] [transform:translateZ(110px)]"><b>Innovate · Connect · Grow</b><span>Twisting technology into success</span></div>
              <div className="fc bottom-[10%] left-0 [animation-delay:-3s] [transform:translateZ(110px)]"><b>Pakistan · Global vision</b><span>ISP · BPO · Guest management</span></div>
            </div>
          </div> 
        </Reveal>
      </div>

      {/* values cards */}
      <div className="mt-10 grid gap-4 [perspective:1100px] sm:grid-cols-2 lg:grid-cols-4">
        {about.values.map(([t, d], k) => (
          <Reveal key={t} delay={k * 0.07}>
            <Tilt>
              <div className="bg-grad bg-clip-text font-head text-4xl font-extrabold text-transparent" style={{ transform: "translateZ(40px)" }}>0{k + 1}</div>
              <h3 className="mb-2 mt-2 text-[19px]" style={{ transform: "translateZ(25px)" }}>{t}</h3>
              <p className="text-[14.5px] text-mut">{d}</p>
            </Tilt>
          </Reveal>
        ))}
      </div>
 
      {/* tagline band */}
      <Reveal className="mt-8">
        <div className="relative overflow-hidden rounded-[30px] bg-deepg px-6 py-7 text-center text-white">
          <div className="absolute -left-16 -top-20 h-60 w-60 rounded-full bg-grad opacity-40" />
          <div className="absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-grad opacity-30" />
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-head text-[clamp(22px,3.4vw,38px)] font-extrabold">
            <span>Innovate</span><span className="text-[#7ff5cf]">•</span><span>Connect</span><span className="text-[#7ff5cf]">•</span><span>Grow</span>
          </div>
        </div>
      </Reveal>
    </div></section>
  );
}