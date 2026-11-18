"use client";
import { useState } from "react";
import { navLinks } from "@/lib/content";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-40 border-b border-teal/20 bg-white/95 shadow-[0_8px_24px_-18px_rgba(11,79,92,.5)]" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
        <div className="flex items-center justify-between gap-4 px-[5vw] py-2.5">
          <a href="#" className="flex min-w-0 items-center gap-2.5 font-head text-lg font-extrabold sm:text-xl" onClick={() => setOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/Tech1.webp" alt="TechTwist" width={300} height={215} fetchPriority="high" className="block h-[40px] w-auto sm:h-[45px]" />
            <span className="leading-tight">TechTwist <span className="block text-[10px] font-semibold text-teal sm:text-xs">Innovate · Connect · Grow</span></span>
          </a>
          <ul className="hidden gap-6 text-sm font-medium text-mut lg:flex">
            {navLinks.map(([label, href]) => (<li key={href}><a href={href} className="transition hover:text-teal">{label}</a></li>))}
          </ul>
          <div className="flex items-center gap-3">
            <a href="#contact" className="btn !px-5 !py-2.5 !text-sm max-md:hidden">Get a Free Consultation →</a>
            <button onClick={() => setOpen((v) => !v)} aria-label="Menu" aria-expanded={open} className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-teal/30 lg:hidden">
              <span className="relative block h-3.5 w-5">
                <i className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-ink transition ${open ? "translate-y-[6px] rotate-45" : ""}`} />
                <i className={`absolute left-0 top-[6px] h-0.5 w-5 rounded bg-ink transition ${open ? "opacity-0" : ""}`} />
                <i className={`absolute left-0 top-[12px] h-0.5 w-5 rounded bg-ink transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
        {/* mobile menu */}
        <div className={`grid transition-all duration-300 lg:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden">
            <ul className="grid gap-1 px-[5vw] pb-4 pt-1">
              {navLinks.map(([label, href]) => (
                <li key={href}><a href={href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 font-head font-bold text-ink hover:bg-mist">{label}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <a href="#contact" className="btn fixed inset-x-[5vw] z-40 text-center md:hidden" style={{ bottom: "calc(14px + env(safe-area-inset-bottom, 0px))" }}>Get a Free Consultation →</a>
    </>
  );
}
