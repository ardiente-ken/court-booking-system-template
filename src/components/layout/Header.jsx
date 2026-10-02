// src/components/layout/Header.jsx: top bar with logo and nav. Used by: App.jsx
import Ball from "../ui/Ball";
import { INK, display } from "../../config/theme";

export default function Header({ name, onHome, onBook, onFind, onStaff }) {
  return (
    <header className="max-w-6xl mx-auto px-5 h-20 flex items-center justify-between">
      <button className="flex items-center gap-2" onClick={onHome}>
        <Ball size={30} /><span style={display} className="font-black">{name}</span>
      </button>
      <nav className="flex items-center gap-4 text-sm font-semibold">
        <button onClick={onFind}>My booking</button>
        <button onClick={onStaff}>Staff</button>
        <button className="rounded-full px-5 py-2 text-white" style={{ background: INK }} onClick={onBook}>Book</button>
      </nav>
    </header>
  );
}
