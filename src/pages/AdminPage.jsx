// src/pages/AdminPage.jsx: Staff panel. Edits site settings live and lists/cancels bookings.
// No sign-in yet (add auth with the backend). Used by: App.jsx (view "admin")
import { hr } from "../lib/dates";

export default function AdminPage({ S, setS, bookings, cancel, done }) {
  const set = (k, v) => setS({ ...S, [k]: v });
  const field = "w-full mt-1 p-3 rounded-xl border border-stone-300 bg-white font-normal";
  return (
    <div className="pt-6 grid md:grid-cols-2 gap-10">
      <div>
        <h2 className="text-3xl font-black tracking-tight">Site settings</h2>
        <p className="text-sm text-stone-500 mt-1">Changes show on the site right away. Sign-in comes with the backend.</p>
        <div className="space-y-4 mt-5 text-sm font-semibold">
          <label className="block">Business name<input className={field} value={S.name} onChange={(e) => set("name", e.target.value)} /></label>
          <label className="block">Headline, line 1<input className={field} value={S.h1} onChange={(e) => set("h1", e.target.value)} /></label>
          <label className="block">Headline, line 2<input className={field} value={S.h2} onChange={(e) => set("h2", e.target.value)} /></label>
          <label className="block">Subline<textarea rows={2} className={field} value={S.hero} onChange={(e) => set("hero", e.target.value)} /></label>
          <label className="block">Price text<input className={field} value={S.price} onChange={(e) => set("price", e.target.value)} /></label>
          <label className="block">Courts, comma separated<input className={field} value={S.courts.join(", ")} onChange={(e) => set("courts", e.target.value.split(",").map((x) => x.trim()).filter(Boolean))} /></label>
          <div className="grid grid-cols-3 gap-3">
            <label>Opens<input type="number" min="0" max="23" className={field} value={S.open} onChange={(e) => set("open", +e.target.value)} /></label>
            <label>Closes<input type="number" min="1" max="24" className={field} value={S.close} onChange={(e) => set("close", +e.target.value)} /></label>
            <label>Hold (min)<input type="number" min="1" max="60" className={field} value={S.hold} onChange={(e) => set("hold", +e.target.value)} /></label>
          </div>
          <label className="block">Accent color<input type="color" className="block mt-1 h-11 w-20 rounded-lg border border-stone-300" value={S.accent} onChange={(e) => set("accent", e.target.value)} /></label>
        </div>
        <button className="rounded-full px-7 py-3 font-semibold text-white mt-6" style={{ background: S.accent }} onClick={done}>Back to site</button>
      </div>
      <div>
        <h2 className="text-3xl font-black tracking-tight">Bookings</h2>
        {bookings.length === 0 && <p className="mt-4 text-stone-500">No bookings yet. They appear here as guests hold or confirm courts.</p>}
        <ul className="mt-4 divide-y divide-stone-200">
          {bookings.map((b) => (
            <li key={b.id} className="py-3 flex items-center justify-between gap-3 text-sm">
              <div>
                <div className="font-semibold">{b.court}, {b.day}, {hr(b.hour)}</div>
                <div className="text-stone-500">{b.name}, {b.contact}, {b.status === "held" ? "holding" : "confirmed"}</div>
              </div>
              <button className="rounded-full px-4 py-2 border border-stone-300 bg-white font-semibold" onClick={() => cancel(b.id)}>Cancel</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
