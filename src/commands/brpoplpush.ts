export function brpoplpush(source: string, destination: string, ...args: Array<any>) {
  return this.rpoplpush(source, destination, ...args);
}
