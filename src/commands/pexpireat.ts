export function pexpireat(key: string, at: number) {
  if (!this.data.has(key)) {
    return 0;
  }

  this.expires.set(key, at);

  return 1;
}
