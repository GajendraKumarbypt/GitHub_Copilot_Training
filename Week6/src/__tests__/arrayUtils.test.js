import { flatten, chunk, unique, merge } from '../utils/arrayUtils';

test('flatten and chunk and unique', () => {
  expect(flatten([1, [2, 3], 4])).toEqual([1, 2, 3, 4]);
  expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  expect(unique([1, 2, 1, 3])).toEqual([1, 2, 3]);
});

test('merge arrays and ignore non-array', () => {
  expect(merge([1, 2], [2, 3], null)).toEqual([1, 2, 3]);
});

test('invalid inputs throw for array utils', () => {
  expect(() => flatten(null)).toThrow('Invalid input');
  expect(() => chunk([1, 2, 3], 0)).toThrow('Invalid input');
  expect(() => unique(undefined)).toThrow('Invalid input');
});
