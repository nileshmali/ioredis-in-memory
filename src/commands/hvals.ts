export function hvals(key: string) {
  const object = this.data.get(key);
  if (object == null) {
    return [];
  }
  return Object.keys(object).map(key => object[key]);
}
