export function branchMany(a: number, b: boolean): string {
  if (a < 0) return 'neg'
  if (a === 0) return b ? 'zero-true' : 'zero-false'
  if (a === 1) return b ? 'one-true' : 'one-false'
  return 'many'
}
