import { formatName, initials, statusFromLastActive } from '../utils/userUtils';

test('formatName and initials', () => {
  expect(formatName('john DOE')).toBe('John Doe');
  expect(initials('John Smith')).toBe('JS');
  expect(initials('single')).toBe('S');
});

test('statusFromLastActive online/offline', () => {
  const now = Date.now();
  expect(statusFromLastActive(now)).toBe('online');
  expect(statusFromLastActive(now - 10 * 60 * 1000)).toBe('offline');
  expect(statusFromLastActive('invalid')).toBe('offline');
});

test('formatName and initials edge cases', () => {
  expect(formatName(null)).toBe('');
  expect(initials('   ')).toBe('');
  // exact boundary: 5 minutes ago should still be online (<= 5 minutes)
  const fiveMinAgo = Date.now() - 5 * 60 * 1000;
  expect(statusFromLastActive(fiveMinAgo)).toBe('online');
});

test('formatName trims and initials handles undefined; falsy lastActive', () => {
  expect(formatName('  alice   bob ')).toBe('Alice Bob');
  expect(initials(undefined)).toBe('');
  expect(statusFromLastActive(null)).toBe('offline');
});
