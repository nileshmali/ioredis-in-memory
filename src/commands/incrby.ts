export function incrby(key: string, increment: string = '0') {
  const curVal = Number(this.data.get(key) || '0');
  const nextVal = curVal + parseInt(increment, 10);
  this.data.set(key, nextVal.toString());
  return nextVal;
}
