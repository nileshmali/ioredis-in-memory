export function hkeys(key: string) {
  return this.data.has(key) ? Object.keys(this.data.get(key)) : [];
}
