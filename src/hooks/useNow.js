// src/hooks/useNow.js: current time in ms, refreshed every second (drives countdowns and expiry).
// Used by: hooks/useBookings.js
import { useEffect, useState } from "react";

export default function useNow() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}
