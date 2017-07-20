export function persist(key: string) {
  if (!this.data.has(key)) {
    return 0;
  }

  if (!this.expires.has(key)) {
    return 0;
  }

  this.expires.delete(key);

  return 1;
}
