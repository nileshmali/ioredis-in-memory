export function brpoplpush(source: string, destination: string) {
  return this.rpoplpush(source, destination);
}
