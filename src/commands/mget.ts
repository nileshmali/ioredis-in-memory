export function mget(...keys: Array<string>) {
  return keys.map(key => (this.data.has(key) ? this.data.get(key) : null));
}
