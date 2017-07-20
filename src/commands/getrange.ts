export function getrange(key: string, s: string, e: string) {
  const value = this.data.get(key);
  const start = parseInt(s, 10);
  const end = parseInt(e, 10);

  if (end === -1) {
    return value.slice(start);
  }

  return value.slice(start, end + 1);
}
