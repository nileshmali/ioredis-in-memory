export function exists(...keys: Array<any>) {
  return keys.reduce((totalExists, key) => {
    if (this.data.has(key)) {
      return totalExists + 1;
    }
    return totalExists;
  }, 0);
}
