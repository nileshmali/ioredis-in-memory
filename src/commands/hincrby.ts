export function hincrby(key: string, field: string, increment: string) {
  if (increment == null) {
    throw new Error('Wrong number of arguments specified');
  }
  const hash = this.data.get(key) || { [field]: '0' };
  if (!{}.hasOwnProperty.call(hash, field)) {
    hash[field] = '0';
  }
  const curVal = Number(hash[field]);
  if (isNaN(curVal)) {
    throw new Error('Hash value is not an integer');
  }
  const nextVal = curVal + parseInt(increment, 10);
  hash[field] = nextVal.toString();
  this.data.set(key, hash);

  return nextVal;
}
