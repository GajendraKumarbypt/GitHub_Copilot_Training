export function multiBranch(n: number): string {
  if (n === 0) return 'zero'
  if (n % 2 === 0) return 'even'
  if (n % 3 === 0) return 'div3'
  return 'other'
}

export function nestedBranches(flag: boolean | null): string {
  if (flag === null) return 'null'
  if (flag) return 'true'
  return 'false'
}
