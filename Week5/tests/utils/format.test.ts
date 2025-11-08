import { describe, it, expect } from 'vitest'
import { formatDate, formatCurrency } from '../../src/utils/format'

describe('format utilities', () => {
  it('formats a valid date', () => {
    const d = new Date('2020-01-01T00:00:00Z')
    const out = formatDate(d)
    expect(out).toBeTruthy()
  })

  it('returns empty string for invalid date', () => {
    // @ts-expect-error force invalid
    expect(formatDate(new Date('invalid'))).toBe('')
  })

  it('formats currency', () => {
    expect(formatCurrency(10)).toContain('10')
  })

  it('returns empty for NaN currency', () => {
    // @ts-expect-error
    expect(formatCurrency(Number.NaN)).toBe('')
  })
})
