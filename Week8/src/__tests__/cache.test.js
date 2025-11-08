/**
 * Tests for cache.js to exercise localStorage and fallback logic, and expiry.
 */
import { setCached, getCached } from '../utils/cache';

describe('cache util', () => {
  beforeEach(() => {
    // ensure clean storage
    try {
      Object.keys(localStorage).forEach((k) => localStorage.removeItem(k));
    } catch (e) {}
    jest.restoreAllMocks();
  });

  test('set and get with localStorage', () => {
    setCached('key1', { foo: 'bar' }, 1000);
    const v = getCached('key1');
    expect(v).toEqual({ foo: 'bar' });
  });

  test('expires after ttl', () => {
    const now = Date.now();
    const spy = jest.spyOn(Date, 'now').mockImplementation(() => now);
    setCached('key2', { a: 1 }, 5000);
    // fast forward time
    spy.mockImplementation(() => now + 6000);
    const v = getCached('key2');
    expect(v).toBeNull();
    spy.mockRestore();
  });

  test('falls back to memory when localStorage throws', () => {
    // simulate localStorage throwing on setItem
    const orig = window.localStorage;
    const fake = {
      setItem: () => { throw new Error('quota'); },
      getItem: () => null,
      removeItem: () => {},
    };
    // replace localStorage
    // @ts-ignore
    Object.defineProperty(window, 'localStorage', { value: fake, configurable: true });

    setCached('memkey', { x: 2 }, 1000);
    const v = getCached('memkey');
    expect(v).toEqual({ x: 2 });

    // restore
    Object.defineProperty(window, 'localStorage', { value: orig, configurable: true });
  });
});
