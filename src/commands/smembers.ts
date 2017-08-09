export function smembers(key: string) {
  const set = this.data.get(key) || new Set();
  if (!(set instanceof Set)) {
    throw new Error(`Key ${key} does not contain a set`);
  }
  return Array.from(set);
}
