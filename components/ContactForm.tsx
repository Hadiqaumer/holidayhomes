"use client";
import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setState("done"); setMsg("Thank you! We’ll be in touch within 24 hours."); form.reset();
    } catch (err) {
      setState("error"); setMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="contact" className="sec"><div className="wrap">
      <Reveal>
        <div className="relative grid gap-7 overflow-hidden rounded-[30px] bg-deepg p-6 sm:p-9 text-white md:grid-cols-2">
          <div className="absolute -bottom-24 -left-20 h-[300px] w-[300px] rounded-full bg-grad opacity-40" />
          <div className="relative z-10">
            <span className="ey !text-[#7ff5cf]">Let’s improve your guest experience</span>
            <h2 className="mb-4 mt-3 text-[clamp(28px,4vw,46px)] font-extrabold">Your guests deserve better. Your team deserves support.</h2>
            <p className="text-[#cdeee9]">Let us take care of your guest interactions while you focus on delivering outstanding hospitality and growing your business.</p>
          </div>
          <form onSubmit={onSubmit} className="relative z-10 flex flex-col gap-3 rounded-3xl bg-white p-7 text-ink">
            <h3 className="text-lg">Let’s discuss your business needs</h3>
            <select name="service" className="inp"><option>Guest Management Services</option><option>Customer Support</option><option>Internet Services</option><option>Other</option></select>
            <input name="name" required minLength={2} placeholder="Your name" className="inp" />
            <input name="email" required type="email" placeholder="Business email" className="inp" />
            <input name="phone" placeholder="Phone number" className="inp" />
            <textarea name="message" placeholder="How can we support your hotel operations?" className="inp min-h-[80px] resize-y" />
            <button className="btn w-full" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Request a Consultation →"}</button>
            {msg && <p role="status" className={`text-sm ${state === "error" ? "text-red-600" : "text-em"}`}>{msg}</p>}
          </form>
        </div>
      </Reveal>
    </div></section>
  );
}
