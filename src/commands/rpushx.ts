export function rpushx(key: string, value: any) {
  if (!this.data.has(key)) {
    return 0;
  }

  return this.rpush(key, value);
}
