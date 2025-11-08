export function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const n = Number(value.trim())
    return Number.isFinite(n) ? n : fallback
  }
  return fallback
}

export function safeParseJson<T = unknown>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T
  } catch (e) {
    return fallback
  }
}
