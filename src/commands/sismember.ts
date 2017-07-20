export function sismember(key: string, value: any) {
  const set = this.data.get(key) || new Set();
  return set.has(value) ? 1 : 0;
}
