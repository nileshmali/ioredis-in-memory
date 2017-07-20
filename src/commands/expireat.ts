export function expireat(key: string, at: number): number {
  if (!this.data.has(key)) {
    return 0;
  }

  this.expires.set(key, (at * 1000));

  return 1;
}
