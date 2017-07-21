export function expire(key: string, seconds: number) {
  if (!this.data.has(key)) {
    return 0;
  }

  this.expires.set(key, (seconds * 1000) + Date.now());

  return 1;
}
