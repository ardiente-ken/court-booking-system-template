// src/components/booking/Timetable.jsx: courts x hours grid (step 2). Hatched = taken.
// Used by: pages/HomePage.jsx. `isOff` comes from hooks/useBookings.js.
import { hr } from "../../lib/dates";
import { EDGE, HATCH } from "../../config/theme";

export default function Timetable({ courts, hours, day, isOff, pick, accent, onPick }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-2xl bg-white" style={{ border: `1px solid ${EDGE}` }}>
      <table className="border-collapse">
        <thead>
          <tr><th />{hours.map((h) => <th key={h} className="px-1 py-3 text-xs font-semibold text-slate-500">{hr(h)}</th>)}</tr>
        </thead>
        <tbody>
          {courts.map((court) => (
            <tr key={court}>
              <th className="sticky left-0 bg-white text-left text-sm font-bold px-4 whitespace-nowrap">{court}</th>
              {hours.map((h) => {
                const off = isOff(day, court, h);
                const on = pick && pick.court === court && pick.hour === h;
                return (
                  <td key={h} className="p-1">
                    <button disabled={off} aria-label={`${court} at ${hr(h)}, ${off ? "taken" : "open"}`} onClick={() => onPick({ court, hour: h })}
                      className="w-14 h-11 rounded-lg text-xs font-semibold disabled:cursor-not-allowed"
                      style={on ? { background: accent, color: "#fff" } : off ? { background: HATCH } : { background: "#fff", color: accent, border: `1.5px solid ${accent}` }}>
                      {on ? "Yours" : off ? "" : "Open"}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
