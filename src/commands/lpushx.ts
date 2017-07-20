export function lpushx(key: string, value: any) {
  if (!this.data.has(key)) {
    return 0;
  }

  return this.lpush(key, value);
}
