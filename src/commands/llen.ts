export function llen(key: string) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Array)) {
    throw new Error(`Key ${key} does not contain a list`);
  }
  return (this.data.get(key) || []).length;
}
