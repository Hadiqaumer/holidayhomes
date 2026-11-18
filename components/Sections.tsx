"use client";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import Tilt from "./Tilt";
import { solutions, why, how, faq, serve } from "@/lib/content";

function Head({ ey, title }: { ey: string; title: string }) {
  return (<Reveal><span className="ey">{ey}</span><h2 className="h2">{title}</h2></Reveal>);
}




const solIcons = [
  // Reservation Management
  <svg key="r" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="3" fill="currentColor" fillOpacity=".25" /><path d="M3 10h18M8 3v4M16 3v4" /><path d="m9 15.2 2 2 4-4" /></svg>,
  // Guest Communication
  <svg key="c" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-6l-5 4v-4H7a3 3 0 0 1-3-3z" fill="currentColor" fillOpacity=".25" /><path d="M8 8.5h8M8 11.5h5" /></svg>,
  // Pre-Arrival & Check-In
  <svg key="k" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="15" r="4.5" fill="currentColor" fillOpacity=".25" /><path d="M11.5 11.5 20 3M16 7l3 3M14 9l2 2" /></svg>,
  // In-Stay Assistance (concierge bell)
  <svg key="b" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17a8 8 0 0 1 16 0z" fill="currentColor" fillOpacity=".25" /><path d="M12 9V6M10 6h4M3 20.5h18" /></svg>,
  // Checkout Assistance (suitcase)
  <svg key="s" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4.5" y="7" width="15" height="13" rx="3" fill="currentColor" fillOpacity=".25" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M9 11v5M15 11v5" /></svg>,
  // Feedback & Retention (star)
  <svg key="f" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" fill="currentColor" fillOpacity=".25" /></svg>,
];
// order must match your `solutions` array
const solImages = [
  "/images/slides/Booking-Coordination.webp",
  "/images/slides/guest-support.webp",
  "/images/slides/check-in-coordination.webp",
  "/images/journey/during-stay.webp",
  "/images/journey/checkout.webp",
  "/images/slides/airbnb-host-welcoming-guests.webp",
];

const solTones = [
  "from-[#0e9aa7] to-[#06323a]",
  "from-[#10b981] to-[#0b4f5c]",
  "from-[#35c9d6] to-[#0b6b73]",
  "from-[#34d399] to-[#0e7a8a]",
  "from-[#0b6b73] to-[#10b981]",
  "from-[#0e9aa7] to-[#0b4f5c]",
];

