/**
 * dateUtils.js
 * Pure date/time helper utilities.
 */

/**
 * Check whether value is a valid Date object or parsable date string.
 * @param {Date|string|number} v
 * @returns {boolean}
 */
export function isValidDate(v) {
  if (v instanceof Date) return !Number.isNaN(v.getTime());
  const d = new Date(v);
  return !Number.isNaN(d.getTime());
}

/**
 * Return ISO date string (yyyy-mm-dd) for a Date-like input.
 * @param {Date|string|number} value
 * @returns {string}
 */
export function toISODate(value) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) throw new Error('Invalid date');
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Days between two dates (absolute integer).
 * @param {Date|string|number} a
 * @param {Date|string|number} b
 * @returns {number}
 */
export function daysBetween(a, b) {
  const da = new Date(a);
  const db = new Date(b);
  if (Number.isNaN(da.getTime()) || Number.isNaN(db.getTime())) throw new Error('Invalid date');
  const diff = Math.abs(da.getTime() - db.getTime());
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

/**
 * Return a new Date advanced by n days (positive or negative).
 * Pure: does not mutate input.
 * @param {Date|string|number} date
 * @param {number} days
 * @returns {Date}
 */
export function addDays(date, days) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime()) || typeof days !== 'number') throw new Error('Invalid input');
  const copy = new Date(d.getTime());
  copy.setDate(copy.getDate() + Math.trunc(days));
  return copy;
}

export default { isValidDate, toISODate, daysBetween, addDays };
