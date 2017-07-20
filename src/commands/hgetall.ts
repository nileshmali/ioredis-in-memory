export function hgetall(key: string) {
  return this.data.get(key) || {};
}
