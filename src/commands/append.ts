export function append(key: string, value: string) {
  let existing = this.data.get(key) || '';
  this.data.set(key, existing + value);
  return this.data.get(key).length;
}
