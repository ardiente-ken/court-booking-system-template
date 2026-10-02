// src/lib/seedBookings.js: fake bookings so the demo has taken slots. Delete when you add a backend.
// Used by: hooks/useBookings.js
import { DAYS, iso } from "./dates";

export default [
  { id: 1, day: iso(DAYS[0]), court: "Court 1", hour: 18, name: "Mika R.", contact: "0917 000 0000", status: "confirmed" },
  { id: 2, day: iso(DAYS[0]), court: "Court 2", hour: 19, name: "Jon D.", contact: "jon@example.com", status: "confirmed" },
  { id: 3, day: iso(DAYS[1]), court: "Court 1", hour: 17, name: "Team Dink", contact: "0917 111 1111", status: "confirmed" },
];
