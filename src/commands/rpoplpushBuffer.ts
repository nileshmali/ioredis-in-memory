export function rpoplpushBuffer(source: string, destination: string) {
  return this.rpoplpush(source, destination);
}
