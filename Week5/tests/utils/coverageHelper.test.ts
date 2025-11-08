import { describe, it, expect } from 'vitest'
import { multiBranch, nestedBranches } from '../../src/utils/coverageHelper'

describe('coverage helper', () => {
  it('multiBranch covers different branches', () => {
    expect(multiBranch(0)).toBe('zero')
    expect(multiBranch(2)).toBe('even')
    expect(multiBranch(3)).toBe('div3')
    expect(multiBranch(7)).toBe('other')
  })

  it('nestedBranches covers null/true/false', () => {
    expect(nestedBranches(null)).toBe('null')
    expect(nestedBranches(true)).toBe('true')
    expect(nestedBranches(false)).toBe('false')
  })
})
