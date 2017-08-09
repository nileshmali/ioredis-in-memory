export function hincrbyfloat(key: string, field: string, increment: string) {
  if (increment == null) {
    throw new Error('Wrong number of arguments specified');
  }
  const hash = this.data.get(key) || { [field]: '0' };
  if (!{}.hasOwnProperty.call(hash, field)) {
    hash[field] = '0';
  }
  const curVal = parseFloat(hash[field]);
  if (isNaN(curVal)) {
    throw new Error('Hash value is not a number');
  }
  hash[field] = (curVal + parseFloat(increment)).toString();
  this.data.set(key, hash);
  return hash[field];
}
