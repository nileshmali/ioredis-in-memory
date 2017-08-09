export function strlen(key: string) {
  if (this.data.has(key) && typeof (this.data.get(key)) !== 'string') {
    throw new Error(`Key ${key} does not contain a string`);
  }
  return this.data.has(key) ? this.data.get(key).length : 0;
}
