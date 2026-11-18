"use client";
import { useRef, useState } from "react";
import Reveal from "./Reveal";
import { services, servicesIntro } from "@/lib/content";

type Service = (typeof services)[number];

const groups = [
  { name: "Core services", grid: "lg:grid-cols-2", wide: true },
  { name: "Holiday homes & operational support", grid: "lg:grid-cols-3", wide: false },
] as const;

const tones: Record<string, string> = {
  A: "from-[#0e9aa7] to-[#06323a]",
  B: "from-[#10b981] to-[#0b4f5c]",
  C: "from-[#35c9d6] to-[#0b6b73]",
  D: "from-[#0b6b73] to-[#10b981]",
  E: "from-[#0e9aa7] to-[#34d399]",
};

/* illustration shown only until a real photo is added */
function Art({ l }: { l: string }) {
  const p = { className: "absolute right-3 top-16 h-[55%] w-auto opacity-25", viewBox: "0 0 240 160", fill: "none", stroke: "#fff", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  if (l === "A") return (<svg {...p}><rect x="70" y="30" width="60" height="130" /><rect x="130" y="70" width="50" height="90" /><rect x="30" y="90" width="40" height="70" /><path d="M85 55h8M107 55h8M85 80h8M107 80h8M85 105h8M107 105h8M145 95h8M162 95h8" /></svg>);
  if (l === "B") return (<svg {...p}><path d="M80 105a45 45 0 0 1 90 0" strokeWidth="9" /><rect x="68" y="98" width="16" height="30" rx="6" /><rect x="166" y="98" width="16" height="30" rx="6" /><path d="M175 128c0 14-12 20-35 20" /><rect x="150" y="30" width="70" height="38" rx="12" /></svg>);
  if (l === "C") return (<svg {...p}><path d="M30 95 125 25l95 70" /><path d="M50 85v75h150V85" /><rect x="105" y="108" width="40" height="52" /></svg>);
  if (l === "D") return (<svg {...p}><rect x="70" y="20" width="100" height="130" rx="10" /><path d="M90 55h60M90 80h60M90 105h38" /><rect x="150" y="100" width="55" height="45" rx="8" /></svg>);
  return (<svg {...p}><circle cx="120" cy="80" r="16" /><circle cx="55" cy="45" r="11" /><circle cx="190" cy="40" r="11" /><circle cx="60" cy="125" r="11" /><circle cx="195" cy="120" r="11" /><path d="M64 51l42 20M180 46l-45 24M69 118l39-26M185 115l-52-26" /></svg>);
}

function PhotoCard({ s, wide }: { s: Service; wide: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const canHover = () => typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

  return (
    <div
      ref={ref}
      role="button" tabIndex={0} aria-expanded={open}
      onClick={() => setOpen((v) => !v)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen((v) => !v); } }}
      onMouseEnter={() => { if (canHover()) setOpen(true); }}
      onMouseMove={(e) => {
        const el = ref.current; if (!el || raf.current || !canHover()) return;
        const cx = e.clientX, cy = e.clientY;
        raf.current = requestAnimationFrame(() => {
          raf.current = 0;
          const r = el.getBoundingClientRect();
          const x = (cx - r.left) / r.width - 0.5, y = (cy - r.top) / r.height - 0.5;
          el.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(6px)`;
        });
      }}
      onMouseLeave={() => { cancelAnimationFrame(raf.current); raf.current = 0; if (ref.current) ref.current.style.transform = ""; if (canHover()) setOpen(false); }}
      className="group relative h-[420px] cursor-pointer sm:h-[460px] overflow-hidden rounded-[30px] shadow-[0_34px_60px_-36px_rgba(6,50,58,.85)] ring-1 ring-white/50 outline-none transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-em"
    >
      {/* photo (falls back to gradient + illustration) */}
      <div className={`absolute inset-0 bg-gradient-to-br ${tones[s.letter]}`} />
      <Art l={s.letter} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/images/services/${s.letter.toLowerCase()}.webp`} alt="" width={1200} height={800} loading="lazy" decoding="async" draggable={false} className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${open ? "scale-110" : "scale-100"}`} onError={(e) => { e.currentTarget.style.display = "none"; }} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/10" />
      <div className={`absolute inset-0 bg-ink/55 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`} />
      {/* light sweep on hover */}
      <span className="pointer-events-none absolute -left-1/2 inset-y-0 w-1/3 -skew-x-12 bg-white/15 transition-transform duration-1000 group-hover:translate-x-[460%]" />

      {/* top row */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-ink/35 font-head text-xl font-extrabold text-white ring-1 ring-white/50">{s.letter}</span>
        <span className="rounded-full bg-ink/35 px-3 py-1.5 text-[11px] font-semibold tracking-wider text-white ring-1 ring-white/30">{s.items.length} areas</span>
      </div>

      {/* bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <h4 className="font-head text-[clamp(22px,2.4vw,28px)] font-extrabold leading-tight">{s.title}</h4>
        <p className="mt-1 text-sm text-white/80">{s.tagline}</p>

        <div className={`overflow-hidden transition-all duration-500 ${open ? "max-h-0 opacity-0" : "mt-4 max-h-24 opacity-100"}`}>
          <div className="flex flex-wrap gap-2">
            {s.items.slice(0, 3).map((t) => (
              <span key={t} className="rounded-full bg-ink/35 px-3 py-1 text-[11.5px] font-medium ring-1 ring-white/25">{t.split(/,| and | where | by /)[0]}</span>
            ))}
          </div>
        </div>

        <div className={`overflow-hidden transition-all duration-500 ${open ? "mt-4 max-h-[320px] opacity-100" : "max-h-0 opacity-0"}`}>
          <ul className={`grid max-h-[250px] gap-2 overflow-auto rounded-2xl bg-ink/70 p-4 ring-1 ring-white/20 ${wide ? "sm:grid-cols-2" : ""}`}>
            {s.items.map((t) => (
              <li key={t} className="flex items-start gap-2 text-[12.5px] leading-snug text-white/95">
                <i className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-grad text-[9px] not-italic">✓</i>{t}
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={(e) => e.stopPropagation()} className="mt-3 inline-block text-sm font-semibold text-[#7ff5cf] transition hover:translate-x-1">Discuss this service →</a>
        </div>

        <div className={`mt-3 text-[11px] font-semibold uppercase tracking-[2px] text-white/60 transition-opacity ${open ? "opacity-0" : "opacity-100"}`}>Hover or tap for full list</div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="solutions" className="sec alt"><div className="wrap">
      <Reveal>
        <span className="ey">Tech Twist Global · Guest management &amp; customer support</span>
        <h2 className="h2">Our core services</h2>
        <p className="lead">{servicesIntro}</p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {["Dedicated function", "Selected tasks in your existing operations"].map((t) => (
            <span key={t} className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-white px-4 py-2 text-[13px] font-semibold text-deep shadow-[0_10px_24px_-16px_rgba(11,79,92,.6)]">
              <i className="h-2 w-2 rounded-full bg-grad" />{t}
            </span>
          ))}
        </div>
      </Reveal>

      {groups.map((g) => (
        <div key={g.name} className="mt-8">
          <Reveal>
            <div className="flex items-center gap-4">
              <h3 className="shrink-0 text-[13px] font-bold uppercase tracking-[2px] text-teal">{g.name}</h3>
              <span className="h-px flex-1 bg-gradient-to-r from-teal/40 to-transparent" />
            </div>
          </Reveal>
          <div className={`mt-4 grid gap-5 [perspective:1300px] ${g.grid}`}>
            {services.filter((s) => s.group === g.name).map((s, k) => (
              <Reveal key={s.letter} delay={k * 0.08}><PhotoCard s={s} wide={g.wide} /></Reveal>
            ))}
          </div>
        </div>
      ))}
    </div></section>
  );
}