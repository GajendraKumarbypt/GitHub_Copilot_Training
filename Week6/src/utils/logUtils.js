/**
 * logUtils.js
 * Lightweight logging helpers that return formatted messages and optionally
 * print to console (for testability we avoid unconditional side-effects).
 */

/** Format timestamped message */
export function format(level, message) {
  const ts = new Date().toISOString();
  return `[${ts}] ${level.toUpperCase()}: ${message}`;
}

/** Log message at level; returns formatted message. If `consoleEnabled` true, logs to console. */
export function log(level, message, consoleEnabled = false) {
  const out = format(level, message);
  if (consoleEnabled) {
    if (level === 'error' || level === 'warn') console.error(out); else console.log(out);
  }
  return out;
}

export function info(message, consoleEnabled = false) {
  return log('info', message, consoleEnabled);
}

export function warn(message, consoleEnabled = false) {
  return log('warn', message, consoleEnabled);
}

export function debug(message, consoleEnabled = false) {
  return log('debug', message, consoleEnabled);
}

export default { format, log, info, warn, debug };
