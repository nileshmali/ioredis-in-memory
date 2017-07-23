export function del(...keys: string[]): number {
  let count = 0;
  keys.forEach((key) => {
    count = this.data.delete(key) ? count + 1 : count;
  });
  return count;
}
