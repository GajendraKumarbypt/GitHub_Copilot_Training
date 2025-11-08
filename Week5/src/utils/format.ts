export function formatDate(d: Date): string {
  if (!(d instanceof Date) || Number.isNaN(d.getTime())) return ''
  return d.toLocaleString()
}

export function formatCurrency(value: number, currency = 'USD'): string {
  if (typeof value !== 'number' || Number.isNaN(value)) return ''
  return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(value)
}
