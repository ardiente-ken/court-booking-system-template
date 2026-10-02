// src/components/ui/SummaryRow.jsx: "label ... value" line, shows a placeholder until filled.
// Used by: booking/BookingSlip.jsx
import { EDGE } from "../../config/theme";

export default function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between py-3 text-sm" style={{ borderBottom: `1px solid ${EDGE}` }}>
      <span className="text-slate-500">{label}</span>
      <span className={value ? "font-semibold" : "text-slate-400"}>{value || "Not picked yet"}</span>
    </div>
  );
}
