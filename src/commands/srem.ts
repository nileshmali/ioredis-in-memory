export function srem(key: string, ...values: Array<any>) {
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
