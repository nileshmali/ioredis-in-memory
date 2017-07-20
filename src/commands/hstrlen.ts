export function hstrlen(key: string, field: any) {
  return (this.data.has(key) && {}.hasOwnProperty.call(this.data.get(key), field)) ?
    this.data.get(key)[field].length : 0;
}
