// src/components/ui/Button.jsx: the one pill button. variant = ink | ball | outline | light.
// Used by: Hero, BookingSlip, FindBookingPage, HoldPage, DonePage.
import { INK, BALL, EDGE } from "../../config/theme";

const VARIANTS = {
  ink: { background: INK, color: "#fff" },
  ball: { background: BALL, color: INK },
  outline: { border: "2px solid rgba(255,255,255,.6)" },
  light: { background: "#fff", border: `1px solid ${EDGE}` },
};

export default function Button({ variant = "ink", className = "", style, ...props }) {
  return (
    <button
      className={`rounded-full px-7 py-3 font-semibold disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      style={{ ...VARIANTS[variant], ...style }}
      {...props}
    />
  );
}
