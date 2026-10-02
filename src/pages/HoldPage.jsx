// src/pages/HoldPage.jsx: countdown while a court is held. Used by: App.jsx (view "hold")
import Button from "../components/ui/Button";
import { hr, mmss } from "../lib/dates";
import { BALL, display } from "../config/theme";

export default function HoldPage({ settings, held, secondsLeft, onConfirm, onRelease }) {
  if (!held) return null;
  return (
    <div className="max-w-lg rounded-3xl text-white p-8" style={{ background: settings.accent }}>
      <h2 style={display} className="text-xl font-black">{secondsLeft ? "Court held for you" : "Hold expired"}</h2>
      <div style={{ ...display, color: BALL }} className="text-7xl font-black tabular-nums mt-4">{mmss(secondsLeft)}</div>
      <div className="h-2 rounded-full mt-4 overflow-hidden" style={{ background: "rgba(255,255,255,.25)" }}>
        <div className="h-full" style={{ width: `${(secondsLeft / (settings.hold * 60)) * 100}%`, background: "#fff" }} />
      </div>
      <p className="mt-5 font-semibold">{held.court}, {held.day}, {hr(held.hour)} to {hr(held.hour + 1)}</p>
      <p className="text-sm mt-1" style={{ opacity: 0.85 }}>
        {secondsLeft ? "Confirm before the timer ends or the slot goes back on the schedule." : "The court was released. Pick a time again."}
      </p>
      <div className="flex gap-3 mt-7 flex-wrap">
        {secondsLeft ? (
          <>
            <Button variant="ball" onClick={onConfirm}>Confirm booking</Button>
            <Button variant="outline" onClick={onRelease}>Release court</Button>
          </>
        ) : (
          <Button variant="ball" onClick={onRelease}>Pick another time</Button>
        )}
      </div>
    </div>
  );
}
