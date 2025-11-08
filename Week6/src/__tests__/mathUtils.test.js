import { clamp, percent, randomInt, sum } from '../utils/mathUtils';

test('clamp and percent and sum', () => {
  expect(clamp(5, 0, 10)).toBe(5);
  expect(clamp(-5, 0, 10)).toBe(0);
  expect(percent(1, 4)).toBe(25);
  expect(sum([1, 2, 3])).toBe(6);
});

test('randomInt invalid and valid', () => {
  expect(() => randomInt(5, 2)).toThrow('Invalid range');
  const r = randomInt(1, 3);
  expect(r).toBeGreaterThanOrEqual(1);
  expect(r).toBeLessThanOrEqual(3);
});

test('clamp and sum invalid inputs and percent zero total', () => {
  expect(() => clamp('a', 0, 1)).toThrow('Invalid input');
  expect(percent(1, 0)).toBe(0);
  expect(() => sum(null)).toThrow('Invalid input');
  expect(sum([1, 'x', 2])).toBe(3);
});
