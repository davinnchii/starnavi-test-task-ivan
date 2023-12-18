export function generateTable(field: number) {
  return new Array(field).fill(null).map(value => new Array(field).fill(false))
}