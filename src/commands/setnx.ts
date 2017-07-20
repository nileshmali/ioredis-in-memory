export function setnx(key: string, value: any) {
  if (!this.data.has(key)) {
    this.data.set(key, value);
    return 1;
  }

  return 0;
}
