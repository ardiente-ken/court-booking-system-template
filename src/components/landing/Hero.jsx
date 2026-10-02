// src/components/landing/Hero.jsx: court-style hero (blue court, white line, teal kitchen band).
// Text comes from Staff settings. Used by: pages/HomePage.jsx
import Ball from "../ui/Ball";
import Button from "../ui/Button";
import { display, kitchen } from "../../config/theme";
import { hr } from "../../lib/dates";

export default function Hero({ settings, onBook, onFind }) {
  const { accent, h1, h2, hero, price, open, close } = settings;
  return (
    <section className="text-white overflow-hidden" style={{ background: accent }}>
      <div className="relative max-w-6xl mx-auto px-5 pt-12 md:pt-20 pb-20">
        <h1 style={display} className="text-4xl md:text-6xl font-black leading-tight">{h1}<br />{h2}</h1>
        <p className="mt-5 text-lg max-w-md" style={{ opacity: 0.9 }}>{hero}</p>
        <div className="hidden md:block absolute top-0 bottom-0" style={{ left: "80%", width: 4, background: "rgba(255,255,255,.45)" }} />
        <div className="absolute" style={{ left: "calc(67% - 60px)", bottom: -50, zIndex: 10 }}><Ball size={250} /></div>
      </div>
      <div style={{ background: kitchen(accent), borderTop: "4px solid #fff" }}>
        <div className="max-w-6xl mx-auto px-5 py-10 flex flex-wrap gap-3 items-center">
          <Button variant="ball" onClick={onBook}>Book a court</Button>
          <Button variant="outline" onClick={onFind}>Find my booking</Button>
          <span className="text-sm" style={{ opacity: 0.85 }}>{price}, open {hr(open)} to {hr(close === 24 ? 0 : close)}</span>
        </div>
      </div>
    </section>
  );
}
