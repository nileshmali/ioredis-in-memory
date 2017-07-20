export function smembers(key: string) {
  return Array.from(this.data.get(key) || []);
}
