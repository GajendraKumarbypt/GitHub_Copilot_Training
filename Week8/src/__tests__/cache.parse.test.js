import { setCached, getCached } from '../utils/cache';

describe('cache parse and removeItem error handling', () => {
  beforeEach(() => {
    try {
      Object.keys(localStorage).forEach((k) => localStorage.removeItem(k));
    } catch (e) {}
  });

  test('returns null on invalid JSON in localStorage', () => {
    // store invalid JSON under wdc:key
    localStorage.setItem('wdc:bad', 'not-a-json');
    const v = getCached('bad');
    expect(v).toBeNull();
  });

  test('handles removeItem throwing during expiry cleanup', () => {
    const now = Date.now();
    const wrapped = { v: { a: 1 }, e: now - 1000 };
    localStorage.setItem('wdc:toRemove', JSON.stringify(wrapped));

    // make removeItem throw
    const orig = window.localStorage.removeItem;
    window.localStorage.removeItem = () => { throw new Error('boom'); };

    expect(getCached('toRemove')).toBeNull();

    // restore
    window.localStorage.removeItem = orig;
  });
});
