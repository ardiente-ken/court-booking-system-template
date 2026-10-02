// src/pages/DonePage.jsx: booking confirmed. Used by: App.jsx (view "done")
import Ball from "../components/ui/Ball";
import Button from "../components/ui/Button";
import { hr } from "../lib/dates";
import { display, kitchen } from "../config/theme";

export default function DonePage({ settings, held, onBack }) {
  if (!held) return null;
  return (
    <div className="max-w-lg rounded-3xl text-white p-8" style={{ background: kitchen(settings.accent) }}>
      <Ball size={56} />
      <h2 style={display} className="text-2xl font-black mt-4">You're booked</h2>
      <p className="mt-3">{held.court}, {held.day}, {hr(held.hour)} to {hr(held.hour + 1)}. See you on court, {held.name}.</p>
      <Button variant="ball" className="mt-7" onClick={onBack}>Back to start</Button>
    </div>
  );
}
