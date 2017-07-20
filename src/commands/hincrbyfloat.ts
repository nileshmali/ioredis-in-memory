export function hincrbyfloat(key: string, field: string, increment: string) {
  const hash = this.data.get(key) || { [field]: '0' };
  if (!{}.hasOwnProperty.call(hash, field)) {
    hash[field] = '0';
  }
  const curVal = parseFloat(hash[field]);
  hash[field] = (curVal + parseFloat(increment)).toString();
  this.data.set(key, hash);
  return hash[field];
}
