export function rename(key: string, newKey: string) {
  if (!this.data.has(key)) {
    throw new Error('No such a key');
  }
  const value = this.data.get(key);

  if (this.expires.has(key)) {
    const expire = this.expires.get(key);
    this.expires.delete(key);
    this.expires.set(newKey, expire);
  }

  this.data.set(newKey, value);
  this.data.delete(key);
  return 'OK';
}
