export function hget(key: string, hashKey: string) {
  const hash = this.data.get(key);

  if (!hash || hash[hashKey] === undefined) {
    return null;
  }

  return hash[hashKey];
}
