// src/components/booking/DayStrip.jsx: scrollable day picker (step 1). Used by: pages/HomePage.jsx
import { DAYS, dayName } from "../../lib/dates";
import { INK, EDGE } from "../../config/theme";

export default function DayStrip({ index, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto mt-4 pb-2">
      {DAYS.map((d, i) => (
        <button key={i} onClick={() => onChange(i)} className="shrink-0 w-16 py-3 rounded-2xl text-center"
          style={i === index ? { background: INK, color: "#fff" } : { background: "#fff", border: `1px solid ${EDGE}` }}>
          <div className="text-xs" style={{ opacity: 0.7 }}>{i === 0 ? "Today" : dayName(d)}</div>
          <div className="text-xl font-bold">{d.getDate()}</div>
        </button>
      ))}
    </div>
  );
}
