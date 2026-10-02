// src/components/booking/Timetable.jsx: courts x hours grid (step 2). Hatched = taken.
// Used by: pages/HomePage.jsx. `isOff` comes from hooks/useBookings.js.
import { hr } from "../../lib/dates";
import { EDGE, HATCH } from "../../config/theme";

export default function Timetable({
  courts,
  hours,
  day,
  isOff,
  pick = [],
  accent,
  onPick,
}) {
  const isSelected = (court, hour) =>
    pick.some((item) => item.court === court && item.hour === hour);

  return (
    <div
      className="mt-4 overflow-x-auto rounded-2xl bg-white"
      style={{ border: `1px solid ${EDGE}` }}
    >
      <table className="border-collapse min-w-max">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-white px-4 py-4" />

            {hours.map((h) => (
              <th
                key={h}
                className="w-16 min-w-16 px-1 py-4 text-xs font-semibold text-slate-500"
              >
                {hr(h)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {courts.map((court) => (
            <tr key={court}>
              <th className="sticky left-0 z-10 bg-white text-left text-sm font-bold px-4 py-3 whitespace-nowrap">
                {court}
              </th>

              {hours.map((h) => {
                const off = isOff(day, court, h);
                const on = isSelected(court, h);

                return (
                  <td
                    key={h}
                    className="w-16 min-w-16 p-1 py-3"
                  >
                    <button
                      type="button"
                      disabled={off}
                      aria-label={`${court} at ${hr(h)}, ${
                        off ? "taken" : on ? "selected" : "open"
                      }`}
                      onClick={() => onPick({ court, hour: h })}
                      className="w-14 h-11 min-w-14 min-h-11 rounded-lg text-xs font-semibold flex items-center justify-center"
                      style={
                        on
                          ? {
                              background: accent,
                              color: "#fff",
                              border: `1.5px solid ${accent}`,
                            }
                          : off
                            ? {
                                background: HATCH,
                                border: `1.5px solid ${HATCH}`,
                              }
                            : {
                                background: "#fff",
                                color: accent,
                                border: `1.5px solid ${accent}`,
                              }
                      }
                    >
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