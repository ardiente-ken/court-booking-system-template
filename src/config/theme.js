// src/config/theme.js: fixed design tokens. Change the look here.
// Used by: every component. (The accent color is NOT here, it is a Staff setting.)
export const INK = "#10243e";
export const PAPER = "#f3f6f8";
export const BALL = "#f4e04d";
export const EDGE = "#d5dde6";
export const HATCH = "repeating-linear-gradient(45deg,#e3e9ef,#e3e9ef 4px,#f3f6f8 4px,#f3f6f8 8px)";
export const display = { fontFamily: "'Unbounded', system-ui, sans-serif" };
export const kitchen = (accent) => `color-mix(in srgb, ${accent} 55%, #17a58a)`;
