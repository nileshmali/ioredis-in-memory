export function incr(key: string) {
  return this.incrby(key, 1);
}
