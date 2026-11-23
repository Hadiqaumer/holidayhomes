"use client";
import { useRef, useState, type FormEvent } from "react";
import Reveal from "./Reveal";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxXlSMr_WlvBLyAcf_LSr2fDoMYq0kO9txAEdSAUskBqmGkh4eX0hwRx0JToBB2K2-n/exec";
const WHATSAPP_NUMBER = "923094126964";

const SERVICES = [
  "Guest management",
  "Customer support",
  "Holiday homes & property support",
  "Back-office & administration",
  "Technology-enabled support",
  "Internet Services",
  "Other",
];

type Lead = { service: string; name: string; email: string; phone: string; message: string };

function waLink(d: Lead) {
  const text = [
    "Hello, I just sent an enquiry from your website.",
    "",
    "Name: " + d.name,
    "Service: " + d.service,
    "Email: " + d.email,
    "Phone: " + (d.phone || "-"),
    "",
    "Message: " + (d.message || "-"),
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [waUrl, setWaUrl] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;

    const form = formRef.current;
    if (!form) return;
    const fd = new FormData(form);

    const lead: Lead = {
      service: String(fd.get("service") ?? "").trim(),
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
    };

    if (lead.name.length < 2) {
      setState("error");
      setMsg("Please enter your name.");
      return;
    }
    if (lead.phone && lead.phone.replace(/\D/g, "").length < 10) {
      setState("error");
      setMsg("Please enter a valid phone number (at least 10 digits).");
      return;
    }

    // Honeypot: a real visitor never fills this. Bots do. We pretend success and send nothing.
    const isBot = String(fd.get("hp_trap") ?? "").trim() !== "";

    setState("sending");
    setMsg("");

    try {
      if (!isBot) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 20000);
        try {
          // text/plain + no-cors: Google Apps Script does not answer CORS preflight requests.
          await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({
              ...lead,
              page: window.location.href,
              submittedAt: new Date().toISOString(),
            }),
            signal: controller.signal,
            keepalive: true,
          });
        } finally {
          clearTimeout(timer);
        }
      }

      const link = waLink(lead);
      setWaUrl(link);
      setState("done");
      setMsg("Thank you! Redirecting you to WhatsApp…");
      form.reset();

      setTimeout(() => {
        window.location.href = link;
      }, 2500);
    } catch (err) {
      console.error("Contact form error:", err);
      setState("error");
      setMsg("Sorry, we couldn't send your message. Please try again or call +92 309 412 6964.");
    }
  }

  return (
    <section id="contact" className="sec">
      <div className="wrap">
        <Reveal>
          <div className="relative grid gap-7 overflow-hidden rounded-[30px] bg-deepg p-6 sm:p-9 text-white md:grid-cols-2">
            <div className="absolute -bottom-24 -left-20 h-[300px] w-[300px] rounded-full bg-grad opacity-40" />
            <div className="relative z-10">
              <span className="ey !text-[#7ff5cf]">Let’s improve your guest experience</span>
              <h2 className="mb-4 mt-3 text-[clamp(28px,4vw,46px)] font-extrabold">
                Your guests deserve better. Your team deserves support.
              </h2>
              <p className="text-[#cdeee9]">
                Let us take care of your guest interactions while you focus on delivering outstanding
                hospitality and growing your business.
              </p>
              <a href="tel:+923094126964" className="mt-5 inline-block font-bold text-[#7ff5cf]">
                +92 309 412 6964
              </a>
            </div>

            <form
              ref={formRef}
              onSubmit={onSubmit}
              className="relative z-10 flex flex-col gap-3 rounded-3xl bg-white p-7 text-ink"
            >
              <h3 className="text-lg">Let’s discuss your business needs</h3>

              <select name="service" className="inp" defaultValue={SERVICES[0]}>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <input name="name" required minLength={2} placeholder="Your name" autoComplete="name" className="inp" />
              <input name="email" required type="email" placeholder="Business email" autoComplete="email" className="inp" />
              <input name="phone" type="tel" placeholder="Phone number" autoComplete="tel" className="inp" />
              <textarea
                name="message"
                placeholder="How can we support your hotel operations?"
                className="inp min-h-[80px] resize-y"
              />

              {/* honeypot: hidden from people, odd name so browser autofill ignores it */}
              <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
                <input name="hp_trap" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
              </div>

              <button type="submit" className="btn w-full" disabled={state === "sending"}>
                {state === "sending" ? "Sending…" : "Request a Consultation →"}
              </button>

              {msg && (
                <p role="status" className={`text-sm ${state === "error" ? "text-red-600" : "text-em"}`}>
                  {msg}
                </p>
              )}
              {state === "done" && waUrl && (
                <a href={waUrl} className="text-sm font-bold underline">
                  Not redirected? Open WhatsApp
                </a>
              )}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}