export function del(...keys: Array<string>): number {
  keys.forEach((key) => {
    this.data.delete(key);
  });
  return keys.length;
}
