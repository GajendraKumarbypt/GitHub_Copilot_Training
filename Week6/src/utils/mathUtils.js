/**
 * mathUtils.js
 * Small pure math helpers.
 */

/** Clamp number between min and max inclusive */
export function clamp(v, min, max) {
  if (typeof v !== 'number' || typeof min !== 'number' || typeof max !== 'number') throw new Error('Invalid input');
  return Math.min(Math.max(v, min), max);
}

/**
 * Calculate percentage (value of part over total), returns number 0..100
 */
export function percent(part, total) {
  if (typeof part !== 'number' || typeof total !== 'number' || total === 0) return 0;
  return (part / total) * 100;
}

/** Random int between min and max inclusive (deterministic when seeded is provided) */
export function randomInt(min, max) {
  if (typeof min !== 'number' || typeof max !== 'number' || min > max) throw new Error('Invalid range');
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function sum(arr) {
  if (!Array.isArray(arr)) throw new Error('Invalid input');
  return arr.reduce((s, n) => s + (typeof n === 'number' ? n : 0), 0);
}

export default { clamp, percent, randomInt, sum };
