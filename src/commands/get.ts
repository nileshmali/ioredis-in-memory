export function get(key: string): any {
  return this.data.get(key) || null;
}