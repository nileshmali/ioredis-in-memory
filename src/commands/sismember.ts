export function sismember(key: string, value: any) {
  const set = this.data.get(key) || new Set();
  if (!(set instanceof Set)) {
    throw new Error(`Key ${key} does not contain a set`);
  }
  return set.has(value) ? 1 : 0;
}
