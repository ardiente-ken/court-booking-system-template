// src/pages/HomePage.jsx: landing + booking flow (Hero, then day, court/time, slip).
// Owns the in-progress choices (day, picks, guest). Used by: App.jsx (view "home")
import { useState } from "react";
import Hero from "../components/landing/Hero";
import DayStrip from "../components/booking/DayStrip";
import Timetable from "../components/booking/Timetable";
import BookingSlip from "../components/booking/BookingSlip";
import { DAYS, iso, longDay } from "../lib/dates";
import { display } from "../config/theme";

export default function HomePage({ settings, isOff, onHold, onFind }) {
  const [di, setDi] = useState(0);
  const [pick, setPick] = useState([]);
  const [guest, setGuest] = useState({ name: "", contact: "" });

  const day = iso(DAYS[di]);

  const hours = Array.from(
    { length: Math.max(0, settings.close - settings.open) },
    (_, i) => settings.open + i,
  );

  const handlePick = (slot) => {
    setPick((current) => {
      const exists = current.some(
        (item) =>
          item.court === slot.court &&
          item.hour === slot.hour,
      );

      if (exists) {
        return current.filter(
          (item) =>
            !(
              item.court === slot.court &&
              item.hour === slot.hour
            ),
        );
      }

      return [...current, slot];
    });
  };

  const scrollToReserve = () =>
    document
      .getElementById("reserve")
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <Hero
        settings={settings}
        onBook={scrollToReserve}
        onFind={onFind}
      />

      <section
        id="reserve"
        className="max-w-6xl mx-auto px-5 py-12 grid lg:grid-cols-3 gap-8 items-start"
      >
        <div className="lg:col-span-2">
          <h2 style={display} className="text-2xl font-black">
            Pick a day
          </h2>

          <DayStrip
            index={di}
            onChange={(i) => {
              setDi(i);
              setPick([]);
            }}
          />

          <h2 style={display} className="text-2xl font-black mt-10">
            Pick a court and time
          </h2>

          <Timetable
            courts={settings.courts}
            hours={hours}
            day={day}
            isOff={isOff}
            pick={pick}
            accent={settings.accent}
            onPick={handlePick}
          />

          <p className="text-xs text-slate-500 mt-3">
            Hatched slots are taken. Scroll sideways for more hours.
          </p>
        </div>

        <BookingSlip
          pick={pick}
          dayText={longDay(DAYS[di], di)}
          guest={guest}
          onGuest={setGuest}
          holdMinutes={settings.hold}
          onHold={() => onHold({ day, picks: pick }, guest)}
        />
      </section>
    </>
  );
}