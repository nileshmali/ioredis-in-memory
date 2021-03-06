export function incrby(key: string, increment = '0') {
  const curVal = Number(this.data.get(key) || '0');
  if (isNaN(curVal)) {
    throw new Error(`Value for ${key} is not an integer.`);
  }
  const nextVal = curVal + parseInt(increment, 10);
  this.data.set(key, nextVal.toString());
  return nextVal;
}
