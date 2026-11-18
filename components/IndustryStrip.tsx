import Reveal from "./Reveal";

const items = [
  { label: "Hotels & resorts", d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2 M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2 M10 6h4 M10 10h4 M10 14h4 M10 18h4" },
  { label: "Vacation rentals", d: "M3 10.5 12 3l9 7.5 M5 9v12h14V9 M10 21v-6h4v6" },
  { label: "Property groups", d: "M5 2h14v20H5z M9 22v-4h6v4 M9 6h.01 M12 6h.01 M15 6h.01 M9 10h.01 M12 10h.01 M15 10h.01 M9 14h.01 M12 14h.01 M15 14h.01" },
  { label: "Travel companies", d: "M5 7h14a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z M9 7V4h6v3 M9 11v5 M15 11v5" },
];

export default function IndustryStrip() {
  return (
    <section aria-label="Who we support" className="relative border-y border-teal/15 bg-white/90">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal/50 to-transparent" />
      <div className="wrap flex flex-col items-center gap-4 py-5 text-center lg:flex-row lg:justify-between lg:gap-10 lg:text-left">
        <Reveal>
          <p className="max-w-[400px] font-head text-[17px] font-bold leading-snug text-ink">
            Flexible support for hospitality operations of every shape and size.
          </p>
        </Reveal>
        <ul className="grid w-full max-w-[640px] grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 lg:w-auto lg:max-w-none lg:gap-x-10">
          {items.map((it, k) => (
            <li key={it.label}>
              <Reveal delay={k * 0.08}>
                <div className="group flex cursor-default flex-col items-center gap-2.5 sm:flex-row sm:gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-teal/15 to-em/20 text-teal transition duration-300 group-hover:-translate-y-1 group-hover:bg-grad group-hover:text-white group-hover:shadow-[0_14px_24px_-10px_#0e9aa7]">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={it.d} /></svg>
                  </span>
                  <span className="text-[13px] font-semibold text-deep">{it.label}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}