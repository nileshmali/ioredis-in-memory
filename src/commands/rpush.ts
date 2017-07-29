export function rpush(key: string, ...values: Array<any>) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Array)) {
    throw new Error(`Key ${key} does not contain a list`);
  }
  const list = this.data.get(key) || [];
  list.push(...values);
  this.data.set(key, list);
  return list.length;
}
