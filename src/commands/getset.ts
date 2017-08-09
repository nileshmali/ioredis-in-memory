export function getset(key: string, value: any) {
  const old = this.data.get(key) || null;
  this.data.set(key, value);
  this.expires.delete(key);
  return old;
}
