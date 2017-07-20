export function flushdb(): string {
  this.data.clear();
  return 'OK';
}
