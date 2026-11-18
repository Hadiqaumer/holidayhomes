import HeroSlider from "./HeroSlider";

export default function Hero() {
  return (
    <header className="relative overflow-hidden px-[5vw] pb-8 pt-24 sm:pt-28 lg:pb-10" style={{ background: "radial-gradient(ellipse at 22% 40%,#10b98144,transparent 52%),radial-gradient(ellipse at 90% 90%,#0e9aa73d,transparent 50%),linear-gradient(135deg,#fff,#e3f8f4 60%,#d9f7e8)" }}>
      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-5 lg:grid-cols-[1.3fr_1fr] lg:gap-6">
        {/* slider: below the text on phones/tablets, on the LEFT on desktop */}
        <div className="order-2 min-w-0 lg:order-1"><HeroSlider /></div>

        <div className="order-1 text-center lg:order-2 lg:text-left">
          <span className="mb-4 inline-block rounded-full border border-teal/20 bg-white/80 px-3 py-1.5 text-[10px] font-semibold tracking-[1.5px] text-teal sm:mb-5 sm:px-4 sm:text-xs sm:tracking-[2px]">HOSPITALITY BPO · FOR HOTELS &amp; RESORTS</span>
          <h1 className="text-[clamp(30px,3.7vw,52px)] font-extrabold tracking-[-1px] sm:tracking-[-1.5px]">
            Every guest journey deserves an <span className="bg-grad bg-clip-text text-transparent">exceptional experience.</span>
          </h1>
          <p className="mx-auto my-4 max-w-[520px] text-base text-mut sm:text-lg lg:mx-0">From the first booking inquiry to the final checkout, we manage every hotel guest interaction with professionalism, efficiency and personalized care.</p>
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
            <a href="#contact" className="btn text-center">Get a Free Consultation</a>
            <a href="#solutions" className="btn btn-o text-center">Explore Our Solutions</a>
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] font-medium sm:text-[13.5px] lg:justify-start">
            {["End-to-End Guest Management", "24/7 Guest Assistance", "Dedicated Hospitality Support"].map((t) => (
              <span key={t}><i className="mr-2 inline-grid h-5 w-5 place-items-center rounded-full bg-grad text-[11px] not-italic text-white">✓</i>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}