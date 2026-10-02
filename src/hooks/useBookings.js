// src/hooks/useBookings.js: ALL booking data and actions live here.
// This is the only file to change when you add a backend: each BACKEND line becomes an API call.
// Used by: App.jsx
import { useState } from "react";
import useNow from "./useNow";
import SEED from "../lib/seedBookings";
import { iso } from "../lib/dates";

export default function useBookings(settings) {
  const now = useNow();
  const [bookings, setBookings] = useState(SEED);
  const [heldId, setHeldId] = useState(null);

  // A held slot only counts while its timer is live, so expired holds free themselves.
  const isTaken = (b) => b.status === "confirmed" || b.expiresAt > now;
  const isPast = (day, hour) => day === iso(new Date(now)) && hour <= new Date(now).getHours();
  const isOff = (day, court, hour) =>
    isPast(day, hour) || bookings.some((b) => b.day === day && b.court === court && b.hour === hour && isTaken(b));

  const held = bookings.find((b) => b.id === heldId) || null;
  const secondsLeft = held?.expiresAt ? Math.max(0, Math.round((held.expiresAt - now) / 1000)) : 0;

  // BACKEND: hold_slot
  const holdSlot = ({ day, court, hour }, guest) => {
    if (isOff(day, court, hour)) return false;
    const id = Date.now();
    setBookings((p) => [...p, { id, day, court, hour, ...guest, status: "held", expiresAt: Date.now() + settings.hold * 60000 }]);
    setHeldId(id);
    return true;
  };
  // BACKEND: confirm_slot
  const confirmHeld = () => setBookings((p) => p.map((b) => (b.id === heldId ? { ...b, status: "confirmed", expiresAt: null } : b)));
  // BACKEND: cancel_hold
  const releaseHeld = () => { setBookings((p) => p.filter((b) => b.id !== heldId)); setHeldId(null); };
  // BACKEND: delete booking (staff or guest)
  const cancel = (id) => setBookings((p) => p.filter((b) => b.id !== id));
  const clearHeld = () => setHeldId(null);

  return { bookings, active: bookings.filter(isTaken), held, secondsLeft, isOff, holdSlot, confirmHeld, releaseHeld, clearHeld, cancel };
}
