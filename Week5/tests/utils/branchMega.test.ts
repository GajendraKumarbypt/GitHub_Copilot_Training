import { describe, it, expect } from 'vitest'
import { mega } from '../../src/utils/branchMega'

describe('branchMega', () => {
  it('covers many branches', () => {
    for (let i = 0; i <= 9; i++) {
      expect(mega(i)).toBe(`n${i}`)
    }
    expect(mega(10)).toBe('other')
  })
})
