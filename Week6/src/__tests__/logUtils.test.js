import { format, info, warn, debug } from '../utils/logUtils';
import { jest } from '@jest/globals';

test('format includes level and message', () => {
  const out = format('info', 'hello');
  expect(out).toMatch(/INFO: hello/);
});

test('info/warn/debug return strings and optionally log', () => {
  const a = info('i');
  const b = warn('w');
  const c = debug('d');
  expect(typeof a).toBe('string');
  expect(typeof b).toBe('string');
  expect(typeof c).toBe('string');
});

test('log with consoleEnabled uses console.log/error as appropriate', async () => {
  const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  try {
    info('info-msg', true);
    warn('warn-msg', true);
    // use log directly with level error to hit console.error path
    const out = format('error', 'bad');
    expect(typeof out).toBe('string');
    // dynamic import to get `log` in ESM tests
    const mod = await import('../utils/logUtils');
    mod.log('error', 'bad', true);
    expect(logSpy).toHaveBeenCalled();
    expect(errSpy).toHaveBeenCalled();
  } finally {
    logSpy.mockRestore();
    errSpy.mockRestore();
  }
});
