export function msetnx(...args: Array<any>) {
  for (let i = 0; i < args.length; i += 2) {
    if (this.data.has(args[i])) {
      return 0;
    }
  }

  for (let i = 0; i < args.length; i += 2) {
    this.set(args[i], args[i + 1]);
  }

  return 1;
}
