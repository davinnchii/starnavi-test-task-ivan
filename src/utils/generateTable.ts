export function generateTable(field: number) {
  let id = 0;
  return new Array(field).fill(null)
    .map(value => new Array(field).fill(null)
      .map(value => ({
          id: id++,
          value: false
        })
      )
    );
}