import { describe, it, expect } from 'vitest'
import { isEmail, isNonEmptyString } from '../../src/utils/validation'

describe('validation utils', () => {
  it('validates emails', () => {
    expect(isEmail('test@example.com')).toBe(true)
    expect(isEmail('bad-email')).toBe(false)
  })

  it('checks non-empty strings', () => {
    expect(isNonEmptyString('hello')).toBe(true)
    expect(isNonEmptyString('   ')).toBe(false)
    expect(isNonEmptyString(null as any)).toBe(false)
  })
})
