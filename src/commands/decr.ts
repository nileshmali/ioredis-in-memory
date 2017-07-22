export function decr(key: string) {
  return this.decrby(key, 1);
}
