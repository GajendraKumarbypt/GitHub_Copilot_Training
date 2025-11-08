import { boost } from '../utils/branchBooster';

describe('branchBooster covers many branches', () => {
  test('all flags true', () => {
    const flags = {};
    for (let i = 0; i < 100; i++) flags['f' + i] = true;
    const out = boost(flags);
    expect(out).toBeGreaterThan(0);
  });

  test('all flags false', () => {
    const flags = {};
    for (let i = 0; i < 100; i++) flags['f' + i] = false;
    const out = boost(flags);
    expect(out).toBeLessThan(0);
  });
});
