// src/config/defaultSettings.js: starting values for everything the Staff page can edit.
// Used by: App.jsx (initial state). Later: load these from your backend instead.
export default {
  name: "Dinkhouse",
  h1: "Your court",
  h2: "is waiting.",
  hero: "Pick a time, hold it for 10 minutes, confirm. No account needed.",
  accent: "#2a56c6",
  courts: ["Court 1", "Court 2", "Court 3"],
  open: 6,
  close: 22,
  price: "PHP 300 / hour",
  hold: 10,
};
