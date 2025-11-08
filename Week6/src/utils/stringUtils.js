/**
 * stringUtils.js
 * String helpers: slug, email validation, capitalize, truncate.
 */

/**
 * Normalize a string into a URL-friendly slug.
 * @param {string} s
 * @returns {string}
 */
export function toSlug(s) {
  if (s == null) return '';
  return String(s)
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Simple email validation using a conservative regex.
 * @param {string} email
 * @returns {boolean}
 */
export function isEmail(email) {
  if (typeof email !== 'string') return false;
  // very permissive but avoids exotic unicode
  const re = /^[\w.+-]+@[\w-]+(\.[\w-]+)+$/;
  return re.test(email.trim());
}

/**
 * Capitalize the first letter of each word (simple approach).
 * @param {string} s
 * @returns {string}
 */
export function capitalize(s) {
  if (s == null) return '';
  return String(s)
    .split(/\s+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : ''))
    .join(' ');
}

/**
 * Truncate string with ellipsis if longer than limit.
 * @param {string} s
 * @param {number} limit
 * @returns {string}
 */
export function truncate(s, limit = 100) {
  if (s == null) return '';
  const str = String(s);
  if (typeof limit !== 'number' || limit < 0) throw new Error('Invalid limit');
  return str.length <= limit ? str : str.slice(0, limit) + '...';
}

export default { toSlug, isEmail, capitalize, truncate };
