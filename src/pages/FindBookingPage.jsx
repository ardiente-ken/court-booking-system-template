// src/pages/FindBookingPage.jsx: guests look up and cancel a confirmed booking. Used by: App.jsx (view "find")
import { useState } from "react";
import Button from "../components/ui/Button";
import Field from "../components/ui/Field";
import { hr } from "../lib/dates";
import { EDGE, display } from "../config/theme";

export default function FindBookingPage({ bookings, onCancel, onBook }) {
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const mine = bookings.filter((b) => b.status === "confirmed" && term && [b.contact, b.name].some((x) => x.toLowerCase() === term));
  return (
    <div className="max-w-md">
      <h2 style={display} className="text-2xl font-black">Find your booking</h2>
      <Field label="Name, phone or email you booked with" className="mt-5" value={q} onChange={(e) => setQ(e.target.value)} />
      <ul className="mt-5">
        {mine.map((b) => (
          <li key={b.id} className="py-3 flex justify-between items-center gap-3 text-sm" style={{ borderBottom: `1px solid ${EDGE}` }}>
            <span><b>{b.court}</b>, {b.day}, {hr(b.hour)}</span>
            <Button variant="light" className="px-4 py-2" onClick={() => onCancel(b.id)}>Cancel</Button>
          </li>
        ))}
      </ul>
      {term && mine.length === 0 && <p className="mt-4 text-slate-500">No confirmed bookings found for that.</p>}
      <Button className="mt-6" onClick={onBook}>Book a court</Button>
    </div>
  );
}
