export function lrem(key: string, c: string, value: any) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Array)) {
    throw new Error(`Key ${key} does not contain a list`);
  }
  const count = parseInt(c, 10);
  const list = [...(this.data.get(key) || [])];
  const indexFun = (count < 0 ? [].lastIndexOf : [].indexOf).bind(list);
  const max = count === 0 ? list.length : Math.abs(count);
  let removed = 0;
  let idx = indexFun(value);
  while (idx !== -1 && removed < max) {
    removed++;
    list.splice(idx, 1);
    idx = indexFun(value);
  }
  this.data.set(key, list);
  return removed;
}
