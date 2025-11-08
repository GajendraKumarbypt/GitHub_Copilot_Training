/**
 * cache.js
 * Simple TTL cache with localStorage and in-memory fallback.
 * API: setCached(key, value, ttlMs), getCached(key)
 */
const inMemory = new Map();

function now() {
  return Date.now();
}

function isLocalStorageAvailable() {
  try {
    const key = '__test_ls__';
    window.localStorage.setItem(key, key);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
}

export function setCached(key, value, ttl = 10 * 60 * 1000) {
  const expires = now() + ttl;
  const wrapped = { v: value, e: expires };
  if (isLocalStorageAvailable()) {
    try {
      window.localStorage.setItem(`wdc:${key}`, JSON.stringify(wrapped));
      return;
    } catch (e) {
      // fall through to memory
    }
  }
  inMemory.set(key, wrapped);
}

export function getCached(key) {
  const maybe = (function readLocal() {
    if (isLocalStorageAvailable()) {
      try {
        const raw = window.localStorage.getItem(`wdc:${key}`);
        if (!raw) return null;
        return JSON.parse(raw);
      } catch (e) {
        return null;
      }
    }
    return null;
  })();

  const wrapped = maybe || inMemory.get(key);
  if (!wrapped) return null;
  if (wrapped.e && now() > wrapped.e) {
    // expired
    if (isLocalStorageAvailable()) {
      try {
        window.localStorage.removeItem(`wdc:${key}`);
      } catch (e) {}
    }
    inMemory.delete(key);
    return null;
  }
  return wrapped.v;
}
