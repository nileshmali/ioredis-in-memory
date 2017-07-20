export function incrbyfloat(key: string, increment: string) {
  const curVal = parseFloat(this.data.get(key) || '0');
  this.data.set(key, (curVal + parseFloat(increment)).toString());
  return this.data.get(key);
}
