import { isValidDate, toISODate, daysBetween, addDays } from '../utils/dateUtils';

test('isValidDate true for Date and ISO string', () => {
  expect(isValidDate(new Date())).toBe(true);
  expect(isValidDate('2020-01-01')).toBe(true);
});

test('toISODate formats and throws on invalid', () => {
  expect(toISODate('2020-02-02')).toBe('2020-02-02');
  expect(() => toISODate('not-a-date')).toThrow('Invalid date');
});

test('daysBetween and addDays basic', () => {
  const a = '2020-01-01';
  const b = '2020-01-06';
  expect(daysBetween(a, b)).toBe(5);
  const d = addDays(a, 10);
  expect(d instanceof Date).toBe(true);
  expect(d.getUTCDate()).toBe(11);
});

test('invalid dates and addDays invalid input', () => {
  expect(isValidDate('not-a-date')).toBe(false);
  expect(() => addDays('not-a-date', 2)).toThrow('Invalid input');
});
