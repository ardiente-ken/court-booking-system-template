// src/components/booking/BookingSlip.jsx: sticky summary + guest details + hold button (step 3).
// Used by: pages/HomePage.jsx
import Button from "../ui/Button";
import Field from "../ui/Field";
import SummaryRow from "../ui/SummaryRow";
import { hr } from "../../lib/dates";
import { display } from "../../config/theme";

export default function BookingSlip({ pick, dayText, guest, onGuest, holdMinutes, onHold }) {
  const ready = pick && guest.name.trim() && guest.contact.trim();
  return (
    <aside className="lg:sticky bg-white rounded-3xl p-6" style={{ top: 24, border: "2px dashed #b9c6d4" }}>
      <h2 style={display} className="text-lg font-black">Your booking slip</h2>
      <div className="mt-2">
        <SummaryRow label="Court" value={pick && pick.court} />
        <SummaryRow label="Day" value={pick && dayText} />
        <SummaryRow label="Time" value={pick && `${hr(pick.hour)} to ${hr(pick.hour + 1)}`} />
      </div>
      <Field label="Name" className="mt-5" value={guest.name} onChange={(e) => onGuest({ ...guest, name: e.target.value })} />
      <Field label="Phone or email" className="mt-3" value={guest.contact} onChange={(e) => onGuest({ ...guest, contact: e.target.value })} />
      <Button className="w-full mt-5" disabled={!ready} onClick={onHold}>Hold this court</Button>
      <p className="text-xs text-slate-500 mt-3">Held for {holdMinutes} minutes while you confirm. No account needed.</p>
    </aside>
  );
}
