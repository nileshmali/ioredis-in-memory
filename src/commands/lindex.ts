export function lindex(key: string, i: string) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Array)) {
    throw new Error(`Key ${key} does not contain a list`);
  }
  const index = parseInt(i, 10);
  const list = this.data.get(key) || [];
  const item = list[index < 0 ? list.length + index : index];
  return (item || null);
}
