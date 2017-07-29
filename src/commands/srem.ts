export function srem(key: string, ...values: Array<any>) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Set)) {
    throw new Error(`Key ${key} does not contain a set`);
  }
  let removed = 0;
  const set = this.data.get(key) || new Set();
  values.forEach((val) => {
    if (set.has(val)) {
      removed++;
    }
    set.delete(val);
  });
  this.data.set(key, set);
  return removed;
}
