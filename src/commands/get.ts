export function get(key: string): any {
  const value = this.data.get(key) || null;
  if (value && typeof value !== 'string') {
    throw new Error(`Key ${key} does not contain a string`);
  }
  return value;
}
