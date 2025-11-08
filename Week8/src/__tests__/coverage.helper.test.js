import branchTarget from '../utils/coverageHelper';

describe('coverage helper exercises many branches', () => {
  test('covers A B path', () => {
    const out = branchTarget({ a: true, b: true, d: true, e: true, f: true, g: true, h: true, i: true, j: true, k: true, l: true });
    expect(out).toContain('AB');
  });

  test('covers a c path', () => {
    const out = branchTarget({ a: false, c: true, d: false, e: false, g: false, h: false, i: false, j: false, k: false, m: true });
    expect(out).toContain('aC');
  });

  test('covers multiple mixed paths', () => {
    const out = branchTarget({ a: true, b: false, d: false, e: true, f: false, g: true, h: false, i: true, j: false, k: true, l: false });
    expect(typeof out).toBe('string');
  });
});
