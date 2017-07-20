export function incr(key: string) {
  const curVal = Number(this.data.get(key) || '0');
  const nextVal = curVal + 1;
  this.data.set(key, nextVal.toString());
  return nextVal;
}
