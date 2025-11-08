import { describe, it, expect } from 'vitest'
import { toNumber, safeParseJson } from '../src/utils/converters'
import { formatCurrency } from '../src/utils/format'
import { ApiService } from '../src/services/apiService'

describe('edge cases', () => {
  it('toNumber trims whitespace and parses', () => {
    expect(toNumber('  7  ')).toBe(7)
  })

  it('toNumber returns fallback on undefined', () => {
    expect(toNumber(undefined, 9)).toBe(9)
  })

  it('safeParseJson returns fallback on invalid', () => {
    expect(safeParseJson('not json', { a: 1 })).toEqual({ a: 1 })
  })

  it('formatCurrency supports explicit currency code', () => {
    const out = formatCurrency(10, 'EUR')
    expect(out).toContain('10')
  })

  it('ApiService constructor tolerates client without interceptors', async () => {
    const mockClient = { get: () => Promise.resolve({ data: { ok: true } }) }
    const s = new ApiService(undefined, undefined, mockClient as any)
    const data = await s.get('/ok')
    expect(data).toEqual({ ok: true })
  })
})
