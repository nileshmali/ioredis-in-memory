export function incrbyfloat(key: string, increment = '0.0') {
  const curVal = parseFloat(this.data.get(key) || '0');
  if (isNaN(curVal)) {
    throw new Error(`Value for ${key} is not an integer.`);
  }
  this.data.set(key, (curVal + parseFloat(increment)).toString());
  return this.data.get(key);
}
