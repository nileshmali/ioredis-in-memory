export function sadd(key: string, ...values: Array<any>) {
  let added = 0;
  const set = this.data.get(key) || new Set();
  if (!(set instanceof Set)) {
    throw new Error(`Key ${key} does not contain a set`);
  }
  values.forEach((value) => {
    if (!set.has(value)) {
      added++;
    }
    set.add(value);
  });
  this.data.set(key, set);
  return added;
}
