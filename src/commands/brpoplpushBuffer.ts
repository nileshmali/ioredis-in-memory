export function brpoplpushBuffer(source: string, destination: string, ...args: Array<any>) {
  return this.brpoplpush(source, destination, ...args);
}
