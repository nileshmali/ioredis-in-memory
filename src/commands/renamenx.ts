export function renamenx(key: string, newKey: string) {
  if (this.data.has(newKey)) {
    return 0;
  }

  this.rename(key, newKey);

  return 1;
}
