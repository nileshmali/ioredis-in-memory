export function discard(): string {
  this.batch = [];
  return 'OK';
}
