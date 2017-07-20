export function pexpire(key: string, milliseconds: number) {
  if (!this.data.has(key)) {
    return 0;
  }

  this.expires.set(key, milliseconds + Date.now());

  return 1;
}
