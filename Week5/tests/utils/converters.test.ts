import { describe, it, expect } from 'vitest'
import { toNumber, safeParseJson } from '../../src/utils/converters'

describe('converters', () => {
  it('converts string to number', () => {
    expect(toNumber('42')).toBe(42)
    expect(toNumber('bad', 7)).toBe(7)
    expect(toNumber(3)).toBe(3)
  })

  it('parses json safely', () => {
    expect(safeParseJson('{"a":1}', {})).toEqual({ a: 1 })
    expect(safeParseJson('invalid', { b: 2 })).toEqual({ b: 2 })
  })
})
