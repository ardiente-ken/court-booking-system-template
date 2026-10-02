// src/App.jsx: top-level wiring. Holds settings + current view, connects hooks to pages.
// Views: home | find | hold | done | admin
import { useState } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import FindBookingPage from "./pages/FindBookingPage";
import HoldPage from "./pages/HoldPage";
import DonePage from "./pages/DonePage";
import AdminPage from "./pages/AdminPage";
import useBookings from "./hooks/useBookings";
import defaultSettings from "./config/defaultSettings";
import { INK, PAPER } from "./config/theme";

export default function App() {
  const [settings, setSettings] = useState(defaultSettings);
  const [view, setView] = useState("home");
  const store = useBookings(settings);

  const goReserve = () => {
    setView("home");
    setTimeout(() => document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" }), 60);
  };
  const hold = (slot, guest) => { if (store.holdSlot(slot, guest)) setView("hold"); };
  const confirm = () => { store.confirmHeld(); setView("done"); };
  const release = () => { store.releaseHeld(); goReserve(); };
  const finish = () => { store.clearHeld(); setView("home"); window.scrollTo(0, 0); };

  return (
    <div className="min-h-screen" style={{ background: PAPER, color: INK, "--accent": settings.accent }}>
      <Header name={settings.name} onHome={() => { setView("home"); window.scrollTo(0, 0); }}
        onBook={goReserve} onFind={() => setView("find")} onStaff={() => setView("admin")} />

      {view === "home" && <HomePage settings={settings} isOff={store.isOff} onHold={hold} onFind={() => setView("find")} />}
      {view !== "home" && (
        <main className="max-w-6xl mx-auto px-5 py-10">
          {view === "find" && <FindBookingPage bookings={store.bookings} onCancel={store.cancel} onBook={goReserve} />}
          {view === "hold" && <HoldPage settings={settings} held={store.held} secondsLeft={store.secondsLeft} onConfirm={confirm} onRelease={release} />}
          {view === "done" && <DonePage settings={settings} held={store.held} onBack={finish} />}
          {view === "admin" && <AdminPage S={settings} setS={setSettings} bookings={store.active} cancel={store.cancel} done={() => setView("home")} />}
        </main>
      )}

      <Footer name={settings.name}/>
    </div>
  );
}
