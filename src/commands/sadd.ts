export function sadd(key: string, ...values: Array<any>) {
  let added = 0;
  const set = this.data.get(key) || new Set();
  values.forEach((value) => {
    if (!set.has(value)) {
      added++;
    }
    set.add(value);
  });
  this.data.set(key, set);
  return added;
}
