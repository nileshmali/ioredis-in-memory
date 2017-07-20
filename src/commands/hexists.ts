export function hexists(key: string, field: string) {
  return {}.hasOwnProperty.call(this.data.get(key), field) ? 1 : 0;
}
