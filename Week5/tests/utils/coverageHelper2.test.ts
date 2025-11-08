import { describe, it, expect } from 'vitest'
import { branchMany } from '../../src/utils/coverageHelper2'

describe('coverageHelper2', () => {
  it('covers multiple branches', () => {
    expect(branchMany(-1, false)).toBe('neg')
    expect(branchMany(0, true)).toBe('zero-true')
    expect(branchMany(0, false)).toBe('zero-false')
    expect(branchMany(1, true)).toBe('one-true')
    expect(branchMany(2, false)).toBe('many')
  })
})
