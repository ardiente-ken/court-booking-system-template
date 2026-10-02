// src/components/booking/BookingSlip.jsx: sticky summary + guest details + hold button (step 3).
// Used by: pages/HomePage.jsx
import Button from "../ui/Button";
import Field from "../ui/Field";
import SummaryRow from "../ui/SummaryRow";
import { hr } from "../../lib/dates";
import { display } from "../../config/theme";

export default function BookingSlip({
  pick = [],
  dayText,
  guest,
  onGuest,
  holdMinutes,
  onHold,
}) {
  const ready =
    pick.length > 0 &&
    guest.name.trim() &&
    guest.contact.trim();

  // Group selected slots into continuous time ranges per court.
  const groupedBookings = [];

  const sortedPick = [...pick].sort((a, b) => {
    if (a.court !== b.court) {
      return a.court.localeCompare(b.court);
    }

    return a.hour - b.hour;
  });

  sortedPick.forEach((slot) => {
    const last = groupedBookings[groupedBookings.length - 1];

    if (
      last &&
      last.court === slot.court &&
      slot.hour === last.endHour
    ) {
      // Adjacent slot on the same court.
      last.endHour = slot.hour + 1;
    } else {
      // New booking range.
      groupedBookings.push({
        court: slot.court,
        startHour: slot.hour,
        endHour: slot.hour + 1,
      });
    }
  });

  return (
    <aside
      className="lg:sticky bg-white rounded-3xl p-6"
      style={{
        top: 24,
        border: "2px dashed #b9c6d4",
      }}
    >
      <h2 style={display} className="text-lg font-black">
        Your booking slip
      </h2>

      <div className="mt-3">
        <SummaryRow
          label="Day"
          value={pick.length > 0 ? dayText : "No day selected"}
        />

        <SummaryRow
          label="Bookings"
          value={
            groupedBookings.length > 0
              ? `${groupedBookings.length} ${
                  groupedBookings.length === 1 ? "booking" : "bookings"
                }`
              : "No bookings selected"
          }
        />

        {groupedBookings.length > 0 && (
          <div className="mt-3 space-y-2">
            {groupedBookings.map((booking, index) => (
              <div
                key={`${booking.court}-${booking.startHour}-${index}`}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-sm"
                style={{ background: "#f8fafc" }}
              >
                <span className="font-semibold text-slate-700">
                  {booking.court}
                </span>

                <span className="text-slate-500">
                  {hr(booking.startHour)} – {hr(booking.endHour)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <Field
        label="Name"
        className="mt-5"
        value={guest.name}
        onChange={(e) =>
          onGuest({
            ...guest,
            name: e.target.value,
          })
        }
      />

      <Field
        label="Phone or email"
        className="mt-3"
        value={guest.contact}
        onChange={(e) =>
          onGuest({
            ...guest,
            contact: e.target.value,
          })
        }
      />

      <Button
        className="w-full mt-5"
        disabled={!ready}
        onClick={onHold}
      >
        {groupedBookings.length > 1
          ? "Hold selected courts"
          : "Hold this court"}
      </Button>

      <p className="text-xs text-slate-500 mt-3">
        Held for {holdMinutes} minutes while you confirm. No account needed.
      </p>
    </aside>
  );
}