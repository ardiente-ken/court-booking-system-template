// src/lib/dates.js: date and time formatting helpers plus the bookable day list.
// Used by: hooks/useBookings, booking/*, pages/*.
export const pad = (n) => String(n).padStart(2, "0");
export const hr = (h) => `${pad(h)}:00`;
export const mmss = (s) => `${Math.floor(s / 60)}:${pad(s % 60)}`;
export const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const dayName = (d) => d.toLocaleDateString("en-GB", { weekday: "short" });
export const longDay = (d, i) =>
  (i === 0 ? "Today, " : "") + d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

export const DAYS = Array.from({ length: 14 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return d;
});
