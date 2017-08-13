export function hexists(key: string, field: string) {
  return (this.data.has(key) && {}.hasOwnProperty.call(this.data.get(key), field)) ? 1 : 0;
}
