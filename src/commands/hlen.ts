export function hlen(key: string) {
  return this.data.has(key) ? Object.keys(this.data.get(key)).length : 0;
}
