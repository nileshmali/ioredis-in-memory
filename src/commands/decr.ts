export function decr(key: string) {
  const curVal = Number(this.data.get(key));
  const nextVal = curVal - 1;
  this.data.set(key, nextVal.toString());
  return nextVal;
}