export function Solutions() {
  const n = solutions.length;
  const wrap = useRef<HTMLDivElement>(null);
  const [cw, setCw] = useState(1000);
  const [active, setActive] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const startX = useRef<number | null>(null);
  const moved = useRef(false);

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

  const select = (i: number) => { setActive(i); setFlipped(false); };
  const go = (d: number) => select((active + d + n) % n);

  // autoplay only while on screen, the tab is open and no card is flipped
  useEffect(() => {
    if (paused || flipped || !visible) return;
    const id = setInterval(() => { if (!document.hidden) setActive((v) => (v + 1) % n); }, 4500);
    return () => clearInterval(id);
  }, [paused, flipped, visible, n]);

  /*
    SMOOTHNESS: every card is drawn once at width `w` and only moved with
    transform + opacity (GPU). Width / font-size / height are never animated.
  */
  const mobile = cw < 640;
  const w = mobile ? cw * 0.5 : Math.min(cw * 0.26, 300);   // size every card is drawn at
  const s1 = mobile ? 0.72 : 0.8;                             // 1st neighbours (scale)
  const s2 = 0.62;                                            // 2nd neighbours (scale)
  const w1 = w * s1, w2 = w * s2;
  const o1 = ((w + w1) / 2) * 0.92;
  const o2 = o1 + ((w1 + w2) / 2) * 0.92;
  const cardH = w * 1.5;
  const CAPTION = 116;
  const height = 14 + cardH + CAPTION;
  const fade = "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)";
  const cur = solutions[active];

  return (
    <section id="guest-solutions" className="sec alt relative overflow-hidden">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(14,154,167,.16),transparent_70%)]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(110,231,183,.22),transparent_70%)]" />

      <div className="wrap relative">
        <Head ey="Our guest management solutions" title="Hospitality support that goes beyond reservations." />

        <Reveal className="mt-6">
          <div
            ref={wrap}
            className="relative mx-auto w-full max-w-[1200px] select-none overflow-hidden"
            style={{ height, WebkitMaskImage: fade, maskImage: fade, touchAction: "pan-y" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onPointerDown={(e) => { startX.current = e.clientX; moved.current = false; }}
            onPointerUp={(e) => {
              if (startX.current === null) return;
              const dx = e.clientX - startX.current;
              if (Math.abs(dx) > 50) { moved.current = true; go(dx < 0 ? 1 : -1); }
              startX.current = null;
            }}
            aria-roledescription="carousel"
            aria-label="Guest management solutions"
          >
            <div className="absolute inset-x-0 top-[14px] [perspective:1300px]">
              {solutions.map(([, t, d], i) => {
                let dd = i - active;
                if (dd > n / 2) dd -= n;
                if (dd < -n / 2) dd += n;
                const abs = Math.abs(dd);
                const isActive = abs === 0;
                const sign = dd < 0 ? -1 : 1;

                let sc: number, off: number, blur = 0, opacity = 1, rot = 0;
                if (isActive) { sc = 1; off = 0; }
                else if (abs === 1) { sc = s1; off = sign * o1; blur = mobile ? 0 : 3; rot = -sign * 14; }
                else if (abs === 2) { sc = s2; off = sign * o2; blur = mobile ? 0 : 6; opacity = mobile ? 0 : 1; rot = -sign * 18; }
                else { sc = s2 * 0.8; off = sign * (o2 + w2 * 0.6); opacity = 0; rot = -sign * 18; }

                const isBack = isActive && flipped;

                return (
                  <div
                    key={t}
                    onClick={() => {
                      if (moved.current) { moved.current = false; return; }
                      if (isActive) setFlipped((v) => !v);
                      else select(i);
                    }}
                    className="absolute left-1/2 top-0 cursor-pointer"
                    style={{
                      width: w,
                      fontSize: w * 0.055,
                      transform: `translateX(calc(-50% + ${off}px))${rot ? ` rotateY(${rot}deg)` : ""} scale(${sc})`,
                      transformOrigin: "50% 0",
                      filter: blur ? `blur(${blur}px)` : "none",
                      opacity,
                      zIndex: 10 - abs,
                      pointerEvents: opacity === 0 ? "none" : "auto",
                      transition: "transform .8s cubic-bezier(.22,.8,.25,1), opacity .8s ease, filter .8s ease",
                      willChange: "transform, opacity",
                    }}
                  >
                    <div className={`aspect-[200/300] [perspective:900px] ${isActive && !flipped ? "md:animate-float" : ""}`}>
                      <div
                        className="relative h-full w-full"
                        style={{ transformStyle: "preserve-3d", transform: isBack ? "rotateY(180deg)" : "none", transition: "transform .7s cubic-bezier(.22,.8,.25,1)" }}
                      >
                        {/* FRONT: image card */}
                        <div className={`absolute inset-0 overflow-hidden rounded-[999px] bg-gradient-to-b ${solTones[i % solTones.length]} shadow-[0_30px_44px_-26px_rgba(6,50,58,.75)] [backface-visibility:hidden]`}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={solImages[i]}
                            alt={t}
                            width={720}
                            height={1080}
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            className="absolute inset-0 h-full w-full object-cover"
                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/5 to-ink/25" />
                          {!isActive && <div className="absolute inset-0 bg-[#06323a]/25" />}

                          <span className="absolute left-1/2 top-[8%] -translate-x-1/2 whitespace-nowrap rounded-full bg-ink/35 px-[.9em] py-[.3em] text-[.7em] font-semibold tracking-[.2em] text-white ring-1 ring-white/30">
                            0{i + 1} / 0{n}
                          </span>

                          <div className="absolute inset-x-[14%] bottom-[12%] rounded-2xl bg-ink/45 px-[.8em] py-[.8em] text-center font-head text-[1em] font-bold leading-tight text-white ring-1 ring-white/25">
                            {t}
                          </div>
                        </div>

                        {/* BACK: details */}
                        <div
                          className="absolute inset-0 flex flex-col items-center overflow-hidden rounded-[999px] bg-white px-[15%] pt-[24%] text-center shadow-[0_30px_44px_-26px_rgba(6,50,58,.75)] ring-1 ring-teal/20 [backface-visibility:hidden]"
                          style={{ transform: "rotateY(180deg)" }}
                        >
                          <span className="grid h-[3.4em] w-[3.4em] place-items-center rounded-[1em] bg-teal/10 text-teal [&>svg]:h-[1.9em] [&>svg]:w-[1.9em]">
                            {solIcons[i]}
                          </span>
                          <div className="mt-[1em] font-head text-[.7em] font-bold uppercase tracking-[2px] text-em">What we handle</div>
                          <h3 className="mt-[.6em] font-head text-[1em] font-extrabold leading-tight text-ink">{t}</h3>
                          <p className="mt-[.8em] text-[.82em] leading-[1.6] text-mut">{d}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* arrows */}
            <button onClick={() => go(-1)} aria-label="Previous solution" style={{ top: 14 + cardH / 2 - 20 }} className="absolute left-[2%] z-20 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-teal shadow ring-1 ring-ink/20 transition hover:scale-110">‹</button>
            <button onClick={() => go(1)} aria-label="Next solution" style={{ top: 14 + cardH / 2 - 20 }} className="absolute right-[2%] z-20 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-teal shadow ring-1 ring-ink/20 transition hover:scale-110">›</button>

            {/* caption */}
            <div className="absolute inset-x-0 bottom-0 z-20 px-3 text-center">
              <div className="font-head text-[14px] font-extrabold uppercase tracking-[1.5px] text-ink sm:text-[15px]">{cur[1]}</div>
              <div className="mt-0.5 text-[11px] text-mut">Hospitality BPO · Guest management</div>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                <div className="inline-flex overflow-hidden rounded-full ring-1 ring-ink/70">
                  {([false, true] as const).map((v) => (
                    <button
                      key={String(v)}
                      onClick={() => setFlipped(v)}
                      className={`px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider transition ${flipped === v ? "bg-ink text-white" : "text-ink"}`}
                    >
                      {v ? "Details" : "Overview"}
                    </button>
                  ))}
                </div>
                <a href="#contact" className="rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink ring-1 ring-ink/70 transition hover:bg-ink hover:text-white">
                  Get a quote →
                </a>
              </div>
            </div>
          </div>

          {/* dots */}
          <div className="mt-2 flex items-center justify-center gap-2">
            {solutions.map((_, k) => (
              <button
                key={k}
                onClick={() => select(k)}
                aria-label={`Go to solution ${k + 1}`}
                className={`h-1 rounded-full transition-all duration-500 ${active === k ? "w-12 bg-teal" : "w-5 bg-teal/20 hover:bg-teal/50"}`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
const whyIcons = [
  // Always-on
  <svg key="a" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  // Dedicated teams
  <svg key="d" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6" /><path d="M16 5a3.5 3.5 0 0 1 0 6.5M18.5 14.5c1.8.8 3 2.6 3 5.5" /></svg>,
  // Seamless journey
  <svg key="s" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="18" r="2" /><circle cx="19" cy="6" r="2" /><path d="M7 18h6a3 3 0 0 0 0-6h-2a3 3 0 0 1 0-6h6" /></svg>,
  // Scalable
  <svg key="c" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></svg>,
  // Efficiency
  <svg key="e" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" /></svg>,
  // Guest-centric
  <svg key="g" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>,
];

export function Why() {
  return (
    <section className="sec">
      <div className="wrap">
        <Head ey="Why hotels choose TechTwist Global" title="Better guest experiences. Smarter hotel operations." />

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {why.map(([t, d], k) => (
            <Reveal key={t} delay={k * 0.06} className="h-full">
              <article className="group relative flex h-full min-h-[170px] flex-col overflow-hidden rounded-[24px] border border-teal/20 bg-white p-6 transition-all duration-500 hover:-translate-y-2 hover:border-transparent hover:shadow-[0_34px_60px_-30px_rgba(6,50,58,.75)]">
                {/* hover fill */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0b4f5c] to-[#06323a] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(14,154,167,0.40),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* big faint number */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-5 right-4 select-none font-head text-[84px] font-extrabold leading-none text-teal/[0.08] transition-colors duration-500 group-hover:text-white/10"
                >
                  0{k + 1}
                </span>

                <div className="relative flex h-full flex-col">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-teal/10 text-teal transition-all duration-500 group-hover:bg-white/15 group-hover:text-white">
                    {whyIcons[k]}
                  </span>

                  <h3 className="mb-2 mt-6 font-head text-[19px] font-bold leading-tight text-deepg transition-colors duration-500 group-hover:text-white">
                    {t}
                  </h3>
                  <p className="max-w-[300px] text-[14.5px] leading-7 text-mut transition-colors duration-500 group-hover:text-white/75">
                    {d}
                  </p>
                </div>

                {/* bottom accent line */}
                <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-teal to-emerald-400 transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const ill = [
  <svg key="h" viewBox="0 0 200 160" fill="#fff"><rect x="60" y="10" width="80" height="150" /><rect x="60" y="10" width="80" height="150" fill="url(#wn)" /><rect x="20" y="85" width="40" height="75" /><rect x="20" y="85" width="40" height="75" fill="url(#wn)" /><rect x="140" y="105" width="40" height="55" /></svg>,
  <svg key="r" viewBox="0 0 200 160" fill="#fff"><circle cx="150" cy="40" r="22" /><path d="M0 130 Q25 112 50 130 T100 130 T150 130 T200 130 V160 H0Z" /><rect x="60" y="60" width="6" height="70" /><path d="M63 60 Q30 40 20 70 Q45 50 63 60Z M63 60 Q95 38 108 68 Q82 50 63 60Z M63 60 Q60 25 85 22 Q68 40 63 60Z" /></svg>,
  <svg key="b" viewBox="0 0 200 160" fill="#fff"><rect x="50" y="50" width="100" height="110" /><rect x="50" y="50" width="100" height="110" fill="url(#wn)" /><path d="M40 50 H160 L150 30 H50Z" /><rect x="88" y="115" width="24" height="45" fill="#0b4f5c" /></svg>,
  <svg key="g" viewBox="0 0 200 160" fill="#fff"><rect x="10" y="70" width="50" height="90" /><rect x="10" y="70" width="50" height="90" fill="url(#wn)" /><rect x="70" y="20" width="60" height="140" /><rect x="70" y="20" width="60" height="140" fill="url(#wn)" /><rect x="140" y="55" width="50" height="105" /><rect x="140" y="55" width="50" height="105" fill="url(#wn)" /></svg>,
];
const tones = ["from-[#0e9aa7] to-[#06323a]", "from-[#10b981] to-[#0b4f5c]", "from-[#35c9d6] to-[#0b6b73]", "from-[#34d399] to-[#0e7a8a]"];
const serveIcons = [
  <svg key="h" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 11h4a1 1 0 0 1 1 1v9M3 21h18M8 8h2M8 12h2M8 16h2" /></svg>,
  <svg key="b" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l2-5h14l2 5M4 9v11h16V9M3 9h18M10 20v-5h4v5" /></svg>,
  <svg key="g" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="10" width="5" height="11" rx="1" /><rect x="9.5" y="3" width="5" height="18" rx="1" /><rect x="16" y="8" width="5" height="13" rx="1" /></svg>,
  <svg key="v" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8M5 9.5V21h14V9.5M10 21v-6h4v6" /></svg>,
  <svg key="t" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></svg>,
  <svg key="i" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l9-8 9 8M5 10v10h14V10M3 20h18M10 20v-5h4v5" /></svg>,
];

export function Industries() {
  return (
    <section id="industries" className="sec alt">
      <div className="wrap">
        <Head ey="Who we serve" title="Guest management for every type of hospitality business." />
        <p className="lead mt-2 max-w-[620px]">
          From a single boutique property to multi-brand operators, we plug into
          your team and take on the guest-facing work you need covered.
        </p>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serve.map((s, k) => (
            <Reveal key={s.t} delay={k * 0.06} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-teal/20 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-teal/50 hover:shadow-[0_34px_60px_-32px_rgba(11,79,92,.5)]">
                {/* BIG IMAGE */}
                <div className="relative h-[220px] overflow-hidden bg-gradient-to-br from-[#0e9aa7] to-[#06323a] sm:h-[230px]">
                  <img
                    src={s.img}
                    alt={s.t}
                    loading="lazy"
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#032f37]/75 via-[#032f37]/10 to-transparent" />

                  {/* number badge */}
                  <span className="absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1 font-head text-[11px] font-bold tracking-[2px] text-white">
                    0{k + 1}
                  </span>
                </div>

                {/* BODY */}
                <div className="relative flex flex-1 flex-col px-6 pb-6">
                  {/* icon overlapping image */}
                  <span className="-mt-7 mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-white text-teal shadow-[0_12px_28px_-10px_rgba(11,79,92,.45)] ring-1 ring-teal/15 transition-all duration-300 group-hover:bg-teal group-hover:text-white">
                    {serveIcons[k]}
                  </span>

                  <h3 className="font-head text-[20px] font-extrabold leading-tight text-deepg">
                    {s.t}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-7 text-mut">{s.d}</p>

                  <ul className="mb-6 mt-5 space-y-2.5 border-t border-teal/10 pt-5">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-[13.5px] font-medium text-deepg">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal/10 text-[10px] font-bold text-teal">
                          ✓
                        </span>
                        {it}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className="mt-auto inline-flex items-center gap-2 font-head text-[13.5px] font-bold text-teal transition-colors hover:text-deepg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
                  >
                    Discuss your needs
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
const howIcons = [
  // Discovery
  <svg key="d" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>,
  // Setup
  <svg key="s" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></svg>,
  // Operations
  <svg key="o" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /></svg>,
  // Optimization
  <svg key="p" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></svg>,
];

const howTags = [
  ["Guest audit", "Service standards"],
  ["Workflows", "Scripts", "Channels"],
  ["Live support", "Guest messaging"],
  ["Quality reviews", "Response times"],
];

export function How() {
  return (
    <section id="how" className="sec">
      <div className="wrap">
        <Head ey="How we work" title="Simple to start. Built to scale." />

        <p className="lead mt-2 max-w-[560px]">
          Four clear steps from first conversation to a fully managed guest
          experience, with no complicated onboarding.
        </p>

        <div className="relative mt-8">
          {/* desktop connector line */}
          <div className="pointer-events-none absolute left-[27px] right-[27px] top-[27px] hidden h-px bg-gradient-to-r from-teal/60 via-teal/30 to-teal/60 lg:block" />
          {/* mobile connector line */}
          <div className="pointer-events-none absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-teal/60 to-teal/10 lg:hidden" />

          <div className="grid gap-8 lg:grid-cols-4 lg:gap-5">
            {how.map(([t, d], k) => (
              <Reveal key={t} delay={k * 0.08}>
                <div className="group relative pl-[76px] lg:pl-0">
                  {/* node */}
                  <div className="absolute left-0 top-0 grid h-[54px] w-[54px] place-items-center rounded-full border-2 border-teal/30 bg-white font-head text-[15px] font-extrabold text-teal shadow-[0_10px_24px_-12px_rgba(14,154,167,.6)] transition-all duration-300 group-hover:scale-110 group-hover:border-deepg group-hover:bg-deepg group-hover:text-white lg:relative">
                    0{k + 1}
                  </div>

                  {/* card */}
                  <div className="relative overflow-hidden rounded-[24px] border border-teal/20 bg-white p-6 transition-all duration-300 group-hover:-translate-y-2 group-hover:border-teal/50 group-hover:shadow-[0_28px_50px_-28px_rgba(11,79,92,.55)] lg:mt-7">
                    {/* watermark number */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-2 -top-4 select-none font-head text-[96px] font-extrabold leading-none text-teal/[0.07]"
                    >
                      0{k + 1}
                    </span>

                    <div className="relative grid h-11 w-11 place-items-center rounded-xl bg-teal/10 text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                      {howIcons[k]}
                    </div>

                    <h3 className="relative mb-2 mt-5 font-head text-[19px] font-bold text-deepg">
                      {t}
                    </h3>
                    <p className="relative text-[14.5px] leading-7 text-mut">{d}</p>

                    <div className="relative mt-5 flex flex-wrap gap-2 border-t border-teal/10 pt-4">
                      {howTags[k]?.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-teal/10 px-3 py-1 text-[11.5px] font-semibold text-deepg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* bottom CTA strip */}
        <Reveal className="mt-7 flex flex-col items-start justify-between gap-5 rounded-[24px] bg-gradient-to-br from-[#0b4f5c] to-[#06323a] p-6 text-white sm:flex-row sm:items-center sm:px-8">
          <div>
            <p className="font-head text-[18px] font-bold">Ready to see how this fits your property?</p>
            <p className="mt-1 text-[14px] text-white/65">Tell us about your hotel and we'll outline a setup plan.</p>
          </div>
          <a
            href="#contact"
            className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-6 py-3 font-head text-sm font-bold text-deepg transition hover:-translate-y-0.5 hover:bg-teal hover:text-white"
          >
            Get a Quote
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  const n = faq.length;
  const [q, a] = faq[open] ?? faq[0];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setOpen((v) => (v + 1) % n); }
    if (e.key === "ArrowUp") { e.preventDefault(); setOpen((v) => (v - 1 + n) % n); }
  };

  return (
    <section id="faq" className="sec alt">
      <div className="wrap">
        <Head ey="FAQ" title="Questions hotels ask us." />

        <Reveal className="mt-7 grid items-start gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
          {/* LEFT: question list */}
          <div role="list" onKeyDown={onKey} className="space-y-3">
            {faq.map(([question, answer], k) => {
              const isOpen = open === k;
              return (
                <div key={question} role="listitem">
                  <button
                    type="button"
                    onClick={() => setOpen(k)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${k}`}
                    className={`group flex w-full items-center gap-4 rounded-[20px] border p-4 pr-5 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${
                      isOpen
                        ? "border-transparent bg-deepg text-white shadow-[0_22px_40px_-22px_#0b4f5c] lg:translate-x-2"
                        : "border-teal/20 bg-white/80 text-deepg hover:border-teal/50 hover:bg-white"
                    }`}
                  >
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl font-head text-sm font-extrabold transition-colors duration-300 ${
                        isOpen ? "bg-white/15 text-white" : "bg-teal/10 text-teal"
                      }`}
                    >
                      0{k + 1}
                    </span>
                    <span className="flex-1 font-head text-[15.5px] font-bold leading-snug">
                      {question}
                    </span>
                    <span
                      aria-hidden
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm transition-all duration-300 ${
                        isOpen
                          ? "bg-teal text-white lg:rotate-0 rotate-90"
                          : "bg-teal/10 text-teal group-hover:translate-x-1"
                      }`}
                    >
                      →
                    </span>
                  </button>

                  {/* MOBILE: inline answer */}
                  <div
                    id={`faq-panel-${k}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 motion-reduce:transition-none lg:hidden ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="mx-2 mt-2 rounded-2xl rounded-tl-sm bg-white p-4 text-[14.5px] leading-7 text-mut ring-1 ring-teal/15">
                        {answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: concierge desk (desktop only) */}
          <div className="relative hidden overflow-hidden rounded-[30px] bg-gradient-to-br from-[#0b4f5c] to-[#06323a] p-7 text-white shadow-[0_40px_70px_-35px_rgba(6,50,58,.85)] lg:sticky lg:top-28 lg:block">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(14,154,167,0.30),transparent_70%)]" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.20),transparent_70%)]" />

            {/* header */}
            <div className="relative flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 font-head text-sm font-extrabold">
                  TT
                </span>
                <div>
                  <p className="font-head text-[15px] font-bold leading-none">Guest Desk</p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-white/60">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Typically replies fast
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold tracking-[3px] text-white/50">
                0{open + 1} <span className="text-white/25">/ 0{n}</span>
              </span>
            </div>

            {/* conversation */}
            <div
              key={open}
              aria-live="polite"
              className="relative flex min-h-[260px] flex-col gap-4 py-7 animate-[fadeIn_0.5s_ease]"
            >
              <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-white/10 px-5 py-3.5 text-[14.5px] font-semibold leading-snug">
                {q}
              </div>
              <div className="flex max-w-[92%] items-end gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-teal text-[11px] font-extrabold">
                  TT
                </span>
                <p className="rounded-2xl rounded-bl-sm bg-white px-5 py-4 text-[15px] leading-7 text-deepg shadow-lg">
                  {a}
                </p>
              </div>
            </div>

            {/* footer */}
            <div className="relative flex items-center justify-between gap-4 border-t border-white/10 pt-5">
              <p className="text-[13px] text-white/60">Can't find your answer?</p>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-teal px-5 py-2.5 font-head text-[13px] font-bold text-deepg transition hover:-translate-y-0.5 hover:bg-teal hover:text-white"
              >
                Talk to us
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
const footerLinks = [
  ["Guest journey", "#journey"],
  ["Solutions", "#solutions"],
  ["Who we serve", "#industries"],
  ["How we work", "#how"],
  ["FAQ", "#faq"],
  ["Contact", "#contact"],
] as const;

const socials = [
  {
    name: "LinkedIn",
    href: "#", // TODO: apna LinkedIn link
    icon: <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.75 9.75h3.8v1.6h.05c.55-1 1.9-2 3.9-2 4.1 0 4.85 2.7 4.85 6.2V21h-4v-4.9c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V21h-4z" /></svg>,
  },
  {
    name: "Facebook",
    href: "#", // TODO
    icon: <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.7V21z" /></svg>,
  },
  {
    name: "Instagram",
    href: "#", // TODO
    icon: <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" /></svg>,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/923094126964", // TODO: https://wa.me/92XXXXXXXXXX
    icon: <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.3z" /><path d="M9 8.8c.3 2.6 2.6 4.9 5.2 5.2l1.2-1.2-2-1-.8.7a4 4 0 0 1-1.9-1.9l.7-.8-1-2z" fill="currentColor" stroke="none" /></svg>,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/971595609493", // TODO: https://wa.me/92XXXXXXXXXX
    icon: <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.3z" /><path d="M9 8.8c.3 2.6 2.6 4.9 5.2 5.2l1.2-1.2-2-1-.8.7a4 4 0 0 1-1.9-1.9l.7-.8-1-2z" fill="currentColor" stroke="none" /></svg>,
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#0b4f5c] to-[#06323a] text-white">
      {/* glows */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(14,154,167,0.25),transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.15),transparent_70%)]" />

      <div className="wrap relative">
        {/* CTA band */}
        <Reveal>
          <div className="-mb-px flex flex-col items-start justify-between gap-6 border-b border-white/10 py-10 md:flex-row md:items-center">
            <div className="max-w-[620px]">
              <span className="text-[11px] font-bold tracking-[3px] text-emerald-300">LET'S TALK</span>
              <h2 className="mt-3 font-head text-[28px] font-extrabold leading-[1.15] md:text-[38px]">
                Ready to give your guests a better experience?
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-white/65">
                Tell us about your property and we'll outline a setup plan with no long onboarding.
              </p>
            </div>
            <a
              href="#contact"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-8 py-4 font-head text-sm font-bold text-deepg transition duration-300 hover:-translate-y-1 hover:bg-teal hover:text-white"
            >
              Get a Quote
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </Reveal>

        {/* main columns */}
        <div className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.1fr] lg:gap-10">
          {/* brand */}
          <div>
            <a href="#" className="inline-flex items-center gap-3">
              <img src="/images/Tech1.webp" alt="TechTwist" width={300} height={215} fetchPriority="high" className="block h-[40px] w-auto sm:h-[45px]" />
            <span className="leading-tight text-white">TechTwist <span className="block text-[10px] font-semibold text-white sm:text-xs">Innovate · Connect · Grow</span></span>
            </a>
            <p className="mt-5 max-w-[320px] text-[14.5px] leading-7 text-white/65">
              Guest management and hospitality support for hotels, resorts, vacation rentals and
              travel businesses.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition duration-300 hover:-translate-y-1 hover:bg-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* quick links */}
          <nav aria-label="Footer">
            <h3 className="mb-5 font-head text-[13px] font-bold tracking-[2.5px] text-emerald-300">QUICK LINKS</h3>
            <ul className="space-y-3">
              {footerLinks.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="group inline-flex items-center gap-2 text-[14.5px] text-white/70 transition-colors hover:text-white">
                    <span className="h-px w-0 bg-emerald-300 transition-all duration-300 group-hover:w-3" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* solutions */}
          <div>
            <h3 className="mb-5 font-head text-[13px] font-bold tracking-[2.5px] text-emerald-300">SOLUTIONS</h3>
            <ul className="space-y-3">
              {solutions.map(([, t]) => (
                <li key={t}>
                  <a href="#solutions" className="group inline-flex items-center gap-2 text-[14.5px] text-white/70 transition-colors hover:text-white">
                    <span className="h-px w-0 bg-emerald-300 transition-all duration-300 group-hover:w-3" />
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <h3 className="mb-5 font-head text-[13px] font-bold tracking-[2.5px] text-emerald-300">CONTACT</h3>
            <ul className="space-y-4 text-[14.5px] text-white/70">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-emerald-300">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg>
                </span>
                <a href="mailto:admin@techtwistglobal.com" className="break-all transition-colors hover:text-white">
                  admin@techtwistglobal.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-emerald-300">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
                </span>
                <a href="tel:+923094126964" className="transition-colors hover:text-white">
                  +92 309 412 6964
                </a>
              </li>
               <li className="flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-emerald-300">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
                </span>
                <a href="tel:+971595609493" className="transition-colors hover:text-white">
                  +971 59 560 9493
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-emerald-300">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                </span>
                <span>Support across time zones, 24/7 coverage available</span>
              </li>
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-[13px] text-white/50 sm:flex-row">
          <p>© {year} TechTwist Global. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy-policy" className="transition-colors hover:text-white">Privacy Policy</a>
            <a href="/terms" className="transition-colors hover:text-white">Terms</a>
            <a
              href="#"
              aria-label="Back to top"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition duration-300 hover:-translate-y-1 hover:bg-teal"
            >
              ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}