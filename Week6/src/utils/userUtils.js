/**
 * userUtils.js
 * Small helpers for user display name, initials and status.
 */

/**
 * Normalize a name into "First Last" capitalization.
 * @param {string} name
 */
export function formatName(name) {
  if (name == null) return '';
  return String(name)
    .trim()
    .split(/\s+/)
    .map((p) => (p ? p[0].toUpperCase() + p.slice(1).toLowerCase() : ''))
    .join(' ');
}

/**
 * Return initials (two letters) for a name.
 * @param {string} name
 */
export function initials(name) {
  if (!name) return '';
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Determine online status from lastActive timestamp (ms since epoch).
 * Returns 'online' if within last 5 minutes, otherwise 'offline'.
 * @param {number|Date|string} lastActive
 */
export function statusFromLastActive(lastActive) {
  if (!lastActive) return 'offline';
  const t = new Date(lastActive).getTime();
  if (Number.isNaN(t)) return 'offline';
  const now = Date.now();
  return now - t <= 5 * 60 * 1000 ? 'online' : 'offline';
}

export default { formatName, initials, statusFromLastActive };
