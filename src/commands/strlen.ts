export function strlen(key: string) {
  return this.data.has(key) ? this.data.get(key).length : 0;
}
