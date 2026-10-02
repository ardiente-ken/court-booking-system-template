# Court booking (UI template)

React + Vite + Tailwind. UI only: data lives in memory, no backend yet.

    npm install
    npm run dev

## Where things live

    src/
      main.jsx                    entry point
      App.jsx                     settings + current view; wires hooks to pages
      config/
        defaultSettings.js        every value Staff can edit (name, headline, courts, hours...)
        theme.js                  fixed design tokens (colors, display font)
      lib/
        dates.js                  formatters + the 14 bookable days
        seedBookings.js           fake bookings for the demo
      hooks/
        useBookings.js            ALL booking data/actions (swap for backend here)
        useNow.js                 1-second clock for countdowns/expiry
      pages/                      one file per screen
        HomePage.jsx              landing + booking flow
        FindBookingPage.jsx       guest lookup/cancel
        HoldPage.jsx              10-minute countdown + confirm
        DonePage.jsx              confirmation
        AdminPage.jsx             Staff settings + bookings list
      components/
        layout/    Header, Footer
        landing/   Hero
        booking/   DayStrip, Timetable, BookingSlip
        ui/        Button, Field, SummaryRow, Ball

## Booking flow, file by file

    Hero (Book a court) -> HomePage: DayStrip -> Timetable -> BookingSlip
      -> useBookings.holdSlot -> HoldPage (countdown)
      -> useBookings.confirmHeld -> DonePage
      or releaseHeld / timer expiry -> back to HomePage

Every file starts with a comment saying what it is and who uses it.

## Adding the backend later

Only `src/hooks/useBookings.js` talks to data. Lines marked `// BACKEND:` map
one to one to the SQL functions from schema.sql (hold_slot, confirm_slot,
cancel_hold). Settings: load/save `defaultSettings` shape in App.jsx.
