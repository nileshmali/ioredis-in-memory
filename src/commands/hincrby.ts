export function hincrby(key: string, field: string, increment = '0') {
  const hash = this.data.get(key) || { [field]: '0' };
  if (!{}.hasOwnProperty.call(hash, field)) {
    hash[field] = '0';
  }
  const curVal = Number(hash[field]);
  const nextVal = curVal + parseInt(increment, 10);
  hash[field] = nextVal.toString();
  this.data.set(key, hash);

  return nextVal;
}
