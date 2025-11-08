/**
 * arrayUtils.js
 * Array helpers: flatten, chunk, unique, merge (concat-unique)
 */

/** Flatten one level deep array */
export function flatten(arr) {
  if (!Array.isArray(arr)) throw new Error('Invalid input');
  return arr.reduce((acc, v) => acc.concat(Array.isArray(v) ? v : [v]), []);
}

/** Chunk array into pieces of size n */
export function chunk(arr, size) {
  if (!Array.isArray(arr) || typeof size !== 'number' || size <= 0) throw new Error('Invalid input');
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/** Return unique items preserving order */
export function unique(arr) {
  if (!Array.isArray(arr)) throw new Error('Invalid input');
  const seen = new Set();
  const out = [];
  for (const v of arr) {
    if (!seen.has(v)) {
      seen.add(v);
      out.push(v);
    }
  }
  return out;
}

/** Merge arrays and dedupe by strict equality */
export function merge(...arrays) {
  const out = [];
  const seen = new Set();
  for (const arr of arrays) {
    if (!Array.isArray(arr)) continue;
    for (const v of arr) {
      if (!seen.has(v)) {
        seen.add(v);
        out.push(v);
      }
    }
  }
  return out;
}

export default { flatten, chunk, unique, merge };
