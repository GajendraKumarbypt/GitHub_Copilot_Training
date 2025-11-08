import { setCached, getCached } from '../utils/cache';

describe('cache fallback when localStorage missing', () => {
  let origLS;
  beforeEach(() => {
    origLS = Object.getOwnPropertyDescriptor(window, 'localStorage');
    try {
      Object.keys(localStorage).forEach((k) => localStorage.removeItem(k));
    } catch (e) {}
  });

  afterEach(() => {
    if (origLS) Object.defineProperty(window, 'localStorage', origLS);
  });

  test('uses in-memory when localStorage is undefined', () => {
    // remove localStorage
    Object.defineProperty(window, 'localStorage', { value: undefined, configurable: true });

    setCached('nokey', { hello: 'world' }, 1000);
    const v = getCached('nokey');
    expect(v).toEqual({ hello: 'world' });
  });
});
