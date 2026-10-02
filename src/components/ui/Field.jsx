// src/components/ui/Field.jsx: labelled text input. Used by: BookingSlip, FindBookingPage.
import { EDGE } from "../../config/theme";

export default function Field({ label, className = "", ...props }) {
  return (
    <label className={`block text-sm font-semibold ${className}`}>
      {label}
      <input className="w-full mt-1 p-3 rounded-xl bg-white font-normal" style={{ border: `1px solid ${EDGE}` }} {...props} />
    </label>
  );
}
