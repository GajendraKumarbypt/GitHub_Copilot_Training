import { toSlug, isEmail, capitalize, truncate } from '../utils/stringUtils';

test('slug and email and capitalize', () => {
  expect(toSlug('Hello World!')).toBe('hello-world');
  expect(isEmail('a@b.co')).toBe(true);
  expect(isEmail('not-email')).toBe(false);
  expect(capitalize('john DOE')).toBe('John Doe');
});

test('truncate behavior and invalid limit', () => {
  expect(truncate('abcdef', 3)).toBe('abc...');
  expect(truncate(null)).toBe('');
  expect(() => truncate('s', -1)).toThrow('Invalid limit');
});

test('toSlug handles accents and nulls; capitalize/truncate edge', () => {
  expect(toSlug('Café au lait')).toBe('cafe-au-lait');
  expect(toSlug(null)).toBe('');
  expect(isEmail(123)).toBe(false);
  expect(capitalize('   ').trim()).toBe('');
  expect(truncate('hello', 5)).toBe('hello');
});
