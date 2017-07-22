export function decrby(key: string, decrement = '0') {
  const curVal = Number(this.data.get(key) || '0');
  if (isNaN(curVal)) {
    throw new Error(`Value for ${key} is not an integer.`);
  }
  const nextVal = curVal - parseInt(decrement, 10);
  this.data.set(key, nextVal.toString());
  return nextVal;
}
